import React from 'react'

const Loader = () => {
  return (
    <div className="w-full h-full bg-gray-50 flex flex-col justify-center items-center">
      {/* Logo or Brand Name */}
      {/* <div className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
        OpalGlow
      </div> */}

      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-gray-300 border-dashed rounded-full animate-spin border-t-gray-600"></div>

      {/* Loading Text */}
      {/* <p className="mt-4 text-gray-600 text-sm italic tracking-wide">
        Bringing beauty to your screen...
      </p> */}
    </div>
  );
}

export default Loader