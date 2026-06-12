<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">{{ projectKey ? t('projects.cases.' + projectKey + '.title') : t('projects.inspectz.title') }}</h3>
        <div class="modal-controls">
          <button 
            class="fullscreen-btn" 
            @click="toggleFullscreen"
            :title="isFullscreen ? t('modal.fullscreen.exit') : t('modal.fullscreen.enter')"
          >
            <svg v-if="!isFullscreen" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.33331 3.33325H8.33331V5.83325H5.83331V8.33325H3.33331V3.33325Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16.6667 3.33325H11.6667V5.83325H14.1667V8.33325H16.6667V3.33325Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16.6667 16.6667H11.6667V14.1667H14.1667V11.6667H16.6667V16.6667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3.33331 16.6667H8.33331V14.1667H5.83331V11.6667H3.33331V16.6667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.66669 6.66675H13.3334V13.3334H6.66669V6.66675Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.33331 3.33325H11.6666V5.83325" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.33331 16.6667H11.6666V14.1667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16.6667 8.33325H14.1667V11.6667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3.33331 8.33325H5.83331V11.6667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="close-btn" @click="closeModal" :title="t('modal.close')">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="modal-content" :class="{ 'fullscreen': isFullscreen }">
        <iframe 
          :src="figmaUrl" 
          :class="['figma-iframe', { 'fullscreen': isFullscreen }]"
          allowfullscreen
          title="Electricity Report App Prototype"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
  isOpen: boolean
  projectKey?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const isFullscreen = ref(false)
const figmaUrl = 'https://embed.figma.com/proto/yyT2TlHofJILaPFpEl7ESD/Untitled?scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&node-id=1-2169&embed-host=share'

const closeModal = () => {
  if (isFullscreen.value) {
    exitFullscreen()
  }
  emit('close')
}

const toggleFullscreen = () => {
  if (isFullscreen.value) {
    exitFullscreen()
  } else {
    enterFullscreen()
  }
}

const enterFullscreen = () => {
  const modalContainer = document.querySelector('.modal-container') as HTMLElement
  if (modalContainer) {
    if (modalContainer.requestFullscreen) {
      modalContainer.requestFullscreen()
    } else if ((modalContainer as any).webkitRequestFullscreen) {
      (modalContainer as any).webkitRequestFullscreen()
    } else if ((modalContainer as any).msRequestFullscreen) {
      (modalContainer as any).msRequestFullscreen()
    }
  }
  isFullscreen.value = true
}

const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if ((document as any).webkitExitFullscreen) {
    (document as any).webkitExitFullscreen()
  } else if ((document as any).msExitFullscreen) {
    (document as any).msExitFullscreen()
  }
  isFullscreen.value = false
}

const handleFullscreenChange = () => {
  if (!document.fullscreenElement && !(document as any).webkitFullscreenElement && !(document as any).msFullscreenElement) {
    isFullscreen.value = false
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeModal()
  }
  if (event.key === 'F11') {
    event.preventDefault()
    toggleFullscreen()
  }
}

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.addEventListener('msfullscreenchange', handleFullscreenChange)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
  document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.removeEventListener('msfullscreenchange', handleFullscreenChange)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  z-index: var(--z-modal, 1000);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  animation: fadeIn 0.3s ease-out;
}

.modal-container {
  background: var(--color-bg-primary, #ffffff);
  border-radius: var(--radius-lg, 12px);
  box-shadow: var(--shadow-card, 0 20px 40px rgba(0, 0, 0, 0.3));
  width: 100%;
  max-width: 90vw;
  height: 80vh;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideIn 0.3s ease-out;
}

.modal-container:fullscreen {
  max-width: 100dvw;
  max-height: 100dvh;
  border-radius: 0;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg, 1.5rem);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: var(--color-bg-secondary, #f4f4f4);
}

.modal-title {
  color: var(--color-primary, #1a2a4a);
  font-size: var(--text-xl, 1.25rem);
  font-weight: var(--font-semibold, 600);
  margin: 0;
}

.modal-controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm, 0.75rem);
}

.fullscreen-btn,
.close-btn {
  background: var(--color-bg-primary, #ffffff);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: var(--color-text-primary, #333333);
  padding: var(--spacing-xs, 0.5rem);
  border-radius: var(--radius-sm, 6px);
  cursor: pointer;
  transition: all var(--transition-fast, 0.2s ease);
  display: flex;
  align-items: center;
  justify-content: center;
}

.fullscreen-btn:hover,
.close-btn:hover {
  background: var(--color-bg-secondary, #f4f4f4);
  transform: translateY(-1px);
}

.modal-content {
  flex: 1;
  display: flex;
  overflow: hidden;
  min-height: 0;
}

.modal-content.fullscreen {
  height: calc(100vh - 80px);
}

.figma-iframe {
  width: 100%;
  height: 100%;
  border: none;
  background: #ffffff;
  border-radius: 0 0 var(--radius-lg, 12px) var(--radius-lg, 12px);
}

.figma-iframe.fullscreen {
  border-radius: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@media (max-width: 768px) {
  .modal-overlay {
    padding: var(--spacing-sm, 0.75rem);
  }
  
  .modal-container {
    max-width: 100%;
    height: 85vh;
    max-height: 85vh;
  }
  
  .modal-header {
    padding: var(--spacing-sm, 0.75rem);
  }
  
  .modal-title {
    font-size: var(--text-lg, 1.125rem);
  }
  
  .fullscreen-btn,
  .close-btn {
    padding: var(--spacing-xs, 0.5rem);
  }
}
</style>
