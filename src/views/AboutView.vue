<template>
  <main class="about-view">
    <!-- Header Banner -->
    <InternalHero
      :category="t('nav.about') || 'About Us'"
      :title="t('about.title')"
      :description="t('about.subtitle')"
      theme="light"
      size="medium"
      image="/images/about-hero.jpg"
    />

    <!-- Company Overview, Mission, Vision, and Core Values -->
    <CompanyOverview />
  </main>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import CompanyOverview from '@/components/CompanyOverview.vue'
import InternalHero from '@/components/InternalHero.vue'

const { t } = useI18n()
</script>

<style scoped>
.page-header {
  background-color: var(--color-primary-dark);
  padding: 5rem 0;
  text-align: center;
  color: var(--color-text-inverse);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-title {
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: var(--font-bold);
  font-family: var(--font-heading, 'Montserrat', sans-serif);
  margin-bottom: 0.75rem;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #94a3b8;
  letter-spacing: 1px;
  text-transform: uppercase;
}

</style>
