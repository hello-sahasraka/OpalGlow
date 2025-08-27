import { Sparkles, Heart, Star, Users } from "lucide-react";
import Footer from "../../Components/Footer";

const AboutUs = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center bg-rose-50">
        <div className="text-2xl sm:text-3xl font-bold text-gray-900 py-8 sm:py-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">Discover What <span className="text-rose-500">Inspires</span> You Next</h1>
        </div>
        {/* <div className="relative z-10 text-center text-rose-700/80 px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">About Us</h1>
          <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto">
            Discover the story behind OpalGlow – luxury cosmetics crafted with care and passion.
          </p>
        </div> */}
      </section>

      {/* Our Story */}
      <section className="max-w-6xl mx-auto px-6 py-16 bg-white/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.pexels.com/photos/19717725/pexels-photo-19717725.jpeg"
            alt="Our Story"
            className="rounded-2xl shadow-xl object-cover w-full h-[400px]"
          />
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-700">
              Our Story
            </h2>
            <p className="mt-6 text-gray-600 leading-relaxed">
              OpalGlow was born with a vision to redefine everyday beauty. We
              believe luxury shouldn’t just be for special occasions – it
              should be something you wear daily, with confidence and pride.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              From skincare to haircare, each product is crafted with care,
              blending natural ingredients and modern innovation for results
              that truly shine.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-700">
            Our Values
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            At the heart of OpalGlow are values that guide everything we do.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-12">
            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:scale-105 transition">
              <Sparkles className="text-rose-500" size={32} />
              <h3 className="mt-4 font-semibold text-gray-700">Quality</h3>
              <p className="text-sm text-gray-500 mt-2">
                Premium ingredients for lasting beauty.
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:scale-105 transition">
              <Heart className="text-rose-500" size={32} />
              <h3 className="mt-4 font-semibold text-gray-700">Care</h3>
              <p className="text-sm text-gray-500 mt-2">
                Every product is made with love and compassion.
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:scale-105 transition">
              <Star className="text-rose-500" size={32} />
              <h3 className="mt-4 font-semibold text-gray-700">Innovation</h3>
              <p className="text-sm text-gray-500 mt-2">
                Blending science and nature for brilliance.
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:scale-105 transition">
              <Users className="text-rose-500" size={32} />
              <h3 className="mt-4 font-semibold text-gray-700">Community</h3>
              <p className="text-sm text-gray-500 mt-2">
                Empowering individuals to feel beautiful daily.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-700">
          Join the Glow
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Be part of a beauty revolution where luxury meets everyday life.
          Explore our latest collections and find your perfect glow.
        </p>
        <a
          href="/products"
          className="relative inline-flex px-6 py-3 mt-6 rounded-full text-white uppercase text-sm sm:text-base tracking-wider overflow-hidden z-10 transition-all duration-300 group"
        >
          <span>Explore Products</span>
          <span className="absolute inset-0 bg-rose-400 rounded-full -z-10"></span>
          <span className="absolute inset-0 bg-rose-600 rounded-full w-0 group-hover:w-full transition-all duration-300 -z-10"></span>
        </a>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
