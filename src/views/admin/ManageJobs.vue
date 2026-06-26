<template>
  <div class="manage-container">
    <div class="page-header">
      <div class="header-title">
        <h2>Manage Jobs</h2>
        <p>Post and manage open career opportunities.</p>
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
          Add Job
        </button>
      </div>
    </div>

    <!-- Advanced Table Controls -->
    <div class="table-controls">
      <div class="search-box">
        <Search :size="16" class="search-icon" />
        <input type="text" v-model="searchQuery" placeholder="Search jobs..." />
      </div>
      <!-- Filter actions removed -->
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading jobs...</p>
    </div>
    
    <div class="table-container" v-else>
      <table class="enterprise-table">
        <thead>
          <tr>
            <th style="width: 40px"></th>
            <th>Job Title</th>
            <th>Department</th>
            <th>Status</th>
            <th style="text-align: center;">Applicants</th>
            <th style="width: 140px; text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredJobs.length === 0">
            <td colspan="6" class="empty-state">No jobs found.</td>
          </tr>
          <tr v-for="(item, index) in filteredJobs" :key="item.id"
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
            <td class="font-medium">{{ item.title }}</td>
            <td>
              <span class="badge bg-blue-light text-blue">{{ item.department }}</span>
            </td>
            <td>
              <span class="badge" :class="item.status === 'Closed' ? 'bg-purple-light icon-purple' : 'bg-green-light icon-green'">
                {{ item.status || 'Open' }}
              </span>
            </td>
            <td style="text-align: center;">
              <span style="font-weight: 500;">{{ applicantsCount[item.id] || 0 }}</span>
            </td>
            <td class="actions-cell">
              <router-link :to="`/admin/jobs/${item.id}/applicants`" class="action-btn" title="View Applicants" style="color: #3b82f6;">
                <Users :size="16" />
              </router-link>
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
          <h3>{{ editingId ? 'Edit Job' : 'New Job' }}</h3>
          <button @click="showModal = false" class="close-btn"><X :size="20" /></button>
        </div>
        
        <form @submit.prevent="handleSubmit" class="modal-body">
          <div class="form-row">
            <div class="form-group flex-1">
              <label>Job Title</label>
              <input v-model="formData.title" required placeholder="e.g. Senior Software Engineer" />
            </div>
            <div class="form-group flex-1">
              <label>Department</label>
              <input v-model="formData.department" required placeholder="e.g. Engineering" />
            </div>
            <div class="form-group flex-1">
              <label>Status</label>
              <select v-model="formData.status" required>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Job Description</label>
            <textarea v-model="formData.description" rows="5" required placeholder="Describe the role..."></textarea>
          </div>

          <div class="form-group">
            <label style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              Application Requirements
              <button type="button" @click="addRequirement" class="btn btn-outline" style="padding: 0.25rem 0.5rem; font-size: 0.8rem; height: auto;">
                <Plus :size="14" style="margin-right: 4px" /> Add
              </button>
            </label>
            <div v-for="(req, index) in formData.requirements" :key="index" style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
              <input v-model="formData.requirements[index]" style="flex: 1" placeholder="e.g. Portfolio Link" required />
              <button type="button" @click="removeRequirement(index)" class="btn btn-outline" style="padding: 0.5rem; color: #ef4444; border-color: #ef4444;">
                <Trash2 :size="16" />
              </button>
            </div>
            <p v-if="!formData.requirements || formData.requirements.length === 0" style="font-size: 0.85rem; color: #64748b; margin-top: 0.25rem;">
              No custom requirements added. Default fields (Name, Email, Phone, CV, Message) will be shown.
            </p>
          </div>

          <div class="modal-footer">
            <button type="button" @click="showModal = false" class="btn btn-outline">Cancel</button>
            <button type="submit" class="btn btn-primary" :disabled="isSaving">
              {{ isSaving ? 'Saving...' : 'Save Job' }}
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
  Edit2, Trash2, GripVertical, Save, X, Users
} from 'lucide-vue-next';

const jobs = ref([]);
const loading = ref(true);
const showModal = ref(false);
const isSaving = ref(false);
const editingId = ref(null);
const searchQuery = ref('');
const applicantsCount = ref({});

// Drag and drop state
const draggedIndex = ref(null);
const dragOverIndex = ref(null);
const hasReordered = ref(false);
const isSavingOrder = ref(false);

const deletedIds = ref([]);
const isSavingDeletions = ref(false);
const hasDeletions = computed(() => deletedIds.value.length > 0);

const formData = ref({
  title: '',
  department: '',
  description: '',
  status: 'Open',
  requirements: []
});

const addRequirement = () => {
  if (!formData.value.requirements) {
    formData.value.requirements = [];
  }
  formData.value.requirements.push('');
};

const removeRequirement = (index) => {
  formData.value.requirements.splice(index, 1);
};

const loadData = async () => {
  loading.value = true;
  hasReordered.value = false;
  deletedIds.value = [];
  try {
    const [jobsData, applicantsData] = await Promise.all([
      api.getAll('jobs'),
      api.getAll('applicants').catch(() => []) // Catch if collection doesn't exist
    ]);
    
    jobs.value = jobsData.sort((a, b) => (a.order || 0) - (b.order || 0));
    
    // Compute applicant counts
    const counts = {};
    applicantsData.forEach(app => {
      if (app.jobId) {
        counts[app.jobId] = (counts[app.jobId] || 0) + 1;
      }
    });
    applicantsCount.value = counts;

  } catch (err) {
    console.error('Failed to load jobs', err);
    jobs.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);

const filteredJobs = computed(() => {
  if (!searchQuery.value) return jobs.value;
  const q = searchQuery.value.toLowerCase();
  return jobs.value.filter(j => 
    j.title?.toLowerCase().includes(q) || 
    j.department?.toLowerCase().includes(q)
  );
});

// Drag and drop methods
const onDragStart = (e, index) => {
  if (searchQuery.value) {
    e.preventDefault();
    return; // disable drag if filtered
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
  
  const movedItem = jobs.value.splice(draggedIndex.value, 1)[0];
  jobs.value.splice(index, 0, movedItem);
  hasReordered.value = true;
  draggedIndex.value = null;
};

const saveOrder = async () => {
  isSavingOrder.value = true;
  try {
    const updates = jobs.value.map((item, index) => {
      item.order = index;
      return { id: item.id, data: { order: index } };
    });
    await api.updateBatch('jobs', updates);
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
    formData.value = { ...item, requirements: item.requirements ? [...item.requirements] : [], status: item.status || 'Open' };
  } else {
    editingId.value = null;
    formData.value = { title: '', department: '', description: '', status: 'Open', requirements: [] };
  }
  showModal.value = true;
};

const handleSubmit = async () => {
  isSaving.value = true;
  try {
    if (editingId.value) {
      await api.update('jobs', editingId.value, formData.value);
    } else {
      formData.value.order = jobs.value.length; // Add to end
      await api.create('jobs', formData.value);
    }
    showModal.value = false;
    await loadData();
  } catch (err) {
    alert('Failed to save data: ' + err.message);
    console.error(err);
  } finally {
    isSaving.value = false;
  }
};

const handleDelete = (id) => {
  if (confirm('Mark this job for deletion? It will not be permanently deleted until you click Save Deletions.')) {
    deletedIds.value.push(id);
    jobs.value = jobs.value.filter(j => j.id !== id);
  }
};

const saveDeletions = async () => {
  isSavingDeletions.value = true;
  try {
    for (const id of deletedIds.value) {
      await api.delete('jobs', id);
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
