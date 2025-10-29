import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

type Product = { 
  id: number; 
  name: string; 
  price: number; 
  image: string; 
  rating: number;
};

const allProducts: Product[] = [
  { id: 1, name: "Sculpted Ceramic Vase", price: 89, image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&h=600&fit=crop&q=80", rating: 4 },
  { id: 2, name: "Amber Scented Candle", price: 194, image: "https://images.unsplash.com/photo-1602874801006-ec7e3bdd9ba0?w=500&h=600&fit=crop&q=80", rating: 5 },
  { id: 3, name: "Snake Plant Potted", price: 160, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=600&fit=crop&q=80", rating: 4 },
  { id: 4, name: "Leather Bound Journal", price: 160, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=600&fit=crop&q=80", rating: 5 },
  { id: 5, name: "Woven Throw Blanket", price: 124, image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=500&h=600&fit=crop&q=80", rating: 4 },
  { id: 6, name: "Ceramic Coffee Mug", price: 34, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&h=600&fit=crop&q=80", rating: 5 },
  { id: 7, name: "Handmade Soap Set", price: 45, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=600&fit=crop&q=80", rating: 4 },
  { id: 8, name: "Brass Table Lamp", price: 215, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=600&fit=crop&q=80", rating: 5 },
  { id: 9, name: "Linen Pillow Cover", price: 48, image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&h=600&fit=crop&q=80", rating: 4 },
];

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function ProductsNew() {
  const query = useQuery();
  const category = query.get("category") || "all";
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-cream">
      {/* Page Header */}
      <div className="border-b border-sand bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-8">
          <h1 className="text-3xl font-display text-charcoal mb-2">
            {category === "all" ? "All Products" : category.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
          </h1>
          <p className="text-sm text-accent-600">Discover handpicked items for your home</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 py-12">
        <div className="flex justify-between items-center mb-8">
          <p className="text-sm text-accent-600">{allProducts.length} products</p>
          <select className="text-sm border border-sand px-4 py-2 bg-white focus:outline-none focus:border-stone">
            <option>Sort by Price</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {allProducts.map((product) => (
            <Link 
              key={product.id}
              to={`/product/${product.id}`}
              className="group"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative overflow-hidden bg-white mb-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {hoveredId === product.id && (
                  <div className="absolute inset-0 bg-charcoal/10 flex items-center justify-center transition-opacity duration-300">
                    <span className="bg-white text-charcoal px-6 py-2 text-sm tracking-wide">
                      Quick View
                    </span>
                  </div>
                )}
              </div>
              <div className="text-center">
                <h3 className="text-sm font-light text-charcoal mb-2 group-hover:text-stone transition-colors">
                  {product.name}
                </h3>
                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className={`w-3 h-3 ${i < product.rating ? 'text-charcoal' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-charcoal font-medium">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
