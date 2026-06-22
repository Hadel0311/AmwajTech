<template>
  <section id="services" class="services-section">
    <div class="services-container">
      <div class="services-header">
        <h2 class="section-title">{{ t('services.title') }}</h2>
        <p class="section-subtitle">{{ t('services.subtitle') }}</p>
      </div>

      <!-- Desktop Graph View -->
      <div class="graph-view">
        <div class="graph-wrapper">
          <svg class="lines-svg" viewBox="0 0 2400 800" preserveAspectRatio="xMidYMid meet">
            <!-- Static visible lines -->
            <path 
              v-for="(path, i) in lines" 
              :key="'static-'+i" 
              :d="path" 
              class="graph-line" 
            />
            <!-- Animated electrical wave lines on hover -->
            <path 
              v-for="(path, i) in lines" 
              :key="'active-'+i" 
              :d="path" 
              class="graph-line-active" 
              :class="{ 'is-active': hoveredIndex === i }"
            />
          </svg>

          <!-- Left Nodes -->
          <div 
            v-for="(service, index) in leftServices" 
            :key="'left-'+index"
            class="node-wrapper left-node"
            :style="{ top: getTopPosition(index) }"
            @mouseenter="hoveredIndex = index"
            @mouseleave="hoveredIndex = null"
          >
            <router-link :to="`/services/${service.id}`" class="node-pill">
              <span class="node-text">{{ t(`services.items.${service.key}.title`) }}</span>
              <div class="node-icon-circle">
                <component :is="service.icon" class="node-icon" />
              </div>
            </router-link>
          </div>

          <!-- Center Node -->
          <div class="node-wrapper center-node-wrapper">
            <div class="center-pulse"></div>
            <div class="center-circle">
              <span class="center-text">Services</span>
            </div>
          </div>

          <!-- Right Nodes -->
          <div 
            v-for="(service, index) in rightServices" 
            :key="'right-'+index"
            class="node-wrapper right-node"
            :style="{ top: getTopPosition(index) }"
            @mouseenter="hoveredIndex = index + 3"
            @mouseleave="hoveredIndex = null"
          >
            <router-link :to="`/services/${service.id}`" class="node-pill">
              <div class="node-icon-circle">
                <component :is="service.icon" class="node-icon" />
              </div>
              <span class="node-text">{{ t(`services.items.${service.key}.title`) }}</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Mobile Grid View -->
      <div class="services-grid mobile-view">
        <router-link 
          v-for="(service, index) in servicesList" 
          :key="index"
          :to="`/services/${service.id}`"
          class="service-card-link"
        >
          <div class="service-card">
            <div class="service-icon-wrapper">
              <component :is="service.icon" class="service-icon" />
            </div>
            <h3 class="service-title">{{ t(`services.items.${service.key}.title`) }}</h3>
            <p class="service-description">{{ t(`services.items.${service.key}.description`) }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  Network, 
  Shield, 
  Server, 
  Cloud, 
  Code, 
  PhoneCall 
} from 'lucide-vue-next'

const { t } = useI18n()

const servicesList = [
  { id: 'network-infrastructure', key: 'network_infrastructure', icon: Network },
  { id: 'network-security', key: 'network_security', icon: Shield },
  { id: 'data-center', key: 'data_center', icon: Server },
  { id: 'cloud-services', key: 'cloud_services', icon: Cloud },
  { id: 'software-solutions', key: 'software_solutions', icon: Code },
  { id: 'technical-support', key: 'technical_support', icon: PhoneCall }
]

const leftServices = servicesList.slice(0, 3)
const rightServices = servicesList.slice(3, 6)
const hoveredIndex = ref(null)

const getTopPosition = (index) => {
  if (index === 0) return '12.5%'
  if (index === 1) return '50%'
  return '87.5%'
}

const lines = [
  'M 1200 400 C 600 400, 600 100, 100 100',
  'M 1200 400 L 100 400',
  'M 1200 400 C 600 400, 600 700, 100 700',
  'M 1200 400 C 1800 400, 1800 100, 2300 100',
  'M 1200 400 L 2300 400',
  'M 1200 400 C 1800 400, 1800 700, 2300 700'
]
</script>

<style scoped>
.services-section {
  background-color: var(--color-bg-secondary);
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

.services-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 4rem;
}

.services-header {
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

/* Graph View Styles */
.graph-view {
  display: block;
  width: 100%;
}

.graph-wrapper {
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  aspect-ratio: 24 / 8;
}

.lines-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.graph-line {
  fill: none;
  stroke: var(--color-primary);
  stroke-width: 4;
  opacity: 0.25;
}

.graph-line-active {
  fill: none;
  stroke: var(--color-accent);
  stroke-width: 4;
  stroke-dasharray: 200 3000;
  stroke-dashoffset: -1500;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.graph-line-active.is-active {
  opacity: 1;
  animation: single-wave 1.5s linear infinite;
}

@keyframes single-wave {
  from { stroke-dashoffset: -1500; }
  to { stroke-dashoffset: 0; }
}

.node-wrapper {
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.left-node { left: 4.16%; }
.right-node { left: 95.83%; }
.center-node-wrapper { left: 50%; top: 50%; z-index: 5; }

.node-pill {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 24px;
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-bg-alt);
  border-radius: 50px;
  color: var(--color-text-dark);
  text-decoration: none;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.node-pill:hover {
  border-color: var(--color-primary);
  box-shadow: 0 0 20px rgba(13, 148, 136, 0.2);
  transform: scale(1.05);
}

.node-icon-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-bg-alt);
  transition: all 0.3s ease;
}

.node-pill:hover .node-icon-circle {
  background-color: rgba(13, 148, 136, 0.1);
  border-color: var(--color-primary);
}

.node-icon {
  width: 24px;
  height: 24px;
  color: var(--color-accent);
  transition: color 0.3s;
}

.node-pill:hover .node-icon {
  color: var(--color-accent);
}

.node-text {
  font-size: 1.1rem;
  font-weight: 600;
  transition: color 0.3s;
}

.node-pill:hover .node-text {
  color: var(--color-primary);
}

/* Center Node Styles */
.center-circle {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, var(--color-secondary) 0%, var(--color-primary) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
  font-weight: 800;
  font-size: 1.8rem;
  box-shadow: 0 0 40px rgba(13, 148, 136, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 2;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.center-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: var(--color-primary);
  z-index: 1;
  animation: pulse 2.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0; }
}

/* Mobile Grid Styles */
.mobile-view {
  display: none;
}

.services-grid {
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.service-card-link {
  text-decoration: none;
  color: inherit;
}

.service-card {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-bg-alt);
  border-radius: 8px;
  padding: 2rem 1.5rem;
  transition: all var(--transition-fast);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
  border-color: rgba(13, 148, 136, 0.2);
}

.service-icon-wrapper {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-bg-alt);
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all var(--transition-fast);
}

.service-card:hover .service-icon-wrapper {
  background-color: rgba(13, 148, 136, 0.1);
  border-color: rgba(13, 148, 136, 0.2);
}

.service-icon {
  width: 24px;
  height: 24px;
  color: var(--color-accent);
  stroke-width: 1.75px;
  transition: color var(--transition-fast);
}

.service-card:hover .service-icon {
  color: var(--color-accent);
}

.service-title {
  font-size: 1.15rem;
  font-weight: var(--font-bold);
  color: var(--color-text-dark);
  margin-bottom: 0.75rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
  transition: color var(--transition-fast);
}

.service-card:hover .service-title {
  color: var(--color-accent);
}

[dir="rtl"] .service-title {
  font-family: 'Tajawal', sans-serif;
}

.service-description {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* Responsiveness */
@media (max-width: 900px) {
  .graph-view {
    display: none;
  }
  .mobile-view {
    display: grid;
  }
}

@media (max-width: 767px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
  .services-section {
    padding: 4.5rem 0;
  }
}
</style>
