<template>
  <section id="services" class="services-section">
    <div class="services-container">
      <div class="services-header">
        <h2 class="section-title">{{ t('services.title') }}</h2>
        <p class="section-subtitle">{{ t('services.subtitle') }}</p>
      </div>

      <div class="services-grid">
        <router-link 
          v-for="(service, index) in servicesList" 
          :key="index"
          :to="`/services/${service.id}`"
          class="service-card-link"
        >
          <div class="service-card">
            <div class="service-icon-wrapper">
              <component :is="service.icon" class="service-icon" />
            </div>
            <h3 class="service-title">{{ t(`services.items.${service.key}.title`) }}</h3>
            <p class="service-description">{{ t(`services.items.${service.key}.description`) }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </section>
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

const servicesList = [
  { id: 'network-infrastructure', key: 'network_infrastructure', icon: Network },
  { id: 'network-security', key: 'network_security', icon: Shield },
  { id: 'data-center', key: 'data_center', icon: Server },
  { id: 'cloud-services', key: 'cloud_services', icon: Cloud },
  { id: 'software-solutions', key: 'software_solutions', icon: Code },
  { id: 'technical-support', key: 'technical_support', icon: PhoneCall }
]
</script>

<style scoped>
.services-section {
  background-color: var(--color-bg-secondary);
  padding: 6rem 0;
}

.services-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.services-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
}

.section-title {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

.section-subtitle {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.service-card-link {
  text-decoration: none;
  color: inherit;
}

.service-card {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-bg-alt);
  border-radius: 4px;
  padding: 2.25rem 1.75rem;
  transition: all var(--transition-fast);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
  border-color: rgba(13, 148, 136, 0.2);
}

.service-icon-wrapper {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-bg-alt);
  width: 48px;
  height: 48px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all var(--transition-fast);
}

.service-card:hover .service-icon-wrapper {
  background-color: rgba(13, 148, 136, 0.1);
  border-color: rgba(13, 148, 136, 0.2);
}

.service-icon {
  width: 24px;
  height: 24px;
  color: var(--color-secondary);
  stroke-width: 1.75px;
  transition: color var(--transition-fast);
}

.service-card:hover .service-icon {
  color: var(--color-accent);
}

.service-title {
  font-size: 1.15rem;
  font-weight: var(--font-bold);
  color: var(--color-text-dark);
  margin-bottom: 0.75rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

[dir="rtl"] .service-title {
  font-family: 'Tajawal', sans-serif;
}

.service-description {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* Responsiveness */
@media (max-width: 992px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
  .services-section {
    padding: 4.5rem 0;
  }
}
</style>
