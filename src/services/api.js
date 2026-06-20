import { auth } from '../firebase/config.js';

const API_BASE_URL = '/api/content';

// Helper to get auth token
const getAuthToken = async () => {
  if (auth.currentUser) {
    return await auth.currentUser.getIdToken();
  }
  return null;
};

// Generic Fetch Helper
const fetchAPI = async (endpoint, options = {}) => {
  const token = await getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'API Request failed');
  }

  return response.json();
};

export const api = {
  // Public Data Fetching
  getAll: (collection) => fetchAPI(`/${collection}`),
  getOne: (collection, id) => fetchAPI(`/${collection}/${id}`),
  
  // Protected Admin Methods
  create: (collection, data) => fetchAPI(`/${collection}`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (collection, id, data) => fetchAPI(`/${collection}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (collection, id) => fetchAPI(`/${collection}/${id}`, {
    method: 'DELETE',
  }),
};
