<template>
  <footer class="footer-section">
    <div class="footer-container">
      <div class="footer-grid">
        <!-- Col 1: Corporate Profile -->
        <div class="footer-col brand-col">
          <div class="footer-logo">
            <img src="../assets/logo.png" alt="Amwaj Tech Logo" class="footer-logo-img">
            <span class="logo-text">{{ t('nav.companyName') }}</span>
          </div>
          <p class="footer-description">
            {{ t('footer.description') }}
          </p>
          <div class="footer-socials">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"/>
                <path d="M6 9H2V21H6V9Z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Col 2: Services Links -->
        <div class="footer-col links-col">
          <h3 class="col-title">{{ t('nav.services') }}</h3>
          <ul class="col-links">
            <li><a href="#services" @click="scrollToSection('services')">{{ t('services.items.network_security.title') }}</a></li>
            <li><a href="#services" @click="scrollToSection('services')">{{ t('services.items.network_infrastructure.title') }}</a></li>
            <li><a href="#services" @click="scrollToSection('services')">{{ t('services.items.data_center.title') }}</a></li>
            <li><a href="#services" @click="scrollToSection('services')">{{ t('services.items.cloud_services.title') }}</a></li>
          </ul>
        </div>

        <!-- Col 3: Regional Hubs -->
        <div class="footer-col contacts-col">
          <h3 class="col-title">{{ t('contact.info.locations.title') }}</h3>
          <ul class="col-contacts">
            <li>
              <span class="contact-label">{{ t('contact.info.locations.jordan') }}</span>
              <span class="contact-value">{{ t('contact.info.phone') }}</span>
            </li>
            <li>
              <span class="contact-label">{{ t('contact.info.locations.uae') }}</span>
              <span class="contact-value">info@amwaj-tech.com</span>
            </li>
          </ul>
        </div>

        <!-- Col 4: Certifications & Ecosystem -->
        <div class="footer-col partners-col">
          <h3 class="col-title">{{ t('trust.certificationsLabel') }}</h3>
          <div class="partner-badges">
            <span class="badge">CISCO PARTNER</span>
            <span class="badge">FORTINET AUTHORIZED</span>
            <span class="badge">PALO ALTO SECURITY</span>
            <span class="badge">ISO 27001 COMPLIANT</span>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">{{ t('footer.copyright') }}</p>
        <div class="legal-links">
          <a href="#">{{ t('footer.links.privacy') }}</a>
          <span class="divider">|</span>
          <a href="#">{{ t('footer.links.terms') }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
.footer-section {
  background-color: var(--color-primary-dark);
  padding: 5rem 0 2.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  color: #94a3b8;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

.brand-col {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.footer-logo-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.logo-text {
  color: var(--color-text-inverse);
  font-weight: var(--font-bold);
  font-size: 1.25rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

.footer-description {
  font-size: 0.9rem;
  line-height: 1.6;
  max-width: 320px;
}

.footer-socials {
  display: flex;
  gap: 0.75rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.03);
  color: #94a3b8;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all var(--transition-fast);
}

.social-icon:hover {
  background-color: var(--color-accent);
  color: var(--color-text-inverse);
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.col-title {
  color: var(--color-text-inverse);
  font-size: 0.95rem;
  font-weight: var(--font-bold);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1.5rem;
}

.col-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.col-links a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color var(--transition-fast);
}

.col-links a:hover {
  color: var(--color-accent);
}

.col-contacts {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-label {
  display: block;
  font-size: 0.8rem;
  font-weight: var(--font-semibold);
  color: var(--color-text-inverse);
  text-transform: uppercase;
}

.contact-value {
  font-size: 0.9rem;
}

.partner-badges {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.badge {
  display: inline-block;
  padding: 0.4rem 0.75rem;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: var(--font-bold);
  color: #e2e8f0;
  letter-spacing: 0.5px;
  width: fit-content;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
}

.legal-links {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.legal-links a {
  color: #64748b;
  text-decoration: none;
  transition: color var(--transition-fast);
}

.legal-links a:hover {
  color: var(--color-accent);
}

.divider {
  color: rgba(255, 255, 255, 0.08);
}

/* Responsiveness */
@media (max-width: 992px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@media (max-width: 576px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>
