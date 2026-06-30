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
