<template>
  <section class="pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-amwaj-bg-light relative">
    <!-- Animated background blobs -->
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
    <div class="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
    <div class="absolute -bottom-32 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="flex flex-col lg:flex-row items-center">
        <!-- Text Content -->
        <div class="lg:w-1/2 lg:pr-12 rtl:lg:pr-0 rtl:lg:pl-12 text-center lg:text-left rtl:lg:text-right mb-12 lg:mb-0">
          <h1 class="animate-fade-in-up reveal-hidden text-4xl sm:text-5xl lg:text-6xl font-montserrat font-bold text-white leading-tight mb-6 tracking-tight">
            Empowering Your Business through <span class="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">Innovative Technology</span>
          </h1>
          <p class="animate-fade-in-up delay-200 reveal-hidden text-lg sm:text-xl text-slate-300 mb-8 font-light max-w-2xl mx-auto lg:mx-0">
            Scalable, reliable, and secure technical solutions designed to navigate the complexities of modern enterprise operations.
          </p>
          <div class="animate-fade-in-up delay-400 reveal-hidden flex flex-col sm:flex-row justify-center lg:justify-start rtl:lg:justify-start gap-4">
            
            <button 
              ref="magneticBtn"
              @mousemove="handleMagneticMove"
              @mouseleave="handleMagneticLeave"
              :style="{ transform: magneticTransform }"
              class="relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-3.5 rounded-md font-semibold text-lg transition-all shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center overflow-hidden group duration-100 ease-out"
            >
              <span class="relative z-10 flex items-center pointer-events-none">
                Get Started
                <ArrowRight class="ml-2 rtl:ml-0 rtl:mr-2 w-5 h-5 rtl:rotate-180" />
              </span>
            </button>
            
            <button class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] text-white px-8 py-3.5 rounded-md font-semibold text-lg transition-all flex items-center justify-center">
              Explore Services
            </button>
          </div>
        </div>
        
        <!-- Image Content -->
        <div class="lg:w-1/2 relative animate-fade-in-up delay-600 reveal-hidden">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ArrowRight } from 'lucide-vue-next'

const magneticBtn = ref(null)
const btnX = ref(0)
const btnY = ref(0)

const handleMagneticMove = (e) => {
  if (!magneticBtn.value) return
  const rect = magneticBtn.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  
  const distanceX = (e.clientX - centerX) * 0.2
  const distanceY = (e.clientY - centerY) * 0.2
  
  btnX.value = distanceX
  btnY.value = distanceY
}

const handleMagneticLeave = () => {
  btnX.value = 0
  btnY.value = 0
}

const magneticTransform = computed(() => {
  return `translate(${btnX.value}px, ${btnY.value}px)`
})
</script>
