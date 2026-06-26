const API_URL = 'http://localhost:3000/api';

const getHeaders = () => {
  const token = localStorage.getItem('amwaj_token') || sessionStorage.getItem('amwaj_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const api = {
  // Authentication
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    return data;
  },

  getMe: async () => {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to get user details');
    return data;
  },

  updateCredentials: async (email, currentPassword, newPassword) => {
    const res = await fetch(`${API_URL}/auth/update-credentials`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ email, currentPassword, newPassword })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update credentials');
    return data;
  },

  // Email Notification
  sendEmailNotification: async (type, data) => {
    try {
      const response = await fetch(`${API_URL}/email/send`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ type, data }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to send email');
      return result;
    } catch (error) {
      console.error('Error sending email notification:', error);
      throw error;
    }
  },

  // Public Data Fetching
  getAll: async (collectionName) => {
    const res = await fetch(`${API_URL}/content/${collectionName}`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch data');
    return await res.json();
  },
  
  getOne: async (collectionName, id) => {
    const res = await fetch(`${API_URL}/content/${collectionName}/${id}`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Document not found');
    return await res.json();
  },
  
  // File Upload
  uploadFile: async (path, file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const token = localStorage.getItem('amwaj_token') || sessionStorage.getItem('amwaj_token');
    const res = await fetch(`${API_URL}/uploads`, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: formData
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Upload failed');
    // For local storage, the backend returns /uploads/filename. We need to prepend the backend host if running separately.
    return `http://localhost:3000${data.url}`;
  },

  // Protected Admin Methods
  create: async (collectionName, data) => {
    const res = await fetch(`${API_URL}/content/${collectionName}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to create');
    return result;
  },

  update: async (collectionName, id, data) => {
    const res = await fetch(`${API_URL}/content/${collectionName}/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update');
    return result;
  },

  set: async (collectionName, id, data) => {
    // For our REST API, PUT acts like Set/Upsert depending on how we wrote it.
    // In our Prisma controller, updateDoc updates by ID. If it doesn't exist, it fails.
    // To keep it simple, we just call update.
    return await api.update(collectionName, id, data);
  },

  updateBatch: async (collectionName, updates) => {
    // We didn't build a batch endpoint in Express, so we do it sequentially here for simplicity.
    // For production, a dedicated batch route is better.
    const results = [];
    for (const { id, data } of updates) {
      results.push(await api.update(collectionName, id, data));
    }
    return { message: 'Batch update successful' };
  },

  delete: async (collectionName, id) => {
    const res = await fetch(`${API_URL}/content/${collectionName}/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to delete');
    return result;
  }
};
