<template>
  <main class="support-view">
    <section class="page-header">
      <div class="header-container">
        <h1 class="page-title">Need Technical Assistance?</h1>
        <p class="page-subtitle">Our support specialists are ready to help resolve technical issues and provide assistance for your technology environment.</p>
        <div class="header-actions">
          <a href="https://support.amwaj-tech.com/#login" target="_blank" rel="noopener noreferrer" class="btn-primary">
            Access Support Portal
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.support-view {
  min-height: calc(100vh - 400px);
}

.page-header {
  background-color: var(--color-primary-dark);
  padding: 8rem 0;
  text-align: center;
  color: var(--color-text-inverse);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
}

.header-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: var(--font-bold);
  font-family: var(--font-heading, 'Montserrat', sans-serif);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.header-actions {
  display: flex;
  justify-content: center;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-accent);
  color: var(--color-primary-dark);
  font-weight: var(--font-bold);
  font-size: 1.1rem;
  padding: 1rem 2.5rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: var(--font-heading, 'Montserrat', sans-serif);
}

.btn-primary:hover {
  background-color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
</style>
