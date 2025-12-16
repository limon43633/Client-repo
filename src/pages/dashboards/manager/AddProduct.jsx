// client/src/pages/dashboard/manager/AddProduct.jsx
import { useState, useEffect } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { productAPI } from '../../../services/api';
import { 
  FaPlus, 
  FaImage, 
  FaYoutube, 
  FaTag, 
  FaDollarSign, 
  FaBox, 
  FaShippingFast,
  FaSave,
  FaTimes,
  FaUpload
} from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddProduct = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  
  // Set page title
  useEffect(() => {
    document.title = 'Add Product | Garments Tracker';
    return () => {
      document.title = 'Garments Tracker';
    };
  }, []);
  
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(['']);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Shirt',
    price: '',
    availableQuantity: '',
    minimumOrderQuantity: '',
    demoVideoLink: '',
    paymentOptions: ['Cash on Delivery'],
    showOnHome: false
  });

  const categories = [
    'Shirt', 'T-Shirt', 'Polo Shirt', 'Pant', 'Jeans', 'Jacket',
    'Sweater', 'Hoodie', 'Coat', 'Blazer', 'Kurta', 'Panjabi',
    'Saree', 'Salwar Kameez', 'Lehenga', 'Children Wear', 'Uniform',
    'Accessories', 'Others'
  ];

  const paymentOptionsList = [
    'Cash on Delivery',
    'PayFirst (Advance Payment)',
    'Card Payment',
    'bKash',
    'Nagad',
    'Bank Transfer'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => {
    if (images.length < 5) {
      setImages([...images, '']);
    } else {
      toast.error('Maximum 5 images allowed');
    }
  };

  const removeImageField = (index) => {
    if (images.length > 1) {
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
    }
  };

  const handlePaymentOptionToggle = (option) => {
    const currentOptions = [...formData.paymentOptions];
    if (currentOptions.includes(option)) {
      const newOptions = currentOptions.filter(opt => opt !== option);
      setFormData(prev => ({ ...prev, paymentOptions: newOptions }));
    } else {
      if (currentOptions.length < 3) {
        setFormData(prev => ({ ...prev, paymentOptions: [...currentOptions, option] }));
      } else {
        toast.error('Maximum 3 payment options allowed');
      }
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Product name is required');
      return false;
    }
    if (!formData.description.trim()) {
      toast.error('Product description is required');
      return false;
    }
    if (!formData.price || formData.price <= 0) {
      toast.error('Valid price is required');
      return false;
    }
    if (!formData.availableQuantity || formData.availableQuantity <= 0) {
      toast.error('Available quantity is required');
      return false;
    }
    if (!formData.minimumOrderQuantity || formData.minimumOrderQuantity <= 0) {
      toast.error('Minimum order quantity is required');
      return false;
    }
    if (formData.minimumOrderQuantity > formData.availableQuantity) {
      toast.error('Minimum order cannot be greater than available quantity');
      return false;
    }
    if (images.filter(img => img.trim()).length === 0) {
      toast.error('At least one image URL is required');
      return false;
    }
    if (formData.paymentOptions.length === 0) {
      toast.error('At least one payment option is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const result = await Swal.fire({
      title: 'Add Product?',
      text: 'Are you sure you want to add this product?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#f97316',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        availableQuantity: parseInt(formData.availableQuantity),
        minimumOrderQuantity: parseInt(formData.minimumOrderQuantity),
        images: images.filter(img => img.trim()),
        createdBy: 'manager', // In real app, use actual manager ID
        createdAt: new Date().toISOString()
      };

      const response = await productAPI.createProduct(productData);
      
      if (response.data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Product added successfully!',
          icon: 'success',
          confirmButtonColor: '#f97316'
        });
        
        // Reset form
        setFormData({
          name: '',
          description: '',
          category: 'Shirt',
          price: '',
          availableQuantity: '',
          minimumOrderQuantity: '',
          demoVideoLink: '',
          paymentOptions: ['Cash on Delivery'],
          showOnHome: false
        });
        setImages(['']);
        
        // Navigate to manage products
        navigate('/dashboard/manage-products');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to add product',
        icon: 'error',
        confirmButtonColor: '#f97316'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl sm:text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Add <span className="text-orange-500">New Product</span>
        </h1>
        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Add new garments products to your catalog
        </p>
      </div>

      <div className={`rounded-2xl p-6 ${
        isDark 
          ? 'bg-gray-800 border border-gray-700' 
          : 'bg-white border border-gray-200'
      } shadow-xl`}>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div>
            <h2 className={`text-xl font-bold mb-6 pb-3 border-b ${isDark ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'}`}>
              <FaTag className="inline mr-2 text-orange-500" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    isDark 
                      ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Enter product name"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    isDark 
                      ? 'bg-gray-900 border-gray-700 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Product Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none ${
                  isDark 
                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Describe your product in detail..."
                required
              />
            </div>
          </div>

          {/* Pricing & Quantity */}
          <div>
            <h2 className={`text-xl font-bold mb-6 pb-3 border-b ${isDark ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'}`}>
              <FaDollarSign className="inline mr-2 text-orange-500" />
              Pricing & Quantity
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Price (BDT) *
                </label>
                <div className="relative">
                  <span className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    ৳
                  </span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="1"
                    step="0.01"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      isDark 
                        ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              {/* Available Quantity */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Available Quantity *
                </label>
                <div className="relative">
                  <span className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <FaBox />
                  </span>
                  <input
                    type="number"
                    name="availableQuantity"
                    value={formData.availableQuantity}
                    onChange={handleInputChange}
                    min="1"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      isDark 
                        ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              {/* Minimum Order Quantity */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Minimum Order Quantity *
                </label>
                <div className="relative">
                  <span className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <FaShippingFast />
                  </span>
                  <input
                    type="number"
                    name="minimumOrderQuantity"
                    value={formData.minimumOrderQuantity}
                    onChange={handleInputChange}
                    min="1"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      isDark 
                        ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="0"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <h2 className={`text-xl font-bold mb-6 pb-3 border-b ${isDark ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'}`}>
              <FaImage className="inline mr-2 text-orange-500" />
              Product Images
            </h2>
            
            <div className="space-y-4">
              {images.map((image, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-1">
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Image URL {index + 1} {index === 0 && '*'}
                    </label>
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                        isDark 
                          ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="flex items-end">
                    {images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className={`px-4 py-3 rounded-xl font-medium ${
                          isDark 
                            ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' 
                            : 'bg-red-100 text-red-600 hover:bg-red-200'
                        }`}
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {images.length < 5 && (
                <button
                  type="button"
                  onClick={addImageField}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium ${
                    isDark 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <FaPlus />
                  Add Another Image
                </button>
              )}
              
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                * Upload images to a service like ImgBB, Cloudinary or Firebase Storage and paste the URL here
              </p>
            </div>
          </div>

          {/* Demo Video */}
          <div>
            <h2 className={`text-xl font-bold mb-6 pb-3 border-b ${isDark ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'}`}>
              <FaYoutube className="inline mr-2 text-orange-500" />
              Demo Video (Optional)
            </h2>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                YouTube or Video URL
              </label>
              <input
                type="url"
                name="demoVideoLink"
                value={formData.demoVideoLink}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  isDark 
                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          </div>

          {/* Payment Options */}
          <div>
            <h2 className={`text-xl font-bold mb-6 pb-3 border-b ${isDark ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'}`}>
              <MdPayment className="inline mr-2 text-orange-500" />
              Payment Options *
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {paymentOptionsList.map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handlePaymentOptionToggle(option)}
                  className={`px-4 py-3 rounded-xl text-left transition-all ${
                    formData.paymentOptions.includes(option)
                      ? 'bg-orange-500 text-white'
                      : isDark
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <p className={`text-sm mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Selected: {formData.paymentOptions.join(', ')}
            </p>
          </div>

          {/* Show on Home */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-orange-600/10">
            <div>
              <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Show on Home Page
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                This product will appear in the home page "Our Products" section
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="showOnHome"
                checked={formData.showOnHome}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className={`w-12 h-6 rounded-full peer ${
                isDark 
                  ? 'bg-gray-700 peer-checked:bg-orange-500' 
                  : 'bg-gray-300 peer-checked:bg-orange-500'
              } peer-focus:ring-2 peer-focus:ring-orange-300`}>
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform ${
                  isDark ? 'bg-gray-300' : 'bg-white'
                } ${formData.showOnHome ? 'translate-x-6' : ''}`}></div>
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-400/30">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Adding Product...
                </>
              ) : (
                <>
                  <FaSave />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Tips */}
      <div className={`mt-8 p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <h3 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          💡 Tips for Adding Products:
        </h3>
        <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <li>• Use high-quality images for better customer experience</li>
          <li>• Provide detailed description including fabric, size, care instructions</li>
          <li>• Set realistic minimum order quantities</li>
          <li>• Choose appropriate payment options for your target customers</li>
          <li>• Products with "Show on Home" enabled will appear on homepage</li>
        </ul>
      </div>
    </div>
  );
};

export default AddProduct;