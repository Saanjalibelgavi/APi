import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductsByCategory } from "../data/allProducts";
import type { Product } from "../data/allProducts";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import { Heart, ShoppingCart, Star } from "lucide-react";

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const products = getProductsByCategory(categoryId || "");
  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();
  const { showToast } = useToast();
  
  const [sortBy, setSortBy] = useState("featured");

  const categoryTitles: Record<string, string> = {
    "hot-beveled": "Hot Beveled",
    "body-goods": "Body Goods",
    "potted-plants": "Potted Plants",
    "craft-ceramics": "Craft Ceramics"
  };

  const categoryDescriptions: Record<string, string> = {
    "hot-beveled": "Curated selection of premium coffee, tea, and beverage essentials for the discerning connoisseur.",
    "body-goods": "Luxurious skincare and wellness products crafted with natural ingredients for your self-care ritual.",
    "potted-plants": "Bring life to your space with our collection of carefully selected indoor plants and planters.",
    "craft-ceramics": "Handcrafted ceramic pieces that blend artistry with functionality for everyday elegance."
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showToast(`${product.name} added to cart`, "success");
  };

  const handleAddToWishlist = (product: Product) => {
    addToWishlist(product);
    showToast(`${product.name} added to wishlist`, "success");
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some(item => item.id === productId);
  };

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return b.featured ? 1 : -1;
    }
  });

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-display text-charcoal mb-4">Category Not Found</h2>
          <Link to="/" className="text-stone hover:text-charcoal underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Category Header */}
      <div className="bg-gradient-to-r from-white via-orange-50 to-white border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 animate-slide-up">
          <nav className="text-sm mb-4">
            <Link to="/" className="text-amber-700 hover:text-amber-800 font-medium">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-800 font-medium">{categoryTitles[categoryId || ""]}</span>
          </nav>
          <h1 className="text-5xl font-display bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent mb-4">
            {categoryTitles[categoryId || ""]}
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl">
            {categoryDescriptions[categoryId || ""]}
          </p>
        </div>
      </div>

      {/* Sort and Filter Bar */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-20 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700 font-medium">
              {products.length} Products
            </p>
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-700 font-medium">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-2 border-amber-200 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedProducts.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative overflow-hidden aspect-[3/4] bg-gradient-to-br from-gray-100 to-orange-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-rose-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      SALE
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToWishlist(product);
                    }}
                    className={`absolute top-4 right-4 p-2.5 rounded-full transition-all duration-300 shadow-lg ${
                      isInWishlist(product.id)
                        ? "bg-gradient-to-r from-red-500 to-rose-600 text-white scale-110"
                        : "bg-white/95 text-gray-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 hover:text-red-500 hover:scale-110"
                    }`}
                  >
                    <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                  </button>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </Link>

              <div className="p-5 bg-gradient-to-b from-white to-orange-50">
                <Link to={`/product/${product.id}`}>
                  <p className="text-xs tracking-widest text-amber-600 mb-2 uppercase font-semibold">
                    {product.category}
                  </p>
                  <h3 className="font-display text-lg text-gray-800 mb-2 group-hover:bg-gradient-to-r group-hover:from-amber-700 group-hover:to-orange-700 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(product.rating) ? "#f59e0b" : "none"}
                      stroke="#f59e0b"
                      className="text-amber-500"
                    />
                  ))}
                  <span className="text-xs text-gray-600 ml-2 font-medium">
                    ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-orange-700 text-white py-3 rounded-full text-sm font-semibold tracking-wide hover:from-amber-700 hover:to-orange-800 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <ShoppingCart size={18} />
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
