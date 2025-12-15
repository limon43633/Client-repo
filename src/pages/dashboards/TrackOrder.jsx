import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { orderAPI } from '../../services/api';
import { FaMapMarkerAlt, FaTruck, FaCheckCircle, FaClock, FaBox, FaHome, FaShoppingCart, FaCreditCard, FaPhone, FaUser } from 'react-icons/fa';
import toast from 'react-hot-toast';

const TrackOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  
  const orderId = location.state?.orderId;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(!!orderId);
  const [searchId, setSearchId] = useState(orderId || '');
  const [trackingSteps, setTrackingSteps] = useState([]);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails(orderId);
    }
  }, [orderId]);

  const fetchOrderDetails = async (id) => {
    setLoading(true);
    try {
      const response = await orderAPI.getOrderById(id);
      setOrder(response.data.data);
      updateTrackingSteps(response.data.data?.status);
    } catch (error) {
      console.error('Error fetching order:', error);
      toast.error('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const updateTrackingSteps = (status) => {
    const steps = [
      { status: 'Order Placed', icon: FaShoppingCart, active: true },
      { status: 'Processing', icon: FaClock, active: false },
      { status: 'Approved', icon: FaCheckCircle, active: false },
      { status: 'Shipped', icon: FaTruck, active: false },
      { status: 'Delivered', icon: FaHome, active: false }
    ];

    const statusIndex = {
      'pending': 1,
      'approved': 2,
      'shipped': 3,
      'delivered': 4
    };

    const activeIndex = statusIndex[status] || 0;
    
    const updatedSteps = steps.map((step, index) => ({
      ...step,
      active: index <= activeIndex
    }));

    setTrackingSteps(updatedSteps);
  };

  const handleSearch = () => {
    if (!searchId.trim()) {
      toast.error('Please enter an Order ID');
      return;
    }
    fetchOrderDetails(searchId);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl sm:text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Track <span className="text-orange-500">Order</span>
        </h1>
        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {order ? `Tracking Order #${order._id?.slice(-8).toUpperCase()}` : 'Track your order in real-time'}
        </p>
      </div>

      {/* Search Order */}
      {!order && (
        <div className={`p-8 rounded-2xl mb-8 ${
          isDark ? 'bg-[#111827] border border-white/10' : 'bg-white border border-gray-200'
        } shadow-xl`}>
          <div className="max-w-2xl mx-auto">
            <h3 className={`text-xl font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Enter Order ID
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter Order ID (e.g., ORD001234)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className={`flex-1 px-5 py-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg ${
                  isDark 
                    ? 'bg-[#0b0f14] border-gray-700 text-white placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <button
                onClick={handleSearch}
                className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
              >
                Track Order
              </button>
            </div>
            <p className={`text-sm text-center mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              You can find your Order ID in the confirmation email or in My Orders page
            </p>
          </div>
        </div>
      )}

      {order && (
        <>
          {/* Tracking Timeline */}
          <div className={`rounded-2xl p-6 mb-8 ${
            isDark ? 'bg-[#111827] border border-white/10' : 'bg-white border border-gray-200'
          } shadow-xl`}>
            <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Order Status
            </h3>
            
            <div className="relative">
              {/* Progress Line */}
              <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${
                isDark ? 'bg-gray-700' : 'bg-gray-300'
              }`}></div>
              
              <div className="space-y-10">
                {trackingSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="flex items-start gap-6 relative">
                      {/* Icon */}
                      <div className={`relative z-10 p-4 rounded-full transition-all duration-500 ${
                        step.active 
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30' 
                          : 'bg-gray-500/30 text-gray-500'
                      }`}>
                        <Icon size={24} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 pt-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {step.status}
                            </h4>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {step.active ? 'Completed' : 'Pending'}
                            </p>
                          </div>
                          {step.active && index === trackingSteps.findIndex(s => s.active === true) && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 animate-pulse">
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Delivery Details */}
            <div className={`p-6 rounded-2xl ${
              isDark ? 'bg-[#111827] border border-white/10' : 'bg-white border border-gray-200'
            } shadow-xl`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
                  <FaMapMarkerAlt className="text-white text-xl" />
                </div>
                <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Delivery Details
                </h4>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaUser className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Recipient</p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {order.userName}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FaPhone className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Contact</p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {order.contactNumber}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Address</p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {order.deliveryAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className={`p-6 rounded-2xl ${
              isDark ? 'bg-[#111827] border border-white/10' : 'bg-white border border-gray-200'
            } shadow-xl`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600">
                  <FaBox className="text-white text-xl" />
                </div>
                <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Order Summary
                </h4>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Product</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {order.productTitle}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Quantity</span>
                  <span className="font-medium text-orange-500">
                    {order.orderQuantity} pieces
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Unit Price</span>
                  <span className="font-medium">৳{order.productPrice}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Payment Method</span>
                  <span className="font-medium">{order.paymentOption}</span>
                </div>
                
                <div className="pt-4 border-t border-dashed border-gray-400/30">
                  <div className="flex justify-between items-center">
                    <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-orange-500">
                      ৳{order.orderPrice?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className={`rounded-2xl p-6 ${
            isDark ? 'bg-[#111827] border border-white/10' : 'bg-white border border-gray-200'
          } shadow-xl`}>
            <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Order Timeline
            </h3>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-xl ${isDark ? 'bg-[#0b0f14]' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <FaShoppingCart className={isDark ? 'text-orange-400' : 'text-orange-500'} />
                    <div>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Order Placed
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {formatDate(order.orderDate)}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400">
                    Completed
                  </span>
                </div>
              </div>
              
              {order.additionalNotes && (
                <div className={`p-4 rounded-xl ${isDark ? 'bg-[#0b0f14]' : 'bg-gray-50'}`}>
                  <p className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Additional Notes
                  </p>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {order.additionalNotes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Help Section */}
      <div className={`mt-8 p-6 rounded-2xl text-center ${
        isDark ? 'bg-gradient-to-r from-[#111827] to-[#1a1f2e]' : 'bg-gradient-to-r from-gray-50 to-white'
      } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
        <h4 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Need Help?
        </h4>
        <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Having issues with your order? Our support team is here to help!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/dashboard/my-orders')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              isDark 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Back to My Orders
          </button>
          <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;