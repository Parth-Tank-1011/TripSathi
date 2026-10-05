import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Calendar, Clock, Star, Sparkles, Heart } from "lucide-react";
import { useTrip } from "../context/TripContext";

export default function DestinationCard({ destination, onSelect }) {
  const navigate = useNavigate();
  const { bookmarks, toggleBookmark, updatePlannerForm } = useTrip();
  const isBookmarked = bookmarks.includes(destination.id);

  const handlePlanThisTrip = (e) => {
    e.stopPropagation();
    updatePlannerForm({
      destination: destination.name,
      days: parseInt(destination.recommendedDays) || 4,
      totalBudget: Math.max(15000, destination.startingBudget * 2)
    });
    navigate("/planner");
  };

  return (
    <div
      onClick={() => {
        if (onSelect) onSelect(destination);
        else navigate(`/explore?dest=${destination.id}`);
      }}
      className="group bg-white rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-xl hover:shadow-stone-300/40 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer transform hover:-translate-y-1"
    >
      {/* Destination Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-stone-100">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* State Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold shadow-xs">
          <MapPin className="w-3.5 h-3.5 text-teal-600" />
          <span>{destination.state}</span>
        </div>

        {/* Bookmark Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(destination.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isBookmarked
              ? "bg-rose-50 text-rose-500 shadow-md"
              : "bg-white/80 text-stone-600 hover:bg-white hover:text-rose-500"
          }`}
          aria-label="Bookmark destination"
        >
          <Heart className={`w-4 h-4 ${isBookmarked ? "fill-rose-500" : ""}`} />
        </button>

        {/* Destination Name Overlay */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black tracking-tight text-white drop-shadow-sm">
              {destination.name}
            </h3>
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-lg text-xs font-bold text-amber-300">
              <Star className="w-3.5 h-3.5 fill-amber-300" />
              <span>{destination.rating}</span>
            </div>
          </div>
          <p className="text-xs text-stone-200 line-clamp-1 mt-0.5">
            {destination.tagline}
          </p>
        </div>
      </div>

      {/* Card Content & Budget Info */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Categories Chips */}
        <div className="flex flex-wrap gap-1.5">
          {destination.categories.slice(0, 3).map((cat) => (
            <span
              key={cat}
              className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600"
            >
              {cat}
            </span>
          ))}
          <span className="text-[11px] font-medium text-stone-400 self-center">
            • {destination.bestSeason}
          </span>
        </div>

        {/* Starting Budget & Recommended Days */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider block">
              Starting Budget
            </span>
            <span className="text-lg font-extrabold text-teal-700">
              From ₹{destination.startingBudget.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider block">
              Trip Duration
            </span>
            <div className="flex items-center justify-end gap-1 text-sm font-bold text-slate-800">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{destination.recommendedDays}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Link
            to={`/explore?dest=${destination.id}`}
            onClick={(e) => e.stopPropagation()}
            className="w-full py-2.5 rounded-xl border border-stone-200 hover:border-teal-400 hover:bg-teal-50/50 text-stone-700 hover:text-teal-800 text-xs font-bold text-center transition-all"
          >
            Explore Guide
          </Link>
          <button
            type="button"
            onClick={handlePlanThisTrip}
            className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md hover:shadow-teal-600/20 transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Plan Trip</span>
          </button>
        </div>

      </div>
    </div>
  );
}
