<template>
  <div class="manage-container">
    <div class="header-actions">
      <h2>Manage Announcements</h2>
      <button @click="openModal()" class="btn-primary">Add New</button>
    </div>

    <div v-if="loading" class="loading">Loading announcements...</div>
    
    <table v-else class="data-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in announcements" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.date }}</td>
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
        <h3>{{ editingId ? 'Edit Announcement' : 'New Announcement' }}</h3>
        
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Title</label>
            <input v-model="formData.title" required />
          </div>
          
          <div class="form-group">
            <label>Category</label>
            <input v-model="formData.category" required />
          </div>
          
          <div class="form-group">
            <label>Date</label>
            <input type="date" v-model="formData.date" required />
          </div>

          <div class="form-group">
            <label>Excerpt</label>
            <textarea v-model="formData.excerpt" rows="2" required></textarea>
          </div>

          <div class="form-group">
            <label>Full Content</label>
            <textarea v-model="formData.content" rows="4" required></textarea>
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
import { ref, onMounted } from 'vue';
import { api } from '@/services/api';

const announcements = ref([]);
const loading = ref(true);
const showModal = ref(false);
const isSaving = ref(false);
const editingId = ref(null);

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
  } catch (err) {
    console.error('Failed to load announcements', err);
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);

const openModal = (item = null) => {
  if (item) {
    editingId.value = item.id;
    formData.value = { ...item };
  } else {
    editingId.value = null;
    formData.value = { title: '', category: '', date: '', excerpt: '', content: '' };
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
  if (confirm('Are you sure you want to delete this?')) {
    try {
      await api.delete('announcements', id);
      await loadData();
    } catch (err) {
      alert('Failed to delete');
    }
  }
};
</script>

<style scoped>
.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.data-table th, .data-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.data-table th {
  background-color: #f9fafb;
  font-weight: 600;
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
}

.btn-primary {
  background-color: #0d9488;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary {
  background-color: #e5e7eb;
  color: #374151;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-edit {
  background-color: #3b82f6;
  color: white;
  padding: 0.25rem 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-delete {
  background-color: #ef4444;
  color: white;
  padding: 0.25rem 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Modal Styles */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 50; padding: 1rem; }
.modal-content { background: white; padding: 2rem; border-radius: 8px; width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto; }
.form-group { margin-bottom: 1.25rem; }
.form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.95rem; color: #374151; }
.form-group input, .form-group textarea, .form-group select { width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem; font-family: inherit; }
.form-group input:focus, .form-group textarea:focus, .form-group select:focus { outline: none; border-color: #0d9488; box-shadow: 0 0 0 2px rgba(13,148,136,0.2); }

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}
</style>
