<template>
  <main class="client-detail-view">
    <!-- Breadcrumbs navigation -->
    <div class="breadcrumbs-wrapper">
      <div class="container">
        <nav class="breadcrumbs">
          <router-link to="/">{{ t('nav.home') }}</router-link>
          <span class="breadcrumbs-separator">/</span>
          <router-link to="/clients">{{ t('nav.clients') || 'Clients' }}</router-link>
          <span class="breadcrumbs-separator">/</span>
          <span class="breadcrumbs-current" v-if="client">{{ t(`clients.items.${client.key}.name`) }}</span>
          <span class="breadcrumbs-current" v-else>{{ locale === 'ar' ? 'غير موجود' : 'Not Found' }}</span>
        </nav>
      </div>
    </div>

    <!-- Main Detail Section -->
    <div class="client-detail-main container" v-if="client">
      <div class="client-detail-layout">
        <!-- Left Column: Details -->
        <article class="client-detail-body">
          <header class="client-detail-header">
            <span class="client-detail-category">
              {{ t(`industries.sectors.${client.industry?.toLowerCase() || 'enterprise'}.title`) || client.industry }}
            </span>
            <h1 class="client-detail-name">{{ client.name }}</h1>
          </header>

          <!-- About Section -->
          <section class="client-detail-section">
            <h2 class="client-detail-section-title">{{ t('clients.aboutLabel') }}</h2>
            <p class="client-detail-text">
              {{ client.aboutDesc || t(`clients.items.${client.key}.about`) || 'Details about this organization will be added soon.' }}
            </p>
          </section>

          <!-- Work Section -->
          <section class="client-detail-section">
            <h2 class="client-detail-section-title">{{ t('clients.workLabel') }}</h2>
            <p class="client-detail-text">
              {{ client.workDesc || t(`clients.items.${client.key}.work`) || 'Details on our work with this client will be updated shortly.' }}
            </p>
          </section>

          <!-- Context Section -->
          <section class="client-detail-section">
            <h2 class="client-detail-section-title">{{ t('clients.contextLabel') }}</h2>
            <p class="client-detail-text">
              {{ client.contextDesc || t(`clients.items.${client.key}.context`) || 'Industry context will be provided soon.' }}
            </p>
          </section>
        </article>

        <!-- Right Column: Sidebar -->
        <aside class="client-detail-sidebar">
          <!-- Logo Card -->
          <div class="sidebar-card text-center">
            <div class="sidebar-logo-box-large">
              <img :src="getLogoUrl(client.logo)" :alt="client.name + ' Logo'" class="client-logo" />
            </div>
          </div>

          <!-- Services Card -->
          <div class="sidebar-card" v-if="client.services && client.services.length">
            <h3 class="sidebar-title">{{ t('partners.servicesLabel') || 'Integrated Solutions' }}</h3>
            <ul class="services-list">
              <li v-for="serviceKey in client.services" :key="serviceKey">
                <router-link :to="`/services/${serviceKey.toLowerCase().replace(/\\s+/g, '-')}`" class="service-item-link">
                  <span>{{ formatServiceName(serviceKey) }}</span>
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
      <section class="client-consultation-cta">
        <div class="client-cta-content">
          <span class="client-cta-tag">{{ t(`clients.items.${client.key}.name`) }}</span>
          <h2 class="client-cta-title">{{ t('clients.contactCTA') }}</h2>
          <p class="client-cta-desc">{{ t('clients.contactCTADesc') }}</p>
          <router-link 
            :to="{ path: '/contact', query: { service: contactServiceParam, message: contactMessageParam } }" 
            class="btn client-cta-btn"
          >
            {{ t('clients.contactCTAButton') }}
          </router-link>
        </div>
      </section>
    </div>

    <!-- Error/Not Found state -->
    <div class="container text-center section-padding" v-else>
      <h2 class="section-title">{{ locale === 'ar' ? 'لم يتم العثور على العميل' : 'Client Not Found' }}</h2>
      <p class="section-subtitle">
        {{ locale === 'ar' ? 'عذراً، العميل الذي تبحث عنه غير موجود أو تم نقله.' : 'Sorry, the client you are looking for does not exist or has been moved.' }}
      </p>
      <router-link to="/clients" class="btn btn-primary">
        {{ t('clients.backToClients') }}
      </router-link>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '@/services/api'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()

const client = ref(null)

onMounted(async () => {
  try {
    client.value = await api.getOne('clients', route.params.id)
  } catch (err) {
    console.error('Failed to load client detail', err)
  }
})

const logoImages = import.meta.glob('../assets/images/clients/*', { eager: true, import: 'default' })

const getLogoUrl = (logoName) => {
  if (logoName && (logoName.startsWith('http') || logoName.startsWith('/'))) {
    return logoName
  }
  return logoImages[`../assets/images/clients/${logoName}`] || ''
}

const formatServiceName = (serviceKey) => {
  if (!serviceKey) return ''
  const transKey = `services.items.${serviceKey.replace(/-/g, '_').toLowerCase()}.title`
  const translated = t(transKey)
  if (translated !== transKey) {
    return translated
  }
  // Fallback: Title Case the raw string
  return serviceKey.split(/[-_ ]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
}

// Map client service keys to Contact form service selection dropdown values
const contactServiceParam = computed(() => {
  if (!client.value || !client.value.services || !client.value.services.length) return ''
  const firstService = client.value.services[0]
  
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
  if (!client.value) return ''
  const clientName = t(`clients.items.${client.value.key}.name`)
  if (locale.value === 'ar') {
    return `مرحباً، نود الاستفسار عن تفاصيل البنية التحتية والحلول التي تم تصميمها وتطبيقها لـ ${clientName}.`
  }
  return `Hello, we would like to inquire about the infrastructure solutions and implementations deployed for ${clientName}.`
})
</script>
