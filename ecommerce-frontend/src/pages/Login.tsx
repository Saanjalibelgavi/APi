import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

// Sample login credentials
const DEMO_USERS = [
  { email: "demo@loomkey.com", password: "demo123", name: "Demo User" },
  { email: "admin@loomkey.com", password: "admin123", name: "Admin User" },
  { email: "user@example.com", password: "user123", name: "Guest User" }
];

export default function Login() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user = DEMO_USERS.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("auth", "true");
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", user.email);
      
      showToast(`Welcome back, ${user.name}!`, "success");
      navigate("/");
    } else {
      showToast("Invalid email or password", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="bg-white shadow-medium w-full max-w-md p-8 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display text-charcoal mb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-accent-600">
            Sign in to your Loom&Key account
          </p>
        </div>

        {/* Demo Credentials Info */}
        <div className="bg-sand/30 border border-sand p-4 rounded mb-6">
          <p className="text-xs font-semibold text-charcoal mb-2">📝 Demo Credentials:</p>
          <div className="space-y-1 text-xs text-accent-600">
            <p>📧 <strong>Email:</strong> demo@loomkey.com</p>
            <p>🔑 <strong>Password:</strong> demo123</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
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
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-sand bg-white focus:border-stone focus:outline-none transition-colors text-sm"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4" 
              />
              <label htmlFor="remember" className="text-sm text-accent-600">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-stone hover:text-charcoal transition-colors">
              Forgot password?
            </a>
          </div>

          <button 
            type="submit" 
            className="w-full bg-charcoal text-white py-3 px-6 text-sm font-medium tracking-wide hover:bg-stone transition-colors rounded"
          >
            SIGN IN
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-accent-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-charcoal font-medium hover:text-stone transition-colors">
              Sign Up
            </a>
          </p>
        </div>

        {/* Additional Demo Users */}
        <div className="mt-8 pt-6 border-t border-sand">
          <p className="text-xs text-accent-600 mb-3 text-center">Other demo accounts:</p>
          <div className="space-y-2 text-xs text-accent-600">
            <div className="flex justify-between">
              <span>admin@loomkey.com</span>
              <span className="text-stone">admin123</span>
            </div>
            <div className="flex justify-between">
              <span>user@example.com</span>
              <span className="text-stone">user123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
