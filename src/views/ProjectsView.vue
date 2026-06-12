<template>
  <main class="projects-page">
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
