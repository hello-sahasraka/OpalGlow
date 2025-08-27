import axios from 'axios';
import { ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer';

const LandingImages = [
  "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg",
  "https://images.pexels.com/photos/1502645/pexels-photo-1502645.jpeg",
  "https://images.pexels.com/photos/3020129/pexels-photo-3020129.jpeg",
  "https://images.pexels.com/photos/7290089/pexels-photo-7290089.jpeg",
  "https://images.pexels.com/photos/33535572/pexels-photo-33535572.png",
  "https://images.pexels.com/photos/7143195/pexels-photo-7143195.jpeg",
  "https://images.pexels.com/photos/247287/pexels-photo-247287.jpeg",
  "https://images.pexels.com/photos/3785784/pexels-photo-3785784.jpeg",
];

const commeticTypeImages = [
  { image: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg", name: "Make-up" },
  { image: "https://images.pexels.com/photos/3059398/pexels-photo-3059398.jpeg", name: "Skincare" },
  { image: "https://images.pexels.com/photos/19717725/pexels-photo-19717725.jpeg", name: "Haircare" },
  { image: "https://images.pexels.com/photos/7588593/pexels-photo-7588593.jpeg", name: "Powder" }
];

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [trendingItems, setTrendingItems] = useState([]);

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % LandingImages.length);
  };

  const handlePrev = () => {
    setActiveIndex((activeIndex - 1 + LandingImages.length) % LandingImages.length);
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product/gettrendingproducts")
      .then((response) => {
        setTrendingItems(response.data);
      })
      .catch((error) => {
        console.log("Error fetching trending products:", error);
      });
  }, []);

  return (
    <div>
      <div className="w-full h-full px-4 sm:px-8 md:px-12 lg:px-20 pt-10">
        {/* Hero Section */}
        <div className="w-full flex flex-col lg:flex-row justify-between gap-10">
          {/* Left Text Section */}
          <div className="lg:h-[80vh] w-full lg:w-[45%] flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-gray-500/90 font-bold leading-tight">
              Luxury You Can Wear Every Day
            </h1>
            <p className="text-gray-500/90 text-base sm:text-lg font-semibold mt-6">
              Glow smarter with products crafted for lasting radiance.
            </p>
            <div className="w-full pt-6">
              <Link
                to="/products"
                className="relative inline-flex px-5 py-3 rounded-full text-white uppercase text-sm sm:text-base tracking-wider overflow-hidden z-10 transition-all duration-300 group"
              >
                <span>Explore Trending Looks</span>
                <ChevronRight />
                <span className="absolute inset-0 bg-rose-400 rounded-full -z-10"></span>
                <span className="absolute inset-0 bg-rose-600 rounded-full w-0 group-hover:w-full transition-all duration-300 -z-10"></span>
              </Link>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="lg:h-[80vh] w-full lg:w-[55%] relative">
            <img
              src={LandingImages[activeIndex]}
              alt={`Landing Image ${activeIndex + 1}`}
              className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[80vh] w-full object-cover rounded-xl shadow-xl outline-4 outline-white/40 outline-offset-[-8px]"
            />

            {/* Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex items-center justify-between px-4 sm:px-6">
              <button
                onClick={handlePrev}
                className="bg-gray-400/60 text-white rounded-full p-2 cursor-pointer hover:bg-white/80 hover:text-gray-800 shadow transition-all duration-300"
              >
                <ChevronsLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="bg-gray-400/60 text-white rounded-full p-2 cursor-pointer hover:bg-white/80 hover:text-gray-800 shadow transition-all duration-300"
              >
                <ChevronsRight size={24} />
              </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {LandingImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 w-2 rounded-full cursor-pointer ${index === activeIndex ? "bg-white" : "bg-gray-400"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Cosmetic Categories */}
        <div className="w-full mt-16 pt-6 flex flex-col items-center border-t-1 border-gray-300/90 ">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-700">Our Products</h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-16">
            {commeticTypeImages.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-[140px] sm:h-[160px] md:h-[175px] aspect-square rounded-full object-cover outline-2 outline-gray-400/50 outline-offset-4 shadow-lg"
                />
                <p className="text-center text-xs sm:text-sm font-medium mt-3">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Now Section */}
        <div className="w-full mt-16 border-t-1 border-gray-300/90 pt-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-700 text-center">Trending now</h1>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-16">
            {trendingItems.map((item, index) => (
              <Link
                to={`/products/${item.product.productId}`}
                key={index}
                className="flex flex-col items-center hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <img
                  src={Array.isArray(item.product.image) ? item.product.image[0] : item.product.image}
                  alt={item.product.name}
                  className="h-[200px] sm:h-[220px] md:h-[250px] w-[160px] sm:w-[180px] md:w-[200px] rounded-xl object-cover outline-2 outline-gray-400/50 outline-offset-4 shadow-xl"
                />
                <div className="w-[160px] sm:w-[180px] md:w-[200px] flex flex-col">
                  <p className="text-xs sm:text-sm font-medium mt-2">{item.product.name}</p>
                  <p className="text-xs sm:text-sm font-semibold text-rose-500">${item.product.price}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="w-full flex justify-center pt-8">
            <Link
              to="/products"
              className="relative inline-flex px-4 py-2 rounded-full text-white uppercase text-sm sm:text-base tracking-wider overflow-hidden z-10 transition-all duration-300 group"
            >
              <span>View all</span>
              <ChevronRight />
              <span className="absolute inset-0 bg-rose-400 rounded-full -z-10"></span>
              <span className="absolute inset-0 bg-rose-600 rounded-full w-0 group-hover:w-full transition-all duration-300 -z-10"></span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
