import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Components/Loader";
import ProductCard from "../../Components/ProductCard";

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
        console.log("Products", response.data);
        setProductList(response.data);
      })
      .finally(() => setLoading(false));
  };

  const searchProduct = () => {
    if (search.trim() === "") {
      // If empty search → load all products again
      fetchAllProducts();
      return;
    }

    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/product/searchproduct/${search}`)
      .then((response) => {
        console.log("Search Results", response.data);
        setProductList(response.data.products || []);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full min-h-screen flex flex-col px-4 sm:px-6 lg:px-[100px]">
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center py-10 sm:py-12 gap-4">
        {/* Title */}
        <p className="text-2xl sm:text-3xl font-bold text-gray-900">
          Find Your Next <span className="text-rose-500">Favorite</span> Product
        </p>

        {/* Search Bar */}
        <div className="w-full sm:w-1/3 text-sm font-semibold drop-shadow-md flex">
          <input
            type="text"
            placeholder="Search products here..."
            className="placeholder:text-gray-500 placeholder:text-xs pl-3 border border-gray-300 bg-white/80 rounded-l-full 
              w-full h-[40px] focus:outline-red-500 placeholder:opacity-80 placeholder:italic leading-[40px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchProduct()} // hit Enter to search
          />
          <button
            className="h-[40px] px-4 bg-rose-500 font-semibold text-white rounded-r-full cursor-pointer hover:bg-rose-600"
            onClick={searchProduct}
          >
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
          {productList.length > 0 ? (
            productList.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No products found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
