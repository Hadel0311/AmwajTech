<template>
  <main class="clients-view-page">
    <!-- Hero Section -->
    <section class="page-hero">
      <div class="page-hero-content container">
        <span class="page-cta-tag">{{ t('nav.clients') || 'Our Clients' }}</span>
        <h1>{{ t('clients.title') }}</h1>
        <p>{{ t('clients.subtitle') }}</p>
      </div>
    </section>

    <!-- Filters and Search bar -->
    <section class="clients-filter-wrapper">
      <div class="clients-filter-container container">
        <!-- Search Input Box -->
        <div class="clients-search-box">
          <svg class="clients-search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search clients by name only..."
          />
        </div>

        <!-- Category Filter Chips -->
        <div class="clients-categories-wrapper">
          <div class="clients-categories">
            <button 
              class="category-chip" 
              :class="{ active: selectedCategory === 'all' }"
              @click="selectedCategory = 'all'"
            >
              {{ t('clients.filterAll') }}
            </button>
            <button 
              v-for="cat in availableCategories" 
              :key="cat.key"
              class="category-chip" 
              :class="{ active: selectedCategory === cat.key }"
              @click="selectedCategory = cat.key"
            >
              {{ t(`clients.sectors.${cat.key}`) }}
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

    <!-- Clients Grid -->
    <section class="clients-grid-section">
      <div class="container">
        <div class="clients-cards-grid">
          <article 
            v-for="client in filteredClients" 
            :key="client.id"
            class="client-grid-card"
          >
            <!-- Default View: Just Logo centered -->
            <div class="client-card-logo-container">
              <img :src="getLogoUrl(client.logo)" :alt="client.name + ' Logo'" class="client-logo" />
            </div>

            <!-- Hover Overlay View -->
            <div class="client-card-overlay">
              <span class="client-card-cat-badge">
                {{ client.industry || t(`clients.sectors.${client.category || 'enterprise'}`) }}
              </span>

              <h3 class="client-card-title">
                {{ client.name || t(`clients.items.${client.key}.name`) }}
              </h3>

              <p class="client-card-desc">
                {{ client.description || t(`clients.items.${client.key}.shortDesc`) }}
              </p>

              <router-link :to="`/clients/${client.id}`" class="client-card-link">
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
const clientsList = ref([])

onMounted(async () => {
  try {
    const data = await api.getAll('clients')
    clientsList.value = data.sort((a, b) => (a.order || 0) - (b.order || 0))
  } catch (err) {
    console.error('Error loading clients', err)
  }
})

const logoImages = import.meta.glob('../assets/images/clients/*', { eager: true, import: 'default' })

const getLogoUrl = (logoName) => {
  if (logoName && (logoName.startsWith('http') || logoName.startsWith('/'))) {
    return logoName
  }
  return logoImages[`../assets/images/clients/${logoName}`] || ''
}

const searchQuery = ref('')
const selectedCategory = ref('all')

// Available Client Categories / Sectors
const availableCategories = [
  { key: 'government' },
  { key: 'financial' },
  { key: 'healthcare' },
  { key: 'education' },
  { key: 'enterprise' }
]

const filteredClients = computed(() => {
  return clientsList.value.filter(client => {
    // 1. Filter by category
    if (selectedCategory.value !== 'all') {
      if (client.category !== selectedCategory.value) {
        return false
      }
    }

    // 2. Filter by search query
    if (searchQuery.value.trim() !== '') {
      const query = searchQuery.value.toLowerCase()
      const name = (client.name || t(`clients.items.${client.key}.name`) || '').toLowerCase()
      const sector = (client.industry || t(`clients.sectors.${client.category || 'enterprise'}`) || '').toLowerCase()
      const desc = (client.description || t(`clients.items.${client.key}.shortDesc`) || '').toLowerCase()

      return name.includes(query) || sector.includes(query) || desc.includes(query)
    }

    return true
  })
})
</script>
