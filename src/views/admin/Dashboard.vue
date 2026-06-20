<template>
  <div class="dashboard-overview">
    <h1>Welcome back, Admin!</h1>
    <p>The backend and API are fully connected.</p>
    
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Announcements</h3>
        <p class="stat-value">Manage your company news and updates.</p>
        <router-link to="/admin/announcements" class="btn-primary mt-4 inline-block">Go to Announcements</router-link>
      </div>
      <div class="stat-card">
        <h3>Services</h3>
        <p class="stat-value">Update your service offerings dynamically.</p>
      </div>
      <div class="stat-card">
        <h3>Partners</h3>
        <p class="stat-value">Manage your partner ecosystem.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-overview h1 {
  font-size: 1.875rem;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.dashboard-overview p {
  color: #6b7280;
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
}

.stat-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #374151;
}

.btn-primary {
  background-color: #0d9488;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
}
</style>
