import { useProducts } from '../contexts/ProductContext';
import ProductCard from './ProductCard';
import { useTheme } from '../contexts/ThemeContext';

const OurProducts = () => {
  const { homeProducts, loading, error, sortBy, setSortBy } = useProducts();
  const { isDark } = useTheme();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Fixed Container - Matching Banner */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Our <span className='text-orange-500'>Products</span>
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover our premium collection of garments crafted with quality and style
          </p>
        </div>

        {/* Sort Filter */}
        <div className="flex justify-end mb-8">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base ${
              isDark 
                ? 'bg-gray-800 text-white border-gray-700' 
                : 'bg-white text-gray-800 border-gray-300'
            }`}
          >
            <option value="latest">Latest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        {homeProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {homeProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              No products available
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurProducts;