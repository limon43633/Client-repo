// client/src/pages/dashboard/manager/ManageProducts.jsx
import { useState, useEffect } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { productAPI } from '../../../services/api';
import { 
  FaSearch, 
  FaFilter, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaBox,
  FaDollarSign,
  FaTag,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner
} from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ManageProducts = () => {
  const { isDark } = useTheme();
  
  // Set page title
  useEffect(() => {
    document.title = 'Manage Products | Garments Tracker';
    return () => {
      document.title = 'Garments Tracker';
    };
  }, []);
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [deletingId, setDeletingId] = useState(null);

  const categories = [
    'all', 'Shirt', 'T-Shirt', 'Polo Shirt', 'Pant', 'Jeans', 'Jacket',
    'Sweater', 'Hoodie', 'Coat', 'Blazer', 'Kurta', 'Panjabi',
    'Saree', 'Salwar Kameez', 'Lehenga', 'Children Wear', 'Uniform',
    'Accessories', 'Others'
  ];

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productAPI.getAllProducts({ limit: 100 });
      setProducts(response.data?.data || response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Handle delete product
  const handleDeleteProduct = async (productId, productName) => {
    const result = await Swal.fire({
      title: 'Delete Product?',
      html: `Are you sure you want to delete <strong>"${productName}"</strong>?<br>This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        setDeletingId(productId);
        const response = await productAPI.deleteProduct(productId);
        
        if (response.data.success) {
          Swal.fire(
            'Deleted!',
            'Product has been deleted successfully.',
            'success'
          );
          
          // Update local state
          setProducts(products.filter(p => p._id !== productId));
        }
      } catch (error) {
        Swal.fire(
          'Error!',
          error.response?.data?.message || 'Failed to delete product',
          'error'
        );
      } finally {
        setDeletingId(null);
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl sm:text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Manage <span className="text-orange-500">Products</span>
        </h1>
        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          View and manage all your products
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Products</p>
          <p className="text-2xl font-bold text-orange-500">{products.length}</p>
        </div>
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>On Home Page</p>
          <p className="text-2xl font-bold text-blue-500">
            {products.filter(p => p.showOnHome).length}
          </p>
        </div>
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>In Stock</p>
          <p className="text-2xl font-bold text-green-500">
            {products.filter(p => p.availableQuantity > 0).length}
          </p>
        </div>
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Out of Stock</p>
          <p className="text-2xl font-bold text-red-500">
            {products.filter(p => p.availableQuantity <= 0).length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className={`p-5 rounded-2xl mb-8 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      } shadow-lg`}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Search by product name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                isDark 
                  ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3">
            <FaFilter className={isDark ? 'text-gray-400' : 'text-gray-500'} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={`px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                isDark 
                  ? 'bg-gray-900 border-gray-700 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Add Product Button */}
          <Link
            to="/dashboard/add-product"
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <FaBox />
            Add New Product
          </Link>
        </div>
      </div>

      {/* Products Table */}
      {filteredProducts.length === 0 ? (
        <div className={`p-12 rounded-2xl text-center ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'
        }`}>
          <div className="text-6xl mb-6">📦</div>
          <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {products.length === 0 ? 'No Products Yet' : 'No Products Found'}
          </h3>
          <p className={`text-lg mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {products.length === 0 
              ? "You haven't added any products yet. Start by adding your first product!"
              : 'Try changing your search or filter criteria'}
          </p>
          <Link
            to="/dashboard/add-product"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            <FaBox />
            Add Your First Product
          </Link>
        </div>
      ) : (
        <div className={`rounded-2xl overflow-hidden ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        } shadow-xl`}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className={isDark ? 'bg-gray-900' : 'bg-gray-50'}>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    On Home
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {filteredProducts.map((product) => (
                  <tr key={product._id} className={isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={product.images?.[0] || 'https://via.placeholder.com/150'}
                            alt={product.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {product.name}
                          </div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Added {formatDate(product.createdAt)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                      }`}>
                        <FaTag className="inline mr-1" />
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {formatCurrency(product.price)}
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        MOQ: {product.minimumOrderQuantity}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                          <div 
                            className={`h-2 rounded-full ${
                              product.availableQuantity > 20 
                                ? 'bg-green-500' 
                                : product.availableQuantity > 10
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min((product.availableQuantity / 100) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <span className={`ml-2 text-sm font-medium ${
                          product.availableQuantity > 20 
                            ? 'text-green-600' 
                            : product.availableQuantity > 10
                            ? 'text-yellow-600'
                            : 'text-red-600'
                        }`}>
                          {product.availableQuantity}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {product.showOnHome ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-600">
                          <FaCheckCircle className="mr-1" />
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-600">
                          <FaTimesCircle className="mr-1" />
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Link
                          to={`/product/${product._id}`}
                          target="_blank"
                          className={`p-2 rounded-lg ${
                            isDark 
                              ? 'text-gray-400 hover:bg-gray-700 hover:text-white' 
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                          title="View"
                        >
                          <FaEye />
                        </Link>
                        <Link
                          to={`/dashboard/update-product/${product._id}`}
                          className={`p-2 rounded-lg ${
                            isDark 
                              ? 'text-blue-400 hover:bg-gray-700 hover:text-blue-300' 
                              : 'text-blue-600 hover:bg-gray-100 hover:text-blue-700'
                          }`}
                          title="Edit"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(product._id, product.name)}
                          disabled={deletingId === product._id}
                          className={`p-2 rounded-lg ${
                            isDark 
                              ? 'text-red-400 hover:bg-gray-700 hover:text-red-300' 
                              : 'text-red-600 hover:bg-gray-100 hover:text-red-700'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                          title="Delete"
                        >
                          {deletingId === product._id ? (
                            <FaSpinner className="animate-spin" />
                          ) : (
                            <FaTrash />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Management Tips */}
      {products.length > 0 && (
        <div className={`mt-8 p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
          <h3 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            📝 Product Management Tips:
          </h3>
          <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <li>• Keep stock levels updated regularly to avoid overselling</li>
            <li>• Update product information when there are changes in pricing or availability</li>
            <li>• Use "Show on Home" feature for your best-selling or new products</li>
            <li>• Monitor which products are performing well and which need improvement</li>
            <li>• Regularly check and update product images for better presentation</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;