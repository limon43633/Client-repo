import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { orderAPI } from '../../services/api';
import { FaSearch, FaFilter, FaEye, FaCalendarAlt, FaReceipt, FaBox, FaTruck, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const MyOrders = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Fetch user's orders
  const fetchUserOrders = async () => {
    if (!user?.uid) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await orderAPI.getUserOrders(user.uid);
      setOrders(response.data.data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders');
      toast.error('Failed to load your orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [user]);

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      (order.productTitle?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order._id?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': 
        return { bg: 'bg-yellow-500/20', text: 'text-yellow-600', icon: FaSpinner };
      case 'approved': 
        return { bg: 'bg-blue-500/20', text: 'text-blue-600', icon: FaCheckCircle };
      case 'shipped': 
        return { bg: 'bg-purple-500/20', text: 'text-purple-600', icon: FaTruck };
      case 'delivered': 
        return { bg: 'bg-green-500/20', text: 'text-green-600', icon: FaBox };
      case 'cancelled': 
        return { bg: 'bg-red-500/20', text: 'text-red-600', icon: FaTimesCircle };
      default: 
        return { bg: 'bg-gray-500/20', text: 'text-gray-600', icon: FaSpinner };
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'Pending',
      approved: 'Approved',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled'
    };
    return statusMap[status] || status;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
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
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl sm:text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          My <span className="text-orange-500">Orders</span>
        </h1>
        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Track and manage all your orders in one place
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#111827]' : 'bg-white'} border ${isDark ? 'border-white/10' : 'border-gray-200'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total</p>
          <p className="text-2xl font-bold text-orange-500">{orders.length}</p>
        </div>
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#111827]' : 'bg-white'} border ${isDark ? 'border-white/10' : 'border-gray-200'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Pending</p>
          <p className="text-2xl font-bold text-yellow-500">
            {orders.filter(o => o.status === 'pending').length}
          </p>
        </div>
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#111827]' : 'bg-white'} border ${isDark ? 'border-white/10' : 'border-gray-200'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Approved</p>
          <p className="text-2xl font-bold text-blue-500">
            {orders.filter(o => o.status === 'approved').length}
          </p>
        </div>
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#111827]' : 'bg-white'} border ${isDark ? 'border-white/10' : 'border-gray-200'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Shipped</p>
          <p className="text-2xl font-bold text-purple-500">
            {orders.filter(o => o.status === 'shipped').length}
          </p>
        </div>
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#111827]' : 'bg-white'} border ${isDark ? 'border-white/10' : 'border-gray-200'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Delivered</p>
          <p className="text-2xl font-bold text-green-500">
            {orders.filter(o => o.status === 'delivered').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className={`p-5 rounded-2xl mb-8 ${
        isDark ? 'bg-[#111827] border border-white/10' : 'bg-white border border-gray-200'
      } shadow-lg`}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Search by order ID or product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                isDark 
                  ? 'bg-[#0b0f14] border-gray-700 text-white placeholder-gray-500' 
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
                  ? 'bg-[#0b0f14] border-gray-700 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {error ? (
        <div className={`p-8 rounded-2xl text-center ${isDark ? 'bg-red-500/10' : 'bg-red-50'}`}>
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={fetchUserOrders}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className={`p-12 rounded-2xl text-center ${
          isDark ? 'bg-[#111827] border border-white/10' : 'bg-gray-50 border border-gray-200'
        }`}>
          <div className="text-6xl mb-6">📦</div>
          <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {orders.length === 0 ? 'No Orders Yet' : 'No Orders Found'}
          </h3>
          <p className={`text-lg mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {orders.length === 0 
              ? 'You haven\'t placed any orders yet. Start shopping now!'
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
                    ? 'bg-[#111827] border border-white/10 hover:border-orange-500/30' 
                    : 'bg-white border border-gray-200 hover:border-orange-300'
                } hover:shadow-2xl`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={order.productImage || 'https://via.placeholder.com/150'}
                      alt={order.productTitle}
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-orange-500/30"
                    />
                  </div>

                  {/* Order Details */}
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {order.productTitle}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusConfig.bg} ${statusConfig.text}`}>
                            <StatusIcon className="inline mr-1" />
                            {getStatusText(order.status)}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                            <span className="font-semibold">Order ID:</span> {order._id?.slice(-8).toUpperCase()}
                          </span>
                          <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                            <FaCalendarAlt className="inline mr-1" />
                            {formatDate(order.orderDate)}
                          </span>
                          <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                            <FaReceipt className="inline mr-1" />
                            {order.orderQuantity} items
                          </span>
                          {order.paymentOption && (
                            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                              💳 {order.paymentOption}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          ৳{order.orderPrice?.toLocaleString()}
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
                          <span className="font-semibold">Delivery Address:</span> {order.deliveryAddress?.slice(0, 50)}...
                        </p>
                        {order.additionalNotes && (
                          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            <span className="font-semibold">Note:</span> {order.additionalNotes.slice(0, 60)}...
                          </p>
                        )}
                      </div>
                      
                      <div className="flex gap-3">
                        <Link
                          to={`/dashboard/track-order`}
                          state={{ orderId: order._id }}
                          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                            isDark 
                              ? 'text-gray-300 hover:bg-gray-800' 
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <FaEye />
                          View Details
                        </Link>
                        
                        {order.status === 'shipped' && (
                          <Link
                            to={`/dashboard/track-order`}
                            state={{ orderId: order._id }}
                            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                          >
                            <FaTruck />
                            Track Order
                          </Link>
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
        <div className={`mt-8 p-4 rounded-xl text-center text-sm ${isDark ? 'bg-[#111827]/50' : 'bg-gray-50'}`}>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Need help with an order? Contact support at support@garmentstrack.com
          </p>
        </div>
      )}
    </div>
  );
};

export default MyOrders;