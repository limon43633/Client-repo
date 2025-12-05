import React from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Package, TrendingUp, Shield, CheckCircle } from 'lucide-react';

function Banner() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const features = [
    { icon: Package, text: 'Real-time Order Tracking' },
    { icon: TrendingUp, text: 'Production Analytics' },
    { icon: Shield, text: 'Secure Transactions' },
  ];

  return (
    // 🟠 CHANGED: Background gradient from indigo/purple to orange/amber tones
    <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 🟠 CHANGED: purple-200 → orange-200 */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        {/* 🟠 CHANGED: indigo-200 → amber-200 */}
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        {/* 🟠 CHANGED: pink-200 → orange-300 */}
        <motion.div
          className="absolute -bottom-8 left-1/2 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [-50, 50, -50],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            {/* 🟠 CHANGED: indigo-100/indigo-800 → orange-100/orange-800 */}
            <motion.div variants={itemVariants} className="inline-flex items-center">
  <span
    className="
      inline-flex items-center px-4 py-2 rounded-full 
      bg-white/10 backdrop-blur-md border border-white/20 
      text-orange-300 gap-2 mb-6 shadow-lg
      transition-all duration-300 hover:bg-white/20 hover:shadow-xl
    "
  >
    <CheckCircle className="w-4 h-4" />
    <span className="text-sm font-medium">Trusted by 500+ Businesses</span>
  </span>
</motion.div>


            {/* Main Heading */}
            {/* 🟠 CHANGED: gradient from indigo-600/purple-600 → orange-500/orange-600 */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-semibold sm:text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight"
            >
              Streamline Your{' '}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Garment Production
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Track orders, manage production, and deliver excellence with our all-in-one
              garment order management system. From fabric to fashion.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200"
                  >
                    {/* 🟠 CHANGED: indigo-600 → orange-500 */}
                    <Icon className="w-5 h-5 text-orange-500" />
                    <span className="text-sm text-gray-700">{feature.text}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              {/* 🟠 CHANGED: gradient from indigo-600/purple-600 → orange-400/orange-500 */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow gap-2 group"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* 🟠 CHANGED: text-indigo-600/border-indigo-100 → text-orange-500/border-orange-100 */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-500 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-orange-100"
              >
                View All Products
              </motion.button>
            </motion.div>

            {/* Stats */}
            {/* 🟠 CHANGED: indigo-600/purple-600/pink-600 → orange-500/amber-500/orange-600 */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200"
            >
              <div className="text-center lg:text-left">
                <div className="text-3xl text-orange-500 mb-1">2.5k+</div>
                <div className="text-sm text-gray-600">Orders Delivered</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl text-amber-500 mb-1">98%</div>
                <div className="text-sm text-gray-600">Client Satisfaction</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl text-orange-600 mb-1">24/7</div>
                <div className="text-sm text-gray-600">Support Available</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* Main Image Container */}
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1580644228275-2b826dbec5bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZ2FybWVudCUyMHByb2R1Y3Rpb258ZW58MXx8fHwxNzY0OTYyMDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Garment Production"
                className="w-full h-auto object-cover"
              />
              {/* 🟠 CHANGED: from-indigo-900/20 → from-orange-900/20 */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/20 to-transparent" />
            </motion.div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -left-8 top-1/4 bg-white rounded-xl shadow-xl p-4 hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Order Status</div>
                  <div className="text-green-600">Approved</div>
                </div>
              </div>
            </motion.div>

            {/* 🟠 CHANGED: purple-100/purple-600 → orange-100/orange-600 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -right-8 bottom-1/4 bg-white rounded-xl shadow-xl p-4 hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">In Production</div>
                  <div className="text-orange-600">125 Items</div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            {/* 🟠 CHANGED: from-indigo-400/to-purple-600 → from-orange-400/to-orange-600 */}
            <motion.div
              className="absolute -z-10 top-0 right-0 w-72 h-72 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full filter blur-3xl opacity-20"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-24 fill-current text-white"
          viewBox="0 0 1440 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z" />
        </svg>
      </div>
    </div>
  );
}

export default Banner;