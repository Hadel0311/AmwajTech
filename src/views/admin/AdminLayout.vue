<template>
  <div class="admin-layout">
    <!-- Sidebar Navigation -->
    <aside class="admin-sidebar" :class="{ 'collapsed': isSidebarCollapsed }">
      <div class="sidebar-header">
        <div class="logo-container">
          <!-- Simplified Logo or Icon -->
          <img src="@/assets/logo.png" alt="Amwaj Tech Logo" class="logo-img" />
          <h2 v-if="!isSidebarCollapsed">Amwaj Tech</h2>
        </div>
        <button class="collapse-toggle" @click="toggleSidebar">
          <ChevronLeft v-if="!isSidebarCollapsed" :size="20" />
          <ChevronRight v-else :size="20" />
        </button>
      </div>
      
      <div class="sidebar-scrollable">
        <nav class="sidebar-nav">
          <div class="nav-group">
            <span class="nav-group-label" v-if="!isSidebarCollapsed">Overview</span>
            <router-link to="/admin" class="nav-item" exact-active-class="active">
              <LayoutDashboard class="nav-icon" :size="20" />
              <span class="nav-label" v-if="!isSidebarCollapsed">Dashboard</span>
            </router-link>
          </div>

          <div class="nav-group">
            <span class="nav-group-label" v-if="!isSidebarCollapsed">Inquiries</span>
            
            <router-link to="/admin/contacts" class="nav-item" active-class="active">
              <Mail class="nav-icon" :size="20" />
              <span class="nav-label" v-if="!isSidebarCollapsed">Contact Messages</span>
            </router-link>
            
            <router-link to="/admin/consultations" class="nav-item" active-class="active">
              <MessageSquare class="nav-icon" :size="20" />
              <span class="nav-label" v-if="!isSidebarCollapsed">Consultations</span>
            </router-link>
          </div>

          <div class="nav-group">
            <span class="nav-group-label" v-if="!isSidebarCollapsed">Content Management</span>
            
            <router-link to="/admin/announcements" class="nav-item" active-class="active">
              <Megaphone class="nav-icon" :size="20" />
              <span class="nav-label" v-if="!isSidebarCollapsed">Announcements</span>
            </router-link>
            
            <router-link to="/admin/services" class="nav-item" active-class="active">
              <Layers class="nav-icon" :size="20" />
              <span class="nav-label" v-if="!isSidebarCollapsed">Services</span>
            </router-link>
            
            <router-link to="/admin/clients" class="nav-item" active-class="active">
              <Users class="nav-icon" :size="20" />
              <span class="nav-label" v-if="!isSidebarCollapsed">Clients</span>
            </router-link>

            <router-link to="/admin/partners" class="nav-item" active-class="active">
              <Network class="nav-icon" :size="20" />
              <span class="nav-label" v-if="!isSidebarCollapsed">Partners</span>
            </router-link>

            <router-link to="/admin/jobs" class="nav-item" active-class="active">
              <Briefcase class="nav-icon" :size="20" />
              <span class="nav-label" v-if="!isSidebarCollapsed">Jobs</span>
            </router-link>
          </div>

          <div class="nav-group">
            <span class="nav-group-label" v-if="!isSidebarCollapsed">Settings</span>
            
            <router-link to="/admin/settings/email/general" class="nav-item" active-class="active">
              <Settings class="nav-icon" :size="20" />
              <span class="nav-label" v-if="!isSidebarCollapsed">Email: General</span>
            </router-link>

            <router-link to="/admin/settings/email/jobs" class="nav-item" active-class="active">
              <Settings class="nav-icon" :size="20" />
              <span class="nav-label" v-if="!isSidebarCollapsed">Email: HR / Jobs</span>
            </router-link>

            <router-link to="/admin/settings/account" class="nav-item" active-class="active">
              <User class="nav-icon" :size="20" />
              <span class="nav-label" v-if="!isSidebarCollapsed">Account Details</span>
            </router-link>
          </div>
        </nav>
      </div>

      <div class="sidebar-footer">
        <button @click="handleLogout" class="nav-item logout-btn">
          <LogOut class="nav-icon" :size="20" />
          <span class="nav-label" v-if="!isSidebarCollapsed">Sign Out</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="admin-main-wrapper" :class="{ 'expanded': isSidebarCollapsed }">
      <!-- Top Navigation Bar -->
      <header class="admin-topbar">
        <div class="topbar-left">
          <div class="topbar-titles" v-if="route.name === 'admin-dashboard'">
            <h1 class="topbar-title">Dashboard Overview</h1>
            <p class="topbar-subtitle">Welcome back, here's what's happening today.</p>
          </div>
        </div>
        <div class="topbar-right">
          <div class="user-profile">
            <div class="avatar">
              <User :size="20" />
            </div>
            <div class="user-info">
              <span class="user-name">Admin User</span>
              <span class="user-role">System Admin</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Dynamic Page Content -->
      <main class="admin-content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { 
  LayoutDashboard, 
  Megaphone, 
  Layers,
  Users, 
  Network, 
  Briefcase, 
  LogOut, 
  User,
  ChevronLeft,
  ChevronRight,
  Mail,
  MessageSquare,
  Settings
} from 'lucide-vue-next';

const router = useRouter();
const route = useRoute();
const isSidebarCollapsed = ref(false);

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const handleLogout = async () => {
  try {
    localStorage.removeItem('amwaj_token');
    sessionStorage.removeItem('amwaj_token');
    router.push('/login');
  } catch (error) {
    console.error('Error signing out', error);
  }
};
</script>

<style scoped>
/* Theme Variables for Admin Layout */
.admin-layout {
  --admin-bg: #f8fafc;
  --sidebar-bg: #07152D; /* Primary Navy */
  --sidebar-hover: #0D2247; /* Secondary Navy */
  --accent-gold: #F4B23A;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --sidebar-text: #e2e8f0;
  --border-color: #e2e8f0;
  
  display: flex;
  min-height: 100vh;
  background-color: var(--admin-bg);
  color: var(--text-primary);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Sidebar Styles */
.admin-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 260px;
  background-color: var(--sidebar-bg);
  color: var(--sidebar-text);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  z-index: 50;
  box-shadow: 4px 0 10px rgba(0,0,0,0.05);
}

.admin-sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  overflow: hidden;
}

.logo-img {
  width: 36px;
  height: 36px;
  object-fit: contain;
  flex-shrink: 0;
}

.logo-container h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
}

.collapse-toggle {
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 4px;
  transition: color 0.2s, background 0.2s;
}

.collapse-toggle:hover {
  color: #fff;
  background-color: rgba(255,255,255,0.1);
}

.sidebar-scrollable {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 0;
}

/* Custom Scrollbar for Sidebar */
.sidebar-scrollable::-webkit-scrollbar {
  width: 6px;
}
.sidebar-scrollable::-webkit-scrollbar-thumb {
  background-color: rgba(255,255,255,0.2);
  border-radius: 3px;
}

.nav-group {
  margin-bottom: 1.5rem;
}

.nav-group-label {
  display: block;
  padding: 0 1.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  color: var(--sidebar-text);
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  cursor: pointer;
  background: transparent;
  width: 100%;
  text-align: left;
  border-top: none;
  border-right: none;
  border-bottom: none;
  font-size: 0.95rem;
}

.nav-item:hover {
  background-color: var(--sidebar-hover);
  color: #fff;
}

.nav-item.active {
  background-color: var(--sidebar-hover);
  border-left-color: var(--accent-gold);
  color: #fff;
  font-weight: 500;
}

.nav-icon {
  flex-shrink: 0;
  color: rgba(255,255,255,0.7);
}

.nav-item.active .nav-icon, .nav-item:hover .nav-icon {
  color: var(--accent-gold);
}

.nav-label {
  white-space: nowrap;
}

.sidebar-footer {
  padding: 1rem 0;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.logout-btn {
  color: #fca5a5;
}
.logout-btn .nav-icon {
  color: #fca5a5;
}
.logout-btn:hover {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

/* Main Content Area */
.admin-main-wrapper {
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;
  min-width: 0; /* Important for flex children to allow truncating */
}

.admin-main-wrapper.expanded {
  margin-left: 80px;
}

/* Topbar Styles */
.admin-topbar {
  height: 70px;
  background-color: #fff;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: sticky;
  top: 0;
  z-index: 40;
}

.topbar-titles {
  display: flex;
  flex-direction: column;
}

.topbar-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.15rem 0;
  line-height: 1.2;
}

.topbar-subtitle {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.2;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.user-profile:hover {
  background-color: var(--admin-bg);
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--sidebar-hover);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-primary);
}

.user-role {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

/* Page Content */
.admin-content {
  padding: 2rem;
  flex: 1;
  overflow-y: auto;
}

/* Global resets for admin area overrides */
:global(.admin-main-wrapper *) {
  box-sizing: border-box;
}

/* Responsive */
@media (max-width: 768px) {
  .admin-sidebar {
    transform: translateX(-100%);
  }
  .admin-sidebar.collapsed {
    transform: translateX(0);
    width: 260px; /* Full width on mobile when open */
  }
  .admin-main-wrapper {
    margin-left: 0;
  }
  .admin-main-wrapper.expanded {
    margin-left: 0;
  }
  .search-bar {
    display: none;
  }
}
</style>
