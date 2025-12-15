import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { FaSearch, FaFilter, FaEye, FaCalendarAlt, FaReceipt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - will replace with API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockOrders = [
        {
          id: 'ORD001',
          productName: 'Premium Cotton Shirt',
          productImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=150',
          quantity: 10,
          totalPrice: 12000,
          status: 'pending',
          orderDate: '2024-01-15',
          estimatedDelivery: '2024-01-25'
        },
        {
          id: 'ORD002',
          productName: 'Slim Fit Denim Jeans',
          productImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=150',
          quantity: 5,
          totalPrice: 9000,
          status: 'approved',
          orderDate: '2024-01-10',
          estimatedDelivery: '2024-01-20'
        },
        {
          id: 'ORD003',
          productName: 'Winter Jacket Premium',
          productImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=150',
          quantity: 3,
          totalPrice: 10500,
          status: 'shipped',
          orderDate: '2024-01-05',
          estimatedDelivery: '2024-01-18'
        },
        {
          id: 'ORD004',
          productName: 'Designer Hoodie',
          productImage: 'https://i.ibb.co.com/yFf9yD74/ai-generated-a-black-hooded-sweatshirt-hangs-on-a-gray-wall-free-photo.jpg',
          quantity: 15,
          totalPrice: 12000,
          status: 'delivered',
          orderDate: '2024-01-01',
          estimatedDelivery: '2024-01-12'
        },
        {
          id: 'ORD005',
          productName: 'Casual T-Shirt Pack',
          productImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150',
          quantity: 20,
          totalPrice: 12000,
          status: 'cancelled',
          orderDate: '2023-12-28',
          estimatedDelivery: '2024-01-10'
        }
      ];
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-600';
      case 'approved': return 'bg-blue-500/20 text-blue-600';
      case 'shipped': return 'bg-purple-500/20 text-purple-600';
      case 'delivered': return 'bg-green-500/20 text-green-600';
      case 'cancelled': return 'bg-red-500/20 text-red-600';
      default: return 'bg-gray-500/20 text-gray-600';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-500"></div>
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Orders</p>
          <p className="text-2xl font-bold text-orange-500">{orders.length}</p>
        </div>
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Pending</p>
          <p className="text-2xl font-bold text-yellow-500">
            {orders.filter(o => o.status === 'pending').length}
          </p>
        </div>
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Shipped</p>
          <p className="text-2xl font-bold text-purple-500">
            {orders.filter(o => o.status === 'shipped').length}
          </p>
        </div>
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Delivered</p>
          <p className="text-2xl font-bold text-green-500">
            {orders.filter(o => o.status === 'delivered').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className={`p-5 rounded-2xl mb-8 ${
        isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/50 border border-gray-200'
      }`}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Search orders by ID or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
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
                  ? 'bg-gray-800 border-gray-700 text-white' 
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

      {/* Orders Table/Grid */}
      {filteredOrders.length === 0 ? (
        <div className={`text-center py-16 rounded-2xl ${
          isDark ? 'bg-gray-800/30' : 'bg-gray-50'
        }`}>
          <div className="text-6xl mb-4">📦</div>
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            No orders found
          </h3>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            {searchTerm || filterStatus !== 'all' 
              ? 'Try changing your search or filter'
              : 'You haven\'t placed any orders yet'}
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <Link
              to="/all-products"
              className="inline-block mt-4 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors"
            >
              Browse Products
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className={`rounded-2xl p-5 transition-all duration-300 hover:scale-[1.01] ${
                isDark 
                  ? 'bg-gray-800/50 border border-gray-700 hover:border-gray-600' 
                  : 'bg-white border border-gray-200 hover:border-gray-300'
              } hover:shadow-xl`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-5">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={order.productImage}
                    alt={order.productName}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                </div>

                {/* Order Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                    <div>
                      <h3 className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {order.productName}
                      </h3>
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Order ID: <span className="font-semibold">{order.id}</span>
                        </span>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          <FaCalendarAlt className="inline mr-1" />
                          {new Date(order.orderDate).toLocaleDateString()}
                        </span>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          <FaReceipt className="inline mr-1" />
                          {order.quantity} items
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        ৳{order.totalPrice.toLocaleString()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-400/30">
                    <div>
                      {order.estimatedDelivery && (
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Est. delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isDark 
                          ? 'text-gray-300 hover:bg-gray-700' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}>
                        <FaEye className="inline mr-2" />
                        View Details
                      </button>
                      {order.status === 'shipped' && (
                        <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors">
                          Track Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredOrders.length > 0 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button className={`px-4 py-2 rounded-lg ${isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}>
            Previous
          </button>
          <button className={`px-4 py-2 rounded-lg bg-orange-500 text-white`}>1</button>
          <button className={`px-4 py-2 rounded-lg ${isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}>2</button>
          <button className={`px-4 py-2 rounded-lg ${isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyOrders;