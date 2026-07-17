import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, AlertCircle } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin/students", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Loading button on karega
    setError(""); // Purane errors clear karega

    try {
      const response = await fetch(
        "https://brightglobal-repo-production.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Hardcoded string hata kar actual state variables use kiye hain
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        },
      );

      const data = await response.json(); // Text ki jagah seedha JSON parse karo

      if (response.ok) {
        // 1. Token aur role save karo (Tera useEffect 'adminToken' dhundh raha hai)
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminRole", data.role);

        // 2. Redirect karo dashboard par
        navigate("/admin/students", { replace: true });
      } else {
        // Invalid email/password aaya toh error set karo
        setError(data.message || "Login failed. Please check credentials.");
      }
    } catch (err) {
      console.log("ERROR:", err);
      setError("Server connection failed. Please try again later.");
    } finally {
      setIsLoading(false); // Loading button off
    }
  };
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 pt-20">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_10px_40px_rgba(0,31,91,0.08)] w-full max-w-md border-t-4 border-[#031B33]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#031B33] mb-2">
            Brightcore Global Academy
          </h2>
          <p className="text-slate-500">Administrative Panel</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 flex items-center gap-2 text-sm">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Mail
              className="absolute left-4 top-3.5 text-slate-400"
              size={20}
            />
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#BE9A4A] focus:bg-white transition-all text-[#031B33]"
            />
          </div>

          <div className="relative">
            <Lock
              className="absolute left-4 top-3.5 text-slate-400"
              size={20}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#BE9A4A] focus:bg-white transition-all text-[#031B33]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#031B33] text-white rounded-xl font-bold hover:bg-[#BE9A4A] transition-colors disabled:opacity-70"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
