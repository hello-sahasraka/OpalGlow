import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MediaUpload from '../../../Uitils/MediaUpload';

const EditProduct = () => {
    const locationData = useLocation();
    const navigate = useNavigate();

    if (!locationData.state) {
        window.location.href = "/admin/products";
    }

    const productData = locationData.state.product;

    const [productid, setProductid] = useState(productData.productId);
    const [productName, setproductName] = useState(productData.name);
    const [altNames, setAltNames] = useState(productData.altNames);
    const [price, setPrice] = useState(productData.price);
    const [labeledPrice, setLabeledPrice] = useState(productData.labeledPrice);
    const [stock, setStock] = useState(productData.stock);
    const [description, setDescription] = useState(productData.description);
    const [image, setImage] = useState([]);

    const handleSubmit = async () => {
        const promiseArray = [];
        for (let i = 0; i < image.length; i++) {
            promiseArray[i] = MediaUpload(image[i]);
        }

        toast.loading('Uploading...');

        try {
            let result = await Promise.all(promiseArray);

            if (result.length === 0) {
                result = productData.image; // Keep old images if no new ones
            }

            const productDetails = {
                productId: productid,
                name: productName,
                altNames: altNames,
                price: price,
                labeledPrice: labeledPrice,
                description: description,
                image: result,
                stock: stock,
            };

            await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/product/updateproduct/${productid}`,
                productDetails,
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                }
            );

            toast.dismiss();
            toast.success('Product Updated Successfully');
            navigate('/admin/products');
        } catch (error) {
            console.error(error);
            toast.dismiss();
            toast.error('Product Updating Failed');
        }
    };

    return (
        <div className="w-full h-full bg-gray-50 px-12 py-10">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                Edit Product
            </h1>
            <Toaster />

            <div className="overflow-x-auto w-full font-semibold bg-white rounded-xl shadow border border-gray-200 py-12 px-16 mx-auto">
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Product ID"
                        value={productid}
                        disabled
                        onChange={(e) => setProductid(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed placeholder:text-gray-400 focus:outline-none"
                    />

                    <div className='flex gap-4'>
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={productName}
                            onChange={(e) => setproductName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />

                        <input
                            type="text"
                            placeholder="Alternative Names (comma separated)"
                            value={altNames}
                            onChange={(e) => setAltNames(e.target.value.split(','))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className='flex gap-4'>
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />

                        <input
                            type="number"
                            placeholder="Labeled Price"
                            value={labeledPrice}
                            onChange={(e) => setLabeledPrice(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <input
                        type="file"
                        multiple
                        onChange={(e) => setImage(e.target.files)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 focus:outline-none"
                    />

                    <input
                        type="number"
                        placeholder="Stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />

                    <textarea
                        placeholder="Description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 h-28"
                    ></textarea>
                </div>

                <div className="flex justify-between items-center mt-6">
                    <Link
                        to="/admin/products"
                        className="border-red-600 border bg-red-100 text-red-600 hover:bg-red-700 hover:text-white px-10 py-2 rounded-md transition"
                    >
                        Cancel
                    </Link>
                    <button
                        onClick={handleSubmit}
                        className="border-blue-600 border bg-blue-100 text-blue-600 hover:bg-blue-700 hover:text-white px-10 py-2 rounded-md transition"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
