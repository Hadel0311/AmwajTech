<template>
  <section class="overview-section">
    <div class="overview-container">
      <div :class="['overview-grid', `overview-grid--${variant}`]">
        <router-link
          v-for="(item, index) in items"
          :key="item.to || index"
          :to="item.to"
          class="overview-card-link"
        >
          <div class="overview-card">
            <div class="overview-icon-wrapper">
              <component :is="item.icon" class="overview-icon" />
            </div>
            <h2 class="overview-card-title">{{ item.title }}</h2>
            <p class="overview-card-desc">{{ item.desc }}</p>
            <div class="overview-card-action">
              <span>{{ item.action }}</span>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="overview-arrow-icon">
                <path d="M4.16669 10H15.8334M15.8334 10L10.8334 5M15.8334 10L10.8334 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  /**
   * Cards to render. Each item: { to, icon (component), title, desc, action }
   */
  items: {
    type: Array,
    default: () => []
  },
  /**
   * Visual variant. `service` matches the Services page card,
   * `sector` matches the Industries page card.
   */
  variant: {
    type: String,
    default: 'service',
    validator: (v) => ['service', 'sector'].includes(v)
  }
})
</script>

<style scoped>
/* Shared layout */
.overview-section {
  background-color: var(--color-bg-secondary);
  padding: 6.5rem 0;
}

.overview-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.overview-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.overview-card {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-bg-alt);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all var(--transition-fast);
}

.overview-card:hover {
  transform: translateY(-4px);
  border-color: rgba(13, 148, 136, 0.2);
}

.overview-icon-wrapper {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-bg-alt);
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.overview-card:hover .overview-icon-wrapper {
  background-color: rgba(13, 148, 136, 0.1);
  border-color: rgba(13, 148, 136, 0.2);
}

.overview-icon {
  transition: color var(--transition-fast);
}

.overview-card:hover .overview-icon {
  color: var(--color-accent);
}

.overview-card-title {
  font-size: 1.3rem;
  font-weight: var(--font-bold);
  color: var(--color-text-dark);
  margin-bottom: 1rem;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

[dir="rtl"] .overview-card-title {
  font-family: 'Tajawal', sans-serif;
}

.overview-card-desc {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
  flex: 1;
}

.overview-card-action {
  font-size: 0.9rem;
  font-weight: var(--font-semibold);
  color: var(--color-secondary);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: color var(--transition-fast);
}

.overview-card:hover .overview-card-action {
  color: var(--color-accent);
}

.overview-arrow-icon {
  transition: transform var(--transition-fast);
}

[dir="rtl"] .overview-arrow-icon {
  transform: rotate(180deg);
}

.overview-card:hover .overview-arrow-icon {
  transform: translateX(4px);
}

[dir="rtl"] .overview-card:hover .overview-arrow-icon {
  transform: rotate(180deg) translateX(4px);
}

/* ---- Service variant ---- */
.overview-grid--service .overview-card {
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.overview-grid--service .overview-card:hover {
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
}

.overview-grid--service .overview-icon-wrapper {
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.overview-grid--service .overview-icon {
  width: 28px !important;
  height: 28px !important;
  color: var(--color-primary);
  stroke-width: 2px;
}

.overview-grid--service .overview-card-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 3.2rem;
}

.overview-grid--service .overview-card-desc {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 6rem;
}

/* ---- Sector variant ---- */
.overview-grid--sector .overview-card {
  border-radius: 4px;
  padding: 3rem 2rem;
}

.overview-grid--sector .overview-card:hover {
  box-shadow: var(--shadow-card);
}

.overview-grid--sector .overview-icon-wrapper {
  border-radius: 4px;
  margin-bottom: 2rem;
}

.overview-grid--sector .overview-icon {
  width: 26px;
  height: 26px;
  color: var(--color-secondary);
  stroke-width: 1.75px;
}

/* Responsiveness */
@media (max-width: 1023px) {
  .overview-grid--service {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .overview-grid--service {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 992px) {
  .overview-grid--sector {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .overview-grid--sector {
    grid-template-columns: 1fr;
  }
}
</style>
