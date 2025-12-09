import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

// Add request interceptor for debugging
API.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const productAPI = {
  getHomeProducts: (sort = 'latest') => API.get(`/api/products/home?sort=${sort}`),
  getAllProducts: () => API.get('/api/products'),
  getProductById: (id) => API.get(`/api/products/${id}`),
};

export default API;