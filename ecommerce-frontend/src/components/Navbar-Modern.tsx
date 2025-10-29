import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Search
} from "lucide-react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery("");
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-orange-800 to-amber-700 text-white text-center py-2.5 text-sm font-light tracking-wide shadow-sm">
        Free Shipping on Orders Over $100
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-gradient-to-b from-white to-gray-50 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="text-2xl font-display bg-gradient-to-r from-amber-700 to-orange-800 bg-clip-text text-transparent font-bold tracking-wide">Loom&Key</span>
                <span className="text-[10px] font-light tracking-[0.25em] text-gray-600 uppercase">Curated Living</span>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-12">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands and more..."
                  className="w-full h-12 pl-5 pr-14 rounded-full border-2 border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all bg-white shadow-sm"
                />
                <button 
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white p-2.5 rounded-full transition-all shadow-md hover:shadow-lg"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              
              {/* Navigation Links */}
              <Link 
                to="/" 
                className={`text-base font-medium tracking-wide transition-all pb-1 ${
                  isActive("/") 
                    ? "text-amber-700 border-b-2 border-amber-600" 
                    : "text-gray-700 hover:text-amber-700"
                }`}
              >
                Home
              </Link>

              <Link 
                to="/products" 
                className="text-base font-medium text-gray-700 hover:text-amber-700 tracking-wide transition-all"
              >
                Collections
              </Link>

              {/* Cart */}
              <Link 
                to="/cart" 
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 transition-all text-amber-800 relative shadow-sm hover:shadow-md"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Login/Sign In */}
              <Link 
                to="/login" 
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white font-medium transition-all shadow-md hover:shadow-lg"
              >
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-amber-50 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="md:hidden pb-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full h-11 pl-4 pr-12 rounded-full border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-all bg-white"
              />
              <button 
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-600 to-orange-700 text-white p-2 rounded-full transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
            <div className="px-4 py-4 space-y-1">
              <Link 
                to="/" 
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-700 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              <Link 
                to="/products" 
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-700 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Collections
              </Link>
              
              <Link 
                to="/cart" 
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-700 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
              
              <Link 
                to="/login" 
                className="block px-4 py-3 text-base font-medium bg-gradient-to-r from-amber-600 to-orange-700 text-white rounded-lg hover:from-amber-700 hover:to-orange-800 transition-all text-center shadow-md mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
