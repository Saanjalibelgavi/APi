import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

export default function Signup() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      showToast("Please fill in all fields", "error");
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    if (password.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }

    if (!agree) {
      showToast("Please agree to the Terms and Conditions", "error");
      return;
    }

    // Save user data
    localStorage.setItem("auth", "true");
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);

    showToast(`Welcome to Loom&Key, ${name}!`, "success");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4 py-12">
      <div className="bg-white shadow-medium w-full max-w-md p-8 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display text-charcoal mb-2">
            Create Account
          </h2>
          <p className="text-sm text-accent-600">
            Join Loom&Key today
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-xs tracking-wide text-charcoal mb-2 uppercase">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-sand bg-white focus:border-stone focus:outline-none transition-colors text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs tracking-wide text-charcoal mb-2 uppercase">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-sand bg-white focus:border-stone focus:outline-none transition-colors text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs tracking-wide text-charcoal mb-2 uppercase">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password (min. 6 characters)"
              className="w-full px-4 py-3 border border-sand bg-white focus:border-stone focus:outline-none transition-colors text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs tracking-wide text-charcoal mb-2 uppercase">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className="w-full px-4 py-3 border border-sand bg-white focus:border-stone focus:outline-none transition-colors text-sm"
              required
            />
          </div>

          <div className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              id="agree"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 w-4 h-4"
            />
            <label htmlFor="agree" className="text-sm text-accent-600">
              I agree to the Terms and Conditions and Privacy Policy
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-charcoal text-white py-3 px-6 text-sm font-medium tracking-wide hover:bg-stone transition-colors rounded"
          >
            CREATE ACCOUNT
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-accent-600">
            Already have an account?{" "}
            <a href="/login" className="text-charcoal font-medium hover:text-stone transition-colors">
              Sign In
            </a>
          </p>
        </div>

        {/* Quick Tip */}
        <div className="mt-8 pt-6 border-t border-sand">
          <p className="text-xs text-accent-600 text-center">
            💡 Tip: Use <strong>demo@loomkey.com</strong> / <strong>demo123</strong> to test the login
          </p>
        </div>
      </div>
    </div>
  );
}
