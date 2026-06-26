<template>
  <div class="manage-container">
    <div class="page-header">
      <div class="header-title">
        <h2>Admin Settings</h2>
        <p>Update your email address and password.</p>
      </div>
    </div>

    <div class="form-section settings-form">
      <form @submit.prevent="handleUpdate">
        <div v-if="successMsg" class="success-alert">
          <CheckCircle2 :size="16" />
          <span>{{ successMsg }}</span>
        </div>
        <div v-if="errorMsg" class="error-alert">
          <AlertCircle :size="16" />
          <span>{{ errorMsg }}</span>
        </div>

        <div class="form-group">
          <label>Email Address</label>
          <input v-model="formData.email" type="email" placeholder="admin@amwajtech.com" required />
        </div>

        <div class="form-group">
          <label>Current Password</label>
          <input v-model="formData.currentPassword" type="password" placeholder="••••••••" required />
          <small class="help-text">Required to apply any changes.</small>
        </div>

        <div class="form-group">
          <label>New Password (Optional)</label>
          <input v-model="formData.newPassword" type="password" placeholder="Leave blank to keep current password" />
        </div>

        <div class="form-group">
          <label>Confirm New Password</label>
          <input v-model="formData.confirmPassword" type="password" placeholder="Leave blank to keep current password" />
        </div>

        <button type="submit" class="btn btn-primary" :disabled="isSaving">
          <Save :size="16" />
          {{ isSaving ? 'Saving...' : 'Update Settings' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api } from '@/services/api';
import { Save, AlertCircle, CheckCircle2 } from 'lucide-vue-next';

const isSaving = ref(false);
const errorMsg = ref('');
const successMsg = ref('');

const formData = ref({
  email: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const loadUserData = async () => {
  try {
    const res = await api.getMe();
    if (res.user) {
      formData.value.email = res.user.email;
    }
  } catch (err) {
    console.error('Failed to load user info', err);
  }
};

onMounted(() => {
  loadUserData();
});

const handleUpdate = async () => {
  errorMsg.value = '';
  successMsg.value = '';

  if (formData.value.newPassword && formData.value.newPassword !== formData.value.confirmPassword) {
    errorMsg.value = 'New passwords do not match.';
    return;
  }

  isSaving.value = true;
  try {
    await api.updateCredentials(
      formData.value.email,
      formData.value.currentPassword,
      formData.value.newPassword
    );
    successMsg.value = 'Settings updated successfully.';
    formData.value.currentPassword = '';
    formData.value.newPassword = '';
    formData.value.confirmPassword = '';
  } catch (err) {
    errorMsg.value = err.message || 'Failed to update settings.';
  } finally {
    isSaving.value = false;
  }
};
</script>

<style scoped src="@/assets/admin-table.css"></style>
<style scoped>
.settings-form {
  max-width: 600px;
  background-color: #f8fafc;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.form-group {
  margin-bottom: 1.5rem;
}

.help-text {
  display: block;
  margin-top: 0.5rem;
  color: #64748b;
  font-size: 0.85rem;
}

.error-alert, .success-alert {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.error-alert {
  background-color: #fef2f2;
  color: #ef4444;
  border: 1px solid #fca5a5;
}

.success-alert {
  background-color: #f0fdf4;
  color: #10b981;
  border: 1px solid #6ee7b7;
}

.btn {
  margin-top: 1rem;
}
</style>
