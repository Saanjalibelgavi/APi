import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  discount?: number;
  isNew?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  category,
  rating = 0,
  reviewCount = 0,
  discount = 0,
  isNew = false,
}) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const inWishlist = isInWishlist(id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(id);
      showToast("Removed from wishlist", "info");
    } else {
      addToWishlist({ id, name, price, image, category, rating });
      showToast("Added to wishlist!", "success");
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAddingToCart(true);
    addToCart({ id, name, price, image, quantity: 1 });
    showToast("Added to cart!", "success");
    
    setTimeout(() => setIsAddingToCart(false), 600);
  };

  const discountedPrice = discount > 0 ? price - (price * discount) / 100 : price;

  return (
    <div className="card group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white to-orange-50 animate-fade-in-up">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {isNew && (
          <span className="badge bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 shadow-lg rounded-full text-xs font-bold animate-bounce-slow">
            New
          </span>
        )}
        {discount > 0 && (
          <span className="badge bg-gradient-to-r from-red-500 to-rose-600 text-white px-3 py-1.5 shadow-lg rounded-full text-xs font-bold">
            -{discount}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-3 right-3 z-10 p-2.5 rounded-full shadow-lg transition-all duration-300 ${
          inWishlist
            ? "bg-gradient-to-r from-red-500 to-rose-600 text-white scale-110"
            : "bg-white/95 text-gray-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 hover:text-red-500 hover:scale-110"
        }`}
        title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={`h-5 w-5 transition-all ${inWishlist ? "fill-current animate-pulse" : ""}`}
        />
      </button>

      {/* Product Image */}
      <Link to={`/product/${id}`} className="block relative">
        <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-orange-50">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
          <div className="flex items-center gap-2 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <Eye className="h-5 w-5" />
            <span className="text-sm font-semibold">Quick View</span>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="card-body p-5">
        {/* Category */}
        {category && (
          <p className="text-xs text-amber-600 uppercase tracking-wider mb-2 font-semibold">
            {category}
          </p>
        )}

        {/* Product Name */}
        <Link to={`/product/${id}`}>
          <h3 className="text-base font-semibold line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-amber-700 group-hover:to-orange-700 group-hover:bg-clip-text group-hover:text-transparent transition-all min-h-[48px] text-gray-800">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 transition-all ${
                    i < Math.floor(rating)
                      ? "text-amber-500 fill-amber-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 font-medium">
              {rating} {reviewCount > 0 && `(${reviewCount})`}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-4">
          <span className="text-xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
            ₹{discountedPrice.toFixed(0)}
          </span>
          {discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ₹{price}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className={`btn w-full mt-4 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 rounded-full py-3 shadow-md ${
            isAddingToCart 
              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white scale-95" 
              : "bg-gradient-to-r from-amber-600 to-orange-700 text-white hover:from-amber-700 hover:to-orange-800 hover:shadow-lg hover:scale-105"
          }`}
        >
          <ShoppingCart
            className={`h-5 w-5 ${isAddingToCart ? "animate-bounce" : ""}`}
          />
          {isAddingToCart ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
