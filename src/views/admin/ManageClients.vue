<template>
  <div class="manage-container">
    <div class="header-actions">
      <h2>Manage Clients</h2>
      <div class="header-buttons">
        <button v-if="hasReordered" @click="saveOrder" class="btn-secondary save-order-btn" :disabled="isSavingOrder">
          {{ isSavingOrder ? 'Saving...' : 'Save New Order' }}
        </button>
        <button @click="openModal()" class="btn-primary">Add New Client</button>
      </div>
    </div>

    <div v-if="loading" class="loading">Loading clients...</div>
    
    <table v-else class="data-table">
      <thead>
        <tr>
          <th style="width: 40px"></th>
          <th>Logo</th>
          <th>Name</th>
          <th>Industry</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in clients" :key="item.id"
            draggable="true"
            @dragstart="onDragStart($event, index)"
            @dragover.prevent="onDragOver($event, index)"
            @dragleave="dragOverIndex = null"
            @drop="onDrop($event, index)"
            @dragenter.prevent
            :class="{ 'drag-over': dragOverIndex === index, 'is-dragging': draggedIndex === index }">
          <td class="drag-handle" title="Drag to reorder">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
          </td>
          <td>
            <img :src="item.logo" :alt="item.name" class="table-img" v-if="item.logo.startsWith('http') || item.logo.startsWith('/')" />
            <img :src="'/AmwajTech/clients/' + item.logo" :alt="item.name" class="table-img" v-else />
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.industry }}</td>
          <td class="actions-cell">
            <button @click="openModal(item)" class="btn-edit">Edit</button>
            <button @click="handleDelete(item.id)" class="btn-delete">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Form -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>{{ editingId ? 'Edit Client' : 'New Client' }}</h3>
        
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Client Name</label>
            <input v-model="formData.name" required />
          </div>
          
          <div class="form-group">
            <label>Industry</label>
            <input v-model="formData.industry" required />
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
            <label>Work with Amwaj Tech</label>
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

          <div class="modal-actions">
            <button type="button" @click="showModal = false" class="btn-secondary">Cancel</button>
            <button type="submit" class="btn-primary" :disabled="isSaving">
              {{ isSaving ? 'Saving...' : 'Save' }}
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

const clients = ref([]);
const loading = ref(true);
const showModal = ref(false);
const isSaving = ref(false);
const editingId = ref(null);

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

// Drag and drop methods
const onDragStart = (e, index) => {
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
    const updatePromises = clients.value.map((item, index) => {
      item.order = index;
      return api.update('clients', item.id, { order: index });
    });
    await Promise.all(updatePromises);
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
    formData.value = { key: '', name: '', industry: '', logo: '', description: '', aboutDesc: '', workDesc: '', contextDesc: '', services: [] };
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

<style scoped>
.header-actions { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.header-buttons { display: flex; gap: 1rem; }
.save-order-btn { background-color: #f59e0b; color: white; border: none; border-radius: 4px; padding: 0.5rem 1rem; cursor: pointer; }
.save-order-btn:hover { background-color: #d97706; }
.data-table { width: 100%; border-collapse: collapse; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; }
.data-table th, .data-table td { padding: 1rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
.data-table th { background-color: #f9fafb; font-weight: 600; }
.actions-cell { display: flex; gap: 0.5rem; }
.table-img { height: 40px; object-fit: contain; }
.btn-primary { background-color: #0d9488; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; }
.btn-secondary { background-color: #e5e7eb; color: #374151; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; }
.btn-edit { background-color: #3b82f6; color: white; padding: 0.25rem 0.75rem; border: none; border-radius: 4px; cursor: pointer; }
.btn-delete { background-color: #ef4444; color: white; padding: 0.25rem 0.75rem; border: none; border-radius: 4px; cursor: pointer; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 50; padding: 1rem; }
.modal-content { background: white; padding: 2rem; border-radius: 8px; width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto; }
.form-group { margin-bottom: 1.25rem; }
.form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.95rem; color: #374151; }
.form-group input, .form-group textarea { width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem; font-family: inherit; }
.form-group input:focus, .form-group textarea:focus { outline: none; border-color: #0d9488; box-shadow: 0 0 0 2px rgba(13,148,136,0.2); }
.modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem; }

/* Drag and Drop Styles */
tbody tr[draggable="true"] {
  cursor: grab;
  transition: all 0.2s ease;
}
tbody tr[draggable="true"]:active {
  cursor: grabbing;
}
.drag-handle {
  color: #9ca3af;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
}
.drag-handle:hover {
  color: #4b5563;
}
.drag-over {
  border-top: 2px solid #0d9488 !important;
  background-color: rgba(13, 148, 136, 0.05);
}
.is-dragging {
  opacity: 0.5;
  background-color: #f3f4f6;
}
</style>
