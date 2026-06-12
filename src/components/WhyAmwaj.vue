<template>
  <section class="why-section">
    <div class="why-container">
      <div class="why-layout">
        <!-- Left Side: Narrative -->
        <div class="why-narrative">
          <span class="why-subtitle">{{ t('why.advantage') }}</span>
          <h2 class="why-title">{{ t('why.title') }}</h2>
          <p class="why-description">
            {{ t('why.subtitle') }}
          </p>
          <div class="certifications-summary">
            <span class="cert-title">{{ t('why.certificationsTitle') }}</span>
            <div class="cert-logos">
              <span class="cert-badge">Cisco Gold</span>
              <span class="cert-badge">Fortinet NSE</span>
              <span class="cert-badge">Palo Alto PCNSE</span>
              <span class="cert-badge">VMware VCP</span>
            </div>
          </div>
        </div>

        <!-- Right Side: Numbered Differentiators -->
        <div class="why-list">
          <div 
            v-for="(item, index) in whyItems" 
            :key="index"
            class="why-item"
          >
            <div class="why-number">0{{ index + 1 }}</div>
            <div class="why-content">
              <h3 class="item-title">{{ t(`why.items.${item}.title`) }}</h3>
              <p class="item-description">{{ t(`why.items.${item}.description`) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const whyItems = [
  'team',
  'solutions',
  'specialists',
  'support',
  'partnerships'
]
</script>

<style scoped>
.why-section {
  background-color: var(--color-bg-secondary);
  padding: 7rem 0;
  border-bottom: 1px solid var(--color-bg-alt);
}

.why-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.why-layout {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 5rem;
}

.why-narrative {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.why-subtitle {
  font-size: 0.8rem;
  font-weight: var(--font-bold);
  color: var(--color-accent);
  letter-spacing: 2px;
  margin-bottom: 1rem;
}

.why-title {
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: var(--font-bold);
  color: var(--color-primary);
  line-height: 1.2;
  margin-bottom: 1.5rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

.why-description {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

.certifications-summary {
  border-top: 1px solid var(--color-bg-alt);
  padding-top: 2rem;
}

.cert-title {
  display: block;
  font-size: 0.75rem;
  font-weight: var(--font-bold);
  color: var(--color-text-muted);
  letter-spacing: 1px;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.cert-logos {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cert-badge {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-bg-alt);
  color: var(--color-text-secondary);
  padding: 0.4rem 0.75rem;
  font-size: 0.75rem;
  font-weight: var(--font-semibold);
  border-radius: 4px;
}

/* Right Column list */
.why-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.why-item {
  display: flex;
  gap: 1.5rem;
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-bg-alt);
  padding: 2rem;
  border-radius: 4px;
  transition: all var(--transition-fast);
}

.why-item:hover {
  transform: translateX(4px);
  border-color: rgba(13, 148, 136, 0.2);
  box-shadow: var(--shadow-card);
}

[dir="rtl"] .why-item:hover {
  transform: translateX(-4px);
}

.why-number {
  font-size: 1.5rem;
  font-weight: var(--font-bold);
  color: var(--color-accent);
  font-family: var(--font-heading, 'Montserrat', sans-serif);
  line-height: 1;
}

.why-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-title {
  font-size: 1.15rem;
  font-weight: var(--font-bold);
  color: var(--color-text-dark);
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

[dir="rtl"] .item-title {
  font-family: 'Tajawal', sans-serif;
}

.item-description {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* Responsiveness */
@media (max-width: 992px) {
  .why-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>
