<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'backdrop-blur-md bg-slate-900/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-slate-800' : 'bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <span class="font-montserrat font-bold text-2xl text-white tracking-tight drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
            Amwaj<span class="text-amwaj-cta">-Tech</span>
          </span>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
          <nav class="flex space-x-6 rtl:space-x-reverse">
            <a href="#services" class="text-sm font-medium text-slate-300 hover:text-amwaj-cta hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all">Services</a>
            <a href="#about" class="text-sm font-medium text-slate-300 hover:text-amwaj-cta hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all">About</a>
          </nav>

          <div class="flex items-center space-x-4 rtl:space-x-reverse border-l rtl:border-r rtl:border-l-0 border-slate-700 pl-4 rtl:pl-0 rtl:pr-4">
            <button @click="toggleLanguage" class="flex items-center text-sm font-medium text-slate-300 hover:text-amwaj-cta transition-colors">
              <Globe class="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
              {{ currentLang === 'en' ? 'عربي' : 'EN' }}
            </button>
            <button class="bg-amwaj-cta hover:bg-cyan-400 text-slate-900 px-5 py-2.5 rounded-md font-bold text-sm transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]">
              Contact Us
            </button>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center md:hidden">
          <button class="text-slate-300 hover:text-amwaj-cta">
            <Menu class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Globe, Menu } from 'lucide-vue-next'

const isScrolled = ref(false)
const currentLang = ref('en')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const toggleLanguage = () => {
  currentLang.value = currentLang.value === 'en' ? 'ar' : 'en'
  document.documentElement.dir = currentLang.value === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = currentLang.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
