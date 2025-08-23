import { useState } from 'react';

const ImageSlider = ({ image }) => {
  const images = image || [];
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className='w-full h-full flex flex-col gap-2'>

      {/* Main Image */}
      <div className='w-full h-[250px] sm:h-[300px] md:h-full lg:h-full bg-gray-100 rounded
      overflow-hidden drop-shadow-md flex items-center justify-center outline-4 outline-white/40 outline-offset-[-8px]'>
        <img
          src={images[activeIndex]}
          alt={`Product ${activeIndex + 1}`}
          className='w-full h-full object-cover rounded'
        />
      </div>

      {/* Thumbnails */}
      <div className='w-full flex gap-2 bg-white pt-2 px-1 rounded'>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className={`h-[60px] sm:h-[70px] aspect-square object-center rounded cursor-pointer transition-all duration-200
              ${activeIndex === index ? 'ring-2 ring-gray-700' : 'opacity-70 hover:opacity-100'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
