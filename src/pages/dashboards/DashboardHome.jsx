import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { FaShoppingCart, FaBox, FaUsers, FaCheckCircle, FaClock, FaChartLine } from 'react-icons/fa';

const DashboardHome = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();

  // Mock stats - will replace with real data later
  const stats = {
    buyer: [
      { label: 'Total Orders', value: '12', icon: FaShoppingCart, color: 'from-blue-500 to-blue-600' },
      { label: 'Pending Orders', value: '3', icon: FaClock, color: 'from-yellow-500 to-yellow-600' },
      { label: 'Completed Orders', value: '8', icon: FaCheckCircle, color: 'from-green-500 to-green-600' },
      { label: 'Total Spent', value: '৳24,500', icon: FaChartLine, color: 'from-purple-500 to-purple-600' },
    ],
    manager: [
      { label: 'Products Added', value: '25', icon: FaBox, color: 'from-blue-500 to-blue-600' },
      { label: 'Pending Orders', value: '18', icon: FaClock, color: 'from-yellow-500 to-yellow-600' },
      { label: 'Approved Orders', value: '42', icon: FaCheckCircle, color: 'from-green-500 to-green-600' },
      { label: 'Revenue', value: '৳1,24,500', icon: FaChartLine, color: 'from-purple-500 to-purple-600' },
    ],
    admin: [
      { label: 'Total Users', value: '156', icon: FaUsers, color: 'from-blue-500 to-blue-600' },
      { label: 'Active Products', value: '89', icon: FaBox, color: 'from-green-500 to-green-600' },
      { label: 'Total Orders', value: '234', icon: FaShoppingCart, color: 'from-purple-500 to-purple-600' },
      { label: 'Revenue', value: '৳4,56,789', icon: FaChartLine, color: 'from-orange-500 to-orange-600' },
    ]
  };

  const currentStats = stats[user?.role] || stats.buyer;
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className={`text-3xl sm:text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {greeting()}, <span className="text-orange-500">{user?.displayName?.split(' ')[0] || 'User'}</span>!
        </h1>
        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Welcome to your dashboard. Here's what's happening with your account.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {currentStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                isDark 
                  ? 'bg-gray-800/50 border border-gray-700 hover:border-gray-600' 
                  : 'bg-white border border-gray-200 hover:border-gray-300'
              } shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <Icon className="text-white text-xl" />
                </div>
                <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
                  isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>
                  Today
                </span>
              </div>
              <h3 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className={`rounded-2xl p-8 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-800' 
          : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {user?.role === 'buyer' && (
            <>
              <button className={`p-5 rounded-xl text-left transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
                  : 'bg-white hover:bg-gray-50 border border-gray-200'
              } hover:shadow-xl`}>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
                    <FaShoppingCart className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Place New Order
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Browse and order products
                    </p>
                  </div>
                </div>
              </button>
            </>
          )}
          
          {/* Common actions for all roles */}
          <button className={`p-5 rounded-xl text-left transition-all duration-300 hover:scale-105 ${
            isDark 
              ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
              : 'bg-white hover:bg-gray-50 border border-gray-200'
          } hover:shadow-xl`}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                <FaUsers className="text-white text-xl" />
              </div>
              <div>
                <h4 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Update Profile
                </h4>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Edit your personal information
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`rounded-2xl p-8 mt-8 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-800' 
          : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
      }`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Recent Activity
          </h2>
          <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
            isDark 
              ? 'text-gray-300 hover:bg-gray-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}>
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className={`p-4 rounded-xl transition-all duration-300 hover:scale-[1.01] ${
              isDark 
                ? 'bg-gray-800/30 hover:bg-gray-800/50' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-gray-700' : 'bg-white'
                }`}>
                  <FaShoppingCart className={`text-lg ${isDark ? 'text-orange-400' : 'text-orange-500'}`} />
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Order #{12345 + item} placed
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Premium Cotton Shirt • 2 hours ago
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                }`}>
                  Completed
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;