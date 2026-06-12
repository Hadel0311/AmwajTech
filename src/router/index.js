import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ServicesView from '../views/ServicesView.vue'
import ServiceDetailView from '../views/ServiceDetailView.vue'
import IndustriesView from '../views/IndustriesView.vue'
import IndustryDetailView from '../views/IndustryDetailView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ContactView from '../views/ContactView.vue'
import PartnersView from '../views/PartnersView.vue'
import PartnerDetailView from '../views/PartnerDetailView.vue'
import ClientsView from '../views/ClientsView.vue'
import ClientDetailView from '../views/ClientDetailView.vue'

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
    { path: '/contact', name: 'contact', component: ContactView },
    { path: '/partners', name: 'partners', component: PartnersView },
    { path: '/partners/:id', name: 'partner-detail', component: PartnerDetailView },
    { path: '/clients', name: 'clients', component: ClientsView },
    { path: '/clients/:id', name: 'client-detail', component: ClientDetailView }
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
