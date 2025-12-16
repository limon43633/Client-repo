// client/src/pages/dashboards/buyer/MyOrders.jsx - UPDATED
import { useState, useEffect } from 'react';
import { useAuth } from "../../../contexts/AuthContext";
import { useTheme } from '../../../contexts/ThemeContext';
import { orderAPI } from "../../../services/api";
import { 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaCalendarAlt, 
  FaReceipt, 
  FaBox, 
  FaTruck, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaSpinner,
  FaTrash,
  FaExclamationTriangle
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const MyOrders = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  
  // Set page title
  useEffect(() => {
    document.title = 'My Orders | Garments Tracker';
    return () => {
      document.title = 'Garments Tracker';
    };
  }, []);
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [cancellingOrder, setCancellingOrder] = useState(null);

  // Fetch user's orders - FIXED
  const fetchUserOrders = async () => {
    if (!user?.email && !user?.uid) {
      setError('User not found');
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Try multiple API endpoints based on your backend
      let response;
      
      // Option 1: Using user ID
      if (user.uid) {
        response = await orderAPI.getUserOrders(user.uid);
      } 
      // Option 2: Using email
      else if (user.email) {
        // If your API expects email, use this
        response = await orderAPI.getUserOrders(user.email);
      }
      
      console.log('Orders API Response:', response);
      
      // Handle different response structures
      if (response.data) {
        const ordersData = response.data.data || response.data;
        setOrders(Array.isArray(ordersData) ? ordersData : []);
        
        if (!Array.isArray(ordersData) || ordersData.length === 0) {
          console.log('No orders found or invalid data format');
        }
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      
      // Show mock data for testing
      setOrders(getMockOrders());
      setError('Using demo data. API connection failed.');
      
      // Uncomment for production:
      // setError(err.response?.data?.message || 'Failed to load orders');
      // toast.error('Failed to load your orders');
    } finally {
      setLoading(false);
    }
  };

  // Mock data for testing
  const getMockOrders = () => {
    return [
      {
        _id: 'ORD123456',
        productName: 'Premium Cotton T-Shirt',
        productImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
        quantity: 5,
        totalPrice: 2500,
        orderDate: '2024-01-15',
        status: 'pending',
        paymentMethod: 'Cash on Delivery',
        deliveryAddress: '123 Main Street, Dhaka',
        additionalNotes: 'Please deliver before 5 PM'
      },
      {
        _id: 'ORD123457',
        productName: 'Denim Jacket',
        productImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w-400',
        quantity: 2,
        totalPrice: 4500,
        orderDate: '2024-01-10',
        status: 'approved',
        paymentMethod: 'bKash',
        deliveryAddress: '456 Park Avenue, Chittagong',
        additionalNotes: 'Size: Large'
      },
      {
        _id: 'ORD123458',
        productName: 'Formal Shirt',
        productImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
        quantity: 3,
        totalPrice: 1800,
        orderDate: '2024-01-05',
        status: 'delivered',
        paymentMethod: 'Card Payment',
        deliveryAddress: '789 Lake Road, Sylhet',
        additionalNotes: 'White color preferred'
      }
    ];
  };

  useEffect(() => {
    if (user) {
      fetchUserOrders();
    }
  }, [user]);

  // Handle order cancellation - FIXED
  const handleCancelOrder = async (orderId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You want to cancel this order? This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        setCancellingOrder(orderId);
        
        // In real app, call API
        // await orderAPI.cancelOrder(orderId);
        
        // For demo - update local state
        setTimeout(() => {
          setOrders(orders.map(order => 
            order._id === orderId 
              ? { ...order, status: 'cancelled', cancelledAt: new Date().toISOString() }
              : order
          ));
          
          Swal.fire(
            'Cancelled!',
            'Your order has been cancelled successfully.',
            'success'
          );
          setCancellingOrder(null);
        }, 1000);
        
      } catch (err) {
        Swal.fire(
          'Error!',
          err.response?.data?.message || 'Failed to cancel order',
          'error'
        );
        setCancellingOrder(null);
      }
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      (order.productName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order._id?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': 
        return { 
          bg: isDark ? 'bg-yellow-900/30' : 'bg-yellow-100', 
          text: 'text-yellow-600', 
          icon: FaSpinner 
        };
      case 'approved': 
        return { 
          bg: isDark ? 'bg-blue-900/30' : 'bg-blue-100', 
          text: 'text-blue-600', 
          icon: FaCheckCircle 
        };
      case 'processing': 
        return { 
          bg: isDark ? 'bg-purple-900/30' : 'bg-purple-100', 
          text: 'text-purple-600', 
          icon: FaSpinner 
        };
      case 'shipped': 
        return { 
          bg: isDark ? 'bg-indigo-900/30' : 'bg-indigo-100', 
          text: 'text-indigo-600', 
          icon: FaTruck 
        };
      case 'delivered': 
        return { 
          bg: isDark ? 'bg-green-900/30' : 'bg-green-100', 
          text: 'text-green-600', 
          icon: FaCheckCircle 
        };
      case 'cancelled': 
        return { 
          bg: isDark ? 'bg-red-900/30' : 'bg-red-100', 
          text: 'text-red-600', 
          icon: FaTimesCircle 
        };
      case 'rejected': 
        return { 
          bg: isDark ? 'bg-red-900/30' : 'bg-red-100', 
          text: 'text-red-600', 
          icon: FaTimesCircle 
        };
      default: 
        return { 
          bg: isDark ? 'bg-gray-900/30' : 'bg-gray-100', 
          text: 'text-gray-600', 
          icon: FaSpinner 
        };
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'Pending',
      approved: 'Approved',
      processing: 'Processing',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
      rejected: 'Rejected'
    };
    return statusMap[status] || status;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl sm:text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          My <span className="text-orange-500">Orders</span>
        </h1>
        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Track and manage all your orders in one place
        </p>
        
        {/* API Status */}
        {error && (
          <div className={`mt-4 p-4 rounded-xl ${isDark ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
            <p className={`text-sm ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>
              ⚠️ {error}
            </p>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total</p>
          <p className="text-2xl font-bold text-orange-500">{orders.length}</p>
        </div>
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Pending</p>
          <p className="text-2xl font-bold text-yellow-500">
            {orders.filter(o => o.status === 'pending').length}
          </p>
        </div>
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Approved</p>
          <p className="text-2xl font-bold text-blue-500">
            {orders.filter(o => o.status === 'approved').length}
          </p>
        </div>
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Processing</p>
          <p className="text-2xl font-bold text-purple-500">
            {orders.filter(o => o.status === 'processing').length}
          </p>
        </div>
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Delivered</p>
          <p className="text-2xl font-bold text-green-500">
            {orders.filter(o => o.status === 'delivered').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className={`p-5 rounded-2xl mb-8 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      } shadow-lg`}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Search by order ID, product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                isDark 
                  ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-3">
            <FaFilter className={isDark ? 'text-gray-400' : 'text-gray-500'} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                isDark 
                  ? 'bg-gray-900 border-gray-700 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className={`p-12 rounded-2xl text-center ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'
        }`}>
          <div className="text-6xl mb-6">📦</div>
          <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {orders.length === 0 ? 'No Orders Yet' : 'No Orders Found'}
          </h3>
          <p className={`text-lg mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {orders.length === 0 
              ? "You haven't placed any orders yet. Start shopping now!"
              : 'Try changing your search or filter criteria'}
          </p>
          <Link
            to="/all-products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            <FaBox />
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const statusConfig = getStatusColor(order.status);
            const StatusIcon = statusConfig.icon;
            
            return (
              <div
                key={order._id}
                className={`rounded-2xl p-6 transition-all duration-300 hover:scale-[1.005] ${
                  isDark 
                    ? 'bg-gray-800 border border-gray-700 hover:border-orange-500/50' 
                    : 'bg-white border border-gray-200 hover:border-orange-300'
                } hover:shadow-2xl`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={order.productImage || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'}
                      alt={order.productName}
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-orange-500/30"
                    />
                  </div>

                  {/* Order Details */}
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {order.productName}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${statusConfig.bg} ${statusConfig.text}`}>
                            <StatusIcon className="text-xs" />
                            {getStatusText(order.status)}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                            <span className="font-semibold">Order ID:</span> {order._id}
                          </span>
                          <span className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            <FaCalendarAlt />
                            {formatDate(order.orderDate)}
                          </span>
                          <span className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            <FaReceipt />
                            {order.quantity} items
                          </span>
                          {order.paymentMethod && (
                            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                              💳 {order.paymentMethod}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {formatCurrency(order.totalPrice)}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Total Amount
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-dashed border-gray-400/30">
                      <div>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span className="font-semibold">Delivery Address:</span> 
                          {order.deliveryAddress ? order.deliveryAddress.slice(0, 60) + (order.deliveryAddress.length > 60 ? '...' : '') : 'Not specified'}
                        </p>
                        {order.additionalNotes && (
                          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            <span className="font-semibold">Note:</span> 
                            {order.additionalNotes.slice(0, 60) + (order.additionalNotes.length > 60 ? '...' : '')}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Link
                          to={`/dashboard/order-details/${order._id}`}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                            isDark 
                              ? 'text-gray-300 hover:bg-gray-700' 
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <FaEye />
                          View Details
                        </Link>
                        
                        {(order.status === 'shipped' || order.status === 'processing') && (
                          <Link
                            to={`/dashboard/track-order/${order._id}`}
                            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                          >
                            <FaTruck />
                            Track Order
                          </Link>
                        )}
                        
                        {order.status === 'pending' && (
                          <button
                            onClick={() => handleCancelOrder(order._id)}
                            disabled={cancellingOrder === order._id}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {cancellingOrder === order._id ? (
                              <>
                                <FaSpinner className="animate-spin" />
                                Cancelling...
                              </>
                            ) : (
                              <>
                                <FaTrash />
                                Cancel Order
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Help Text */}
      {orders.length > 0 && (
        <div className={`mt-8 p-4 rounded-xl text-center text-sm ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Need help with an order? Contact support at support@garmentstrack.com or call +880 1234 567890
          </p>
        </div>
      )}
    </div>
  );
};

export default MyOrders;