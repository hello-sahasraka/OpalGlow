import { Link } from "react-router-dom";
import { addToCart } from "../../Uitils/Cart";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { name, image, description, price, labeledPrice, altNames, productId, stock } = product;

  return (
    <div className="bg-white bg-opacity-90 rounded-lg shadow-lg w-full drop-shadow-md transition-transform hover:scale-[1.02]">
      {/* Product Image */}
        <img
          src={image && image[0] ? image[0] : 'https://static.vecteezy.com/system/resources/previews/007/746/382/non_2x/drag-and-drop-add-document-file-button-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg'}
          alt={name}
          className="w-full h-52 object-cover rounded-t-md"
        />
      <div className="flex flex-col gap-3 p-4 flex-grow justify-between">

        {/* Product Name */}
        <div className="h-[50px]">
          <Link to={`/products/${productId}`}>
            <h2 className="text-xl font-semibold text-gray-900 tracking-wide hover:text-blue-800">{name}</h2>
          </Link>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <p className="text-gray-700 font-bold text-2xl">${price.toFixed(2)}</p>
          {labeledPrice !== price && (
            <p className="text-gray-500 text-sm font-semibold line-through">${labeledPrice.toFixed(2)}</p>
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
          onClick={() => {
            toast.success('Product added to cart')
            addToCart(product, 1)
          }}
        >
          {stock > 0 ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
