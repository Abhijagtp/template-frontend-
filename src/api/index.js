// frontend/src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://template-backend-4i5o.onrender.com',
});

export default api;