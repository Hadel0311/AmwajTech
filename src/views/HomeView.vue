<template>
  <main class="home-view">
    <!-- 1. Hero Banner -->
    <Hero />

    <!-- 2. Trust Credentials & Key Stats -->
    <TrustCredibility />

    <!-- 3. Core Services Grid Overview -->
    <ServicesGrid />

    <!-- 4. Industries Served Section -->
    <IndustriesServed />

    <!-- 5. Differentiators Narrative -->
    <WhyAmwaj />

    <!-- 6. Professional Contact CTA -->
    <section class="contact-cta-section">
      <div class="cta-container">
        <h2 class="cta-title">{{ t('home.ctaTitle') }}</h2>
        <p class="cta-text">{{ t('home.ctaText') }}</p>
        <router-link to="/contact" class="btn btn-primary cta-btn">
          {{ t('home.ctaButton') }}
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="btn-arrow">
            <path d="M4.16669 10H15.8334M15.8334 10L10.8334 5M15.8334 10L10.8334 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </router-link>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import Hero from '@/components/Hero.vue'
import TrustCredibility from '@/components/TrustCredibility.vue'
import ServicesGrid from '@/components/ServicesGrid.vue'
import IndustriesServed from '@/components/IndustriesServed.vue'
import WhyAmwaj from '@/components/WhyAmwaj.vue'

const { t } = useI18n()
</script>

<style scoped>
.contact-cta-section {
  background-color: var(--color-primary-dark);
  padding: 6rem 0;
  text-align: center;
  color: var(--color-text-inverse);
  position: relative;
  overflow: hidden;
}

.contact-cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center;
  pointer-events: none;
}

.cta-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.cta-title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: var(--font-bold);
  font-family: var(--font-heading, 'Montserrat', sans-serif);
  line-height: 1.25;
  letter-spacing: -0.5px;
}

.cta-text {
  font-size: 1.1rem;
  color: #94a3b8;
  line-height: 1.6;
  max-width: 600px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: var(--font-semibold);
  border-radius: 4px;
  cursor: pointer;
  transition: all var(--transition-fast);
  border: none;
  letter-spacing: 0.5px;
  text-decoration: none;
}

.btn-primary {
  background-color: var(--color-accent);
  color: var(--color-text-inverse);
  box-shadow: var(--shadow-cta);
  gap: 0.5rem;
}

.btn-primary:hover {
  background-color: var(--color-accent-hover);
  transform: translateY(-2px);
}

.btn-arrow {
  transition: transform var(--transition-fast);
}

[dir="rtl"] .btn-arrow {
  transform: rotate(180deg);
}

.btn-primary:hover .btn-arrow {
  transform: translateX(4px);
}

[dir="rtl"] .btn-primary:hover .btn-arrow {
  transform: rotate(180deg) translateX(4px);
}
</style>
