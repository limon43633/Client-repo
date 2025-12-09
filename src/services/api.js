import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const productAPI = {
  // Get home page products
  getHomeProducts: (sort = 'latest') => API.get(`/api/products/home?sort=${sort}`),
  
  // Get all products
  getAllProducts: () => API.get('/api/products'),
  
  // Get single product by ID
  getProductById: (id) => API.get(`/api/products/${id}`),
};

export default API;