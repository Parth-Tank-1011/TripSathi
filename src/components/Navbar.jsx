import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Compass,
  Luggage,
  Sparkles,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTrip } from "../context/TripContext";

export default function Navbar() {
  const location = useLocation();
  const { user, isLoggedIn, logout, openAuthModal } = useAuth();
  const { savedTrips } = useTrip();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: "Plan a Trip", path: "/planner", icon: Sparkles, badge: "AI Powered" },
    { label: "Explore", path: "/explore", icon: Compass },
    { label: "My Trips", path: "/my-trips", icon: Luggage, count: savedTrips.length },
    { label: "About", path: "/about", icon: null }
  ];

  const isActive = (path) => {
    if (path === "/planner" && location.pathname.startsWith("/planner")) return true;
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-teal-600/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <Compass className="w-5 h-5 transition-transform group-hover:rotate-45 duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors leading-tight">
                Trip<span className="text-teal-600">Sathi</span>
              </span>
              <span className="text-[11px] text-stone-500 font-medium hidden sm:inline-block leading-normal">
                Plan more. Spend less. Travel better.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center gap-2 ${
                    active
                      ? "text-teal-800 bg-teal-50/80 shadow-xs"
                      : "text-stone-600 hover:text-slate-900 hover:bg-stone-100/70"
                  }`}
                >
                  {Icon && <Icon className={`w-4 h-4 ${active ? "text-teal-600" : "text-stone-400"}`} />}
                  <span>{item.label}</span>

                  {item.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}

                  {typeof item.count === "number" && item.count > 0 && (
                    <span className="text-[11px] font-bold bg-teal-600 text-white w-5 h-5 rounded-full flex items-center justify-center">
                      {item.count}
                    </span>
                  )}

                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-teal-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Auth & CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-stone-200 hover:border-teal-300 hover:shadow-xs bg-stone-50/50 transition-all focus:outline-hidden"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-teal-500/30"
                  />
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-bold text-slate-800 leading-tight">{user.name.split(" ")[0]}</p>
                    <p className="text-[10px] text-teal-600 font-medium">Smart Traveler</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-100 py-2 z-50 text-sm animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-3 border-b border-stone-100">
                      <p className="font-bold text-slate-800">{user.name}</p>
                      <p className="text-xs text-stone-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-stone-700 hover:bg-teal-50 hover:text-teal-800 transition-colors"
                    >
                      <User className="w-4 h-4 text-stone-400" />
                      <span>My Profile & Preferences</span>
                    </Link>

                    <Link
                      to="/my-trips"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-stone-700 hover:bg-teal-50 hover:text-teal-800 transition-colors"
                    >
                      <Luggage className="w-4 h-4 text-stone-400" />
                      <span>Saved Itineraries</span>
                    </Link>

                    <div className="border-t border-stone-100 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal("login")}
                  className="px-4 py-2 text-sm font-semibold text-stone-700 hover:text-teal-700 transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => openAuthModal("signup")}
                  className="px-4 py-2 text-sm font-semibold bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-xs hover:shadow-md hover:shadow-teal-600/20 transition-all"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Quick Plan CTA */}
            <Link
              to="/planner"
              className="ml-2 hidden lg:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm hover:shadow-teal-600/25 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Plan Trip</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 hover:bg-stone-100 hover:text-slate-900 transition-colors focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          {navLinks.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  active
                    ? "bg-teal-50 text-teal-800"
                    : "text-stone-700 hover:bg-stone-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  {Icon && <Icon className={`w-5 h-5 ${active ? "text-teal-600" : "text-stone-400"}`} />}
                  <span>{item.label}</span>
                </div>
                {item.count > 0 && (
                  <span className="text-xs font-bold bg-teal-600 text-white px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-stone-100 space-y-2">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-700 hover:bg-stone-50 font-semibold"
                >
                  <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                  <span>{user.name} (My Profile)</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-semibold text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    openAuthModal("login");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl border border-stone-300 font-semibold text-stone-700 text-center"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    openAuthModal("signup");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-teal-600 font-semibold text-white text-center shadow-xs"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
