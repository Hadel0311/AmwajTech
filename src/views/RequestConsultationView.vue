<template>
  <main class="consultation-view">
    <!-- Hero Section -->
    <InternalHero
      :category="t('nav.consultation') || 'Consultation'"
      :title="t('requestConsultation.hero.title')"
      :description="t('requestConsultation.hero.subtitle')"
      theme="light"
      image="https://images.unsplash.com/photo-1505409859467-3a796fd5798e?auto=format&fit=crop&q=80&w=1200"
    />

    <div class="consultation-layout">
      <!-- Left Column: Form -->
      <div class="consultation-main">
        <div class="form-card">
          <h2 class="form-title">Consultation Request</h2>
          <form @submit.prevent="submitForm" class="consultation-form">
            <!-- 2 Column Grid for basics -->
            <div class="form-row">
              <div class="form-group">
                <label for="fullName">{{ t('requestConsultation.form.fullName') }} <span class="required">*</span></label>
                <input type="text" id="fullName" v-model="formData.fullName" required />
              </div>
              <div class="form-group">
                <label for="companyName">{{ t('requestConsultation.form.companyName') }} <span class="required">*</span></label>
                <input type="text" id="companyName" v-model="formData.companyName" required />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="jobTitle">{{ t('requestConsultation.form.jobTitle') }}</label>
                <input type="text" id="jobTitle" v-model="formData.jobTitle" />
              </div>
              <div class="form-group">
                <label for="businessEmail">{{ t('requestConsultation.form.businessEmail') }} <span class="required">*</span></label>
                <input type="email" id="businessEmail" v-model="formData.businessEmail" required />
              </div>
            </div>

            <div class="form-group">
              <label for="phoneNumber">{{ t('requestConsultation.form.phoneNumber') }} <span class="required">*</span></label>
              <input type="tel" id="phoneNumber" v-model="formData.phoneNumber" required />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="industry">{{ t('requestConsultation.form.industry') }} <span class="required">*</span></label>
                <select id="industry" v-model="formData.industry" required>
                  <option value="" disabled selected>Select Industry...</option>
                  <option value="gov">{{ t('requestConsultation.options.industry.gov') }}</option>
                  <option value="bank">{{ t('requestConsultation.options.industry.bank') }}</option>
                  <option value="health">{{ t('requestConsultation.options.industry.health') }}</option>
                  <option value="edu">{{ t('requestConsultation.options.industry.edu') }}</option>
                  <option value="ent">{{ t('requestConsultation.options.industry.ent') }}</option>
                  <option value="ind">{{ t('requestConsultation.options.industry.ind') }}</option>
                  <option value="other">{{ t('requestConsultation.options.industry.other') }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="requiredService">{{ t('requestConsultation.form.requiredService') }} <span class="required">*</span></label>
                <select id="requiredService" v-model="formData.requiredService" required>
                  <option value="" disabled selected>Select Service...</option>
                  <option value="net_inf">{{ t('requestConsultation.options.service.net_inf') }}</option>
                  <option value="net_sec">{{ t('requestConsultation.options.service.net_sec') }}</option>
                  <option value="dc">{{ t('requestConsultation.options.service.dc') }}</option>
                  <option value="cloud">{{ t('requestConsultation.options.service.cloud') }}</option>
                  <option value="sw">{{ t('requestConsultation.options.service.sw') }}</option>
                  <option value="ts">{{ t('requestConsultation.options.service.ts') }}</option>
                  <option value="ms">{{ t('requestConsultation.options.service.ms') }}</option>
                  <option value="multi">{{ t('requestConsultation.options.service.multi') }}</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="projectSize">{{ t('requestConsultation.form.projectSize') }} <span class="required">*</span></label>
                <select id="projectSize" v-model="formData.projectSize" required>
                  <option value="" disabled selected>Select Size...</option>
                  <option value="small">{{ t('requestConsultation.options.size.small') }}</option>
                  <option value="medium">{{ t('requestConsultation.options.size.medium') }}</option>
                  <option value="enterprise">{{ t('requestConsultation.options.size.enterprise') }}</option>
                  <option value="gov">{{ t('requestConsultation.options.size.gov') }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="projectTimeline">{{ t('requestConsultation.form.projectTimeline') }} <span class="required">*</span></label>
                <select id="projectTimeline" v-model="formData.projectTimeline" required>
                  <option value="" disabled selected>Select Timeline...</option>
                  <option value="immediate">{{ t('requestConsultation.options.timeline.immediate') }}</option>
                  <option value="1m">{{ t('requestConsultation.options.timeline.1m') }}</option>
                  <option value="3m">{{ t('requestConsultation.options.timeline.3m') }}</option>
                  <option value="6m">{{ t('requestConsultation.options.timeline.6m') }}</option>
                  <option value="future">{{ t('requestConsultation.options.timeline.future') }}</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="message">{{ t('requestConsultation.form.message') }}</label>
              <textarea id="message" v-model="formData.message" rows="5"></textarea>
            </div>

            <button type="submit" class="btn btn-primary submit-btn" :disabled="isSubmitting">
              {{ isSubmitting ? 'Submitting...' : t('requestConsultation.form.submit') }}
            </button>
          </form>
        </div>
      </div>

      <!-- Right Column: Journey & Context -->
      <aside class="consultation-sidebar">
        <div class="sidebar-block journey-block">
          <h3 class="sidebar-title">{{ t('requestConsultation.journeyTitle') }}</h3>
          <div class="vertical-timeline">
            <div class="v-timeline-item">
              <div class="v-step-num">1</div>
              <div class="v-step-text">{{ t('requestConsultation.journeySteps.step1') }}</div>
            </div>
            <div class="v-timeline-item">
              <div class="v-step-num">2</div>
              <div class="v-step-text">{{ t('requestConsultation.journeySteps.step2') }}</div>
            </div>
            <div class="v-timeline-item">
              <div class="v-step-num">3</div>
              <div class="v-step-text">{{ t('requestConsultation.journeySteps.step3') }}</div>
            </div>
            <div class="v-timeline-item">
              <div class="v-step-num">4</div>
              <div class="v-step-text">{{ t('requestConsultation.journeySteps.step4') }}</div>
            </div>
            <div class="v-timeline-item">
              <div class="v-step-num">5</div>
              <div class="v-step-text">{{ t('requestConsultation.journeySteps.step5') }}</div>
            </div>
            <div class="v-timeline-item">
              <div class="v-step-num">6</div>
              <div class="v-step-text">{{ t('requestConsultation.journeySteps.step6') }}</div>
            </div>
          </div>
        </div>

        <div class="sidebar-block why-amwaj">
          <h3 class="sidebar-title">{{ t('requestConsultation.whyClients.title') }}</h3>
          <ul class="premium-list">
            <li>
              <svg viewBox="0 0 24 24" class="check-icon" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>{{ t('requestConsultation.whyClients.cards.expertise') }}</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" class="check-icon" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>{{ t('requestConsultation.whyClients.cards.technologies') }}</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" class="check-icon" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>{{ t('requestConsultation.whyClients.cards.support') }}</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" class="check-icon" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>{{ t('requestConsultation.whyClients.cards.partnerships') }}</span>
            </li>
          </ul>
        </div>
      </aside>
    </div>

    <!-- Industries Bottom Section -->
    <section class="industries-bottom">
      <div class="container">
        <h2 class="section-title text-center">{{ t('requestConsultation.industries.title') }}</h2>
        <div class="industries-cards">
          <router-link to="/industries/banking" class="industry-card">{{ t('requestConsultation.industries.cards.banking') }}</router-link>
          <router-link to="/industries/healthcare" class="industry-card">{{ t('requestConsultation.industries.cards.healthcare') }}</router-link>
          <router-link to="/industries/government" class="industry-card">{{ t('requestConsultation.industries.cards.government') }}</router-link>
          <router-link to="/industries/education" class="industry-card">{{ t('requestConsultation.industries.cards.education') }}</router-link>
          <router-link to="/industries/enterprise" class="industry-card">{{ t('requestConsultation.industries.cards.enterprise') }}</router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import InternalHero from '@/components/InternalHero.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { api } from '@/services/api'

const { t } = useI18n()

const formData = ref({
  fullName: '',
  companyName: '',
  jobTitle: '',
  businessEmail: '',
  phoneNumber: '',
  industry: '',
  requiredService: '',
  projectSize: '',
  projectTimeline: '',
  message: ''
})

const isSubmitting = ref(false)

const submitForm = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  
  try {
    await api.create('consultation_requests', {
      ...formData.value,
      status: 'New'
    });
    alert('Consultation request submitted successfully. Our team will contact you shortly.')
    // Reset form
    formData.value = {
      fullName: '',
      companyName: '',
      jobTitle: '',
      businessEmail: '',
      phoneNumber: '',
      industry: '',
      requiredService: '',
      projectSize: '',
      projectTimeline: '',
      message: ''
    }
  } catch (error) {
    console.error('Failed to submit form', error)
    alert('Sorry, there was an error submitting your request. Please try again later.')
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.consultation-view {
  background-color: #f8fafc;
  min-height: 100vh;
  padding-bottom: 6rem;
}

/* Hero */
.consultation-hero {
  background-color: var(--color-primary-dark, #060f1c);
  background-image: radial-gradient(circle at right top, rgba(59, 130, 246, 0.1), transparent 50%),
                    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 100% 100%, 40px 40px, 40px 40px;
  color: #ffffff;
  padding: 8rem 2rem 5rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
  line-height: 1.1;
  letter-spacing: -1px;
}

.hero-subtitle {
  font-size: 1.15rem;
  color: #94a3b8;
  line-height: 1.6;
}

/* Layout */
.consultation-layout {
  max-width: 1280px;
  margin: -4rem auto 4rem;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2.5rem;
  align-items: start;
  position: relative;
  z-index: 10;
}

@media (max-width: 1024px) {
  .consultation-layout {
    grid-template-columns: 1fr;
    margin-top: -2rem;
  }
}

/* Form */
.form-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 3rem;
  border: 1px solid #e2e8f0;
}

.form-title {
  font-size: 1.75rem;
  color: var(--color-primary, #0A192F);
  margin-bottom: 2rem;
  font-weight: 700;
}

.consultation-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  .form-card {
    padding: 2rem 1.5rem;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #334155;
}

.required {
  color: #ef4444;
}

input, select, textarea {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-family: inherit;
  font-size: 1rem;
  color: #1e293b;
  transition: all 0.2s;
  background-color: #f8fafc;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--color-accent, #3b82f6);
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.submit-btn {
  margin-top: 1rem;
  padding: 1.25rem;
  font-size: 1.1rem;
  width: 100%;
}

.btn-primary {
  background-color: var(--color-accent, #3b82f6);
  color: #ffffff;
  border: none;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.25s;
}

.btn-primary:hover {
  background-color: var(--color-accent-hover, #2563eb);
  transform: translateY(-2px);
}

/* Sidebar */
.consultation-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar-block {
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary, #0A192F);
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #f1f5f9;
}

/* Vertical Timeline */
.vertical-timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
}

.vertical-timeline::before {
  content: '';
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 15px;
  width: 2px;
  background: #e2e8f0;
}
[dir="rtl"] .vertical-timeline::before {
  left: auto;
  right: 15px;
}

.v-timeline-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 2;
}

.v-step-num {
  width: 32px;
  height: 32px;
  background: #ffffff;
  border: 2px solid var(--color-accent, #3b82f6);
  color: var(--color-accent, #3b82f6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.v-step-text {
  font-weight: 600;
  color: #334155;
  font-size: 0.95rem;
}

/* Premium List */
.premium-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.premium-list li {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
  color: #1e293b;
}

.check-icon {
  width: 24px;
  height: 24px;
  color: #10b981;
  flex-shrink: 0;
}

/* Industries Bottom */
.industries-bottom {
  padding: 0 2rem;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
}

.section-title {
  font-size: 2rem;
  color: var(--color-primary, #0A192F);
  margin-bottom: 2.5rem;
}
.text-center { text-align: center; }

.industries-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.industry-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 1.25rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  color: #334155;
  text-decoration: none;
  transition: all 0.25s;
}

.industry-card:hover {
  background: var(--color-accent, #3b82f6);
  color: #ffffff;
  border-color: var(--color-accent, #3b82f6);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}
</style>
