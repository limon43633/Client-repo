import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Register = () => {
  const { isDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    role: 'buyer',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register Data:', formData);
  };

  const handleGoogleLogin = () => {
    console.log('Google Login');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-30 px-4 sm:px-6 lg:px-8 ${
      isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-orange-50 to-orange-100'
    }`}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Create <span className="text-orange-500">Account</span>
          </h2>
          <p className={`text-sm sm:text-base ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Join us today and start your journey
          </p>
        </div>

        <div className={`rounded-2xl shadow-2xl p-8 sm:p-10 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label 
                htmlFor="name" 
                className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label 
                htmlFor="email" 
                className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label 
                htmlFor="photoURL" 
                className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Photo URL
              </label>
              <input
                id="photoURL"
                name="photoURL"
                type="url"
                value={formData.photoURL}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Enter photo URL (optional)"
              />
            </div>

            <div>
              <label 
                htmlFor="role" 
                className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              >
                <option value="buyer">Buyer</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <div>
              <label 
                htmlFor="password" 
                className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                    isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              <p className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Must contain uppercase, lowercase, and at least 6 characters
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Create Account
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${isDark ? 'border-gray-600' : 'border-gray-300'}`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-4 ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                Or sign up with
              </span>
            </div>
          </div>

          {/* Google Only */}
          <div className="grid grid-cols-1">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className={`flex items-center justify-center gap-2 py-3 rounded-lg border font-medium transition-all ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 256 262">
                <path fill="#4285F4" d="M255.68 133.46c0-10.35-.93-20.32-2.67-30H130.5v56.74h70.22c-3.04 16.4-12.3 30.28-26.17 39.62v32.98h42.32c24.77-22.8 38.81-56.47 38.81-99.34"/>
                <path fill="#34A853" d="M130.5 261.1c35.49 0 65.34-11.73 87.12-31.76l-42.32-32.98c-11.73 7.86-26.8 12.49-44.8 12.49-34.43 0-63.55-23.22-73.94-54.55H13.06v34.54C34.7 231.36 79.96 261.1 130.5 261.1"/>
                <path fill="#FBBC05" d="M56.56 154.3a77.82 77.82 0 0 1-4.06-24.8c0-8.62 1.49-16.96 4.06-24.8V70.16H13.06A130.49 130.49 0 0 0 .5 129.5C.5 153.53 6.53 176 17.8 195.42l38.76-41.12"/>
                <path fill="#EA4335" d="M130.5 50.52c19.3 0 36.66 6.64 50.32 19.71l37.7-37.7C195.84 10.09 165.99.5 130.5.5 79.96.5 34.7 30.24 13.06 70.16l39.44 34.54C66.95 73.74 96.07 50.52 130.5 50.52"/>
              </svg>
              <span className="hidden sm:inline">Google</span>
            </button>
          </div>

          <p className={`text-center text-sm mt-6 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
