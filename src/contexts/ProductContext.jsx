import { createContext, useContext, useState, useEffect } from 'react';
import { productAPI } from '../services/api';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [homeProducts, setHomeProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('latest');

  // Fetch home page products
  const fetchHomeProducts = async (sort = 'latest') => {
    setLoading(true);
    setError(null);
    try {
      const response = await productAPI.getHomeProducts(sort);
      setHomeProducts(response.data.data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching home products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all products
  const fetchAllProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productAPI.getAllProducts();
      setAllProducts(response.data.data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching all products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchHomeProducts(sortBy);
  }, [sortBy]);

  const value = {
    homeProducts,
    allProducts,
    loading,
    error,
    sortBy,
    setSortBy,
    fetchHomeProducts,
    fetchAllProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};