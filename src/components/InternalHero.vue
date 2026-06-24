<template>
  <!-- Vite HMR Force Reload -->
  <section class="valantic-hero" :class="`theme-${theme}`">
    <!-- Solid Background on the left -->
    <div class="hero-bg"></div>

    <!-- Right side slanted image -->
    <div class="hero-visual">
      <div class="visual-reveal">
        <div class="image-wrapper">
          <img :src="image" :alt="title" class="hero-image" />
          <div class="image-overlay"></div>
        </div>
      </div>
    </div>

    <!-- Content area -->
    <div class="hero-container">
      <div class="hero-content">
        <!-- Optional Breadcrumbs -->
        <nav v-if="breadcrumbs && breadcrumbs.length" class="hero-breadcrumbs">
          <ol>
            <li v-for="(crumb, idx) in breadcrumbs" :key="idx" class="reveal-wrapper">
              <div class="reveal-text delay-1">
                <router-link v-if="crumb.link" :to="crumb.link">{{ crumb.label }}</router-link>
                <span v-else>{{ crumb.label }}</span>
                <span class="separator" v-if="idx < breadcrumbs.length - 1">/</span>
              </div>
            </li>
          </ol>
        </nav>
        
        <div class="hero-text-content">
          <div class="reveal-wrapper" v-if="category">
            <span class="category-label reveal-text delay-2">{{ category }}</span>
          </div>
          
          <div class="title-wrapper reveal-wrapper">
            <h1 class="hero-title reveal-text delay-3">{{ title }}</h1>
          </div>
          
          <div class="reveal-wrapper desc-wrapper" v-if="description">
            <p class="hero-description reveal-text delay-4">{{ description }}</p>
          </div>
          
          <div class="reveal-wrapper actions-wrapper">
            <div class="reveal-text delay-5">
              <slot name="actions"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  category: {
    type: String,
    default: ''
  },
  theme: {
    type: String,
    default: 'navy',
    validator: (v) => ['navy', 'teal', 'blue', 'slate'].includes(v)
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    required: true
  },
  breadcrumbs: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
/* Base Setup */
.valantic-hero {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 68px);
  display: flex;
  align-items: center;
  background-color: #07152D;
  overflow: hidden;
}

/* Background Color Layer base */
.hero-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #203c75;
  z-index: 1;
}
.valantic-hero { background-color: #203c75; }

/* Right Side Slanted Visual */
.hero-visual {
  position: absolute;
  top: 0;
  right: 0;
  width: 55%;
  height: 100%;
  z-index: 2;
}

.visual-reveal {
  width: 100%;
  height: 100%;
  clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
  animation: slideReveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards;
  transform-origin: right center;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: imageZoom 3.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  transform-origin: center center;
}

.image-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(135deg, rgba(7, 21, 45, 0.5) 0%, rgba(13, 34, 71, 0.1) 100%);
  z-index: 2;
}

/* Content Area */
.hero-container {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
}

.hero-content {
  width: 45%;
  max-width: 580px;
  padding: 5rem 0;
  margin-right: auto;
}

/* Reveal Wrappers for Typography */
.reveal-wrapper {
  overflow: hidden;
}

.title-wrapper {
  margin-bottom: 1.5rem;
  padding-bottom: 0.2rem;
}

.desc-wrapper {
  margin-bottom: 0.5rem;
  padding-bottom: 0.2rem;
}

.reveal-text {
  display: block;
  transform: translateY(110%);
  opacity: 0;
  animation: textReveal 1s cubic-bezier(0.77, 0, 0.175, 1) forwards;
}

.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }
.delay-3 { animation-delay: 0.5s; }
.delay-4 { animation-delay: 0.65s; }
.delay-5 { animation-delay: 0.8s; }

/* Breadcrumbs */
.hero-breadcrumbs {
  margin-bottom: 2rem;
}

.hero-breadcrumbs ol {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.hero-breadcrumbs a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
}

.hero-breadcrumbs a:hover {
  color: var(--color-accent, #F4B23A);
}

.hero-breadcrumbs .separator {
  color: rgba(255, 255, 255, 0.3);
}

/* Typography Styles */
.category-label {
  display: inline-block;
  color: var(--color-accent, #F4B23A);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  position: relative;
}

.category-label::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 40px;
  height: 2px;
  background-color: var(--color-accent, #F4B23A);
  transition: width 0.3s ease;
}

.hero-title {
  font-size: clamp(3.2rem, 5vw, 4.8rem);
  font-weight: 800;
  color: #ffffff;
  line-height: 1.05;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

.hero-description {
  font-size: clamp(1.15rem, 2vw, 1.3rem);
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  max-width: 100%;
}

.actions-wrapper {
  margin-top: 2.5rem;
  padding-bottom: 0.5rem;
}

/* Keyframes */
@keyframes slideReveal {
  0% { clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%); }
  100% { clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%); }
}

@keyframes slideRevealRTL {
  0% { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
  100% { clip-path: polygon(0 0, 85% 0, 100% 100%, 0 100%); }
}

@keyframes imageZoom {
  0% { transform: scale(1.15); }
  100% { transform: scale(1); }
}

@keyframes textReveal {
  0% {
    transform: translateY(110%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* RTL Support */
[dir="rtl"] .hero-title {
  font-family: 'Tajawal', sans-serif;
}
[dir="rtl"] .hero-visual {
  right: auto;
  left: 0;
}
[dir="rtl"] .visual-reveal {
  animation-name: slideRevealRTL;
}
[dir="rtl"] .hero-content {
  margin-left: auto;
  margin-right: 0;
}
[dir="rtl"] .category-label::after {
  left: auto;
  right: 0;
}

/* Mobile Animations */
@keyframes slideRevealMobile {
  0% { clip-path: polygon(0 0, 100% 0, 100% 0, 0 0); }
  100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 85%); }
}

@keyframes slideRevealMobileRTL {
  0% { clip-path: polygon(0 0, 100% 0, 100% 0, 0 0); }
  100% { clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%); }
}

/* Responsiveness */
@media (max-width: 1024px) {
  .hero-content { width: 50%; max-width: 100%; }
  .hero-visual { width: 55%; }
  .visual-reveal {
    clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
  }
  @keyframes slideReveal {
    0% { clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%); }
    100% { clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%); }
  }
}

@media (max-width: 768px) {
  .valantic-hero {
    flex-direction: column-reverse;
    justify-content: flex-end;
    min-height: auto;
  }
  
  .hero-visual {
    position: relative;
    width: 100%;
    height: 350px;
  }
  
  .visual-reveal {
    animation-name: slideRevealMobile;
  }
  
  [dir="rtl"] .visual-reveal {
    animation-name: slideRevealMobileRTL;
  }
  
  .hero-content {
    width: 100%;
    padding: 3rem 0 2rem;
  }
  
  .hero-description {
    max-width: 100%;
  }
}
</style>
