import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaSave, FaEdit, FaCamera } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '+880 1234 567890',
    address: '123 Street, Dhaka, Bangladesh',
    bio: 'Fashion enthusiast and regular buyer of premium garments. Love quality products with great service.',
    joinDate: user?.metadata?.creationTime || '2024-01-01'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, update user profile via API
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleImageUpload = () => {
    // In real app, handle image upload
    toast.info('Image upload feature coming soon!');
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl sm:text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          My <span className="text-orange-500">Profile</span>
        </h1>
        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className={`lg:col-span-1 rounded-2xl p-6 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-800' 
            : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
        } shadow-xl`}>
          <div className="text-center">
            {/* Profile Image */}
            <div className="relative inline-block mb-6">
              <img
                src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=f97316&color=fff&size=150`}
                alt={user?.displayName}
                className="w-32 h-32 rounded-full object-cover border-4 border-orange-500 shadow-2xl"
              />
              <button
                onClick={handleImageUpload}
                className="absolute bottom-2 right-2 p-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
                title="Change photo"
              >
                <FaCamera size={16} />
              </button>
            </div>

            <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {formData.name}
            </h2>
            
            <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6 ${
              user?.role === 'admin'
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                : user?.role === 'manager'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
            }`}>
              {user?.role?.toUpperCase()}
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-2 gap-4 p-4 rounded-xl mb-6 ${
              isDark ? 'bg-gray-800/30' : 'bg-gray-50'
            }`}>
              <div className="text-center">
                <p className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>24</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Orders</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>৳85,400</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Spent</p>
              </div>
            </div>

            {/* Member Since */}
            <div className={`flex items-center justify-center gap-2 text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <FaCalendarAlt />
              <span>Member since {new Date(formData.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className={`lg:col-span-2 rounded-2xl p-6 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-800' 
            : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
        } shadow-xl`}>
          <div className="flex justify-between items-center mb-8">
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Personal Information
            </h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
                isEditing
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
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
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
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
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 disabled:bg-gray-800/50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 disabled:bg-gray-100'
                }`}
                required
              />
            </div>

            {/* Email */}
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
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 disabled:bg-gray-800/50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 disabled:bg-gray-100'
                }`}
                required
              />
            </div>

            {/* Phone */}
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
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 disabled:bg-gray-800/50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 disabled:bg-gray-100'
                }`}
                required
              />
            </div>

            {/* Address */}
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
                disabled={!isEditing}
                rows="3"
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 disabled:bg-gray-800/50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 disabled:bg-gray-100'
                }`}
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
                disabled={!isEditing}
                rows="4"
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 disabled:bg-gray-800/50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 disabled:bg-gray-100'
                }`}
              />
            </div>

            {/* Save Button */}
            {isEditing && (
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
              >
                <FaSave />
                <span>Save Changes</span>
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Account Settings */}
      <div className={`mt-8 rounded-2xl p-6 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-800' 
          : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
      } shadow-xl`}>
        <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Account Settings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-5 rounded-xl ${isDark ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
            <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Change Password
            </h4>
            <button
              className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
              onClick={() => toast.info('Password change feature coming soon!')}
            >
              Update Password
            </button>
          </div>

          <div className={`p-5 rounded-xl ${isDark ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
            <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Notification Settings
            </h4>
            <button
              className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
              onClick={() => toast.info('Notification settings coming soon!')}
            >
              Manage Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;