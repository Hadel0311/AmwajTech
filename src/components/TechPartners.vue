<template>
  <section class="partners-section">
    <div class="partners-container">
      <div class="partners-header">
        <h2 class="section-title">{{ t('partners.title') }}</h2>
        <p class="section-subtitle">{{ t('partners.subtitle') }}</p>
      </div>

      <div class="partners-grid">
        <div 
          v-for="(partner, index) in partnersList" 
          :key="index"
          class="partner-card"
        >
          <!-- Grayscale SVG Partner Logo Mockup -->
          <div class="partner-logo-wrapper">
            <svg width="140" height="48" viewBox="0 0 140 48" fill="currentColor" class="partner-logo">
              <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Montserrat" font-weight="800" font-size="13" letter-spacing="1.5">{{ partner.name }}</text>
            </svg>
          </div>
          <span class="partner-tier">{{ partner.tier }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const partnersList = [
  { name: 'CISCO', tier: 'Gold Integrator' },
  { name: 'FORTINET', tier: 'Authorized Partner' },
  { name: 'PALO ALTO', tier: 'Innovator Partner' },
  { name: 'DELL TECH', tier: 'Solution Provider' },
  { name: 'IBM', tier: 'Gold Business Partner' },
  { name: 'AWS', tier: 'Select Consulting Partner' },
  { name: 'MICROSOFT', tier: 'Solutions Partner' },
  { name: 'VMWARE', tier: 'Enterprise Partner' }
]
</script>

<style scoped>
.partners-section {
  background-color: var(--color-bg-secondary);
  padding: 6rem 0;
  border-bottom: 1px solid var(--color-bg-alt);
}

.partners-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.partners-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3.5rem;
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

.partners-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.partner-card {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-bg-alt);
  border-radius: 4px;
  padding: 2.25rem 1.5rem;
  text-align: center;
  transition: all var(--transition-fast);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.partner-card:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-card);
  transform: translateY(-2px);
}

.partner-logo-wrapper {
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.partner-card:hover .partner-logo-wrapper {
  color: var(--color-primary);
}

.partner-logo {
  max-width: 100%;
  height: auto;
}

.partner-tier {
  font-size: 0.7rem;
  font-weight: var(--font-bold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: var(--color-bg-secondary);
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  border: 1px solid var(--color-bg-alt);
}

.partner-card:hover .partner-tier {
  background-color: rgba(13, 148, 136, 0.1);
  color: var(--color-accent);
  border-color: rgba(13, 148, 136, 0.2);
}

/* Responsiveness */
@media (max-width: 992px) {
  .partners-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .partners-grid {
    grid-template-columns: 1fr;
  }
}
</style>
