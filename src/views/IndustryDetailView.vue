<template>
  <main class="industry-detail-view" v-if="isValidSector">
    <!-- Header Banner -->
    <section class="page-header">
      <div class="header-container">
        <span class="category-label">SECTOR PORTFOLIO</span>
        <h1 class="page-title">{{ t(`industries.sectors.${sectorKey}.title`) }}</h1>
      </div>
    </section>

    <!-- Detail Contents -->
    <section class="detail-content-section">
      <div class="content-container">
        <div class="detail-layout">
          <!-- Main text and requirements list -->
          <div class="main-info">
            <div class="description-block">
              <p class="sector-description">
                {{ t(`industries.details.${sectorKey}.overview`) }}
              </p>
            </div>
            
            <div class="requirements-block">
              <h2 class="sub-title">Infrastructure Requirements</h2>
              <ul class="requirements-list">
                <li v-for="(req, idx) in requirements" :key="idx" class="requirement-item">
                  <span class="bullet"></span>
                  <span class="requirement-text">{{ req }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Sidebar: Compliance & Action -->
          <div class="sidebar-info">
            <!-- Compliance standards -->
            <div class="sidebar-card standards-card" v-if="standards && standards.length">
              <h3 class="card-title">Compliance & Design Standards</h3>
              <ul class="standards-list">
                <li v-for="(std, idx) in standards" :key="idx" class="std-item">
                  {{ std }}
                </li>
              </ul>
            </div>

            <!-- Action CTA -->
            <router-link to="/contact" class="sidebar-cta-btn">
              Discuss Sector Solution
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </main>
  <main class="industry-detail-view invalid-view" v-else>
    <div class="error-container">
      <h2>Industry Not Found</h2>
      <p>The requested industry route does not exist.</p>
      <router-link to="/industries" class="back-link">Back to Industries</router-link>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t, tm } = useI18n()

// Map router param id to locale key names
const sectorMapping = {
  'banking': 'banking',
  'government': 'government',
  'healthcare': 'healthcare',
  'education': 'education',
  'enterprise': 'enterprise',
  'industrial': 'industrial'
}

const isValidSector = computed(() => {
  return typeof route.params.id === 'string' && route.params.id in sectorMapping
})

const sectorKey = computed(() => {
  return sectorMapping[route.params.id]
})

// Retrieve arrays of requirements and standards from locales dynamically
const requirements = computed(() => {
  const items = tm(`industries.details.${sectorKey.value}.requirements`)
  return Array.isArray(items) ? items : []
})

const standards = computed(() => {
  const items = tm(`industries.details.${sectorKey.value}.standards`)
  return Array.isArray(items) ? items : []
})
</script>

<style scoped>
.page-header {
  background-color: var(--color-primary-dark);
  padding: 5.5rem 0;
  color: var(--color-text-inverse);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.category-label {
  font-size: 0.8rem;
  font-weight: var(--font-bold);
  color: var(--color-accent);
  letter-spacing: 2px;
  display: block;
  margin-bottom: 0.5rem;
}

.page-title {
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: var(--font-bold);
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

.detail-content-section {
  background-color: var(--color-bg-secondary);
  padding: 6rem 0;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.detail-layout {
  display: grid;
  grid-template-columns: 1.55fr 1fr;
  gap: 4.5rem;
  align-items: start;
}

.main-info {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

.sector-description {
  font-size: 1.15rem;
  color: var(--color-text-primary);
  line-height: 1.7;
}

.sub-title {
  font-size: 1.5rem;
  font-weight: var(--font-bold);
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
  border-bottom: 1px solid var(--color-bg-alt);
  padding-bottom: 0.75rem;
}

[dir="rtl"] .sub-title {
  font-family: 'Tajawal', sans-serif;
}

.requirements-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.requirement-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.bullet {
  width: 6px;
  height: 6px;
  background-color: var(--color-accent);
  border-radius: 50%;
  margin-top: 0.65rem;
  display: inline-block;
  flex-shrink: 0;
}

.requirement-text {
  font-size: 1rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

/* Sidebar styling */
.sidebar-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar-card {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-bg-alt);
  border-radius: 4px;
  padding: 2.25rem 2rem;
}

.card-title {
  font-size: 0.95rem;
  font-weight: var(--font-bold);
  color: var(--color-text-dark);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-bg-alt);
  padding-bottom: 0.75rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

[dir="rtl"] .card-title {
  font-family: 'Tajawal', sans-serif;
}

.standards-list {
  list-style: square;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

[dir="rtl"] .standards-list {
  padding-left: 0;
  padding-right: 1.25rem;
}

.std-item {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.sidebar-cta-btn {
  background-color: var(--color-accent);
  color: var(--color-text-inverse);
  text-align: center;
  padding: 1.15rem;
  font-size: 0.95rem;
  font-weight: var(--font-semibold);
  text-decoration: none;
  border-radius: 4px;
  box-shadow: var(--shadow-cta);
  transition: all var(--transition-fast);
}

.sidebar-cta-btn:hover {
  background-color: var(--color-accent-hover);
  transform: translateY(-2px);
}

/* Error page state */
.invalid-view {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: var(--color-bg-secondary);
}

.error-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.back-link {
  color: var(--color-secondary);
  text-decoration: none;
  font-weight: var(--font-semibold);
}

.back-link:hover {
  color: var(--color-accent);
}

/* Responsiveness */
@media (max-width: 992px) {
  .detail-layout {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
}
</style>
