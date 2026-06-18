<template>
  <main class="contact-view">
    <section class="page-header">
      <div class="header-container">
        <h1 class="page-title">Contact Us</h1>
        <p class="page-subtitle">Have a question, need assistance, or want to learn more about our solutions? Our team is ready to help.</p>
      </div>
    </section>

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
              
              <button type="submit" class="btn-primary submit-btn">
                Send Message
              </button>
            </form>
          </div>

          <!-- Right Card: Visit Us -->
          <div class="contact-card location-card">
            <h2 class="card-title">Visit Us</h2>
            <p class="card-desc">Our office is located in the heart of Amman. Visit us or contact us using the information below.</p>
            
            <div class="info-grid">
              <div class="info-item">
                <div class="info-icon-wrapper">
                  <MapPin class="info-icon" />
                </div>
                <div class="info-content">
                  <h4>Location</h4>
                  <p>Amman-Jordan-gardens st – alzaytona building (53)</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon-wrapper">
                  <Phone class="info-icon" />
                </div>
                <div class="info-content">
                  <h4>Phone</h4>
                  <p>06-5545514</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon-wrapper">
                  <Printer class="info-icon" />
                </div>
                <div class="info-content">
                  <h4>Fax</h4>
                  <p>06-5511937</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon-wrapper">
                  <Mail class="info-icon" />
                </div>
                <div class="info-content">
                  <h4>Email</h4>
                  <p><a href="mailto:info@amwaj-tech.com">info@amwaj-tech.com</a></p>
                </div>
              </div>
            </div>

            <div class="map-wrapper">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.281146313437!2d35.87532391515949!3d31.979603081220037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca10000000000%3A0x0!2sGardens%20St.%2C%20Amman%2C%20Jordan!5e0!3m2!1sen!2sus!4v1718640000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
            
            <a href="https://maps.google.com/?q=Amman+Jordan+gardens+st" target="_blank" rel="noopener noreferrer" class="btn-secondary directions-btn">
              Get Directions
            </a>
          </div>

        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { MapPin, Phone, Mail, Printer } from 'lucide-vue-next'

const form = ref({
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const submitForm = () => {
  console.log('Form submitted:', form.value)
  alert('Thank you for your message. We will get back to you soon.')
  form.value = {
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
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

/* Info Grid Styles */
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  background-color: #F8FAFC;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.03);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.info-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.04);
  background-color: #FFFFFF;
  border-color: rgba(0, 194, 255, 0.2);
}

.info-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: rgba(15, 61, 145, 0.05);
  flex-shrink: 0;
}

.info-icon {
  width: 20px;
  height: 20px;
  color: #0F3D91;
}

.info-content h4 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-content p {
  font-size: 1rem;
  font-weight: 500;
  color: #0F172A;
  margin: 0;
  line-height: 1.4;
}

.info-content a {
  color: #0F3D91;
  text-decoration: none;
  transition: color 0.2s;
}

.info-content a:hover {
  color: #00C2FF;
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
  
  .info-grid {
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
