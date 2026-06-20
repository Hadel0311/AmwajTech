<template>
  <main class="partners-view-page">
    <!-- Hero Section -->
    <section class="page-hero">
      <div class="page-hero-content container">
        <span class="page-cta-tag">{{ t('nav.partners') }}</span>
        <h1>{{ t('partners.title') }}</h1>
        <p>{{ t('partners.description') }}</p>
      </div>
    </section>

    <!-- Filters and Search bar -->
    <section class="partners-filter-wrapper">
      <div class="partners-filter-container container">
        <!-- Search Input Box -->
        <div class="partners-search-box">
          <svg class="partners-search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search partners by name only..."
          />
        </div>

        <!-- Category Filter Chips -->
        <div class="partners-categories-wrapper">
          <div class="partners-categories">
            <button 
              class="category-chip" 
              :class="{ active: selectedCategory === 'all' }"
              @click="selectedCategory = 'all'"
            >
              {{ t('partners.filterAll') }}
            </button>
            <button 
              v-for="cat in availableCategories" 
              :key="cat.key"
              class="category-chip" 
              :class="{ active: selectedCategory === cat.key }"
              @click="selectedCategory = cat.key"
            >
              {{ t(cat.translationKey) }}
            </button>
          </div>
          <div class="categories-scroll-indicator">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Partners Grid -->
    <section class="partners-grid-section">
      <div class="container">
        <div class="partners-cards-grid">
          <article 
            v-for="partner in filteredPartners" 
            :key="partner.id"
            class="partner-grid-card"
          >
            <!-- Default View: Just Logo centered -->
            <div class="partner-card-logo-container">
              <img :src="getLogoUrl(partner.logo)" :alt="partner.name + ' Logo'" class="partner-logo" />
            </div>

            <!-- Hover Overlay View -->
            <div class="partner-card-overlay">
              <!-- Main Category Badge -->
              <span class="partner-card-cat-badge">
                {{ partner.category || t(`partners.items.${partner.key}.category`) || 'Technology Partner' }}
              </span>

              <!-- Partner Title -->
              <h3 class="partner-card-title">{{ partner.name }}</h3>

              <!-- Short Description -->
              <p class="partner-card-desc">
                {{ partner.shortDesc || t(`partners.items.${partner.key}.shortDesc`) || 'Leading technology solutions provider.' }}
              </p>

              <!-- Card Footer Link -->
              <router-link :to="`/partners/${partner.id}`" class="partner-card-link">
                <span>View Details &rarr;</span>
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { api } from '@/services/api'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const partnersList = ref([])

onMounted(async () => {
  try {
    const data = await api.getAll('partners')
    partnersList.value = data.sort((a, b) => (a.order || 0) - (b.order || 0))
  } catch (err) {
    console.error('Error loading partners', err)
  }
})

const logoImages = import.meta.glob('../assets/images/Partners/*', { eager: true, import: 'default' })

const getLogoUrl = (logoName) => {
  if (logoName && (logoName.startsWith('http') || logoName.startsWith('/'))) {
    return logoName
  }
  return logoImages[`../assets/images/Partners/${logoName}`] || ''
}

const searchQuery = ref('')
const selectedCategory = ref('all')

// Direct list of categories map related to services
const availableCategories = [
  { key: 'network-infrastructure', translationKey: 'services.items.network_infrastructure.title' },
  { key: 'network-security', translationKey: 'services.items.network_security.title' },
  { key: 'data-center', translationKey: 'services.items.data_center.title' },
  { key: 'software-solutions', translationKey: 'services.items.software_solutions.title' },
  { key: 'cloud-services', translationKey: 'services.items.cloud_services.title' },
  { key: 'technical-support', translationKey: 'services.items.technical_support.title' }
]

const filteredPartners = computed(() => {
  return partnersList.value.filter(partner => {
    // 1. Filter by category
    if (selectedCategory.value !== 'all') {
      if (!partner.services || !partner.services.includes(selectedCategory.value)) {
        return false
      }
    }

    // 2. Filter by search query
    if (searchQuery.value.trim() !== '') {
      const query = searchQuery.value.toLowerCase()
      const name = partner.name.toLowerCase()
      const category = (partner.category || t(`partners.items.${partner.key}.category`) || '').toLowerCase()
      const desc = (partner.shortDesc || t(`partners.items.${partner.key}.shortDesc`) || '').toLowerCase()

      return name.includes(query) || category.includes(query) || desc.includes(query)
    }

    return true
  })
})
</script>
