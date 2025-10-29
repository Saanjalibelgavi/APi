// src/App.tsx
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/HomeNew";
import Products from "./pages/ProductsNew";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar-Modern";
import ProductDetails from "./pages/ProductDetailsNew";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import CategoryPage from "./pages/CategoryPage";
import AOS from "aos";
import "aos/dist/aos.css";


// Guarded route
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = localStorage.getItem("auth") === "true";
  return isAuth ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4">
        <main className="py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Products list - public */}
            <Route path="/products" element={<Products />} />

            {/* Category pages - public */}
            <Route path="/category/:categoryId" element={<CategoryPage />} />

            {/* Product details - public */}
            <Route path="/product/:id" element={<ProductDetails />} />

            {/* Cart - public */}
            <Route path="/cart" element={<Cart />} />

            {/* Wishlist - public */}
            <Route path="/wishlist" element={<Wishlist />} />

            {/* Checkout - requires login */}
            <Route path="/checkout" element={<Checkout />} />
            
            {/* Thank you page */}
            <Route path="/thank-you" element={<ThankYou />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
