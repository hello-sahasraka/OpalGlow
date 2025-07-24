import axios from 'axios';
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import MediaUpload from '../../../Uitils/MediaUpload';

const AddProduct = () => {
    const [productid, setProductid] = useState('');
    const [productName, setproductName] = useState('');
    const [altNames, setAltNames] = useState([]);
    const [price, setPrice] = useState('');
    const [labeledPrice, setLabeledPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState([]);
    const navigate = useNavigate();


    const  handleSubmit = async () => {

        const promiseArray = [];
        for (let i = 0; i < image.length; i++) {
            const spromise = MediaUpload(image[i]);
            promiseArray[i] = spromise;
        }

        toast.loading("Uploading...");

        try {

        const result = await Promise.all(promiseArray)
        
        const productDetails = {

            productId: productid,
            name: productName,
            altNames: altNames,
            price: price,
            labeledPrice: labeledPrice,
            description: description,
            image: result,
            stock: stock
            
        }

        console.log(productDetails);
        
        await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/product/createproduct", productDetails, {
            headers: {
                "Authorization": "Bearer "+ localStorage.getItem("token")
            }
        })
        toast.dismiss();
        toast.success("Product Added Successfully");
        navigate("/admin/products");
        
        } catch (error) {
            console.log(error);
            toast.dismiss();
            toast.error("Product Adding Failed");
        }
    }


  return (
    <div className='h-full w-full flex justify-center items-start overflow-x-auto p-4'>
        <Toaster />
        <div className='flex flex-col gap-[15px] items-center w-5/6 h-full bg-gray-300 shadow-md rounded-2xl py-[20px]'>
            <h1 className='text-2xl font-bold text-gray-700'>Add Product</h1>
                <div className='flex flex-col justify-right'>
                    {/* <label for="productid" className='pr-4 text-sm text-gray-600 mb-2 font-medium'>Product ID</label> */}
                    <input 
                    type="text" 
                    placeholder='Product ID' 
                    value={productid}
                    onChange={(e) => setProductid(e.target.value)}
                    className="placeholder:text-gray-500 placeholder:italic placeholder:text-xs pl-3 bg-white/80 rounded-md w-[550px] h-[42px]" 
                    id='productid'/>
                </div>
                <div className='flex flex-col justify-right'>
                    {/* <label for="name" className='pr-4 text-sm text-gray-600 mb-2 font-medium'>Product Name</label> */}
                    <input 
                    type="text" 
                    placeholder='Product Name'
                    value={productName}
                    onChange={(e) => setproductName(e.target.value)}
                    className="placeholder:text-gray-500 placeholder:italic placeholder:text-xs pl-3 bg-white/80 rounded-md w-[550px] h-[42px]" 
                    id='name'/>
                </div>
                <div className='flex flex-col justify-right'>
                    {/* <label for="altname" className='pr-4 text-sm text-gray-600 mb-2 font-medium'>Alternative Names</label> */}
                    <input 
                    type="text" 
                    placeholder='Alternative Names'
                    value={altNames}
                    onChange={(e) => {
                        setAltNames(e.target.value.split(','));
                    }}
                    className="placeholder:text-gray-500 placeholder:italic placeholder:text-xs pl-3 bg-white/80 rounded-md w-[550px] h-[42px]" 
                    id='altname'/>
                </div>
                <div className='flex flex-col justify-right'>
                    {/* <label for="price" className='pr-4 text-sm text-gray-600 mb-2 font-medium'>Alternative Names</label> */}
                    <input 
                    type="number" 
                    placeholder='Price' 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="placeholder:text-gray-500 placeholder:italic placeholder:text-xs pl-3 bg-white/80 rounded-md w-[550px] h-[42px]" 
                    id='price'/>
                </div>
                <div className='flex flex-col justify-right'>
                    {/* <label for="lprice" className='pr-4 text-sm text-gray-600 mb-2 font-medium'>Labeled Price/label> */}
                    <input 
                    type="number" 
                    placeholder='Labeled Price' 
                    value={labeledPrice}
                    onChange={(e) => setLabeledPrice(e.target.value)}
                    className="placeholder:text-gray-500 placeholder:italic placeholder:text-xs pl-3 bg-white/80 rounded-md w-[550px] h-[42px]" 
                    id='lprice'/>
                </div>
                <div>
                    <input
                    type="file"
                    multiple
                    onChange={(e) => setImage(e.target.files)}
                    placeholder='Image'
                    className="placeholder:text-gray-500 placeholder:italic placeholder:text-xs pl-3 bg-white/80 rounded-md w-[550px] h-[42px]"
                    />
                </div>
                <div className='flex flex-col justify-right'>
                    {/* <label for="stock" className='pr-4 text-sm text-gray-600 mb-2 font-medium'>Stock</label> */}
                    <input 
                    type="number" 
                    placeholder='Stock' 
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="placeholder:text-gray-500 placeholder:italic placeholder:text-xs pl-3 bg-white/80 rounded-md w-[550px] h-[42px]" 
                    id='stock'/>
                </div>
                <div className='flex flex-col justify-right'>
                    {/* <label for="description" className='pr-4 text-sm text-gray-600 mb-2 font-medium'>Description</label> */}
                    <textarea 
                    type="text" 
                    placeholder='Description...' 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="placeholder:text-gray-500 placeholder:italic placeholder:text-xs placeholder:py-3 pl-3 bg-white/80 rounded-md w-[550px] h-[120px]" 
                    id='description'/>
                </div>
                <div className='flex justify-between items-center w-[550px] py-2'>
                    <Link to={"/admin/products"} className='bg-red-700 hover:bg-red-600 transition duration-200 text-white rounded-md px-[75px] py-2 cursor-pointer'>Cancel</Link>
                    <button className='bg-green-700 hover:bg-green-600 transition duration-200 text-white rounded-md px-[75px] py-2 cursor-pointer'
                    onClick={handleSubmit}>Submit</button>
                </div>
                
        </div>
    </div>
  )
}

export default AddProduct