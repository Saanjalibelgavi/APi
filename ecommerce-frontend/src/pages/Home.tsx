import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  Shirt,
  Cpu,
  Home as HomeIcon,
  ShoppingCart,
  Search,
  Camera,
  Moon,
  Sun,
  User,
} from "lucide-react";

const categories = [
  { key: "skincare", label: "Skincare", Icon: Sparkles },
  { key: "clothing", label: "Clothing", Icon: Shirt },
  { key: "electronics", label: "Electronics", Icon: Cpu },
  { key: "home", label: "Home", Icon: HomeIcon },
];

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const user = {
    name: "Kartik",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  };
  const cartItems = products.slice(0, 2);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = (id: number) => {
    fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: id, quantity: 1 }),
    });
  };

  const handleStartShopping = () => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Update handleSearchChange to use fetched products
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setSuggestions(
      products
        .filter((p) =>
          p.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
        .map((p) => p.name)
    );
  };

  const handleImageSearch = () => {
    // Demo: open file dialog
    alert("Image search coming soon!");
  };

  return (
    <div
      className={`min-h-screen w-full ${darkMode ? "dark" : ""}`}
      style={{
        background: darkMode ? "#18181b" : "var(--brand-bg)",
        color: darkMode ? "#fafafa" : "var(--brand-text)",
      }}
    >
      {/* Hero Section */}
      <section
        data-aos="fade-up"
        className="w-full h-screen flex flex-col items-center justify-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(0,0,0,0.7) 60%, var(--brand-primary) 100%)",
            opacity: 0.8,
          }}
        ></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
            Welcome to My Shop
          </h1>
          <p className="text-lg md:text-2xl text-white mb-8 drop-shadow">
            Discover premium products and exclusive deals
          </p>
          <button
            onClick={handleStartShopping}
            className="bg-white text-black font-bold px-8 py-3 rounded-full shadow-lg text-lg hover:bg-gray-200 transition"
          >
            Start Shopping
          </button>
        </motion.div>
        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-8 right-8 bg-white/80 dark:bg-black/80 p-2 rounded-full shadow"
          title="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-800" />
          )}
        </button>
      </section>
      {/* Sticky Header */}
      <header
        data-aos="fade-up"
        className="sticky top-0 z-20 border-b border-black/5 w-full bg-white/80 dark:bg-black/80 backdrop-blur"
        style={{ background: darkMode ? "#18181b" : "var(--brand-bg)" }}
      >
        <div className="w-full px-8 h-16 flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-2xl font-extrabold tracking-tight"
          >
            My Shop
          </motion.h1>
          <div className="flex items-center gap-4">
            {/* User profile */}
            <div className="flex items-center gap-2">
              <img
                src={user.image}
                alt="profile"
                className="h-8 w-8 rounded-full"
              />
              <span className="font-semibold text-sm">{user.name}</span>
            </div>
            {/* Cart dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowCart(true)}
              onMouseLeave={() => setShowCart(false)}
            >
              <ShoppingCart className="h-6 w-6 cursor-pointer" />
              <span
                className="absolute -top-2 -right-2 text-[10px] font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center"
                style={{ background: "var(--brand-accent)", color: "#111827" }}
              >
                {cartItems.length}
              </span>
              {showCart && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-black border rounded-lg shadow-lg p-4 z-30">
                  <h4 className="font-bold mb-2">Cart</h4>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-2 mb-2"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-8 w-8 rounded"
                      />
                      <span className="text-sm">{item.name}</span>
                      <span className="ml-auto font-bold">₹{item.price}</span>
                    </div>
                  ))}
                  <Link
                    to="/cart"
                    className="btn btn-primary w-full mt-2"
                  >
                    Go to Cart
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* Body */}
      <main ref={mainRef} className="w-full px-0 py-0">
        {/* Search bar with auto-suggestions and image upload */}
        <motion.div
          data-aos="fade-up"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-2 border rounded-lg px-6 py-4 bg-white/80 shadow w-full relative"
        >
          <Search className="h-5 w-5" style={{ color: "var(--brand-muted)" }} />
          <input
            value={search}
            onChange={handleSearchChange}
            placeholder="Search products"
            className="flex-1 outline-none bg-transparent"
          />
          <button
            className="btn btn-outline h-9 px-3"
            aria-label="Open camera"
            onClick={handleImageSearch}
          >
            <Camera className="h-5 w-5" />
          </button>
          {/* Auto-suggestions dropdown */}
          {search && suggestions.length > 0 && (
            <div className="absolute left-0 top-full mt-2 w-full bg-white dark:bg-black border rounded shadow z-10">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-sm"
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </motion.div>
        {/* Categories */}
        <motion.section
          data-aos="fade-up"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 w-full"
        >
          <div className="flex items-center justify-between px-6">
            <h2 className="section-title">Categories</h2>
            <Link to="/category" className="link text-sm">
              View all
            </Link>
          </div>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 px-6">
            {categories.map(({ key, label, Icon }) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.08 }}
                className="w-full"
              >
                <Link
                  to={`/products?category=${key}`}
                  className="chip w-full flex items-center justify-center"
                >
                  <span className="chip-icon">
                    <Icon className="h-4 w-4" />
                  </span>
                  {label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
        {/* Promo card */}
        <motion.section
          data-aos="fade-up"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 w-full"
        >
          <div
            className="rounded-2xl p-8 text-white shadow-lg mx-6"
            style={{
              background:
                "linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))",
            }}
          >
            <h3 className="text-xl font-bold">Focus on sofas!</h3>
            <p className="mt-2 text-sm text-white/90">
              Up to 30% off on selected sofas for limited time only
            </p>
            <Link
              to="/products"
              className="btn mt-4 inline-flex"
              style={{ background: "var(--brand-accent)", color: "#111827" }}
            >
              Start shopping
            </Link>
          </div>
        </motion.section>
        {/* Newly added products with skeleton loader */}
        <motion.section
          data-aos="fade-up"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 w-full"
        >
          <div className="flex items-center justify-between px-6">
            <h2 className="section-title">Newly added products</h2>
            <Link to="/category" className="link text-sm">
              View all
            </Link>
          </div>
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
            {/* Loading skeletons */}
            {products.length === 0 ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-200 dark:bg-gray-700 h-64 rounded-xl"
                />
              ))
            ) : (
              products.map((p) => (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  }}
                  className="card bg-white/90 dark:bg-black/90 shadow-md border rounded-xl overflow-hidden"
                >
                  <div
                    className="w-full aspect-square overflow-hidden"
                    style={{
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16,
                    }}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="card-body p-3">
                    <h4 className="text-sm font-semibold line-clamp-2">
                      {p.name}
                    </h4>
                    <div className="mt-2 flex items-center justify-between">
                      <span
                        className="font-bold"
                        style={{ color: "var(--brand-primary)" }}
                      >
                        ₹{p.price}
                      </span>
                      <Link
                        to={`/products/${p.id}`}
                        className="btn btn-primary h-9"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
