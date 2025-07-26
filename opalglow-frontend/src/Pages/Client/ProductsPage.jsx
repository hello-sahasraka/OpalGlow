import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Components/Loader";
import ProductCard from "../../Components/ProductCard";


const ProductsPage = () => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] =useState(true);

    useEffect(() => {
        if (loading) {
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/getproduct").then(
                (response) => {
                    console.log("Products", response.data)
                    setProductList(response.data)
                    setLoading(false)
                }
            )
        }
    }, [loading]);

    return (
    <div className='w-full h-full px-[100px]'>
        <div className="text-3xl font-bold text-gray-900 py-8">
            Find Your Next <span className="text-rose-500">Favorite</span> Product
        </div>
        {
            loading ? 
            <Loader />
            :
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productList.map((product) => (
                        <ProductCard key={product._id} product={product} />
                ))}
            </div>
        }
    </div>
  )
}

export default ProductsPage