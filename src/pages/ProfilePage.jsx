import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Luggage,
  Heart,
  Settings,
  Sparkles,
  Camera,
  Save
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTrip } from "../context/TripContext";
import { DESTINATIONS } from "../data/destinations";
import DestinationCard from "../components/DestinationCard";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { savedTrips, bookmarks } = useTrip();

  const [activeTab, setActiveTab] = useState("trips"); // trips | saved | preferences | settings

  // Form states for editable preferences
  const [favoriteStyle, setFavoriteStyle] = useState(user.preferences?.favoriteStyle || "Backpacking & Adventure");
  const [foodPreference, setFoodPreference] = useState(user.preferences?.foodPreference || "Vegetarian & Local Street Food");
  const [preferredAccommodation, setPreferredAccommodation] = useState(user.preferences?.accommodation || "Hostel & Boutique Homestays");
  const [budgetPhilosophy, setBudgetPhilosophy] = useState(user.preferences?.budgetPhilosophy || "Smart Budget (High experience, low fluff)");

  const [name, setName] = useState(user.name || "Parth Sharma");
  const [email, setEmail] = useState(user.email || "parth.sharma@tripsathi.in");
  const [location, setLocation] = useState(user.location || "Rajkot, Gujarat");

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSavePreferences = (e) => {
    e.preventDefault();
    updateUser({
      name,
      email,
      location,
      preferences: {
        favoriteStyle,
        foodPreference,
        accommodation: preferredAccommodation,
        budgetPhilosophy
      }
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Get bookmarked destination objects
  const bookmarkedDestinations = DESTINATIONS.filter((d) => bookmarks.includes(d.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-10">
      
      {/* Profile Header Banner */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-teal-500/20 shadow-md"
            />
            <div className="absolute bottom-0 right-0 p-1.5 bg-teal-600 text-white rounded-full border-2 border-white shadow-xs">
              <Camera className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900">
                {user.name}
              </h1>
              <span className="text-[11px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
                Smart Explorer
              </span>
            </div>
            <p className="text-xs text-stone-500 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-stone-400" />
              <span>{user.email}</span>
            </p>
            <p className="text-xs text-stone-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              <span>{user.location}</span>
            </p>
          </div>
        </div>

        {/* Traveler Stats */}
        <div className="grid grid-cols-3 gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200/60 text-center">
          <div>
            <span className="text-[10px] text-stone-400 font-semibold uppercase block">Trips Planned</span>
            <span className="text-xl font-black text-slate-900">{savedTrips.length}</span>
          </div>
          <div className="border-x border-stone-200 px-2">
            <span className="text-[10px] text-stone-400 font-semibold uppercase block">Est. Saved</span>
            <span className="text-xl font-black text-emerald-700">{user.stats?.moneySaved || "₹18,500"}</span>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 font-semibold uppercase block">States</span>
            <span className="text-xl font-black text-teal-700">{user.stats?.statesVisited || 8}</span>
          </div>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto">
        {[
          { id: "trips", label: "My Trips", icon: Luggage, count: savedTrips.length },
          { id: "saved", label: "Saved Places", icon: Heart, count: bookmarkedDestinations.length },
          { id: "preferences", label: "Travel Preferences", icon: Sparkles },
          { id: "settings", label: "Account Settings", icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                isActive
                  ? "bg-teal-600 text-white shadow-xs"
                  : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {typeof tab.count === "number" && (
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-stone-100 text-stone-600"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: MY TRIPS */}
      {activeTab === "trips" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">Your Active & Past Trips</h2>
            <Link to="/planner" className="text-xs font-bold text-teal-700 hover:underline">
              + Plan New Trip
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savedTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">
                      {trip.status || "Upcoming"}
                    </span>
                    <span className="text-xs text-stone-400 font-semibold">
                      {trip.days} Days
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900">{trip.destination}</h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {trip.travelers} Travelers • ₹{(trip.budget || 20000).toLocaleString("en-IN")} Budget
                  </p>
                </div>

                <Link
                  to={`/my-trips/${trip.id}`}
                  className="w-full py-2.5 rounded-xl bg-teal-50 hover:bg-teal-600 hover:text-white text-teal-800 text-xs font-bold text-center transition-all border border-teal-200/80"
                >
                  Open Itinerary
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SAVED PLACES */}
      {activeTab === "saved" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-900">Bookmarked Destinations</h2>
            <p className="text-xs text-stone-500">Destinations you want to visit across India</p>
          </div>

          {bookmarkedDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bookmarkedDestinations.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 text-center space-y-2 border border-stone-200">
              <p className="text-sm font-bold text-stone-600">No bookmarked places yet</p>
              <Link to="/explore" className="text-xs font-bold text-teal-600 underline">
                Browse Explore Destinations
              </Link>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: TRAVEL PREFERENCES */}
      {activeTab === "preferences" && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-xs space-y-6 max-w-3xl">
          <div>
            <h2 className="text-xl font-black text-slate-900">Travel Preferences</h2>
            <p className="text-xs text-stone-500">TripSathi personalizes itineraries automatically around these preferences</p>
          </div>

          <form onSubmit={handleSavePreferences} className="space-y-5">
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-stone-700 block mb-1">
                Favorite Travel Style
              </label>
              <select
                value={favoriteStyle}
                onChange={(e) => setFavoriteStyle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm font-semibold focus:outline-hidden focus:border-teal-500"
              >
                <option value="Backpacking & Adventure">Backpacking & Adventure</option>
                <option value="Relaxed & Coastal">Relaxed & Coastal</option>
                <option value="Cultural & Heritage">Cultural & Heritage</option>
                <option value="Couple Getaway">Couple Getaway</option>
                <option value="Family Comfort">Family Comfort</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-stone-700 block mb-1">
                Dietary Preference
              </label>
              <select
                value={foodPreference}
                onChange={(e) => setFoodPreference(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm font-semibold focus:outline-hidden focus:border-teal-500"
              >
                <option value="Vegetarian & Local Street Food">Vegetarian & Local Street Food</option>
                <option value="Pure Veg & Jain">Pure Veg & Jain (No Onion/Garlic)</option>
                <option value="Non-Vegetarian & Seafood">Non-Vegetarian & Seafood</option>
                <option value="Vegan">Vegan (Plant Based)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-stone-700 block mb-1">
                Preferred Accommodation
              </label>
              <select
                value={preferredAccommodation}
                onChange={(e) => setPreferredAccommodation(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm font-semibold focus:outline-hidden focus:border-teal-500"
              >
                <option value="Hostel & Boutique Homestays">Hostel & Boutique Homestays (₹600–₹1,000/night)</option>
                <option value="Budget AC Hotels">Budget AC Hotels (₹1,200–₹1,800/night)</option>
                <option value="3-Star Comfort Resorts">3-Star Comfort Resorts (₹2,200–₹3,500/night)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-stone-700 block mb-1">
                Budget Philosophy
              </label>
              <select
                value={budgetPhilosophy}
                onChange={(e) => setBudgetPhilosophy(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm font-semibold focus:outline-hidden focus:border-teal-500"
              >
                <option value="Smart Budget (High experience, low fluff)">Smart Budget (High experience, low fluff)</option>
                <option value="Ultra-Shoestring (Hostel dorms & state buses)">Ultra-Shoestring (Hostel dorms & state buses)</option>
                <option value="Balanced Comfort (Mix of autos & private rooms)">Balanced Comfort (Mix of autos & private rooms)</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>{savedSuccess ? "Saved Successfully!" : "Save Preferences"}</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: ACCOUNT SETTINGS */}
      {activeTab === "settings" && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-xs space-y-6 max-w-3xl">
          <div>
            <h2 className="text-xl font-black text-slate-900">Account Details</h2>
            <p className="text-xs text-stone-500">Update your profile info and notifications</p>
          </div>

          <form onSubmit={handleSavePreferences} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-teal-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-teal-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Home Location (City, State)</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
            >
              Update Account Info
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
