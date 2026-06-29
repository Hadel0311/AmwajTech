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
                <img :src="sector.image" :alt="t(`industries.sectors.${sector.key}.title`)" class="industry-chapter__bg-image" />
                <div class="industry-chapter__media-overlay"></div>
                <div class="industry-chapter__media-frame">
                  <div class="industry-chapter__shine" aria-hidden="true"></div>
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
  { id: 'banking', key: 'banking', icon: CreditCard, image: '/images/banking-hero.jpg' },
  { id: 'government', key: 'government', icon: Landmark, image: '/images/government-hero.jpg' },
  { id: 'healthcare', key: 'healthcare', icon: HeartPulse, image: '/images/healthcare-hero.jpg' },
  { id: 'education', key: 'education', icon: GraduationCap, image: '/images/education-hero.jpg' },
  { id: 'enterprise', key: 'enterprise', icon: Building, image: '/images/enterprise-hero.jpg' },
  { id: 'industrial', key: 'industrial', icon: Factory, image: '/images/industrial-hero.jpg' }
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
  display: flex;
  flex-direction: column;
  gap: 2rem;
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

.industry-chapter__inner {
  display: grid;
  grid-template-columns: 1fr;
  border-radius: 1.5rem;
  overflow: hidden;
  min-height: 400px;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid color-mix(in srgb, var(--color-text-dark, #000) 10%, transparent);
  background-color: var(--color-bg-primary, #fff);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.industry-chapter-link:hover .industry-chapter__inner {
  transform: translateY(-8px);
  box-shadow: 0 -15px 50px rgba(0, 0, 0, 0.15);
  border-color: color-mix(in srgb, var(--color-primary, #0D9488) 30%, transparent);
}

@media (min-width: 992px) {
  .industry-chapter__inner {
    grid-template-columns: 1.2fr 1fr;
  }
}

.industry-chapter__media {
  position: relative;
  background: var(--color-bg-alt, #1f2937);
  overflow: hidden;
}

.industry-chapter__bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.industry-chapter-link:hover .industry-chapter__bg-image {
  transform: scale(1.05);
}

.industry-chapter__media-overlay {
  position: absolute;
  inset: 0;
  background: transparent;
  z-index: 1;
}

.industry-chapter__media-frame {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.industry-chapter__shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.sector-media-icon {
  width: 100px;
  height: 100px;
  color: #fff;
  opacity: 0.9;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.industry-chapter-link:hover .sector-media-icon {
  transform: scale(1.15) translateY(-5px);
  color: var(--color-accent, #14b8a6);
}

.industry-chapter__content {
  padding: 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--color-bg-primary, #fff);
  position: relative;
  z-index: 2;
}

.industry-chapter__index {
  font-family: monospace;
  font-size: 1.25rem;
  color: color-mix(in srgb, var(--color-text-dark, #000) 20%, transparent);
  margin-bottom: 1rem;
  font-weight: 700;
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

.industry-chapter__meta {
  margin-top: auto;
}

.industry-chapter__category {
  display: inline-block;
  padding: 0.35rem 1.25rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-primary, #0D9488) 10%, transparent);
  color: var(--color-primary, #0D9488);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
</style>

