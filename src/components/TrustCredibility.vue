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
          <!-- SVG Client Logo Mockups (Corporate Grayscale style) -->
          <div class="client-logo">
            <svg width="120" height="40" viewBox="0 0 120 40" fill="currentColor">
              <text x="10" y="25" font-family="Montserrat" font-weight="700" font-size="12" letter-spacing="1">AL-WATANIYA BANK</text>
            </svg>
          </div>
          <div class="client-logo">
            <svg width="120" height="40" viewBox="0 0 120 40" fill="currentColor">
              <text x="10" y="25" font-family="Montserrat" font-weight="700" font-size="12" letter-spacing="1">GULF MEDICAL</text>
            </svg>
          </div>
          <div class="client-logo">
            <svg width="120" height="40" viewBox="0 0 120 40" fill="currentColor">
              <text x="10" y="25" font-family="Montserrat" font-weight="700" font-size="12" letter-spacing="1">MINISTRY OF IT</text>
            </svg>
          </div>
          <div class="client-logo">
            <svg width="120" height="40" viewBox="0 0 120 40" fill="currentColor">
              <text x="10" y="25" font-family="Montserrat" font-weight="700" font-size="12" letter-spacing="1">CAPITAL TELECOM</text>
            </svg>
          </div>
          <div class="client-logo">
            <svg width="120" height="40" viewBox="0 0 120 40" fill="currentColor">
              <text x="10" y="25" font-family="Montserrat" font-weight="700" font-size="12" letter-spacing="1">AMMAN PORT AUTHORITY</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
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
  color: var(--color-text-muted);
  opacity: 0.5;
  transition: all var(--transition-fast);
  flex: 1 1 160px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.client-logo:hover {
  color: var(--color-primary);
  opacity: 0.9;
}

/* Responsiveness */
@media (max-width: 1023px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 767px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .client-logos-row {
    justify-content: center;
    gap: 1rem;
  }
}
</style>
