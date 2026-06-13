<template>
  <section id="contact" class="contact-section">
    <div class="contact-container">
      <div class="contact-header">
        <h2 class="section-title">{{ t('contact.title') }}</h2>
        <p class="section-subtitle">{{ t('contact.subtitle') }}</p>
      </div>

      <div class="contact-layout">
        <!-- Form Side -->
        <div class="contact-form-wrapper">
          <h3 class="form-card-title">{{ t('contact.form.title') }}</h3>
          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-grid">
              <div class="form-group">
                <label for="name" class="form-label">{{ t('contact.form.name') }}</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name" 
                  required 
                  class="form-input" 
                  :placeholder="t('contact.form.placeholders.name')"
                />
              </div>

              <div class="form-group">
                <label for="email" class="form-label">{{ t('contact.form.email') }}</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  required 
                  class="form-input" 
                  :placeholder="t('contact.form.placeholders.email')"
                />
              </div>

              <div class="form-group">
                <label for="org" class="form-label">{{ t('contact.form.org') }}</label>
                <input 
                  type="text" 
                  id="org" 
                  v-model="form.org" 
                  required 
                  class="form-input" 
                  :placeholder="t('contact.form.placeholders.org')"
                />
              </div>

              <div class="form-group">
                <label for="service" class="form-label">{{ t('contact.form.serviceType.label') }}</label>
                <select id="service" v-model="form.service" required class="form-select">
                  <option value="" disabled>{{ t('contact.form.serviceType.label') }}</option>
                  <option value="network">{{ t('contact.form.serviceType.network') }}</option>
                  <option value="security">{{ t('contact.form.serviceType.security') }}</option>
                  <option value="data_center">{{ t('contact.form.serviceType.data_center') }}</option>
                  <option value="software">{{ t('contact.form.serviceType.software') }}</option>
                  <option value="managed">{{ t('contact.form.serviceType.managed') }}</option>
                </select>
              </div>
            </div>

            <div class="form-group full-width">
              <label for="message" class="form-label">{{ t('contact.form.message') }}</label>
              <textarea 
                id="message" 
                v-model="form.message" 
                required 
                rows="5" 
                class="form-textarea"
                :placeholder="t('contact.form.placeholders.message')"
              ></textarea>
            </div>

            <button type="submit" class="submit-btn">
              {{ t('contact.form.submit') }}
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="submit-icon">
                <path d="M4.16669 10H15.8334M15.8334 10L10.8334 5M15.8334 10L10.8334 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </form>
        </div>

        <!-- Info Sidebar -->
        <div class="contact-info-wrapper">
          <!-- Direct Details -->
          <div class="info-card direct-info">
            <h3 class="info-title">{{ t('contact.info.title') }}</h3>
            <ul class="info-list">
              <li>
                <span class="info-label">{{ t('contact.labels.email') }}</span>
                <a :href="`mailto:${t('contact.info.email')}`" class="info-link">{{ t('contact.info.email') }}</a>
              </li>
              <li>
                <span class="info-label">{{ t('contact.labels.phone') }}</span>
                <a href="tel:+96265800000" class="info-link">{{ t('contact.info.phone') }}</a>
              </li>
              <li>
                <span class="info-label">{{ t('contact.labels.location') }}</span>
                <span class="info-text">{{ t('contact.info.location') }}</span>
              </li>
            </ul>
          </div>

          <!-- Regional Offices -->
          <div class="info-card offices-info">
            <h3 class="info-title">{{ t('contact.info.locations.title') }}</h3>
            <ul class="offices-list">
              <li>
                <span class="office-name">{{ t('contact.info.locations.jordan') }}</span>
                <span class="office-desc">{{ t('contact.info.locations.jordanDesc') }}</span>
              </li>
              <li>
                <span class="office-name">{{ t('contact.info.locations.uae') }}</span>
                <span class="office-desc">{{ t('contact.info.locations.uaeDesc') }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()

const form = ref({
  name: '',
  email: '',
  org: '',
  service: '',
  message: ''
})

onMounted(() => {
  if (route.query.service) {
    form.value.service = route.query.service
  }
  if (route.query.message) {
    form.value.message = route.query.message
  }
})

const handleSubmit = () => {
  const subject = encodeURIComponent(`Consultation Inquiry from ${form.value.name}`)
  const body = encodeURIComponent(
    `Name: ${form.value.name}\n` +
    `Email: ${form.value.email}\n` +
    `Organization: ${form.value.org}\n` +
    `Area of Interest: ${form.value.service}\n\n` +
    `Message:\n${form.value.message}`
  )
  window.location.href = `mailto:info@amwaj-tech.com?subject=${subject}&body=${body}`
}
</script>

<style scoped>
.contact-section {
  background-color: var(--color-bg-secondary);
  padding: 6.5rem 0;
  border-bottom: 1px solid var(--color-bg-alt);
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.contact-header {
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

.contact-layout {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 3.5rem;
  align-items: start;
}

.contact-form-wrapper {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-bg-alt);
  border-radius: 4px;
  padding: 3rem;
  box-shadow: var(--shadow-card);
}

.form-card-title {
  font-size: 1.25rem;
  font-weight: var(--font-bold);
  color: var(--color-text-dark);
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

[dir="rtl"] .form-card-title {
  font-family: 'Tajawal', sans-serif;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.full-width {
  grid-column: span 2;
}

.form-label {
  font-size: 0.8rem;
  font-weight: var(--font-bold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-input,
.form-select,
.form-textarea {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-bg-alt);
  padding: 0.85rem 1rem;
  font-family: inherit;
  font-size: 0.95rem;
  color: var(--color-text-dark);
  border-radius: 4px;
  transition: all var(--transition-fast);
  outline: none;
  width: 100%;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: var(--color-accent);
  background-color: var(--color-bg-primary);
  box-shadow: 0 0 0 2px rgba(13, 148, 136, 0.15);
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='currentColor' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 30px;
}

[dir="rtl"] .form-select {
  background-position: left 10px center;
  padding-left: 30px;
  padding-right: 1rem;
}

.form-textarea {
  resize: vertical;
}

.submit-btn {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--color-accent);
  color: var(--color-text-inverse);
  padding: 1rem 2.25rem;
  font-size: 0.95rem;
  font-weight: var(--font-semibold);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: var(--shadow-cta);
  transition: all var(--transition-fast);
}

.submit-btn:hover {
  background-color: var(--color-accent-hover);
  transform: translateY(-2px);
}

.submit-icon {
  transition: transform var(--transition-fast);
}

[dir="rtl"] .submit-icon {
  transform: rotate(180deg);
}

.submit-btn:hover .submit-icon {
  transform: translateX(4px);
}

[dir="rtl"] .submit-btn:hover .submit-icon {
  transform: rotate(180deg) translateX(4px);
}

/* Sidebar Info */
.contact-info-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-card {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-bg-alt);
  border-radius: 4px;
  padding: 2.25rem 2rem;
}

.info-title {
  font-size: 1.1rem;
  font-weight: var(--font-bold);
  color: var(--color-text-dark);
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid var(--color-bg-alt);
  padding-bottom: 0.75rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

[dir="rtl"] .info-title {
  font-family: 'Tajawal', sans-serif;
}

.info-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.info-label {
  display: block;
  font-size: 0.7rem;
  font-weight: var(--font-bold);
  color: var(--color-text-muted);
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.info-link {
  color: var(--color-secondary);
  text-decoration: none;
  font-size: 1rem;
  font-weight: var(--font-semibold);
  transition: color var(--transition-fast);
}

.info-link:hover {
  color: var(--color-accent);
}

.info-text {
  font-size: 1rem;
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
}

/* Offices List */
.offices-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.office-name {
  display: block;
  font-size: 0.95rem;
  font-weight: var(--font-bold);
  color: var(--color-primary);
  margin-bottom: 0.25rem;
}

.office-desc {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

/* Responsiveness */
@media (max-width: 1023px) {
  .contact-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 767px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .full-width {
    grid-column: auto;
  }
  .contact-form-wrapper {
    padding: 2rem 1.5rem;
  }
  .submit-btn {
    align-self: stretch;
    justify-content: center;
  }
}
</style>
