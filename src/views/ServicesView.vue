<template>
  <main class="services-view">
    <!-- Header Banner -->
    <InternalHero
      :category="t('nav.services') || 'Our Services'"
      :title="t('services.title')"
      :description="t('services.subtitle')"
      theme="navy"
      size="medium"
      image="/images/core-enterprise-hero.jpg"
    />

    <!-- Services Grid section -->
    <OverviewCardGrid :items="serviceItems" variant="service" />
  </main>
</template>

<script setup>
import InternalHero from '@/components/InternalHero.vue'
import OverviewCardGrid from '@/components/OverviewCardGrid.vue'
import { useI18n } from 'vue-i18n'
import { ref, computed, onMounted } from 'vue'
import { api } from '@/services/api'
import { IconMap } from '@/utils/iconMap'
import { Layers } from 'lucide-vue-next'

const { t, te, locale } = useI18n()
const services = ref([])

// Use an Arabic translation only when one exists; admin content shows as-is.
const localized = (key, fallback) =>
  locale.value === 'ar' && te(key) ? t(key) : fallback

onMounted(async () => {
  try {
    const data = await api.getAll('services')
    services.value = data.sort((a, b) => (a.order || 0) - (b.order || 0))
  } catch (err) {
    console.error('Failed to load services', err)
  }
})

const getIcon = (iconName) => {
  return IconMap[iconName] || Layers
}

const serviceItems = computed(() =>
  services.value.map((service) => ({
    to: `/services/${service.id || service.key}`,
    icon: getIcon(service.icon),
    title: localized(`services.items.${service.key}.title`, service.title),
    desc: localized(`services.items.${service.key}.description`, service.description),
    action: t('services.exploreOffering')
  }))
)
</script>
