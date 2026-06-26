import { createRouter, createWebHashHistory } from 'vue-router'
// Lazy loaded views

import LoginView from '../views/admin/Login.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
    { path: '/services', name: 'services', component: () => import('../views/ServicesView.vue') },
    { path: '/services/:id', name: 'service-detail', component: () => import('../views/ServiceDetailView.vue') },
    { path: '/industries', name: 'industries', component: () => import('../views/IndustriesView.vue') },
    { path: '/industries/:id', name: 'industry-detail', component: () => import('../views/IndustryDetailView.vue') },
    { path: '/projects', name: 'projects', component: () => import('../views/ProjectsView.vue') },
    { path: '/request-consultation', name: 'request-consultation', component: () => import('../views/RequestConsultationView.vue') },
    { path: '/partners', name: 'partners', component: () => import('../views/PartnersView.vue') },
    { path: '/partners/:id', name: 'partner-detail', component: () => import('../views/PartnerDetailView.vue') },
    { path: '/clients', name: 'clients', component: () => import('../views/ClientsView.vue') },
    { path: '/careers', name: 'careers', component: () => import('../views/CareersView.vue') },
    { path: '/contact', name: 'contact', component: () => import('../views/ContactView.vue') },
    
    // Admin Routes
    { path: '/login', name: 'login', component: LoginView },
    { 
      path: '/admin', 
      name: 'admin', 
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('../views/admin/Dashboard.vue')
        },
        {
          path: 'announcements',
          name: 'admin-announcements',
          component: () => import('../views/admin/ManageAnnouncements.vue')
        },
        {
          path: 'services',
          name: 'admin-services',
          component: () => import('../views/admin/ManageServices.vue')
        },
        {
          path: 'partners',
          name: 'admin-partners',
          component: () => import('../views/admin/ManagePartners.vue')
        },
        {
          path: 'clients',
          name: 'admin-clients',
          component: () => import('../views/admin/ManageClients.vue')
        },
        {
          path: 'jobs',
          name: 'admin-jobs',
          component: () => import('../views/admin/ManageJobs.vue')
        },
        {
          path: 'jobs/:jobId/applicants',
          name: 'admin-job-applicants',
          component: () => import('../views/admin/ManageApplicants.vue')
        },
        {
          path: 'contacts',
          name: 'admin-contacts',
          component: () => import('../views/admin/ManageContacts.vue')
        },
        {
          path: 'consultations',
          name: 'admin-consultations',
          component: () => import('../views/admin/ManageConsultations.vue')
        },
        {
          path: 'settings/email/:type',
          name: 'admin-email-settings',
          component: () => import('../views/admin/ManageEmailSettings.vue')
        },
        {
          path: 'settings/account',
          name: 'admin-account-settings',
          component: () => import('../views/admin/Settings.vue')
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, left: 0 }
    }
  }
})

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  // Check for our custom JWT
  const token = localStorage.getItem('amwaj_token') || sessionStorage.getItem('amwaj_token');
  const isAuthenticated = !!token;
  
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/admin')
  } else {
    next()
  }
})

export default router
