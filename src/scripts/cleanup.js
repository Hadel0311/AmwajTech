import { api } from '../services/api.js';

export async function cleanupDuplicates() {
  console.log("Starting cleanup of duplicate services...");
  try {
    const services = await api.getAll('services');
    const seenKeys = new Set();
    
    for (const service of services) {
      if (seenKeys.has(service.key)) {
        console.log(`Deleting duplicate service: ${service.title} (${service.id})`);
        await api.delete('services', service.id);
      } else {
        seenKeys.add(service.key);
      }
    }
    console.log("Cleanup completed successfully!");
  } catch (error) {
    console.error("Cleanup failed:", error);
  }
}
