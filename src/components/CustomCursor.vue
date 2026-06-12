<template>
  <div class="cursor-container" :class="{ 'hidden': isHidden }">
    <div 
      class="cursor-dot" 
      :style="{ transform: `translate3d(${x}px, ${y}px, 0) scale(${isHovering ? 1.5 : 1})` }"
    ></div>
    <div 
      class="cursor-ring" 
      :style="{ transform: `translate3d(${lagX}px, ${lagY}px, 0) scale(${isHovering ? 1.5 : 1})` }"
      :class="{ 'hovering': isHovering }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useMouse, useWindowScroll } from '@vueuse/core'

const { x, y } = useMouse({ type: 'client' })
const { y: scrollY } = useWindowScroll()

const lagX = ref(0)
const lagY = ref(0)
const isHovering = ref(false)
const isHidden = ref(true)

let animationFrame: number

const updateLagCursor = () => {
  lagX.value += (x.value - lagX.value) * 0.15
  lagY.value += (y.value - lagY.value) * 0.15
  animationFrame = requestAnimationFrame(updateLagCursor)
}

const handleMouseOver = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (
    target.tagName.toLowerCase() === 'a' || 
    target.tagName.toLowerCase() === 'button' ||
    target.closest('a') ||
    target.closest('button') ||
    target.classList.contains('hover-lift') ||
    target.classList.contains('hover-bounce')
  ) {
    isHovering.value = true
  } else {
    isHovering.value = false
  }
}

const handleMouseEnter = () => {
  isHidden.value = false
}

const handleMouseLeave = () => {
  isHidden.value = true
}

onMounted(() => {
  animationFrame = requestAnimationFrame(updateLagCursor)
  document.addEventListener('mouseover', handleMouseOver)
  document.addEventListener('mouseenter', handleMouseEnter)
  document.addEventListener('mouseleave', handleMouseLeave)
  
  // Initially show if mouse is inside window
  if (x.value > 0 || y.value > 0) {
    isHidden.value = false
  }
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrame)
  document.removeEventListener('mouseover', handleMouseOver)
  document.removeEventListener('mouseenter', handleMouseEnter)
  document.removeEventListener('mouseleave', handleMouseLeave)
})
</script>

<style scoped>
.cursor-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

.cursor-container.hidden {
  opacity: 0;
}

.cursor-dot {
  position: absolute;
  top: -4px;
  left: -4px;
  width: 8px;
  height: 8px;
  background-color: var(--color-accent);
  border-radius: 50%;
  pointer-events: none;
  transition: transform 0.1s ease-out;
  will-change: transform;
}

.cursor-ring {
  position: absolute;
  top: -20px;
  left: -20px;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(249, 178, 51, 0.5); /* Accent color with opacity */
  border-radius: 50%;
  pointer-events: none;
  will-change: transform;
  transition: transform 0.1s ease-out, background-color 0.3s ease;
}

.cursor-ring.hovering {
  background-color: rgba(249, 178, 51, 0.1);
  border-color: var(--color-accent);
}

/* Disable custom cursor on mobile */
@media (max-width: 768px) {
  .cursor-container {
    display: none;
  }
}
</style>
