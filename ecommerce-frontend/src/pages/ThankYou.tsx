// src/pages/ThankYou.tsx
import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="max-w-lg mx-auto mt-20 bg-white p-8 shadow-lg rounded-xl text-center">
      <h2 className="text-3xl font-bold mb-4">🎉 Thank You!</h2>
      <p className="text-gray-600 mb-6">
        Your order has been placed successfully.  
        We’ll notify you when it’s shipped!
      </p>
      <Link
        to="/products"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
