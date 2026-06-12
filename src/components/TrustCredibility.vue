<template>
  <section class="trust-section">
    <div class="trust-container">
      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">{{ t('trust.stats.experience.value') }}</div>
          <div class="stat-label">{{ t('trust.stats.experience.label') }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ t('trust.stats.deployments.value') }}</div>
          <div class="stat-label">{{ t('trust.stats.deployments.label') }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ t('trust.stats.uptime.value') }}</div>
          <div class="stat-label">{{ t('trust.stats.uptime.label') }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ t('trust.stats.engineers.value') }}</div>
          <div class="stat-label">{{ t('trust.stats.engineers.label') }}</div>
        </div>
      </div>

      <!-- Divider line -->
      <hr class="trust-divider" />

      <!-- Client Sectors Logos -->
      <div class="clients-area">
        <h3 class="trust-label">{{ t('trust.clientLogosLabel') }}</h3>
        <div class="client-logos-row">
          <router-link 
            v-for="client in clientsList" 
            :key="client.id"
            :to="`/clients/${client.id}`"
            class="client-logo"
          >
            <img :src="getLogoUrl(client.logo)" :alt="client.name + ' Logo'" class="trust-client-logo-img" />
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { clientsList } from '@/data/clients.js'

const { t } = useI18n()

const logoImages = import.meta.glob('../assets/images/Clients/*', { eager: true, import: 'default' })
const getLogoUrl = (logoName) => {
  return logoImages[`../assets/images/Clients/${logoName}`] || ''
}
</script>

<style scoped>
.trust-section {
  background-color: var(--color-bg-primary);
  padding: 4.5rem 0;
  border-bottom: 1px solid var(--color-bg-alt);
}

.trust-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  text-align: center;
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
}

.stat-value {
  font-size: clamp(2rem, 3vw, 2.75rem);
  font-weight: var(--font-bold);
  color: var(--color-primary);
  line-height: 1;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-weight: var(--font-medium);
}

.trust-divider {
  border: 0;
  height: 1px;
  background-color: var(--color-bg-alt);
  margin: 3.5rem 0 3rem;
}

.clients-area {
  text-align: center;
}

.trust-label {
  font-size: 0.8rem;
  font-weight: var(--font-bold);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 2rem;
}

.client-logos-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.client-logo {
  transition: all var(--transition-smooth);
  flex: 1 1 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
}

.trust-client-logo-img {
  max-width: 100px;
  max-height: 35px;
  object-fit: contain;
  filter: grayscale(100%) opacity(0.55);
  transition: all var(--transition-smooth);
}

.client-logo:hover .trust-client-logo-img {
  filter: grayscale(0%) opacity(1);
  transform: scale(1.08);
}

/* Responsiveness */
@media (max-width: 992px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 576px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .client-logos-row {
    justify-content: center;
  }
}
</style>
