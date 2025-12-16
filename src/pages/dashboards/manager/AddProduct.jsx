import { useState } from 'react';
import { useTheme } from "./../../../contexts/ThemeContext";
import { FaPlus, FaImage, FaYoutube, FaTag } from 'react-icons/fa';

const AddProduct = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Shirt',
    price: '',
    availableQuantity: '',
    minimumOrderQuantity: '',
    images: [''],
    demoVideoLink: '',
    paymentOptions: ['Cash on Delivery'],
    showOnHome: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Add Product feature coming soon!');
  };

  return (
    <div>
      <h1 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Add New Product
      </h1>
      <div className={`p-8 rounded-2xl text-center ${
        isDark ? 'bg-gray-800/50' : 'bg-gray-50'
      }`}>
        <div className="text-6xl mb-4">📦</div>
        <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Add Product Page
        </h3>
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
          Manager feature - Coming soon!
        </p>
      </div>
    </div>
  );
};

export default AddProduct;