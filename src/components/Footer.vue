<template>
  <footer class="footer-enterprise">
    <div class="footer-container">
      <div class="footer-grid">
        
        <!-- Brand & About -->
        <div class="footer-col brand-col">
          <div class="brand">
            <img src="../assets/logo.png" alt="Amwaj Tech" class="logo-img" />
            <span class="logo-text">{{ t('nav.companyName') }}</span>
          </div>
          <p class="description">{{ t('footer.description') }}</p>
          <div class="social-links">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin class="icon" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github class="icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram class="icon" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-col links-col">
          <h4 class="col-title">{{ t('nav.companyName') }}</h4>
          <ul class="nav-links">
            <li><router-link to="/">{{ t('nav.home', 'Home') }}</router-link></li>
            <li><router-link to="/about">{{ t('nav.about', 'About Us') }}</router-link></li>
            <li><router-link to="/services">{{ t('nav.services') }}</router-link></li>
            <li><router-link to="/projects">{{ t('nav.projects') }}</router-link></li>
            <li><router-link to="/clients">{{ t('nav.clients') }}</router-link></li>
            <li><router-link to="/partners">{{ t('nav.partners') }}</router-link></li>
            <li><router-link to="/contact">{{ t('nav.contact') }}</router-link></li>
          </ul>
        </div>

        <!-- Regional Hubs & Contact -->
        <div class="footer-col contact-col">
          <h4 class="col-title">{{ t('contact.info.locations.title') }}</h4>
          <div class="contact-item">
            <MapPin class="icon-small" />
            <div class="contact-details">
              <span class="label">{{ t('contact.info.locations.jordan') }}</span>
              <span class="value">{{ t('contact.info.phone') }}</span>
            </div>
          </div>
          <div class="contact-item">
            <MapPin class="icon-small" />
            <div class="contact-details">
              <span class="label">{{ t('contact.info.locations.uae') }}</span>
              <span class="value">info@amwaj-tech.com</span>
            </div>
          </div>
          <router-link to="/request-consultation" class="cta-link">
            {{ t('nav.requestConsultation', 'Request Consultation') }}
            <ArrowRight class="icon-small rtl-flip" />
          </router-link>
        </div>

        <!-- Certifications -->
        <div class="footer-col certs-col">
          <h4 class="col-title">{{ t('trust.certificationsLabel') }}</h4>
          <div class="badges-grid">
            <div class="badge">{{ t('footer.badges.cisco', 'Cisco Partner') }}</div>
            <div class="badge">{{ t('footer.badges.fortinet', 'Fortinet') }}</div>
            <div class="badge">{{ t('footer.badges.paloalto', 'Palo Alto') }}</div>
            <div class="badge">{{ t('footer.badges.iso', 'ISO 27001') }}</div>
          </div>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <p class="copyright">{{ t('footer.copyright') }}</p>
        <div class="legal-links">
          <router-link to="/privacy-policy">{{ t('footer.links.privacy', 'Privacy Policy') }}</router-link>
          <span class="separator">|</span>
          <router-link to="/terms-of-service">{{ t('footer.links.terms', 'Terms of Service') }}</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { Linkedin, Github, Instagram, MapPin, ArrowRight } from 'lucide-vue-next'

const { t } = useI18n()
</script>

<style scoped>
/* Highly Professional Enterprise Theme */
.footer-enterprise {
  background-color: var(--color-primary-dark, #0a0f1c);
  color: #94a3b8;
  font-family: var(--font-primary, 'Inter', system-ui, sans-serif);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 5rem 0 0 0;
  position: relative;
  overflow: hidden;
}

/* Subtle tech grid background to match enterprise style */
.footer-enterprise::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center;
  pointer-events: none;
  opacity: 0.5;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 10;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1.5fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

/* Column Base */
.col-title {
  color: var(--color-text-inverse, #ffffff);
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

/* Brand Section */
.brand-col {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-inverse, #ffffff);
  font-family: var(--font-heading, 'Montserrat', sans-serif);
  letter-spacing: -0.02em;
}

.description {
  font-size: 0.95rem;
  line-height: 1.6;
  max-width: 320px;
  color: #94a3b8;
}

.social-links {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #94a3b8;
  transition: all 0.2s ease-in-out;
}

.social-links a:hover {
  background-color: var(--color-accent, #0ea5e9);
  color: #ffffff;
  border-color: var(--color-accent, #0ea5e9);
  transform: translateY(-2px);
}

.social-links .icon {
  width: 18px;
  height: 18px;
}

/* Navigation Links */
.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.nav-links a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease;
  display: inline-flex;
  align-items: center;
}

.nav-links a:hover {
  color: var(--color-accent, #0ea5e9);
}

/* Contact / Regional Hubs */
.contact-col {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.contact-item .icon-small {
  width: 18px;
  height: 18px;
  color: var(--color-accent, #0ea5e9);
  margin-top: 0.25rem;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-details .label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-inverse, #ffffff);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.contact-details .value {
  font-size: 0.95rem;
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-accent, #0ea5e9);
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  margin-top: 0.5rem;
  transition: opacity 0.2s ease;
}

.cta-link:hover {
  opacity: 0.8;
}

.rtl-flip {
  transition: transform 0.2s ease;
}

[dir="rtl"] .rtl-flip {
  transform: rotate(180deg);
}

/* Certifications */
.certs-col {
  display: flex;
  flex-direction: column;
}

.badges-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.85rem;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #e2e8f0;
  letter-spacing: 0.02em;
  transition: border-color 0.2s ease;
}

.badge:hover {
  border-color: rgba(255, 255, 255, 0.3);
}

/* Bottom Bar */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  font-size: 0.85rem;
  color: #64748b;
}

.legal-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.legal-links a {
  color: #64748b;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s ease;
}

.legal-links a:hover {
  color: var(--color-text-inverse, #ffffff);
}

.separator {
  color: rgba(255, 255, 255, 0.1);
}

/* RTL Support */
[dir="rtl"] .footer-enterprise::before {
  background-position: right center;
}

/* Responsiveness */
@media (max-width: 1023px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 3rem 2rem;
  }
}

@media (max-width: 767px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
    justify-content: center;
  }
}
</style>
