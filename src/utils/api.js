import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const checkout = (paymentData) => api.post('/payments/checkout', paymentData);

export default api;