import React, { useState } from 'react';
import { Moon, Sun, Menu, X, ShoppingBag } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDark = () => setIsDark(!isDark);

  return (
    <nav className={`${isDark ? 'bg-gray-900' : 'bg-white'} shadow-md transition-colors duration-300`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-orange-400 rounded-lg p-2">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Garments<span className="text-orange-400">Track</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>
              Home
            </a>
            <a href="products" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>
              All Products
            </a>
          </div>

          {/* Desktop Right Side Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleDark}
              className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-700'} hover:opacity-80 transition-opacity`}
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className={`px-4 py-2 rounded-lg ${isDark ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'} transition-colors`}>
              Log in
            </button>
            <button className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors">
              Register
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleDark}
              className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-700'}`}
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-lg ${isDark ? 'text-white' : 'text-gray-700'}`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-end mb-8">
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-lg ${isDark ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <a
              href="#home"
              onClick={toggleMenu}
              className={`text-lg ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}
            >
              Home
            </a>
            <a
              href="#products"
              onClick={toggleMenu}
              className={`text-lg ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}
            >
              All Products
            </a>
            <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
            <button className={`px-4 py-2 rounded-lg text-left ${isDark ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'} transition-colors`}>
              Log in
            </button>
            <button className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors">
              Register
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;