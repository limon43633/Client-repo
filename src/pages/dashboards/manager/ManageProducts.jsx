import { useTheme } from "./../../../contexts/ThemeContext";
const ManageProducts = () => {
  const { isDark } = useTheme();
  
  return (
    <div>
      <h1 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Manage Products
      </h1>
      <div className={`p-8 rounded-2xl text-center ${
        isDark ? 'bg-gray-800/50' : 'bg-gray-50'
      }`}>
        <div className="text-6xl mb-4">📊</div>
        <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Manage Products Page
        </h3>
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
          Manager feature - Coming soon!
        </p>
      </div>
    </div>
  );
};

export default ManageProducts;