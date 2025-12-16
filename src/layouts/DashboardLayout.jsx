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
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? 'bg-[#0b0f14]' : 'bg-gray-50'
        }`}
      >
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
    <div
      className={`min-h-screen ${
        isDark ? 'bg-[#0b0f14] text-gray-200' : 'bg-gray-100 text-gray-900'
      }`}
    >
      {/* Mobile Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl transition-all ${
          isDark
            ? 'bg-white/10 backdrop-blur-xl border border-white/10'
            : 'bg-white border border-gray-300'
        }`}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className={`lg:hidden fixed inset-0 z-40 ${
            isDark ? 'bg-black/70 backdrop-blur-sm' : 'bg-black/40'
          }`}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 h-screen w-72 z-40
          transition-all duration-500 ease-out
          ${sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
          lg:translate-x-0 lg:opacity-100
          ${
            isDark
              ? 'bg-white/5 backdrop-blur-2xl border-r border-white/10 shadow-2xl'
              : 'bg-white border-r border-gray-200'
          }`}
        >
          <div className="p-6 h-full flex flex-col">
            {/* User Card */}
            <div
              className={`mb-8 p-4 rounded-2xl ${
                isDark
                  ? 'bg-white/5 border border-white/10'
                  : 'bg-gray-100 border border-gray-200'
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.displayName || 'User'
                    )}&background=f97316&color=fff`
                  }
                  className="w-12 h-12 rounded-full border-2 border-orange-500"
                />
                <div>
                  <p className="font-semibold truncate">{user.displayName}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
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
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
                    ${
                      active
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                        : isDark
                        ? 'hover:bg-white/5 hover:translate-x-1'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Icon />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <button
                onClick={handleLogout}
                className={`w-full flex items-center gap-4 px-4 py-3 mt-6 rounded-xl transition
                ${
                  isDark
                    ? 'text-red-400 hover:bg-red-500/10'
                    : 'text-red-600 hover:bg-red-50'
                }`}
              >
                <FaSignOutAlt />
                Logout
              </button>
            </nav>

            <Link
              to="/"
              className={`mt-6 flex items-center gap-3 px-4 py-3 rounded-xl transition
              ${
                isDark
                  ? 'border border-white/10 hover:bg-white/5'
                  : 'border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <FaHome /> Back to Home
            </Link>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div
            className={`min-h-full rounded-3xl p-6 sm:p-8 shadow-xl
            ${
              isDark
                ? 'bg-white/5 backdrop-blur-2xl border border-white/10'
                : 'bg-white border border-gray-200'
            }`}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;