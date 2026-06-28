<template>
  <div class="dashboard-wrapper">
    <!-- Empty Database Banner -->
    <div v-if="kpis.totalConsultations === 0 && kpis.totalContacts === 0" class="empty-state-banner">
      <div class="banner-content">
        <div class="banner-icon-wrapper">
          <Sparkles class="icon-sparkles" :size="24" />
        </div>
        <div class="banner-text">
          <h3>Welcome to AmwajTech Dashboard!</h3>
          <p>It looks like your database is empty. Would you like to seed realistic B2B sales and consulting demo data to populate the interactive charts?</p>
        </div>
      </div>
      <button class="btn-seed" :disabled="seeding" @click="handleSeedData">
        <Loader v-if="seeding" class="icon-spin" :size="16" />
        <span>{{ seeding ? 'Seeding Data...' : 'Seed Demo Data' }}</span>
      </button>
    </div>

    <!-- KPI Cards -->
    <div class="kpi-grid">
      <!-- Consultation Requests -->
      <div class="kpi-card-wrapper">
        <div class="kpi-card-inner">
          <!-- Front Face -->
          <div class="kpi-card-front">
            <div class="kpi-header">
              <span class="kpi-title">Consultations</span>
              <div class="kpi-icon-circle icon-wrapper-yellow">
                <Calendar :size="15" />
              </div>
            </div>
            <div class="kpi-body">
              <div class="kpi-value">{{ kpis.totalConsultations }}</div>
              <div class="kpi-trend-text pos" v-if="trends.consultations.isPositive">
                +{{ trends.consultations.percent }}% this week
              </div>
              <div class="kpi-trend-text neg" v-else>
                {{ trends.consultations.percent }}% this week
              </div>
            </div>
          </div>
          <!-- Back Face -->
          <div class="kpi-card-back bg-back-yellow">
            <div class="trend-back-content">
              <div class="back-stat pos" v-if="trends.consultations.isPositive">
                +{{ trends.consultations.change }}
              </div>
              <div class="back-stat neg" v-else>
                {{ trends.consultations.change }}
              </div>
              <div class="back-label">Net Growth (7d)</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Inquiries -->
      <div class="kpi-card-wrapper">
        <div class="kpi-card-inner">
          <!-- Front Face -->
          <div class="kpi-card-front">
            <div class="kpi-header">
              <span class="kpi-title">Inquiries</span>
              <div class="kpi-icon-circle icon-wrapper-blue">
                <Megaphone :size="15" />
              </div>
            </div>
            <div class="kpi-body">
              <div class="kpi-value">{{ kpis.totalContacts }}</div>
              <div class="kpi-trend-text pos" v-if="trends.contacts.isPositive">
                +{{ trends.contacts.percent }}% this week
              </div>
              <div class="kpi-trend-text neg" v-else>
                {{ trends.contacts.percent }}% this week
              </div>
            </div>
          </div>
          <!-- Back Face -->
          <div class="kpi-card-back bg-back-blue">
            <div class="trend-back-content">
              <div class="back-stat pos" v-if="trends.contacts.isPositive">
                +{{ trends.contacts.change }}
              </div>
              <div class="back-stat neg" v-else>
                {{ trends.contacts.change }}
              </div>
              <div class="back-label">Net Growth (7d)</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Technology Partners -->
      <div class="kpi-card-wrapper">
        <div class="kpi-card-inner">
          <!-- Front Face -->
          <div class="kpi-card-front">
            <div class="kpi-header">
              <span class="kpi-title">Partners</span>
              <div class="kpi-icon-circle icon-wrapper-indigo">
                <Network :size="15" />
              </div>
            </div>
            <div class="kpi-body">
              <div class="kpi-value">{{ kpis.totalPartners }}</div>
              <div class="kpi-trend-text pos" v-if="trends.partners.isPositive">
                +{{ trends.partners.percent }}% this month
              </div>
              <div class="kpi-trend-text neg" v-else>
                {{ trends.partners.percent }}% this month
              </div>
            </div>
          </div>
          <!-- Back Face -->
          <div class="kpi-card-back bg-back-indigo">
            <div class="trend-back-content">
              <div class="back-stat pos" v-if="trends.partners.isPositive">
                +{{ trends.partners.change }}
              </div>
              <div class="back-stat neg" v-else>
                {{ trends.partners.change }}
              </div>
              <div class="back-label">Integrations (30d)</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enterprise Clients -->
      <div class="kpi-card-wrapper">
        <div class="kpi-card-inner">
          <!-- Front Face -->
          <div class="kpi-card-front">
            <div class="kpi-header">
              <span class="kpi-title">Clients</span>
              <div class="kpi-icon-circle icon-wrapper-teal">
                <Users :size="15" />
              </div>
            </div>
            <div class="kpi-body">
              <div class="kpi-value">{{ kpis.totalClients }}</div>
              <div class="kpi-trend-text pos" v-if="trends.clients.isPositive">
                +{{ trends.clients.percent }}% this month
              </div>
              <div class="kpi-trend-text neg" v-else>
                {{ trends.clients.percent }}% this month
              </div>
            </div>
          </div>
          <!-- Back Face -->
          <div class="kpi-card-back bg-back-teal">
            <div class="trend-back-content">
              <div class="back-stat pos" v-if="trends.clients.isPositive">
                +{{ trends.clients.change }}
              </div>
              <div class="back-stat neg" v-else>
                {{ trends.clients.change }}
              </div>
              <div class="back-label">New Accounts (30d)</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="charts-grid">
      <!-- Activity Trend (Smooth Spline Line/Area Chart) -->
      <div class="chart-card line-chart-card">
        <div class="chart-card-header">
          <h3 class="chart-card-title">Activity Trend (Last 7 Days)</h3>
          <div class="chart-legend">
            <span class="legend-item">
              <span class="legend-dot bg-accent"></span> Consultations
            </span>
            <span class="legend-item">
              <span class="legend-dot bg-primary-light"></span> Inquiries
            </span>
          </div>
        </div>
        <div class="chart-container">
          <svg viewBox="0 0 600 220" width="100%" height="220" class="svg-chart" overflow="visible"
               @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
            <defs>
              <linearGradient id="consultations-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="var(--color-accent)" stop-opacity="0.15"/>
                <stop offset="100%" stop-color="var(--color-accent)" stop-opacity="0.0"/>
              </linearGradient>
              <linearGradient id="contacts-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="var(--color-primary-light)" stop-opacity="0.15"/>
                <stop offset="100%" stop-color="var(--color-primary-light)" stop-opacity="0.0"/>
              </linearGradient>
              <!-- Glow Filters referencing System Tokens -->
              <filter id="glow-accent" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComponentTransfer in="blur" result="glow">
                  <feFuncA type="linear" slope="0.35" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-primary-light" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComponentTransfer in="blur" result="glow">
                  <feFuncA type="linear" slope="0.35" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <!-- Y Axis Grid Lines -->
            <line v-for="tick in 4" :key="'y-grid-' + tick"
                  x1="40" :y1="20 + (tick - 1) * 55" x2="580" :y2="20 + (tick - 1) * 55"
                  stroke="#f8fafc" stroke-width="1" />

            <!-- Area Path Under Spline -->
            <path :d="paths.consultationsArea" fill="url(#consultations-grad)" class="chart-area" />
            <path :d="paths.contactsArea" fill="url(#contacts-grad)" class="chart-area" />

            <!-- Main Glowing Curved Spline Lines -->
            <path :d="paths.consultationsLine" fill="none" stroke="var(--color-accent)" stroke-width="3" filter="url(#glow-accent)" stroke-linecap="round" stroke-linejoin="round" />
            <path :d="paths.contactsLine" fill="none" stroke="var(--color-primary-light)" stroke-width="3" filter="url(#glow-primary-light)" stroke-linecap="round" stroke-linejoin="round" />

            <!-- Labels X Axis -->
            <text v-for="(p, idx) in points.consultations" :key="'x-label-' + idx"
                  :x="p.x" y="210" text-anchor="middle" class="axis-label">{{ p.label }}</text>

            <!-- Labels Y Axis -->
            <text v-for="tick in 4" :key="'y-label-' + tick"
                  x="30" :y="24 + (4 - tick) * 55" text-anchor="end" class="axis-label">
              {{ Math.round(((tick - 1) / 3) * maxActivityVal) }}
            </text>

            <!-- Cursor Tracking Dotted Guide Line -->
            <line v-if="activePointDetail"
                  :x1="activePointDetail.x" y1="20"
                  :x2="activePointDetail.x" y2="185"
                  stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4 4" />

            <!-- Snap Highlight Intersection Dots -->
            <circle v-if="activePointDetail"
                    :cx="activePointDetail.x" :cy="activePointDetail.consultationsY"
                    r="6" fill="var(--color-accent)" stroke="white" stroke-width="2" class="pulse-dot" />
            <circle v-if="activePointDetail"
                    :cx="activePointDetail.x" :cy="activePointDetail.contactsY"
                    r="6" fill="var(--color-primary-light)" stroke="white" stroke-width="2" class="pulse-dot" />

            <!-- Inline SVG Tooltip (always perfectly anchored in chart coordinates) -->
            <g v-if="activePointDetail"
               :transform="`translate(${Math.min(Math.max(activePointDetail.x - 70, 5), 455)}, ${Math.min(activePointDetail.consultationsY, activePointDetail.contactsY) - 75})`">
              <!-- Shadow/card rect -->
              <rect x="0" y="0" width="140" height="62" rx="8" ry="8"
                    fill="#1a2a4a" opacity="0.96" />
              <!-- Pointer triangle -->
              <polygon :points="`${Math.min(Math.max(activePointDetail.x, 5 + 70), 455 + 70) - Math.min(Math.max(activePointDetail.x - 70, 5), 455) - 6},62 ${Math.min(Math.max(activePointDetail.x, 5 + 70), 455 + 70) - Math.min(Math.max(activePointDetail.x - 70, 5), 455) + 6},62 ${Math.min(Math.max(activePointDetail.x, 5 + 70), 455 + 70) - Math.min(Math.max(activePointDetail.x - 70, 5), 455)},70`"
                        fill="#1a2a4a" opacity="0.96" />
              <!-- Title -->
              <text x="10" y="17" font-size="9" fill="#94a3b8" font-family="Inter, sans-serif">{{ activePointDetail.label }} · {{ activePointDetail.date }}</text>
              <!-- Accent dot -->
              <circle cx="10" cy="32" r="4" fill="#f9b233" />
              <!-- Consultations label -->
              <text x="18" y="36" font-size="10" fill="#ffffff" font-family="Inter, sans-serif">Consultations</text>
              <text x="130" y="36" font-size="10" font-weight="bold" fill="#f9b233" text-anchor="end" font-family="Inter, sans-serif">{{ activePointDetail.consultationsVal }}</text>
              <!-- Primary-light dot -->
              <circle cx="10" cy="50" r="4" fill="#28406e" />
              <!-- Inquiries label -->
              <text x="18" y="54" font-size="10" fill="#ffffff" font-family="Inter, sans-serif">Inquiries</text>
              <text x="130" y="54" font-size="10" font-weight="bold" fill="#7ea8d8" text-anchor="end" font-family="Inter, sans-serif">{{ activePointDetail.contactsVal }}</text>
            </g>
          </svg>
        </div>
      </div>

      <!-- Chart 2: Website Visits Bar Chart -->
      <div class="chart-card visits-chart-card">
        <div class="chart-card-header">
          <h3 class="chart-card-title">Website Visits (Last 7 Days)</h3>
          <div class="chart-legend">
            <span class="legend-item">
              <span class="legend-dot bg-primary-light"></span> Page Views
            </span>
          </div>
        </div>
        <div class="chart-container">
          <svg viewBox="0 0 260 160" width="100%" height="160" class="svg-chart" overflow="visible">
            <defs>
              <linearGradient id="visits-bar-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="var(--color-primary-light)" stop-opacity="0.9"/>
                <stop offset="100%" stop-color="var(--color-primary-light)" stop-opacity="0.4"/>
              </linearGradient>
            </defs>

            <!-- Y-axis grid -->
            <line v-for="t in 4" :key="'vg-'+t" x1="30" :y1="10 + (t-1)*35" x2="255" :y2="10 + (t-1)*35"
                  stroke="#f1f5f9" stroke-width="1" />

            <!-- Bars -->
            <g v-for="(day, idx) in visitsChartData.days" :key="'vb-'+idx">
              <rect
                :x="30 + idx * 33 + 5"
                :y="115 - (day.visits / visitsChartData.maxVal) * 100"
                width="20"
                :height="(day.visits / visitsChartData.maxVal) * 100"
                rx="4" ry="4"
                fill="url(#visits-bar-grad)"
                class="visits-bar"
                @mouseover="hoveredVisitBar = { ...day, bx: 30 + idx * 33 + 15, by: 115 - (day.visits / visitsChartData.maxVal) * 100 }"
                @mouseleave="hoveredVisitBar = null"
              />
              <!-- X label -->
              <text :x="30 + idx * 33 + 15" y="130" text-anchor="middle" class="axis-label">{{ day.label }}</text>
            </g>

            <!-- Hover Tooltip -->
            <g v-if="hoveredVisitBar"
               :transform="`translate(${Math.min(Math.max(hoveredVisitBar.bx - 38, 2), 185)}, ${hoveredVisitBar.by - 38})`">
              <rect x="0" y="0" width="76" height="28" rx="6" fill="#1a2a4a" opacity="0.95" />
              <polygon :points="`${Math.min(Math.max(hoveredVisitBar.bx, 2+38), 185+38) - Math.min(Math.max(hoveredVisitBar.bx-38,2),185) - 5},28 ${Math.min(Math.max(hoveredVisitBar.bx,2+38),185+38) - Math.min(Math.max(hoveredVisitBar.bx-38,2),185) + 5},28 ${Math.min(Math.max(hoveredVisitBar.bx,2+38),185+38) - Math.min(Math.max(hoveredVisitBar.bx-38,2),185)},35`"
                       fill="#1a2a4a" opacity="0.95" />
              <text x="38" y="12" text-anchor="middle" font-size="8" fill="#94a3b8" font-family="Inter,sans-serif">{{ hoveredVisitBar.label }}</text>
              <text x="38" y="23" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff" font-family="Inter,sans-serif">{{ hoveredVisitBar.visits }} visits</text>
            </g>
          </svg>
        </div>
      </div>
    </div>

    <!-- Chart 3: Job Applications Month Comparison – full width horizontal bars -->
    <div class="full-width-chart-row">
      <div class="chart-card">
        <div class="chart-card-header">
          <h3 class="chart-card-title">Job Applications — Month Comparison</h3>
          <div class="chart-legend">
            <span class="legend-item">
              <span class="legend-dot" style="background:var(--color-primary-light)"></span>
              {{ jobsChartData.lastMonth?.label }}
            </span>
            <span class="legend-item">
              <span class="legend-dot" style="background:var(--color-accent)"></span>
              {{ jobsChartData.thisMonth?.label }}
            </span>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="!jobsChartData.allJobs.length" style="padding: 2rem 0; text-align: center; color: #94a3b8; font-size: 0.9rem;">
          No job applications recorded yet.
        </div>

        <!-- Horizontal comparison bars -->
        <div v-else class="jobs-comparison">
          <div v-for="(job, idx) in jobsChartData.allJobs" :key="'hj-'+idx" class="job-row">
            <!-- Role label -->
            <div class="job-role-label">{{ job }}</div>

            <div class="job-bars-group">
              <!-- Last month bar -->
              <div class="job-bar-row"
                   @mouseover="hoveredJobBar = { job, month: jobsChartData.lastMonth.label, count: jobsChartData.lastMonth.byJob[job] || 0, isThis: false }"
                   @mouseleave="hoveredJobBar = null"
                   :class="{ 'hovered': hoveredJobBar?.job === job && !hoveredJobBar?.isThis }">
                <div class="job-bar-track">
                  <div class="job-bar-fill last-month"
                       :style="{ width: ((jobsChartData.lastMonth.byJob[job] || 0) / jobsChartData.maxCount * 100) + '%' }"></div>
                </div>
                <span class="job-bar-count">{{ jobsChartData.lastMonth.byJob[job] || 0 }}</span>
              </div>

              <!-- This month bar -->
              <div class="job-bar-row"
                   @mouseover="hoveredJobBar = { job, month: jobsChartData.thisMonth.label, count: jobsChartData.thisMonth.byJob[job] || 0, isThis: true }"
                   @mouseleave="hoveredJobBar = null"
                   :class="{ 'hovered': hoveredJobBar?.job === job && hoveredJobBar?.isThis }">
                <div class="job-bar-track">
                  <div class="job-bar-fill this-month"
                       :style="{ width: ((jobsChartData.thisMonth.byJob[job] || 0) / jobsChartData.maxCount * 100) + '%' }"></div>
                </div>
                <span class="job-bar-count">{{ jobsChartData.thisMonth.byJob[job] || 0 }}</span>
              </div>
            </div>

            <!-- Delta indicator -->
            <div class="job-delta"
                 :class="{
                   'delta-up': (jobsChartData.thisMonth.byJob[job] || 0) > (jobsChartData.lastMonth.byJob[job] || 0),
                   'delta-down': (jobsChartData.thisMonth.byJob[job] || 0) < (jobsChartData.lastMonth.byJob[job] || 0),
                   'delta-flat': (jobsChartData.thisMonth.byJob[job] || 0) === (jobsChartData.lastMonth.byJob[job] || 0)
                 }">
              <span v-if="(jobsChartData.thisMonth.byJob[job] || 0) > (jobsChartData.lastMonth.byJob[job] || 0)">↑ +{{ (jobsChartData.thisMonth.byJob[job] || 0) - (jobsChartData.lastMonth.byJob[job] || 0) }}</span>
              <span v-else-if="(jobsChartData.thisMonth.byJob[job] || 0) < (jobsChartData.lastMonth.byJob[job] || 0)">↓ {{ (jobsChartData.thisMonth.byJob[job] || 0) - (jobsChartData.lastMonth.byJob[job] || 0) }}</span>
              <span v-else style="color:#94a3b8">—</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions & Activity Feed -->
    <div class="dashboard-content-grid">
      <!-- Quick Actions -->
      <div class="quick-actions-section">
        <h2 class="section-title">Quick Actions</h2>
        <div class="actions-grid">
          <router-link to="/admin/clients" class="action-card">
            <div class="action-icon-wrapper icon-wrapper-teal">
              <Plus :size="24" />
            </div>
            <div class="action-info">
              <h3>Add Client</h3>
              <p>Register a new client profile</p>
            </div>
          </router-link>

          <router-link to="/admin/partners" class="action-card">
            <div class="action-icon-wrapper icon-wrapper-indigo">
              <Plus :size="24" />
            </div>
            <div class="action-info">
              <h3>Add Partner</h3>
              <p>Onboard a new technology partner</p>
            </div>
          </router-link>

          <router-link to="/admin/jobs" class="action-card">
            <div class="action-icon-wrapper icon-wrapper-yellow">
              <Plus :size="24" />
            </div>
            <div class="action-info">
              <h3>Post Job</h3>
              <p>Create a new career opening</p>
            </div>
          </router-link>

          <router-link to="/admin/announcements" class="action-card">
            <div class="action-icon-wrapper icon-wrapper-blue">
              <Plus :size="24" />
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
            <div class="activity-avatar icon-wrapper-teal">
              <User :size="16" />
            </div>
            <div class="activity-content">
              <p class="activity-text"><span class="fw-bold">Admin</span> added a new client <strong>Ministry of Digital Economy</strong></p>
              <span class="activity-time">2 hours ago</span>
            </div>
          </div>

          <div class="activity-item">
            <div class="activity-avatar icon-wrapper-blue">
              <Megaphone :size="16" />
            </div>
            <div class="activity-content">
              <p class="activity-text"><span class="fw-bold">System</span> published announcement <strong>Q3 Quarterly Results</strong></p>
              <span class="activity-time">5 hours ago</span>
            </div>
          </div>

          <div class="activity-item">
            <div class="activity-avatar icon-wrapper-yellow">
              <Briefcase :size="16" />
            </div>
            <div class="activity-content">
              <p class="activity-text"><span class="fw-bold">HR Manager</span> posted a new job <strong>Senior Network Engineer</strong></p>
              <span class="activity-time">1 day ago</span>
            </div>
          </div>
          
          <div class="activity-item">
            <div class="activity-avatar icon-wrapper-indigo">
              <Network :size="16" />
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
import { ref, computed, onMounted } from 'vue';
import { api } from '@/services/api';
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
  User,
  Sparkles,
  Loader
} from 'lucide-vue-next';

const kpis = ref({
  totalConsultations: 0,
  totalContacts: 0,
  totalPartners: 0,
  totalClients: 0
});

const trends = ref({
  consultations: { change: 0, percent: 0, label: 'from last week', isPositive: true },
  contacts: { change: 0, percent: 0, label: 'from last week', isPositive: true },
  partners: { change: 0, percent: 0, label: 'from last month', isPositive: true },
  clients: { change: 0, percent: 0, label: 'from last month', isPositive: true }
});

const stats = ref({
  kpis: {
    totalConsultations: 0,
    totalContacts: 0,
    totalPartners: 0,
    totalClients: 0
  },
  consultationStatuses: {},
  consultationsByService: {},
  activityOverTime: [],
  visitsByDay: [],
  applicantsByMonth: []
});

const hoveredPoint = ref(null);
const hoveredRing = ref(null);
const hoveredRadarNode = ref(null);
const hoveredIndex = ref(null);
const seeding = ref(false);

const maxActivityVal = computed(() => {
  if (!stats.value.activityOverTime.length) return 5;
  const vals = stats.value.activityOverTime.flatMap(d => [d.consultations, d.contacts]);
  return Math.max(...vals, 5);
});

// ── Visits Bar Chart ────────────────────────────────────────────────────────
const hoveredVisitBar = ref(null);
const visitsChartData = computed(() => {
  const raw = stats.value.visitsByDay;
  if (!raw.length) {
    const last7 = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() - (6 - i));
      return { label: d.toLocaleDateString('en-US', { weekday: 'short' }), visits: 0 };
    });
    return { days: last7, maxVal: 5 };
  }
  const maxVal = Math.max(...raw.map(d => d.visits), 1);
  return { days: raw, maxVal };
});

// ── Monthly Job Applications Bar Chart ──────────────────────────────────────
const hoveredJobBar = ref(null);
const jobsChartData = computed(() => {
  const raw = stats.value.applicantsByMonth || [];
  const lastMonth = raw[0] ?? { label: '', byJob: {}, total: 0 };
  const thisMonth = raw[1] ?? { label: '', byJob: {}, total: 0 };
  const jobSet = new Set([
    ...Object.keys(lastMonth.byJob),
    ...Object.keys(thisMonth.byJob)
  ]);
  const allJobs = [...jobSet].slice(0, 6);
  const maxCount = Math.max(
    ...allJobs.map(j => Math.max(lastMonth.byJob[j] || 0, thisMonth.byJob[j] || 0)),
    1
  );
  return { lastMonth, thisMonth, allJobs, maxCount };
});

const points = computed(() => {
  if (!stats.value.activityOverTime.length) {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toLocaleDateString('en-US', { weekday: 'short' });
    }).reverse();
    const width = 600;
    const paddingLeft = 40;
    const paddingRight = 20;
    const chartWidth = width - paddingLeft - paddingRight;
    const stepX = chartWidth / 6;
    const emptyList = last7Days.map((label, index) => ({
      x: paddingLeft + index * stepX,
      y: 185,
      val: 0,
      label
    }));
    return { consultations: emptyList, contacts: emptyList };
  }
  
  const width = 600;
  const height = 220;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 35;
  
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  const maxVal = maxActivityVal.value;
  
  const items = stats.value.activityOverTime;
  const stepX = chartWidth / (items.length - 1 || 1);
  
  const consultations = items.map((d, index) => {
    const x = paddingLeft + index * stepX;
    const y = height - paddingBottom - (d.consultations / maxVal) * chartHeight;
    return { x, y, val: d.consultations, label: d.label, date: d.date };
  });

  const contacts = items.map((d, index) => {
    const x = paddingLeft + index * stepX;
    const y = height - paddingBottom - (d.contacts / maxVal) * chartHeight;
    return { x, y, val: d.contacts, label: d.label, date: d.date };
  });

  return { consultations, contacts };
});

const makeSplineLinePath = (pList) => {
  if (!pList.length) return '';
  let pathStr = `M ${pList[0].x} ${pList[0].y}`;
  for (let i = 0; i < pList.length - 1; i++) {
    const A = pList[i];
    const B = pList[i + 1];
    const cp1x = A.x + (B.x - A.x) / 2;
    const cp1y = A.y;
    const cp2x = A.x + (B.x - A.x) / 2;
    const cp2y = B.y;
    pathStr += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${B.x} ${B.y}`;
  }
  return pathStr;
};

const makeSplineAreaPath = (pList) => {
  if (!pList.length) return '';
  const linePath = makeSplineLinePath(pList);
  const first = pList[0];
  const last = pList[pList.length - 1];
  const yBase = 220 - 35; // height - paddingBottom
  return `${linePath} L ${last.x} ${yBase} L ${first.x} ${yBase} Z`;
};

const paths = computed(() => {
  const pts = points.value;
  return {
    consultationsLine: makeSplineLinePath(pts.consultations),
    consultationsArea: makeSplineAreaPath(pts.consultations),
    contactsLine: makeSplineLinePath(pts.contacts),
    contactsArea: makeSplineAreaPath(pts.contacts)
  };
});

const activePointDetail = computed(() => {
  if (hoveredIndex.value === null) return null;
  const idx = hoveredIndex.value;
  const cPt = points.value.consultations[idx];
  const oPt = points.value.contacts[idx];
  if (!cPt || !oPt) return null;
  return {
    label: cPt.label,
    date: cPt.date,
    x: cPt.x,
    consultationsY: cPt.y,
    contactsY: oPt.y,
    consultationsVal: cPt.val,
    contactsVal: oPt.val
  };
});

const handleMouseMove = (event) => {
  const pts = points.value.consultations;
  if (!pts || !pts.length) return;

  const svg = event.currentTarget;
  const rect = svg.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  
  const viewBoxWidth = 600;
  const scaleX = viewBoxWidth / rect.width;
  const xInSvg = mouseX * scaleX;

  let closestIdx = 0;
  let minDiff = Infinity;
  for (let i = 0; i < pts.length; i++) {
    const diff = Math.abs(pts[i].x - xInSvg);
    if (diff < minDiff) {
      minDiff = diff;
      closestIdx = i;
    }
  }
  hoveredIndex.value = closestIdx;
};

const handleMouseLeave = () => {
  hoveredIndex.value = null;
};

const radialRings = computed(() => {
  const statuses = stats.value.consultationStatuses || {};
  const total = Object.values(statuses).reduce((sum, v) => sum + v, 0);
  if (total === 0) return [];

  const ringsConfig = [
    { key: 'Resolved',    color: 'var(--color-accent)',         r: 24 },
    { key: 'In Progress', color: 'var(--color-primary-light)',  r: 36 },
    { key: 'Replied',     color: 'var(--color-primary)',        r: 48 },
    { key: 'New',         color: 'var(--color-neutral-muted)', r: 60 }
  ];

  return ringsConfig.map(cfg => {
    const count = statuses[cfg.key] || 0;
    const percent = count / total;
    const circumference = 2 * Math.PI * cfg.r;
    const strokeDashoffset = circumference - (percent * circumference);

    return {
      status: cfg.key,
      count,
      percent: Math.round(percent * 100),
      color: cfg.color,
      r: cfg.r,
      circumference,
      strokeDashoffset
    };
  });
});

const radarConfig = computed(() => {
  const industryStats = stats.value.consultationsByIndustry || {};
  const defaultIndustries = ['Government', 'Finance', 'Healthcare', 'Education', 'Enterprise'];
  const maxVal = Math.max(...defaultIndustries.map(s => industryStats[s] || 0), 5);

  const cx = 140;
  const cy = 100;
  const R = 60;

  const sidebarColors = [
    'var(--color-primary)',
    'var(--color-primary-light)',
    'var(--color-neutral-muted)',
    'var(--color-accent)',
    'var(--color-accent-hover)'
  ];

  const axes = defaultIndustries.map((name, i) => {
    const angle = i * (2 * Math.PI / 5) - Math.PI / 2;
    return { name, angle };
  });

  const gridPolygons = [0.25, 0.5, 0.75, 1.0].map(scale => {
    return axes.map(ax => {
      const x = cx + R * scale * Math.cos(ax.angle);
      const y = cy + R * scale * Math.sin(ax.angle);
      return `${x},${y}`;
    }).join(' ');
  });

  const axisLines = axes.map(ax => {
    const x = cx + R * Math.cos(ax.angle);
    const y = cy + R * Math.sin(ax.angle);
    const offset = ax.name.length > 15 ? 20 : 12;
    return {
      x1: cx,
      y1: cy,
      x2: x,
      y2: y,
      labelX: cx + (R + offset) * Math.cos(ax.angle),
      labelY: cy + (R + 10) * Math.sin(ax.angle) + 3,
      name: ax.name.split(' ')[0]
    };
  });

  const dataPoints = axes.map((ax, idx) => {
    const count = industryStats[ax.name] || 0;
    const valueScale = count / maxVal;
    const x = cx + R * valueScale * Math.cos(ax.angle);
    const y = cy + R * valueScale * Math.sin(ax.angle);
    return { x, y, name: ax.name, count, color: sidebarColors[idx] || '#64748b' };
  });

  const webPolygonString = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

  return {
    cx,
    cy,
    R,
    gridPolygons,
    axisLines,
    dataPoints,
    webPolygonString
  };
});

const loadStats = async () => {
  try {
    const data = await api.getDashboardStats();
    stats.value = data;
    kpis.value = data.kpis;
    if (data.trends) {
      trends.value = data.trends;
    }
  } catch (err) {
    console.error('Failed to load dashboard statistics', err);
  }
};

const handleSeedData = async () => {
  seeding.value = true;
  try {
    await api.seedDemoData();
    await loadStats();
  } catch (err) {
    console.error('Failed to seed demo data via HTTP', err);
  } finally {
    seeding.value = false;
  }
};

onMounted(loadStats);
</script>

<style scoped>
.dashboard-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Empty State Banner */
.empty-state-banner {
  background: linear-gradient(135deg, #eff6ff 0%, #faf5ff 100%);
  border: 1px solid #dbeafe;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}

@media (max-width: 768px) {
  .empty-state-banner {
    flex-direction: column;
    align-items: flex-start;
  }
}

.banner-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.banner-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.1);
  flex-shrink: 0;
}

.icon-sparkles {
  color: var(--color-accent);
}

.banner-text h3 {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-primary);
  margin: 0 0 0.25rem 0;
}

.banner-text p {
  font-size: 0.85rem;
  color: var(--color-text-main);
  margin: 0;
  line-height: 1.4;
}

.btn-seed {
  background: var(--color-accent);
  color: var(--color-primary-dark);
  border: none;
  padding: 0.75rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: var(--border-radius);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 10px rgba(249, 178, 51, 0.25);
  transition: var(--transition);
  white-space: nowrap;
}

.btn-seed:hover {
  background: var(--color-accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(249, 178, 51, 0.35);
}

.btn-seed:active {
  transform: translateY(0);
}

.btn-seed:disabled {
  background: #cbd5e1;
  color: #94a3b8;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.icon-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* KPI Grid with Clean 3D Flip */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.kpi-card-wrapper {
  background-color: transparent;
  perspective: 1200px;
  height: 130px;
}

.kpi-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-style: preserve-3d;
  cursor: pointer;
}

.kpi-card-wrapper:hover .kpi-card-inner {
  transform: rotateY(180deg);
}

.kpi-card-front, .kpi-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 12px;
  border: 1px solid var(--card-border);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: var(--card-shadow);
  background: var(--card-bg);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.kpi-card-back {
  transform: rotateY(180deg);
  justify-content: center;
  align-items: center;
}

/* Front Face Elements */
.kpi-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.kpi-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.kpi-icon-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.kpi-body {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: auto;
}

.kpi-value {
  font-size: 2rem;
  font-weight: 750;
  color: var(--color-primary);
  line-height: 1;
}

.kpi-trend-text {
  font-size: 0.78rem;
  font-weight: 600;
}

.kpi-trend-text.pos { color: #10b981; }
.kpi-trend-text.neg { color: #ef4444; }

/* Back Face Elements */
.trend-back-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
}

.back-stat {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 0.25rem;
  letter-spacing: -0.02em;
}

.back-stat.pos { color: #10b981; }
.back-stat.neg { color: #ef4444; }

.back-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* Soft gradients for the back faces */
.bg-back-yellow {
  background: linear-gradient(135deg, var(--color-bg-light) 0%, rgba(249, 178, 51, 0.05) 100%);
  border: 1px solid rgba(249, 178, 51, 0.15);
}
.bg-back-blue {
  background: linear-gradient(135deg, var(--color-bg-light) 0%, rgba(40, 64, 110, 0.05) 100%);
  border: 1px solid rgba(40, 64, 110, 0.15);
}
.bg-back-indigo {
  background: linear-gradient(135deg, var(--color-bg-light) 0%, rgba(79, 70, 229, 0.05) 100%);
  border: 1px solid rgba(79, 70, 229, 0.15);
}
.bg-back-teal {
  background: linear-gradient(135deg, var(--color-bg-light) 0%, rgba(13, 148, 136, 0.05) 100%);
  border: 1px solid rgba(13, 148, 136, 0.15);
}

/* Brand-themed Icon Wrappers with System Tokens */
.icon-wrapper-yellow {
  background-color: var(--color-accent-soft) !important;
  color: var(--color-accent) !important;
}

.icon-wrapper-blue {
  background-color: var(--color-primary-light-soft) !important;
  color: var(--color-primary-light) !important;
}

.icon-wrapper-indigo {
  background-color: var(--color-indigo-soft) !important;
  color: var(--color-indigo) !important;
}

.icon-wrapper-teal {
  background-color: var(--color-teal-soft) !important;
  color: var(--color-teal) !important;
}

/* Visual Charts Grid */
.charts-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

.secondary-charts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

/* Full-width row for the jobs comparison chart */
.full-width-chart-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

/* Horizontal comparison bar chart layout */
.jobs-comparison {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-top: 0.25rem;
}

.job-row {
  display: grid;
  grid-template-columns: 200px 1fr 60px;
  align-items: center;
  gap: 1rem;
}

.job-role-label {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--color-primary-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.job-bars-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.job-bar-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: default;
  padding: 2px 4px;
  border-radius: 4px;
  transition: background 0.15s;
}

.job-bar-row.hovered {
  background: rgba(26, 42, 74, 0.04);
}

.job-bar-track {
  flex: 1;
  height: 8px;
  background: #f1f5f9;
  border-radius: 99px;
  overflow: hidden;
}

.job-bar-fill {
  height: 100%;
  border-radius: 99px;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 0;
}

.job-bar-fill.last-month {
  background: var(--color-primary-light);
  opacity: 0.7;
}

.job-bar-fill.this-month {
  background: var(--color-accent);
}

.job-bar-count {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-primary-dark);
  width: 20px;
  text-align: right;
  flex-shrink: 0;
}

.job-delta {
  font-size: 0.78rem;
  font-weight: 700;
  text-align: center;
}

.delta-up { color: #22c55e; }
.delta-down { color: #ef4444; }
.delta-flat { color: #94a3b8; }

@media (max-width: 1024px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}

.visits-bar, .job-bar {
  cursor: pointer;
  transition: opacity 0.15s ease, filter 0.15s ease;
}
.visits-bar:hover, .job-bar:hover {
  opacity: 1 !important;
  filter: brightness(1.12);
}

.chart-card {
  background: var(--card-bg);
  border-radius: var(--card-radius);
  padding: 1.5rem;
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow);
  position: relative;
  display: flex;
  flex-direction: column;
  transition: var(--transition);
}

.chart-card:hover {
  box-shadow: var(--card-shadow-hover);
}

.chart-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.chart-card-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary);
}

.chart-legend {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.legend-dot.bg-accent { background-color: var(--color-accent); }
.legend-dot.bg-primary-light { background-color: var(--color-primary-light); }

.chart-container {
  position: relative;
  width: 100%;
}

.svg-chart {
  display: block;
}

.chart-area {
  opacity: 0.5;
  transition: opacity 0.3s;
}

.chart-area:hover {
  opacity: 0.7;
}

.axis-label {
  font-size: 10px;
  fill: var(--color-text-muted);
  font-weight: 500;
}

.dot {
  cursor: pointer;
  transition: r 0.2s, stroke-width 0.2s;
  fill: white;
  stroke-width: 2.5;
}

.dot-consultation {
  stroke: var(--color-accent);
}

.dot-contact {
  stroke: var(--color-primary-light);
}

.dot:hover {
  r: 7;
  stroke-width: 3.5;
}

/* Pulse dot animation */
.pulse-dot {
  pointer-events: none;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { stroke-width: 2; r: 5; }
  50% { stroke-width: 4; r: 7; }
  100% { stroke-width: 2; r: 5; }
}

/* Concentric Radial Progress Rings Styles */
.radial-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  justify-content: center;
  height: 100%;
}

.radial-chart-svg {
  position: relative;
  width: 150px;
  height: 150px;
}

.radial-segment {
  cursor: pointer;
  transition: stroke-width 0.2s, stroke 0.2s;
}

.radial-segment:hover {
  stroke-width: 11;
}

.radial-center-info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
}

.radial-center-count {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
}

.radial-center-label {
  font-size: 9px;
  fill: var(--color-text-muted);
  color: var(--color-text-muted);
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 0.25rem;
}

.radial-tooltip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--color-primary-dark);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  pointer-events: none;
  box-shadow: 0 4px 6px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  width: 140px;
  text-align: center;
}

.radial-legend {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.radial-legend-row {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: var(--color-text-main);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s;
  cursor: pointer;
}

.radial-legend-row.highlight {
  background-color: var(--color-bg-alt);
}

.radial-legend-row .legend-dot {
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.legend-text-name {
  color: var(--color-text-muted);
  flex-grow: 1;
  font-weight: 500;
}

.legend-text-percent {
  font-weight: 600;
  color: var(--color-primary);
  margin-right: 0.25rem;
}

.legend-text-count {
  color: var(--color-text-muted);
  font-size: 0.75rem;
}

/* Radar Chart Styles */
.radar-wrapper {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1.5rem;
  align-items: center;
}

@media (max-width: 640px) {
  .radar-wrapper {
    grid-template-columns: 1fr;
  }
}

.radar-chart-main {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 44px; /* headroom for inline SVG tooltips above top nodes */
}

.radar-grid-poly {
  fill: none;
  stroke: #f1f5f9;
  stroke-width: 1;
}

.radar-axis-line {
  stroke: #e2e8f0;
  stroke-width: 1;
  stroke-dasharray: 2 2;
}

.radar-web {
  fill: rgba(40, 64, 110, 0.22);
  stroke: var(--color-primary);
  stroke-width: 2.5;
  stroke-linejoin: round;
  transition: all 0.3s;
}

.radar-web:hover {
  fill: rgba(40, 64, 110, 0.3);
  stroke-width: 3.5;
}

.radar-dot {
  fill: white;
  stroke: var(--color-accent);
  stroke-width: 2;
  cursor: pointer;
  transition: r 0.2s, stroke-width 0.2s, fill 0.2s;
}

.radar-dot:hover {
  r: 6;
  stroke-width: 3;
  fill: var(--color-accent);
}

.radar-label {
  font-size: 9px;
  fill: var(--color-text-muted);
  font-weight: 600;
  text-anchor: middle;
}


.radar-info-sidebar {
  border-left: 1px solid #e2e8f0;
  padding-left: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 640px) {
  .radar-info-sidebar {
    border-left: none;
    padding-left: 0;
    border-top: 1px solid #e2e8f0;
    padding-top: 1rem;
  }
}

.sidebar-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.radar-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.radar-list-item {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: var(--color-text-main);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.radar-list-item.highlight {
  background-color: var(--color-bg-alt);
}

.radar-item-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.radar-item-name {
  color: var(--color-text-muted);
  flex-grow: 1;
  font-weight: 500;
}

.radar-item-count {
  font-weight: 600;
  color: var(--color-primary);
}

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
  color: var(--color-primary);
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
  color: var(--color-accent);
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
}

.btn-text:hover {
  text-decoration: underline;
  color: var(--color-accent-hover);
}

/* Quick Actions */
.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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
  transition: var(--transition);
  cursor: pointer;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--box-shadow-hover);
  border-color: #cbd5e1;
}

.action-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-info h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 0.25rem;
}

.action-info p {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin: 0;
  line-height: 1.4;
}

/* Activity Feed */
.activity-feed-section {
  background: var(--card-bg);
  border-radius: var(--card-radius);
  padding: 1.5rem;
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow);
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
  color: var(--color-text-main);
  margin: 0;
  line-height: 1.4;
}

.fw-bold {
  font-weight: 600;
  color: var(--color-primary);
}

.activity-time {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}
</style>
