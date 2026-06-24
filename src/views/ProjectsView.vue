<template>
  <main class="projects-page">
    <!-- Hero Section -->
    <InternalHero
      :category="t('nav.projects') || 'Projects'"
      :title="t('projects.title')"
      :description="t('projects.subtitle')"
      theme="light"
      size="medium"
      image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
    />
    <ProjectsSection @open-project-modal="openModal" />
  </main>
</template>

<script setup>
import InternalHero from '@/components/InternalHero.vue'
import { inject } from 'vue'
import { useI18n } from 'vue-i18n'
import ProjectsSection from '@/components/ProjectsSection.vue'

const { t } = useI18n()

const openProjectModal = inject('openProjectModal')

const openModal = (key) => {
  if (openProjectModal) {
    openProjectModal(key)
  }
}
</script>

<style scoped>
.projects-page {
  background-color: var(--color-bg-primary);
}
</style>
