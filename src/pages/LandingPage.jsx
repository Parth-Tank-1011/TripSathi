import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Wallet,
  ArrowRight,
  Compass,
  ShieldCheck,
  Zap,
  TrendingDown,
  Hotel,
  Utensils,
  Train,
  Star
} from "lucide-react";
import { useTrip } from "../context/TripContext";
import { DESTINATIONS, POPULAR_ORIGIN_CITIES } from "../data/destinations";
import DestinationCard from "../components/DestinationCard";

export default function LandingPage() {
  const navigate = useNavigate();
  const { plannerForm, updatePlannerForm } = useTrip();

  // Floating planner card form state
  const [fromCity, setFromCity] = useState(plannerForm.startingLocation || "Rajkot");
  const [toCity, setToCity] = useState(plannerForm.destination || "Goa");
  const [days, setDays] = useState(plannerForm.days || 5);
  const [travelers, setTravelers] = useState(plannerForm.travelers || 2);
  const [budget, setBudget] = useState(plannerForm.totalBudget || 20000);

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    updatePlannerForm({
      startingLocation: fromCity,
      destination: toCity,
      days: Number(days),
      travelers: Number(travelers),
      totalBudget: Number(budget)
    });
    // Trigger animated generation right away or navigate to planner
    navigate("/planner?step=2");
  };

  // Six featured destinations matching prompt
  const popularFeatured = DESTINATIONS.filter((d) =>
    ["goa", "manali", "jaipur", "kerala", "udaipur", "rishikesh"].includes(d.id)
  );

  return (
    <div className="space-y-20 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[640px] md:min-h-[720px] rounded-b-[40px] md:rounded-b-[56px] overflow-hidden flex flex-col justify-between pt-12 md:pt-18 pb-16 px-4 sm:px-6 lg:px-8">
        
        {/* Background Image & Gradient Overlays */}
        <div className="absolute inset-0 -z-10 bg-slate-900">
          <img
            src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2000&auto=format&fit=crop"
            alt="Incredible India Travel"
            className="w-full h-full object-cover opacity-50 scale-105 animate-pulse-subtle"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/40" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/30 to-slate-950/80" />
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center space-y-6 pt-4">
          
          {/* Trust Badge Line */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-semibold shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Smart planning • Budget friendly • Personalized itineraries</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] drop-shadow-md">
            Your Dream Trip, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-300">
              Within Your Budget.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-stone-200 font-normal max-w-2xl mx-auto leading-relaxed drop-shadow-xs">
            Plan personalized trips across India with smart itineraries, affordable stays, local food, and budget-friendly travel options.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/planner"
              className="px-8 py-3.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-base transition-all duration-200 shadow-lg shadow-teal-500/25 flex items-center gap-2 active:scale-95"
            >
              <span>Plan My Trip</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/explore"
              className="px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base backdrop-blur-md border border-white/20 transition-all duration-200"
            >
              Explore Destinations
            </Link>
          </div>
        </div>

        {/* FLOATING TRIP PLANNER CARD */}
        <div className="max-w-5xl mx-auto w-full mt-10 md:mt-14">
          <form
            onSubmit={handleHeroSubmit}
            className="bg-white/95 backdrop-blur-xl p-5 md:p-7 rounded-3xl md:rounded-4xl shadow-2xl border border-white/60 text-slate-800 space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  Quick Trip Configurator
                </span>
              </div>
              <span className="text-xs font-semibold text-stone-400">
                Tailored for Indian budgets
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              
              {/* From */}
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 hover:border-teal-400 focus-within:border-teal-500 focus-within:bg-white transition-all">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 flex items-center gap-1 block">
                  <MapPin className="w-3 h-3 text-teal-600" />
                  <span>From</span>
                </label>
                <select
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="w-full bg-transparent font-extrabold text-slate-900 text-sm focus:outline-hidden mt-1 cursor-pointer"
                >
                  {POPULAR_ORIGIN_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* To */}
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 hover:border-teal-400 focus-within:border-teal-500 focus-within:bg-white transition-all">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 flex items-center gap-1 block">
                  <Compass className="w-3 h-3 text-teal-600" />
                  <span>To Destination</span>
                </label>
                <select
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="w-full bg-transparent font-extrabold text-slate-900 text-sm focus:outline-hidden mt-1 cursor-pointer"
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.name}>{d.name} ({d.state})</option>
                  ))}
                </select>
              </div>

              {/* Number of Days */}
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 hover:border-teal-400 focus-within:border-teal-500 focus-within:bg-white transition-all">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 flex items-center gap-1 block">
                  <Calendar className="w-3 h-3 text-teal-600" />
                  <span>Duration</span>
                </label>
                <select
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full bg-transparent font-extrabold text-slate-900 text-sm focus:outline-hidden mt-1 cursor-pointer"
                >
                  <option value={3}>3 Days (Weekend)</option>
                  <option value={4}>4 Days (Short Getaway)</option>
                  <option value={5}>5 Days (Optimal)</option>
                  <option value={7}>7 Days (Full Week)</option>
                  <option value={10}>10 Days (Grand Tour)</option>
                </select>
              </div>

              {/* Travelers */}
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 hover:border-teal-400 focus-within:border-teal-500 focus-within:bg-white transition-all">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 flex items-center gap-1 block">
                  <Users className="w-3 h-3 text-teal-600" />
                  <span>Travelers</span>
                </label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full bg-transparent font-extrabold text-slate-900 text-sm focus:outline-hidden mt-1 cursor-pointer"
                >
                  <option value={1}>1 Solo Explorer</option>
                  <option value={2}>2 Travelers (Couple/Friends)</option>
                  <option value={3}>3 Travelers (Squad)</option>
                  <option value={4}>4 Travelers (Group)</option>
                  <option value={6}>6 Travelers (Family)</option>
                </select>
              </div>

              {/* Budget */}
              <div className="p-3 bg-teal-50/70 rounded-2xl border border-teal-200/80 hover:border-teal-400 focus-within:border-teal-500 focus-within:bg-white transition-all">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-teal-900 flex items-center gap-1 block">
                  <Wallet className="w-3 h-3 text-teal-700" />
                  <span>Total Budget</span>
                </label>
                <div className="flex items-center text-teal-950 font-extrabold text-base mt-1">
                  <span>₹</span>
                  <input
                    type="number"
                    step="1000"
                    min="5000"
                    max="200000"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full bg-transparent font-black text-slate-900 text-sm focus:outline-hidden pl-1"
                  />
                </div>
              </div>

            </div>

            {/* Bottom CTA Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Transparent IRCTC train rates, local stays, and street food prices</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md shadow-teal-600/25 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Create My Trip</span>
              </button>
            </div>
          </form>
        </div>

      </section>

      {/* POPULAR DESTINATIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold mb-2">
              <Compass className="w-3.5 h-3.5 text-teal-600" />
              <span>Handpicked Destinations</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore Popular Destinations
            </h2>
            <p className="text-stone-500 text-sm md:text-base mt-1 max-w-xl">
              Discover amazing places across India without breaking your budget.
            </p>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:text-teal-900 self-start md:self-auto group"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {popularFeatured.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-stone-100/70 py-16 md:py-24 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              How TripSathi Works
            </h2>
            <p className="text-stone-600 text-sm md:text-base">
              From inputting your savings to enjoying street food in Goa — here is how we build your vacation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-xs relative flex flex-col justify-between group hover:border-teal-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-black text-xl mb-5 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                1
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">
                  Tell Us Your Plan
                </h3>
                <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
                  Enter your destination, days, travelers and budget.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-stone-100 text-[11px] font-bold text-teal-700">
                Departure + Rupee Budget
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-xs relative flex flex-col justify-between group hover:border-teal-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-black text-xl mb-5 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                2
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">
                  We Build Your Trip
                </h3>
                <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
                  Our planner finds suitable stays, food and activities.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-stone-100 text-[11px] font-bold text-teal-700">
                Smart Algorithm Matching
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-xs relative flex flex-col justify-between group hover:border-teal-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-black text-xl mb-5 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                3
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">
                  Optimize Your Budget
                </h3>
                <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
                  Get the best combination of experiences within your budget.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-stone-100 text-[11px] font-bold text-teal-700">
                Real Rupee Distribution
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-xs relative flex flex-col justify-between group hover:border-teal-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-black text-xl mb-5 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                4
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">
                  Travel & Enjoy
                </h3>
                <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
                  Follow your personalized itinerary and enjoy your trip.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-stone-100 text-[11px] font-bold text-teal-700">
                Zero Budget Anxiety
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Built For Indian Explorers</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Features Tailored For Smart Travel
          </h2>
          <p className="text-stone-500 text-sm md:text-base">
            Every feature is designed to reduce costs and maximize cultural immersion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Smart Itinerary</h3>
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
              Get a day-by-day travel plan with exact timings, attractions, and optimal routes.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <TrendingDown className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Budget Optimizer</h3>
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
              Keep your entire trip within your budget with dynamic allocations across categories.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Hotel className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Affordable Stays</h3>
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
              Find verified hostels and homestays suitable for your budget with real per-night rates.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Utensils className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Local Food</h3>
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
              Discover affordable and popular local food options, legendary thali spots, and street bites.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Train className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Transportation</h3>
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
              Get budget-friendly travel suggestions including scooter rentals, state buses, and trains.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Personalized Trips</h3>
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
              Plans based on your interests, travel style (adventure, relaxed, solo, family), and dietary needs.
            </p>
          </div>

        </div>
      </section>

      {/* TRAVELER STORIES / TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-tr from-teal-900 to-slate-900 text-white rounded-4xl p-8 md:p-14 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>

            <blockquote className="text-xl sm:text-2xl md:text-3xl font-bold leading-snug">
              “TripSathi completely eliminated our group budget arguments. We spent ₹17,450 for 5 days in Goa instead of the ₹30,000 package quoted by agents. The scooter and local thali suggestions were golden!”
            </blockquote>

            <div className="flex items-center gap-4 pt-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                alt="Parth & Friends"
                className="w-12 h-12 rounded-full object-cover border-2 border-teal-400"
              />
              <div>
                <h4 className="font-extrabold text-white text-base">Parth Sharma & Friends</h4>
                <p className="text-xs text-teal-300">Explored Goa from Rajkot • Saved ₹12,550</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-4xl mx-auto text-center px-4 space-y-6">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Ready to plan your next Indian getaway?
        </h2>
        <p className="text-stone-600 text-base max-w-xl mx-auto">
          Tell us where you want to go and how much you can spend — we'll plan the entire trip around your budget.
        </p>
        <Link
          to="/planner"
          className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-teal-600/25 transition-all active:scale-95"
        >
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>Start Planning Free</span>
        </Link>
      </section>

    </div>
  );
}
