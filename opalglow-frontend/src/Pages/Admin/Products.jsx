import axios from "axios"
import { useEffect, useState } from "react"
import { SquarePlus, Delete, PencilIcon, Loader, } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
const [products, setProducts] = useState([])
const [loaded, setLoaded] = useState(false)
const navigate = useNavigate();

useEffect(
    () => {
        if(!loaded) {
          axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/getproduct").then(
            (response) => {
                console.log("Products", response.data)
                setProducts(response.data)
                setLoaded(true)
            }
            )
        }
    }, [loaded]
)

const handleDelete = async (id) => {
  
  toast.loading("Deleting...")

  const token = localStorage.getItem("token")
  if (token == null)  {
    toast.dismiss()
    toast.error("Please Login First")
    return
  }
  
    try {
      await axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/product/deleteproduct/"+id, {
        headers: {
          "Authorization": "Bearer "+ localStorage.getItem("token")
      }
      })
      toast.dismiss()
      toast.success("Product Deleted Successfully")
      setLoaded(false)

    } catch (error) {
      console.log(error)
      toast.dismiss()
      toast.error("Product Deletion Failed")
    }

}


  return (
    <div className="h-full w-full flex justify-center items-start overflow-x-auto p-4 relative">
      <Link to={"/admin/addproduct"} className="hover:text-gray-500 transition duration-200 absolute right-6 bottom-6">
        <SquarePlus size={40} />
      </Link>
      {loaded && <table className="w-5/6 text-left text-sm border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-400 bg-gray-200 h-[60px] rounded-[50px]">
            <th className="p-2 first:rounded-tl-xl">Product ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Description</th>
            <th className="p-2">Stock</th>
            <th className="p-2 last:rounded-tr-xl">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b-1 border-gray-400 hover:text-blue-700 transition duration-200 cursor-pointer h-[50px]">
              <td className="p-2">{product.productId}</td>
              <td className="p-2">{product.name}</td>
              <td className="p-2">${product.price}</td>
              <td className="p-2 w-[500px]">{product.description}</td>
              <td className="p-2">{product.stock}</td>
              <td className="p-2">
                <div className="flex gap-2">
                  <button className="text-blue-500 hover:text-blue-300 cursor-pointer" onClick={() => {navigate("/admin/editproduct", { state: { product } })}}><PencilIcon size={20} /></button>
                  <button className="text-red-500 hover:text-red-300 cursor-pointer" onClick={() => {handleDelete(product.productId)}}><Delete size={20} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>}
      {!loaded && <Loader size={50} className="animate-spin mt-[300px]" />}
</div>
  )
}

export default Products