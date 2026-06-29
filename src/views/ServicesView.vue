<template>
  <main class="services-view">
    <!-- Header Banner -->
    <InternalHero
      :category="t('nav.services') || 'Our Services'"
      :title="t('services.title')"
      :description="t('services.subtitle')"
      theme="navy"
      size="medium"
      image="/images/core-enterprise-hero.jpg"
    />

    <!-- Services Grid section -->
    <section class="services-grid-section">
      <div class="grid-container">
        <div class="services-overview-grid">
          <router-link 
            v-for="(service, index) in services" 
            :key="service.id || index"
            :to="`/services/${service.id || service.key}`"
            class="service-card-link"
          >
            <div class="service-card">
              <div class="icon-wrapper">
                <component :is="getIcon(service.icon)" :size="28" class="service-icon" />
              </div>
              <h2 class="service-card-title">{{ service.title || t(`services.items.${service.key}.title`) }}</h2>
              <p class="service-card-desc">{{ service.description || t(`services.items.${service.key}.description`) }}</p>
              <div class="service-card-action">
                <span>{{ t('services.exploreOffering') }}</span>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-icon">
                  <path d="M4.16669 10H15.8334M15.8334 10L10.8334 5M15.8334 10L10.8334 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import InternalHero from '@/components/InternalHero.vue'
import { useI18n } from 'vue-i18n'
import { ref, onMounted } from 'vue'
import { api } from '@/services/api'
import { IconMap } from '@/utils/iconMap'
import { Layers } from 'lucide-vue-next'

const { t } = useI18n()
const services = ref([])

onMounted(async () => {
  try {
    const data = await api.getAll('services')
    services.value = data.sort((a, b) => (a.order || 0) - (b.order || 0))
  } catch (err) {
    console.error('Failed to load services', err)
  }
})

const getIcon = (iconName) => {
  return IconMap[iconName] || Layers
}
</script>

<style scoped>
.page-header {
  background-color: var(--color-primary-dark);
  padding: 5rem 0;
  text-align: center;
  color: var(--color-text-inverse);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.header-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-title {
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: var(--font-bold);
  font-family: var(--font-heading, 'Montserrat', sans-serif);
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #94a3b8;
  line-height: 1.6;
}

.services-grid-section {
  background-color: var(--color-bg-secondary);
  padding: 6.5rem 0;
}

.grid-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.services-overview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.service-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.service-card {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-bg-alt);
  border-radius: 8px;
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all var(--transition-fast);
}

.service-card:hover {
  transform: translateY(-4px);
  border-color: rgba(13, 148, 136, 0.2);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
}

.icon-wrapper {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-bg-alt);
  width: 56px;
  height: 56px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all var(--transition-fast);
}

.service-card:hover .icon-wrapper {
  background-color: rgba(13, 148, 136, 0.1);
  border-color: rgba(13, 148, 136, 0.2);
}

.service-icon {
  width: 28px !important;
  height: 28px !important;
  color: var(--color-primary);
  stroke-width: 2px;
  transition: color var(--transition-fast);
}

.service-card:hover .service-icon {
  color: var(--color-accent);
}

.service-card-title {
  font-size: 1.3rem;
  font-weight: var(--font-bold);
  color: var(--color-text-dark);
  margin-bottom: 1rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 3.2rem;
}

[dir="rtl"] .service-card-title {
  font-family: 'Tajawal', sans-serif;
}

.service-card-desc {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 6rem;
}

.service-card-action {
  font-size: 0.9rem;
  font-weight: var(--font-semibold);
  color: var(--color-secondary);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: color var(--transition-fast);
}

.service-card:hover .service-card-action {
  color: var(--color-accent);
}

.arrow-icon {
  transition: transform var(--transition-fast);
}

[dir="rtl"] .arrow-icon {
  transform: rotate(180deg);
}

.service-card:hover .arrow-icon {
  transform: translateX(4px);
}

[dir="rtl"] .service-card:hover .arrow-icon {
  transform: rotate(180deg) translateX(4px);
}

/* Responsiveness */
@media (max-width: 1023px) {
  .services-overview-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .services-overview-grid {
    grid-template-columns: 1fr;
  }
  .page-header {
    padding: 4rem 0;
  }
}
</style>
