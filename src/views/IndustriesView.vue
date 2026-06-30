<template>
  <main class="industries-view">
    <!-- Header Banner -->
    <InternalHero
      :category="t('nav.industries') || 'Industries'"
      :title="t('industries.title')"
      :description="t('industries.subtitle')"
      theme="dark"
      size="medium"
      image="/images/sectors-hero.jpg"
    />

    <!-- Sectors Grid Section -->
    <OverviewCardGrid :items="sectorItems" variant="sector" />
  </main>
</template>

<script setup>
import InternalHero from '@/components/InternalHero.vue'
import OverviewCardGrid from '@/components/OverviewCardGrid.vue'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import {
  CreditCard,
  Landmark,
  HeartPulse,
  GraduationCap,
  Building,
  Factory
} from 'lucide-vue-next'

const { t } = useI18n()

const sectorsList = [
  { id: 'banking', key: 'banking', icon: CreditCard },
  { id: 'government', key: 'government', icon: Landmark },
  { id: 'healthcare', key: 'healthcare', icon: HeartPulse },
  { id: 'education', key: 'education', icon: GraduationCap },
  { id: 'enterprise', key: 'enterprise', icon: Building },
  { id: 'industrial', key: 'industrial', icon: Factory }
]

const sectorItems = computed(() =>
  sectorsList.map((sector) => ({
    to: `/industries/${sector.id}`,
    icon: sector.icon,
    title: t(`industries.sectors.${sector.key}.title`),
    desc: t(`industries.sectors.${sector.key}.description`),
    action: t('industries.viewOverview')
  }))
)
</script>
