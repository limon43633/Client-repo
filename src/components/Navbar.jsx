import React, { useState } from 'react';
import { Moon, Sun, Menu, X, ShoppingBag } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl ${
          isDark
            ? "bg-gray-900/70 border-b border-white/10"
            : "bg-white/80 border-b border-black/5"
        } shadow-lg`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="bg-orange-500/20 backdrop-blur-md border border-orange-500/30 rounded-xl p-2.5 shadow-lg"
              >
                <ShoppingBag className="w-6 h-6 text-orange-500" />
              </Link>

              <Link to="/">
                <span
                  className={`text-xl font-bold tracking-tight ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Garments<span className="text-orange-500">Track</span>
                </span>
              </Link>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-10">
              <Link
                to="/"
                className={`relative text-sm font-medium transition-all duration-300 ${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                } after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full`}
              >
                Home
              </Link>

              <Link
                to="/all-products"
                className={`relative text-sm font-medium transition-all duration-300 ${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                } after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full`}
              >
                All Products
              </Link>
            </div>

            {/* Desktop Right Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`p-2.5 rounded-xl backdrop-blur-md transition-all duration-300 ${
                  isDark
                    ? "bg-white/10 hover:bg-white/20 text-yellow-400 border border-white/20"
                    : "bg-black/5 hover:bg-black/10 text-gray-700 border border-black/10"
                }`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 backdrop-blur-md ${
                  isDark
                    ? "text-gray-300 hover:bg-white/10 border border-white/10"
                    : "text-gray-700 hover:bg-black/5 border border-black/10"
                }`}
              >
                Log in
              </button>

              <button className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium shadow-lg hover:shadow-orange-500/25 hover:scale-105 transition-all duration-300">
                Register
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg backdrop-blur-md ${
                  isDark ? "bg-white/10 text-yellow-400" : "bg-black/5 text-gray-700"
                }`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button onClick={toggleMenu} className="p-2">
                {isOpen ? (
                  <X className={`w-6 h-6 ${isDark ? "text-white" : "text-gray-900"}`} />
                ) : (
                  <Menu className={`w-6 h-6 ${isDark ? "text-white" : "text-gray-900"}`} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={toggleMenu}
        />

        <div
          className={`absolute top-0 right-0 h-full w-80 shadow-2xl transform transition-transform duration-500 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } ${isDark ? "bg-gray-900/90" : "bg-white/90"} backdrop-blur-2xl border-l ${
            isDark ? "border-white/10" : "border-black/10"
          }`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500/20 rounded-xl p-2.5">
                  <ShoppingBag className="w-6 h-6 text-orange-500" />
                </div>
                <span
                  className={`text-xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Garments<span className="text-orange-500">Track</span>
                </span>
              </div>

              <button onClick={toggleMenu} className="p-2">
                <X className={`w-6 h-6 ${isDark ? "text-white" : "text-gray-900"}`} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-6">
              <Link
                to="/"
                onClick={toggleMenu}
                className={`text-lg font-medium ${
                  isDark ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Home
              </Link>

              <Link
                to="/all-products"
                onClick={toggleMenu}
                className={`text-lg font-medium ${
                  isDark ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                All Products
              </Link>
            </nav>

            <div className="mt-10 space-y-4">
              <button
                className={`w-full py-3 rounded-xl font-medium ${
                  isDark ? "text-gray-300 hover:bg-white/10" : "text-gray-700 hover:bg-black/5"
                }`}
              >
                Log in
              </button>

              <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium shadow-lg hover:shadow-orange-500/30 transition-all">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
