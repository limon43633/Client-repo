import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden group">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.category && (
          <span className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {product.category}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-orange-500">
              ৳{product.price}
            </p>
            <p className="text-xs text-gray-500">
              Min Order: {product.minimumOrderQuantity} pcs
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-600">
              Available: <span className="font-semibold text-green-600">{product.availableQuantity}</span>
            </p>
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/product/${product._id}`}
          className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-2.5 rounded-lg font-semibold transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;