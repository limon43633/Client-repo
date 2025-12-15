import { useTheme } from '../../contexts/ThemeContext';
import { FaMapMarkerAlt, FaTruck, FaCheckCircle, FaClock } from 'react-icons/fa';

const TrackOrder = () => {
  const { isDark } = useTheme();
  
  const trackingSteps = [
    { status: 'Order Placed', date: 'Jan 15, 2024', icon: FaCheckCircle, active: true },
    { status: 'Processing', date: 'Jan 16, 2024', icon: FaClock, active: true },
    { status: 'Shipped', date: 'Jan 18, 2024', icon: FaTruck, active: true },
    { status: 'Out for Delivery', date: 'Jan 20, 2024', icon: FaMapMarkerAlt, active: false },
    { status: 'Delivered', date: 'Estimated Jan 22, 2024', icon: FaCheckCircle, active: false }
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl sm:text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Track <span className="text-orange-500">Order</span>
        </h1>
        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Track your order in real-time
        </p>
      </div>

      {/* Search Order */}
      <div className={`p-6 rounded-2xl mb-8 ${
        isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/50 border border-gray-200'
      }`}>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter Order ID (e.g., ORD001234)"
            className={`flex-1 px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              isDark 
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
          <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">
            Track Order
          </button>
        </div>
      </div>

      {/* Tracking Timeline */}
      <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Order #ORD001234
        </h3>
        
        <div className="space-y-8">
          {trackingSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex items-start gap-4">
                {/* Icon */}
                <div className={`p-3 rounded-full ${step.active ? 'bg-orange-500' : 'bg-gray-500/30'}`}>
                  <Icon className={`text-lg ${step.active ? 'text-white' : isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {step.status}
                      </h4>
                      <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {step.date}
                      </p>
                    </div>
                    {step.active && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                        Current
                      </span>
                    )}
                  </div>
                  
                  {index < trackingSteps.length - 1 && (
                    <div className={`h-8 w-0.5 ml-3.5 mt-3 ${step.active ? 'bg-orange-500' : isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Details */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mt-8`}>
        <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Delivery Details</h4>
          <div className="space-y-3">
            <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              <span className="font-semibold">Address:</span> 123 Street, Dhaka, Bangladesh
            </p>
            <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              <span className="font-semibold">Contact:</span> +880 1234 567890
            </p>
            <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              <span className="font-semibold">Delivery Agent:</span> Sundarban Couriers
            </p>
          </div>
        </div>
        
        <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Order Summary</h4>
          <div className="space-y-3">
            <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              <span className="font-semibold">Product:</span> Premium Cotton Shirt
            </p>
            <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              <span className="font-semibold">Quantity:</span> 10 pieces
            </p>
            <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              <span className="font-semibold">Total:</span> <span className="text-orange-500 font-bold">৳12,000</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;