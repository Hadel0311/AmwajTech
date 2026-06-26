<template>
  <div class="email-settings-view">
    <div class="header-actions">
      <h2>Email Settings: {{ pageTitle }}</h2>
      <button class="btn-primary" @click="saveSettings" :disabled="isSaving">
        <span class="btn-icon">
          <Save :size="18" />
        </span>
        {{ isSaving ? 'Saving...' : 'Save Settings' }}
      </button>
    </div>

    <div class="settings-card">
      <div class="card-header">
        <h3>SMTP Configuration</h3>
        <p>Configure the email server used to send contact forms.</p>
      </div>
      
      <div v-if="isLoading" class="loading-state">
        <p>Loading settings...</p>
      </div>
      
      <form v-else class="settings-form" @submit.prevent="saveSettings">
        
        <div class="form-row">
          <div class="form-group">
            <label>SMTP Host</label>
            <input type="text" v-model="settings.host" placeholder="e.g. mail.amwajtech.com" required />
            <small>The hostname of your mail server.</small>
          </div>
          <div class="form-group">
            <label>SMTP Port</label>
            <input type="number" v-model="settings.port" placeholder="e.g. 465" required />
            <small>Common ports: 465 (SSL), 587 (TLS), 25.</small>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Email Username</label>
            <input type="email" v-model="settings.user" placeholder="e.g. info@amwajtech.com" required autocomplete="off" />
            <small>The email address used to log in.</small>
          </div>
          <div class="form-group">
            <label>Email Password</label>
            <input type="password" v-model="settings.pass" placeholder="Enter password" required autocomplete="new-password" />
            <small>The password for the email address.</small>
          </div>
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="settings.secure" />
            <span class="checkmark"></span>
            Use SSL/TLS Secure Connection
          </label>
          <small>Check this if using port 465. Leave unchecked for port 587.</small>
        </div>

        <hr class="divider" />
        
        <div class="card-header">
          <h3>Receiver Settings</h3>
          <p>Configure who receives the website form submissions.</p>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Admin Notification Email</label>
            <input type="email" v-model="settings.adminEmail" placeholder="e.g. admin@amwajtech.com" required />
            <small>All forms will be sent to this email address.</small>
          </div>
          <div class="form-group">
            <label>Sender Name Display</label>
            <input type="text" v-model="settings.fromName" placeholder="e.g. AmwajTech Website" required />
            <small>The name that appears as the sender.</small>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Save } from 'lucide-vue-next';
import { api } from '@/services/api';

const route = useRoute();
const isLoading = ref(true);
const isSaving = ref(false);

const type = computed(() => route.params.type || 'general');
const pageTitle = computed(() => type.value === 'jobs' ? 'HR / Jobs' : 'General');
const docId = computed(() => `email_${type.value}`);

const settings = ref({
  host: '',
  port: 465,
  user: '',
  pass: '',
  secure: true,
  adminEmail: '',
  fromName: 'AmwajTech Forms'
});

const loadSettings = async () => {
  try {
    isLoading.value = true;
    
    // Reset settings to defaults first
    settings.value = {
      host: '',
      port: 465,
      user: '',
      pass: '',
      secure: true,
      adminEmail: '',
      fromName: type.value === 'jobs' ? 'AmwajTech HR' : 'AmwajTech Forms'
    };

    const data = await api.getOne('settings', docId.value);
    if (data) {
      settings.value = { ...settings.value, ...data };
    }
  } catch (error) {
    console.log(`No existing settings found for ${docId.value}, using defaults.`);
  } finally {
    isLoading.value = false;
  }
};

const saveSettings = async () => {
  try {
    isSaving.value = true;
    settings.value.port = Number(settings.value.port);
    await api.set('settings', docId.value, settings.value);
    alert('Settings saved successfully!');
  } catch (error) {
    console.error('Error saving settings:', error);
    alert('Error saving settings. See console for details.');
  } finally {
    isSaving.value = false;
  }
};

watch(() => route.params.type, () => {
  loadSettings();
});

onMounted(() => {
  loadSettings();
});
</script>

<style scoped>
.email-settings-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 900px;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.settings-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-color);
  padding: 2rem;
}

.card-header {
  margin-bottom: 1.5rem;
}

.card-header h3 {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.25rem 0;
}

.card-header p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="password"],
.form-group input[type="number"] {
  padding: 0.6rem 0.8rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--sidebar-bg);
  box-shadow: 0 0 0 3px rgba(7, 21, 45, 0.1);
}

.form-group small {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.checkbox-group {
  margin-top: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
}

.divider {
  border: none;
  border-top: 1px solid var(--border-color);
  margin: 2rem 0;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--sidebar-bg);
  color: #fff;
  padding: 0.6rem 1.25rem;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--sidebar-hover);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-state {
  padding: 3rem 0;
  text-align: center;
  color: var(--text-secondary);
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
