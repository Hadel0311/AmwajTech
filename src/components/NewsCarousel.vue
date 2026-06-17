<template>
  <section class="news-section section-padding bg-alt">
    <div class="container">
      <div class="section-header align-left">
        <div class="latest-news-title">
          <span class="title-line"></span>
          <h2 class="section-title">{{ t('news.latest', 'LATEST NEWS') }}</h2>
        </div>
      </div>

      <div class="carousel-wrapper">
        <button class="nav-btn prev-btn" @click="scrollPrev" aria-label="Previous announcements">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>

        <div class="carousel-track" ref="carouselTrack">
          <div 
            v-for="item in newsList" 
            :key="item.id" 
            class="news-card"
          >
            <div class="card-image-wrapper">
              <img :src="item.image" :alt="item.title" class="card-image" loading="lazy" />
              <div class="card-date-bubble">{{ formatDate(item.date) }}</div>
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ item.title }}</h3>
              <button class="read-more-btn" @click="openModal(item)">
                <span class="icon-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </span>
                {{ t('common.readMore', 'Read more') }}
              </button>
            </div>
          </div>
        </div>

        <button class="nav-btn next-btn" @click="scrollNext" aria-label="Next announcements">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="selectedItem" class="news-modal-overlay" @click.self="closeModal">
          <div class="news-modal-content">
            <button class="close-modal-btn" @click="closeModal" aria-label="Close modal">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div class="modal-image-wrapper">
              <img :src="selectedItem.image" :alt="selectedItem.title" class="modal-image" />
              <span class="modal-category-badge">{{ selectedItem.category }}</span>
            </div>
            <div class="modal-body">
              <div class="modal-date">{{ formatDate(selectedItem.date) }}</div>
              <h2 class="modal-title">{{ selectedItem.title }}</h2>
              <div class="modal-text">
                {{ selectedItem.content }}
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { newsList } from '@/data/news.js'

const { t } = useI18n()
const carouselTrack = ref(null)
const selectedItem = ref(null)

const scrollPrev = () => {
  if (carouselTrack.value) {
    const cardWidth = carouselTrack.value.querySelector('.news-card').offsetWidth
    const gap = parseInt(window.getComputedStyle(carouselTrack.value).gap) || 0
    carouselTrack.value.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' })
  }
}

const scrollNext = () => {
  if (carouselTrack.value) {
    const cardWidth = carouselTrack.value.querySelector('.news-card').offsetWidth
    const gap = parseInt(window.getComputedStyle(carouselTrack.value).gap) || 0
    carouselTrack.value.scrollBy({ left: cardWidth + gap, behavior: 'smooth' })
  }
}

const openModal = (item) => {
  selectedItem.value = item
  document.body.style.overflow = 'hidden' // prevent body scrolling
}

const closeModal = () => {
  selectedItem.value = null
  document.body.style.overflow = ''
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = date.toLocaleString('en-US', { month: 'long' }).toUpperCase()
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}
</script>

<style scoped>
.news-section {
  position: relative;
  /* Removed overflow: hidden to prevent clipping arrows on medium screens */
}

.section-header.align-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  margin-bottom: 2rem;
  padding: 0 1rem;
}

.latest-news-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.title-line {
  display: inline-block;
  width: 40px;
  height: 2px;
  background-color: var(--color-primary, #0A192F);
}

.latest-news-title .section-title {
  font-size: 1.2rem;
  color: var(--color-primary, #0A192F);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 0;
}

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.nav-btn {
  background: var(--color-bg-light);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-primary);
  transition: var(--transition);
  box-shadow: var(--box-shadow);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  /* Adjust based on the actual bleed */
  margin-top: -1rem; /* Offset for the track's padding-bottom */
}

.prev-btn {
  left: -64px;
}

.next-btn {
  right: -64px;
}

[dir="rtl"] .prev-btn {
  left: auto;
  right: -64px;
  transform: translateY(-50%) rotate(180deg);
}

[dir="rtl"] .next-btn {
  right: auto;
  left: -64px;
  transform: translateY(-50%) rotate(180deg);
}

.nav-btn:hover {
  background: var(--color-primary);
  color: var(--color-text-inverse);
  border-color: var(--color-primary);
  box-shadow: var(--box-shadow-hover);
}

.carousel-track {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  padding-bottom: 2rem; /* space for shadows */
  margin: 0; 
  padding: 1rem;
  width: 100%;
}

.carousel-track::-webkit-scrollbar {
  display: none;
}

.news-card {
  flex: 0 0 calc(33.333% - 1.33rem);
  background: var(--color-bg-light);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  scroll-snap-align: start;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  min-width: 300px;
}

.news-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}

.card-image-wrapper {
  position: relative;
  height: 220px;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.news-card:hover .card-image {
  transform: scale(1.05);
}

.card-date-bubble {
  position: absolute;
  bottom: 0;
  left: 0;
  background: var(--color-bg-light);
  padding: 0.6rem 1.2rem;
  border-top-right-radius: 16px;
  font-size: 0.75rem;
  color: #007bff;
  font-weight: 500;
  z-index: 2;
}

[dir="rtl"] .card-date-bubble {
  left: auto;
  right: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 16px;
}

.card-content {
  padding: 1.5rem 1.5rem 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: var(--color-bg-light);
}

.card-title {
  font-size: 1.1rem;
  font-weight: 300;
  color: #333;
  margin-bottom: 2rem;
  line-height: 1.5;
  flex-shrink: 0;
}

.read-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  color: #007bff;
  font-weight: 400;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0;
  transition: var(--transition);
  margin-top: auto;
}

.icon-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #007bff;
  color: #fff;
  transition: transform 0.3s ease;
}

.read-more-btn:hover .icon-circle {
  transform: translateX(4px);
}

[dir="rtl"] .read-more-btn:hover .icon-circle {
  transform: translateX(-4px);
}

/* Modal Styles */
.news-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.news-modal-content {
  background: var(--color-bg-light);
  border-radius: var(--border-radius-lg);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
}

.close-modal-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-primary);
  z-index: 10;
  transition: var(--transition);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

[dir="rtl"] .close-modal-btn {
  right: auto;
  left: 1rem;
}

.close-modal-btn:hover {
  background: var(--color-bg-light);
  transform: scale(1.1);
  color: #ff3333;
}

.modal-image-wrapper {
  position: relative;
  height: 350px;
}

.modal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-category-badge {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  background: var(--color-accent);
  color: #1a1a1a;
  padding: 0.5rem 1rem;
  border-radius: 24px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
}

[dir="rtl"] .modal-category-badge {
  left: auto;
  right: 1.5rem;
}

.modal-body {
  padding: 2.5rem;
}

.modal-date {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}

.modal-title {
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.modal-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-text-main);
  white-space: pre-wrap; /* to preserve line breaks if any in content */
}

/* Modal Animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .news-modal-content {
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.modal-fade-enter-from .news-modal-content {
  transform: scale(0.9) translateY(20px);
}

/* Responsive */
@media (max-width: 1024px) {
  .news-card {
    flex: 0 0 calc(50% - 1rem);
  }
}

@media (max-width: 768px) {
  .news-card {
    flex: 0 0 100%;
    margin-right: 0;
  }
  
  .carousel-track {
    gap: 1rem;
    padding: 1rem 0;
  }
  
  .nav-btn {
    display: none; /* Hide side arrows on very small mobile screens, they can swipe */
  }

  .modal-image-wrapper {
    height: 250px;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }
  
  .news-modal-overlay {
    padding: 1rem;
  }
}
</style>
