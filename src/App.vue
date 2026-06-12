<template>
  <div id="app">
    <!-- Navigation Header -->
    <Header />

    <!-- Main Dynamic Route View -->
    <router-view />

    <!-- Footer -->
    <Footer />

    <!-- Case Study Prototype Modal -->
    <ProjectModal 
      :is-open="isModalOpen" 
      :project-key="activeProjectKey" 
      @close="closeModal" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, provide } from 'vue'
import { useI18n } from 'vue-i18n'

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ProjectModal from '@/components/ProjectModal.vue'

const { locale } = useI18n()
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

onMounted(() => {
  // Load saved language from localStorage, fallback to English
  const savedLang = localStorage.getItem('Amwaj-Tech-language')
  if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
    currentLocale.value = savedLang
    locale.value = savedLang
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = savedLang
  } else {
    document.documentElement.dir = 'ltr'
    document.documentElement.lang = 'en'
  }
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
  margin-top: 80px; /* Offset fixed header */
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