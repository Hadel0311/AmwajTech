<template>
  <div class="manage-container">
    <div class="page-header">
      <div class="header-title">
        <h2>Manage Clients</h2>
        <p>Manage the clients that appear in the portfolio and website.</p>
      </div>
      <div class="header-actions">
        <button v-if="hasReordered" @click="saveOrder" class="btn btn-warning" :disabled="isSavingOrder">
          <Save :size="16" />
          {{ isSavingOrder ? 'Saving...' : 'Save Order' }}
        </button>
        <button @click="openModal()" class="btn btn-primary">
          <Plus :size="16" />
          Add Client
        </button>
      </div>
    </div>

    <div class="table-controls">
      <div class="search-box">
        <Search :size="16" class="search-icon" />
        <input type="text" v-model="searchQuery" placeholder="Search clients..." />
      </div>
      <!-- Filter actions removed -->
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading clients...</p>
    </div>
    
    <div class="table-container" v-else>
      <table class="enterprise-table">
        <thead>
          <tr>
            <th style="width: 40px"></th>
            <th style="width: 80px">Logo</th>
            <th>Name</th>
            <th>Industry</th>
            <th style="width: 120px; text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredClients.length === 0">
            <td colspan="5" class="empty-state">No clients found.</td>
          </tr>
          <tr v-for="(item, index) in filteredClients" :key="item.id"
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
              <img :src="item.logo.startsWith('http') || item.logo.startsWith('/') ? item.logo : '/AmwajTech/clients/' + item.logo" :alt="item.name" style="height: 40px; object-fit: contain; max-width: 80px;" />
            </td>
            <td class="font-medium">{{ item.name }}</td>
            <td>
              <span class="badge bg-blue-light text-blue">{{ item.industry }}</span>
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
          <h3>{{ editingId ? 'Edit Client' : 'New Client' }}</h3>
          <button @click="showModal = false" class="close-btn"><X :size="20" /></button>
        </div>
        
        <form @submit.prevent="handleSubmit" class="modal-body">
          <div class="form-row">
            <div class="form-group flex-1">
              <label>Client Name</label>
              <input v-model="formData.name" required placeholder="e.g. Acme Corp" />
            </div>
            <div class="form-group flex-1">
              <label>Industry</label>
              <input v-model="formData.industry" required placeholder="e.g. Healthcare" />
            </div>
          </div>
          
          <div class="form-group">
            <label>Logo Image URL / Filename</label>
            <input v-model="formData.logo" required placeholder="e.g. client1.png or https://..." />
          </div>

          <div class="form-group">
            <label>Short Description (Used for card hover)</label>
            <textarea v-model="formData.description" rows="2" required></textarea>
          </div>

          <div class="form-group">
            <label>About the Organization</label>
            <textarea v-model="formData.aboutDesc" rows="3" required></textarea>
          </div>

          <div class="form-group">
            <label>Work with (Client Name)</label>
            <textarea v-model="formData.workDesc" rows="3" required></textarea>
          </div>

          <div class="form-group">
            <label>Industry Context</label>
            <textarea v-model="formData.contextDesc" rows="3" required></textarea>
          </div>

          <div class="form-group">
            <label>Services (Comma separated keys)</label>
            <input v-model="servicesInput" placeholder="network-infrastructure, technical-support" />
          </div>

          <div class="modal-footer">
            <button type="button" @click="showModal = false" class="btn btn-outline">Cancel</button>
            <button type="submit" class="btn btn-primary" :disabled="isSaving">
              {{ isSaving ? 'Saving...' : 'Save Client' }}
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

const clients = ref([]);
const loading = ref(true);
const showModal = ref(false);
const isSaving = ref(false);
const editingId = ref(null);
const searchQuery = ref('');

// Drag and drop state
const draggedIndex = ref(null);
const dragOverIndex = ref(null);
const hasReordered = ref(false);
const isSavingOrder = ref(false);

const formData = ref({
  name: '',
  industry: '',
  logo: '',
  description: '',
  aboutDesc: '',
  workDesc: '',
  contextDesc: '',
  services: []
});

const servicesInput = computed({
  get: () => formData.value.services ? formData.value.services.join(', ') : '',
  set: (val) => {
    formData.value.services = val.split(',').map(s => s.trim()).filter(Boolean);
  }
});

const loadData = async () => {
  loading.value = true;
  hasReordered.value = false;
  try {
    const data = await api.getAll('clients');
    clients.value = data.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (err) {
    console.error('Failed to load clients', err);
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);

const filteredClients = computed(() => {
  if (!searchQuery.value) return clients.value;
  const q = searchQuery.value.toLowerCase();
  return clients.value.filter(c => 
    c.name?.toLowerCase().includes(q) || 
    c.industry?.toLowerCase().includes(q)
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
  
  const movedItem = clients.value.splice(draggedIndex.value, 1)[0];
  clients.value.splice(index, 0, movedItem);
  hasReordered.value = true;
  draggedIndex.value = null;
};

const saveOrder = async () => {
  isSavingOrder.value = true;
  try {
    const updates = clients.value.map((item, index) => {
      item.order = index;
      return { id: item.id, data: { order: index } };
    });
    await api.updateBatch('clients', updates);
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
    formData.value = { name: '', industry: '', logo: '', description: '', aboutDesc: '', workDesc: '', contextDesc: '', services: [] };
  }
  showModal.value = true;
};

const handleSubmit = async () => {
  isSaving.value = true;
  try {
    if (editingId.value) {
      await api.update('clients', editingId.value, formData.value);
    } else {
      formData.value.order = clients.value.length; // Add to end
      await api.create('clients', formData.value);
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
  if (confirm('Are you sure you want to delete this client?')) {
    try {
      await api.delete('clients', id);
      await loadData();
    } catch (err) {
      alert('Failed to delete');
    }
  }
};
</script>

<style scoped src="@/assets/admin-table.css"></style>
