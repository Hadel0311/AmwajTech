<template>
  <main class="partner-detail-view">
    <!-- Breadcrumbs navigation -->
    <div class="breadcrumbs-wrapper">
      <div class="container">
        <nav class="breadcrumbs">
          <router-link to="/">{{ t('nav.home') }}</router-link>
          <span class="breadcrumbs-separator">/</span>
          <router-link to="/partners">{{ t('nav.partners') }}</router-link>
          <span class="breadcrumbs-separator">/</span>
          <span class="breadcrumbs-current" v-if="partner">{{ partner.name }}</span>
          <span class="breadcrumbs-current" v-else>{{ t('partners.notFound') || 'Not Found' }}</span>
        </nav>
      </div>
    </div>

    <!-- Main Detail Section -->
    <div class="partner-detail-main container" v-if="partner">
      <div class="partner-detail-layout">
        <!-- Left Column: Details -->
        <article class="partner-detail-body">
          <header class="partner-detail-header">
            <span class="partner-detail-category">
              {{ t(`partners.items.${partner.key}.category`) }}
            </span>
            <h1 class="partner-detail-name">{{ partner.name }}</h1>
          </header>

          <!-- About Section -->
          <section class="partner-detail-section">
            <h2 class="partner-detail-section-title">
              {{ t('about.title') }}
            </h2>
            <p class="partner-detail-text">
              {{ t(`partners.items.${partner.key}.about`) }}
            </p>
          </section>

          <!-- Leverage Section -->
          <section class="partner-detail-section">
            <h2 class="partner-detail-section-title">
              {{ locale === 'ar' ? `كيف نستفيد من تقنية ${partner.name}` : `How We Leverage ${partner.name} Technology` }}
            </h2>
            <p class="partner-detail-text">
              {{ t(`partners.items.${partner.key}.leverage`) }}
            </p>
          </section>
        </article>

        <!-- Right Column: Sidebar -->
        <aside class="partner-detail-sidebar">
          <!-- Logo Card -->
          <div class="sidebar-card text-center">
            <div class="sidebar-logo-box">
              <img :src="getLogoUrl(partner.logo)" :alt="partner.name + ' Logo'" class="partner-logo" />
            </div>
            
            <a 
              :href="partner.website" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn btn-primary visit-website-btn"
            >
              <span>{{ t('partners.viewWebsite') }}</span>
              <!-- Outbound link icon -->
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>

          <!-- Services Card -->
          <div class="sidebar-card" v-if="partner.services && partner.services.length">
            <h3 class="sidebar-title">{{ t('partners.servicesLabel') }}</h3>
            <ul class="services-list">
              <li v-for="serviceKey in partner.services" :key="serviceKey">
                <router-link :to="`/services/${serviceKey}`" class="service-item-link">
                  <span>{{ t(`services.items.${serviceKey.replace('-', '_')}.title`) }}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" :style="locale === 'ar' ? 'transform: scaleX(-1)' : ''">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </router-link>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <!-- Bottom Consultation CTA -->
      <section class="partner-consultation-cta">
        <div class="partner-cta-content">
          <span class="partner-cta-tag">{{ partner.name }}</span>
          <h2 class="partner-cta-title">{{ t('partners.contactCTA') }}</h2>
          <p class="partner-cta-desc">{{ t('partners.contactCTADesc') }}</p>
          <router-link 
            :to="{ path: '/contact', query: { service: contactServiceParam, message: contactMessageParam } }" 
            class="btn partner-cta-btn"
          >
            {{ t('partners.contactCTAButton') }}
          </router-link>
        </div>
      </section>
    </div>

    <!-- Error/Not Found state -->
    <div class="container text-center section-padding" v-else>
      <h2 class="section-title">{{ locale === 'ar' ? 'لم يتم العثور على الشريك' : 'Partner Not Found' }}</h2>
      <p class="section-subtitle">
        {{ locale === 'ar' ? 'عذراً، الشريك الذي تبحث عنه غير موجود أو تم نقله.' : 'Sorry, the technology partner you are looking for does not exist or has been moved.' }}
      </p>
      <router-link to="/partners" class="btn btn-primary">
        {{ t('partners.backToPartners') }}
      </router-link>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { partnersList } from '@/data/partners.js'

const route = useRoute()
const { t, locale } = useI18n()

const logoImages = import.meta.glob('../assets/images/Partners/*', { eager: true, import: 'default' })
console.log('Registered detail partner logos:', Object.keys(logoImages))

const getLogoUrl = (logoName) => {
  return logoImages[`../assets/images/Partners/${logoName}`] || ''
}

// Find partner by route parameter ID
const partner = computed(() => {
  return partnersList.find(p => p.id === route.params.id)
})

// Map partner service keys to Contact form service selection dropdown values
const contactServiceParam = computed(() => {
  if (!partner.value || !partner.value.services || !partner.value.services.length) return ''
  const firstService = partner.value.services[0]
  
  const mapping = {
    'network-infrastructure': 'network',
    'network-security': 'security',
    'data-center': 'data_center',
    'software-solutions': 'software',
    'cloud-services': 'managed',
    'technical-support': 'managed'
  }
  
  return mapping[firstService] || ''
})

// Custom message text for Contact form pre-fill
const contactMessageParam = computed(() => {
  if (!partner.value) return ''
  if (locale.value === 'ar') {
    return `مرحباً، نود الاستفسار عن كيفية الاستفادة من حلول ${partner.value.name} لبنيتنا التحتية.`
  }
  return `Hello, we would like to inquire about integrating ${partner.value.name} technology solutions within our infrastructure.`
})
</script>
