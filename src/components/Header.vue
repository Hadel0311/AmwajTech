<template>
  <!-- Navigation Header -->
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="nav-logo">
        <img src="../assets/logo.svg" alt="Amwaj Tech Logo" class="nav-logo-img">
        <span class="logo-text">{{ t('nav.companyName') }}</span>
      </router-link>

      <div class="nav-links">
        <router-link to="/" class="nav-link-item">{{ t('nav.home') }}</router-link>
        <router-link to="/about" class="nav-link-item">{{ t('nav.about') }}</router-link>

        <!-- Services Dropdown -->
        <div class="nav-item-dropdown">
          <router-link to="/services" class="nav-link-item dropdown-trigger">
            {{ t('nav.services') }}
            <span class="dropdown-arrow-mini">▼</span>
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
            <span class="dropdown-arrow-mini">▼</span>
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

        <router-link to="/projects" class="nav-link-item">{{ t('nav.projects') }}</router-link>
        <router-link to="/contact" class="nav-link-item">{{ t('nav.contact') }}</router-link>
      </div>

      <div class="nav-actions">
        <div class="lang-dropdown">
          <button @click="toggleDropdown" class="lang-btn hover-lift" aria-label="Toggle Language">
            <span class="lang-text">{{ currentLocale === 'en' ? 'EN' : 'AR' }}</span>
            <span class="dropdown-arrow" :class="{ 'rotated': showDropdown }">▼</span>
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
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()
const currentLocale = ref('en')
const showDropdown = ref(false)

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
}

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
  background: var(--color-bg-primary);
  box-shadow: var(--shadow-header);
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--color-bg-alt);
  transition: var(--transition-fast);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  width: 100%;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.nav-logo-img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.logo-text {
  color: var(--color-text-dark);
  font-weight: var(--font-bold);
  font-size: var(--text-lg);
  font-family: var(--font-heading, 'Montserrat', sans-serif);
  letter-spacing: 0.5px;
}

.nav-links {
  display: flex;
  gap: 2.25rem;
  align-items: center;
}

.nav-link-item {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: var(--font-medium);
  transition: all var(--transition-fast);
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  padding: 0.5rem 0;
}

.nav-link-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-accent);
  transition: width var(--transition-fast);
}

[dir="rtl"] .nav-link-item::after {
  left: auto;
  right: 0;
}

.nav-link-item:hover,
.router-link-active {
  color: var(--color-text-dark);
}

.nav-link-item:hover::after,
.router-link-active::after {
  width: 100%;
}

.dropdown-arrow-mini {
  font-size: 0.65rem;
  margin-left: 0.25rem;
  transition: transform var(--transition-fast);
  display: inline-block;
}

[dir="rtl"] .dropdown-arrow-mini {
  margin-left: 0;
  margin-right: 0.25rem;
}

/* Dropdowns */
.nav-item-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-bg-alt);
  box-shadow: var(--shadow-card);
  border-radius: 4px;
  min-width: 280px;
  display: none;
  flex-direction: column;
  padding: 0.75rem 0;
  z-index: 1002;
  margin-top: 2px;
}

[dir="rtl"] .dropdown-menu {
  left: auto;
  right: 0;
}

.nav-item-dropdown:hover .dropdown-menu {
  display: flex;
}

.nav-item-dropdown:hover .dropdown-arrow-mini {
  transform: rotate(180deg);
}

.dropdown-item {
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: var(--font-medium);
  transition: all var(--transition-fast);
  text-align: left;
}

[dir="rtl"] .dropdown-item {
  text-align: right;
}

.dropdown-item:hover {
  background-color: var(--color-bg-secondary);
  color: var(--color-accent);
  padding-left: 1.75rem;
}

[dir="rtl"] .dropdown-item:hover {
  padding-left: 1.5rem;
  padding-right: 1.75rem;
}

.nav-actions {
  padding-inline: 0.5rem;
}

/* Language Dropdown */
.lang-dropdown {
  position: relative;
  display: inline-block;
}

.lang-btn {
  background: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-weight: var(--font-semibold);
}

.lang-btn:hover {
  background: var(--color-primary);
  color: var(--color-text-inverse);
}

.lang-text {
  transition: all var(--transition-fast);
}

.dropdown-arrow {
  transition: transform var(--transition-fast);
  font-size: 0.8em;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.lang-options {
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--color-bg-primary);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--radius-sm);
  width: 100%;
  z-index: var(--z-dropdown);
  margin-top: var(--spacing-xs);
  box-shadow: var(--shadow-card);
}

.lang-option {
  background: none;
  border: none;
  color: var(--color-text-primary);
  padding: var(--spacing-xs) var(--spacing-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  width: 100%;
  text-align: center;
  display: block;
  box-sizing: border-box;
}

.lang-option:hover {
  background: var(--color-bg-secondary);
}

.lang-option.active {
  background: var(--color-accent);
  color: var(--color-text-inverse);
}

.lang-option:first-child {
  border-radius: 6px 6px 0 0;
}

.lang-option:last-child {
  border-radius: 0 0 6px 6px;
}

/* Responsive Design for Header */
@media (max-width: 992px) {
  .nav-links {
    display: none; /* In production, you would add a mobile hamburger menu here */
  }
}
</style>