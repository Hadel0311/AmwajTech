<template>
  <main class="service-detail-view" v-if="isValidService">
    <!-- Hero Section -->
    <section class="service-hero">
      <div class="hero-pattern"></div>
      <div class="hero-content container">
        <span class="category-badge">{{ t('services.labels.category') }}</span>
        <h1 class="service-title">{{ t(`services.items.${serviceKey}.title`) }}</h1>
        <p class="hero-value-prop" v-if="heroValueProp">{{ heroValueProp }}</p>
      </div>
    </section>

    <!-- Visual Introduction -->
    <section class="visual-intro-section" v-if="visualIntro">
      <div class="container two-column-layout">
        <div class="visual-column">
          <div class="image-wrapper">
            <img :src="currentImage" :alt="visualIntro.title" class="enterprise-image" />
            <div class="image-overlay"></div>
          </div>
        </div>
        <div class="content-column">
          <h2 class="section-heading">{{ visualIntro.title }}</h2>
          <p class="intro-desc">{{ visualIntro.description }}</p>
          
          <div class="objectives-list" v-if="visualIntro.objectives && visualIntro.objectives.length">
            <div class="objective-item" v-for="(obj, idx) in visualIntro.objectives" :key="idx">
              <CheckCircle2 class="obj-icon" />
              <span>{{ obj }}</span>
            </div>
          </div>
          
          <div class="business-value-box">
            <TrendingUp class="value-icon" />
            <p>{{ visualIntro.businessValue }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Challenges & Solutions -->
    <section class="challenges-section" v-if="challenges && challenges.length">
      <div class="container">
        <div class="section-header center">
          <h2 class="section-heading">Business Challenges & Solutions</h2>
          <p class="section-subheading">How Amwaj Tech resolves complex enterprise pain points.</p>
        </div>
        
        <div class="challenges-grid">
          <div class="challenge-card" v-for="(item, idx) in challenges" :key="idx">
            <div class="challenge-part">
              <AlertTriangle class="card-icon danger" />
              <h3 class="card-title">Challenge</h3>
              <p>{{ item.challenge }}</p>
            </div>
            <div class="card-divider">
              <ArrowRight class="divider-icon" />
            </div>
            <div class="solution-part">
              <ShieldCheck class="card-icon success" />
              <h3 class="card-title">Solution</h3>
              <p>{{ item.solution }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How We Deliver (Timeline) -->
    <section class="delivery-section" v-if="workflow && workflow.length">
      <div class="container">
        <div class="section-header center">
          <h2 class="section-heading">How We Deliver</h2>
          <p class="section-subheading">Our proven enterprise implementation methodology.</p>
        </div>
        
        <div class="timeline-container">
          <div class="timeline-line"></div>
          <div class="timeline-item" v-for="(step, idx) in workflow" :key="idx">
            <div class="timeline-marker">
              <div class="marker-inner"></div>
            </div>
            <div class="timeline-content">
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-desc">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Services -->
    <section class="related-services-section" v-if="relatedServicesData && relatedServicesData.length">
      <div class="container">
        <h2 class="section-heading">Related Services</h2>
        <div class="related-grid">
          <router-link 
            v-for="(svc, idx) in relatedServicesData" 
            :key="idx" 
            :to="`/services/${svc.id}`"
            class="related-card"
          >
            <div class="related-icon-wrap">
              <component :is="svc.icon" class="rel-icon" />
            </div>
            <h3 class="rel-title">{{ svc.title }}</h3>
            <p class="rel-desc">{{ svc.description }}</p>
            <div class="rel-link">
              <span>Learn More</span>
              <ArrowRight class="sm-arrow" />
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Premium Call To Action -->
    <section class="premium-cta-section">
      <div class="container cta-container">
        <div class="cta-content">
          <h2>Ready to Discuss Your Project?</h2>
          <p>Our specialists can help design, secure, and optimize your technology infrastructure.</p>
        </div>
        <div class="cta-actions">
          <router-link to="/contact" class="btn btn-primary cta-btn">Request Consultation</router-link>
          <router-link to="/contact" class="btn btn-outline cta-btn">Contact Our Experts</router-link>
        </div>
      </div>
    </section>
  </main>
  
  <main class="service-detail-view invalid-view" v-else>
    <div class="error-container">
      <h2>{{ t('services.labels.notFound') }}</h2>
      <p>{{ t('services.labels.notFoundDesc') }}</p>
      <router-link to="/services" class="btn btn-primary">{{ t('services.labels.back') }}</router-link>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { 
  CheckCircle2, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight,
  Network, 
  Shield, 
  Server, 
  Cloud, 
  Code, 
  PhoneCall 
} from 'lucide-vue-next'

const route = useRoute()
const { t, tm } = useI18n()

// Service key mapping
const serviceMapping = {
  'network-infrastructure': 'network_infrastructure',
  'network-security': 'network_security',
  'data-center': 'data_center',
  'cloud-services': 'cloud_services',
  'software-solutions': 'software_solutions',
  'technical-support': 'technical_support'
}

// Icon mapping for related services
const iconMapping = {
  'network_infrastructure': Network,
  'network_security': Shield,
  'data_center': Server,
  'cloud_services': Cloud,
  'software_solutions': Code,
  'technical_support': PhoneCall
}

// Enterprise Photography Mapping (Unsplash)
const serviceImages = {
  'network_infrastructure': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200',
  'network_security': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
  'data_center': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
  'cloud_services': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
  'software_solutions': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200',
  'technical_support': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200'
}

const isValidService = computed(() => {
  return typeof route.params.id === 'string' && route.params.id in serviceMapping
})

const serviceKey = computed(() => {
  return serviceMapping[route.params.id]
})

const currentImage = computed(() => {
  return serviceImages[serviceKey.value] || serviceImages['network_infrastructure']
})

// Dynamic Locale Data Getters
const heroValueProp = computed(() => tm(`services.details.${serviceKey.value}.heroValueProp`))
const visualIntro = computed(() => tm(`services.details.${serviceKey.value}.visualIntro`))
const challenges = computed(() => tm(`services.details.${serviceKey.value}.challenges`))
const workflow = computed(() => tm(`services.details.${serviceKey.value}.workflow`))

const relatedServicesData = computed(() => {
  const keys = tm(`services.details.${serviceKey.value}.relatedServices`)
  if (!Array.isArray(keys)) return []
  
  return keys.map(key => {
    // Reverse lookup ID from key
    const id = Object.keys(serviceMapping).find(k => serviceMapping[k] === key)
    return {
      id,
      key,
      title: t(`services.items.${key}.title`),
      description: t(`services.items.${key}.description`),
      icon: iconMapping[key] || Network
    }
  })
})
</script>

<style scoped>
/* -------------------------------
   HERO SECTION
------------------------------- */
.service-hero {
  position: relative;
  background-color: var(--color-primary-dark);
  padding: 8rem 0 6rem;
  color: var(--color-text-inverse);
  overflow: hidden;
  border-bottom: 4px solid var(--color-accent);
}

.hero-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(255, 255, 255, 0.05) 2px, transparent 2px);
  background-size: 30px 30px;
  opacity: 0.5;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
}

.category-badge {
  display: inline-block;
  background: rgba(244, 178, 58, 0.15);
  color: var(--color-accent);
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: var(--font-bold);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(244, 178, 58, 0.3);
}

.service-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: var(--font-bold);
  font-family: var(--font-heading, 'Montserrat', sans-serif);
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

[dir="rtl"] .service-title {
  font-family: 'Tajawal', sans-serif;
}

.hero-value-prop {
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  max-width: 750px;
}

/* -------------------------------
   VISUAL INTRODUCTION
------------------------------- */
.visual-intro-section {
  padding: 6rem 0;
  background-color: var(--color-bg-primary);
}

.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.image-wrapper {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(7, 21, 45, 0.1);
}

.enterprise-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  display: block;
}

.image-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to right, rgba(7, 21, 45, 0.2), transparent);
}

.section-heading {
  font-size: 2.25rem;
  font-weight: var(--font-bold);
  color: var(--color-primary-dark);
  margin-bottom: 1.5rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

[dir="rtl"] .section-heading {
  font-family: 'Tajawal', sans-serif;
}

.section-header.center {
  text-align: center;
  margin-bottom: 4rem;
}

.section-subheading {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  margin-top: 0.5rem;
}

.intro-desc {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.objectives-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.objective-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.obj-icon {
  color: var(--color-accent);
  flex-shrink: 0;
  width: 24px;
  height: 24px;
}

.objective-item span {
  font-size: 1.05rem;
  color: var(--color-text-primary);
  line-height: 1.5;
  font-weight: var(--font-semibold);
}

.business-value-box {
  background-color: var(--color-bg-secondary);
  border-left: 4px solid var(--color-secondary);
  padding: 1.5rem;
  border-radius: 0 8px 8px 0;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

[dir="rtl"] .business-value-box {
  border-left: none;
  border-right: 4px solid var(--color-secondary);
  border-radius: 8px 0 0 8px;
}

.value-icon {
  color: var(--color-secondary);
  width: 28px;
  height: 28px;
  flex-shrink: 0;
}

.business-value-box p {
  margin: 0;
  font-size: 1rem;
  color: var(--color-text-dark);
  line-height: 1.6;
  font-style: italic;
}

/* -------------------------------
   CHALLENGES & SOLUTIONS
------------------------------- */
.challenges-section {
  padding: 6rem 0;
  background-color: var(--color-bg-secondary);
}

.challenges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.challenge-card {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-bg-alt);
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.challenge-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(7, 21, 45, 0.08);
}

.challenge-part, .solution-part {
  flex: 1;
}

.card-title {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0.5rem 0;
  color: var(--color-text-secondary);
}

.card-icon {
  width: 28px;
  height: 28px;
}

.card-icon.danger {
  color: #ef4444;
}

.card-icon.success {
  color: #10b981;
}

.challenge-part p, .solution-part p {
  font-size: 1.05rem;
  color: var(--color-text-primary);
  font-weight: var(--font-semibold);
  line-height: 1.5;
}

.card-divider {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0;
  color: var(--color-bg-alt);
}

.divider-icon {
  color: var(--color-secondary);
  width: 24px;
  height: 24px;
}

[dir="rtl"] .divider-icon {
  transform: rotate(180deg);
}

/* -------------------------------
   HOW WE DELIVER (TIMELINE)
------------------------------- */
.delivery-section {
  padding: 6rem 0;
  background-color: var(--color-bg-primary);
}

.timeline-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 24px;
  width: 2px;
  background-color: var(--color-bg-alt);
}

[dir="rtl"] .timeline-line {
  left: auto;
  right: 24px;
}

.timeline-item {
  position: relative;
  padding-left: 80px;
  margin-bottom: 3rem;
}

[dir="rtl"] .timeline-item {
  padding-left: 0;
  padding-right: 80px;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: 13px;
  top: 0;
  width: 24px;
  height: 24px;
  background-color: var(--color-bg-primary);
  border: 2px solid var(--color-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

[dir="rtl"] .timeline-marker {
  left: auto;
  right: 13px;
}

.marker-inner {
  width: 10px;
  height: 10px;
  background-color: var(--color-secondary);
  border-radius: 50%;
  transition: background-color var(--transition-fast);
}

.timeline-item:hover .marker-inner {
  background-color: var(--color-accent);
}

.timeline-item:hover .timeline-marker {
  border-color: var(--color-accent);
}

.timeline-content {
  background-color: var(--color-bg-secondary);
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid var(--color-bg-alt);
  transition: box-shadow var(--transition-fast);
}

.timeline-item:hover .timeline-content {
  box-shadow: 0 10px 20px rgba(7, 21, 45, 0.05);
}

.step-title {
  font-size: 1.25rem;
  font-weight: var(--font-bold);
  color: var(--color-primary-dark);
  margin-bottom: 0.5rem;
}

.step-desc {
  font-size: 1rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* -------------------------------
   RELATED SERVICES
------------------------------- */
.related-services-section {
  padding: 6rem 0;
  background-color: var(--color-bg-secondary);
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.related-card {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-bg-alt);
  border-radius: 8px;
  padding: 2rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  transition: all var(--transition-fast);
}

.related-card:hover {
  transform: translateY(-5px);
  border-color: rgba(13, 34, 71, 0.2);
  box-shadow: 0 12px 24px rgba(7, 21, 45, 0.08);
}

.related-icon-wrap {
  width: 50px;
  height: 50px;
  background-color: var(--color-bg-secondary);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--color-secondary);
  transition: all var(--transition-fast);
}

.related-card:hover .related-icon-wrap {
  background-color: rgba(244, 178, 58, 0.1);
  color: var(--color-accent);
}

.rel-icon {
  width: 24px;
  height: 24px;
}

.rel-title {
  font-size: 1.2rem;
  font-weight: var(--font-bold);
  color: var(--color-text-dark);
  margin-bottom: 0.75rem;
}

.rel-desc {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
}

.rel-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: var(--font-semibold);
  color: var(--color-secondary);
  transition: color var(--transition-fast);
}

.related-card:hover .rel-link {
  color: var(--color-accent);
}

.sm-arrow {
  width: 16px;
  height: 16px;
  transition: transform var(--transition-fast);
}

[dir="rtl"] .sm-arrow {
  transform: rotate(180deg);
}

.related-card:hover .sm-arrow {
  transform: translateX(4px);
}

[dir="rtl"] .related-card:hover .sm-arrow {
  transform: rotate(180deg) translateX(4px);
}

/* -------------------------------
   PREMIUM CTA
------------------------------- */
.premium-cta-section {
  background-color: var(--color-primary-dark);
  color: var(--color-text-inverse);
  padding: 5rem 0;
  border-top: 4px solid var(--color-accent);
}

.cta-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.cta-content h2 {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: var(--font-bold);
  margin-bottom: 1rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

[dir="rtl"] .cta-content h2 {
  font-family: 'Tajawal', sans-serif;
}

.cta-content p {
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-inline: auto;
}

.cta-actions {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  display: inline-block;
  padding: 1rem 2rem;
  font-weight: var(--font-bold);
  border-radius: 4px;
  text-decoration: none;
  transition: all var(--transition-fast);
  font-size: 1rem;
}

.btn-primary {
  background-color: var(--color-accent);
  color: var(--color-primary-dark);
  border: 2px solid var(--color-accent);
}

.btn-primary:hover {
  background-color: transparent;
  color: var(--color-accent);
}

.btn-outline {
  background-color: transparent;
  color: var(--color-text-inverse);
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.btn-outline:hover {
  border-color: var(--color-text-inverse);
  background-color: rgba(255, 255, 255, 0.05);
}

/* -------------------------------
   ERROR STATE
------------------------------- */
.invalid-view {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: var(--color-bg-secondary);
}

.error-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

/* -------------------------------
   RESPONSIVENESS
------------------------------- */
@media (max-width: 1023px) {
  .two-column-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .image-wrapper {
    height: 400px;
  }
  
  .enterprise-image {
    height: 100%;
  }
}

@media (max-width: 767px) {
  .service-hero {
    padding: 6rem 0 4rem;
  }
  
  .challenges-grid {
    grid-template-columns: 1fr;
  }
  
  .image-wrapper {
    height: 300px;
  }
  
  .cta-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .cta-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
