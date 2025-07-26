

const ProductCard = ({ product }) => {
  const { name, image, description, price, labeledPrice, altNames, stock } = product;

  return (
    <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-4 w-full flex flex-col gap-4 drop-shadow-md transition-transform hover:scale-[1.02]">
      {/* Product Image */}
      <img
        src={image[0]}
        alt={name}
        className="w-full h-48 object-cover rounded-md"
      />

      {/* Product Name */}
      <h2 className="h-[60px] text-xl font-semibold text-gray-900 tracking-wide">{name}</h2>

      {/* Alternate Names (if available) */}
      {altNames && altNames.length > 0 && (
        <p className="h-[30px] text-xs text-gray-600 italic tracking-wide">
          Also known as: {altNames.join(', ')}
        </p>
      )}

      {/* Description */}
      <p className="h-[45px] text-sm text-gray-700 leading-snug overflow-ellipsis">{description}</p>

      {/* Price Section */}
      <div className="flex items-center justify-between mt-2">
        <p className="text-rose-700 font-bold text-lg">${price.toFixed(2)}</p>
        {labeledPrice !== price && (
          <p className="text-gray-500 text-sm line-through">${labeledPrice.toFixed(2)}</p>
        )}
      </div>

      {/* Stock Status */}
      <p className={`text-sm font-medium ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {stock > 0 ? `In Stock (${stock} available)` : 'Out of Stock'}
      </p>

      {/* Add to Cart Button (Optional) */}
      <button
        disabled={stock === 0}
        className={`mt-2 py-2 w-full text-center rounded-md font-semibold text-sm ${
          stock > 0
            ? 'bg-black text-white hover:bg-gray-800'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        } transition duration-300`}
      >
        {stock > 0 ? 'Add to Cart' : 'Unavailable'}
      </button>
    </div>
  );
};

export default ProductCard;
