<template>
  <div class="manage-container">
    <div class="page-header">
      <div class="header-title">
        <h2 style="margin-top: 0; line-height: 36px;">Contact Messages</h2>
        <p>Review and reply to inquiries from the Contact Us page.</p>
      </div>
    </div>

    <!-- Advanced Table Controls -->
    <div class="table-controls">
      <div class="search-box">
        <Search :size="16" class="search-icon" />
        <input type="text" v-model="searchQuery" placeholder="Search messages..." />
      </div>
      <div class="filter-actions">
        <select v-model="statusFilter" class="form-control" style="padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 6px;">
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Replied">Replied</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading messages...</p>
    </div>
    
    <div class="table-container" v-else>
      <table class="enterprise-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Date Received</th>
            <th>Status</th>
            <th style="width: 100px; text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredMessages.length === 0">
            <td colspan="6" class="empty-state">No messages found.</td>
          </tr>
          <tr v-for="msg in filteredMessages" :key="msg.id">
            <td class="font-medium">{{ msg.fullName }}</td>
            <td>{{ msg.email }}</td>
            <td>{{ truncateText(msg.subject, 30) }}</td>
            <td>{{ formatDate(msg.createdAt) }}</td>
            <td>
              <span class="badge" :class="getStatusClass(msg.status)">
                {{ msg.status || 'New' }}
              </span>
            </td>
            <td class="actions-cell" @click.stop>
              <button @click="openDrawer(msg)" class="action-btn view-btn" title="View Details">
                <Eye :size="16" />
              </button>
              <button @click="handleDelete(msg.id)" class="action-btn delete-btn" title="Delete">
                <Trash2 :size="16" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Side Drawer -->
    <div class="drawer-overlay" :class="{ 'is-open': selectedMessage }" @click="closeDrawer">
      <div class="drawer-content" :class="{ 'is-open': selectedMessage }" @click.stop>
        <div class="drawer-header">
          <h3>Message Details</h3>
          <button @click="closeDrawer" class="close-btn"><X :size="20" /></button>
        </div>

        <div class="drawer-body" v-if="selectedMessage">
          <div class="detail-section">
            <div class="avatar-large bg-blue-light icon-blue">
              {{ getInitials(selectedMessage.fullName) }}
            </div>
            <h4 class="applicant-name">{{ selectedMessage.fullName }}</h4>
            <p class="applicant-applied">Received: {{ formatDate(selectedMessage.createdAt) }}</p>
          </div>

          <div class="detail-section">
            <label>Current Status</label>
            <select v-model="selectedMessage.status" @change="updateStatus" class="status-select" :class="getStatusClass(selectedMessage.status)">
              <option value="New">New</option>
              <option value="Replied">Replied</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div class="detail-section">
            <label>Contact Info</label>
            <div class="contact-item">
              <Mail :size="14" /> <a :href="`mailto:${selectedMessage.email}`">{{ selectedMessage.email }}</a>
            </div>
            <div class="contact-item">
              <Phone :size="14" /> <a :href="`tel:${selectedMessage.phone}`">{{ selectedMessage.phone }}</a>
            </div>
          </div>

          <div class="detail-section">
            <label>Subject</label>
            <div class="message-box" style="font-weight: 600;">{{ selectedMessage.subject }}</div>
          </div>

          <div class="detail-section">
            <label>Message</label>
            <div class="message-box">{{ selectedMessage.message }}</div>
          </div>

          <div class="detail-section" style="margin-top: 1rem;">
            <a :href="`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`" class="btn btn-primary" style="display: flex; justify-content: center; gap: 0.5rem; text-decoration: none;">
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

const messages = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const statusFilter = ref('');

const selectedMessage = ref(null);

const loadData = async () => {
  loading.value = true;
  try {
    const allMessages = await api.getAll('contact_messages');
    messages.value = allMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (err) {
    console.error('Failed to load messages', err);
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);

const filteredMessages = computed(() => {
  let result = messages.value;
  
  if (statusFilter.value) {
    result = result.filter(m => (m.status || 'New') === statusFilter.value);
  }
  
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(m => 
      m.fullName?.toLowerCase().includes(q) || 
      m.email?.toLowerCase().includes(q) ||
      m.subject?.toLowerCase().includes(q)
    );
  }
  return result;
});

const openDrawer = (msg) => {
  selectedMessage.value = { ...msg, status: msg.status || 'New' };
};

const closeDrawer = () => {
  selectedMessage.value = null;
};

const updateStatus = async () => {
  if (!selectedMessage.value) return;
  try {
    await api.update('contact_messages', selectedMessage.value.id, { status: selectedMessage.value.status });
    
    // update local list
    const idx = messages.value.findIndex(m => m.id === selectedMessage.value.id);
    if (idx !== -1) {
      messages.value[idx].status = selectedMessage.value.status;
    }
  } catch (err) {
    console.error('Failed to update status', err);
    alert('Failed to update status');
  }
};

const handleDelete = async (id) => {
  if (confirm('Are you sure you want to delete this message?')) {
    try {
      await api.delete('contact_messages', id);
      messages.value = messages.value.filter(m => m.id !== id);
      if (selectedMessage.value?.id === id) closeDrawer();
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

const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const getStatusClass = (status) => {
  switch (status) {
    case 'New': return 'bg-blue-light text-blue';
    case 'Replied': return 'bg-gold-light text-gold';
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
