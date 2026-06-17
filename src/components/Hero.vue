<template>
  <section id="hero" class="hero-section">
    <!-- Network Video Background -->
    <video autoplay loop muted playsinline class="hero-video">
      <source src="../assets/network-bg.mp4" type="video/mp4" />
    </video>
    <!-- Dark Navy Overlay with Grid Pattern -->
    <div class="hero-background-overlay"></div>
    <div class="hero-grid-pattern"></div>
    
    <div class="hero-container">
      <div class="hero-content">
        <div class="location-badge scroll-reveal">
          <span class="location-dot"></span>
          {{ t('hero.location') }}
        </div>
        <h1 class="hero-title">
          {{ t('hero.tagline') }}
        </h1>
        <p class="hero-description">
          {{ t('hero.description') }}
        </p>
        <div class="hero-actions">
          <button class="btn btn-primary" @click="scrollToSection('contact')">
            {{ t('hero.ctaPrimary') }}
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="btn-icon">
              <path d="M4.16669 10H15.8334M15.8334 10L10.8334 5M15.8334 10L10.8334 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="btn btn-secondary" @click="scrollToSection('services')">
            {{ t('hero.ctaSecondary') }}
          </button>
        </div>
      </div>
    </div>
    <div class="hero-scroll-indicator" @click="scrollToSection('services')">
      <span class="scroll-label">{{ t('hero.scrollLabel') }}</span>
      <span class="scroll-arrow">↓</span>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--color-primary-dark);
}

.hero-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  object-fit: cover;
  opacity: 0.45;
  z-index: 1;
}

.hero-background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, transparent 30%, var(--color-primary-dark) 90%),
              linear-gradient(180deg, rgba(10, 25, 47, 0.2) 0%, var(--color-primary-dark) 100%);
  z-index: 2;
}

.hero-grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  background-position: center;
  z-index: 3;
  pointer-events: none;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  width: 100%;
  z-index: 4;
}

.hero-content {
  max-width: 850px;
  text-align: left;
}

[dir="rtl"] .hero-content {
  text-align: right;
}

.location-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(13, 148, 136, 0.1);
  border: 1px solid rgba(13, 148, 136, 0.25);
  color: var(--color-accent);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: var(--font-semibold);
  letter-spacing: 0.5px;
  margin-bottom: 2rem;
  text-transform: uppercase;
}

.location-dot {
  width: 8px;
  height: 8px;
  background-color: var(--color-accent);
  border-radius: 50%;
  display: inline-block;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.9);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(0.9);
    opacity: 0.5;
  }
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: var(--font-bold);
  line-height: 1.15;
  color: var(--color-text-inverse);
  margin-bottom: 1.5rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
  letter-spacing: -0.5px;
}

.hero-description {
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  color: #94a3b8; /* Slate 300 for premium readability */
  line-height: 1.6;
  margin-bottom: 2.5rem;
  max-width: 750px;
}

.hero-actions {
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
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

.btn-secondary {
  background-color: transparent;
  color: var(--color-text-inverse);
  border: 2px solid rgba(255, 255, 255, 0.15);
}

.btn-secondary:hover {
  border-color: var(--color-text-inverse);
  background-color: rgba(255, 255, 255, 0.05);
  transform: translateY(-2px);
}

.btn-icon {
  transition: transform var(--transition-fast);
}

[dir="rtl"] .btn-icon {
  transform: rotate(180deg);
}

.btn-primary:hover .btn-icon {
  transform: translateX(4px);
}

[dir="rtl"] .btn-primary:hover .btn-icon {
  transform: rotate(180deg) translateX(4px);
}

.hero-scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.75rem;
  font-weight: var(--font-semibold);
  letter-spacing: 2px;
  cursor: pointer;
  z-index: 4;
  transition: color var(--transition-fast);
}

.hero-scroll-indicator:hover {
  color: var(--color-accent);
}

.scroll-arrow {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-6px);
  }
  60% {
    transform: translateY(-3px);
  }
}

/* Responsiveness */
@media (max-width: 767px) {
  .hero-section {
    height: 85vh;
    min-height: 600px;
  }
  .hero-container {
    padding: 0 1.5rem;
  }
  .hero-content {
    text-align: center;
  }
  [dir="rtl"] .hero-content {
    text-align: center;
  }
  .hero-actions {
    justify-content: center;
    flex-direction: column;
    width: 100%;
  }
  .btn {
    width: 100%;
  }
  .hero-description {
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 480px) {
  .hero-scroll-indicator {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-video {
    display: none;
  }
}
</style>
