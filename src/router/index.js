import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ServicesView from '../views/ServicesView.vue'
import ServiceDetailView from '../views/ServiceDetailView.vue'
import IndustriesView from '../views/IndustriesView.vue'
import IndustryDetailView from '../views/IndustryDetailView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ContactView from '../views/ContactView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/services', name: 'services', component: ServicesView },
    { path: '/services/:id', name: 'service-detail', component: ServiceDetailView },
    { path: '/industries', name: 'industries', component: IndustriesView },
    { path: '/industries/:id', name: 'industry-detail', component: IndustryDetailView },
    { path: '/projects', name: 'projects', component: ProjectsView },
    { path: '/contact', name: 'contact', component: ContactView }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, left: 0 }
    }
  }
})

export default router
