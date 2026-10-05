import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import {
  Search,
  Compass,
  X
} from "lucide-react";
import { DESTINATIONS, CATEGORIES } from "../data/destinations";
import DestinationCard from "../components/DestinationCard";

export default function ExplorePage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";
  const initialDest = searchParams.get("dest") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch || initialDest);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxBudget, setMaxBudget] = useState(15000);
  const [selectedRegion, setSelectedRegion] = useState("All");

  // Keep filters in sync with the URL so deep links from the footer, landing page
  // and destination cards always land on the matching results — even when the
  // user is already on /explore and the component is not remounted.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const search = params.get("search");
    const dest = params.get("dest");

    if (category === null && search === null && dest === null) return;

    setSelectedCategory(category || "All");
    setSearchQuery(dest || search || "");
    setSelectedRegion("All");
    setMaxBudget(25000);
  }, [location.search]);

  // Filter logic
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((d) => {
      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = d.name.toLowerCase().includes(q);
        const matchesState = d.state.toLowerCase().includes(q);
        const matchesTagline = d.tagline.toLowerCase().includes(q);
        const matchesHighlights = d.highlights.some((h) => h.toLowerCase().includes(q));
        if (!matchesName && !matchesState && !matchesTagline && !matchesHighlights) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== "All") {
        if (!d.categories.includes(selectedCategory)) return false;
      }

      // Budget
      if (d.startingBudget > maxBudget) {
        return false;
      }

      // Region
      if (selectedRegion !== "All" && d.region !== selectedRegion) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, maxBudget, selectedRegion]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setMaxBudget(15000);
    setSelectedRegion("All");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200/60">
          <Compass className="w-3.5 h-3.5 text-teal-600" />
          <span>Discover Incredible India</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
          Where do you want to go?
        </h1>
        <p className="text-stone-500 text-sm md:text-base">
          Explore India's most breathtaking beaches, snow peaks, and royal cities within your budget.
        </p>
      </div>

      {/* SEARCH BAR & CATEGORIES */}
      <div className="space-y-6">
        
        {/* Large Search Input */}
        <div className="max-w-2xl mx-auto relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, state, or interest (e.g., Goa, Forts, Himachal)..."
              className="w-full pl-12 pr-10 py-4 bg-white rounded-2xl border border-stone-200/90 shadow-md text-sm md:text-base font-semibold text-slate-900 placeholder-stone-400 focus:outline-hidden focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Categories Horizontal Pills matching prompt */}
        {/* Categories: 🏖 Beaches, 🏔 Mountains, 🏛 Heritage, 🌿 Nature, 🧘 Spiritual, 🍛 Food, 🎒 Backpacking */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? "bg-teal-600 text-white shadow-xs"
                    : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                <span>
                  {cat.id === "Beaches" && "🏖️"}
                  {cat.id === "Mountains" && "🏔️"}
                  {cat.id === "Heritage" && "🏛️"}
                  {cat.id === "Nature" && "🌿"}
                  {cat.id === "Spiritual" && "🧘"}
                  {cat.id === "Food" && "🍛"}
                  {cat.id === "Backpacking" && "🎒"}
                  {cat.id === "All" && "🧭"}
                </span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Region filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-500 uppercase">Region:</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-hidden focus:border-teal-500"
            >
              <option value="All">All Regions</option>
              <option value="North">North India</option>
              <option value="West">West India</option>
              <option value="South">South India</option>
              <option value="East">East India</option>
            </select>
          </div>

          {/* Budget Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-500 uppercase">Max Budget:</span>
            <select
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-bold text-teal-800 focus:outline-hidden focus:border-teal-500"
            >
              <option value={7000}>Under ₹7,000</option>
              <option value={10000}>Under ₹10,000</option>
              <option value={15000}>Under ₹15,000</option>
              <option value={25000}>All Budgets (₹25k+)</option>
            </select>
          </div>
        </div>

        {/* Results Counter & Reset */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-stone-500">
            Showing <span className="text-teal-700 font-extrabold">{filteredDestinations.length}</span> destinations
          </span>

          {(selectedCategory !== "All" || searchQuery || selectedRegion !== "All" || maxBudget < 25000) && (
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-stone-500 hover:text-red-500 transition-colors underline"
            >
              Reset Filters
            </button>
          )}
        </div>

      </div>

      {/* DESTINATION GRID */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-stone-200">
          <div className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            No destinations found matching your filters
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try adjusting your budget or selecting 'All Destinations' to view more budget-friendly getaways.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-xs"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
}
