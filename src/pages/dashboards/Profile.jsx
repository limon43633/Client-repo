// client/src/pages/dashboard/Profile.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { userAPI, orderAPI } from '../../services/api';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaSave, 
  FaEdit, 
  FaCamera,
  FaShieldAlt,
  FaBell,
  FaLock,
  FaSignOutAlt,
  FaExclamationTriangle,
  FaBox,
  FaDollarSign,
  FaChartLine
} from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Profile = () => {
  const { user, logout, updateUserProfile } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  
  // Set page title
  useEffect(() => {
    document.title = 'My Profile | Garments Tracker';
    return () => {
      document.title = 'Garments Tracker';
    };
  }, []);
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    pendingOrders: 0,
    deliveredOrders: 0
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: ''
  });

  // Fetch user data
  const fetchUserData = async () => {
    if (!user?.uid) return;
    
    setLoading(true);
    try {
      // Fetch user profile
      const profileResponse = await userAPI.getProfile(user.uid);
      const profileData = profileResponse.data?.user || profileResponse.data;
      setUserData(profileData);
      
      // Fetch user stats if available
      try {
        const statsResponse = await userAPI.getUserStats(user.uid);
        if (statsResponse.data) {
          setStats(statsResponse.data);
        }
      } catch (statsError) {
        console.log('Stats API not available, using fallback');
      }
      
      // Set form data
      setFormData({
        name: profileData?.name || user.displayName || '',
        email: profileData?.email || user.email || '',
        phone: profileData?.phone || '+880 1234 567890',
        address: profileData?.address || '123 Street, Dhaka, Bangladesh',
        bio: profileData?.bio || 'Fashion enthusiast and regular buyer of premium garments.'
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Fallback to default data if API fails
      setUserData({
        _id: user.uid,
        name: user.displayName || 'User',
        email: user.email,
        photoURL: user.photoURL,
        role: 'buyer',
        status: 'active',
        createdAt: user.metadata?.creationTime
      });
      
      // Fetch orders for stats
      try {
        const ordersResponse = await orderAPI.getUserOrders(user.uid);
        const orders = ordersResponse.data?.data || ordersResponse.data || [];
        setStats({
          totalOrders: orders.length,
          totalSpent: orders.reduce((sum, order) => sum + (order.orderPrice || order.totalPrice || 0), 0),
          pendingOrders: orders.filter(o => o.status === 'pending').length,
          deliveredOrders: orders.filter(o => o.status === 'delivered').length
        });
      } catch (orderError) {
        console.error('Error fetching orders:', orderError);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userAPI.updateProfile(user.uid, formData);
      
      if (response.data.success) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
        
        // Update auth context
        if (updateUserProfile) {
          updateUserProfile({
            displayName: formData.name,
            phone: formData.phone
          });
        }
        
        fetchUserData(); // Refresh data
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleImageUpload = () => {
    Swal.fire({
      title: 'Upload Profile Picture',
      text: 'This feature is coming soon!',
      icon: 'info',
      confirmButtonText: 'OK',
      confirmButtonColor: '#f97316'
    });
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#f97316',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      if (logout) {
        logout();
      }
      navigate('/login');
    }
  };

  const handlePasswordChange = () => {
    Swal.fire({
      title: 'Change Password',
      text: 'Please contact support to change your password.',
      icon: 'info',
      confirmButtonText: 'OK',
      confirmButtonColor: '#f97316'
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  const isSuspended = userData?.status === 'suspended';
  const role = userData?.role || 'buyer';
  const status = userData?.status || 'active';

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl sm:text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          My <span className="text-orange-500">Profile</span>
        </h1>
        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Manage your personal information and account settings
        </p>
      </div>

      {/* Suspension Warning */}
      {isSuspended && (
        <div className={`mb-6 p-4 rounded-xl border-l-4 border-red-500 ${
          isDark ? 'bg-red-900/20' : 'bg-red-50'
        }`}>
          <div className="flex items-center gap-3">
            <FaExclamationTriangle className="text-red-500 text-xl flex-shrink-0" />
            <div className="flex-1">
              <h3 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                ⚠️ Account Suspended
              </h3>
              <div className="space-y-1 text-sm">
                {userData.suspensionReason && (
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    <span className="font-semibold">Reason:</span> {userData.suspensionReason}
                  </p>
                )}
                {userData.suspensionFeedback && (
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    <span className="font-semibold">Feedback:</span> {userData.suspensionFeedback}
                  </p>
                )}
                {userData.suspendedAt && (
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    <span className="font-semibold">Suspended on:</span> {formatDate(userData.suspendedAt)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Card & Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className={`rounded-2xl p-6 ${
            isDark 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          } shadow-xl`}>
            <div className="text-center">
              {/* Profile Image */}
              <div className="relative inline-block mb-6">
                <div className="relative">
                  <img
                    src={userData?.photoURL || user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || 'User')}&background=f97316&color=fff&size=150`}
                    alt={formData.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-orange-500 shadow-2xl"
                  />
                  {status === 'active' && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full">
                      <MdVerified size={16} />
                    </div>
                  )}
                </div>
                <button
                  onClick={handleImageUpload}
                  className="absolute bottom-2 right-2 p-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
                  title="Change photo"
                  disabled={isSuspended}
                >
                  <FaCamera size={16} />
                </button>
              </div>

              <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {formData.name}
              </h2>
              
              <div className="flex flex-col gap-2 mb-4">
                <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${
                  role === 'admin'
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                    : role === 'manager'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                    : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                }`}>
                  {role.toUpperCase()}
                </div>
                
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  status === 'active' 
                    ? 'bg-green-500/20 text-green-600' 
                    : status === 'pending'
                    ? 'bg-yellow-500/20 text-yellow-600'
                    : 'bg-red-500/20 text-red-600'
                }`}>
                  {status.toUpperCase()}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 text-left mb-6">
                <div className={`flex items-center gap-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <FaEnvelope className="text-orange-500 flex-shrink-0" />
                  <span className="truncate">{formData.email}</span>
                </div>
                <div className={`flex items-center gap-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <FaPhone className="text-orange-500 flex-shrink-0" />
                  <span>{formData.phone}</span>
                </div>
                <div className={`flex items-center gap-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <FaCalendarAlt className="text-orange-500 flex-shrink-0" />
                  <span>Joined {formatDate(userData?.createdAt || user?.metadata?.creationTime)}</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className={`grid grid-cols-2 gap-3 p-4 rounded-xl mb-4 ${
                isDark ? 'bg-gray-900/50' : 'bg-gray-50'
              }`}>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <FaBox className="text-orange-500" />
                    <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {stats.totalOrders}
                    </p>
                  </div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Orders</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <FaDollarSign className="text-green-500" />
                    <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {formatCurrency(stats.totalSpent)}
                    </p>
                  </div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Spent</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Quick Actions */}
          <div className={`rounded-2xl p-6 ${
            isDark 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          } shadow-xl`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={handlePasswordChange}
                disabled={isSuspended}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                  isDark 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-700'
                } ${isSuspended ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <FaLock className="text-orange-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Change Password</p>
                  <p className="text-xs text-gray-500">Update your security</p>
                </div>
              </button>
              
              <button
                onClick={() => toast.info('Notification settings coming soon!')}
                disabled={isSuspended}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                  isDark 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-700'
                } ${isSuspended ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <FaBell className="text-orange-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Notifications</p>
                  <p className="text-xs text-gray-500">Manage alerts</p>
                </div>
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all bg-red-500/10 hover:bg-red-500/20 text-red-600"
              >
                <div className="p-2 rounded-lg bg-red-500/20">
                  <FaSignOutAlt className="text-red-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Logout</p>
                  <p className="text-xs text-red-500/70">Sign out from account</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Profile Form */}
        <div className={`lg:col-span-2 rounded-2xl p-6 ${
          isDark 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-200'
        } shadow-xl`}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Personal Information
              </h3>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Update your personal details and preferences
              </p>
            </div>
            
            {!isSuspended && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  isEditing
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                {isEditing ? (
                  <>
                    <FaEdit />
                    Cancel Edit
                  </>
                ) : (
                  <>
                    <FaEdit />
                    Edit Profile
                  </>
                )}
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <FaUser className="text-orange-500" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing || isSuspended}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    isDark 
                      ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 disabled:bg-gray-800/50 disabled:cursor-not-allowed' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed'
                  }`}
                  required
                />
              </div>

              <div>
                <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <FaEnvelope className="text-orange-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={true}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    isDark 
                      ? 'bg-gray-900/50 border-gray-700 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  required
                />
              </div>
            </div>

            {/* Phone & Address */}
            <div>
              <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <FaPhone className="text-orange-500" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing || isSuspended}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  isDark 
                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 disabled:bg-gray-800/50 disabled:cursor-not-allowed' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed'
                }`}
                required
              />
            </div>

            <div>
              <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <FaMapMarkerAlt className="text-orange-500" />
                Delivery Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing || isSuspended}
                rows="3"
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none ${
                  isDark 
                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 disabled:bg-gray-800/50 disabled:cursor-not-allowed' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed'
                }`}
                placeholder="Enter your full delivery address..."
                required
              />
            </div>

            {/* Bio */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                About Me
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing || isSuspended}
                rows="4"
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none ${
                  isDark 
                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 disabled:bg-gray-800/50 disabled:cursor-not-allowed' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed'
                }`}
                placeholder="Tell us about yourself, your preferences, etc..."
              />
            </div>

            {/* Save Button */}
            {isEditing && !isSuspended && (
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaSave />
                <span>Save Changes</span>
              </button>
            )}
          </form>

          {/* Additional Info Section */}
          <div className="mt-8 pt-6 border-t border-dashed border-gray-400/30">
            <h4 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Account Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <FaShieldAlt className="text-blue-500" />
                  <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Account Status
                  </span>
                </div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {status === 'active' ? '✅ Active and verified' : 
                   status === 'pending' ? '⏳ Pending approval' : 
                   '❌ Suspended'}
                </p>
              </div>
              
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <FaChartLine className="text-green-500" />
                  <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Activity Level
                  </span>
                </div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stats.totalOrders > 10 ? '🎯 Regular Buyer' : 
                   stats.totalOrders > 0 ? '📊 Active User' : 
                   '🆕 New User'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Info */}
      <div className={`mt-8 p-6 rounded-2xl text-center ${
        isDark ? 'bg-gray-800/50' : 'bg-gray-50'
      }`}>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Need help with your account? Contact our support team at{' '}
          <a href="mailto:support@garmentstracker.com" className="text-orange-500 hover:underline">
            support@garmentstracker.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Profile;