<template>
  <main class="services-view">
    <!-- Header Banner -->
    <section class="page-header">
      <div class="header-container">
        <h1 class="page-title">{{ t('services.title') }}</h1>
        <p class="page-subtitle">{{ t('services.subtitle') }}</p>
      </div>
    </section>

    <!-- Services Grid section -->
    <section class="services-grid-section">
      <div class="grid-container">
        <div class="services-overview-grid">
          <router-link 
            v-for="(service, index) in categories" 
            :key="index"
            :to="`/services/${service.id}`"
            class="service-card-link"
          >
            <div class="service-card">
              <div class="icon-wrapper">
                <component :is="service.icon" class="service-icon" />
              </div>
              <h2 class="service-card-title">{{ t(`services.items.${service.key}.title`) }}</h2>
              <p class="service-card-desc">{{ t(`services.items.${service.key}.description`) }}</p>
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
import { useI18n } from 'vue-i18n'
import { 
  Network, 
  Shield, 
  Server, 
  Cloud, 
  Code, 
  PhoneCall 
} from 'lucide-vue-next'

const { t } = useI18n()

const categories = [
  { id: 'network-infrastructure', key: 'network_infrastructure', icon: Network },
  { id: 'network-security', key: 'network_security', icon: Shield },
  { id: 'data-center', key: 'data_center', icon: Server },
  { id: 'cloud-services', key: 'cloud_services', icon: Cloud },
  { id: 'software-solutions', key: 'software_solutions', icon: Code },
  { id: 'technical-support', key: 'technical_support', icon: PhoneCall }
]
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
}

.service-card {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-bg-alt);
  border-radius: 4px;
  padding: 3rem 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all var(--transition-fast);
}

.service-card:hover {
  transform: translateY(-4px);
  border-color: rgba(13, 148, 136, 0.2);
  box-shadow: var(--shadow-card);
}

.icon-wrapper {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-bg-alt);
  width: 56px;
  height: 56px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  transition: all var(--transition-fast);
}

.service-card:hover .icon-wrapper {
  background-color: rgba(13, 148, 136, 0.1);
  border-color: rgba(13, 148, 136, 0.2);
}

.service-icon {
  width: 26px;
  height: 26px;
  color: var(--color-secondary);
  stroke-width: 1.75px;
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
