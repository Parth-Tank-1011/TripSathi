import React from "react";
import { Link } from "react-router-dom";
import { Compass, Heart, ShieldCheck, Sparkles, Send, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-stone-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter / Value Prop Banner */}
        <div className="bg-gradient-to-r from-teal-900/60 via-slate-800 to-teal-950 p-6 md:p-8 rounded-3xl border border-teal-800/40 mb-14 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Sathi Travel Club
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Get secret budget getaways delivered every Friday
            </h3>
            <p className="text-stone-400 text-sm mt-1">
              Curated offbeat homestays, student discounts, and zero-commission travel hacks across India.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed successfully! Welcome to TripSathi Club.");
            }}
            className="w-full md:w-auto flex items-center gap-2"
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700 text-white placeholder-stone-400 text-sm focus:outline-hidden focus:border-teal-500 w-full sm:w-72"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap active:scale-95 shadow-md shadow-teal-500/20"
            >
              <span>Join Free</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Main Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-black shadow-md">
                <Compass className="w-5 h-5 text-slate-950" />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                Trip<span className="text-teal-400">Sathi</span>
              </span>
            </Link>

            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              TripSathi is an India-focused budget travel platform designed to help students, families, and solo explorers craft memorable vacations without overspending.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-stone-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/60">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Free & Open Budget Logic</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-stone-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/60">
                <span className="font-bold text-amber-400">₹ INR</span>
                <span>Real Indian Pricing</span>
              </div>
            </div>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Top Destinations
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link to="/explore?dest=goa" className="hover:text-teal-400 transition-colors">
                  Goa Beaches & Forts
                </Link>
              </li>
              <li>
                <Link to="/explore?dest=manali" className="hover:text-teal-400 transition-colors">
                  Manali Snow & Valleys
                </Link>
              </li>
              <li>
                <Link to="/explore?dest=jaipur" className="hover:text-teal-400 transition-colors">
                  Jaipur Pink City
                </Link>
              </li>
              <li>
                <Link to="/explore?dest=kerala" className="hover:text-teal-400 transition-colors">
                  Kerala Backwaters
                </Link>
              </li>
              <li>
                <Link to="/explore?dest=rishikesh" className="hover:text-teal-400 transition-colors">
                  Rishikesh Yoga & Rafting
                </Link>
              </li>
              <li>
                <Link to="/explore?dest=udaipur" className="hover:text-teal-400 transition-colors">
                  Udaipur Romantic Lakes
                </Link>
              </li>
            </ul>
          </div>

          {/* Travel Categories */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link to="/explore?category=Beaches" className="hover:text-teal-400 transition-colors">
                  🏖️ Coastal & Beaches
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Mountains" className="hover:text-teal-400 transition-colors">
                  🏔️ Mountain Treks & Stays
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Heritage" className="hover:text-teal-400 transition-colors">
                  🏛️ Royal Forts & Heritage
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Spiritual" className="hover:text-teal-400 transition-colors">
                  🧘 Spiritual & Ghats
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Food" className="hover:text-teal-400 transition-colors">
                  🍛 Local Food Trails
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Backpacking" className="hover:text-teal-400 transition-colors">
                  🎒 Shoestring Backpacking
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Platform Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Company & Tools
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link to="/planner" className="hover:text-teal-400 transition-colors">
                  Multi-Step Planner
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-teal-400 transition-colors">
                  Explore India Map
                </Link>
              </li>
              <li>
                <Link to="/my-trips" className="hover:text-teal-400 transition-colors">
                  Saved Trips & Itineraries
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal-400 transition-colors">
                  Our Budget Philosophy
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-teal-400 transition-colors">
                  Traveler Preferences
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} TripSathi Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline-block" />
            <span>for Indian travelers across Bharat.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">FastAPI Backend Ready</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
