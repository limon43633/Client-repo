import React from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Package, TrendingUp, Shield, CheckCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

function Banner() {
  const { isDark } = useTheme();

  // Existing variants (unchanged)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const features = [
    { icon: Package, text: 'Real-time Order Tracking' },
    { icon: TrendingUp, text: 'Production Analytics' },
    { icon: Shield, text: 'Secure Transactions' },
  ];

  return (
    <div className={`relative overflow-hidden transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-orange-50 via-white to-amber-50'
    }`}>
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className={`absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-30 ${
            isDark ? 'bg-orange-500' : 'bg-orange-200'
          }`}
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className={`absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-30 ${
            isDark ? 'bg-amber-500' : 'bg-amber-200'
          }`}
          animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className={`absolute -bottom-8 left-1/2 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-30 ${
            isDark ? 'bg-orange-600' : 'bg-orange-300'
          }`}
          animate={{ x: [-50, 50, -50], y: [0, -80, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE - COMPLETELY UNCHANGED */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center lg:text-left">
            <motion.div variants={itemVariants} className="inline-flex items-center">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-800 gap-2 mb-6">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Trusted by 500+ Businesses</span>
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className={`text-4xl font-semibold sm:text-5xl lg:text-6xl mb-6 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Streamline Your{' '}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Garment Production
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className={`text-lg sm:text-xl mb-8 max-w-xl mx-auto lg:mx-0 ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
              Track orders, manage production, and deliver excellence with our all-in-one
              garment order management system. From fabric to fashion.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div key={index} whileHover={{ scale: 1.05 }} className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                    <Icon className="w-5 h-5 text-orange-500" />
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{feature.text}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow gap-2 group">
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`inline-flex items-center justify-center px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 ${isDark ? 'bg-gray-800 text-orange-400 border-gray-700' : 'bg-white text-orange-500 border-orange-100'}`}>
                View All Products
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants} className={`grid grid-cols-3 gap-6 mt-12 pt-8 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="text-center lg:text-left">
                <div className="text-3xl text-orange-500 mb-1">2.5k+</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Orders Delivered</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl text-amber-500 mb-1">98%</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Client Satisfaction</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl text-orange-600 mb-1">24/7</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Support Available</div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - PREMIUM LUXURY GARMENT GALLERY (2025 DESIGN) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Floating Ambient Glows */}
            <motion.div
              animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-amber-600/10 rounded-full blur-3xl -z-10"
            />
            <motion.div
              animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }}
              className="absolute -bottom-32 -right-20 w-80 h-80 bg-gradient-to-tr from-orange-500/20 to-pink-500/10 rounded-full blur-3xl -z-10"
            />

            <div className="grid grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto lg:mx-0">

              {/* Hero Tall Image */}
              <motion.div
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                whileHover={{ scale: 1.03 }}
                className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=1200&q=90&fm=webp"
                  alt="Premium garment atelier"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <p className="text-white font-semibold text-lg tracking-wider">Crafted to Perfection</p>
                </div>
              </motion.div>

              {/* Top Row */}
              <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} whileHover={{ y: -8 }} className="relative rounded-2xl overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=90&fm=webp" alt="Designer sketching" className="w-full h-full object-cover aspect-square" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} whileHover={{ y: -8 }} className="relative rounded-2xl overflow-hidden shadow-xl">
                <img src="https://i.ibb.co.com/Kp9RsNXc/pngtree-a-variety-of-luxurious-fabric-textures-displayed-at-a-tailor-shop-image-13803587.png" alt="Premium fabrics" className="w-full h-full object-cover aspect-square" />
              </motion.div>

              {/* Middle Row */}
              <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} whileHover={{ y: -8 }} className="relative rounded-2xl overflow-hidden shadow-xl">
                <img src="https://i.ibb.co.com/ZpRZSnW2/medium-shot-women-testing-colours-23-2150538657.avif" alt="Fashion workspace" className="w-full h-full object-cover aspect-[4/5]" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} whileHover={{ y: -8 }} className="relative rounded-2xl overflow-hidden shadow-xl">
                <img src="https://i.ibb.co.com/3ykWjTXB/close-up-of-t-shirts-on-hangers-apparel-background-photo.jpg" alt="Finished garments" className="w-full h-full object-cover aspect-[4/5]" />
              </motion.div>

              {/* Bottom Wide Image */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.9 }}
                whileHover={{ scale: 1.02 }}
                className="col-span-4 relative rounded-3xl overflow-hidden shadow-2xl mt-4 group"
              >
                <img
                  src="https://i.ibb.co.com/nNZLLjKy/stack-folded-t-shirts-hoodies-cardboard-boxes-stack-folded-t-shirts-hoodies-cardboard-boxes-blurred.webp"
                  alt="Luxury production line"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  style={{ aspectRatio: '16/9' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-10">
                  <div className="text-white">
                    <h4 className="text-2xl font-bold mb-2">From Vision to Victory</h4>
                    <p className="text-sm opacity-90">Every stitch tells a story of excellence</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className={`w-full h-24 fill-current ${isDark ? 'text-gray-900' : 'text-white'}`} viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z" />
        </svg>
      </div>
    </div>
  );
}

export default Banner;