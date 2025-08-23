import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../Components/Loader';
import { CirclePlus, Plus, Minus } from 'lucide-react';
import errorImg from '../../assets/Copilot_20250727_121842.png';
import ImageSlider from '../../Components/ImageSlider';
import { addToCart } from '../../../Uitils/Cart';
import Footer from '../../Components/Footer';

const ProductOverview = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();

    if (productId == null) {
        toast.error("Product ID is missing.");
        navigate("/products");
    }

    const [product, setProduct] = useState(null);
    const [state, setState] = useState("loading"); // loaded, error
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (state === "loading") {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/product/getproductbyid/" + productId)
                .then((response) => {
                    setProduct(response.data);
                    setState("loaded");
                })
                .catch(() => {
                    setState("error");
                    toast.error("Failed to load product details.");
                });
        }
    }, [state, productId]);

    const byNow = () => {
        const updatedProduct = { ...product, quantity };
        updatedProduct.image = product.image[0];
        const cartItems = [updatedProduct];
        navigate("/placeorder", { state: { cartItems } });
    };

    return (
        <div className="w-full h-full">
            {state === "loading" && <Loader />}

            {state === "loaded" && (
                <div className="w-full h-full px-4 md:px-[100px] py-10 flex flex-col justify-center md:flex-row gap-6">

                    <div className="w-full h-full flex flex-col md:flex-row gap-6 lg:h-[550px]">

                        {/* Image Desktop*/}
                        <div className="hidden lg:block w-full md:w-1/2 h-[400px] lg:h-full rounded-md">
                            <ImageSlider image={product.image} />
                        </div>

                        {/* Product Details */}
                        <div className="w-full md:w-1/2 px-2 sm:px-4 flex flex-col justify-between gap-4 h-full md:h-full lg:h-4/5">

                            {/* Product Name */}
                            <h2 className="text-2xl md:text-4xl font-bold text-gray-800/80 tracking-wide uppercase">
                                {product.name}
                            </h2>

                            {/* Alternate Names */}
                            {product.altNames && product.altNames.length > 0 && (
                                <p className="text-sm text-gray-600 tracking-wide">
                                    {product.altNames.join(' | ')}
                                </p>
                            )}

                            {/* Mobile device image */}
                            <div className="block lg:hidden w-full h-[300px] md:h-[350px] rounded-md">
                                <ImageSlider image={product.image} />
                            </div>

                            {/* Description */}
                            <p className="line-clamp-3 text-sm font-md text-gray-500 leading-snug">
                                {product.description}
                            </p>

                            {/* Price */}
                            <div className="w-full md:w-1/2">
                                <div className="flex flex-col items-start gap-1">
                                    <p className="text-gray-600/90 font-bold text-2xl md:text-3xl">
                                        ${product.price.toFixed(2)}
                                    </p>
                                    {product.labeledPrice !== product.price && (
                                        <p className="text-gray-500 text-sm font-semibold line-through">
                                            ${product.labeledPrice.toFixed(2)}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Stock */}
                            <p
                                className={`text-sm font-medium ${
                                    product.stock > 0 ? 'text-green-600' : 'text-red-600'
                                }`}
                            >
                                {product.stock > 0
                                    ? `In Stock (${product.stock} available)`
                                    : 'Out of Stock'}
                            </p>

                            {/* Quantity Selector */}
                            <div className="flex items-center justify-between w-[120px] px-4 py-1.5 border border-gray-300 rounded-md">
                                <button
                                    className="text-gray-700 text-2xl disabled:opacity-30 cursor-pointer"
                                    onClick={() => setQuantity(quantity - 1)}
                                    disabled={quantity === 1}
                                >
                                    <Minus size={15} />
                                </button>
                                <span className="font-semibold">{quantity}</span>
                                <button
                                    className="text-gray-700 text-2xl disabled:opacity-30 cursor-pointer"
                                    onClick={() => setQuantity(quantity + 1)}
                                    disabled={quantity === product.stock}
                                >
                                    <Plus size={15} />
                                </button>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-8 w-full md:w-2/3 mt-2">
                                <button
                                    disabled={product.stock === 0}
                                    className={`py-3 w-full sm:w-1/2 text-center rounded-md font-semibold text-md cursor-pointer flex justify-center ${
                                        product.stock > 0
                                            ? 'bg-gray-800 text-white hover:bg-gray-800/80'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    } transition duration-300`}
                                    onClick={byNow}
                                >
                                    {product.stock > 0 ? 'Buy Now' : 'Unavailable'}
                                </button>

                                <button
                                    disabled={product.stock === 0}
                                    className={`py-3 w-full sm:w-1/2 text-center rounded-md font-semibold text-md cursor-pointer flex justify-center ${
                                        product.stock > 0
                                            ? 'bg-rose-800 text-white hover:bg-rose-800/80'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    } transition duration-300`}
                                    onClick={() => {
                                        addToCart(product, quantity);
                                        toast.success('Product added to cart');
                                    }}
                                >
                                    {product.stock > 0 ? (
                                        <span className="inline-flex gap-2">
                                            <CirclePlus /> Add to Cart
                                        </span>
                                    ) : (
                                        'Unavailable'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {state === "error" && (
                <div className="flex flex-col items-center justify-center h-full px-4 text-center">
                    <img src={errorImg} alt="Error" className="w-[100px] md:w-[10%] mx-auto" />
                    <h2 className="text-xl md:text-2xl font-bold text-gray-600">
                        <span className="text-4xl md:text-5xl text-rose-800">Oops!</span>
                        <br />
                        Product Not Found
                    </h2>
                    <p className="text-gray-500 text-sm p-4">
                        We're sorry, but the product you are looking for does not exist or has
                        been removed.
                    </p>
                    <button
                        onClick={() => navigate("/products")}
                        className="mt-4 px-4 py-2 font-semibold bg-rose-600 text-white rounded hover:bg-rose-700"
                    >
                        Go to Products
                    </button>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default ProductOverview;
