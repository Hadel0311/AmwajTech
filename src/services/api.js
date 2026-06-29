const API_URL = import.meta.env.VITE_API_URL || '/api';

const getHeaders = () => {
  return {
    'Content-Type': 'application/json'
  };
};

const fetchWithAuth = async (url, options = {}) => {
  // Ensure headers are set properly, especially for FormData which shouldn't have Content-Type set manually
  const headers = getHeaders();
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }
  
  const fetchOptions = { ...options, credentials: 'include', headers: { ...headers, ...options.headers } };
  
  let res = await fetch(url, fetchOptions);
  
  if (res.status === 401) {
    const refreshed = await api.refreshToken();
    if (refreshed) {
      // Retry with new token via cookie
      const newHeaders = getHeaders();
      if (options.body instanceof FormData) {
        delete newHeaders['Content-Type'];
      }
      res = await fetch(url, { ...options, credentials: 'include', headers: { ...newHeaders, ...options.headers } });
    } else {
      api.forceLogout();
      let errorMsg = 'Session expired. Please log in again.';
      try { const result = await res.json(); errorMsg = result.error || errorMsg; } catch(e) {}
      throw new Error(errorMsg);
    }
  }
  return res;
};

export const api = {
  forceLogout: () => {
    localStorage.removeItem('logged_in');
    window.location.href = '/login';
  },

  refreshToken: async () => {
    const isLoggedIn = localStorage.getItem('logged_in') === 'true';
    if (!isLoggedIn) return false;

    try {
      const res = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  },

  logout: async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (e) {
      console.error('Failed to logout on server', e);
    }
    api.forceLogout();
  },

  // Authentication
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    return data;
  },

  changePassword: async (currentPassword, newPassword) => {
    const res = await fetchWithAuth(`${API_URL}/auth/change-password`, {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to change password');
    
    // Tokens are updated via HttpOnly cookies from the backend
    
    return data;
  },

  // Email Notification
  sendEmailNotification: async (type, data) => {
    try {
      const response = await fetchWithAuth(`${API_URL}/email/send`, {
        method: 'POST',
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
    const res = await fetchWithAuth(`${API_URL}/content/${collectionName}`);
    if (!res.ok) throw new Error('Failed to fetch data');
    return await res.json();
  },
  
  getOne: async (collectionName, id) => {
    const res = await fetchWithAuth(`${API_URL}/content/${collectionName}/${id}`);
    if (!res.ok) throw new Error('Document not found');
    return await res.json();
  },
  
  // File Upload
  uploadFile: async (path, file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const res = await fetchWithAuth(`${API_URL}/uploads`, {
      method: 'POST',
      body: formData
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Upload failed');
    return data.url;
  },

  // Protected Admin Methods
  create: async (collectionName, data) => {
    const res = await fetchWithAuth(`${API_URL}/content/${collectionName}`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to create');
    return result;
  },

  update: async (collectionName, id, data) => {
    const res = await fetchWithAuth(`${API_URL}/content/${collectionName}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update');
    return result;
  },

  set: async (collectionName, id, data) => {
    return await api.update(collectionName, id, data);
  },

  updateBatch: async (collectionName, updates) => {
    const results = [];
    for (const { id, data } of updates) {
      results.push(await api.update(collectionName, id, data));
    }
    return { message: 'Batch update successful' };
  },

  delete: async (collectionName, id) => {
    const res = await fetchWithAuth(`${API_URL}/content/${collectionName}/${id}`, {
      method: 'DELETE'
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to delete');
    return result;
  },

  getDashboardStats: async () => {
    const res = await fetchWithAuth(`${API_URL}/content/dashboard-stats`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch dashboard stats');
    return data;
  },

  trackVisit: async (path) => {
    await fetch(`${API_URL}/content/track-visit`, {
      method: 'POST',
      credentials: 'omit', // No cookies needed for public tracking
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path })
    }).catch(() => {});
  },

  seedDemoData: async () => {
    const res = await fetchWithAuth(`${API_URL}/content/seed-demo`, {
      method: 'POST'
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to seed demo data');
    return data;
  }
};
