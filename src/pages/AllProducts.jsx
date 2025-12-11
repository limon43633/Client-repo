import { useEffect } from 'react';
import { useProducts } from '../contexts/ProductContext';
import { useTheme } from '../contexts/ThemeContext';
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
  const { allProducts, loading, error, fetchAllProducts } = useProducts();
  const { isDark } = useTheme();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen flex justify-center items-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex justify-center items-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">Error: {error}</p>
          <button 
            onClick={fetchAllProducts}
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Container */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            All <span className="text-orange-500">Products</span>
          </h1>
          <p className={`text-sm sm:text-base lg:text-lg max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Browse our complete collection of premium garments. Find the perfect style for every occasion.
          </p>
        </div>

        {/* Products Count */}
        <div className="flex justify-between items-center mb-8">
          <p className={`text-sm sm:text-base font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Showing <span className="text-orange-500">{allProducts.length}</span> products
          </p>
        </div>

        {/* Products Grid */}
        {allProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {allProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              No Products Found
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Check back later for new arrivals!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;