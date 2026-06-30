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
import { applySeo } from '@/composables/useSeo.js'

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ProjectModal from '@/components/ProjectModal.vue'
import FloatingContactButton from '@/components/FloatingContactButton.vue'

const route = useRoute()
const router = useRouter()

const isPublicRoute = computed(() => {
  return !route.path.startsWith('/admin') && route.path !== '/login'
})
const { locale, t, te } = useI18n()
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

const SERVICE_SLUG_MAP: Record<string, string> = {
  'network-infrastructure': 'network_infrastructure',
  'network-security': 'network_security',
  'data-center': 'data_center',
  'cloud-services': 'cloud_services',
  'software-solutions': 'software_solutions',
  'technical-support': 'technical_support'
}

// Maps a route name to its SEO page key in the `seo.pages.*` namespace.
const ROUTE_TO_SEO_KEY: Record<string, string> = {
  home: 'home',
  about: 'about',
  services: 'services',
  industries: 'industries',
  projects: 'projects',
  partners: 'partners',
  'partner-detail': 'partners',
  clients: 'clients',
  'client-detail': 'clients',
  careers: 'careers',
  contact: 'contact',
  'request-consultation': 'consultation'
}

const resolveSeo = (): { title: string; description: string } => {
  const siteName = t('seo.siteName')
  const defaultDesc = t('seo.defaultDescription')
  const name = route.name as string

  // Service detail: derive title/description from the specific service content.
  if (name === 'service-detail') {
    const key = SERVICE_SLUG_MAP[route.params.id as string]
    if (key && te(`services.items.${key}.title`)) {
      return {
        title: `${t(`services.items.${key}.title`)} | ${siteName}`,
        description: te(`services.items.${key}.description`) ? t(`services.items.${key}.description`) : defaultDesc
      }
    }
    return { title: `${t('seo.pages.services.title')} | ${siteName}`, description: t('seo.pages.services.description') }
  }

  // Industry detail: derive title/description from the specific sector content.
  if (name === 'industry-detail') {
    const key = route.params.id as string
    if (key && te(`industries.sectors.${key}.title`)) {
      return {
        title: `${t(`industries.sectors.${key}.title`)} | ${siteName}`,
        description: te(`industries.sectors.${key}.description`) ? t(`industries.sectors.${key}.description`) : defaultDesc
      }
    }
    return { title: `${t('seo.pages.industries.title')} | ${siteName}`, description: t('seo.pages.industries.description') }
  }

  const pageKey = ROUTE_TO_SEO_KEY[name]
  if (pageKey === 'home') {
    return { title: t('seo.pages.home.title'), description: t('seo.pages.home.description') }
  }
  if (pageKey) {
    return { title: `${t(`seo.pages.${pageKey}.title`)} | ${siteName}`, description: t(`seo.pages.${pageKey}.description`) }
  }

  // Admin / login / unknown routes.
  return { title: siteName, description: defaultDesc }
}

const updateTitleAndMeta = () => {
  const isPrivate = route.path.startsWith('/admin') || route.path === '/login'
  const { title, description } = resolveSeo()
  applySeo({
    title,
    description,
    path: route.path,
    locale: locale.value,
    index: !isPrivate
  })
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