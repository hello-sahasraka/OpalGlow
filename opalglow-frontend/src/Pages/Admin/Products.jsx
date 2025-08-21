import axios from "axios";
import { useEffect, useState } from "react";
import { SquarePlus, Delete, PencilIcon, X, FilePenLine } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../Components/Loader";
import { useConfirmDialog } from "../../Components/ConfirmDialogProvider";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  const confirmDialog = useConfirmDialog();

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product/getproduct")
        .then((response) => {
          setProducts(response.data);
          setLoaded(true);
        });
    }
  }, [loaded]);

  const handleDelete = (id) => {
    confirmDialog("Are you sure you want to delete this product?", async () => {
      toast.loading("Deleting...");

      const token = localStorage.getItem("token");
      if (!token) {
        toast.dismiss();
        toast.error("Please login first");
        return;
      }

      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/deleteproduct/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.dismiss();
        toast.success("Product deleted");
        setLoaded(false);
      } catch (error) {
        console.error(error);
        toast.dismiss();
        toast.error("Failed to delete product");
      }

    });

  };

  return (
    <div className="w-full min-h-screen bg-gray-50 px-12 py-10 relative">
      {/* Floating Add Button */}
      <Link
        to="/admin/addproduct"
        className="fixed bottom-6 right-6 bg-blue-600  hover:scale-115 text-white p-3 rounded-full shadow-lg transition"
        title="Add New Product"
      >
        <SquarePlus size={26} />
      </Link>

      {/* Page Heading */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Product Management
      </h1>

      {/* Table Container */}
      <div className="overflow-x-auto font-semibold bg-white rounded-xl shadow border border-gray-200">
        {loaded ? (
          products.length > 0 ? (
            <table className="min-w-full text-xs text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-100 rounded-t-lg">
                <tr>
                  <th className="px-5 py-4">Product ID</th>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Description</th>
                  <th className="px-5 py-4">Stock</th>
                  <th className="px-5 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-5 py-4">{product.productId}</td>
                    <td className="px-5 py-4 font-medium">{product.name}</td>
                    <td className="px-5 py-4 text-green-600">
                      ${product.price}
                    </td>
                    <td className="px-5 py-4 max-w-sm truncate text-gray-600">
                      {product.description}
                    </td>
                    <td className="px-5 py-4">{product.stock}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            navigate("/admin/editproduct", {
                              state: { product },
                            })
                          }
                          title="Edit Product"
                          className="text-blue-600 border border-blue-600 bg-blue-100 rounded-full p-1 hover:text-blue-800 transition cursor-pointer"
                        >
                          <FilePenLine size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.productId)}
                          title="Delete Product"
                          className="text-red-600 border border-red-600 bg-red-100 rounded-full p-1 hover:text-red-700 transition cursor-pointer"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center text-gray-500 py-20">
              <p className="text-lg mb-4">No products found</p>
              <Link
                to="/admin/addproduct"
                className="text-blue-600 hover:underline text-sm"
              >
                Click here to add your first product
              </Link>
            </div>
          )
        ) : (
          <div className="flex justify-center items-center h-[300px]">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
