"use client";
import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignupScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [focusedField, setFocusedField] = useState("");
  const router = useRouter();

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Signup failed");
      } else {
        setMessage("✅ Account created successfully!");
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black flex">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16 text-white">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Transform Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">
              Project Vision
            </span>
            Into Reality
          </h1>
          <p className="text-xl text-purple-200 mb-12">
            Streamline workflows, collaborate seamlessly, and achieve more with intelligent project management.
          </p>
          <div className="space-y-6">
            {[
              { title: "Real-time Collaboration", desc: "Work together with your team, anywhere, anytime." },
              { title: "Advanced Analytics", desc: "Track progress and optimize performance with insights." },
              { title: "Secure & Reliable", desc: "Enterprise-grade security for your data." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-purple-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-purple-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white rounded"></div>
              </div>
              <span className="text-2xl font-bold text-white">TaskBoard</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Get Started</h2>
            <p className="text-gray-400">Create your account to begin your journey</p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 transition-colors ${focusedField === "name" ? "text-purple-400" : "text-gray-500"}`} />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Enter your name"
                  className="block w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 transition-colors ${focusedField === "email" ? "text-purple-400" : "text-gray-500"}`} />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  placeholder="you@company.com"
                  className="block w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 transition-colors ${focusedField === "password" ? "text-purple-400" : "text-gray-500"}`} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Create a strong password"
                  className="block w-full pl-12 pr-12 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400 hover:text-purple-400 transition-colors" /> : <Eye className="h-5 w-5 text-gray-400 hover:text-purple-400 transition-colors" />}
                </button>
              </div>
            </div>

            {/* Message */}
            {message && <p className={`text-sm ${message.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>{message}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3.5 rounded-xl font-semibold hover:from-purple-500 hover:to-purple-400 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

            {/* Divider */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <span onClick={() => router.push("/login")} className="text-purple-400 font-semibold hover:text-purple-300 cursor-pointer transition-colors">
                  Sign in
                </span>
              </p>
            </div>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-500 text-xs mt-6">
            By creating an account, you agree to our{" "}
            <span className="text-purple-400 hover:text-purple-300 cursor-pointer">Terms</span> and{" "}
            <span className="text-purple-400 hover:text-purple-300 cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}
