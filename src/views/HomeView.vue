<template>
  <main class="home-view">
    <!-- 1. Hero Banner -->
    <Hero />

    <!-- 2. News & Announcements Carousel -->
    <NewsCarousel />

    <!-- 3. Core Services Grid Overview -->
    <ServicesGrid />

    <!-- 4. Industries Served Section -->
    <IndustriesServed />

    <!-- 5. Client Journey Timeline -->
    <ClientJourneyTimeline />

    <!-- 6. Trusted Partners Marquee -->
    <TrustedPartnersMarquee />
  </main>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import Hero from '@/components/Hero.vue'
import NewsCarousel from '@/components/NewsCarousel.vue'
import ServicesGrid from '@/components/ServicesGrid.vue'
import IndustriesServed from '@/components/IndustriesServed.vue'
import ClientJourneyTimeline from '@/components/ClientJourneyTimeline.vue'
import TrustedPartnersMarquee from '@/components/TrustedPartnersMarquee.vue'

const { t } = useI18n()
</script>

<style scoped>
</style>
