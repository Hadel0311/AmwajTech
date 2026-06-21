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
            <span class="nav-group-label" v-if="!isSidebarCollapsed">Content Management</span>
            
            <router-link to="/admin/announcements" class="nav-item" active-class="active">
              <Megaphone class="nav-icon" :size="20" />
              <span class="nav-label" v-if="!isSidebarCollapsed">Announcements</span>
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
          <div class="notifications-wrapper" ref="notificationsDropdownRef">
            <button class="topbar-btn notifications" @click.stop="toggleNotifications">
              <Bell :size="20" />
              <span class="notification-badge" v-if="unreadCount > 0">{{ unreadCount }}</span>
            </button>
            
            <div class="notifications-dropdown" v-if="showNotifications" @click.stop>
              <div class="notifications-header">
                <h3>Notifications</h3>
                <button class="mark-read-btn" @click="markAllRead" v-if="unreadCount > 0">Mark all as read</button>
              </div>
              <div class="notifications-body">
                <div v-if="loadingNotifications" class="notifications-loading">Loading...</div>
                <div v-else-if="notifications.length === 0" class="notifications-empty">No recent activity</div>
                <div v-else class="notification-list">
                  <div class="notification-item" v-for="(notif, idx) in notifications" :key="idx">
                    <div class="notification-icon" :class="notif.colorClass">
                      <component :is="notif.icon" :size="16" />
                    </div>
                    <div class="notification-content">
                      <p><strong>{{ notif.type }}</strong> {{ notif.action }} <strong>{{ notif.name }}</strong></p>
                      <span class="notification-time">{{ formatTime(notif.date) }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="notifications-footer">
                <router-link to="/admin" @click="showNotifications = false">View Dashboard</router-link>
              </div>
            </div>
          </div>
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
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { api } from '@/services/api';
import { 
  LayoutDashboard, 
  Megaphone, 
  Users, 
  Network, 
  Briefcase, 
  LogOut, 
  Bell, 
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next';

const router = useRouter();
const route = useRoute();
const isSidebarCollapsed = ref(false);

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const handleLogout = async () => {
  try {
    await signOut(auth);
    router.push('/login');
  } catch (error) {
    console.error('Error signing out', error);
  }
};

// Notifications logic
const notifications = ref([]);
const showNotifications = ref(false);
const unreadCount = ref(0);
const loadingNotifications = ref(true);
const notificationsDropdownRef = ref(null);

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
};

const closeNotifications = (e) => {
  if (showNotifications.value && notificationsDropdownRef.value && !notificationsDropdownRef.value.contains(e.target)) {
    showNotifications.value = false;
  }
};

const markAllRead = () => {
  unreadCount.value = 0;
};

const formatTime = (dateStr) => {
  if (!dateStr) return 'Just now';
  const date = new Date(dateStr);
  const now = new Date();
  const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${Math.floor(diffHours / 24)} days ago`;
};

const fetchNotifications = async () => {
  loadingNotifications.value = true;
  try {
    const [clientsData, partnersData, jobsData, announcementsData] = await Promise.all([
      api.getAll('clients'),
      api.getAll('partners'),
      api.getAll('jobs'),
      api.getAll('announcements')
    ]);

    const allItems = [
      ...clientsData.map(d => ({ ...d, type: 'Client', icon: Users, colorClass: 'bg-blue-light icon-blue', name: d.name || d.title, action: d.updatedAt ? 'updated' : 'added', date: d.updatedAt || d.createdAt || new Date().toISOString() })),
      ...partnersData.map(d => ({ ...d, type: 'Partner', icon: Network, colorClass: 'bg-green-light icon-green', name: d.name || d.title, action: d.updatedAt ? 'updated' : 'added', date: d.updatedAt || d.createdAt || new Date().toISOString() })),
      ...jobsData.map(d => ({ ...d, type: 'Job', icon: Briefcase, colorClass: 'bg-gold-light icon-gold', name: d.title, action: d.updatedAt ? 'updated' : 'added', date: d.updatedAt || d.createdAt || new Date().toISOString() })),
      ...announcementsData.map(d => ({ ...d, type: 'Announcement', icon: Megaphone, colorClass: 'bg-purple-light icon-purple', name: d.title, action: d.updatedAt ? 'updated' : 'added', date: d.updatedAt || d.createdAt || new Date().toISOString() }))
    ];

    notifications.value = allItems.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
    unreadCount.value = notifications.value.length;
  } catch (error) {
    console.error('Error fetching notifications:', error);
  } finally {
    loadingNotifications.value = false;
  }
};

onMounted(() => {
  fetchNotifications();
  document.addEventListener('click', closeNotifications);
});

onUnmounted(() => {
  document.removeEventListener('click', closeNotifications);
});
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

.notifications-wrapper {
  position: relative;
}

.notifications-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: -50px;
  width: 340px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  z-index: 100;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.notifications-header {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
}

.notifications-header h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

.mark-read-btn {
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
}

.mark-read-btn:hover {
  text-decoration: underline;
}

.notifications-body {
  max-height: 350px;
  overflow-y: auto;
}

.notifications-loading,
.notifications-empty {
  padding: 2rem;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.notification-list {
  display: flex;
  flex-direction: column;
}

.notification-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.2s;
}

.notification-item:hover {
  background-color: #f8fafc;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.notification-content {
  flex: 1;
}

.notification-content p {
  margin: 0 0 0.25rem 0;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--text-primary);
}

.notification-time {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.notifications-footer {
  padding: 0.75rem;
  text-align: center;
  border-top: 1px solid var(--border-color);
  background: #f8fafc;
}

.notifications-footer a {
  color: #3b82f6;
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
}

.notifications-footer a:hover {
  text-decoration: underline;
}

/* Utilities for notification icons */
.bg-blue-light { background-color: #eff6ff; }
.icon-blue { color: #3b82f6; }
.bg-green-light { background-color: #f0fdf4; }
.icon-green { color: #22c55e; }
.bg-gold-light { background-color: #fefce8; }
.icon-gold { color: #eab308; }
.bg-purple-light { background-color: #faf5ff; }
.icon-purple { color: #a855f7; }

.topbar-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  position: relative;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.topbar-btn:hover {
  background-color: var(--admin-bg);
  color: var(--sidebar-bg);
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ef4444;
  color: #fff;
  font-size: 0.65rem;
  font-weight: bold;
  height: 16px;
  min-width: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  border: 2px solid #fff;
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
