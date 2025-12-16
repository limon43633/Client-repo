// client/src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

// Add request interceptor for debugging
API.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.baseURL + config.url);

    // Add JWT token if available
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('access-token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const productAPI = {
  getHomeProducts: (sort = 'latest') =>
    API.get(`/api/products/home?sort=${encodeURIComponent(sort)}`),

  getAllProducts: ({ page = 1, limit = 4, sort = 'latest', search = '', category = '' } = {}) => {
    const params = new URLSearchParams();
    params.append('page', String(page));
    params.append('limit', String(limit));
    if (sort) params.append('sort', sort);
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    return API.get(`/api/products?${params.toString()}`);
  },

  getProductById: (id) => API.get(`/api/products/${id}`),

  createProduct: (productData) => API.post('/api/products', productData),

  updateProduct: (id, productData) => API.put(`/api/products/${id}`, productData),

  deleteProduct: (id) => API.delete(`/api/products/${id}`),
};

// ✅ UPDATED orderAPI (your requested fix)
export const orderAPI = {
  // Create new order
  createOrder: (orderData) => {
    console.log('📤 Creating order:', orderData);
    return API.post('/api/orders', orderData);
  },

  // Get user's orders - Try multiple ways
  getUserOrders: async (userId) => {
    console.log('📥 Fetching orders for user:', userId);

    // Try by userId first
    try {
      const response = await API.get(`/api/orders/user/${userId}`);
      console.log('Orders response:', response.data);
      return response;
    } catch (error) {
      console.log('Failed to fetch by userId, trying by email...');

      // If we have user email, try that
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.email) {
        const response = await API.get(`/api/orders/email/${user.email}`);
        console.log('Orders by email response:', response.data);
        return response;
      }

      throw error;
    }
  },

  // Get order by ID
  getOrderById: (orderId) => {
    console.log('📋 Fetching order:', orderId);
    return API.get(`/api/orders/${orderId}`);
  },

  // Update order status
  updateOrderStatus: (orderId, status) =>
    API.put(`/api/orders/${orderId}/status`, { status }),

  // Cancel order
  cancelOrder: (orderId) => {
    console.log('❌ Cancelling order:', orderId);
    return API.patch(`/api/orders/${orderId}/cancel`);
  },

  // Get all orders (for admin/manager) — kept from your original (useful)
  getAllOrders: ({ page = 1, limit = 10, status = '', search = '' } = {}) => {
    const params = new URLSearchParams();
    params.append('page', String(page));
    params.append('limit', String(limit));
    if (status) params.append('status', status);
    if (search) params.append('search', search);
    return API.get(`/api/orders?${params.toString()}`);
  },

  // Get pending orders (for manager)
  getPendingOrders: () => {
    console.log('⏳ Fetching pending orders');
    return API.get('/api/orders/pending/all');
  },

  // Get approved orders (for manager)
  getApprovedOrders: () => {
    console.log('✅ Fetching approved orders');
    return API.get('/api/orders/approved/all');
  },

  // Update tracking
  updateTracking: (orderId, trackingData) => {
    console.log('🚚 Updating tracking for order:', orderId);
    return API.post(`/api/orders/${orderId}/tracking`, trackingData);
  },
};

export const userAPI = {
  // Get user profile
  getProfile: (userId) => API.get(`/api/users/${userId}`),

  // Update user profile
  updateProfile: (userId, data) => API.put(`/api/users/${userId}`, data),

  // Get user stats
  getUserStats: (userId) => API.get(`/api/users/${userId}/stats`),

  // Get all users (for admin)
  getAllUsers: ({ page = 1, limit = 10, role = '', search = '' } = {}) => {
    const params = new URLSearchParams();
    params.append('page', String(page));
    params.append('limit', String(limit));
    if (role) params.append('role', role);
    if (search) params.append('search', search);
    return API.get(`/api/users?${params.toString()}`);
  },

  // Update user role/status (for admin)
  updateUser: (userId, data) => API.patch(`/api/users/${userId}`, data),

  // Delete user (for admin)
  deleteUser: (userId) => API.delete(`/api/users/${userId}`),

  // Get user by email
  getUserByEmail: (email) => API.get(`/api/users/email/${email}`),
};

export const authAPI = {
  // Register user
  register: (userData) => API.post('/api/auth/register', userData),

  // Login user
  login: (credentials) => API.post('/api/auth/login', credentials),

  // Google login
  googleLogin: (token) => API.post('/api/auth/google', { token }),

  // GitHub login
  githubLogin: (code) => API.post('/api/auth/github', { code }),

  // Verify token
  verifyToken: () => API.get('/api/auth/verify'),
};

export default API;
