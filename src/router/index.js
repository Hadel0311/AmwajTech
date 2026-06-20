import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ServicesView from '../views/ServicesView.vue'
import ServiceDetailView from '../views/ServiceDetailView.vue'
import IndustriesView from '../views/IndustriesView.vue'
import IndustryDetailView from '../views/IndustryDetailView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import RequestConsultationView from '../views/RequestConsultationView.vue'
import PartnersView from '../views/PartnersView.vue'
import PartnerDetailView from '../views/PartnerDetailView.vue'
import ClientsView from '../views/ClientsView.vue'
import ClientDetailView from '../views/ClientDetailView.vue'
import CareersView from '../views/CareersView.vue'
import ContactView from '../views/ContactView.vue'

import LoginView from '../views/admin/Login.vue'
import { auth } from '../firebase/config.js'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/services', name: 'services', component: ServicesView },
    { path: '/services/:id', name: 'service-detail', component: ServiceDetailView },
    { path: '/industries', name: 'industries', component: IndustriesView },
    { path: '/industries/:id', name: 'industry-detail', component: IndustryDetailView },
    { path: '/projects', name: 'projects', component: ProjectsView },
    { path: '/request-consultation', name: 'request-consultation', component: RequestConsultationView },
    { path: '/partners', name: 'partners', component: PartnersView },
    { path: '/partners/:id', name: 'partner-detail', component: PartnerDetailView },
    { path: '/clients', name: 'clients', component: ClientsView },
    { path: '/clients/:id', name: 'client-detail', component: ClientDetailView },
    { path: '/careers', name: 'careers', component: CareersView },
    { path: '/contact', name: 'contact', component: ContactView },
    
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
          path: 'partners',
          name: 'admin-partners',
          component: () => import('../views/admin/ManagePartners.vue')
        },
        {
          path: 'clients',
          name: 'admin-clients',
          component: () => import('../views/admin/ManageClients.vue')
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
  
  // Wait for auth to initialize before checking
  await auth.authStateReady();
  const isAuthenticated = auth.currentUser
  
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/admin')
  } else {
    next()
  }
})

export default router
