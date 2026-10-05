import React, { useState } from "react";
import { X, Compass } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AuthModal() {
  const { authModal, closeAuthModal, login } = useAuth();
  const [isSignUp, setIsSignUp] = useState(authModal.mode === "signup");
  const [name, setName] = useState("Parth Sharma");
  const [email, setEmail] = useState("parth.sharma@tripsathi.in");
  const [password, setPassword] = useState("password123");

  if (!authModal.isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      name: name || "Parth Sharma",
      email: email || "parth.sharma@tripsathi.in"
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold shadow-md shadow-teal-600/20">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">
              {isSignUp ? "Join TripSathi" : "Welcome Back"}
            </h3>
            <p className="text-xs text-stone-500">Plan smart, travel on budget</p>
          </div>
        </div>

        {/* Toggle Mode */}
        <div className="flex bg-stone-100 p-1 rounded-xl mb-6 text-xs font-bold">
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-2 rounded-lg transition-all ${
              !isSignUp ? "bg-white text-slate-900 shadow-xs" : "text-stone-500 hover:text-slate-900"
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-2 rounded-lg transition-all ${
              isSignUp ? "bg-white text-slate-900 shadow-xs" : "text-stone-500 hover:text-slate-900"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-teal-500"
                placeholder="e.g. Parth Sharma"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-teal-500"
              placeholder="e.g. parth@example.com"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-teal-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-md shadow-teal-600/20 transition-all mt-2 active:scale-98"
          >
            {isSignUp ? "Create Free Account" : "Log In to TripSathi"}
          </button>
        </form>

        {/* Quick Demo Fill */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span>Prototype Quick Login:</span>
          <button
            type="button"
            onClick={() => {
              setName("Parth Sharma");
              setEmail("parth.sharma@tripsathi.in");
              login({ name: "Parth Sharma", email: "parth.sharma@tripsathi.in" });
            }}
            className="text-teal-700 font-bold hover:underline"
          >
            Use Demo Profile
          </button>
        </div>
      </div>
    </div>
  );
}
