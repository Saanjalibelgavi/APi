import React from "react";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "../data/allProducts";

// Import category images
import hotBeveledImg from "../assets/Hot Beveled/1.1.jpg";
import bodyGoodsImg from "../assets/Body Goods/2.1.jpg";
import pottedPlantsImg from "../assets/Potted Plants/3.1.jpg";
import craftCeramicsImg from "../assets/Craft Ceramics/4.1.jpg";

const categories = [
  { 
    id: "hot-beveled",
    name: "Hot Beveled", 
    image: hotBeveledImg,
  },
  { 
    id: "body-goods",
    name: "Body Goods", 
    image: bodyGoodsImg,
  },
  { 
    id: "potted-plants",
    name: "Potted Plants", 
    image: pottedPlantsImg,
  },
  { 
    id: "craft-ceramics",
    name: "Craft Ceramics", 
    image: craftCeramicsImg,
  },
];

export default function HomeNew() {
  const featuredProducts = getFeaturedProducts();
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Full Screen Hero Section - No Text Inside */}
      <section className="relative w-screen h-[60vh] md:h-[70vh] -mx-[50vw] left-1/2 right-1/2 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop&q=90')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
        </div>
      </section>

      {/* Hero Text - Outside Image */}
      <section className="bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 py-20 animate-slide-up">
        <div className="max-w-7xl mx-auto px-8 md:px-16 text-center">
          <h1 className="font-display text-5xl md:text-7xl bg-gradient-to-r from-amber-800 via-orange-700 to-amber-800 bg-clip-text text-transparent mb-6 leading-tight animate-fade-in">
            Curated Goods for<br />Inspired Living
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto animate-fade-in-delay">
            Discover handpicked treasures that transform your space into a sanctuary of style and comfort
          </p>
          <Link 
            to="/products"
            className="inline-block bg-gradient-to-r from-amber-600 to-orange-700 text-white px-10 py-4 text-base tracking-wide rounded-full hover:from-amber-700 hover:to-orange-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-fade-in-delay-2"
          >
            Explore Collections
          </Link>
        </div>
      </section>

      {/* Shop By Category */}
      <section className="max-w-7xl mx-auto px-8 md:px-16 py-20">
        <h2 className="text-center text-3xl md:text-4xl font-display bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent mb-16 tracking-wide animate-slide-up">
          Shop By Category
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link 
              key={category.id}
              to={`/category/${category.id}`}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-full aspect-square mb-4 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <p className="text-center text-base font-medium text-gray-800 tracking-wide group-hover:text-amber-700 transition-colors">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gradient-to-br from-white via-orange-50 to-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <h2 className="text-center text-3xl md:text-4xl font-display bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent mb-16 tracking-wide animate-slide-up">
            Featured Products
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <Link 
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full aspect-[4/5] object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                    <span className="text-white font-semibold bg-gradient-to-r from-amber-600 to-orange-700 px-6 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="p-6 text-center bg-gradient-to-b from-white to-orange-50">
                  <h3 className="text-lg font-medium text-gray-800 mb-3 group-hover:text-amber-700 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className={`w-4 h-4 ${i < product.rating ? 'text-amber-500' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-amber-600 via-orange-700 to-amber-600 py-20 animate-slide-up">
        <div className="max-w-2xl mx-auto px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-base text-amber-100 mb-8 tracking-wide">
            Be the first to know about new arrivals and exclusive offers
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-base focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all"
            />
            <button 
              type="submit"
              className="bg-white text-amber-700 px-8 py-4 rounded-full text-base font-semibold tracking-wide hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer Info */}
      <footer className="border-t border-amber-200 bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-sm font-semibold tracking-widest text-amber-700 mb-4 uppercase">Customer Service</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-amber-700 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-amber-700 transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-amber-700 transition-colors">Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-widest text-amber-700 mb-4 uppercase">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-amber-700 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-amber-700 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-amber-700 transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-widest text-amber-700 mb-4 uppercase">Social</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-amber-700 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-amber-700 transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-amber-700 transition-colors">Pinterest</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-widest text-amber-700 mb-4 uppercase">Newsletter</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get updates on new arrivals and special offers
              </p>
            </div>
          </div>
          <div className="border-t border-amber-200 mt-12 pt-8 text-center">
            <p className="text-sm text-gray-600 tracking-wide">
              © 2025 Loom & Key. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
