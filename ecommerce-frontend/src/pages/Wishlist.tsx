import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";

const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (item: any) => {
    addToCart({ ...item, quantity: 1 });
    showToast("Added to cart!", "success");
  };

  const handleRemove = (id: number, name: string) => {
    removeFromWishlist(id);
    showToast(`${name} removed from wishlist`, "info");
  };

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-gray-100 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6">
            <Heart className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-6">
            Add items you love to your wishlist. Review them anytime and easily move them to your cart.
          </p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/products" className="flex items-center gap-2 text-gray-600 hover:text-primary-500 mb-2 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Shopping</span>
          </Link>
          <h1 className="text-3xl font-bold text-gradient">My Wishlist</h1>
          <p className="text-gray-600 mt-1">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlist.map((item) => (
          <div key={item.id} className="card group relative">
            {/* Remove Button */}
            <button
              onClick={() => handleRemove(item.id, item.name)}
              className="absolute top-3 right-3 z-10 p-2 bg-white/90 hover:bg-red-50 rounded-full shadow-md transition-all hover:scale-110"
              title="Remove from wishlist"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </button>

            {/* Product Image */}
            <Link to={`/product/${item.id}`} className="block">
              <div className="aspect-square overflow-hidden rounded-t-xl bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            </Link>

            {/* Product Info */}
            <div className="card-body p-4">
              <Link to={`/product/${item.id}`}>
                <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-primary-500 transition-colors">
                  {item.name}
                </h3>
              </Link>

              {/* Rating */}
              {item.rating && (
                <div className="flex items-center gap-1 mt-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(item.rating!)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">({item.rating})</span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-bold text-primary-500">
                  ₹{item.price}
                </span>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(item)}
                className="btn btn-primary w-full mt-3 text-sm flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
