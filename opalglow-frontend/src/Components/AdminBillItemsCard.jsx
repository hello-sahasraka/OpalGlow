import React from 'react'

const AdminBillItemsCard = ({ item }) => {
    const { productName, productId, image, price, quantity } = item
    return (
        <div className="w-full min-h-[50px] mb-4 flex items-cente">
            <div className="w-3/5 h-[50px] aspect-square flex items-center gap-4">
                <img
                    src={image}
                    alt={productName}
                    className="h-full aspect-square object-cover rounded-md shadow-lg"
                />
                <div className='h-full'>
                    <h1 className="text-gray-800 text-md font-semibold">{productName}</h1>
                    <p className="text-gray-500 text-xs">#{productId}</p>
                </div>
            </div>
            <div className="w-2/5 flex justify-between items-center">
                <p className="text-gray-500 text-sm font-semibold">{quantity}pcs</p>
                <h1 className="text-md text-gray-800 font-semibold">${price.toFixed(2)}</h1>
            </div>
        </div>
    )
}

export default AdminBillItemsCard