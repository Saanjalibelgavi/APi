// src/pages/Checkout.tsx
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "../context/ToastContext";

export default function Checkout() {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Check if user is logged in
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("auth") === "true";
    if (!isAuthenticated) {
      showToast("Please login to proceed with checkout", "error");
      navigate("/login");
    }
  }, [navigate, showToast]);

  const handleCheckout = () => {
    const userName = localStorage.getItem("userName") || "Guest";
    // Clear the cart after placing order
    clearCart();
    showToast(`Order placed successfully, ${userName}!`, "success");
    // Redirect to Thank You page
    navigate("/thank-you");
  };

  const isAuthenticated = localStorage.getItem("auth") === "true";
  const userName = localStorage.getItem("userName") || "Guest";

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-cream py-16 px-4">
      <div className="max-w-lg mx-auto bg-white p-8 shadow-medium rounded">
        <h2 className="text-3xl font-display text-charcoal mb-2 text-center">Checkout</h2>
        <p className="text-sm text-accent-600 text-center mb-8">
          Complete your order, {userName}
        </p>
        
        <div className="mb-8 p-6 bg-sand/30 rounded">
          <p className="text-sm text-charcoal mb-4">
            ✅ You are logged in as: <strong>{userName}</strong>
          </p>
          <p className="text-xs text-accent-600">
            Your order will be processed securely.
          </p>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-charcoal text-white px-6 py-3 text-sm font-medium tracking-wide hover:bg-stone transition-colors rounded"
        >
          PLACE ORDER
        </button>

        <button
          onClick={() => navigate("/cart")}
          className="w-full mt-4 border border-sand text-charcoal px-6 py-3 text-sm tracking-wide hover:bg-sand/30 transition-colors rounded"
        >
          BACK TO CART
        </button>
      </div>
    </div>
  );
}
