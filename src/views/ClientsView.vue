<template>
  <main class="clients-view-page">
    <!-- Hero Section -->
    <InternalHero
      :category="t('nav.clients') || 'Our Clients'"
      :title="t('clients.title')"
      :description="t('clients.subtitle')"
      theme="light"
      size="slim"
      image="/images/clients-hero.jpg"
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
            :placeholder="t('clients.searchPlaceholder')"
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
              {{ te(`clients.sectors.${cat.key}`) ? t(`clients.sectors.${cat.key}`) : (cat.original || cat.key) }}
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
          <p>{{ t('clients.noResults') }}</p>
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
                {{ client.industry || (te(`clients.sectors.${client.category || 'enterprise'}`) ? t(`clients.sectors.${client.category || 'enterprise'}`) : (client.category || '')) }}
              </span>

              <h3 class="client-card-title">
                {{ client.name || (te(`clients.items.${client.key}.name`) ? t(`clients.items.${client.key}.name`) : '') }}
              </h3>

              <p class="client-card-desc">
                {{ client.description || (te(`clients.items.${client.key}.shortDesc`) ? t(`clients.items.${client.key}.shortDesc`) : '') }}
              </p>
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

const { t, te } = useI18n()
const clientsList = ref([])

// Scrolling logic
const categoriesContainer = ref(null)
const showLeftArrow = ref(false)
const showRightArrow = ref(false)

const checkArrows = () => {
  if (!categoriesContainer.value) return
  const { scrollLeft, scrollWidth, clientWidth } = categoriesContainer.value
  
  const isRTL = document.documentElement.dir === 'rtl' || document.body.dir === 'rtl'
  
  if (isRTL) {
    const scrollPos = Math.abs(scrollLeft)
    showRightArrow.value = scrollPos > 0
    showLeftArrow.value = Math.ceil(scrollPos) < scrollWidth - clientWidth - 1
  } else {
    showLeftArrow.value = scrollLeft > 0
    showRightArrow.value = Math.ceil(scrollLeft) < scrollWidth - clientWidth - 1
  }
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
    const isRTL = document.documentElement.dir === 'rtl' || document.body.dir === 'rtl'
    const scrollAmount = e.deltaY > 0 ? 100 : -100
    categoriesContainer.value.scrollBy({ left: isRTL ? -scrollAmount : scrollAmount, behavior: 'smooth' })
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

const logoImages = import.meta.glob('../assets/images/Clients/*', { eager: true, import: 'default' })

const getLogoUrl = (logoName) => {
  if (logoName && (logoName.startsWith('http') || logoName.startsWith('/'))) {
    return logoName
  }
  return logoImages[`../assets/images/Clients/${logoName}`] || ''
}

const searchQuery = ref('')
const selectedCategory = ref('all')

// Available Client Categories / Sectors dynamically computed
const availableCategories = computed(() => {
  const categoriesMap = new Map([
    ['government', { key: 'government' }],
    ['financial', { key: 'financial' }],
    ['healthcare', { key: 'healthcare' }],
    ['education', { key: 'education' }],
    ['enterprise', { key: 'enterprise' }]
  ])

  clientsList.value.forEach(client => {
    // Check both category and industry fields
    const cats = [client.category, client.industry].filter(Boolean)
    cats.forEach(cat => {
      // Use original string for display if no translation exists, but lowercase for key
      const key = cat.toLowerCase().trim()
      if (!categoriesMap.has(key)) {
        categoriesMap.set(key, { key: key, original: cat })
      }
    })
  })

  return Array.from(categoriesMap.values())
})

const filteredClients = computed(() => {
  return clientsList.value.filter(client => {
    // 1. Filter by category
    if (selectedCategory.value !== 'all') {
      const clientCat = (client.category || '').toLowerCase().trim()
      const clientInd = (client.industry || '').toLowerCase().trim()
      if (clientCat !== selectedCategory.value && clientInd !== selectedCategory.value) {
        return false
      }
    }

    // 2. Filter by search query
    if (searchQuery.value.trim() !== '') {
      const query = searchQuery.value.toLowerCase()
      const name = (client.name || (te(`clients.items.${client.key}.name`) ? t(`clients.items.${client.key}.name`) : '')).toLowerCase()
      const sector = (client.industry || (te(`clients.sectors.${client.category || 'enterprise'}`) ? t(`clients.sectors.${client.category || 'enterprise'}`) : '')).toLowerCase()
      const desc = (client.description || (te(`clients.items.${client.key}.shortDesc`) ? t(`clients.items.${client.key}.shortDesc`) : '')).toLowerCase()

      return name.includes(query) || sector.includes(query) || desc.includes(query)
    }

    return true
  })
})
</script>
