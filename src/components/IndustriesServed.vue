<template>
  <section id="industries" class="industries-section">
    <div class="industries-container">
      <div class="industries-header">
        <h2 class="section-title">{{ t('industries.title') }}</h2>
        <p class="section-subtitle">{{ t('industries.subtitle') }}</p>
      </div>

      <div class="industries-grid">
        <router-link 
          v-for="(sector, index) in sectorsList" 
          :key="index"
          :to="`/industries/${sector.id}`"
          class="sector-card-link"
        >
          <div class="industry-card">
            <div class="card-icon-bar">
              <component :is="sector.icon" class="sector-icon" />
            </div>
            <h3 class="sector-title">{{ t(`industries.sectors.${sector.key}.title`) }}</h3>
            <p class="sector-description">{{ t(`industries.sectors.${sector.key}.description`) }}</p>
            <div class="card-footer-glow"></div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { 
  CreditCard, 
  Landmark, 
  HeartPulse, 
  GraduationCap, 
  Building, 
  Factory 
} from 'lucide-vue-next'

const { t } = useI18n()

const sectorsList = [
  { id: 'banking', key: 'banking', icon: CreditCard },
  { id: 'government', key: 'government', icon: Landmark },
  { id: 'healthcare', key: 'healthcare', icon: HeartPulse },
  { id: 'education', key: 'education', icon: GraduationCap },
  { id: 'enterprise', key: 'enterprise', icon: Building },
  { id: 'industrial', key: 'industrial', icon: Factory }
]
</script>

<style scoped>
.industries-section {
  background-color: var(--color-bg-primary);
  padding: 6rem 0;
  border-bottom: 1px solid var(--color-bg-alt);
}

.industries-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.industries-header {
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

.industries-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.sector-card-link {
  text-decoration: none;
  color: inherit;
}

.industry-card {
  position: relative;
  border: 1px solid var(--color-bg-alt);
  border-radius: 4px;
  padding: 2.5rem 2rem;
  background-color: var(--color-bg-primary);
  transition: all var(--transition-fast);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.industry-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 80, 157, 0.2);
  box-shadow: var(--shadow-card);
}

.card-icon-bar {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.sector-icon {
  width: 32px;
  height: 32px;
  color: var(--color-accent);
  stroke-width: 1.5px;
}

.sector-title {
  font-size: 1.25rem;
  font-weight: var(--font-bold);
  color: var(--color-text-dark);
  margin-bottom: 0.75rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

[dir="rtl"] .sector-title {
  font-family: 'Tajawal', sans-serif;
}

.sector-description {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* Bottom Accent Hover line */
.card-footer-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--color-secondary);
  transform: scaleX(0);
  transition: transform var(--transition-fast);
  transform-origin: left;
}

[dir="rtl"] .card-footer-glow {
  transform-origin: right;
}

.industry-card:hover .card-footer-glow {
  transform: scaleX(1);
}

/* Responsiveness */
@media (max-width: 1023px) {
  .industries-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 767px) {
  .industries-grid {
    grid-template-columns: 1fr;
  }
}
</style>
