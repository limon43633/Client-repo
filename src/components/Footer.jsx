import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();
  
  return (
    <footer className={`pt-12 pb-8 transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Logo + Description + Social */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500/20 backdrop-blur-md border border-orange-500/30 rounded-xl p-2.5 shadow-lg">
                <ShoppingBag className="w-6 h-6 text-orange-500" />
              </div>
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Garments<span className="text-orange-500">Track</span>
              </h2>
            </div>

            <p className={`text-sm leading-relaxed max-w-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Streamline your garment production and order management with our comprehensive tracking system.
            </p>

            <div className="flex gap-5">
              <a
                href="#"
                className={`transition-colors duration-200 ${isDark ? 'text-gray-400 hover:text-orange-500' : 'text-gray-500 hover:text-orange-500'}`}
                aria-label="Twitter"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.06a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.936 4.936 0 0 0 4.604 3.417 9.867 9.867 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21-.004-.42-.015-.63A9.935 9.935 0 0 0 24 4.59a9.5 9.5 0 0 1-2.047.565z" />
                </svg>
              </a>

              <a
                href="#"
                className={`transition-colors duration-200 ${isDark ? 'text-gray-400 hover:text-orange-500' : 'text-gray-500 hover:text-orange-500'}`}
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a
                href="#"
                className={`transition-colors duration-200 ${isDark ? 'text-gray-400 hover:text-orange-500' : 'text-gray-500 hover:text-orange-500'}`}
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.069-1.644-.069-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44 0 .795.645 1.44 1.441 1.44.795 0 1.439-.645 1.439-1.44 0-.795-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-bold mb-5 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className={`transition-colors duration-200 ${isDark ? 'text-gray-400 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}>
                  Home
                </a>
              </li>
              <li>
                <a href="#" className={`transition-colors duration-200 ${isDark ? 'text-gray-400 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}>
                  All Products
                </a>
              </li>
              <li>
                <a href="#" className={`transition-colors duration-200 ${isDark ? 'text-gray-400 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}>
                  Sign In
                </a>
              </li>
              <li>
                <a href="#" className={`transition-colors duration-200 ${isDark ? 'text-gray-400 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}>
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className={`text-lg font-bold mb-5 ${isDark ? 'text-white' : 'text-gray-900'}`}>Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className={`transition-colors duration-200 ${isDark ? 'text-gray-400 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}>
                  Bulk Orders
                </a>
              </li>
              <li>
                <a href="#" className={`transition-colors duration-200 ${isDark ? 'text-gray-400 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}>
                  Custom Manufacturing
                </a>
              </li>
              <li>
                <a href="#" className={`transition-colors duration-200 ${isDark ? 'text-gray-400 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}>
                  Order Tracking
                </a>
              </li>
              <li>
                <a href="#" className={`transition-colors duration-200 ${isDark ? 'text-gray-400 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}>
                  Quality Assurance
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className={`text-lg font-bold mb-5 ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact Us</h3>
            <div className={`space-y-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>123 Fashion District, NY 10001</span>
              </div>

              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+1 (555) 123-4567</span>
              </div>

              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>contact@garments.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className={`my-10 ${isDark ? 'border-gray-700' : 'border-gray-200'}`} />

        {/* Bottom Bar */}
        <div className={`flex flex-col md:flex-row justify-between items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>© 2025 GarmentsTrack. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-orange-500 transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;