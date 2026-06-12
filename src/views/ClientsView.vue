<template>
  <main class="clients-view-page">
    <!-- Hero Section -->
    <section class="clients-hero">
      <div class="clients-hero-content container">
        <span class="client-cta-tag">{{ t('nav.clients') || 'Our Clients' }}</span>
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
            :placeholder="t('clients.searchPlaceholder')"
          />
        </div>

        <!-- Category Filter Chips -->
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
            <div class="client-card-header">
              <!-- Official Brand Logo -->
              <div class="client-card-logo-container">
                <img :src="getLogoUrl(client.logo)" :alt="client.name + ' Logo'" class="client-logo" />
              </div>

              <!-- Sector Badge -->
              <span class="client-card-cat-badge">
                {{ t(`clients.sectors.${client.category}`) }}
              </span>

              <!-- Client Title -->
              <h3 class="client-card-title">
                {{ t(`clients.items.${client.key}.name`) }}
              </h3>

              <!-- Short Description -->
              <p class="client-card-desc">
                {{ t(`clients.items.${client.key}.shortDesc`) }}
              </p>
            </div>

            <!-- Card Footer Link -->
            <div class="client-card-footer">
              <router-link :to="`/clients/${client.id}`" class="client-card-link">
                <span>{{ t('clients.learnMore') }}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" :style="locale === 'ar' ? 'transform: scaleX(-1)' : ''">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { clientsList } from '@/data/clients.js'

const { t, locale } = useI18n()

const logoImages = import.meta.glob('../assets/images/Clients/*', { eager: true, import: 'default' })
console.log('Registered client logos:', Object.keys(logoImages))

const getLogoUrl = (logoName) => {
  return logoImages[`../assets/images/Clients/${logoName}`] || ''
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
  return clientsList.filter(client => {
    // 1. Filter by category
    if (selectedCategory.value !== 'all') {
      if (client.category !== selectedCategory.value) {
        return false
      }
    }

    // 2. Filter by search query
    if (searchQuery.value.trim() !== '') {
      const query = searchQuery.value.toLowerCase()
      const name = t(`clients.items.${client.key}.name`).toLowerCase()
      const sector = t(`clients.sectors.${client.category}`).toLowerCase()
      const desc = t(`clients.items.${client.key}.shortDesc`).toLowerCase()

      return name.includes(query) || sector.includes(query) || desc.includes(query)
    }

    return true
  })
})
</script>
