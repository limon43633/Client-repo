import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { productAPI } from '../services/api';
import { FaShoppingCart, FaBox, FaShippingFast, FaTags, FaArrowLeft } from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProductDetails();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProductDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productAPI.getProductById(id);
      setProduct(response.data.data);
      setQuantity(response.data.data.minimumOrderQuantity || 1);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load product details');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (value) => {
    const newQty = parseInt(value);
    if (newQty >= product.minimumOrderQuantity && newQty <= product.availableQuantity) {
      setQuantity(newQty);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.availableQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > product.minimumOrderQuantity) {
      setQuantity(quantity - 1);
    }
  };

  const calculateTotal = () => {
    return (product.price * quantity).toFixed(2);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex justify-center items-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={`min-h-screen flex justify-center items-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Product Not Found
          </h2>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {error || 'The product you are looking for does not exist.'}
          </p>
          <button
            onClick={() => navigate('/all-products')}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-28 pb-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors ${
            isDark
              ? 'text-gray-300 hover:text-white hover:bg-gray-800'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
          }`}
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className={`rounded-2xl overflow-hidden shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="relative aspect-square">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.category && (
                  <span className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {product.category}
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-lg overflow-hidden transition-all ${
                      selectedImage === index
                        ? 'ring-4 ring-orange-500 scale-105'
                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Product Info */}
          <div className="space-y-6">
            {/* Product Title & Price */}
            <div>
              <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl font-bold text-orange-500">৳{product.price}</span>
                <span className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>per piece</span>
              </div>
            </div>

            {/* Product Description */}
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Description
              </h3>
              <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {product.description}
              </p>
            </div>

            {/* Product Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Available Quantity */}
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
                <div className="flex items-center gap-3 mb-2">
                  <FaBox className="text-orange-500 text-xl" />
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Available
                  </span>
                </div>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {product.availableQuantity}
                </p>
              </div>

              {/* Minimum Order */}
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
                <div className="flex items-center gap-3 mb-2">
                  <FaShippingFast className="text-orange-500 text-xl" />
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Min Order
                  </span>
                </div>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {product.minimumOrderQuantity} pcs
                </p>
              </div>
            </div>

            {/* Payment Options */}
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <div className="flex items-center gap-3 mb-3">
                <FaTags className="text-orange-500 text-xl" />
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Payment Options
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.paymentOptions?.map((option, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      isDark
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <label className={`block text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= product.minimumOrderQuantity}
                  className={`w-12 h-12 rounded-lg font-bold text-xl transition-colors ${
                    quantity <= product.minimumOrderQuantity
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : isDark
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  min={product.minimumOrderQuantity}
                  max={product.availableQuantity}
                  className={`w-24 h-12 text-center text-xl font-bold rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= product.availableQuantity}
                  className={`w-12 h-12 rounded-lg font-bold text-xl transition-colors ${
                    quantity >= product.availableQuantity
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : isDark
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  +
                </button>
              </div>
              <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Min: {product.minimumOrderQuantity} | Max: {product.availableQuantity}
              </p>
            </div>

            {/* Total Price */}
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <div className="flex justify-between items-center">
                <span className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Total Price:
                </span>
                <span className="text-3xl font-bold text-orange-500">
                  ৳{calculateTotal()}
                </span>
              </div>
            </div>

            {/* Order Button */}
            <button
              onClick={() => alert('Login required! (Will implement authentication next)')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
            >
              <FaShoppingCart />
              <span>Order Now</span>
            </button>

            {/* Info Note */}
            <p className={`text-sm text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              🔒 Please login to place an order
            </p>

            {/* Created By Info */}
            {product.createdBy && (
              <div className={`p-4 rounded-xl border-2 border-dashed ${
                isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-50'
              }`}>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Managed by: <span className="font-semibold text-orange-500">{product.createdBy.name}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;