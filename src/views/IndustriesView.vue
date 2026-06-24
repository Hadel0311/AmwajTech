<template>
  <main class="industries-view">
    <!-- Header Banner -->
    <InternalHero
      :category="t('nav.industries') || 'Industries'"
      :title="t('industries.title')"
      :description="t('industries.subtitle')"
      theme="dark"
      size="medium"
      image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
    />

    <!-- Sectors Grid Section -->
    <section class="sectors-grid-section">
      <div class="grid-container">
        <div class="sectors-overview-grid">
          <router-link 
            v-for="(sector, index) in sectorsList" 
            :key="index"
            :to="`/industries/${sector.id}`"
            class="sector-card-link"
          >
            <div class="sector-card">
              <div class="icon-wrapper">
                <component :is="sector.icon" class="sector-icon" />
              </div>
              <h2 class="sector-card-title">{{ t(`industries.sectors.${sector.key}.title`) }}</h2>
              <p class="sector-card-desc">{{ t(`industries.sectors.${sector.key}.description`) }}</p>
              <div class="sector-card-action">
                <span>{{ t('industries.viewOverview') }}</span>
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

.sectors-grid-section {
  background-color: var(--color-bg-secondary);
  padding: 6.5rem 0;
}

.grid-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.sectors-overview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.sector-card-link {
  text-decoration: none;
  color: inherit;
}

.sector-card {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-bg-alt);
  border-radius: 4px;
  padding: 3rem 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all var(--transition-fast);
}

.sector-card:hover {
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

.sector-card:hover .icon-wrapper {
  background-color: rgba(13, 148, 136, 0.1);
  border-color: rgba(13, 148, 136, 0.2);
}

.sector-icon {
  width: 26px;
  height: 26px;
  color: var(--color-secondary);
  stroke-width: 1.75px;
  transition: color var(--transition-fast);
}

.sector-card:hover .sector-icon {
  color: var(--color-accent);
}

.sector-card-title {
  font-size: 1.3rem;
  font-weight: var(--font-bold);
  color: var(--color-text-dark);
  margin-bottom: 1rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

[dir="rtl"] .sector-card-title {
  font-family: 'Tajawal', sans-serif;
}

.sector-card-desc {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
  flex: 1;
}

.sector-card-action {
  font-size: 0.9rem;
  font-weight: var(--font-semibold);
  color: var(--color-secondary);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: color var(--transition-fast);
}

.sector-card:hover .sector-card-action {
  color: var(--color-accent);
}

.arrow-icon {
  transition: transform var(--transition-fast);
}

[dir="rtl"] .arrow-icon {
  transform: rotate(180deg);
}

.sector-card:hover .arrow-icon {
  transform: translateX(4px);
}

[dir="rtl"] .sector-card:hover .arrow-icon {
  transform: rotate(180deg) translateX(4px);
}

/* Responsiveness */
@media (max-width: 992px) {
  .sectors-overview-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .sectors-overview-grid {
    grid-template-columns: 1fr;
  }
}
</style>
