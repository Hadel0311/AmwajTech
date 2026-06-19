<template>
  <main class="projects-page">
    <!-- Hero Section -->
    <section class="page-hero">
      <div class="page-hero-content container">
        <span class="page-cta-tag">{{ t('nav.projects') || 'Projects' }}</span>
        <h1>{{ t('projects.title') }}</h1>
        <p>{{ t('projects.subtitle') }}</p>
      </div>
    </section>
    <ProjectsSection @open-project-modal="openModal" />
  </main>
</template>

<script setup>
import { inject } from 'vue'
import ProjectsSection from '@/components/ProjectsSection.vue'

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
