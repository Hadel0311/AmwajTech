<template>
  <div class="careers-view page-transition">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content text-center">
        <h1 class="hero-title slide-up">{{ t('careers.hero.title') }}</h1>
        <p class="hero-subtitle slide-up delay-100">{{ t('careers.hero.subtitle') }}</p>
        <div class="hero-actions slide-up delay-200">
          <button @click="scrollToPositions" class="btn btn-primary cta-btn">
            {{ t('careers.hero.cta') }}
          </button>
        </div>
      </div>
    </section>

    <!-- Life at Amwaj Tech (Culture) -->
    <section class="culture-section section-padding">
      <div class="container">
        <div class="section-header text-center mb-5">
          <h2 class="section-title">{{ t('careers.culture.title') }}</h2>
          <p class="section-subtitle">{{ t('careers.culture.subtitle') }}</p>
        </div>
        <div class="culture-grid">
          <div class="culture-card" v-for="(card, key) in cultureCards" :key="key">
            <div class="card-icon">
              <component :is="card.icon" />
            </div>
            <h3 class="card-title">{{ t(`careers.culture.cards.${key}.title`) }}</h3>
            <p class="card-desc">{{ t(`careers.culture.cards.${key}.desc`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Highlights -->
    <section class="highlights-section section-padding bg-alt">
      <div class="container">
        <div class="highlights-grid">
          <div class="highlight-stat" v-for="(hl, key) in highlights" :key="key">
            <div class="stat-icon">
              <component :is="hl.icon" />
            </div>
            <h3 class="stat-title">{{ t(`careers.highlights.${key}.title`) }}</h3>
            <p class="stat-desc">{{ t(`careers.highlights.${key}.desc`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Join Amwaj Tech -->
    <section class="benefits-section section-padding">
      <div class="container">
        <div class="benefits-grid">
          <div class="benefit-card" v-for="(benefit, key) in benefits" :key="key">
            <h3 class="benefit-title">{{ t(`careers.whyJoin.${key}.title`) }}</h3>
            <p class="benefit-desc">{{ t(`careers.whyJoin.${key}.desc`) }}</p>
            <div class="benefit-accent"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Open Positions & Application -->
    <section id="open-positions" class="positions-section section-padding bg-alt">
      <div class="container">
        <div class="section-header text-center mb-5">
          <h2 class="section-title">{{ t('careers.positions.title') }}</h2>
        </div>
        
        <div v-if="!hasOpenPositions" class="no-positions-state">
          <p>{{ t('careers.positions.noOpenings') }}</p>
          <button @click="openGeneralApplication" class="btn btn-outline">
            {{ t('careers.application.submit') }}
          </button>
        </div>

        <div v-else class="positions-grid">
          <div class="job-card" v-for="(role, key) in roles" :key="key">
            <div class="job-header">
              <span class="job-dept">{{ t(`careers.positions.roles.${key}.dept`) }}</span>
              <span class="job-type">{{ t(`careers.positions.roles.${key}.type`) }}</span>
            </div>
            <h3 class="job-title">{{ t(`careers.positions.roles.${key}.title`) }}</h3>
            <div class="job-meta">
              <span class="meta-item">
                <MapPinIcon class="icon-small" />
                {{ t(`careers.positions.roles.${key}.loc`) }}
              </span>
            </div>
            <p class="job-desc">{{ t(`careers.positions.roles.${key}.desc`) }}</p>
            <button @click="applyForRole(key)" class="btn btn-primary apply-btn">
              {{ t('careers.positions.applyNow') }}
              <ArrowRightIcon class="icon-small rtl-flip" />
            </button>
          </div>
        </div>

        <!-- Dynamic Application Form -->
        <div v-if="selectedRole" class="application-form-container mt-5" id="application-form">
          <div class="form-card">
            <div class="form-header">
              <h3 class="form-title">{{ t('careers.application.title') }}</h3>
              <p class="form-subtitle" v-if="selectedRole !== 'general'">
                {{ t(`careers.positions.roles.${selectedRole}.title`) }}
              </p>
              <button @click="closeApplication" class="close-btn" aria-label="Close">
                <XIcon />
              </button>
            </div>
            
            <form @submit.prevent="submitApplication" class="app-form">
              <div class="form-row">
                <div class="form-group">
                  <label>{{ t('careers.application.fullName') }} *</label>
                  <input type="text" required class="form-control" />
                </div>
                <div class="form-group">
                  <label>{{ t('careers.application.email') }} *</label>
                  <input type="email" required class="form-control" />
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label>{{ t('careers.application.phone') }} *</label>
                  <input type="tel" required class="form-control" />
                </div>
                <div class="form-group">
                  <label>{{ t('careers.application.linkedin') }}</label>
                  <input type="url" class="form-control" />
                </div>
              </div>

              <!-- Dynamic Role Fields -->
              <div v-if="dynamicFields.length > 0" class="dynamic-fields-section">
                <div class="form-row" v-for="(field, idx) in dynamicFields" :key="idx">
                  <div class="form-group w-100">
                    <label>{{ t(`careers.application.fields.${field}`) }}</label>
                    <input type="text" class="form-control" />
                  </div>
                </div>
              </div>

              <div class="form-group file-upload-group">
                <label>{{ t('careers.application.cv') }} *</label>
                <div class="file-upload-wrapper">
                  <input type="file" required accept=".pdf,.doc,.docx" class="file-input" />
                  <div class="file-upload-visual">
                    <UploadIcon class="upload-icon" />
                    <span>{{ t('careers.application.cvHint') }}</span>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label>{{ t('careers.application.message') }}</label>
                <textarea rows="4" :placeholder="t('careers.application.messagePlaceholder')" class="form-control"></textarea>
              </div>

              <div class="form-submit">
                <button type="submit" class="btn btn-primary w-100 submit-btn">
                  {{ t('careers.application.submit') }}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>

    <!-- Hiring Process Timeline -->
    <section class="timeline-section section-padding">
      <div class="container">
        <div class="section-header text-center mb-5">
          <h2 class="section-title">{{ t('careers.timeline.title') }}</h2>
          <p class="section-subtitle">{{ t('careers.timeline.subtitle') }}</p>
        </div>
        
        <div class="timeline-wrapper">
          <div class="timeline-track"></div>
          <div class="timeline-steps">
            <div class="timeline-step" v-for="(step, key, index) in timelineSteps" :key="key">
              <div class="step-indicator">
                <span class="step-number">{{ index + 1 }}</span>
              </div>
              <div class="step-content">
                <h3 class="step-title">{{ t(`careers.timeline.steps.${key}.title`) }}</h3>
                <p class="step-description">{{ t(`careers.timeline.steps.${key}.desc`) }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-5">
          <p class="final-message mb-3" style="font-weight: 600; font-size: 1.1rem;">{{ t('careers.timeline.finalMessage') }}</p>
          <button @click="scrollToPositions" class="btn btn-primary">
            {{ t('careers.positions.applyNow') }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  Users, BookOpen, Lightbulb, Award, 
  Briefcase, Server, Shield, Monitor,
  MapPin, ArrowRight, X, Upload
} from 'lucide-vue-next'

const { t } = useI18n()

// Lucide Icons components mapping
const MapPinIcon = MapPin
const ArrowRightIcon = ArrowRight
const XIcon = X
const UploadIcon = Upload

const hasOpenPositions = ref(true)
const selectedRole = ref(null)

const cultureCards = {
  collaboration: { icon: Users },
  learning: { icon: BookOpen },
  innovation: { icon: Lightbulb },
  excellence: { icon: Award }
}

const highlights = {
  team: { icon: Users },
  projects: { icon: Server },
  learning: { icon: BookOpen },
  culture: { icon: Briefcase }
}

const benefits = {
  growth: {}, learning: {}, environment: {}, 
  projects: {}, development: {}, supportive: {}
}

const roles = {
  networkEngineer: {},
  softwareDeveloper: {},
  techSupport: {},
  sysAdmin: {},
  cybersecurity: {},
  salesExec: {},
  secretary: {}
}

const timelineSteps = {
  apply: {}, review: {}, initial: {},
  assessment: {}, final: {}, welcome: {}
}

// Role-specific field mapping
const roleFields = {
  secretary: ['adminExp', 'msOffice', 'languages', 'availability'],
  softwareDeveloper: ['progLanguages', 'frameworks', 'yearsExp', 'portfolio', 'github'],
  networkEngineer: ['ciscoExp', 'netCerts', 'yearsExp', 'infraProjects'],
  techSupport: ['troubleshootingExp', 'supportExp', 'techCerts', 'fieldWork'],
  sysAdmin: ['yearsExp', 'techCerts'],
  cybersecurity: ['yearsExp', 'techCerts', 'infraProjects'],
  salesExec: ['yearsExp', 'languages', 'availability']
}

const dynamicFields = computed(() => {
  if (!selectedRole.value || selectedRole.value === 'general') return []
  return roleFields[selectedRole.value] || []
})

const scrollToPositions = () => {
  const el = document.getElementById('open-positions')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const applyForRole = (roleKey) => {
  selectedRole.value = roleKey
  setTimeout(() => {
    const el = document.getElementById('application-form')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, 100)
}

const openGeneralApplication = () => {
  applyForRole('general')
}

const closeApplication = () => {
  selectedRole.value = null
}

const submitApplication = () => {
  // Mock submission
  alert('Application submitted successfully!')
  closeApplication()
}
</script>

<style scoped>
.page-transition {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.section-padding {
  padding: 6rem 0;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.text-center {
  text-align: center;
}

.mb-5 { margin-bottom: 3rem; }
.mb-3 { margin-bottom: 1rem; }
.mt-5 { margin-top: 3rem; }
.w-100 { width: 100%; }

.bg-alt {
  background-color: #f8fafc;
}

.section-title {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 700;
  color: var(--color-primary, #0A192F);
  margin-bottom: 1rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

.section-subtitle {
  font-size: 1.1rem;
  color: #475569;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.25s ease;
  border: none;
  font-family: inherit;
}

.btn-primary {
  background-color: var(--color-accent, #3b82f6);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.25);
}

.btn-primary:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.35);
}

.btn-outline {
  background-color: transparent;
  color: var(--color-primary, #0A192F);
  border: 2px solid var(--color-primary, #0A192F);
}

.btn-outline:hover {
  background-color: var(--color-primary, #0A192F);
  color: #ffffff;
}

.icon-small {
  width: 18px;
  height: 18px;
}

[dir="rtl"] .rtl-flip {
  transform: rotate(180deg);
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary-dark, #0a0f1c);
  color: #ffffff;
  padding: 8rem 2rem 4rem;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.6;
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 800px;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #cbd5e1;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.slide-up {
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(30px);
}

.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }

@keyframes slideUp {
  to { opacity: 1; transform: translateY(0); }
}

/* Culture Grid */
.culture-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.culture-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 2.5rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
}

.culture-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.08);
  border-color: var(--color-accent, #3b82f6);
}

.card-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  border-radius: 50%;
  color: var(--color-accent, #3b82f6);
  transition: all 0.3s ease;
}

.card-icon svg {
  width: 32px;
  height: 32px;
}

.culture-card:hover .card-icon {
  background: var(--color-accent, #3b82f6);
  color: #ffffff;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-primary, #0A192F);
  margin-bottom: 1rem;
}

.card-desc {
  color: #64748b;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Highlights Grid */
.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
}

.highlight-stat {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-icon {
  color: var(--color-accent, #3b82f6);
}

.stat-icon svg {
  width: 40px;
  height: 40px;
}

.stat-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-primary, #0A192F);
}

.stat-desc {
  color: #475569;
  line-height: 1.6;
}

/* Benefits Grid */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.benefit-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.benefit-card:hover {
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  transform: translateY(-3px);
}

.benefit-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-primary, #0A192F);
  margin-bottom: 1rem;
}

.benefit-desc {
  color: #64748b;
  line-height: 1.6;
  font-size: 0.95rem;
  position: relative;
  z-index: 2;
}

.benefit-accent {
  position: absolute;
  top: 0; left: 0;
  width: 4px;
  height: 0;
  background-color: var(--color-accent, #3b82f6);
  transition: height 0.3s ease;
}

[dir="rtl"] .benefit-accent {
  left: auto; right: 0;
}

.benefit-card:hover .benefit-accent {
  height: 100%;
}

/* Positions Grid */
.no-positions-state {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 3rem;
  background: #ffffff;
  border-radius: 12px;
  border: 1px dashed #cbd5e1;
  color: #475569;
}

.no-positions-state p {
  margin-bottom: 2rem;
  line-height: 1.6;
}

.positions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.job-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 2rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.job-card:hover {
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  border-color: #cbd5e1;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.job-dept {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-accent, #3b82f6);
  letter-spacing: 0.05em;
}

.job-type {
  font-size: 0.8rem;
  background: #f1f5f9;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  color: #475569;
  font-weight: 600;
}

.job-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-primary, #0A192F);
  margin-bottom: 1rem;
}

.job-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #64748b;
  font-size: 0.9rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.job-desc {
  color: #475569;
  line-height: 1.6;
  margin-bottom: 2rem;
  flex-grow: 1;
}

.apply-btn {
  width: 100%;
  gap: 0.5rem;
}

/* Application Form */
.application-form-container {
  max-width: 800px;
  margin: 0 auto;
  animation: slideUp 0.4s ease forwards;
}

.form-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  position: relative;
}

.form-header {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.form-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-primary, #0A192F);
  margin-bottom: 0.5rem;
}

.form-subtitle {
  color: var(--color-accent, #3b82f6);
  font-weight: 600;
  font-size: 1.1rem;
}

.close-btn {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s;
}

[dir="rtl"] .close-btn {
  right: auto;
  left: 2rem;
}

.close-btn:hover {
  color: var(--color-primary, #0A192F);
}

.app-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1.5rem;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: var(--color-primary, #0A192F);
  font-size: 0.95rem;
}

.form-control {
  padding: 0.85rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: var(--color-accent, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.dynamic-fields-section {
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.file-upload-wrapper {
  position: relative;
  border: 2px dashed #cbd5e1;
  border-radius: 6px;
  padding: 2rem;
  text-align: center;
  transition: all 0.2s;
  background: #f8fafc;
}

.file-upload-wrapper:hover {
  border-color: var(--color-accent, #3b82f6);
  background: #eff6ff;
}

.file-input {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100%; height: 100%;
  opacity: 0;
  cursor: pointer;
}

.file-upload-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
}

.upload-icon {
  width: 32px; height: 32px;
  color: var(--color-accent, #3b82f6);
}

.form-submit {
  margin-top: 1rem;
}

/* Timeline Section (Simplified matching storytelling) */
.timeline-wrapper {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
}

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
  gap: 1rem;
  position: relative;
  z-index: 2;
}

.timeline-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
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
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.step-number {
  font-weight: 700;
  color: #94a3b8;
  font-size: 1.1rem;
}

.timeline-step:hover .step-indicator {
  border-color: var(--color-accent, #3b82f6);
  background-color: var(--color-accent, #3b82f6);
  transform: scale(1.1);
}

.timeline-step:hover .step-number {
  color: #ffffff;
}

.step-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-primary, #0A192F);
  margin-bottom: 0.5rem;
}

.step-description {
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.5;
  opacity: 0.8;
}

.timeline-step:hover .step-description {
  opacity: 1;
}

@media (max-width: 1023px) {
  .timeline-steps {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 3rem;
  }
  .timeline-track { display: none; }
}

@media (max-width: 767px) {
  .hero-section { padding: 6rem 1.5rem 3rem; }
  .form-row { flex-direction: column; gap: 1.5rem; }
  .form-card { padding: 2rem 1.5rem; }
  .timeline-steps { grid-template-columns: 1fr; gap: 2.5rem; }
  .timeline-step { flex-direction: row; text-align: left; gap: 1.5rem; align-items: flex-start; }
  [dir="rtl"] .timeline-step { text-align: right; }
  .step-indicator { margin-bottom: 0; flex-shrink: 0; }
  .timeline-wrapper::before {
    content: ''; position: absolute; top: 24px; bottom: 0; left: 24px;
    width: 2px; background-color: #e2e8f0; z-index: 1;
  }
  [dir="rtl"] .timeline-wrapper::before { left: auto; right: 24px; }
}
</style>
