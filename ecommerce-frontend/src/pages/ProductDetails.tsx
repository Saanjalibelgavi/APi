import React from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ArrowLeft, Star } from "lucide-react";

// Reuse the same demo data from Products
const demoData: Record<string, any[]> = {
  skincare: [
    { id: "s1", name: "Vitamin C Serum", price: 799, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXQ5Xa6tT-_NVp2ViUhBLUvPMF_nJTHvpMEw&s", category: "skincare" },
    { id: "s2", name: "Hydrating Toner", price: 599, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgpGTKz6D9AmT_vTye1FETiUS4wmRa5jrt6Q&s", category: "skincare" },
  ],
  clothing: [
    { id: "c1", name: "Classic Cotton Tee", price: 499, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN5CDVV4otRGAp_V1JRbVtcljMGmI0FTXeaA&s", category: "clothing" },
    { id: "c2", name: "Slim Fit Jeans", price: 1499, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTohKrHHbE9n4RMJ6rc5ubSk0uAVEvM2t9-ig&s", category: "clothing" },
  ],
  electronics: [
    { id: "e1", name: "Bluetooth Earbuds", price: 1999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNxbHsVmi9QB8ApQAkLyggnQu5_JKKY1gL8g&s", category: "electronics" },
  ],
  home: [
    { id: "h1", name: "Green small sofa", price: 400, oldPrice: 1000, image: "https://images.unsplash.com/photo-1616627453238-6ff7e1c36e43?w=800&q=80&auto=format&fit=crop", category: "home" },
  ],
};

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  // Find product from demoData
  const allItems = Object.values(demoData).flat();
  const product = allItems.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="p-6 text-center">
        <p>Product not found</p>
        <Link to="/products" className="link">Back to products</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--brand-bg)", color: "var(--brand-text)" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-black/20">
        <Link to="/products">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-lg font-bold">Product detail</h1>
        <Heart className="h-6 w-6" />
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        {/* Product image */}
        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-white">
          <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
        </div>

        {/* Dots (static 4) */}
        <div className="mt-3 flex items-center justify-center gap-2">
          {[1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full"
              style={{
                background: i === 1 ? "var(--brand-primary)" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>

        {/* Info */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="h-4 w-4"
                style={{ color: i <= 4 ? "var(--brand-primary)" : "gray" }}
              />
            ))}
            <span className="text-sm">4.0 (12 reviews)</span>
          </div>

          <div className="mt-2 flex items-center gap-2">
            {product.oldPrice && (
              <span className="line-through text-gray-400">₹{product.oldPrice}</span>
            )}
            <span className="text-2xl font-bold" style={{ color: "var(--brand-primary)" }}>
              ₹{product.price}
            </span>
          </div>

          <p className="mt-3 text-sm text-gray-300">
            Cozy modern fabric sofa with 2 seats and chaise longue. Timeless design and wonderfully comfy...
            <span className="text-blue-400 cursor-pointer"> more</span>
          </p>

          {/* Colors */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Colors</h3>
            <div className="flex gap-3">
              {["#064e3b", "#fff", "#9333ea", "#38bdf8"].map((color, idx) => (
                <span
                  key={idx}
                  className="h-8 w-8 rounded-full border flex items-center justify-center"
                  style={{ borderColor: idx === 0 ? "var(--brand-primary)" : "gray" }}
                >
                  <span className="h-6 w-6 rounded-full" style={{ background: color }}></span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Add to cart */}
      <footer className="p-4 border-t border-black/20">
        <button
          className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          style={{ background: "var(--brand-primary)", color: "#111827" }}
        >
          🛒 Add to cart
        </button>
      </footer>
    </div>
  );
}
