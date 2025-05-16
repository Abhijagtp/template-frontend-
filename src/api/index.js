// src/api/index.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000', // Fallback for local dev
});

export default api;