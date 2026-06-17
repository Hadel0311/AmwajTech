<template>
  <section class="trusted-partners-section bg-light">
    <div class="marquee-container">
      <div class="marquee-track">
        <!-- We render the list twice to create a seamless infinite loop -->
        <div class="marquee-group" aria-hidden="true">
          <router-link 
            v-for="partner in partnersList" 
            :key="`g1-${partner.id}`"
            :to="`/partners/${partner.id}`" 
            class="partner-logo-item"
            @mouseenter="activeTooltip = `g1-${partner.id}`"
            @mouseleave="activeTooltip = null"
          >
            <img :src="getLogoUrl(partner.logo)" :alt="partner.name" class="partner-img" />
            <!-- Tooltip -->
            <Transition name="tooltip-fade">
              <div v-if="activeTooltip === `g1-${partner.id}`" class="partner-tooltip">
                <span class="tooltip-name">{{ partner.name }}</span>
                <span v-if="partner.services && partner.services.length" class="tooltip-category">
                  {{ formatCategory(partner.services[0]) }}
                </span>
              </div>
            </Transition>
          </router-link>
        </div>
        <div class="marquee-group" aria-hidden="true">
          <router-link 
            v-for="partner in partnersList" 
            :key="`g2-${partner.id}`"
            :to="`/partners/${partner.id}`" 
            class="partner-logo-item"
            @mouseenter="activeTooltip = `g2-${partner.id}`"
            @mouseleave="activeTooltip = null"
          >
            <img :src="getLogoUrl(partner.logo)" :alt="partner.name" class="partner-img" />
            <!-- Tooltip -->
            <Transition name="tooltip-fade">
              <div v-if="activeTooltip === `g2-${partner.id}`" class="partner-tooltip">
                <span class="tooltip-name">{{ partner.name }}</span>
                <span v-if="partner.services && partner.services.length" class="tooltip-category">
                  {{ formatCategory(partner.services[0]) }}
                </span>
              </div>
            </Transition>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { partnersList } from '@/data/partners.js'

const activeTooltip = ref(null)

const logoImages = import.meta.glob('../assets/images/Partners/*', { eager: true, import: 'default' })

const getLogoUrl = (logoName) => {
  return logoImages[`../assets/images/Partners/${logoName}`] || ''
}

const formatCategory = (serviceKey) => {
  const mapping = {
    'network-infrastructure': 'Infrastructure Solutions',
    'network-security': 'Cybersecurity Solutions',
    'data-center': 'Data Center Solutions',
    'cloud-services': 'Cloud & Security Solutions',
    'software-solutions': 'Software Solutions',
    'technical-support': 'Technical Support'
  }
  return mapping[serviceKey] || 'Technology Partner'
}
</script>

<style scoped>
.trusted-partners-section {
  overflow: hidden;
  border-top: 1px solid rgba(0,0,0,0.05);
  padding: 3rem 0; /* Adding top and bottom padding instead of section-padding class */
}

.section-header {
  margin-bottom: 3rem;
}

.marquee-container {
  width: 100vw;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  /* Add subtle gradient fades on edges for smoother visual */
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: scrollLeft 40s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

[dir="rtl"] .marquee-track {
  animation: scrollRight 40s linear infinite;
}

[dir="rtl"] .marquee-track:hover {
  animation-play-state: paused;
}

.marquee-group {
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-width: 100%;
  flex-shrink: 0;
  gap: 4rem;
  padding: 0 2rem;
}

.partner-logo-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 80px;
  cursor: pointer;
  perspective: 1000px;
}

.partner-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: grayscale(100%) opacity(0.7);
  transition: all 0.4s ease;
}

.partner-logo-item:hover .partner-img {
  filter: grayscale(0%) opacity(1);
  transform: scale(1.15) translateZ(20px);
}

/* Tooltip Styles */
.partner-tooltip {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-primary);
  color: var(--color-text-inverse);
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius);
  text-align: center;
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
  box-shadow: var(--box-shadow-hover);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

/* Small triangle pointer for tooltip */
.partner-tooltip::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px 6px 0;
  border-style: solid;
  border-color: var(--color-primary) transparent transparent transparent;
}

.tooltip-name {
  font-weight: 700;
  font-size: 0.95rem;
}

.tooltip-category {
  font-size: 0.75rem;
  opacity: 0.85;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Tooltip Animation */
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 10px);
}

/* Keyframes for infinite scroll */
@keyframes scrollLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes scrollRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(50%);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .partner-logo-item {
    width: 120px;
    height: 60px;
  }
  
  .marquee-group {
    gap: 2rem;
  }
  
  .partner-tooltip {
    top: -50px;
    padding: 0.5rem 0.75rem;
  }
  
  .tooltip-name {
    font-size: 0.85rem;
  }
  
  .tooltip-category {
    font-size: 0.65rem;
  }
}
</style>
