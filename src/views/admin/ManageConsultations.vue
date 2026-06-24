<template>
  <div class="manage-container">
    <div class="page-header">
      <div class="header-title">
        <h2 style="margin-top: 0; line-height: 36px;">Consultation Requests</h2>
        <p>Review and reply to consultation requests.</p>
      </div>
    </div>

    <!-- Advanced Table Controls -->
    <div class="table-controls">
      <div class="search-box">
        <Search :size="16" class="search-icon" />
        <input type="text" v-model="searchQuery" placeholder="Search requests..." />
      </div>
      <div class="filter-actions">
        <select v-model="statusFilter" class="form-control" style="padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 6px;">
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Replied">Replied</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading requests...</p>
    </div>
    
    <div class="table-container" v-else>
      <table class="enterprise-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Name</th>
            <th>Service Needed</th>
            <th>Timeline</th>
            <th>Date</th>
            <th>Status</th>
            <th style="width: 100px; text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredRequests.length === 0">
            <td colspan="7" class="empty-state">No requests found.</td>
          </tr>
          <tr v-for="req in filteredRequests" :key="req.id">
            <td class="font-medium">{{ req.companyName }}</td>
            <td>{{ req.fullName }}</td>
            <td>
              <span style="text-transform: capitalize;">{{ formatService(req.requiredService) }}</span>
            </td>
            <td>
              <span style="text-transform: capitalize;">{{ formatTimeline(req.projectTimeline) }}</span>
            </td>
            <td>{{ formatDate(req.createdAt) }}</td>
            <td>
              <span class="badge" :class="getStatusClass(req.status)">
                {{ req.status || 'New' }}
              </span>
            </td>
            <td class="actions-cell" @click.stop>
              <button @click="openDrawer(req)" class="action-btn view-btn" title="View Details">
                <Eye :size="16" />
              </button>
              <button @click="handleDelete(req.id)" class="action-btn delete-btn" title="Delete">
                <Trash2 :size="16" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Side Drawer -->
    <div class="drawer-overlay" :class="{ 'is-open': selectedRequest }" @click="closeDrawer">
      <div class="drawer-content" :class="{ 'is-open': selectedRequest }" @click.stop>
        <div class="drawer-header">
          <h3>Request Details</h3>
          <button @click="closeDrawer" class="close-btn"><X :size="20" /></button>
        </div>

        <div class="drawer-body" v-if="selectedRequest">
          <div class="detail-section">
            <div class="avatar-large bg-blue-light icon-blue">
              {{ getInitials(selectedRequest.fullName) }}
            </div>
            <h4 class="applicant-name">{{ selectedRequest.fullName }}</h4>
            <p class="applicant-applied">{{ selectedRequest.jobTitle || 'Representative' }} at {{ selectedRequest.companyName }}</p>
            <p class="applicant-applied">Received: {{ formatDate(selectedRequest.createdAt) }}</p>
          </div>

          <div class="detail-section">
            <label>Current Status</label>
            <select v-model="selectedRequest.status" @change="updateStatus" class="status-select" :class="getStatusClass(selectedRequest.status)">
              <option value="New">New</option>
              <option value="Replied">Replied</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div class="detail-section">
            <label>Contact Info</label>
            <div class="contact-item">
              <Mail :size="14" /> <a :href="`mailto:${selectedRequest.businessEmail}`">{{ selectedRequest.businessEmail }}</a>
            </div>
            <div class="contact-item">
              <Phone :size="14" /> <a :href="`tel:${selectedRequest.phoneNumber}`">{{ selectedRequest.phoneNumber }}</a>
            </div>
          </div>

          <div class="detail-section">
            <label>Project Details</label>
            <div class="custom-field">
              <strong>Industry:</strong>
              <span style="text-transform: capitalize;">{{ selectedRequest.industry }}</span>
            </div>
            <div class="custom-field">
              <strong>Required Service:</strong>
              <span style="text-transform: capitalize;">{{ formatService(selectedRequest.requiredService) }}</span>
            </div>
            <div class="custom-field">
              <strong>Project Size:</strong>
              <span style="text-transform: capitalize;">{{ selectedRequest.projectSize }}</span>
            </div>
            <div class="custom-field">
              <strong>Timeline:</strong>
              <span style="text-transform: capitalize;">{{ formatTimeline(selectedRequest.projectTimeline) }}</span>
            </div>
          </div>

          <div class="detail-section" v-if="selectedRequest.message">
            <label>Additional Message</label>
            <div class="message-box">{{ selectedRequest.message }}</div>
          </div>

          <div class="detail-section" style="margin-top: 1rem;">
            <a :href="`mailto:${selectedRequest.businessEmail}?subject=Re: Consultation Request - Amwaj Tech`" class="btn btn-primary" style="display: flex; justify-content: center; gap: 0.5rem; text-decoration: none;">
              <Send :size="16" /> Reply via Email
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { api } from '@/services/api';
import { 
  Search, Trash2, X, Mail, Phone, Eye, Send
} from 'lucide-vue-next';

const requests = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const statusFilter = ref('');

const selectedRequest = ref(null);

const loadData = async () => {
  loading.value = true;
  try {
    const allReqs = await api.getAll('consultation_requests');
    requests.value = allReqs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (err) {
    console.error('Failed to load requests', err);
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);

const filteredRequests = computed(() => {
  let result = requests.value;
  
  if (statusFilter.value) {
    result = result.filter(r => (r.status || 'New') === statusFilter.value);
  }
  
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(r => 
      r.fullName?.toLowerCase().includes(q) || 
      r.companyName?.toLowerCase().includes(q) ||
      r.businessEmail?.toLowerCase().includes(q)
    );
  }
  return result;
});

const openDrawer = (req) => {
  selectedRequest.value = { ...req, status: req.status || 'New' };
};

const closeDrawer = () => {
  selectedRequest.value = null;
};

const updateStatus = async () => {
  if (!selectedRequest.value) return;
  try {
    await api.update('consultation_requests', selectedRequest.value.id, { status: selectedRequest.value.status });
    
    // update local list
    const idx = requests.value.findIndex(r => r.id === selectedRequest.value.id);
    if (idx !== -1) {
      requests.value[idx].status = selectedRequest.value.status;
    }
  } catch (err) {
    console.error('Failed to update status', err);
    alert('Failed to update status');
  }
};

const handleDelete = async (id) => {
  if (confirm('Are you sure you want to delete this request?')) {
    try {
      await api.delete('consultation_requests', id);
      requests.value = requests.value.filter(r => r.id !== id);
      if (selectedRequest.value?.id === id) closeDrawer();
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

const formatService = (val) => {
  if (!val) return '';
  const map = {
    net_inf: 'Network Infrastructure',
    net_sec: 'Network Security',
    dc: 'Data Center',
    cloud: 'Cloud Solutions',
    sw: 'Software Development',
    ts: 'Technical Support',
    ms: 'Managed Services',
    multi: 'Multiple Services'
  };
  return map[val] || val.replace(/_/g, ' ');
};

const formatTimeline = (val) => {
  if (!val) return '';
  const map = {
    immediate: 'Immediate',
    '1m': 'Within 1 Month',
    '3m': '1-3 Months',
    '6m': '3-6 Months',
    future: 'Future Planning'
  };
  return map[val] || val;
};

const getStatusClass = (status) => {
  switch (status) {
    case 'New': return 'bg-blue-light text-blue';
    case 'Replied': return 'bg-gold-light text-gold';
    case 'In Progress': return 'bg-purple-light text-purple';
    case 'Resolved': return 'bg-green-light text-green';
    default: return 'bg-blue-light text-blue';
  }
};
</script>

<style scoped src="@/assets/admin-table.css"></style>
<style scoped>
.view-btn { color: #3b82f6; }
.view-btn:hover { background: #eff6ff; }

/* Status colors */
.text-blue { color: #3b82f6; }
.text-gold { color: #eab308; }
.text-purple { color: #a855f7; }
.text-green { color: #22c55e; }

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
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.95rem;
}
.custom-field:last-child {
  border-bottom: none;
}
.custom-field strong {
  color: #0f172a;
}
.custom-field span {
  color: #475569;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #0F3D91;
  color: #FFFFFF;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  padding: 0.875rem 1.25rem;
  transition: all 0.2s ease;
}
.btn-primary:hover {
  background-color: #1a4fba;
}
</style>
