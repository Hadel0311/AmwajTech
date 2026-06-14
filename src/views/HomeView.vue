<template>
  <main class="home-view">
    <!-- 1. Hero Banner -->
    <Hero />

    <!-- 3. Core Services Grid Overview -->
    <ServicesGrid />

    <!-- 4. Industries Served Section -->
    <IndustriesServed />

    <!-- 5. Client Journey Timeline -->
    <ClientJourneyTimeline />
  </main>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import Hero from '@/components/Hero.vue'
import ServicesGrid from '@/components/ServicesGrid.vue'
import IndustriesServed from '@/components/IndustriesServed.vue'
import ClientJourneyTimeline from '@/components/ClientJourneyTimeline.vue'

const { t } = useI18n()
</script>

<style scoped>
</style>
