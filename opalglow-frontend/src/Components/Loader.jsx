import React from 'react';

const Loader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-16 h-16 border-4 border-gray-300 border-dashed rounded-full animate-spin border-t-gray-600"></div>
    </div>
  );
};

export default Loader;
