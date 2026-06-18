<template>
  <!-- Navigation Header -->
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="nav-logo">
        <img src="../assets/logo.png" alt="Amwaj Tech Logo" class="nav-logo-img">
        <span class="logo-text">{{ t('nav.companyName') }}</span>
      </router-link>

      <!-- Desktop Nav Links -->
      <div class="nav-links desktop-only">
        <router-link to="/" class="nav-link-item">{{ t('nav.home') }}</router-link>
        <router-link to="/about" class="nav-link-item">{{ t('nav.about') }}</router-link>

        <!-- Services Dropdown -->
        <div class="nav-item-dropdown">
          <router-link to="/services" class="nav-link-item dropdown-trigger">
            {{ t('nav.services') }}
            <svg class="dropdown-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
          <div class="dropdown-menu">
            <router-link to="/services/network-infrastructure" class="dropdown-item">
              {{ t('services.items.network_infrastructure.title') }}
            </router-link>
            <router-link to="/services/network-security" class="dropdown-item">
              {{ t('services.items.network_security.title') }}
            </router-link>
            <router-link to="/services/data-center" class="dropdown-item">
              {{ t('services.items.data_center.title') }}
            </router-link>
            <router-link to="/services/cloud-services" class="dropdown-item">
              {{ t('services.items.cloud_services.title') }}
            </router-link>
            <router-link to="/services/software-solutions" class="dropdown-item">
              {{ t('services.items.software_solutions.title') }}
            </router-link>
            <router-link to="/services/technical-support" class="dropdown-item">
              {{ t('services.items.technical_support.title') }}
            </router-link>
          </div>
        </div>

        <!-- Industries Dropdown -->
        <div class="nav-item-dropdown">
          <router-link to="/industries" class="nav-link-item dropdown-trigger">
            {{ t('nav.industries') }}
            <svg class="dropdown-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
          <div class="dropdown-menu">
            <router-link to="/industries/banking" class="dropdown-item">
              {{ t('industries.sectors.banking.title') }}
            </router-link>
            <router-link to="/industries/government" class="dropdown-item">
              {{ t('industries.sectors.government.title') }}
            </router-link>
            <router-link to="/industries/healthcare" class="dropdown-item">
              {{ t('industries.sectors.healthcare.title') }}
            </router-link>
            <router-link to="/industries/education" class="dropdown-item">
              {{ t('industries.sectors.education.title') }}
            </router-link>
            <router-link to="/industries/enterprise" class="dropdown-item">
              {{ t('industries.sectors.enterprise.title') }}
            </router-link>
            <router-link to="/industries/industrial" class="dropdown-item">
              {{ t('industries.sectors.industrial.title') }}
            </router-link>
          </div>
        </div>

        <router-link to="/partners" class="nav-link-item">{{ t('nav.partners') }}</router-link>
        <router-link to="/clients" class="nav-link-item">{{ t('nav.clients') }}</router-link>
        <router-link to="/careers" class="nav-link-item">{{ t('nav.careers', 'Careers') }}</router-link>
      </div>

      <div class="nav-actions">
        <a href="https://support.amwaj-tech.com/#login" target="_blank" class="nav-outline-btn desktop-only">{{ t('nav.support', 'Support') }}</a>
        <router-link to="/request-consultation" class="nav-cta-btn desktop-only">{{ t('nav.requestConsultation') }}</router-link>
        
        <div class="lang-dropdown desktop-only">
          <button @click="toggleDropdown" class="lang-btn" aria-label="Toggle Language">
            <span class="lang-text">{{ currentLocale === 'en' ? 'EN' : 'AR' }}</span>
            <svg class="lang-chevron" :class="{ 'rotated': showDropdown }" width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div v-if="showDropdown" class="lang-options">
            <button @click="selectLanguage('en')" :class="{ active: currentLocale === 'en' }" class="lang-option">
              EN
            </button>
            <button @click="selectLanguage('ar')" :class="{ active: currentLocale === 'ar' }" class="lang-option">
              AR
            </button>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="Toggle menu">
          <span class="hamburger" :class="{ 'is-active': isMobileMenuOpen }">
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-overlay" :class="{ 'is-active': isMobileMenuOpen }" @click="closeMobileMenu"></div>

    <!-- Mobile Menu Panel -->
    <div class="mobile-menu-panel" :class="{ 'is-active': isMobileMenuOpen }">
      <div class="mobile-menu-header">
        <router-link to="/" class="nav-logo" @click="closeMobileMenu">
          <img src="../assets/logo.png" alt="Amwaj Tech Logo" class="nav-logo-img">
          <span class="logo-text">{{ t('nav.companyName') }}</span>
        </router-link>
        <button class="close-mobile-btn" @click="closeMobileMenu" aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="mobile-menu-body">
        <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">{{ t('nav.home') }}</router-link>
        <router-link to="/about" class="mobile-nav-link" @click="closeMobileMenu">{{ t('nav.about') }}</router-link>

        <!-- Services Accordion -->
        <div class="mobile-accordion">
          <button class="mobile-nav-link accordion-trigger" @click="toggleServices" :class="{ 'is-expanded': isServicesOpen }">
            {{ t('nav.services') }}
            <svg class="accordion-chevron" width="12" height="8" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="accordion-content" :style="{ maxHeight: isServicesOpen ? '500px' : '0px' }">
            <router-link to="/services/network-infrastructure" class="mobile-sub-link" @click="closeMobileMenu">
              {{ t('services.items.network_infrastructure.title') }}
            </router-link>
            <router-link to="/services/network-security" class="mobile-sub-link" @click="closeMobileMenu">
              {{ t('services.items.network_security.title') }}
            </router-link>
            <router-link to="/services/data-center" class="mobile-sub-link" @click="closeMobileMenu">
              {{ t('services.items.data_center.title') }}
            </router-link>
            <router-link to="/services/cloud-services" class="mobile-sub-link" @click="closeMobileMenu">
              {{ t('services.items.cloud_services.title') }}
            </router-link>
            <router-link to="/services/software-solutions" class="mobile-sub-link" @click="closeMobileMenu">
              {{ t('services.items.software_solutions.title') }}
            </router-link>
            <router-link to="/services/technical-support" class="mobile-sub-link" @click="closeMobileMenu">
              {{ t('services.items.technical_support.title') }}
            </router-link>
          </div>
        </div>

        <!-- Industries Accordion -->
        <div class="mobile-accordion">
          <button class="mobile-nav-link accordion-trigger" @click="toggleIndustries" :class="{ 'is-expanded': isIndustriesOpen }">
            {{ t('nav.industries') }}
            <svg class="accordion-chevron" width="12" height="8" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="accordion-content" :style="{ maxHeight: isIndustriesOpen ? '500px' : '0px' }">
            <router-link to="/industries/banking" class="mobile-sub-link" @click="closeMobileMenu">
              {{ t('industries.sectors.banking.title') }}
            </router-link>
            <router-link to="/industries/government" class="mobile-sub-link" @click="closeMobileMenu">
              {{ t('industries.sectors.government.title') }}
            </router-link>
            <router-link to="/industries/healthcare" class="mobile-sub-link" @click="closeMobileMenu">
              {{ t('industries.sectors.healthcare.title') }}
            </router-link>
            <router-link to="/industries/education" class="mobile-sub-link" @click="closeMobileMenu">
              {{ t('industries.sectors.education.title') }}
            </router-link>
            <router-link to="/industries/enterprise" class="mobile-sub-link" @click="closeMobileMenu">
              {{ t('industries.sectors.enterprise.title') }}
            </router-link>
            <router-link to="/industries/industrial" class="mobile-sub-link" @click="closeMobileMenu">
              {{ t('industries.sectors.industrial.title') }}
            </router-link>
          </div>
        </div>

        <router-link to="/partners" class="mobile-nav-link" @click="closeMobileMenu">{{ t('nav.partners') }}</router-link>
        <router-link to="/clients" class="mobile-nav-link" @click="closeMobileMenu">{{ t('nav.clients') }}</router-link>
        <router-link to="/careers" class="mobile-nav-link" @click="closeMobileMenu">{{ t('nav.careers', 'Careers') }}</router-link>
      </div>
      
      <div class="mobile-menu-footer">
        <a href="https://support.amwaj-tech.com/#login" target="_blank" class="mobile-outline-btn" @click="closeMobileMenu">{{ t('nav.support', 'Support') }}</a>
        <router-link to="/request-consultation" class="mobile-cta-btn" @click="closeMobileMenu">{{ t('nav.requestConsultation') }}</router-link>
        
        <div class="mobile-lang-selector">
          <button @click="selectLanguage('en')" class="mobile-lang-btn" :class="{ 'is-active': currentLocale === 'en' }">English</button>
          <button @click="selectLanguage('ar')" class="mobile-lang-btn" :class="{ 'is-active': currentLocale === 'ar' }">العربية</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { locale, t } = useI18n()
const route = useRoute()

const currentLocale = ref('en')
const showDropdown = ref(false)
const isMobileMenuOpen = ref(false)
const isServicesOpen = ref(false)
const isIndustriesOpen = ref(false)

const loadLanguageFromStorage = () => {
  const savedLang = localStorage.getItem('Amwaj-Tech-language')
  if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
    currentLocale.value = savedLang
    locale.value = savedLang
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = savedLang
  }
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const selectLanguage = (lang: string) => {
  currentLocale.value = lang
  locale.value = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = lang
  showDropdown.value = false
  
  localStorage.setItem('Amwaj-Tech-language', lang)
  
  // Close mobile menu if language changed from mobile
  if (isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  updateBodyScroll()
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  updateBodyScroll()
}

const toggleServices = () => {
  isServicesOpen.value = !isServicesOpen.value
}

const toggleIndustries = () => {
  isIndustriesOpen.value = !isIndustriesOpen.value
}

const updateBodyScroll = () => {
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

// Close mobile menu on route change
watch(route, () => {
  closeMobileMenu()
})

onMounted(() => {
  loadLanguageFromStorage()
})
</script>

<style scoped>
/* Navigation Styles */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-navbar);
  background: #ffffff;
  border-bottom: 1px solid #e8ecf1;
  padding: 0;
  transition: var(--transition-fast);
}

.nav-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  width: 100%;
  height: 68px;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  flex-shrink: 0;
}

.nav-logo-img {
  width: 42px;
  height: 42px;
  object-fit: contain;
}

.logo-text {
  color: var(--color-primary, #0A192F);
  font-weight: 700;
  font-size: 1.05rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
  letter-spacing: 0.3px;
  line-height: 1.2;
}

/* Navigation Links */
.nav-links {
  display: flex;
  gap: 1.75rem;
  align-items: center;
}

.nav-link-item {
  color: #334155;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  font-size: 0.9rem;
  text-transform: none;
  letter-spacing: 0;
  position: relative;
  padding: 1.4rem 0;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.nav-link-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2.5px;
  background-color: var(--color-primary, #0A192F);
  border-radius: 2px;
  transition: width 0.25s ease;
}

[dir="rtl"] .nav-link-item::after {
  left: auto;
  right: 50%;
  transform: translateX(50%);
}

.nav-link-item:hover {
  color: var(--color-primary, #0A192F);
}

.nav-link-item:hover::after {
  width: 60%;
}

.nav-link-item.router-link-active,
.router-link-exact-active.nav-link-item {
  color: var(--color-primary, #0A192F);
  font-weight: 600;
}

.nav-link-item.router-link-active::after,
.router-link-exact-active.nav-link-item::after {
  width: 60%;
}

/* Dropdown Chevron */
.dropdown-chevron {
  transition: transform 0.25s ease;
  flex-shrink: 0;
  margin-top: 1px;
}

/* Dropdowns */
.nav-item-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  border: 1px solid #e8ecf1;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  min-width: 260px;
  display: none;
  flex-direction: column;
  padding: 0.5rem 0;
  z-index: 1002;
  margin-top: 0;
}

[dir="rtl"] .dropdown-menu {
  left: auto;
  right: 0;
}

.nav-item-dropdown:hover .dropdown-menu {
  display: flex;
}

.nav-item-dropdown:hover .dropdown-chevron {
  transform: rotate(180deg);
}

.dropdown-item {
  color: #475569;
  text-decoration: none;
  padding: 0.65rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  text-align: left;
}

[dir="rtl"] .dropdown-item {
  text-align: right;
}

.dropdown-item:hover {
  background-color: #f1f5f9;
  color: var(--color-primary, #0A192F);
  padding-left: 1.5rem;
}

[dir="rtl"] .dropdown-item:hover {
  padding-left: 1.25rem;
  padding-right: 1.5rem;
}

/* Nav Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

/* CTA Button */
.nav-cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary, #0A192F);
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.55rem 1.35rem;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.25s ease;
  white-space: nowrap;
  letter-spacing: 0.2px;
  border: 2px solid transparent;
}

.nav-cta-btn:hover {
  background: var(--color-primary-light, #172A45);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(10, 25, 47, 0.2);
}

/* Outline Button */
.nav-outline-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--color-primary, #0A192F);
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.55rem 1.35rem;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.25s ease;
  white-space: nowrap;
  letter-spacing: 0.2px;
  border: 2px solid var(--color-primary, #0A192F);
}

.nav-outline-btn:hover {
  background: rgba(10, 25, 47, 0.05);
  transform: translateY(-1px);
}


/* Language Dropdown */
.lang-dropdown {
  position: relative;
  display: inline-block;
}

.lang-btn {
  background: transparent;
  border: 1.5px solid #d1d5db;
  color: #334155;
  padding: 0.45rem 0.85rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 600;
  font-size: 0.82rem;
}

.lang-btn:hover {
  border-color: var(--color-primary, #0A192F);
  color: var(--color-primary, #0A192F);
}

.lang-text {
  transition: all 0.2s ease;
}

.lang-chevron {
  transition: transform 0.25s ease;
  flex-shrink: 0;
}

.lang-chevron.rotated {
  transform: rotate(180deg);
}

.lang-options {
  position: absolute;
  top: 100%;
  right: 0;
  background: #ffffff;
  border: 1px solid #e8ecf1;
  border-radius: 8px;
  width: 100%;
  z-index: var(--z-dropdown);
  margin-top: 0.35rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.lang-option {
  background: none;
  border: none;
  color: #475569;
  padding: 0.5rem 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.82rem;
  font-weight: 600;
  width: 100%;
  text-align: center;
  display: block;
  box-sizing: border-box;
}

.lang-option:hover {
  background: #f1f5f9;
}

.lang-option.active {
  background: var(--color-primary, #0A192F);
  color: #ffffff;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1002;
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
}

.hamburger .line {
  display: block;
  height: 2px;
  width: 100%;
  background-color: var(--color-primary);
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Mobile Overlay and Panel */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.mobile-overlay.is-active {
  opacity: 1;
  pointer-events: auto;
}

.mobile-menu-panel {
  position: fixed;
  top: 0;
  right: -100%;
  width: 85%;
  max-width: 400px;
  height: 100vh;
  background-color: #ffffff;
  z-index: 1001;
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
}

[dir="rtl"] .mobile-menu-panel {
  right: auto;
  left: -100%;
  transition: left 0.3s ease;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.1);
}

.mobile-menu-panel.is-active {
  right: 0;
}

[dir="rtl"] .mobile-menu-panel.is-active {
  left: 0;
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e8ecf1;
}

.close-mobile-btn {
  background: none;
  border: none;
  color: var(--color-text-main);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.close-mobile-btn:hover {
  background-color: #f1f5f9;
}

.mobile-menu-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav-link {
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text-main);
  text-decoration: none;
  padding: 1rem 0;
  border-bottom: 1px solid #f1f5f9;
  transition: color 0.2s ease;
}

.mobile-nav-link.router-link-active,
.router-link-exact-active.mobile-nav-link {
  color: var(--color-accent);
}

/* Accordion */
.mobile-accordion {
  display: flex;
  flex-direction: column;
}

.accordion-trigger {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: inherit;
}

[dir="rtl"] .accordion-trigger {
  text-align: right;
}

.accordion-chevron {
  transition: transform 0.3s ease;
}

.accordion-trigger.is-expanded .accordion-chevron {
  transform: rotate(180deg);
}

.accordion-content {
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
}

.mobile-sub-link {
  display: block;
  font-size: 0.95rem;
  font-weight: 500;
  color: #475569;
  text-decoration: none;
  padding: 0.75rem 1rem 0.75rem 1.5rem;
  border-left: 2px solid transparent;
  transition: all 0.2s ease;
}

[dir="rtl"] .mobile-sub-link {
  padding: 0.75rem 1.5rem 0.75rem 1rem;
  border-left: none;
  border-right: 2px solid transparent;
}

.mobile-sub-link:hover,
.mobile-sub-link.router-link-active {
  color: var(--color-primary);
  background-color: #f8fafc;
  border-left-color: var(--color-accent);
}

[dir="rtl"] .mobile-sub-link:hover,
[dir="rtl"] .mobile-sub-link.router-link-active {
  border-left-color: transparent;
  border-right-color: var(--color-accent);
}

.mobile-menu-footer {
  padding: 1.5rem;
  border-top: 1px solid #e8ecf1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mobile-cta-btn {
  display: block;
  text-align: center;
  background-color: var(--color-accent);
  color: #1a1a1a;
  font-weight: 700;
  padding: 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 1rem;
}

.mobile-outline-btn {
  display: block;
  text-align: center;
  background-color: transparent;
  color: var(--color-primary, #0A192F);
  border: 2px solid var(--color-primary, #0A192F);
  font-weight: 700;
  padding: 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 1rem;
}

.mobile-lang-selector {
  display: flex;
  gap: 1rem;
}

.mobile-lang-btn {
  flex: 1;
  padding: 0.75rem;
  background-color: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-lang-btn.is-active {
  background-color: var(--color-primary);
  color: #ffffff;
  border-color: var(--color-primary);
}

/* Responsive Design for Header */
@media (max-width: 1023px) {
  .desktop-only {
    display: none !important;
  }
  
  .mobile-menu-btn {
    display: block;
  }
  
  .nav-container {
    padding: 0 1rem;
  }
}
</style>