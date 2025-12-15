import { Navigate, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaPlus,
  FaClipboardList,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaUser,
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaSignOutAlt
} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const DashboardLayout = () => {
  const { user, loading, logout } = useAuth();
  const { isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch {
      toast.error('Logout failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0f14]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const getMenuItems = () => {
    const base = [{ path: '/dashboard', icon: FaTachometerAlt, label: 'Dashboard', exact: true }];

    if (user.role === 'admin') {
      return [
        ...base,
        { path: '/dashboard/manage-users', icon: FaUsers, label: 'Manage Users' },
        { path: '/dashboard/all-products', icon: FaBox, label: 'All Products' },
        { path: '/dashboard/all-orders', icon: FaShoppingCart, label: 'All Orders' },
        { path: '/dashboard/profile', icon: FaUser, label: 'My Profile' }
      ];
    }

    if (user.role === 'manager') {
      return [
        ...base,
        { path: '/dashboard/add-product', icon: FaPlus, label: 'Add Product' },
        { path: '/dashboard/manage-products', icon: FaBox, label: 'Manage Products' },
        { path: '/dashboard/pending-orders', icon: FaClipboardList, label: 'Pending Orders' },
        { path: '/dashboard/approved-orders', icon: FaCheckCircle, label: 'Approved Orders' },
        { path: '/dashboard/profile', icon: FaUser, label: 'My Profile' }
      ];
    }

    return [
      ...base,
      { path: '/dashboard/my-orders', icon: FaShoppingCart, label: 'My Orders' },
      { path: '/dashboard/track-order', icon: FaMapMarkerAlt, label: 'Track Order' },
      { path: '/dashboard/profile', icon: FaUser, label: 'My Profile' }
    ];
  };

  const isActive = (path, exact = false) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-[#0b0f14] text-gray-200">
      {/* Mobile Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl transition-all ${
          sidebarOpen 
            ? 'bg-orange-500 text-white' 
            : 'bg-[#111827] border border-white/10 hover:bg-[#1f2937]'
        }`}
        aria-label="Toggle menu"
      >
        {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 h-screen w-72 z-40 transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 bg-[#111827] border-r border-white/10 shadow-2xl`}
        >
          <div className="p-6 h-full flex flex-col">
            {/* User Card */}
            <div className="mb-8 p-4 rounded-2xl bg-gradient-to-br from-[#0b0f14] to-[#1a1f2e] border border-white/10 hover:border-orange-500/30 transition-colors">
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=f97316&color=fff`
                  }
                  className="w-12 h-12 rounded-full border-2 border-orange-500 object-cover"
                  alt={user.displayName || 'User'}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate">{user.displayName || 'User'}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
              </div>
              
              {/* Role Badge */}
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  user.role === 'admin'
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                    : user.role === 'manager'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                    : 'bg-gradient-to-r from-green-600 to-green-700 text-white'
                }`}>
                  {user.role?.toUpperCase() || 'BUYER'}
                </span>
              </div>
            </div>

            {/* Menu */}
            <nav className="space-y-2 flex-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path, item.exact);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => isMobile && setSidebarOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                      active
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25'
                        : 'hover:bg-white/5 text-gray-300 hover:text-white'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{item.label}</span>
                    {active && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse"></div>
                    )}
                  </Link>
                );
              })}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 mt-8 border-t border-white/10 pt-4"
              >
                <FaSignOutAlt size={18} />
                <span className="font-medium">Logout</span>
              </button>
            </nav>

            {/* Back to Home */}
            <Link
              to="/"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 mt-4 rounded-xl border border-white/10 hover:bg-white/5 transition-all duration-300"
            >
              <FaHome size={18} />
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full min-h-screen">
          <div className="min-h-full rounded-3xl bg-gradient-to-br from-[#111827] to-[#1a1f2e] border border-white/10 p-6 sm:p-8 shadow-2xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;