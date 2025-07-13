import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE_URL = `${BACKEND_URL}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('kongenga_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('kongenga_token');
      localStorage.removeItem('kongenga_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email, password, userType = 'student') => {
    const response = await api.post('/auth/login', { email, password, userType });
    return response.data;
  },
  
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};

// Users API
export const usersAPI = {
  getProfile: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
  
  updateProfile: async (updateData) => {
    const response = await api.put('/users/me', updateData);
    return response.data;
  },
  
  toggleFavorite: async (jobId) => {
    const response = await api.post(`/users/favorites/${jobId}`);
    return response.data;
  },
  
  getFavorites: async () => {
    const response = await api.get('/users/favorites');
    return response.data;
  },
  
  updateProgress: async (progress) => {
    const response = await api.put('/users/progress', progress);
    return response.data;
  },
  
  // Admin only
  getAllUsers: async (skip = 0, limit = 100) => {
    const response = await api.get(`/users?skip=${skip}&limit=${limit}`);
    return response.data;
  },
  
  getUserStats: async () => {
    const response = await api.get('/users/stats');
    return response.data;
  },
};

// Jobs API
export const jobsAPI = {
  getAll: async (params = {}) => {
    const { skip = 0, limit = 100, sector, search, language = 'fr' } = params;
    const queryParams = new URLSearchParams({ skip, limit, language });
    if (sector) queryParams.append('sector', sector);
    if (search) queryParams.append('search', search);
    
    const response = await api.get(`/jobs?${queryParams}`);
    return response.data;
  },
  
  getById: async (jobId) => {
    const response = await api.get(`/jobs/${jobId}`);
    return response.data;
  },
  
  getBySector: async (sectorName, skip = 0, limit = 50) => {
    const response = await api.get(`/jobs/sector/${sectorName}?skip=${skip}&limit=${limit}`);
    return response.data;
  },
  
  // Admin only
  create: async (jobData) => {
    const response = await api.post('/jobs', jobData);
    return response.data;
  },
  
  update: async (jobId, updateData) => {
    const response = await api.put(`/jobs/${jobId}`, updateData);
    return response.data;
  },
  
  delete: async (jobId) => {
    const response = await api.delete(`/jobs/${jobId}`);
    return response.data;
  },
};

// Sectors API
export const sectorsAPI = {
  getAll: async () => {
    const response = await api.get('/sectors');
    return response.data;
  },
  
  getById: async (sectorId) => {
    const response = await api.get(`/sectors/${sectorId}`);
    return response.data;
  },
  
  // Admin only
  create: async (sectorData) => {
    const response = await api.post('/sectors', sectorData);
    return response.data;
  },
  
  update: async (sectorId, updateData) => {
    const response = await api.put(`/sectors/${sectorId}`, updateData);
    return response.data;
  },
  
  delete: async (sectorId) => {
    const response = await api.delete(`/sectors/${sectorId}`);
    return response.data;
  },
};

// Companies API
export const companiesAPI = {
  getAll: async (skip = 0, limit = 100, sector = null) => {
    const queryParams = new URLSearchParams({ skip, limit });
    if (sector) queryParams.append('sector', sector);
    
    const response = await api.get(`/companies?${queryParams}`);
    return response.data;
  },
  
  getById: async (companyId) => {
    const response = await api.get(`/companies/${companyId}`);
    return response.data;
  },
  
  // Admin only
  create: async (companyData) => {
    const response = await api.post('/companies', companyData);
    return response.data;
  },
  
  update: async (companyId, updateData) => {
    const response = await api.put(`/companies/${companyId}`, updateData);
    return response.data;
  },
  
  delete: async (companyId) => {
    const response = await api.delete(`/companies/${companyId}`);
    return response.data;
  },
};

// Training API
export const trainingAPI = {
  getAll: async (skip = 0, limit = 100, level = null, provider = null) => {
    const queryParams = new URLSearchParams({ skip, limit });
    if (level) queryParams.append('level', level);
    if (provider) queryParams.append('provider', provider);
    
    const response = await api.get(`/training?${queryParams}`);
    return response.data;
  },
  
  getById: async (trainingId) => {
    const response = await api.get(`/training/${trainingId}`);
    return response.data;
  },
  
  getBySkill: async (skill) => {
    const response = await api.get(`/training/skills/${skill}`);
    return response.data;
  },
  
  // Admin only
  create: async (trainingData) => {
    const response = await api.post('/training', trainingData);
    return response.data;
  },
  
  update: async (trainingId, updateData) => {
    const response = await api.put(`/training/${trainingId}`, updateData);
    return response.data;
  },
  
  delete: async (trainingId) => {
    const response = await api.delete(`/training/${trainingId}`);
    return response.data;
  },
};

// Testimonials API
export const testimonialsAPI = {
  getApproved: async (skip = 0, limit = 50, jobId = null) => {
    const queryParams = new URLSearchParams({ skip, limit });
    if (jobId) queryParams.append('job_id', jobId);
    
    const response = await api.get(`/testimonials?${queryParams}`);
    return response.data;
  },
  
  getByJob: async (jobId) => {
    const response = await api.get(`/testimonials/job/${jobId}`);
    return response.data;
  },
  
  create: async (testimonialData) => {
    const response = await api.post('/testimonials', testimonialData);
    return response.data;
  },
  
  // Admin only
  getPending: async () => {
    const response = await api.get('/testimonials/pending');
    return response.data;
  },
  
  approve: async (testimonialId) => {
    const response = await api.put(`/testimonials/${testimonialId}/approve`);
    return response.data;
  },
  
  verify: async (testimonialId) => {
    const response = await api.put(`/testimonials/${testimonialId}/verify`);
    return response.data;
  },
  
  delete: async (testimonialId) => {
    const response = await api.delete(`/testimonials/${testimonialId}`);
    return response.data;
  },
};

// Admin API
export const adminAPI = {
  getStatistics: async () => {
    const response = await api.get('/admin/statistics');
    return response.data;
  },
  
  getDashboard: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },
  
  importSampleData: async () => {
    const response = await api.post('/admin/import-sample-data');
    return response.data;
  },
  
  updateStatistics: async () => {
    const response = await api.post('/admin/update-statistics');
    return response.data;
  },
  
  exportUsers: async () => {
    const response = await api.get('/admin/export/users');
    return response.data;
  },
  
  exportJobs: async () => {
    const response = await api.get('/admin/export/jobs');
    return response.data;
  },
};

// Helper function to handle API errors
export const handleAPIError = (error, defaultMessage = 'Une erreur est survenue') => {
  if (error.response?.data?.detail) {
    return error.response.data.detail;
  }
  if (error.message) {
    return error.message;
  }
  return defaultMessage;
};

export default api;