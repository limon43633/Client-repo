import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ReadyToOrder = () => {
    const { isDark } = useTheme();
  return (
    <section className={`relative flex items-center justify-center overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black' 
        : 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600'
    } py-20 px-4`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${
          isDark ? 'bg-blue-500' : 'bg-orange-300'
        } rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob`}></div>
        <div className={`absolute top-1/3 right-1/4 w-96 h-96 ${
          isDark ? 'bg-purple-500' : 'bg-orange-400'
        } rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000`}></div>
        <div className={`absolute bottom-1/4 left-1/3 w-96 h-96 ${
          isDark ? 'bg-indigo-600' : 'bg-orange-600'
        } rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000`}></div>
        
        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-white/20 rounded-lg rotate-45 animate-float"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 border-2 border-white/20 rounded-full animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 border-2 border-white/20 rounded-lg animate-float animation-delay-4000"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
          Ready to Start Your Order?
        </h2>
        
        {/* Subheading */}
        <p className="text-lg sm:text-lg text-white/90 mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          Join thousands of businesses who trust GarmentTrack for their bulk garment needs.
        </p>
        
        {/* CTA Button */}
        <button className={`group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold ${
          isDark 
            ? 'text-white bg-orange-500 hover:bg-orange-500' 
            : 'text-orange-500 bg-white hover:bg-orange-50'
        } rounded-full transition-all duration-300 shadow-2xl ${
          isDark 
            ? 'hover:shadow-orange-500/50' 
            : 'hover:shadow-orange-300/50'
        } hover:scale-105 animate-fade-in-up animation-delay-400`}>
          <span className="relative z-10">Create Free Account</span>
          <div className={`absolute inset-0 rounded-full ${
            isDark 
              ? 'bg-gradient-to-r from-orange-600 to-orange-500' 
              : 'bg-gradient-to-r from-white to-orange-50'
          } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
          <svg 
            className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/80 text-sm animate-fade-in-up animation-delay-600">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span>10,000+ Users</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Trusted Platform</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <span>Fast Processing</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -30px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(30px, 10px) scale(1.05);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </section>
  );
};

export default ReadyToOrder;