<template>
  <section class="timeline-section">
    <div class="timeline-container">
      <div class="timeline-header">
        <h2 class="timeline-title">{{ t('timeline.title') }}</h2>
        <p class="timeline-subtitle">{{ t('timeline.subtitle') }}</p>
      </div>

      <div class="timeline-wrapper">
        <div class="timeline-track"></div>
        <div class="timeline-steps">
          <div 
            class="timeline-step" 
            v-for="(step, index) in steps" 
            :key="index"
            :class="{ 'is-active': activeStep === index }"
            @mouseenter="activeStep = index"
          >
            <div class="step-indicator">
              <span class="step-number">{{ index + 1 }}</span>
            </div>
            <div class="step-content">
              <div class="step-icon">
                <component :is="step.icon" />
              </div>
              <h3 class="step-title">{{ t(`timeline.steps.${step.key}.title`) }}</h3>
              <p class="step-description">{{ t(`timeline.steps.${step.key}.description`) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="timeline-footer">
        <p class="final-message">{{ t('timeline.finalMessage') }}</p>
        <router-link to="/request-consultation" class="btn btn-primary cta-btn">
          {{ t('timeline.ctaButton') }}
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="btn-arrow">
            <path d="M4.16669 10H15.8334M15.8334 10L10.8334 5M15.8334 10L10.8334 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

// Minimal inline SVG components for the icons to keep it premium and self-contained
const IconDiscovery = {
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`
}
const IconPlanning = {
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`
}
const IconDesign = {
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`
}
const IconDeployment = {
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`
}
const IconTesting = {
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`
}
const IconSupport = {
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`
}

const { t } = useI18n()

const activeStep = ref(0)

const steps = [
  { key: 'discovery', icon: IconDiscovery },
  { key: 'planning', icon: IconPlanning },
  { key: 'design', icon: IconDesign },
  { key: 'deployment', icon: IconDeployment },
  { key: 'testing', icon: IconTesting },
  { key: 'support', icon: IconSupport }
]
</script>

<style scoped>
.timeline-section {
  padding: 6rem 0;
  background-color: var(--color-bg-primary, #ffffff);
  border-top: 1px solid var(--color-bg-alt, #f1f5f9);
}

.timeline-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.timeline-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 5rem;
}

.timeline-title {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 700;
  color: var(--color-primary, #0A192F);
  margin-bottom: 1.5rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

.timeline-subtitle {
  font-size: 1.1rem;
  color: #475569;
  line-height: 1.7;
}

.timeline-wrapper {
  position: relative;
  margin-bottom: 5rem;
}

/* Horizontal track line */
.timeline-track {
  position: absolute;
  top: 24px;
  left: 5%;
  right: 5%;
  height: 4px;
  background-color: #e2e8f0;
  border-radius: 4px;
  z-index: 1;
}

.timeline-steps {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1.5rem;
  position: relative;
  z-index: 2;
}

.timeline-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.step-indicator {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 4px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.step-number {
  font-weight: 700;
  color: #94a3b8;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.timeline-step:hover .step-indicator,
.timeline-step.is-active .step-indicator {
  border-color: var(--color-accent, #3b82f6);
  background-color: var(--color-accent, #3b82f6);
  transform: scale(1.15);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
}

.timeline-step:hover .step-number,
.timeline-step.is-active .step-number {
  color: #ffffff;
}

.step-content {
  opacity: 0.7;
  transition: all 0.3s ease;
  transform: translateY(10px);
}

.timeline-step:hover .step-content,
.timeline-step.is-active .step-content {
  opacity: 1;
  transform: translateY(0);
}

.step-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: color 0.3s ease;
}

.timeline-step:hover .step-icon,
.timeline-step.is-active .step-icon {
  color: var(--color-accent, #3b82f6);
}

.step-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-primary, #0A192F);
  margin-bottom: 1rem;
  line-height: 1.3;
}

.step-description {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.6;
}

/* Footer & CTA */
.timeline-footer {
  text-align: center;
  background-color: #f8fafc;
  padding: 3.5rem 2rem;
  border-radius: 12px;
  max-width: 900px;
  margin: 0 auto;
}

.final-message {
  font-size: 1.25rem;
  color: var(--color-primary, #0A192F);
  font-weight: 600;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  font-size: 1.05rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.25s ease;
  text-decoration: none;
  border: none;
}

.btn-primary {
  background-color: var(--color-accent, #3b82f6);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.25);
  gap: 0.75rem;
}

.btn-primary:hover {
  background-color: var(--color-accent-hover, #2563eb);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.35);
}

.btn-arrow {
  transition: transform 0.25s ease;
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

/* Responsiveness for Vertical Timeline on Mobile */
@media (max-width: 1023px) {
  .timeline-steps {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 4rem;
  }
  .timeline-track {
    display: none;
  }
}

@media (max-width: 767px) {
  .timeline-section {
    padding: 4rem 0;
  }
  
  .timeline-steps {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .timeline-step {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
    gap: 1.5rem;
  }

  [dir="rtl"] .timeline-step {
    text-align: right;
  }

  .step-indicator {
    margin-bottom: 0;
    flex-shrink: 0;
    width: 48px;
    height: 48px;
  }

  .step-content {
    transform: none;
    opacity: 1;
    margin-top: 0.25rem;
  }

  .step-icon {
    display: none;
  }

  /* Vertical Track Line */
  .timeline-wrapper::before {
    content: '';
    position: absolute;
    top: 24px;
    bottom: 0;
    left: 24px;
    width: 2px;
    background-color: #e2e8f0;
    z-index: 1;
  }

  [dir="rtl"] .timeline-wrapper::before {
    left: auto;
    right: 24px;
  }

  .final-message {
    font-size: 1.1rem;
  }
}
</style>
