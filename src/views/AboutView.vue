<template>
  <main class="about-view">
    <!-- Header Banner -->
    <section class="page-hero">
      <div class="page-hero-content container">
        <span class="page-cta-tag">{{ t('nav.about') || 'About Us' }}</span>
        <h1>{{ t('about.title') }}</h1>
        <p>{{ t('nav.tagline') }}</p>
      </div>
    </section>

    <!-- Company Overview, Mission, Vision, and Core Values -->
    <CompanyOverview />

    <!-- Experience & Certifications Detailed Section -->
    <section class="experience-certifications-section">
      <div class="section-container">
        <div class="about-editorial-grid">
          <!-- Text column -->
          <div class="editorial-text-col">
            <h2 class="sub-section-title">{{ t('about.locations.title') }}</h2>
            <p class="editorial-p">{{ t('about.description') }}</p>
            <div class="location-details-box">
              <div class="loc-item">
                <span class="loc-bullet"></span>
                <div>
                  <strong>{{ t('about.locations.jordan') }}</strong> {{ t('about.locations.jordanAddress') }}
                </div>
              </div>

            </div>
          </div>

          <!-- Certifications column -->
          <div class="editorial-cert-col">
            <h3 class="panel-inner-title">{{ t('trust.certificationsLabel') }}</h3>
            <div class="certifications-detailed-list">
              <div class="cert-item-box">
                <div class="cert-title">{{ t('about.certifications.cisco.title') }}</div>
                <p class="cert-desc">{{ t('about.certifications.cisco.description') }}</p>
              </div>
              <div class="cert-item-box">
                <div class="cert-title">{{ t('about.certifications.fortinet.title') }}</div>
                <p class="cert-desc">{{ t('about.certifications.fortinet.description') }}</p>
              </div>
              <div class="cert-item-box">
                <div class="cert-title">{{ t('about.certifications.iso.title') }}</div>
                <p class="cert-desc">{{ t('about.certifications.iso.description') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import CompanyOverview from '@/components/CompanyOverview.vue'

const { t } = useI18n()
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-title {
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: var(--font-bold);
  font-family: var(--font-heading, 'Montserrat', sans-serif);
  margin-bottom: 0.75rem;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #94a3b8;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.experience-certifications-section {
  background-color: var(--color-bg-secondary);
  padding: 6.5rem 0;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.about-editorial-grid {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 5rem;
}

.sub-section-title {
  font-size: 2rem;
  font-weight: var(--font-bold);
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

.editorial-p {
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.location-details-box {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.loc-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  font-size: 0.95rem;
  color: var(--color-text-primary);
}

.loc-bullet {
  width: 8px;
  height: 8px;
  background-color: var(--color-accent);
  border-radius: 50%;
  margin-top: 0.5rem;
}

.panel-inner-title {
  font-size: 1.25rem;
  font-weight: var(--font-bold);
  color: var(--color-text-dark);
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid var(--color-bg-alt);
  padding-bottom: 0.75rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

.certifications-detailed-list {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.cert-item-box {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-bg-alt);
  border-radius: 4px;
  padding: 1.5rem;
}

.cert-title {
  font-size: 1.05rem;
  font-weight: var(--font-bold);
  color: var(--color-secondary);
  margin-bottom: 0.5rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

.cert-desc {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

/* Responsiveness */
@media (max-width: 992px) {
  .about-editorial-grid {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
}
</style>
