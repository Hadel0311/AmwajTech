<template>
  <main class="clients-view-page">
    <!-- Hero Section -->
    <InternalHero
      :category="t('nav.clients') || 'Our Clients'"
      :title="t('clients.title')"
      :description="t('clients.subtitle')"
      theme="light"
      image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200"
    />

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
            :placeholder="t('clients.searchPlaceholder') || 'Search clients...'"
          />
        </div>

        <!-- Category Filter Chips -->
        <div class="clients-categories-wrapper">
          <button v-show="showLeftArrow" class="clients-slider-arrow left-arrow" @click="scrollLeft">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          
          <div 
            class="clients-categories" 
            ref="categoriesContainer"
            @scroll="checkArrows"
            @wheel.prevent="handleWheel"
          >
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

          <button v-show="showRightArrow" class="clients-slider-arrow right-arrow" @click="scrollRight">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Clients Grid -->
    <section class="clients-grid-section">
      <div class="container">
        <div v-if="filteredClients.length === 0" class="no-results-message" style="text-align: center; padding: 3rem; color: var(--color-text-muted); font-size: var(--text-lg);">
          <p>No clients found matching your search criteria.</p>
        </div>
        <div v-else class="clients-cards-grid">
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
import InternalHero from '@/components/InternalHero.vue'
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { api } from '@/services/api'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const clientsList = ref([])

// Scrolling logic
const categoriesContainer = ref(null)
const showLeftArrow = ref(false)
const showRightArrow = ref(false)

const checkArrows = () => {
  if (!categoriesContainer.value) return
  const { scrollLeft, scrollWidth, clientWidth } = categoriesContainer.value
  showLeftArrow.value = scrollLeft > 0
  showRightArrow.value = Math.ceil(scrollLeft) < scrollWidth - clientWidth - 1
}

const scrollLeft = () => {
  if (categoriesContainer.value) {
    categoriesContainer.value.scrollBy({ left: -200, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (categoriesContainer.value) {
    categoriesContainer.value.scrollBy({ left: 200, behavior: 'smooth' })
  }
}

const handleWheel = (e) => {
  if (categoriesContainer.value) {
    categoriesContainer.value.scrollBy({ left: e.deltaY > 0 ? 100 : -100, behavior: 'smooth' })
  }
}

onMounted(async () => {
  nextTick(() => {
    setTimeout(checkArrows, 100)
  })
  window.addEventListener('resize', checkArrows)

  try {
    const data = await api.getAll('clients')
    clientsList.value = data.sort((a, b) => (a.order || 0) - (b.order || 0))
  } catch (err) {
    console.error('Error loading clients', err)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', checkArrows)
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
