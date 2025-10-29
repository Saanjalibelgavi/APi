import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { getProductById, allProducts } from "../data/allProducts";

export default function ProductDetailsNew() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const product = getProductById(Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-display text-charcoal mb-4">Product Not Found</h2>
          <Link to="/products" className="text-stone hover:text-charcoal underline">
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  // Get related products from the same category
  const relatedProducts = allProducts
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`${product.name} added to cart!`, "success");
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Breadcrumb */}
      <div className="border-b border-sand bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-4">
          <div className="flex items-center gap-2 text-xs text-accent-600">
            <Link to="/" className="hover:text-stone transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-stone transition-colors">Products</Link>
            <span>/</span>
            <span className="text-charcoal">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full aspect-[4/5] object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-display text-charcoal mb-3">
                {product.name}
              </h1>
              <p className="text-2xl text-charcoal font-medium mb-4">${product.price}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className={`w-4 h-4 ${i < product.rating ? 'text-charcoal' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-accent-600">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-sand pt-6">
              <p className="text-sm text-accent-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stock Status */}
            <div className="border-t border-sand pt-6">
              <p className="text-sm text-charcoal">
                {product.inStock ? (
                  <span className="text-green-700">✓ In Stock</span>
                ) : (
                  <span className="text-red-700">Out of Stock</span>
                )}
              </p>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-xs tracking-widest text-charcoal mb-3 uppercase">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-sand bg-white hover:bg-cream transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center text-charcoal font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-sand bg-white hover:bg-cream transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button 
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-4 text-sm tracking-wide transition-colors ${
                product.inStock 
                  ? 'bg-charcoal text-white hover:bg-stone' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {/* Product Details */}
            <div className="border-t border-sand pt-6">
              <h3 className="text-xs tracking-widest text-charcoal mb-4 uppercase">Product Details</h3>
              <ul className="space-y-2 text-sm text-accent-600">
                <li>• Category: {product.category}</li>
                <li>• Price: ₹{product.price.toLocaleString()}</li>
                {product.originalPrice && <li>• Original Price: ₹{product.originalPrice.toLocaleString()}</li>}
                <li>• Rating: {product.rating}/5 ({product.reviews} reviews)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-display text-charcoal mb-8 text-center">
            You May Also Like
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link 
                key={relatedProduct.id}
                to={`/product/${relatedProduct.id}`}
                className="group"
              >
                <div className="overflow-hidden bg-white mb-4">
                  <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name}
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-sm font-light text-charcoal text-center mb-2 group-hover:text-stone transition-colors">
                  {relatedProduct.name}
                </h3>
                <p className="text-center text-sm text-charcoal">₹{relatedProduct.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
