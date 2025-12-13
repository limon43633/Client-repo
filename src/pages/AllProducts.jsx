import { useEffect, useState } from 'react';
import { useProducts } from '../contexts/ProductContext';
import { useTheme } from '../contexts/ThemeContext';
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
  const { allProducts, loading, error, fetchAllProducts } = useProducts();
  const { isDark } = useTheme();

  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOption, setSortOption] = useState("latest");

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length > 0) {
      let sorted = [...allProducts];

      if (sortOption === "low-to-high") {
        sorted.sort((a, b) => a.price - b.price);
      } 
      else if (sortOption === "high-to-low") {
        sorted.sort((a, b) => b.price - a.price);
      } 
      else {
        // Latest (default)
        sorted = [...allProducts];
      }

      setSortedProducts(sorted);
    }
  }, [allProducts, sortOption]);

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
    <div className={`min-h-screen pt-28 pb-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      
      <div className="max-w-[1280px] mx-auto px-4 py-16 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            All <span className="text-orange-500">Products</span>
          </h1>
          <p className={`text-sm sm:text-base lg:text-lg max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Browse our complete collection of premium garments. Find the perfect style for every occasion.
          </p>
        </div>

        {/* TOP BAR - COUNT + SORT */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">

          {/* COUNT */}
          <p className={`text-sm sm:text-base font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Showing <span className="text-orange-500">{sortedProducts.length}</span> products
          </p>

          {/* SORT DROPDOWN */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={`px-4 py-2 border rounded-lg text-sm sm:text-base cursor-pointer outline-none
              ${isDark ? 'bg-gray-800 text-gray-200 border-gray-700' : 'bg-white text-gray-700 border-gray-300'}`}
          >
            <option value="latest">✓ Latest</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>

        </div>

        {/* GRID */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {sortedProducts.map((product) => (
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
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