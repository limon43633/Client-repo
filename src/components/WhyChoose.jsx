import React from "react";
import { ShieldCheck, Users, Truck } from "lucide-react";
import { useTheme } from '../contexts/ThemeContext';

const WhyChoose = () => {
  const { isDark } = useTheme();

  return (
    <section className={`py-12 transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="max-w-[1280px] mx-auto px-4 py-15">
        <h2 className={`text-3xl md:text-4xl font-semibold text-center mb-10 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Why Choose Us
        </h2>

        <div className="grid gap-6 md:grid-cols-3 max-w-[1280px] mx-auto px-4">
          {/* Card 1 */}
          <div className={`flex flex-col items-center rounded-xl border px-6 py-10 shadow-sm transition-colors duration-300 ${
            isDark 
              ? 'border-gray-700 bg-gray-800' 
              : 'border-gray-200 bg-white'
          }`}>
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
              <ShieldCheck className="h-8 w-8 text-orange-500" />
            </div>
            <h3 className={`mb-2 text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Quality Assured
            </h3>
            <p className={`text-center text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Every garment passes strict quality checks
            </p>
          </div>

          {/* Card 2 */}
          <div className={`flex flex-col items-center rounded-xl border px-6 py-10 shadow-sm transition-colors duration-300 ${
            isDark 
              ? 'border-gray-700 bg-gray-800' 
              : 'border-gray-200 bg-white'
          }`}>
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
              <Users className="h-8 w-8 text-orange-500" />
            </div>
            <h3 className={`mb-2 text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Dedicated Support
            </h3>
            <p className={`text-center text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              24/7 customer service for all your needs
            </p>
          </div>

          {/* Card 3 */}
          <div className={`flex flex-col items-center rounded-xl border px-6 py-10 shadow-sm transition-colors duration-300 ${
            isDark 
              ? 'border-gray-700 bg-gray-800' 
              : 'border-gray-200 bg-white'
          }`}>
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
              <Truck className="h-8 w-8 text-orange-500" />
            </div>
            <h3 className={`mb-2 text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Fast Shipping
            </h3>
            <p className={`text-center text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Quick and reliable delivery worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;