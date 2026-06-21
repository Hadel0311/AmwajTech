<template>
  <div class="dashboard-wrapper">
    <div class="page-header">
      <div>
        <h1 class="page-title">Dashboard Overview</h1>
        <p class="page-subtitle">Welcome back, here's what's happening today.</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-outline">
          <Calendar :size="16" />
          <span>Last 30 Days</span>
        </button>
        <button class="btn btn-primary">
          <Download :size="16" />
          <span>Export Report</span>
        </button>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-header">
          <span class="kpi-title">Total Clients</span>
          <div class="kpi-icon bg-blue-light">
            <Users class="icon-blue" :size="20" />
          </div>
        </div>
        <div class="kpi-value">124</div>
        <div class="kpi-trend positive">
          <TrendingUp :size="14" />
          <span>+12% from last month</span>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-header">
          <span class="kpi-title">Active Partners</span>
          <div class="kpi-icon bg-green-light">
            <Network class="icon-green" :size="20" />
          </div>
        </div>
        <div class="kpi-value">45</div>
        <div class="kpi-trend positive">
          <TrendingUp :size="14" />
          <span>+5% from last month</span>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-header">
          <span class="kpi-title">Open Jobs</span>
          <div class="kpi-icon bg-gold-light">
            <Briefcase class="icon-gold" :size="20" />
          </div>
        </div>
        <div class="kpi-value">8</div>
        <div class="kpi-trend neutral">
          <Minus :size="14" />
          <span>No change</span>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-header">
          <span class="kpi-title">Announcements</span>
          <div class="kpi-icon bg-purple-light">
            <Megaphone class="icon-purple" :size="20" />
          </div>
        </div>
        <div class="kpi-value">12</div>
        <div class="kpi-trend negative">
          <TrendingDown :size="14" />
          <span>-2% from last month</span>
        </div>
      </div>
    </div>

    <div class="dashboard-content-grid">
      <!-- Quick Actions -->
      <div class="quick-actions-section">
        <h2 class="section-title">Quick Actions</h2>
        <div class="actions-grid">
          <router-link to="/admin/clients" class="action-card">
            <div class="action-icon-wrapper bg-blue-light">
              <Plus class="icon-blue" :size="24" />
            </div>
            <div class="action-info">
              <h3>Add Client</h3>
              <p>Register a new client profile</p>
            </div>
          </router-link>

          <router-link to="/admin/partners" class="action-card">
            <div class="action-icon-wrapper bg-green-light">
              <Plus class="icon-green" :size="24" />
            </div>
            <div class="action-info">
              <h3>Add Partner</h3>
              <p>Onboard a new technology partner</p>
            </div>
          </router-link>

          <router-link to="/admin/jobs" class="action-card">
            <div class="action-icon-wrapper bg-gold-light">
              <Plus class="icon-gold" :size="24" />
            </div>
            <div class="action-info">
              <h3>Post Job</h3>
              <p>Create a new career opening</p>
            </div>
          </router-link>

          <router-link to="/admin/announcements" class="action-card">
            <div class="action-icon-wrapper bg-purple-light">
              <Plus class="icon-purple" :size="24" />
            </div>
            <div class="action-info">
              <h3>New Announcement</h3>
              <p>Publish company news</p>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Activity Feed -->
      <div class="activity-feed-section">
        <div class="section-header">
          <h2 class="section-title">Recent Activity</h2>
          <button class="btn-text">View All</button>
        </div>
        
        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-avatar bg-blue-light">
              <User class="icon-blue" :size="16" />
            </div>
            <div class="activity-content">
              <p class="activity-text"><span class="fw-bold">Admin</span> added a new client <strong>Ministry of Digital Economy</strong></p>
              <span class="activity-time">2 hours ago</span>
            </div>
          </div>

          <div class="activity-item">
            <div class="activity-avatar bg-purple-light">
              <Megaphone class="icon-purple" :size="16" />
            </div>
            <div class="activity-content">
              <p class="activity-text"><span class="fw-bold">System</span> published announcement <strong>Q3 Quarterly Results</strong></p>
              <span class="activity-time">5 hours ago</span>
            </div>
          </div>

          <div class="activity-item">
            <div class="activity-avatar bg-gold-light">
              <Briefcase class="icon-gold" :size="16" />
            </div>
            <div class="activity-content">
              <p class="activity-text"><span class="fw-bold">HR Manager</span> posted a new job <strong>Senior Network Engineer</strong></p>
              <span class="activity-time">1 day ago</span>
            </div>
          </div>
          
          <div class="activity-item">
            <div class="activity-avatar bg-green-light">
              <Network class="icon-green" :size="16" />
            </div>
            <div class="activity-content">
              <p class="activity-text"><span class="fw-bold">Admin</span> updated partner details for <strong>Cisco</strong></p>
              <span class="activity-time">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  Users, 
  Network, 
  Briefcase, 
  Megaphone,
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  Calendar,
  Download,
  User
} from 'lucide-vue-next';
</script>

<style scoped>
.dashboard-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.25rem;
}

.page-subtitle {
  color: #64748b;
  font-size: 0.95rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-outline {
  background: white;
  border: 1px solid #cbd5e1;
  color: #334155;
}

.btn-outline:hover {
  background: #f8fafc;
  border-color: #94a3b8;
}

.btn-primary {
  background: #0D2247;
  border: 1px solid #0D2247;
  color: white;
}

.btn-primary:hover {
  background: #07152D;
}

/* KPI Grid */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.kpi-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
}

.kpi-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.kpi-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #64748b;
}

.kpi-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.kpi-value {
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.kpi-trend {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.85rem;
  font-weight: 500;
}

.kpi-trend.positive { color: #10b981; }
.kpi-trend.negative { color: #ef4444; }
.kpi-trend.neutral { color: #64748b; }

/* Utilities */
.bg-blue-light { background-color: #eff6ff; }
.icon-blue { color: #3b82f6; }

.bg-green-light { background-color: #f0fdf4; }
.icon-green { color: #22c55e; }

.bg-gold-light { background-color: #fefce8; }
.icon-gold { color: #eab308; }

.bg-purple-light { background-color: #faf5ff; }
.icon-purple { color: #a855f7; }

/* Content Grid */
.dashboard-content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .dashboard-content-grid {
    grid-template-columns: 1fr;
  }
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 1rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.btn-text {
  background: transparent;
  border: none;
  color: #3b82f6;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
}

.btn-text:hover {
  text-decoration: underline;
}

/* Quick Actions */
.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.action-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  cursor: pointer;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border-color: #cbd5e1;
}

.action-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-info h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 0.25rem;
}

.action-info p {
  font-size: 0.85rem;
  color: #64748b;
  margin: 0;
  line-height: 1.4;
}

/* Activity Feed */
.activity-feed-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
}

.activity-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.activity-text {
  font-size: 0.9rem;
  color: #334155;
  margin: 0;
  line-height: 1.4;
}

.fw-bold {
  font-weight: 600;
  color: #0f172a;
}

.activity-time {
  font-size: 0.8rem;
  color: #94a3b8;
}
</style>
