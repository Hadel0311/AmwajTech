<template>
  <div class="manage-container">
    <div class="page-header">
      <div class="header-title">
        <h2>Manage Announcements</h2>
        <p>Publish news, updates, and company announcements.</p>
      </div>
      <div class="header-actions">
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
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th style="width: 120px; text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredAnnouncements.length === 0">
            <td colspan="4" class="empty-state">No announcements found.</td>
          </tr>
          <tr v-for="item in filteredAnnouncements" :key="item.id">
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
  Edit2, Trash2, Calendar, X 
} from 'lucide-vue-next';

const announcements = ref([]);
const loading = ref(true);
const showModal = ref(false);
const isSaving = ref(false);
const editingId = ref(null);
const searchQuery = ref('');

const formData = ref({
  title: '',
  category: '',
  date: '',
  excerpt: '',
  content: ''
});

const loadData = async () => {
  loading.value = true;
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
    formData.value = { title: '', category: '', date: today, excerpt: '', content: '' };
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

const handleDelete = async (id) => {
  if (confirm('Are you sure you want to delete this announcement?')) {
    try {
      await api.delete('announcements', id);
      await loadData();
    } catch (err) {
      alert('Failed to delete');
    }
  }
};
</script>

<style scoped src="@/assets/admin-table.css"></style>
