<template>
  <section id="about" class="overview-section">
    <div class="overview-container">
      <div class="overview-layout">
        <!-- Left Column: Mission & Vision -->
        <div class="mission-vision-panel">
          <div class="overview-header">
            <span class="overview-tagline">{{ t('overview.tagline') }}</span>
            <h2 class="section-title">{{ t('overview.title') }}</h2>
            <p class="section-subtitle">{{ t('overview.subtitle') }}</p>
          </div>

          <div class="mission-vision-cards">
            <!-- Mission -->
            <div class="mv-card">
              <h3 class="mv-title">
                <span class="mv-indicator"></span>
                {{ t('overview.mission.title') }}
              </h3>
              <p class="mv-text">{{ t('overview.mission.description') }}</p>
            </div>
            <!-- Vision -->
            <div class="mv-card">
              <h3 class="mv-title">
                <span class="mv-indicator"></span>
                {{ t('overview.vision.title') }}
              </h3>
              <p class="mv-text">{{ t('overview.vision.description') }}</p>
            </div>
          </div>
        </div>

        <!-- Right Column: Core Values Grid -->
        <div class="values-panel">
          <h3 class="panel-title">{{ t('overview.values.title') }}</h3>
          <div class="values-grid">
            <div class="value-item">
              <h4 class="value-title">{{ t('overview.values.items.integrity.title') }}</h4>
              <p class="value-desc">{{ t('overview.values.items.integrity.description') }}</p>
            </div>
            <div class="value-item">
              <h4 class="value-title">{{ t('overview.values.items.excellence.title') }}</h4>
              <p class="value-desc">{{ t('overview.values.items.excellence.description') }}</p>
            </div>
            <div class="value-item">
              <h4 class="value-title">{{ t('overview.values.items.security.title') }}</h4>
              <p class="value-desc">{{ t('overview.values.items.security.description') }}</p>
            </div>
            <div class="value-item">
              <h4 class="value-title">{{ t('overview.values.items.accountability.title') }}</h4>
              <p class="value-desc">{{ t('overview.values.items.accountability.description') }}</p>
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
</script>

<style scoped>
.overview-section {
  background-color: var(--color-bg-primary);
  padding: 7rem 0;
  border-bottom: 1px solid var(--color-bg-alt);
}

.overview-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.overview-layout {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 5rem;
}

.mission-vision-panel {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.overview-header {
  text-align: left;
}

[dir="rtl"] .overview-header {
  text-align: right;
}

.overview-tagline {
  font-size: 0.8rem;
  font-weight: var(--font-bold);
  color: var(--color-accent);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
  display: block;
}

.section-title {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
}

.mission-vision-cards {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.mv-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mv-title {
  font-size: 1.25rem;
  font-weight: var(--font-bold);
  color: var(--color-text-dark);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

[dir="rtl"] .mv-title {
  font-family: 'Tajawal', sans-serif;
}

.mv-indicator {
  width: 8px;
  height: 8px;
  background-color: var(--color-accent);
  border-radius: 50%;
  display: inline-block;
}

.mv-text {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* Values Panel */
.values-panel {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-bg-alt);
  border-radius: 4px;
  padding: 3.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.panel-title {
  font-size: 1.35rem;
  font-weight: var(--font-bold);
  color: var(--color-text-dark);
  font-family: var(--font-heading, 'Montserrat', sans-serif);
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid var(--color-bg-alt);
  padding-bottom: 1rem;
}

[dir="rtl"] .panel-title {
  font-family: 'Tajawal', sans-serif;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.value-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.value-title {
  font-size: 1.05rem;
  font-weight: var(--font-bold);
  color: var(--color-primary);
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

[dir="rtl"] .value-title {
  font-family: 'Tajawal', sans-serif;
}

.value-desc {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* Responsiveness */
@media (max-width: 992px) {
  .overview-layout {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
}

@media (max-width: 576px) {
  .values-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .values-panel {
    padding: 2rem 1.5rem;
  }
}
</style>
