// client/src/pages/dashboards/TrackOrder.jsx - UPDATED
import { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { orderAPI } from '../../services/api';
import { 
  FaTruck, 
  FaMapMarkerAlt, 
  FaCalendarAlt,
  FaCheckCircle,
  FaSpinner,
  FaBox,
  FaShippingFast,
  FaHome,
  FaArrowLeft
} from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';

const TrackOrder = () => {
  const { isDark } = useTheme();
  const location = useLocation();
  const { orderId } = useParams();
  
  // Set page title
  useEffect(() => {
    document.title = 'Track Order | Garments Tracker';
    return () => {
      document.title = 'Garments Tracker';
    };
  }, []);
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get orderId from params or location state
  const currentOrderId = orderId || location.state?.orderId;

  // Track status options
  const trackStatusOptions = [
    { 
      id: 'ordered', 
      title: 'Order Placed', 
      description: 'Your order has been received',
      icon: '📝',
      color: 'blue'
    },
    { 
      id: 'confirmed', 
      title: 'Order Confirmed', 
      description: 'Order has been confirmed by seller',
      icon: '✅',
      color: 'green'
    },
    { 
      id: 'processing', 
      title: 'Processing', 
      description: 'Preparing your order for shipment',
      icon: '⚙️',
      color: 'purple'
    },
    { 
      id: 'cutting', 
      title: 'Cutting', 
      description: 'Fabric cutting in progress',
      icon: '✂️',
      color: 'indigo'
    },
    { 
      id: 'sewing', 
      title: 'Sewing', 
      description: 'Garment sewing in progress',
      icon: '🧵',
      color: 'pink'
    },
    { 
      id: 'finishing', 
      title: 'Finishing', 
      description: 'Final touches and quality check',
      icon: '✨',
      color: 'yellow'
    },
    { 
      id: 'packed', 
      title: 'Packed', 
      description: 'Order packed and ready for shipping',
      icon: '📦',
      color: 'orange'
    },
    { 
      id: 'shipped', 
      title: 'Shipped', 
      description: 'Order has been shipped',
      icon: '🚚',
      color: 'red'
    },
    { 
      id: 'delivered', 
      title: 'Delivered', 
      description: 'Order delivered successfully',
      icon: '🏠',
      color: 'emerald'
    }
  ];

  // Mock order data for demo
  const getMockOrder = () => {
    return {
      _id: currentOrderId || 'ORD123456',
      productName: 'Premium Cotton T-Shirt',
      productImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      quantity: 5,
      totalPrice: 2500,
      orderDate: '2024-01-15',
      status: 'processing',
      currentStatus: 'sewing',
      trackingUpdates: [
        {
          status: 'ordered',
          date: '2024-01-15T10:00:00Z',
          location: 'Online Store',
          notes: 'Order placed successfully'
        },
        {
          status: 'confirmed',
          date: '2024-01-15T11:30:00Z',
          location: 'Seller',
          notes: 'Order confirmed and payment received'
        },
        {
          status: 'processing',
          date: '2024-01-16T09:15:00Z',
          location: 'Factory',
          notes: 'Order processing started'
        },
        {
          status: 'cutting',
          date: '2024-01-17T14:20:00Z',
          location: 'Cutting Department',
          notes: 'Fabric cutting completed'
        },
        {
          status: 'sewing',
          date: '2024-01-18T10:45:00Z',
          location: 'Sewing Department',
          notes: 'Sewing in progress'
        }
      ],
      buyerName: 'John Doe',
      buyerEmail: 'john@example.com',
      deliveryAddress: '123 Main Street, Dhaka, Bangladesh',
      estimatedDelivery: '2024-01-25'
    };
  };

  // Fetch order details
  const fetchOrderDetails = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (currentOrderId) {
        // Real API call
        // const response = await orderAPI.getOrderById(currentOrderId);
        // setOrder(response.data);
        
        // For demo - use mock data
        setTimeout(() => {
          setOrder(getMockOrder());
          setLoading(false);
        }, 1000);
      } else {
        // If no orderId, show demo data
        setOrder(getMockOrder());
        setLoading(false);
      }
    } catch (err) {
      console.error('Error fetching order details:', err);
      setError('Failed to load order details. Using demo data.');
      setOrder(getMockOrder());
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [currentOrderId]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(amount || 0);
  };

  // Get current status index
  const getCurrentStatusIndex = () => {
    if (!order?.currentStatus) return 0;
    const index = trackStatusOptions.findIndex(status => status.id === order.currentStatus);
    return index >= 0 ? index : 0;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading order details...
          </p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className={`p-12 rounded-2xl text-center ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'
      }`}>
        <div className="text-6xl mb-6">📭</div>
        <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          No Order Selected
        </h3>
        <p className={`text-lg mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Please select an order to track its progress.
        </p>
        <Link
          to="/dashboard/my-orders"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
        >
          <FaArrowLeft />
          Go to My Orders
        </Link>
      </div>
    );
  }

  const currentStatusIndex = getCurrentStatusIndex();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className={`text-3xl sm:text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Track <span className="text-orange-500">Order</span>
            </h1>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Real-time tracking of your garment production & delivery
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              order.status === 'delivered' 
                ? 'bg-green-500/20 text-green-600'
                : order.status === 'shipped'
                ? 'bg-orange-500/20 text-orange-600'
                : 'bg-blue-500/20 text-blue-600'
            }`}>
              {order.status.toUpperCase()}
            </span>
            <Link
              to="/dashboard/my-orders"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isDark 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <FaArrowLeft />
              Back to Orders
            </Link>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className={`mb-6 p-4 rounded-xl ${isDark ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
            <p className={`text-sm ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>
              ⚠️ {error}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Order Info & Progress */}
        <div className="lg:col-span-2 space-y-8">
          {/* Order Summary */}
          <div className={`rounded-2xl p-6 ${
            isDark 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          } shadow-xl`}>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <img
                  src={order.productImage}
                  alt={order.productName}
                  className="w-32 h-32 rounded-2xl object-cover border-2 border-orange-500/30"
                />
              </div>

              {/* Order Details */}
              <div className="flex-1">
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {order.productName}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <FaBox className="text-orange-500" />
                      <span><strong>Order ID:</strong> {order._id}</span>
                    </div>
                    <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <FaCalendarAlt className="text-orange-500" />
                      <span><strong>Order Date:</strong> {formatDate(order.orderDate)}</span>
                    </div>
                    <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <strong>Quantity:</strong> {order.quantity} units
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <strong>Total Price:</strong> {formatCurrency(order.totalPrice)}
                    </div>
                    {order.estimatedDelivery && (
                      <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <FaShippingFast className="text-green-500" />
                        <span><strong>Estimated Delivery:</strong> {formatDate(order.estimatedDelivery)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Delivery Address */}
                <div className={`mt-6 p-4 rounded-xl ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                  <div className="flex items-start gap-2">
                    <FaMapMarkerAlt className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <div>
                      <p className={`font-semibold mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Delivery Address
                      </p>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {order.deliveryAddress}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Progress */}
          <div className={`rounded-2xl p-6 ${
            isDark 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          } shadow-xl`}>
            <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <FaTruck className="inline mr-2 text-orange-500" />
              Production & Shipping Progress
            </h2>
            
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Current Status: {trackStatusOptions[currentStatusIndex]?.title}
                </span>
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {Math.round((currentStatusIndex + 1) / trackStatusOptions.length * 100)}% Complete
                </span>
              </div>
              
              <div className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600"
                  style={{ width: `${((currentStatusIndex + 1) / trackStatusOptions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              {trackStatusOptions.map((status, index) => {
                const isCompleted = index <= currentStatusIndex;
                const isCurrent = index === currentStatusIndex;
                const update = order.trackingUpdates?.find(u => u.status === status.id);
                
                return (
                  <div key={status.id} className="flex">
                    {/* Timeline Line & Icon */}
                    <div className="flex flex-col items-center mr-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                        isCompleted 
                          ? `bg-${status.color}-500 text-white` 
                          : isDark 
                            ? 'bg-gray-700 text-gray-400' 
                            : 'bg-gray-200 text-gray-400'
                      } ${isCurrent ? 'ring-2 ring-offset-2 ring-orange-500' : ''}`}>
                        {isCompleted ? '✓' : status.icon}
                      </div>
                      {index < trackStatusOptions.length - 1 && (
                        <div className={`w-1 flex-1 my-2 ${
                          isCompleted ? `bg-${status.color}-500` : isDark ? 'bg-gray-700' : 'bg-gray-200'
                        }`}></div>
                      )}
                    </div>

                    {/* Status Details */}
                    <div className={`flex-1 pb-6 ${index < trackStatusOptions.length - 1 ? 'border-b border-dashed border-gray-400/30' : ''}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {status.title}
                          </h4>
                          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {status.description}
                          </p>
                          
                          {update && (
                            <div className={`mt-2 p-3 rounded-lg ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {update.notes}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <FaMapMarkerAlt className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                                  {update.location}
                                </span>
                                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                                  • {formatDate(update.date)}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {update && (
                          <div className={`text-right text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {formatDate(update.date)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Quick Info */}
        <div className="space-y-6">
          {/* Current Status Card */}
          <div className={`rounded-2xl p-6 ${
            isDark 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          } shadow-xl`}>
            <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Current Status
            </h3>
            
            <div className="text-center mb-4">
              <div className="text-6xl mb-3">
                {trackStatusOptions[currentStatusIndex]?.icon}
              </div>
              <h4 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {trackStatusOptions[currentStatusIndex]?.title}
              </h4>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {trackStatusOptions[currentStatusIndex]?.description}
              </p>
            </div>
            
            <div className={`mt-4 p-3 rounded-lg text-center ${
              isDark ? 'bg-gray-900/50' : 'bg-gray-50'
            }`}>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Next: {trackStatusOptions[currentStatusIndex + 1]?.title || 'Delivery Complete'}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={`rounded-2xl p-6 ${
            isDark 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          } shadow-xl`}>
            <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Quick Actions
            </h3>
            
            <div className="space-y-3">
              <Link
                to={`/dashboard/order-details/${order._id}`}
                className={`block p-3 rounded-lg text-center ${
                  isDark 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                View Order Details
              </Link>
              
              <button
                onClick={() => window.print()}
                className={`w-full p-3 rounded-lg ${
                  isDark 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Print Tracking Info
              </button>
              
              <a
                href={`mailto:support@garmentstracker.com?subject=Order Inquiry: ${order._id}`}
                className={`block p-3 rounded-lg text-center ${
                  isDark 
                    ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                Contact Support
              </a>
            </div>
          </div>

          {/* Support Info */}
          <div className={`rounded-2xl p-6 ${
            isDark 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          } shadow-xl`}>
            <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <FaTruck className="inline mr-2 text-orange-500" />
              Shipping Information
            </h3>
            
            <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>• Standard delivery: 7-14 business days</li>
              <li>• Express delivery available (+৳200)</li>
              <li>• Free shipping on orders above ৳3000</li>
              <li>• Track your order 24/7</li>
              <li>• Contact: support@garmentstracker.com</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;