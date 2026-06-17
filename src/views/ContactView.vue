<template>
  <main class="contact-view">
    <section class="page-header">
      <div class="header-container">
        <h1 class="page-title">Get In Touch</h1>
        <p class="page-subtitle">We're here to help. Reach out to our team using the contact information below or visit our office.</p>
      </div>
    </section>

    <section class="contact-info-section">
      <div class="section-container">
        <div class="info-cards-grid">
          
          <!-- Visit Us Card -->
          <div class="info-card">
            <div class="icon-wrapper">
              <MapPin class="card-icon" />
            </div>
            <h3 class="card-title">Visit Us</h3>
            <p class="card-desc">Amman, Mecca St.<br/>Jordan</p>
          </div>

          <!-- Call Us Card -->
          <div class="info-card">
            <div class="icon-wrapper">
              <Phone class="card-icon" />
            </div>
            <h3 class="card-title">Call Us</h3>
            <p class="card-desc">+962 6 580 0000</p>
          </div>

          <!-- Email Us Card -->
          <div class="info-card">
            <div class="icon-wrapper">
              <Mail class="card-icon" />
            </div>
            <h3 class="card-title">Email Us</h3>
            <p class="card-desc">info@amwaj-tech.com</p>
          </div>

        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="map-section">
      <div class="section-container">
        <div class="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13539.544186065545!2d35.8587121!3d31.963283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca17ee0db34db%3A0xc6eb9bfb0cb334b5!2sMecca%20St.%2C%20Amman%2C%20Jordan!5e0!3m2!1sen!2sus!4v1718640000000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </section>

    <!-- Hours & Social & CTA Section -->
    <section class="details-section">
      <div class="section-container">
        <div class="details-grid">
          
          <!-- Business Hours -->
          <div class="details-card">
            <div class="icon-wrapper">
              <Clock class="card-icon" />
            </div>
            <h3 class="card-title">Business Hours</h3>
            <div class="hours-list">
              <div class="hour-item">
                <span class="day">Sunday – Thursday</span>
                <span class="time">08:00 AM – 05:00 PM</span>
              </div>
              <div class="hour-item">
                <span class="day">Friday – Saturday</span>
                <span class="time closed">Closed</span>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div class="details-card">
            <div class="icon-wrapper">
              <Share2 class="card-icon" />
            </div>
            <h3 class="card-title">Connect With Us</h3>
            <div class="social-links-large">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-btn">
                <Linkedin class="social-icon" />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="social-btn">
                <Github class="social-icon" />
                <span>GitHub</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-btn">
                <Instagram class="social-icon" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

        </div>

        <div class="cta-bottom">
          <h2 class="cta-title">Need a Consultation Instead?</h2>
          <router-link to="/request-consultation" class="btn-primary">
            Request Consultation
          </router-link>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup>
import { MapPin, Phone, Mail, Clock, Share2, Linkedin, Github, Instagram } from 'lucide-vue-next'
</script>

<style scoped>
.contact-view {
  background-color: var(--color-bg-secondary);
}

.page-header {
  background-color: var(--color-primary-dark);
  padding: 6rem 0;
  text-align: center;
  color: var(--color-text-inverse);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.header-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-title {
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: var(--font-bold);
  font-family: var(--font-heading, 'Montserrat', sans-serif);
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #94a3b8;
  line-height: 1.6;
}

.contact-info-section {
  padding: 5rem 0 3rem;
  background-color: var(--color-bg-primary);
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.info-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.info-card {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-bg-alt);
  border-radius: 8px;
  padding: 2.5rem 2rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.05);
}

.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: rgba(14, 165, 233, 0.1);
  margin-bottom: 1.5rem;
}

.card-icon {
  width: 28px;
  height: 28px;
  color: var(--color-accent);
}

.card-title {
  font-size: 1.25rem;
  font-weight: var(--font-bold);
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

.card-desc {
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.map-section {
  padding: 2rem 0;
  background-color: var(--color-bg-primary);
}

.map-container {
  height: 450px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--color-bg-alt);
}

.details-section {
  padding: 4rem 0 6rem;
  background-color: var(--color-bg-primary);
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 5rem;
}

.details-card {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-bg-alt);
  border-radius: 8px;
  padding: 2.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
}

.hours-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hour-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-bg-alt);
}

.hour-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.day {
  font-weight: 600;
  color: var(--color-text-primary);
}

.time {
  color: var(--color-text-secondary);
}

.time.closed {
  color: #ef4444;
  font-weight: 600;
}

.social-links-large {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background-color: var(--color-bg-secondary);
  border-radius: 6px;
  text-decoration: none;
  color: var(--color-text-primary);
  font-weight: 600;
  transition: all 0.2s ease;
}

.social-btn:hover {
  background-color: var(--color-accent);
  color: #ffffff;
}

.social-icon {
  width: 20px;
  height: 20px;
}

.cta-bottom {
  text-align: center;
  padding: 4rem;
  background-color: var(--color-bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--color-bg-alt);
}

.cta-title {
  font-size: 2rem;
  font-weight: var(--font-bold);
  color: var(--color-primary);
  margin-bottom: 2rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  color: #ffffff;
  font-weight: var(--font-bold);
  font-size: 1.05rem;
  padding: 1rem 2.5rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

.btn-primary:hover {
  background-color: var(--color-primary-light);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(10, 25, 47, 0.15);
}

@media (max-width: 992px) {
  .info-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .info-cards-grid, .details-grid {
    grid-template-columns: 1fr;
  }
  
  .map-container {
    height: 350px;
  }
  
  .cta-bottom {
    padding: 3rem 1.5rem;
  }
}
</style>
