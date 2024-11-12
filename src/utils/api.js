import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://sharp-tint-ca9015f95653.herokuapp.com'
});

export const login = (credentials) => api.post('/login', credentials);
export const register = (userData) => api.post('/register', userData);
export const checkout = (paymentData) => api.post('/create_subscription', paymentData);

export default api;