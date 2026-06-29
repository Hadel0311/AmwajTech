<template>
  <div class="login-wrapper">
    <!-- Left Side: Enterprise Visuals (60%) -->
    <div class="login-left">
      <!-- Abstract network background -->
      <div class="network-grid"></div>
      <div class="network-nodes">
        <div class="node node-1"></div>
        <div class="node node-2"></div>
        <div class="node node-3"></div>
        <div class="line line-1"></div>
        <div class="line line-2"></div>
      </div>
      
      <div class="enterprise-content-center">
        <div class="brand-center">
          <img src="@/assets/logo.png" alt="Amwaj Tech Logo" class="brand-logo-large" />
          <h1 class="brand-name-large">Amwaj Tech</h1>
        </div>
      </div>
    </div>
    
    <!-- Right Side: Login Form (40%) -->
    <div class="login-right">
      <div class="login-form-container">
        <!-- Mobile Logo -->
        <div class="mobile-logo">
          <img src="@/assets/logo.png" alt="Amwaj Tech Logo" class="brand-logo-mobile" />
          <h2>Amwaj Tech</h2>
        </div>
        
        <div class="login-header">
          <h2 class="login-title">Welcome Back</h2>
          <p class="login-subtitle">Sign in to your admin account to continue</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div v-if="errorMsg" class="error-alert">
            <AlertCircle :size="16" />
            <span>{{ errorMsg }}</span>
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <div class="input-wrapper">
              <Mail class="input-icon" :size="18" />
              <input 
                id="email"
                v-model="email" 
                type="email" 
                placeholder="admin@amwajtech.com"
                required
                class="form-input"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-wrapper">
              <Lock class="input-icon" :size="18" />
              <input 
                id="password"
                v-model="password" 
                type="password" 
                placeholder="••••••••"
                required
                class="form-input"
              />
            </div>
          </div>


          <button type="submit" class="submit-btn" :disabled="isLoading">
            <span v-if="isLoading" class="loader"></span>
            <span v-else>Sign In</span>
          </button>
          
          <div class="security-note">
            <ShieldCheck class="security-icon" :size="14" />
            Protected by AmwajTech Auth
          </div>
          
          <div class="back-link">
            <router-link to="/">
              <ArrowLeft :size="14" />
              Return to Website
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/services/api';
import { Mail, Lock, AlertCircle, ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-vue-next';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMsg = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  try {
    isLoading.value = true;
    errorMsg.value = '';
    
    const response = await api.login(email.value, password.value);
    
    if (response.success) {
      localStorage.setItem('logged_in', 'true');
    }
    
    router.push('/admin'); // Redirect to dashboard
  } catch (error) {
    errorMsg.value = error.message || 'Invalid email or password.';
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Base Layout */
.login-wrapper {
  min-height: 100vh;
  display: flex;
  background-color: #f8fafc;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

/* Left Side - 60% */
.login-left {
  flex: 6;
  background-color: #07152D;
  background-image: linear-gradient(135deg, #07152D 0%, #0D2247 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 4rem 10%;
  color: white;
}

/* Abstract Network Visuals */
.network-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(244, 178, 58, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(244, 178, 58, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.5;
  z-index: 1;
}

.network-nodes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  opacity: 0.4;
  pointer-events: none;
}

.node {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #F4B23A;
  border-radius: 50%;
  box-shadow: 0 0 15px 4px rgba(244, 178, 58, 0.4);
}

.node-1 { top: 20%; left: 15%; animation: pulse 4s infinite alternate; }
.node-2 { top: 60%; left: 80%; animation: pulse 5s infinite alternate-reverse; }
.node-3 { top: 80%; left: 30%; animation: pulse 3s infinite alternate; }

.line {
  position: absolute;
  background-color: rgba(244, 178, 58, 0.2);
  transform-origin: left center;
}

.line-1 {
  top: 20%; left: 15%;
  width: 60vw; height: 1px;
  transform: rotate(20deg);
}

.line-2 {
  top: 60%; left: 80%;
  width: 40vw; height: 1px;
  transform: rotate(150deg);
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.5); opacity: 1; }
}

/* Enterprise Content */
.enterprise-content-center {
  position: relative;
  z-index: 10;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 1s ease-out;
}

.brand-center {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.brand-logo-large {
  width: 70px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
}

.brand-name-large {
  font-size: 3.5rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: white;
  margin: 0;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

/* Base logo styles for mobile */
.brand-logo-mobile {
  width: 48px;
  height: auto;
  object-fit: contain;
}


/* Right Side - 40% */
.login-right {
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background-color: #ffffff;
  position: relative;
}

.login-form-container {
  width: 100%;
  max-width: 440px;
  animation: fadeIn 0.8s ease-out;
}

.mobile-logo {
  display: none;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.mobile-logo .logo-mark {
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  border-radius: 10px;
}

.mobile-logo h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #07152D;
}

.login-header {
  margin-bottom: 2.5rem;
}

.login-title {
  color: #07152D;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
}

.login-subtitle {
  color: #64748b;
  font-size: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e293b;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1.2rem;
  color: #94a3b8;
  transition: color 0.3s ease;
}

.input-wrapper:focus-within .input-icon {
  color: #0D2247;
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8fafc;
  color: #0f172a;
}

.form-input:focus {
  outline: none;
  border-color: #0D2247;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(13, 34, 71, 0.05);
}

.form-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #475569;
  font-weight: 500;
  user-select: none;
}

.remember-me input {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  display: inline-block;
  position: relative;
  transition: all 0.2s;
  background: white;
}

.remember-me input:checked ~ .checkmark {
  background-color: #0D2247;
  border-color: #0D2247;
}

.remember-me input:checked ~ .checkmark::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.forgot-password {
  color: #0D2247;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}

.forgot-password:hover {
  color: #F4B23A;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background-color: #07152D;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.submit-btn:hover:not(:disabled) {
  background-color: #0D2247;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -10px rgba(7, 21, 45, 0.5);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.loader {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.security-note {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.85rem;
  font-weight: 500;
  background: #f1f5f9;
  padding: 0.75rem;
  border-radius: 8px;
}

.security-icon {
  color: #10b981;
}

.error-alert {
  background-color: #fef2f2;
  color: #ef4444;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid #fca5a5;
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}

.back-link {
  text-align: center;
  margin-top: 2rem;
}

.back-link a {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s;
}

.back-link a:hover {
  color: #0D2247;
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 1024px) {
  .login-left {
    flex: 5;
    padding: 3rem 5%;
  }
  .login-right {
    flex: 5;
    padding: 2rem;
  }
  .main-title {
    font-size: 2.8rem;
  }
}

@media (max-width: 768px) {
  .login-left {
    display: none;
  }
  
  .login-right {
    flex: 1;
    padding: 1.5rem;
    background-color: #f8fafc;
  }
  
  .login-form-container {
    background: white;
    padding: 2.5rem 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
  }
  
  .mobile-logo {
    display: flex;
  }
}
</style>
