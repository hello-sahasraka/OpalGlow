import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Components/Loader";
import ProductCard from "../../Components/ProductCard";
import noProduct from "../../assets/Copilot_20250727_121842.png";
import { Search, X } from "lucide-react";
import Footer from "../../Components/Footer";

const ProductsPage = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch all products on mount
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = () => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product/getproduct")
      .then((response) => {
        setProductList(response.data);
      })
      .finally(() => setLoading(false));
  };

  const searchProduct = () => {
    if (search.trim() === "") {
      fetchAllProducts();
      return;
    }

    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/product/searchproduct/${search}`)
      .then((response) => {
        setProductList(response.data.products || []);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" bg-rose-50">
          <div className="w-full h-full flex flex-col px-4 sm:px-6 lg:px-20">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 py-8 sm:py-12">
              {/* Title */}
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">
                Find Your Next <span className="text-rose-500">Favorite</span> Product
              </p>

              {/* Search Bar */}
              <div className="w-full sm:w-1/2 lg:w-1/3 text-sm font-semibold drop-shadow-md flex relative">
                {/* Input */}
                <input
                  type="text"
                  placeholder="Search products here..."
                  className="placeholder:text-gray-500 placeholder:text-xs pl-3 pr-20 border border-gray-300 bg-white/80 rounded-full 
                    w-full h-[50px] focus:outline-red-500 placeholder:opacity-80 placeholder:italic leading-[50px]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && searchProduct()}
                />

                {/* Clear (X) Button */}
                {search && (
                  <button
                    className="absolute top-1/2 right-12 -translate-y-1/2 h-[30px] w-[30px] flex items-center justify-center hover:text-gray-700 rounded-full text-gray-400"
                    onClick={() => setSearch("")}
                  >
                    <X size={20} />
                  </button>
                )}

                {/* Search Button */}
                <button
                  className="absolute top-1/2 right-1.5 -translate-y-1/2 h-[40px] w-[40px] flex items-center justify-center bg-rose-500 font-semibold text-white rounded-full cursor-pointer hover:bg-rose-600"
                  onClick={searchProduct}
                >
                  <Search size={20} />
                </button>
              </div>

            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
              {productList.length > 0 ? (
                productList.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <div className="col-span-full h-[60vh] flex flex-col items-center justify-center">
                  <img src={noProduct} alt="No Product" className="h-[200px] sm:h-[250px]" />
                  <p className="text-center text-base sm:text-lg text-gray-500 mt-4">
                    No products found.
                  </p>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </div>)}
    </>
  );
};

export default ProductsPage;
