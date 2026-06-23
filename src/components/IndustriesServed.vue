<template>
  <section id="industries" class="industries-section">
    <div class="container industries-container">
      <div class="industries-header">
        <h2 class="section-title">{{ t('industries.title') }}</h2>
        <p class="section-subtitle">{{ t('industries.subtitle') }}</p>
      </div>

      <div class="industries-chapters-container">
        <router-link 
          v-for="(sector, index) in sectorsList" 
          :key="index"
          :to="`/industries/${sector.id}`"
          class="industry-chapter-link"
        >
          <article class="industry-chapter">
            <div class="industry-chapter__inner">
              <div class="industry-chapter__media">
                <div class="industry-chapter__media-frame">
                  <div class="industry-chapter__placeholder"></div>
                  <div class="industry-chapter__shine" aria-hidden="true"></div>
                  <!-- Use the icon as a big visual element in the media side -->
                  <component :is="sector.icon" class="sector-media-icon" />
                </div>
              </div>
              
              <div class="industry-chapter__content">
                <span class="industry-chapter__index" aria-hidden="true">0{{ index + 1 }}</span>
                <h3 class="industry-chapter__title">{{ t(`industries.sectors.${sector.key}.title`) }}</h3>
                <p class="industry-chapter__desc">{{ t(`industries.sectors.${sector.key}.description`) }}</p>
                <div class="industry-chapter__meta">
                  <span class="industry-chapter__category">{{ t(`industries.sectors.${sector.key}.title`) }}</span>
                </div>
              </div>
            </div>
          </article>
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
}

.industries-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.industries-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 5rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: var(--font-bold, 700);
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

.section-subtitle {
  font-size: var(--text-lg, 1.125rem);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.industries-chapters-container {
  padding-bottom: 4rem;
  position: relative;
}

.industry-chapter-link {
  text-decoration: none;
  color: inherit;
  display: block;
  position: sticky;
  top: 15vh;
  margin-bottom: 2rem;
  z-index: 1;
}

.industry-chapter {
  /* removed sticky positioning here */
}

.industry-chapter__inner {
  display: grid;
  grid-template-columns: 1fr;
  border-radius: 1.5rem;
  overflow: hidden;
  min-height: 400px;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid color-mix(in srgb, var(--color-text-dark, #000) 10%, transparent);
  background-color: var(--color-bg-primary, #fff);
  transition: transform 0.3s ease;
}

.industry-chapter-link:hover .industry-chapter__inner {
  transform: translateY(-4px);
  box-shadow: 0 -15px 50px rgba(0, 0, 0, 0.15);
}

@media (min-width: 992px) {
  .industry-chapter__inner {
    grid-template-columns: 1.2fr 1fr;
  }
}

.industry-chapter__media {
  position: relative;
  background: var(--color-bg-alt, #f8f9fa);
  overflow: hidden;
}

.industry-chapter__media-frame {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.industry-chapter__placeholder {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, var(--color-primary), transparent 70%);
  opacity: 0.05;
}

.industry-chapter__shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, color-mix(in srgb, var(--color-text-dark, #000) 5%, transparent) 0%, transparent 50%);
}

.sector-media-icon {
  width: 120px;
  height: 120px;
  color: var(--color-accent, var(--color-primary));
  opacity: 0.8;
  z-index: 2;
  transition: transform 0.5s ease;
}

.industry-chapter-link:hover .sector-media-icon {
  transform: scale(1.1);
}

.industry-chapter__content {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--color-bg-primary, #fff);
}

.industry-chapter__index {
  font-family: monospace;
  font-size: 1.25rem;
  color: color-mix(in srgb, var(--color-text-dark, #000) 30%, transparent);
  margin-bottom: 1rem;
}

.industry-chapter__title {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  color: var(--color-text-dark, #000);
  line-height: 1.2;
  margin-bottom: 1.5rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

[dir="rtl"] .industry-chapter__title {
  font-family: 'Tajawal', sans-serif;
}

.industry-chapter__desc {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-text-secondary, #666);
  margin-bottom: 2rem;
}

.industry-chapter__category {
  display: inline-block;
  padding: 0.25rem 1rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-text-dark, #000) 10%, transparent);
  color: color-mix(in srgb, var(--color-text-dark, #000) 90%, transparent);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
</style>
