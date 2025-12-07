import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Feedback = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const { isDark } = useTheme();

  const feedbacks = [
    {
      id: 1,
      name: "Sarah Mitchell",
      role: "Fashion Boutique Owner",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      comment: "Outstanding quality and timely delivery! The order tracking system made everything transparent. Our customers love the garments, and we'll definitely order again.",
      company: "Elegance Fashion"
    },
    {
      id: 2,
      name: "James Anderson",
      role: "Retail Manager",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      comment: "The production tracker gave us complete visibility of our order. Professional team, excellent craftsmanship, and smooth communication throughout the process.",
      company: "Urban Threads"
    },
    {
      id: 3,
      name: "Emily Chen",
      role: "Brand Director",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
      comment: "Impressed with the attention to detail and quality control. The dashboard made managing multiple orders effortless. Highly recommend for bulk orders!",
      company: "ModaStyle Co."
    },
    {
      id: 4,
      name: "Michael Torres",
      role: "Procurement Head",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      rating: 5,
      comment: "Seamless experience from ordering to delivery. The real-time tracking feature is a game-changer. Quality exceeded our expectations every single time.",
      company: "TrendWear Inc."
    },
    {
      id: 5,
      name: "Aisha Rahman",
      role: "E-commerce Manager",
      image: "https://randomuser.me/api/portraits/women/26.jpg",
      rating: 5,
      comment: "Fantastic service! The team handled our complex requirements perfectly. The production quality is consistent, and delivery is always on schedule.",
      company: "StyleHub Online"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % feedbacks.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, feedbacks.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % feedbacks.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className={`py-16 px-4 overflow-hidden transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-orange-50 to-white'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <div className="inline-block mb-3 md:mb-4">
            <span className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wide ${
              isDark
                ? 'bg-orange-900 text-orange-300'
                : 'bg-orange-100 text-orange-600'
            }`}>
              Testimonials
            </span>
          </div>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 px-4 py-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            What Our <span className="text-orange-500">Clients Say</span>
          </h2>
          <p className={`text-base md:text-lg max-w-2xl mx-auto px-4 py-3 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Don't just take our word for it. Here's what our valued customers have to say about their experience.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto py-2">
          <div 
            className="overflow-hidden rounded-2xl"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className="w-full flex-shrink-0 px-4">
                  <div className={`rounded-2xl shadow-xl p-6 md:p-10 relative overflow-hidden group hover:shadow-2xl transition-all duration-300 ${
                    isDark
                      ? 'bg-gray-800 hover:bg-gray-750'
                      : 'bg-white'
                  }`}>
                    {/* Decorative Elements */}
                    <div className={`absolute -top-10 -right-10 w-32 h-32 md:w-40 md:h-40 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500 ${
                      isDark ? 'bg-orange-900' : 'bg-orange-100'
                    }`}></div>
                    <div className={`absolute -bottom-10 -left-10 w-32 h-32 md:w-40 md:h-40 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500 ${
                      isDark ? 'bg-orange-950' : 'bg-orange-50'
                    }`}></div>
                    
                    {/* Quote Icon */}
                    <div className={`absolute top-4 right-4 md:top-6 md:right-6 ${
                      isDark ? 'text-orange-900' : 'text-orange-200'
                    }`}>
                      <Quote size={48} className="transform rotate-180 md:w-16 md:h-16" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 mb-4 md:mb-6">
                        {/* Profile Image */}
                        <div className="relative flex-shrink-0">
                          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-orange-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <img 
                              src={feedback.image} 
                              alt={feedback.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-orange-500 rounded-full p-1.5 md:p-2 shadow-lg">
                            <Star size={14} className="text-white fill-white md:w-4 md:h-4" />
                          </div>
                        </div>

                        {/* Info */}
                        <div className="text-center md:text-left flex-1">
                          <h3 className={`text-xl md:text-2xl font-bold mb-1 ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {feedback.name}
                          </h3>
                          <p className={`font-semibold mb-1 text-sm md:text-base ${
                            isDark ? 'text-orange-400' : 'text-orange-600'
                          }`}>
                            {feedback.role}
                          </p>
                          <p className={`text-xs md:text-sm mb-2 md:mb-3 ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {feedback.company}
                          </p>
                          
                          {/* Rating */}
                          <div className="flex gap-0.5 md:gap-1 justify-center md:justify-start">
                            {[...Array(feedback.rating)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16}
                                className="text-orange-500 fill-orange-500 md:w-5 md:h-5"
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Comment */}
                      <p className={`text-sm md:text-lg leading-relaxed italic ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        "{feedback.comment}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className={`hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-300 z-10 ${
              isDark
                ? 'bg-gray-700 hover:bg-orange-500 text-gray-200 hover:text-white'
                : 'bg-white hover:bg-orange-500 text-gray-800 hover:text-white'
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className={`hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-300 z-10 ${
              isDark
                ? 'bg-gray-700 hover:bg-orange-500 text-gray-200 hover:text-white'
                : 'bg-white hover:bg-orange-500 text-gray-800 hover:text-white'
            }`}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 md:gap-3 mt-6 md:mt-8">
          {feedbacks.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 ${
                currentSlide === index 
                  ? 'w-8 md:w-12 bg-orange-500' 
                  : isDark
                    ? 'w-2 md:w-3 bg-gray-600 hover:bg-orange-300'
                    : 'w-2 md:w-3 bg-gray-300 hover:bg-orange-300'
              } h-2 md:h-3`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        <div className="text-center mt-4 md:mt-6">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`text-xs md:text-sm transition-colors duration-300 flex items-center gap-2 mx-auto ${
              isDark
                ? 'text-gray-400 hover:text-orange-400'
                : 'text-gray-500 hover:text-orange-500'
            }`}
          >
            {isAutoPlaying ? (
              <>
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                Auto-playing
              </>
            ) : (
              <>
                <span className={`w-2 h-2 rounded-full ${
                  isDark ? 'bg-gray-600' : 'bg-gray-400'
                }`}></span>
                Paused
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Feedback;