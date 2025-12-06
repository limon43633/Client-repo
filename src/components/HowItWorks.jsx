import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HowItWorks = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const steps = [
    {
      icon: "📋",
      title: "Place Your Order",
      description: "Choose products, set quantity, and place your order with details.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: "✂️",
      title: "Cutting & Preparation",
      description: "Fabric is precisely cut and prepared for production.",
      color: "from-orange-500 via-orange-500 to-orange-600"
    },
    {
      icon: "🪡",
      title: "Sewing & Assembly",
      description: "Garments are expertly sewn with quality stitching.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: "🔍",
      title: "Quality Check",
      description: "Each item passes strict quality inspection.",
      color: "from-orange-500 via-orange-500 to-orange-600"
    },
    {
      icon: "📦",
      title: "Packaging & Delivery",
      description: "Finished garments are packaged and shipped with tracking.",
      color: "from-orange-500 to-orange-600"
    }
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-black bg-clip-text mb-4 sm:mb-6">
            How <span className='text-orange-500'>It Works</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed px-4">
            Track your garment order from placement to delivery with complete transparency. 
            Every step is monitored and updated in real-time.
          </p>
        </motion.div>

        {/* Steps Grid - Mobile Carousel / Desktop Grid */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          {isMobile ? (
            /* Mobile: Single Step View */
            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group relative p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl hover:shadow-orange-500/25 transition-all duration-500 ${
                    currentStep === index ? 'ring-4 ring-orange-500/50 shadow-orange-500/25 scale-[1.02]' : ''
                  }`}
                >
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                    <motion.div
                      animate={{ 
                        scale: currentStep === index ? [1, 1.1, 1] : 1,
                        rotate: currentStep === index ? [0, 5, -5, 0] : 0
                      }}
                      transition={{ 
                        duration: 0.6,
                        repeat: currentStep === index ? Infinity : 0,
                        repeatDelay: 2
                      }}
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-bold shadow-2xl border-4 ${
                        currentStep === index 
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-500/50' 
                          : 'bg-white/70 text-slate-600 border-slate-200/50 group-hover:border-orange-300/50'
                      }`}
                    >
                      {step.icon}
                    </motion.div>
                  </div>

                  {/* Step Number */}
                  <div className="absolute -right-3 sm:-right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold flex items-center justify-center text-xs sm:text-sm shadow-lg">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="text-center mt-10 sm:mt-12">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 group-hover:text-orange-600 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base px-2">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Desktop: Grid Layout */
            <div className="grid md:grid-cols-5 gap-6 sm:gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className={`group relative p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl hover:shadow-orange-500/25 transition-all duration-500 h-full ${
                    currentStep === index ? 'ring-4 ring-orange-500/50 shadow-orange-500/25 scale-[1.02]' : ''
                  }`}
                >
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <motion.div
                      animate={{ 
                        scale: currentStep === index ? [1, 1.1, 1] : 1,
                        rotate: currentStep === index ? [0, 5, -5, 0] : 0
                      }}
                      transition={{ 
                        duration: 0.6,
                        repeat: currentStep === index ? Infinity : 0,
                        repeatDelay: 2
                      }}
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-2xl border-4 ${
                        currentStep === index 
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-500/50' 
                          : 'bg-white/70 text-slate-600 border-slate-200/50 group-hover:border-orange-300/50'
                      }`}
                    >
                      {step.icon}
                    </motion.div>
                  </div>

                  {/* Step Number */}
                  <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold flex items-center justify-center text-sm shadow-lg">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="text-center mt-12">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Progress Line */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className="absolute top-20 left-full w-20 h-1 bg-gradient-to-r from-orange-500/30 to-orange-400/50 -translate-y-1/2 hidden lg:block"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Active Step Highlight */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto p-6 sm:p-8"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-gradient-to-r from-orange-500/90 via-orange-600/90 to-orange-700/90 backdrop-blur-xl px-6 sm:px-8 py-6 sm:py-8 rounded-3xl shadow-2xl border border-orange-200/30">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-2xl flex-shrink-0 mb-4 sm:mb-0">
                {steps[currentStep].icon}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{steps[currentStep].title}</h3>
                <p className="text-orange-100 leading-relaxed text-sm sm:text-base">{steps[currentStep].description}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12 sm:mt-16 md:mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 sm:py-4 px-8 sm:px-12 rounded-2xl text-base sm:text-lg shadow-xl hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 inline-flex items-center gap-2 sm:gap-3 w-full sm:w-auto max-w-sm mx-auto"
          >
            Start Your Order Now
            <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Orange Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-r from-orange-500/10 to-orange-400/10 rounded-full blur-3xl -z-10 animate-pulse hidden xl:block" />
      <div className="absolute bottom-1/4 right-20 w-96 h-96 bg-gradient-to-r from-orange-400/5 to-orange-500/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000 hidden xl:block" />
    </section>
  );
};

export default HowItWorks;
