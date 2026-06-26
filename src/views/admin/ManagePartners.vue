<template>
  <div class="manage-container">
    <div class="page-header">
      <div class="header-title">
        <h2>Manage Partners</h2>
        <p>Manage your technology and business partners.</p>
      </div>
      <div class="header-actions">
        <button v-if="hasDeletions" @click="saveDeletions" class="btn btn-danger" :disabled="isSavingDeletions">
          <Save :size="16" />
          {{ isSavingDeletions ? 'Saving...' : 'Save Deletions' }}
        </button>
        <button v-if="hasReordered" @click="saveOrder" class="btn btn-warning" :disabled="isSavingOrder">
          <Save :size="16" />
          {{ isSavingOrder ? 'Saving...' : 'Save Order' }}
        </button>
        <button @click="openModal()" class="btn btn-primary">
          <Plus :size="16" />
          Add Partner
        </button>
      </div>
    </div>

    <div class="table-controls">
      <div class="search-box">
        <Search :size="16" class="search-icon" />
        <input type="text" v-model="searchQuery" placeholder="Search partners..." />
      </div>
      <!-- Filter actions removed -->
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading partners...</p>
    </div>
    
    <div class="table-container" v-else>
      <table class="enterprise-table">
        <thead>
          <tr>
            <th style="width: 40px"></th>
            <th style="width: 80px">Logo</th>
            <th>Name</th>
            <th>Website</th>
            <th style="width: 120px; text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredPartners.length === 0">
            <td colspan="5" class="empty-state">No partners found.</td>
          </tr>
          <tr v-for="(item, index) in filteredPartners" :key="item.id"
              draggable="true"
              @dragstart="onDragStart($event, index)"
              @dragover.prevent="onDragOver($event, index)"
              @dragleave="dragOverIndex = null"
              @drop="onDrop($event, index)"
              @dragenter.prevent
              :class="{ 'drag-over': dragOverIndex === index, 'is-dragging': draggedIndex === index }">
            <td class="drag-handle" title="Drag to reorder">
              <GripVertical :size="18" />
            </td>
            <td>
              <img :src="getLogoUrl(item.logo)" :alt="item.name" style="height: 40px; object-fit: contain; max-width: 80px;" />
            </td>
            <td class="font-medium">{{ item.name }}</td>
            <td>
              <a :href="item.website" target="_blank" style="color: #2563eb; text-decoration: none;">{{ item.website }}</a>
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
          <h3>{{ editingId ? 'Edit Partner' : 'New Partner' }}</h3>
          <button @click="showModal = false" class="close-btn"><X :size="20" /></button>
        </div>
        
        <form @submit.prevent="handleSubmit" class="modal-body">
          <div class="form-row">
            <div class="form-group flex-1">
              <label>Partner Name</label>
              <input v-model="formData.name" required placeholder="e.g. Microsoft" />
            </div>
            <div class="form-group flex-1">
              <label>Category</label>
              <input v-model="formData.category" required placeholder="e.g. Digital Creative" />
            </div>
          </div>

          <div class="form-group">
            <label>Website URL</label>
            <input type="url" v-model="formData.website" required placeholder="https://..." />
          </div>
          
          <div class="form-group">
            <label>Logo Image URL / Filename</label>
            <div style="display: flex; gap: 8px; align-items: center;">
              <input v-model="formData.logo" required placeholder="e.g. microsoft.png or https://..." style="flex: 1; margin: 0;" />
              <div style="position: relative; overflow: hidden;">
                <button type="button" class="btn btn-outline" style="white-space: nowrap; padding: 0.5rem 1rem;">
                  {{ isUploading ? 'Uploading...' : 'Upload File' }}
                </button>
                <input type="file" @change="handleFileUpload" accept="image/*" style="position: absolute; left: 0; top: 0; opacity: 0; width: 100%; height: 100%; cursor: pointer;" :disabled="isUploading" />
              </div>
            </div>
            <div v-if="formData.logo" style="margin-top: 8px;">
              <img :src="getLogoUrl(formData.logo)" style="height: 40px; object-fit: contain;" alt="Preview" />
            </div>
          </div>

          <div class="form-group">
            <label>Short Description (Used for card hover)</label>
            <textarea v-model="formData.shortDesc" rows="2" required></textarea>
          </div>

          <div class="form-group">
            <label>About Partner Description</label>
            <textarea v-model="formData.aboutDesc" rows="3" required></textarea>
          </div>

          <div class="form-group">
            <label>How We Leverage Technology</label>
            <textarea v-model="formData.leverageDesc" rows="3" required></textarea>
          </div>

          <div class="form-group">
            <label>Services (Comma separated keys)</label>
            <input v-model="servicesInput" placeholder="cloud-services, data-center" />
          </div>

          <div class="modal-footer">
            <button type="button" @click="showModal = false" class="btn btn-outline">Cancel</button>
            <button type="submit" class="btn btn-primary" :disabled="isSaving">
              {{ isSaving ? 'Saving...' : 'Save Partner' }}
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
  Edit2, Trash2, GripVertical, Save, X 
} from 'lucide-vue-next';

const partners = ref([]);
const loading = ref(true);
const showModal = ref(false);
const isSaving = ref(false);
const isUploading = ref(false);
const editingId = ref(null);
const searchQuery = ref('');

const logoImages = import.meta.glob('../../assets/images/Partners/*', { eager: true, import: 'default' });

const getLogoUrl = (logoName) => {
  if (!logoName) return '';
  if (logoName.startsWith('http') || logoName.startsWith('/')) {
    return logoName;
  }
  return logoImages[`../../assets/images/Partners/${logoName}`] || '';
};

// Drag and drop state
const draggedIndex = ref(null);
const dragOverIndex = ref(null);
const hasReordered = ref(false);
const isSavingOrder = ref(false);

const deletedIds = ref([]);
const isSavingDeletions = ref(false);
const hasDeletions = computed(() => deletedIds.value.length > 0);

const formData = ref({
  key: '',
  name: '',
  category: '',
  shortDesc: '',
  website: '',
  logo: '',
  aboutDesc: '',
  leverageDesc: '',
  services: []
});

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  isUploading.value = true;
  try {
    const url = await api.uploadFile(`images/partners/${Date.now()}_${file.name}`, file);
    formData.value.logo = url;
  } catch (err) {
    console.error('Upload error:', err);
    alert('Failed to upload image');
  } finally {
    isUploading.value = false;
  }
};

const servicesInput = computed({
  get: () => formData.value.services ? formData.value.services.join(', ') : '',
  set: (val) => {
    formData.value.services = val.split(',').map(s => s.trim()).filter(Boolean);
  }
});

const loadData = async () => {
  loading.value = true;
  hasReordered.value = false;
  deletedIds.value = [];
  try {
    const data = await api.getAll('partners');
    partners.value = data.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (err) {
    console.error('Failed to load partners', err);
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);

const filteredPartners = computed(() => {
  if (!searchQuery.value) return partners.value;
  const q = searchQuery.value.toLowerCase();
  return partners.value.filter(p => 
    p.name?.toLowerCase().includes(q) || 
    p.category?.toLowerCase().includes(q)
  );
});

// Drag and drop methods
const onDragStart = (e, index) => {
  if (searchQuery.value) {
    e.preventDefault();
    return;
  }
  draggedIndex.value = index;
  e.dataTransfer.effectAllowed = 'move';
};

const onDragOver = (e, index) => {
  dragOverIndex.value = index;
};

const onDrop = (e, index) => {
  dragOverIndex.value = null;
  if (draggedIndex.value === null || draggedIndex.value === index) return;
  
  const movedItem = partners.value.splice(draggedIndex.value, 1)[0];
  partners.value.splice(index, 0, movedItem);
  hasReordered.value = true;
  draggedIndex.value = null;
};

const saveOrder = async () => {
  isSavingOrder.value = true;
  try {
    const updates = partners.value.map((item, index) => {
      item.order = index;
      return { id: item.id, data: { order: index } };
    });
    await api.updateBatch('partners', updates);
    hasReordered.value = false;
  } catch (err) {
    console.error('Failed to save order', err);
    alert('Failed to save new order');
  } finally {
    isSavingOrder.value = false;
  }
};

const openModal = (item = null) => {
  if (item) {
    editingId.value = item.id;
    formData.value = { ...item };
    if (!formData.value.services) formData.value.services = [];
  } else {
    editingId.value = null;
    formData.value = { key: '', name: '', category: '', shortDesc: '', website: '', logo: '', aboutDesc: '', leverageDesc: '', services: [] };
  }
  showModal.value = true;
};

const handleSubmit = async () => {
  isSaving.value = true;
  if (!formData.value.key) {
    formData.value.key = formData.value.name.toLowerCase().replace(/\s+/g, '-');
  }
  try {
    if (editingId.value) {
      await api.update('partners', editingId.value, formData.value);
    } else {
      formData.value.order = partners.value.length; // Add to end
      await api.create('partners', formData.value);
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
  if (confirm('Mark this partner for deletion? It will not be permanently deleted until you click Save Deletions.')) {
    deletedIds.value.push(id);
    partners.value = partners.value.filter(p => p.id !== id);
  }
};

const saveDeletions = async () => {
  isSavingDeletions.value = true;
  try {
    for (const id of deletedIds.value) {
      await api.delete('partners', id);
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
