<template>
  <div id="app">
    <!-- Navigation Header -->
    <Header v-if="isPublicRoute" />

    <!-- Main Dynamic Route View -->
    <router-view />

    <!-- Footer -->
    <Footer v-if="isPublicRoute" />

    <!-- Case Study Prototype Modal -->
    <ProjectModal 
      v-if="isPublicRoute"
      :is-open="isModalOpen" 
      :project-key="activeProjectKey" 
      @close="closeModal" 
    />

    <!-- Floating Contact Button -->
    <FloatingContactButton v-if="isPublicRoute" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, provide, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { api } from '@/services/api.js'

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ProjectModal from '@/components/ProjectModal.vue'
import FloatingContactButton from '@/components/FloatingContactButton.vue'

const route = useRoute()
const router = useRouter()

const isPublicRoute = computed(() => {
  return !route.path.startsWith('/admin') && route.path !== '/login'
})
const { locale, t } = useI18n()
const currentLocale = ref('en')
const isModalOpen = ref(false)
const activeProjectKey = ref('')

const openModal = (projectKey: string) => {
  activeProjectKey.value = projectKey
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  activeProjectKey.value = ''
}

// Expose openModal to downstream routed page views using dependency injection
provide('openProjectModal', openModal)

const updateTitleAndMeta = () => {
  let titleKey = ''
  let customTitle = ''
  
  switch (route.name) {
    case 'home':
      titleKey = 'nav.tagline'
      break
    case 'about':
      titleKey = 'nav.about'
      break
    case 'services':
      titleKey = 'nav.services'
      break
    case 'service-detail':
      const serviceId = route.params.id as string
      const serviceMapping: Record<string, string> = {
        'network-infrastructure': 'network_infrastructure',
        'network-security': 'network_security',
        'data-center': 'data_center',
        'cloud-services': 'cloud_services',
        'software-solutions': 'software_solutions',
        'technical-support': 'technical_support'
      }
      const sKey = serviceMapping[serviceId]
      if (sKey) {
        titleKey = `services.items.${sKey}.title`
      }
      break
    case 'industries':
      titleKey = 'nav.industries'
      break
    case 'industry-detail':
      const sectorId = route.params.id as string
      const sectorMapping: Record<string, string> = {
        'banking': 'banking',
        'government': 'government',
        'healthcare': 'healthcare',
        'education': 'education',
        'enterprise': 'enterprise',
        'industrial': 'industrial'
      }
      const secKey = sectorMapping[sectorId]
      if (secKey) {
        titleKey = `industries.sectors.${secKey}.title`
      }
      break
    case 'projects':
      titleKey = 'nav.projects'
      break
    case 'contact':
      titleKey = 'nav.contact'
      break
    case 'partners':
      titleKey = 'nav.partners'
      break
    case 'partner-detail':
      titleKey = 'nav.partners'
      break
    case 'clients':
      titleKey = 'nav.clients'
      break
    case 'client-detail':
      titleKey = 'nav.clients'
      break
  }
  
  const baseTitle = t('nav.companyName')
  if (customTitle) {
    document.title = customTitle
  } else if (titleKey) {
    document.title = `${baseTitle} | ${t(titleKey)}`
  } else {
    document.title = baseTitle
  }
  
  // Update description tag dynamically
  const metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) {
    if (locale.value === 'ar') {
      metaDesc.setAttribute('content', 'أمواج الأردن: تمكين عملك من خلال التكنولوجيا المبتكرة. حلول تقنية قابلة للتطوير وموثوقة وآمنة للمؤسسات والجهات الحكومية.')
    } else {
      metaDesc.setAttribute('content', 'Amwaj Tech: Empowering your business through innovative technology. Scalable, reliable, and secure enterprise infrastructure solutions.')
    }
  }
}

watch([() => route.path, locale], () => {
  updateTitleAndMeta()
  
  // Force LTR for admin routes, otherwise use locale-based direction
  if (route.path.startsWith('/admin')) {
    document.documentElement.dir = 'ltr'
  } else {
    document.documentElement.dir = locale.value === 'ar' ? 'rtl' : 'ltr'
  }
}, { immediate: true })

// Track visits separately — only fires when the path ACTUALLY navigates away and back
const lastTrackedPath = ref('')

function sendVisit(path: string) {
  if (!path || path === lastTrackedPath.value) return
  if (path !== '/') return
  lastTrackedPath.value = path
  api.trackVisit(path)
}

// Only watch for actual SPA navigations AFTER initial load
watch(() => route.path, (newPath) => {
  sendVisit(newPath)
})

onMounted(async () => {
  // Load saved language from localStorage, fallback to English
  const savedLang = localStorage.getItem('Amwaj-Tech-language')
  if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
    currentLocale.value = savedLang
    locale.value = savedLang
    document.documentElement.dir = (savedLang === 'ar' && !route.path.startsWith('/admin')) ? 'rtl' : 'ltr'
    document.documentElement.lang = savedLang
  } else {
    document.documentElement.dir = 'ltr'
    document.documentElement.lang = 'en'
  }

  // Wait for router to fully resolve the first navigation before tracking
  // nextTick() is NOT enough — router.isReady() guarantees the actual destination path
  await router.isReady()
  sendVisit(route.path)
})
</script>

<style>
/* Global Layout Spacing adjustments for enterprise design */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  margin-top: var(--navbar-height, 68px);
  background-color: var(--color-bg-primary);
}

/* Ensure Tajawal font and direction applies cleanly globally */
[dir="rtl"] {
  text-align: right;
}

[dir="rtl"] main {
  direction: rtl;
}
</style>