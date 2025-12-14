import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { productAPI } from '../services/api';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';

const BookingPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { user } = useAuth();

  // Get product and quantity from location state (passed from Product Details)
  const locationProduct = location.state?.product;
  const locationQuantity = location.state?.quantity || 1;
  const locationTotalPrice = location.state?.totalPrice || 0;

  const [product, setProduct] = useState(locationProduct || null);
  const [loading, setLoading] = useState(!locationProduct);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: user?.email || '',
    productTitle: locationProduct?.name || '',
    price: locationProduct?.price || 0,
    firstName: '',
    lastName: '',
    orderQuantity: locationQuantity,
    orderPrice: locationTotalPrice,
    contactNumber: '',
    deliveryAddress: '',
    additionalNotes: '',
    paymentOption: locationProduct?.paymentOptions?.[0] || 'Cash on Delivery'
  });

  // Fetch product if not passed through state
  useEffect(() => {
    if (!locationProduct) {
      fetchProduct();
    }
  }, [id]);

  // Update form when product loads
  useEffect(() => {
    if (product) {
      setFormData(prev => ({
        ...prev,
        productTitle: product.name,
        price: product.price,
        orderPrice: (product.price * prev.orderQuantity).toFixed(2)
      }));
    }
  }, [product]);

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getProductById(id);
      setProduct(response.data.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product details');
      navigate('/all-products');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };

      // Auto-calculate order price when quantity changes
      if (name === 'orderQuantity' && product) {
        const qty = parseInt(value) || 0;
        updated.orderPrice = (product.price * qty).toFixed(2);
      }

      return updated;
    });
  };

  const validateQuantity = () => {
    const qty = parseInt(formData.orderQuantity);
    if (qty < product.minimumOrderQuantity) {
      toast.error(`Minimum order quantity is ${product.minimumOrderQuantity}`);
      return false;
    }
    if (qty > product.availableQuantity) {
      toast.error(`Only ${product.availableQuantity} items available`);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateQuantity()) return;

    setSubmitting(true);

    try {
      const orderData = {
        userId: user.uid,
        userEmail: user.email,
        userName: `${formData.firstName} ${formData.lastName}`,
        productId: product._id,
        productTitle: formData.productTitle,
        productPrice: formData.price,
        orderQuantity: parseInt(formData.orderQuantity),
        orderPrice: parseFloat(formData.orderPrice),
        contactNumber: formData.contactNumber,
        deliveryAddress: formData.deliveryAddress,
        additionalNotes: formData.additionalNotes,
        paymentOption: formData.paymentOption,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Save order to database
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        orderData
      );

      toast.success('Order placed successfully!');

      // Check if payment is required
      if (formData.paymentOption === 'PayFast') {
        // Redirect to payment page (will implement later)
        toast.info('Redirecting to payment...');
        // navigate(`/payment/${response.data.data._id}`);
        
        // For now, just redirect to dashboard
        setTimeout(() => {
          navigate('/dashboard/my-orders');
        }, 2000);
      } else {
        // Cash on Delivery - no payment needed
        navigate('/dashboard/my-orders');
      }

    } catch (error) {
      console.error('Order submission error:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex justify-center items-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`min-h-screen flex justify-center items-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">Product not found</p>
          <button
            onClick={() => navigate('/all-products')}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-28 pb-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Complete Your <span className="text-orange-500">Order</span>
          </h1>
          <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Fill in the details below to place your order
          </p>
        </div>

        {/* Booking Form */}
        <div className={`rounded-2xl shadow-xl p-6 sm:p-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Info (Read-only) */}
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Order Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Product:</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {formData.productTitle}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Unit Price:</span>
                  <span className="font-semibold text-orange-500">৳{formData.price}</span>
                </div>
              </div>
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none ${
                  isDark
                    ? 'bg-gray-700/50 border-gray-600 text-gray-400'
                    : 'bg-gray-100 border-gray-300 text-gray-600'
                } cursor-not-allowed`}
              />
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            {/* Order Quantity & Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Order Quantity *
                </label>
                <input
                  type="number"
                  name="orderQuantity"
                  value={formData.orderQuantity}
                  onChange={handleChange}
                  min={product.minimumOrderQuantity}
                  max={product.availableQuantity}
                  required
                  disabled={submitting}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Min: {product.minimumOrderQuantity} | Max: {product.availableQuantity}
                </p>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Total Price
                </label>
                <input
                  type="text"
                  name="orderPrice"
                  value={`৳${formData.orderPrice}`}
                  readOnly
                  className={`w-full px-4 py-3 rounded-lg border text-lg font-bold text-orange-500 ${
                    isDark
                      ? 'bg-gray-700/50 border-gray-600'
                      : 'bg-gray-100 border-gray-300'
                  } cursor-not-allowed`}
                />
              </div>
            </div>

            {/* Contact Number */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Contact Number *
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                disabled={submitting}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder="Enter your contact number"
              />
            </div>

            {/* Delivery Address */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Delivery Address *
              </label>
              <textarea
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                required
                rows="3"
                disabled={submitting}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder="Enter your delivery address"
              />
            </div>

            {/* Payment Option */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Payment Option *
              </label>
              <select
                name="paymentOption"
                value={formData.paymentOption}
                onChange={handleChange}
                required
                disabled={submitting}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {product.paymentOptions?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Notes */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Additional Notes / Instructions
              </label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                rows="3"
                disabled={submitting}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder="Any special instructions? (Optional)"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaShoppingCart />
              <span>{submitting ? 'Placing Order...' : 'Place Order'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;