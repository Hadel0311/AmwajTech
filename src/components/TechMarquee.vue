<template>
  <div class="marquee-section bg-dark">
    <div class="marquee-container">
      <div class="marquee-content">
        <!-- Double the items for seamless infinite scroll -->
        <div class="tech-item" v-for="n in 2" :key="n">
          <span class="tech-logo">Vue.js</span>
          <span class="dot">•</span>
          <span class="tech-logo">Node.js</span>
          <span class="dot">•</span>
          <span class="tech-logo">AWS</span>
          <span class="dot">•</span>
          <span class="tech-logo">PostgreSQL</span>
          <span class="dot">•</span>
          <span class="tech-logo">Docker</span>
          <span class="dot">•</span>
          <span class="tech-logo">Tailwind CSS</span>
          <span class="dot">•</span>
          <span class="tech-logo">TypeScript</span>
          <span class="dot">•</span>
          <span class="tech-logo">Python</span>
          <span class="dot">•</span>
          <span class="tech-logo">TensorFlow</span>
          <span class="dot">•</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-section {
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  position: relative;
  background: var(--color-bg-dark, #222222);
}

/* Fading edges */
.marquee-section::before,
.marquee-section::after {
  content: '';
  position: absolute;
  top: 0;
  width: 100px;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.marquee-section::before {
  left: 0;
  background: linear-gradient(to right, var(--color-bg-dark, #222222), transparent);
}

.marquee-section::after {
  right: 0;
  background: linear-gradient(to left, var(--color-bg-dark, #222222), transparent);
}

.marquee-container {
  width: 100%;
  overflow: hidden;
}

.marquee-content {
  display: flex;
  width: max-content;
  animation: scroll 30s linear infinite;
}

.marquee-content:hover {
  animation-play-state: paused;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-right: 20px;
}

.tech-logo {
  font-family: var(--font-heading, 'Montserrat', sans-serif);
  font-weight: 700;
  font-size: 1.25rem;
  color: #aaaaaa;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: color 0.3s ease;
  cursor: default;
}

.tech-logo:hover {
  color: var(--color-accent, #f9b233);
}

.dot {
  color: var(--color-primary-light, #28406e);
  font-size: 1.5rem;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@media (max-width: 768px) {
  .tech-logo {
    font-size: 1rem;
  }
}
</style>
