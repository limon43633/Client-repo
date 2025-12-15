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
  getHomeProducts: (sort = 'latest') => API.get(`/api/products/home?sort=${encodeURIComponent(sort)}`),
  
  getAllProducts: ({ page = 1, limit = 4, sort = 'latest', search = '', category = '' } = {}) => {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    if (sort) params.append('sort', sort);
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    return API.get(`/api/products?${params.toString()}`);
  },
  
  getProductById: (id) => API.get(`/api/products/${id}`),
};

export const orderAPI = {
  // Create new order
  createOrder: (orderData) => API.post('/api/orders', orderData),
  
  // Get user's orders
  getUserOrders: (userId) => API.get(`/api/orders/user/${userId}`),
  
  // Get order by ID
  getOrderById: (orderId) => API.get(`/api/orders/${orderId}`),
  
  // Update order status
  updateOrderStatus: (orderId, status) => 
    API.put(`/api/orders/${orderId}/status`, { status }),
};

export default API;