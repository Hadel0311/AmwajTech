<template>
  <div class="manage-container">
    <div class="page-header">
      <div class="header-title">
        <h2>Manage Services</h2>
        <p>Manage the main services offered by the company.</p>
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
          Add Service
        </button>
      </div>
    </div>

    <div class="table-controls">
      <div class="search-box">
        <Search :size="16" class="search-icon" />
        <input type="text" v-model="searchQuery" placeholder="Search services..." />
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading services...</p>
    </div>
    
    <div class="table-container" v-else>
      <table class="enterprise-table">
        <thead>
          <tr>
            <th style="width: 40px"></th>
            <th style="width: 60px">Icon</th>
            <th>Title</th>
            <th>Description</th>
            <th style="width: 120px; text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredServices.length === 0">
            <td colspan="5" class="empty-state">No services found.</td>
          </tr>
          <tr v-for="(item, index) in filteredServices" :key="item.id"
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
              <div class="icon-preview">
                <component :is="getIcon(item.icon)" v-if="getIcon(item.icon)" :size="24" />
                <span v-else>{{ item.icon }}</span>
              </div>
            </td>
            <td class="font-medium">{{ item.title }}</td>
            <td class="text-truncate" style="max-width: 300px;">{{ item.description }}</td>
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
      <div class="modal-content large-modal">
        <div class="modal-header">
          <h3>{{ editingId ? 'Edit Service' : 'New Service' }}</h3>
          <button @click="showModal = false" class="close-btn"><X :size="20" /></button>
        </div>
        
        <form @submit.prevent="handleSubmit" class="modal-body scrollable-body">
          <div class="form-section">
            <h4>Basic Information</h4>
            <div class="form-row">
              <div class="form-group flex-1">
                <label>Title</label>
                <input v-model="formData.title" required placeholder="e.g. Network Infrastructure" />
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group flex-1">
                <label>Icon Name</label>
                <select v-model="formData.icon" required>
                  <option v-for="icon in availableIcons" :key="icon" :value="icon">
                    {{ icon }}
                  </option>
                </select>
              </div>
              <div class="form-group flex-2">
                <label>Hero Image (Upload or URL)</label>
                <div style="display: flex; gap: 8px; align-items: center;">
                  <input v-model="formData.image" required placeholder="Or enter image URL..." style="flex: 1; margin: 0;" />
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
            </div>

            <div class="form-group">
              <label>Short Description (Card View)</label>
              <textarea v-model="formData.description" rows="2" required></textarea>
            </div>
            
            <div class="form-group">
              <label>Hero Value Proposition</label>
              <textarea v-model="formData.heroValueProp" rows="2" required></textarea>
            </div>
          </div>

          <div class="form-section">
            <h4>Visual Intro Section</h4>
            <div class="form-group">
              <label>Intro Title</label>
              <input v-model="formData.visualIntro.title" required />
            </div>
            <div class="form-group">
              <label>Intro Description</label>
              <textarea v-model="formData.visualIntro.description" rows="3" required></textarea>
            </div>
            <div class="form-group">
              <label>Business Value</label>
              <textarea v-model="formData.visualIntro.businessValue" rows="2" required></textarea>
            </div>
            
            <div class="form-group">
              <label>Objectives</label>
              <div v-for="(obj, i) in formData.visualIntro.objectives" :key="i" class="dynamic-list-item">
                <input v-model="formData.visualIntro.objectives[i]" placeholder="Objective text" class="flex-1" />
                <button type="button" @click="removeObjective(i)" class="btn-icon text-danger"><Trash2 :size="16" /></button>
              </div>
              <button type="button" @click="addObjective" class="btn btn-sm btn-outline mt-2">+ Add Objective</button>
            </div>
          </div>

          <div class="form-section">
            <h4>Challenges & Solutions</h4>
            <div v-for="(item, i) in formData.challenges" :key="i" class="dynamic-group">
              <div class="group-header">
                <h5>Item {{ i + 1 }}</h5>
                <button type="button" @click="removeChallenge(i)" class="btn-icon text-danger"><Trash2 :size="16" /></button>
              </div>
              <div class="form-group">
                <label>Challenge</label>
                <input v-model="item.challenge" required />
              </div>
              <div class="form-group">
                <label>Solution</label>
                <input v-model="item.solution" required />
              </div>
            </div>
            <button type="button" @click="addChallenge" class="btn btn-sm btn-outline mt-2">+ Add Challenge/Solution</button>
          </div>

          <div class="form-section">
            <h4>Workflow (Timeline)</h4>
            <div v-for="(step, i) in formData.workflow" :key="i" class="dynamic-group">
              <div class="group-header">
                <h5>Step {{ i + 1 }}</h5>
                <button type="button" @click="removeWorkflow(i)" class="btn-icon text-danger"><Trash2 :size="16" /></button>
              </div>
              <div class="form-group">
                <label>Step Title</label>
                <input v-model="step.title" required />
              </div>
              <div class="form-group">
                <label>Step Description</label>
                <textarea v-model="step.description" rows="2" required></textarea>
              </div>
            </div>
            <button type="button" @click="addWorkflow" class="btn btn-sm btn-outline mt-2">+ Add Step</button>
          </div>

          <div class="form-section">
            <h4>Related Services</h4>
            <div class="form-group">
              <label>Related Service Keys (Comma separated)</label>
              <input v-model="relatedServicesInput" placeholder="network_security, cloud_services" />
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" @click="showModal = false" class="btn btn-outline">Cancel</button>
            <button type="submit" class="btn btn-primary" :disabled="isSaving">
              {{ isSaving ? 'Saving...' : 'Save Service' }}
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
import { IconMap, availableIcons } from '@/utils/iconMap';
import { 
  Plus, Search, 
  Edit2, Trash2, GripVertical, Save, X 
} from 'lucide-vue-next';

const services = ref([]);
const loading = ref(true);
const showModal = ref(false);
const isSaving = ref(false);
const isUploading = ref(false);
const editingId = ref(null);
const searchQuery = ref('');

// Drag and drop state
const draggedIndex = ref(null);
const dragOverIndex = ref(null);
const hasReordered = ref(false);
const isSavingOrder = ref(false);

const deletedIds = ref([]);
const isSavingDeletions = ref(false);
const hasDeletions = computed(() => deletedIds.value.length > 0);

const getIcon = (iconName) => {
  return IconMap[iconName] || null;
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  isUploading.value = true;
  try {
    const url = await api.uploadFile(`images/services/${Date.now()}_${file.name}`, file);
    formData.value.image = url;
  } catch (err) {
    console.error('Upload error:', err);
    alert('Failed to upload image');
  } finally {
    isUploading.value = false;
  }
};

const getEmptyForm = () => ({
  title: '',
  key: '',
  icon: 'Server',
  description: '',
  heroValueProp: '',
  image: '',
  visualIntro: {
    title: '',
    description: '',
    businessValue: '',
    objectives: ['']
  },
  challenges: [
    { challenge: '', solution: '' }
  ],
  workflow: [
    { title: '', description: '' }
  ],
  relatedServices: []
});

const formData = ref(getEmptyForm());

const relatedServicesInput = computed({
  get: () => formData.value.relatedServices ? formData.value.relatedServices.join(', ') : '',
  set: (val) => {
    formData.value.relatedServices = val.split(',').map(s => s.trim()).filter(Boolean);
  }
});

// Array helpers
const addObjective = () => formData.value.visualIntro.objectives.push('');
const removeObjective = (i) => formData.value.visualIntro.objectives.splice(i, 1);

const addChallenge = () => formData.value.challenges.push({ challenge: '', solution: '' });
const removeChallenge = (i) => formData.value.challenges.splice(i, 1);

const addWorkflow = () => formData.value.workflow.push({ title: '', description: '' });
const removeWorkflow = (i) => formData.value.workflow.splice(i, 1);

const loadData = async () => {
  loading.value = true;
  hasReordered.value = false;
  deletedIds.value = [];
  try {
    const data = await api.getAll('services');
    services.value = data.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (err) {
    console.error('Failed to load services', err);
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);

const filteredServices = computed(() => {
  if (!searchQuery.value) return services.value;
  const q = searchQuery.value.toLowerCase();
  return services.value.filter(s => 
    s.title?.toLowerCase().includes(q) || 
    s.key?.toLowerCase().includes(q)
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
  
  const movedItem = services.value.splice(draggedIndex.value, 1)[0];
  services.value.splice(index, 0, movedItem);
  hasReordered.value = true;
  draggedIndex.value = null;
};

const saveOrder = async () => {
  isSavingOrder.value = true;
  try {
    const updates = services.value.map((item, index) => {
      item.order = index;
      return { id: item.id, data: { order: index } };
    });
    await api.updateBatch('services', updates);
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
    formData.value = JSON.parse(JSON.stringify(item));
    // Ensure nested objects exist
    if (!formData.value.visualIntro) formData.value.visualIntro = { title: '', description: '', businessValue: '', objectives: [] };
    if (!formData.value.challenges) formData.value.challenges = [];
    if (!formData.value.workflow) formData.value.workflow = [];
    if (!formData.value.relatedServices) formData.value.relatedServices = [];
  } else {
    editingId.value = null;
    formData.value = getEmptyForm();
  }
  showModal.value = true;
};

const handleSubmit = async () => {
  isSaving.value = true;
  try {
    if (!formData.value.key) {
      formData.value.key = formData.value.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, '');
    }
    
    if (editingId.value) {
      await api.update('services', editingId.value, formData.value);
    } else {
      formData.value.order = services.value.length; // Add to end
      await api.create('services', formData.value);
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
  if (confirm('Mark this service for deletion? It will not be permanently deleted until you click Save Deletions.')) {
    deletedIds.value.push(id);
    services.value = services.value.filter(s => s.id !== id);
  }
};

const saveDeletions = async () => {
  isSavingDeletions.value = true;
  try {
    for (const id of deletedIds.value) {
      await api.delete('services', id);
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
<style scoped>
.large-modal {
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.scrollable-body {
  overflow-y: auto;
  padding: 1.5rem;
}

.form-section {
  background-color: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  margin-bottom: 2rem;
}

.form-section h4 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: var(--sidebar-bg);
  font-size: 1.1rem;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.dynamic-list-item {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  align-items: center;
}

.dynamic-group {
  background-color: #fff;
  border: 1px dashed #cbd5e1;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.group-header h5 {
  margin: 0;
  font-size: 0.9rem;
  color: #64748b;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.btn-icon:hover {
  background-color: #f1f5f9;
}

.text-danger {
  color: #ef4444;
}

.mt-2 {
  margin-top: 0.5rem;
}

.icon-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--sidebar-bg);
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
