<template>
  <div class="manage-container">
    <div class="page-header">
      <div class="header-title">
        <div style="display: flex; align-items: flex-start; gap: 1rem;">
          <router-link to="/admin/jobs" class="back-btn" title="Back to Jobs">
            <ArrowLeft :size="20" />
          </router-link>
          <div>
            <h2 style="margin-top: 0; line-height: 36px;">Applicants for {{ jobTitle }}</h2>
            <p>Review and manage candidates for this position.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Advanced Table Controls -->
    <div class="table-controls">
      <div class="search-box">
        <Search :size="16" class="search-icon" />
        <input type="text" v-model="searchQuery" placeholder="Search applicants..." />
      </div>
      <div class="filter-actions">
        <select v-model="statusFilter" class="form-control" style="padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 6px;">
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Under Review">Under Review</option>
          <option value="Interview Scheduled">Interview Scheduled</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading applicants...</p>
    </div>
    
    <div class="table-container" v-else>
      <table class="enterprise-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Applied Date</th>
            <th>Status</th>
            <th style="width: 100px; text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredApplicants.length === 0">
            <td colspan="6" class="empty-state">No applicants found.</td>
          </tr>
          <tr v-for="applicant in filteredApplicants" :key="applicant.id">
            <td class="font-medium">{{ applicant.fullName }}</td>
            <td>{{ applicant.email }}</td>
            <td>{{ applicant.phone }}</td>
            <td>{{ formatDate(applicant.createdAt) }}</td>
            <td>
              <span class="badge" :class="getStatusClass(applicant.status)">
                {{ applicant.status || 'New' }}
              </span>
            </td>
            <td class="actions-cell" @click.stop>
              <button @click="openDrawer(applicant)" class="action-btn view-btn" title="View Details">
                <Eye :size="16" />
              </button>
              <button @click="handleDelete(applicant.id)" class="action-btn delete-btn" title="Delete">
                <Trash2 :size="16" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Side Drawer -->
    <div class="drawer-overlay" :class="{ 'is-open': selectedApplicant }" @click="closeDrawer">
      <div class="drawer-content" :class="{ 'is-open': selectedApplicant }" @click.stop>
        <div class="drawer-header">
          <h3>Applicant Details</h3>
          <button @click="closeDrawer" class="close-btn"><X :size="20" /></button>
        </div>

        <div class="drawer-body" v-if="selectedApplicant">
          <div class="detail-section">
            <div class="avatar-large bg-blue-light icon-blue">
              {{ getInitials(selectedApplicant.fullName) }}
            </div>
            <h4 class="applicant-name">{{ selectedApplicant.fullName }}</h4>
            <p class="applicant-applied">Applied: {{ formatDate(selectedApplicant.createdAt) }}</p>
          </div>

          <div class="detail-section">
            <label>Current Status</label>
            <select v-model="selectedApplicant.status" @change="updateStatus" class="status-select" :class="getStatusClass(selectedApplicant.status)">
              <option value="New">New</option>
              <option value="Under Review">Under Review</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div class="detail-section">
            <label>Contact Info</label>
            <div class="contact-item">
              <Mail :size="14" /> <a :href="`mailto:${selectedApplicant.email}`">{{ selectedApplicant.email }}</a>
            </div>
            <div class="contact-item">
              <Phone :size="14" /> <a :href="`tel:${selectedApplicant.phone}`">{{ selectedApplicant.phone }}</a>
            </div>
            <div class="contact-item" v-if="selectedApplicant.linkedin">
              <Linkedin :size="14" /> <a :href="selectedApplicant.linkedin" target="_blank">LinkedIn Profile</a>
            </div>
          </div>

          <div class="detail-section" v-if="selectedApplicant.cvUrl">
            <label>Resume / CV</label>
            <a :href="selectedApplicant.cvUrl" target="_blank" class="btn btn-outline cv-btn">
              <Download :size="16" /> View Resume
            </a>
          </div>

          <div class="detail-section" v-if="selectedApplicant.message">
            <label>Cover Message</label>
            <div class="message-box">{{ selectedApplicant.message }}</div>
          </div>

          <div class="detail-section" v-if="selectedApplicant.dynamicFields && Object.keys(selectedApplicant.dynamicFields).length > 0">
            <label>Custom Requirements</label>
            <div class="custom-field" v-for="(val, key) in selectedApplicant.dynamicFields" :key="key">
              <strong>{{ key }}:</strong>
              <span>{{ val }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '@/services/api';
import { 
  Search, ArrowLeft, Trash2, X, Mail, Phone, Linkedin, Download, Eye
} from 'lucide-vue-next';

const route = useRoute();
const jobId = route.params.jobId;

const applicants = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const statusFilter = ref('');
const jobTitle = ref('Job');

const selectedApplicant = ref(null);

const loadData = async () => {
  loading.value = true;
  try {
    if (jobId !== 'general') {
      try {
        const job = await api.getOne('jobs', jobId);
        jobTitle.value = job.title;
      } catch (err) {
        jobTitle.value = 'Unknown Job';
      }
    } else {
      jobTitle.value = 'General Applications';
    }

    const allApplicants = await api.getAll('applicants');
    applicants.value = allApplicants.filter(a => a.jobId === jobId);
    
    // sort by latest
    applicants.value.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (err) {
    console.error('Failed to load applicants', err);
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);

const filteredApplicants = computed(() => {
  let result = applicants.value;
  
  if (statusFilter.value) {
    result = result.filter(a => (a.status || 'New') === statusFilter.value);
  }
  
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(a => 
      a.fullName?.toLowerCase().includes(q) || 
      a.email?.toLowerCase().includes(q)
    );
  }
  return result;
});

const openDrawer = (applicant) => {
  selectedApplicant.value = { ...applicant, status: applicant.status || 'New' };
};

const closeDrawer = () => {
  selectedApplicant.value = null;
};

const updateStatus = async () => {
  if (!selectedApplicant.value) return;
  try {
    await api.update('applicants', selectedApplicant.value.id, { status: selectedApplicant.value.status });
    
    // update local list
    const idx = applicants.value.findIndex(a => a.id === selectedApplicant.value.id);
    if (idx !== -1) {
      applicants.value[idx].status = selectedApplicant.value.status;
    }
  } catch (err) {
    console.error('Failed to update status', err);
    alert('Failed to update status');
  }
};

const handleDelete = async (id) => {
  if (confirm('Are you sure you want to delete this applicant?')) {
    try {
      await api.delete('applicants', id);
      applicants.value = applicants.value.filter(a => a.id !== id);
      if (selectedApplicant.value?.id === id) closeDrawer();
    } catch (err) {
      alert('Failed to delete');
    }
  }
};

const formatDate = (isoStr) => {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  return d.toLocaleDateString();
};

const getInitials = (name) => {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

const getStatusClass = (status) => {
  switch (status) {
    case 'New': return 'bg-blue-light text-blue';
    case 'Under Review': return 'bg-gold-light text-gold';
    case 'Interview Scheduled': return 'bg-purple-light text-purple';
    case 'Accepted': return 'bg-green-light text-green';
    case 'Rejected': return 'bg-red-light text-red';
    default: return 'bg-blue-light text-blue';
  }
};
</script>

<style scoped src="@/assets/admin-table.css"></style>
<style scoped>
.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #f8fafc;
  color: #64748b;
  text-decoration: none;
  transition: all 0.2s;
}
.back-btn:hover {
  background: #e2e8f0;
  color: #0f172a;
}



.view-btn { color: #3b82f6; }
.view-btn:hover { background: #eff6ff; }

/* Status colors */
.text-blue { color: #3b82f6; }
.text-gold { color: #eab308; }
.text-purple { color: #a855f7; }
.text-green { color: #22c55e; }
.text-red { color: #ef4444; }
.bg-red-light { background-color: #fef2f2; }

/* Side Drawer */
.drawer-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(2px);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}
.drawer-overlay.is-open {
  opacity: 1;
  visibility: visible;
}

.drawer-content {
  position: fixed;
  top: 0; right: -400px; bottom: 0;
  width: 400px;
  background: white;
  box-shadow: -4px 0 24px rgba(0,0,0,0.1);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  transition: right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer-content.is-open {
  right: 0;
}

@media (max-width: 768px) {
  .drawer-content {
    width: 100%;
    right: -100%;
  }
}

.drawer-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drawer-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
}
.close-btn:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.detail-section label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.avatar-large {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.applicant-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}
.applicant-applied {
  font-size: 0.85rem;
  color: #94a3b8;
  margin: 0;
}

.status-select {
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-weight: 600;
  font-size: 0.95rem;
  outline: none;
  cursor: pointer;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #334155;
  font-size: 0.95rem;
}
.contact-item a {
  color: #334155;
  text-decoration: none;
}
.contact-item a:hover {
  color: #3b82f6;
  text-decoration: underline;
}

.cv-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  width: max-content;
}

.message-box {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 0.95rem;
  color: #334155;
  line-height: 1.5;
  white-space: pre-wrap;
}

.custom-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}
.custom-field strong {
  color: #0f172a;
}
.custom-field span {
  color: #475569;
}
</style>
