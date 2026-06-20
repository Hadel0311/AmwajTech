<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1 class="login-title">Amwaj Tech CMS</h1>
        <p class="login-subtitle">Sign in to manage website content</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div v-if="errorMsg" class="error-alert">
          {{ errorMsg }}
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <input 
            id="email"
            v-model="email" 
            type="email" 
            placeholder="admin@amwajtech.com"
            required
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input 
            id="password"
            v-model="password" 
            type="password" 
            placeholder="••••••••"
            required
            class="form-input"
          />
        </div>

        <button type="submit" class="submit-btn" :disabled="isLoading">
          <span v-if="isLoading">Signing in...</span>
          <span v-else>Sign In</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMsg = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  try {
    isLoading.value = true;
    errorMsg.value = '';
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push('/admin'); // Redirect to dashboard
  } catch (error) {
    errorMsg.value = 'Invalid email or password.';
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-secondary);
  padding: 2rem;
}

.login-card {
  background: var(--color-bg-primary);
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  border: 1px solid var(--color-bg-alt);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-title {
  color: var(--color-primary);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.login-subtitle {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-dark);
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-bg-alt);
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.2s;
  background: var(--color-bg-secondary);
  color: var(--color-text-dark);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-secondary);
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

.submit-btn {
  width: 100%;
  padding: 0.875rem;
  background-color: var(--color-secondary);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background-color: var(--color-accent);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-alert {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  text-align: center;
  border: 1px solid rgba(239, 68, 68, 0.2);
}
</style>
