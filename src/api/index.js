import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
console.log('Axios baseURL initialized:', baseURL);

const api = axios.create({
  baseURL,
});

export default api;