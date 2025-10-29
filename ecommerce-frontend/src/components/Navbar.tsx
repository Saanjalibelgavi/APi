import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";  // ✅ import cart context

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useCart(); // ✅ access cart state
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("auth"); // clear login flag
    navigate("/login"); // redirect to login page
  };

  const isAuth = localStorage.getItem("auth") === "true";

  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#f0f0f0" }}>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>

      {/* ✅ Cart shows item count */}
      <Link to="/cart">Cart ({cartCount})</Link>

      {isAuth ? (
        <button onClick={handleLogout} style={{ marginLeft: "auto" }}>
          Logout
        </button>
      ) : (
        <>
          <Link to="/login" style={{ marginLeft: "auto" }}>Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
