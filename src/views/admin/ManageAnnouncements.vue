<template>
  <div class="manage-container">
    <div class="page-header">
      <div class="header-title">
        <h2>Manage Announcements</h2>
        <p>Publish news, updates, and company announcements.</p>
      </div>
      <div class="header-actions">
        <button v-if="hasDeletions" @click="saveDeletions" class="btn btn-danger" :disabled="isSavingDeletions">
          <Save :size="16" />
          {{ isSavingDeletions ? 'Saving...' : 'Save Deletions' }}
        </button>
        <button @click="openModal()" class="btn btn-primary">
          <Plus :size="16" />
          Add Announcement
        </button>
      </div>
    </div>

    <div class="table-controls">
      <div class="search-box">
        <Search :size="16" class="search-icon" />
        <input type="text" v-model="searchQuery" placeholder="Search announcements..." />
      </div>
      <!-- Filter actions removed -->
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading announcements...</p>
    </div>
    
    <div class="table-container" v-else>
      <table class="enterprise-table">
        <thead>
          <tr>
            <th style="width: 80px">Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th style="width: 120px; text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredAnnouncements.length === 0">
            <td colspan="5" class="empty-state">No announcements found.</td>
          </tr>
          <tr v-for="item in filteredAnnouncements" :key="item.id">
            <td>
              <img v-if="item.image" :src="item.image" :alt="item.title" style="height: 40px; object-fit: cover; max-width: 80px; border-radius: 4px;" />
              <div v-else style="height: 40px; width: 60px; background: #e2e8f0; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-size: 0.75rem;">None</div>
            </td>
            <td class="font-medium">{{ item.title }}</td>
            <td>
              <span class="badge bg-purple-light" style="color: #9333ea">{{ item.category }}</span>
            </td>
            <td>
              <div style="display: flex; align-items: center; gap: 0.5rem; color: #64748b; font-size: 0.9rem;">
                <Calendar :size="14" />
                <span>{{ item.date }}</span>
              </div>
            </td>
            <td class="actions-cell">
              <button @click="openModal(item)" class="action-btn edit-btn" title="Edit">
                <Edit2 :size="16" />
              </button>
              <button @click="handleDelete(item.id)" class="action-btn delete-btn" title="Delete">
                <Trash2 :size="16" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Form -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ editingId ? 'Edit Announcement' : 'New Announcement' }}</h3>
          <button @click="showModal = false" class="close-btn"><X :size="20" /></button>
        </div>
        
        <form @submit.prevent="handleSubmit" class="modal-body">
          <div class="form-group">
            <label>Title</label>
            <input v-model="formData.title" required placeholder="e.g. Q3 Results" />
          </div>

          <div class="form-group">
            <label>Cover Image (Upload or URL)</label>
            <div style="display: flex; gap: 8px; align-items: center;">
              <input v-model="formData.image" placeholder="Or enter image URL..." style="flex: 1; margin: 0;" />
              <div style="position: relative; overflow: hidden;">
                <button type="button" class="btn btn-outline" style="white-space: nowrap; padding: 0.5rem 1rem;">
                  {{ isUploading ? 'Uploading...' : 'Upload File' }}
                </button>
                <input type="file" @change="handleFileUpload" accept="image/*" style="position: absolute; left: 0; top: 0; opacity: 0; width: 100%; height: 100%; cursor: pointer;" :disabled="isUploading" />
              </div>
            </div>
            <div v-if="formData.image" style="margin-top: 8px;">
              <img :src="formData.image" style="height: 60px; object-fit: cover; border-radius: 4px;" alt="Preview" />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group flex-1">
              <label>Category</label>
              <input v-model="formData.category" required placeholder="e.g. News, Updates" />
            </div>
            
            <div class="form-group flex-1">
              <label>Date</label>
              <input type="date" v-model="formData.date" required />
            </div>
          </div>

          <div class="form-group">
            <label>Excerpt</label>
            <textarea v-model="formData.excerpt" rows="2" required placeholder="Brief summary for cards"></textarea>
          </div>

          <div class="form-group">
            <label>Full Content</label>
            <textarea v-model="formData.content" rows="6" required placeholder="Detailed announcement body..."></textarea>
          </div>

          <div class="modal-footer">
            <button type="button" @click="showModal = false" class="btn btn-outline">Cancel</button>
            <button type="submit" class="btn btn-primary" :disabled="isSaving">
              {{ isSaving ? 'Saving...' : 'Publish' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { api } from '@/services/api';
import { 
  Plus, Search, Filter, SlidersHorizontal, 
  Edit2, Trash2, Calendar, X, Save 
} from 'lucide-vue-next';

const announcements = ref([]);
const loading = ref(true);
const showModal = ref(false);
const isSaving = ref(false);
const isUploading = ref(false);
const editingId = ref(null);
const searchQuery = ref('');

const deletedIds = ref([]);
const isSavingDeletions = ref(false);
const hasDeletions = computed(() => deletedIds.value.length > 0);

const formData = ref({
  title: '',
  category: '',
  date: '',
  excerpt: '',
  content: '',
  image: ''
});

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  isUploading.value = true;
  try {
    const url = await api.uploadFile(`images/announcements/${Date.now()}_${file.name}`, file);
    formData.value.image = url;
  } catch (err) {
    console.error('Upload error:', err);
    alert('Failed to upload image');
  } finally {
    isUploading.value = false;
  }
};

const loadData = async () => {
  loading.value = true;
  deletedIds.value = [];
  try {
    announcements.value = await api.getAll('announcements');
    // Sort by date descending
    announcements.value.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (err) {
    console.error('Failed to load announcements', err);
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);

const filteredAnnouncements = computed(() => {
  if (!searchQuery.value) return announcements.value;
  const q = searchQuery.value.toLowerCase();
  return announcements.value.filter(a => 
    a.title?.toLowerCase().includes(q) || 
    a.category?.toLowerCase().includes(q)
  );
});

const openModal = (item = null) => {
  if (item) {
    editingId.value = item.id;
    formData.value = { ...item };
  } else {
    editingId.value = null;
    const today = new Date().toISOString().split('T')[0];
    formData.value = { title: '', category: '', date: today, excerpt: '', content: '', image: '' };
  }
  showModal.value = true;
};

const handleSubmit = async () => {
  isSaving.value = true;
  try {
    if (editingId.value) {
      await api.update('announcements', editingId.value, formData.value);
    } else {
      await api.create('announcements', formData.value);
    }
    showModal.value = false;
    await loadData();
  } catch (err) {
    alert('Failed to save data');
    console.error(err);
  } finally {
    isSaving.value = false;
  }
};

const handleDelete = (id) => {
  if (confirm('Mark this announcement for deletion? It will not be permanently deleted until you click Save Deletions.')) {
    deletedIds.value.push(id);
    announcements.value = announcements.value.filter(a => a.id !== id);
  }
};

const saveDeletions = async () => {
  isSavingDeletions.value = true;
  try {
    for (const id of deletedIds.value) {
      await api.delete('announcements', id);
    }
    deletedIds.value = [];
    await loadData();
  } catch (err) {
    console.error('Failed to save deletions', err);
    alert('Failed to process some deletions');
  } finally {
    isSavingDeletions.value = false;
  }
};
</script>

<style scoped src="@/assets/admin-table.css"></style>
