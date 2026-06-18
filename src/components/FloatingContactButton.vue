<template>
  <router-link to="/contact" class="floating-contact-button" aria-label="Contact Us">
    <span class="icon-wrapper">
      <MessageCircle class="contact-icon" />
    </span>
    <span class="button-label">Get In Touch</span>
  </router-link>
</template>

<script setup lang="ts">
import { MessageCircle } from 'lucide-vue-next'
</script>

<style scoped>
.floating-contact-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--color-primary);
  color: #ffffff;
  padding: 0.75rem 1.5rem 0.75rem 0.75rem;
  border-radius: 9999px;
  text-decoration: none;
  box-shadow: 0 10px 25px rgba(10, 25, 47, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slide-up-fade 0.6s ease-out forwards;
  /* Start hidden for animation */
  opacity: 0;
  transform: translateY(20px);
}

.floating-contact-button:hover {
  background-color: var(--color-primary-light);
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(10, 25, 47, 0.3);
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  padding: 0.5rem;
}

.contact-icon {
  width: 24px;
  height: 24px;
  color: #ffffff;
}

.button-label {
  font-weight: 600;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
  font-size: 1rem;
  white-space: nowrap;
}

@keyframes slide-up-fade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .floating-contact-button {
    bottom: 1.5rem;
    right: 1.5rem;
    padding: 1rem;
  }

  .button-label {
    display: none;
  }
  
  .icon-wrapper {
    background-color: transparent;
    padding: 0;
  }
}
</style>
