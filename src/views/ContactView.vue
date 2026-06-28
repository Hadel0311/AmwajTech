<template>
  <main class="contact-view">
    <!-- Hero Section -->
    <InternalHero
      category="Contact"
      title="Contact Us"
      description="Have a question, need assistance, or want to learn more about our solutions? Our team is ready to help."
      theme="dark"
      size="medium"
      image="/AmwajTech/images/contact-hero.jpg"
    />

    <section class="contact-main-section">
      <div class="section-container">
        <div class="contact-layout-grid">
          
          <!-- Left Card: Contact Form -->
          <div class="contact-card form-card">
            <h2 class="card-title">Send Us a Message</h2>
            <p class="card-desc">Fill out the form below and our team will get back to you as soon as possible.</p>
            
            <form @submit.prevent="submitForm" class="contact-form">
              <div class="form-group">
                <label for="fullName">Full Name <span class="required">*</span></label>
                <input type="text" id="fullName" v-model="form.fullName" required placeholder="John Doe" />
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="email">Email Address <span class="required">*</span></label>
                  <input type="email" id="email" v-model="form.email" required placeholder="john@example.com" />
                </div>
                <div class="form-group">
                  <label for="phone">Phone Number <span class="required">*</span></label>
                  <input type="tel" id="phone" v-model="form.phone" required placeholder="+962 79 000 0000" />
                </div>
              </div>
              
              <div class="form-group">
                <label for="subject">Subject <span class="required">*</span></label>
                <input type="text" id="subject" v-model="form.subject" required placeholder="How can we help?" />
              </div>
              
              <div class="form-group">
                <label for="message">Message <span class="required">*</span></label>
                <textarea id="message" v-model="form.message" required rows="5" placeholder="Your message here..."></textarea>
              </div>
              
              <button type="submit" class="btn-primary submit-btn" :disabled="isSubmitting">
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
            </form>
          </div>

          <!-- Right Card: Visit Us -->
          <div class="contact-card location-card">
            <h2 class="card-title">Visit Us</h2>
            <p class="card-desc">Our office is located in the heart of Amman. Visit us or contact us using the information below.</p>
            
            <div class="contact-list">
              <!-- Phone -->
              <div class="contact-group">
                <div class="group-icon-wrapper">
                  <Phone class="group-icon" />
                </div>
                <div class="group-content">
                  <div class="content-row">
                    <h4>Phone</h4>
                    <p>+962-655-45514</p>
                  </div>
                </div>
              </div>

              <!-- Mobile -->
              <div class="contact-group mt-lg">
                <div class="group-icon-wrapper">
                  <Smartphone class="group-icon" />
                </div>
                <div class="group-content">
                  <div class="content-row">
                    <h4>Mobile</h4>
                    <p>+962-77-5545514</p>
                  </div>
                </div>
              </div>

              <!-- Fax -->
              <div class="contact-group mt-lg">
                <div class="group-icon-wrapper">
                  <Printer class="group-icon" />
                </div>
                <div class="group-content">
                  <div class="content-row">
                    <h4>Fax</h4>
                    <p>+962-655-11937</p>
                  </div>
                </div>
              </div>

              <!-- Email -->
              <div class="contact-group mt-lg">
                <div class="group-icon-wrapper">
                  <Mail class="group-icon" />
                </div>
                <div class="group-content">
                  <div class="content-row">
                    <h4>Email</h4>
                    <p><a href="mailto:info@amwaj-tech.com">info@amwaj-tech.com</a></p>
                  </div>
                </div>
              </div>

              <!-- Address -->
              <div class="contact-group mt-lg">
                <div class="group-icon-wrapper">
                  <MapPin class="group-icon" />
                </div>
                <div class="group-content">
                  <div class="content-row">
                    <h4>Address</h4>
                    <p>Amman-Jordan-gardens st alzaytona building (53) First floor, office number 2</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="map-wrapper">
              <iframe 
                src="https://maps.google.com/maps?q=Amwaj+Tech,+Amman&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
            
            <a href="https://maps.app.goo.gl/sigDeFr57aNF2ua69" target="_blank" rel="noopener noreferrer" class="btn-secondary directions-btn">
              Get Directions
            </a>
          </div>

        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import InternalHero from '@/components/InternalHero.vue'
import { ref } from 'vue'
import { MapPin, Phone, Mail, Printer, Smartphone } from 'lucide-vue-next'
import { api } from '@/services/api'

const form = ref({
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const submitForm = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  
  try {
    await api.create('contact_messages', {
      ...form.value,
      status: 'New'
    });
    
    // Email notification is handled by the backend

    alert('Thank you for your message. We will get back to you soon.')
    form.value = {
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  } catch (error) {
    console.error('Failed to submit form', error)
    alert('Sorry, there was an error submitting your message. Please try again later.')
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.contact-view {
  background-color: #F8FAFC;
  color: #0F172A;
}

.page-header {
  background-color: #0F3D91;
  padding: 6rem 0;
  text-align: center;
  color: #FFFFFF;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.header-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-title {
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: var(--font-bold, 700);
  font-family: var(--font-heading, 'Montserrat', sans-serif);
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
}

.contact-main-section {
  padding: 5rem 0 6rem;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.contact-layout-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: stretch;
}

.contact-card {
  background-color: #FFFFFF;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 10px 40px rgba(15, 23, 42, 0.06);
  border: 1px solid rgba(15, 23, 42, 0.05);
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #0F3D91;
  margin-bottom: 0.75rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

.card-desc {
  font-size: 1.05rem;
  color: #475569;
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

/* Form Styles */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex-grow: 1;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #0F172A;
}

.required {
  color: #e11d48;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.875rem 1.25rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background-color: #F8FAFC;
  font-size: 1rem;
  color: #0F172A;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #00C2FF;
  box-shadow: 0 0 0 4px rgba(0, 194, 255, 0.15);
  background-color: #FFFFFF;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #94a3b8;
}

.submit-btn {
  margin-top: 1rem;
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
}

/* Contact List Styles */
.contact-list {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  margin-bottom: 2.5rem;
  padding-left: 0.5rem;
}

.contact-group {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
}

.contact-group.mt-lg {
  margin-top: 0;
}

.group-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #F1F5F9;
  flex-shrink: 0;
}

.group-icon {
  width: 24px;
  height: 24px;
  color: #0F3D91;
  stroke-width: 2px;
}

.group-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-top: 0.25rem;
}

.content-row {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.content-row h4 {
  font-size: 0.85rem;
  font-weight: 700;
  color: #0d4a70;
  margin: 0;
  text-transform: capitalize;
  letter-spacing: 0.02em;
}

.content-row p, .content-row a {
  font-size: 1.05rem;
  font-weight: 500;
  color: #2b5c77;
  margin: 0;
  line-height: 1.4;
  text-decoration: none;
  transition: color 0.2s ease;
}

.content-row a:hover {
  color: #1b73b5;
}

/* Map Styles */
.map-wrapper {
  flex-grow: 1;
  min-height: 280px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;
}

.directions-btn {
  width: 100%;
  text-align: center;
}

/* Button Classes */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #0F3D91;
  color: #FFFFFF;
  font-weight: var(--font-bold, 600);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

.btn-primary:hover {
  background-color: #1a4fba;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(15, 61, 145, 0.2);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #0F3D91;
  border: 2px solid #0F3D91;
  font-weight: var(--font-bold, 600);
  padding: 0.875rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

.btn-secondary:hover {
  background-color: rgba(15, 61, 145, 0.05);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(15, 61, 145, 0.1);
}

/* Responsive */
@media (max-width: 1024px) {
  .contact-layout-grid {
    gap: 1.5rem;
  }
  
  .contact-card {
    padding: 2rem;
  }
}

@media (max-width: 900px) {
  .contact-layout-grid {
    grid-template-columns: 1fr;
  }
  
  .map-wrapper {
    min-height: 350px;
  }
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .contact-card {
    padding: 1.5rem;
  }
  
  .page-header {
    padding: 4rem 0;
  }
}
</style>
