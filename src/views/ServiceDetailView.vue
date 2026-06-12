<template>
  <main class="service-detail-view" v-if="isValidService">
    <!-- Header Banner -->
    <section class="page-header">
      <div class="header-container">
        <span class="category-label">{{ t('services.labels.category') }}</span>
        <h1 class="page-title">{{ t(`services.items.${serviceKey}.title`) }}</h1>
      </div>
    </section>

    <!-- Detail Contents -->
    <section class="detail-content-section">
      <div class="content-container">
        <div class="detail-layout">
          <!-- Main text and capabilities list -->
          <div class="main-info">
            <div class="description-block">
              <p class="service-description">
                {{ t(`services.items.${serviceKey}.description`) }}
              </p>
            </div>
            
            <div class="features-block">
              <h2 class="sub-title">{{ t('services.labels.capabilities') }}</h2>
              <ul class="features-list">
                <li v-for="(feature, idx) in features" :key="idx" class="feature-item">
                  <span class="checkmark">✔</span>
                  <span class="feature-text">{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Sidebar: Technologies & Benefits -->
          <div class="sidebar-info">
            <!-- Integrated Technologies -->
            <div class="sidebar-card technologies-card" v-if="technologies && technologies.length">
              <h3 class="card-title">{{ t('services.labels.techIntegrated') }}</h3>
              <div class="tech-tags">
                <span v-for="(tech, idx) in technologies" :key="idx" class="tech-tag">{{ tech }}</span>
              </div>
            </div>

            <!-- Benefits -->
            <div class="sidebar-card benefits-card" v-if="benefits && benefits.length">
              <h3 class="card-title">{{ t('services.labels.differentiators') }}</h3>
              <ul class="benefits-list">
                <li v-for="(benefit, idx) in benefits" :key="idx" class="benefit-item">
                  {{ benefit }}
                </li>
              </ul>
            </div>

            <!-- Action CTA -->
            <router-link to="/contact" class="sidebar-cta-btn">
              {{ t('services.labels.cta') }}
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </main>
  <main class="service-detail-view invalid-view" v-else>
    <div class="error-container">
      <h2>{{ t('services.labels.notFound') }}</h2>
      <p>{{ t('services.labels.notFoundDesc') }}</p>
      <router-link to="/services" class="back-link">{{ t('services.labels.back') }}</router-link>
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
const serviceMapping = {
  'network-infrastructure': 'network_infrastructure',
  'network-security': 'network_security',
  'data-center': 'data_center',
  'cloud-services': 'cloud_services',
  'software-solutions': 'software_solutions',
  'technical-support': 'technical_support'
}

const isValidService = computed(() => {
  return typeof route.params.id === 'string' && route.params.id in serviceMapping
})

const serviceKey = computed(() => {
  return serviceMapping[route.params.id]
})

// Retrieve arrays of features, technologies, and benefits from locales dynamically
const features = computed(() => {
  const items = tm(`services.details.${serviceKey.value}.features`)
  return Array.isArray(items) ? items : []
})

const technologies = computed(() => {
  const items = tm(`services.details.${serviceKey.value}.technologies`)
  return Array.isArray(items) ? items : []
})

const benefits = computed(() => {
  const items = tm(`services.details.${serviceKey.value}.benefits`)
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

.service-description {
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

.features-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.checkmark {
  color: var(--color-accent);
  font-size: 1.15rem;
  line-height: 1;
}

.feature-text {
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

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-bg-alt);
  color: var(--color-text-secondary);
  padding: 0.4rem 0.75rem;
  font-size: 0.8rem;
  font-weight: var(--font-semibold);
  border-radius: 4px;
}

.benefits-list {
  list-style: square;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

[dir="rtl"] .benefits-list {
  padding-left: 0;
  padding-right: 1.25rem;
}

.benefit-item {
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
