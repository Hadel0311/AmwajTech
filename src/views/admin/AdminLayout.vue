<template>
  <div class="admin-layout">
    <!-- Sidebar Navigation -->
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <h2>Amwaj Tech CMS</h2>
      </div>
      
      <nav class="sidebar-nav">
        <router-link to="/admin" class="nav-item">Dashboard</router-link>
        <router-link to="/admin/announcements" class="nav-item">Announcements</router-link>
        <router-link to="/admin/services" class="nav-item">Services</router-link>
        <router-link to="/admin/partners" class="nav-item">Partners</router-link>
        <router-link to="/admin/clients" class="nav-item">Clients</router-link>
      </nav>

      <div class="sidebar-footer">
        <button @click="handleLogout" class="logout-btn">Sign Out</button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="admin-main">
      <header class="admin-topbar">
        <div class="topbar-content">
          <h3>Admin Dashboard</h3>
        </div>
      </header>

      <div class="admin-content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';

const router = useRouter();

const handleLogout = async () => {
  try {
    await signOut(auth);
    router.push('/login');
  } catch (error) {
    console.error('Error signing out', error);
  }
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f3f4f6;
  color: #1f2937;
  text-align: left;
}

.admin-sidebar {
  width: 250px;
  background-color: #111827;
  color: white;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid #374151;
}

.sidebar-header h2 {
  font-size: 1.25rem;
  font-weight: bold;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
}

.nav-item {
  display: block;
  padding: 0.75rem 1.5rem;
  color: #d1d5db;
  text-decoration: none;
  transition: all 0.2s;
}

.nav-item:hover, .nav-item.router-link-active {
  background-color: #374151;
  color: white;
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid #374151;
}

.logout-btn {
  width: 100%;
  padding: 0.5rem;
  background-color: transparent;
  color: #ef4444;
  border: 1px solid #ef4444;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.logout-btn:hover {
  background-color: #ef4444;
  color: white;
}

.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.admin-topbar {
  background-color: white;
  padding: 1rem 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.admin-content {
  padding: 2rem;
  flex: 1;
  overflow-y: auto;
}

.dashboard-overview h1 {
  font-size: 1.875rem;
  margin-bottom: 0.5rem;
}
</style>
