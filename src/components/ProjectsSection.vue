<template>
  <section id="projects" class="projects-section">
    <div class="projects-container">
      <div class="projects-header">
        <h2 class="section-title">{{ t('projects.title') }}</h2>
        <p class="section-subtitle">{{ t('projects.subtitle') }}</p>
      </div>

      <div class="projects-list">
        <!-- Case Study Card -->
        <div 
          v-for="(project, index) in caseStudies" 
          :key="index"
          class="project-card"
        >
          <!-- Top bar: Title and Industry -->
          <div class="project-card-header">
            <span class="project-industry">{{ t(`projects.cases.${project.key}.industry`) }}</span>
            <h3 class="project-title">{{ t(`projects.cases.${project.key}.title`) }}</h3>
          </div>

          <!-- Mid: Challenge, Solution, Outcome Grid -->
          <div class="project-card-body">
            <!-- Challenge -->
            <div class="body-column challenge-col">
              <h4 class="column-title">
                <span class="title-indicator red-indicator"></span>
                {{ t('projects.labels.challenge') }}
              </h4>
              <p class="column-text">{{ t(`projects.cases.${project.key}.challenge`) }}</p>
            </div>

            <!-- Solution -->
            <div class="body-column solution-col">
              <h4 class="column-title">
                <span class="title-indicator blue-indicator"></span>
                {{ t('projects.labels.solution') }}
              </h4>
              <p class="column-text">{{ t(`projects.cases.${project.key}.solution`) }}</p>
            </div>

            <!-- Outcome -->
            <div class="body-column outcome-col">
              <h4 class="column-title">
                <span class="title-indicator teal-indicator"></span>
                {{ t('projects.labels.outcome') }}
              </h4>
              <p class="column-text">{{ t(`projects.cases.${project.key}.outcome`) }}</p>
            </div>
          </div>
          <div class="project-card-footer">
            <button class="view-details-btn" @click="triggerModal(project.key)">
              {{ t('projects.ctaViewDetails') }}
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="btn-arrow">
                <path d="M4.16669 10H15.8334M15.8334 10L10.8334 5M15.8334 10L10.8334 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const emit = defineEmits(['open-project-modal'])

const caseStudies = [
  { key: 'bank_upgrade' },
  { key: 'health_cloud' },
  { key: 'industrial_scada' }
]

const triggerModal = (key) => {
  emit('open-project-modal', key)
}
</script>

<style scoped>
.projects-section {
  background-color: var(--color-bg-primary);
  padding: 6rem 0;
  border-bottom: 1px solid var(--color-bg-alt);
}

.projects-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.projects-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
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

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.project-card {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-bg-alt);
  border-radius: 4px;
  padding: 2.5rem;
  transition: all var(--transition-fast);
}

.project-card:hover {
  border-color: rgba(13, 148, 136, 0.2);
  box-shadow: var(--shadow-card);
}

.project-card-header {
  border-bottom: 1px solid var(--color-bg-alt);
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
}

.project-industry {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: var(--font-bold);
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 0.5rem;
}

.project-title {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-text-dark);
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

[dir="rtl"] .project-title {
  font-family: 'Tajawal', sans-serif;
}

.project-card-body {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.body-column {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.column-title {
  font-size: 0.95rem;
  font-weight: var(--font-bold);
  color: var(--color-text-dark);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.title-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
}

.red-indicator { background-color: #ef4444; }
.blue-indicator { background-color: var(--color-secondary); }
.teal-indicator { background-color: var(--color-accent); }

.column-text {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.project-card-footer {
  display: flex;
  justify-content: flex-end;
}

.view-details-btn {
  background: transparent;
  border: none;
  color: var(--color-secondary);
  font-size: 0.9rem;
  font-weight: var(--font-semibold);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: color var(--transition-fast);
  padding: 0.5rem 0;
}

.view-details-btn:hover {
  color: var(--color-accent);
}

.btn-arrow {
  transition: transform var(--transition-fast);
}

[dir="rtl"] .btn-arrow {
  transform: rotate(180deg);
}

.view-details-btn:hover .btn-arrow {
  transform: translateX(4px);
}

[dir="rtl"] .view-details-btn:hover .btn-arrow {
  transform: rotate(180deg) translateX(4px);
}

/* Responsiveness */
@media (max-width: 1023px) {
  .project-card-body {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 767px) {
  .project-card {
    padding: 1.5rem;
  }
  .project-card-header {
    margin-bottom: 1.5rem;
  }
  .project-card-footer {
    justify-content: stretch;
  }
  .view-details-btn {
    width: 100%;
    justify-content: center;
    background-color: rgba(13, 148, 136, 0.1);
    padding: 1rem;
    border-radius: 4px;
  }
}
</style>
