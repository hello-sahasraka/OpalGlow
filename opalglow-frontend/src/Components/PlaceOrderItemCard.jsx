import React from 'react';

const PlaceOrderItemCard = ({ item }) => {
  const { name, id, image, price, quantity } = item;

  return (
    <div className="w-full min-h-[75px] mb-4 flex items-center gap-4">
      <div className="h-[75px] aspect-square relative">
        <img
          src={image}
          alt={name}
          className="h-full aspect-square object-cover rounded-md shadow-lg"
        />
        <span className="absolute -top-1 -right-1 bg-black text-white drop-shadow-md text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
          {quantity}
        </span>
      </div>
      <div className="w-full flex justify-between items-center">
        <div>
          <h1 className="text-gray-900 text-md font-semibold">{name}</h1>
          <p className="text-gray-500 text-md">{id}</p>
        </div>
        <h1 className="text-xl font-semibold">${price.toFixed(2)}</h1>
      </div>
    </div>
  );
};

export default PlaceOrderItemCard;
