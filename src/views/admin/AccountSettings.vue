<template>
  <div class="account-settings">
    <div class="page-header">
      <h2>Account Settings</h2>
      <p>Manage your account security and preferences.</p>
    </div>

    <div class="settings-card">
      <div class="card-header">
        <h3>Security</h3>
        <p>Update your password to keep your account secure.</p>
      </div>

      <div class="card-body">
        <form @submit.prevent="handleChangePassword" class="password-form">
          <!-- Success/Error Messages -->
          <div v-if="successMessage" class="alert alert-success">
            <CheckCircle class="alert-icon" :size="20" />
            {{ successMessage }}
          </div>
          <div v-if="errorMessage" class="alert alert-error">
            <AlertCircle class="alert-icon" :size="20" />
            {{ errorMessage }}
          </div>

          <!-- Current Password -->
          <div class="form-group">
            <label for="currentPassword">Current Password</label>
            <div class="input-wrapper">
              <input
                :type="showCurrentPassword ? 'text' : 'password'"
                id="currentPassword"
                v-model="currentPassword"
                required
                :disabled="isLoading"
                placeholder="Enter current password"
              />
              <button
                type="button"
                class="toggle-password"
                @click="showCurrentPassword = !showCurrentPassword"
                tabindex="-1"
              >
                <EyeOff v-if="showCurrentPassword" :size="20" />
                <Eye v-else :size="20" />
              </button>
            </div>
          </div>

          <!-- New Password -->
          <div class="form-group">
            <label for="newPassword">New Password</label>
            <div class="input-wrapper">
              <input
                :type="showNewPassword ? 'text' : 'password'"
                id="newPassword"
                v-model="newPassword"
                required
                :disabled="isLoading"
                placeholder="Enter new password"
                @input="validatePassword"
              />
              <button
                type="button"
                class="toggle-password"
                @click="showNewPassword = !showNewPassword"
                tabindex="-1"
              >
                <EyeOff v-if="showNewPassword" :size="20" />
                <Eye v-else :size="20" />
              </button>
            </div>

            <!-- Password Requirements Checklist -->
            <div class="password-requirements" v-if="newPassword">
              <p class="requirements-title">Password must contain:</p>
              <ul class="requirements-list">
                <li :class="{ met: requirements.length }">
                  <Check v-if="requirements.length" :size="16" />
                  <X v-else :size="16" />
                  8-128 characters
                </li>
                <li :class="{ met: requirements.uppercase }">
                  <Check v-if="requirements.uppercase" :size="16" />
                  <X v-else :size="16" />
                  One uppercase letter
                </li>
                <li :class="{ met: requirements.lowercase }">
                  <Check v-if="requirements.lowercase" :size="16" />
                  <X v-else :size="16" />
                  One lowercase letter
                </li>
                <li :class="{ met: requirements.number }">
                  <Check v-if="requirements.number" :size="16" />
                  <X v-else :size="16" />
                  One number
                </li>
                <li :class="{ met: requirements.special }">
                  <Check v-if="requirements.special" :size="16" />
                  <X v-else :size="16" />
                  One special character
                </li>
              </ul>
            </div>
          </div>

          <!-- Confirm New Password -->
          <div class="form-group">
            <label for="confirmPassword">Confirm New Password</label>
            <div class="input-wrapper">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirmPassword"
                v-model="confirmPassword"
                required
                :disabled="isLoading"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                class="toggle-password"
                @click="showConfirmPassword = !showConfirmPassword"
                tabindex="-1"
              >
                <EyeOff v-if="showConfirmPassword" :size="20" />
                <Eye v-else :size="20" />
              </button>
            </div>
            <span class="error-text" v-if="confirmPassword && newPassword !== confirmPassword">
              Passwords do not match
            </span>
          </div>

          <div class="form-actions">
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="isLoading || !isPasswordValid || newPassword !== confirmPassword"
            >
              <Loader2 v-if="isLoading" class="spinner" :size="20" />
              <span v-else>Update Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { Eye, EyeOff, Check, X, Loader2, AlertCircle, CheckCircle } from 'lucide-vue-next';
import { api } from '@/services/api';

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const isLoading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const requirements = reactive({
  length: false,
  uppercase: false,
  lowercase: false,
  number: false,
  special: false
});

const isPasswordValid = computed(() => {
  return (
    requirements.length &&
    requirements.uppercase &&
    requirements.lowercase &&
    requirements.number &&
    requirements.special
  );
});

const validatePassword = () => {
  const p = newPassword.value;
  requirements.length = p.length >= 8 && p.length <= 128;
  requirements.uppercase = /[A-Z]/.test(p);
  requirements.lowercase = /[a-z]/.test(p);
  requirements.number = /[0-9]/.test(p);
  requirements.special = /[^A-Za-z0-9]/.test(p);
};

const handleChangePassword = async () => {
  if (!isPasswordValid.value) {
    errorMessage.value = 'New password does not meet all requirements.';
    return;
  }
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.';
    return;
  }

  isLoading.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    const res = await api.changePassword(currentPassword.value, newPassword.value);
    successMessage.value = res.message || 'Password changed successfully.';
    
    // Reset form fields
    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
    requirements.length = false;
    requirements.uppercase = false;
    requirements.lowercase = false;
    requirements.number = false;
    requirements.special = false;
    
  } catch (err) {
    errorMessage.value = err.message || 'Failed to change password.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.account-settings {
  max-width: 800px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h2 {
  font-size: 1.75rem;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}

.page-header p {
  color: var(--text-secondary);
  margin: 0;
}

.settings-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.card-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color, #e2e8f0);
}

.card-header h3 {
  font-size: 1.25rem;
  margin: 0 0 0.25rem 0;
  color: var(--text-primary);
}

.card-header p {
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.9rem;
}

.card-body {
  padding: 1.5rem;
}

.password-form {
  max-width: 500px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.input-wrapper input:focus {
  outline: none;
  border-color: var(--accent-gold, #F4B23A);
  box-shadow: 0 0 0 3px rgba(244, 178, 58, 0.1);
}

.toggle-password {
  position: absolute;
  right: 0.75rem;
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.toggle-password:hover {
  color: #475569;
}

.password-requirements {
  margin-top: 1rem;
  background-color: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.requirements-title {
  font-size: 0.85rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.requirements-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.requirements-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 0.25rem;
  transition: color 0.2s;
}

.requirements-list li.met {
  color: #10b981;
}

.requirements-list li:last-child {
  margin-bottom: 0;
}

.error-text {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #ef4444;
}

.form-actions {
  margin-top: 2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-primary {
  background-color: var(--sidebar-bg, #07152D);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--sidebar-hover, #0D2247);
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.alert {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  line-height: 1.4;
}

.alert-icon {
  flex-shrink: 0;
}

.alert-success {
  background-color: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.alert-error {
  background-color: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}
</style>
