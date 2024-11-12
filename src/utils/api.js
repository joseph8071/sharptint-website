import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://sharp-tint-ca9015f95653.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false
});

// Add request interceptor for auth token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Add response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Update the login function to use axios directly
export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = (userData) => api.post('/register', userData);
export const checkout = async (checkoutData) => {
  if (!checkoutData.priceId) {
    throw new Error('Price ID is required');
  }

  try {
    console.log('Sending checkout request:', checkoutData);

    const response = await api.post('/create_subscription', {
      priceId: checkoutData.priceId,
      paymentMethodId: checkoutData.paymentMethodId,
      email: checkoutData.email,
      planDetails: checkoutData.planDetails
    });

    console.log('Checkout response:', response.data);
    
    if (!response.data.success && !response.data.requiresAction) {
      throw new Error(response.data.error || 'Failed to create subscription');
    }
    
    return response;
  } catch (error) {
    console.error('Checkout API error:', error);
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};

export default api;