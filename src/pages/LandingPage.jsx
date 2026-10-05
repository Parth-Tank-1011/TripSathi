import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
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
  const { plannerForm, updatePlannerForm, executeTripGeneration, isGenerating } = useTrip();

  // Floating planner card form state
  const [fromCity, setFromCity] = useState(plannerForm.startingLocation || "");
  const [toCity, setToCity] = useState(plannerForm.destination || "");
  const [days, setDays] = useState(plannerForm.days ? `${plannerForm.days} days` : "");
  const [travelers, setTravelers] = useState(plannerForm.travelers ? `${plannerForm.travelers} travelers` : "");
  const [budget, setBudget] = useState(plannerForm.totalBudget ? `₹${plannerForm.totalBudget.toLocaleString("en-IN")}` : "");

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    if (isGenerating) return;

    // Validate & normalize the planner inputs into ranges the planner supports.
    const parsedFrom = fromCity.trim() || "Rajkot";
    const parsedTo = toCity.trim() || "Goa";
    const rawDays = parseInt(String(days).replace(/\D/g, ""), 10);
    const rawTravelers = parseInt(String(travelers).replace(/\D/g, ""), 10);
    const rawBudget = parseInt(String(budget).replace(/\D/g, ""), 10);

    const parsedDays = Math.min(10, Math.max(2, Number.isFinite(rawDays) ? rawDays : 5));
    const parsedTravelers = Math.min(4, Math.max(1, Number.isFinite(rawTravelers) ? rawTravelers : 2));
    const parsedBudget = Math.max(8000, Number.isFinite(rawBudget) ? rawBudget : 20000);

    const heroForm = {
      startingLocation: parsedFrom,
      destination: parsedTo,
      days: parsedDays,
      travelers: parsedTravelers,
      totalBudget: parsedBudget
    };

    updatePlannerForm(heroForm);

    // Build the itinerary (local mock engine stands in for the FastAPI backend)
    // then hand off to the results page.
    executeTripGeneration({ ...plannerForm, ...heroForm }, () => {
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (err) {
        console.log("Confetti trigger", err);
      }

      navigate("/results");
    });
  };

  // Six featured destinations matching prompt
  const popularFeatured = DESTINATIONS.filter((d) =>
    ["goa", "manali", "jaipur", "kerala", "udaipur", "rishikesh"].includes(d.id)
  );

  return (
    <div className="space-y-16 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative rounded-b-[36px] md:rounded-b-[48px] overflow-hidden pt-8 md:pt-12 pb-12 md:pb-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-teal-50/90 via-emerald-50/40 to-stone-100/70 border-b border-stone-200/80 shadow-xs">
        
        {/* Background Subtle Gradient & Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-teal-200/25 via-emerald-200/20 to-amber-200/25 blur-3xl -z-10 pointer-events-none rounded-full" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-teal-300/15 blur-3xl -z-10 pointer-events-none rounded-full" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-emerald-300/15 blur-3xl -z-10 pointer-events-none rounded-full" />

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center space-y-4 pt-1">
          
          {/* Trust Badge Line */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100/80 border border-teal-200/90 text-teal-950 text-xs md:text-sm font-bold shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Smart planning • Budget friendly • Personalized itineraries</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
            Your Dream Trip, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-amber-500">
              Within Your Budget.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Plan personalized trips across India with smart itineraries, affordable stays, local food, and budget-friendly travel options.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <Link
              to="/planner"
              className="px-7 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-extrabold text-sm sm:text-base transition-all shadow-md shadow-teal-600/20 flex items-center gap-2 active:scale-95"
            >
              <span>Plan My Trip</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/explore"
              className="px-6 py-3 rounded-xl bg-white hover:bg-stone-50 text-slate-800 font-bold text-sm sm:text-base border border-stone-300 shadow-xs transition-all active:scale-95"
            >
              Explore Destinations
            </Link>
          </div>
        </div>

        {/* FLOATING TRIP PLANNER CARD */}
        <div className="max-w-5xl mx-auto w-full mt-6 md:mt-8">
          <form
            onSubmit={handleHeroSubmit}
            className="bg-white p-5 md:p-6 rounded-3xl shadow-xl border border-stone-200/90 text-slate-800 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-ping" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Trip Planner
                </span>
              </div>
              <span className="text-xs font-semibold text-stone-500">
                Smart India Itinerary Builder
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 items-end">
              
              {/* From */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>From</span>
                </label>
                <input
                  type="text"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  placeholder="Starting location"
                  list="hero-origin-cities"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50/70 hover:border-stone-400 focus:border-teal-600 focus:bg-white focus:outline-hidden text-slate-900 font-bold text-sm placeholder:text-stone-400 shadow-2xs transition-all"
                />
              </div>

              {/* To */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>To</span>
                </label>
                <input
                  type="text"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  placeholder="Where do you want to go?"
                  list="hero-destinations"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50/70 hover:border-stone-400 focus:border-teal-600 focus:bg-white focus:outline-hidden text-slate-900 font-bold text-sm placeholder:text-stone-400 shadow-2xs transition-all"
                />
              </div>

              {/* Number of Days */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Number of Days</span>
                </label>
                <input
                  type="text"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  placeholder="e.g. 5 days"
                  list="hero-days"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50/70 hover:border-stone-400 focus:border-teal-600 focus:bg-white focus:outline-hidden text-slate-900 font-bold text-sm placeholder:text-stone-400 shadow-2xs transition-all"
                />
              </div>

              {/* Travelers */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Travelers</span>
                </label>
                <input
                  type="text"
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  placeholder="2 travelers"
                  list="hero-travelers"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50/70 hover:border-stone-400 focus:border-teal-600 focus:bg-white focus:outline-hidden text-slate-900 font-bold text-sm placeholder:text-stone-400 shadow-2xs transition-all"
                />
              </div>

              {/* Budget */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Budget</span>
                </label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="₹20,000"
                  list="hero-budget"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-teal-50/40 hover:border-stone-400 focus:border-teal-600 focus:bg-white focus:outline-hidden text-slate-900 font-bold text-sm placeholder:text-stone-400 shadow-2xs transition-all"
                />
              </div>

              {/* Primary Submit Button */}
              <div className="sm:col-span-2 md:col-span-1 lg:col-span-1">
                <button
                  type="submit"
                  disabled={isGenerating}
                  aria-busy={isGenerating}
                  className="w-full h-[42px] bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-extrabold text-sm rounded-xl shadow-md shadow-teal-600/25 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{isGenerating ? "Creating Your Trip..." : "Create My Trip"}</span>
                </button>
              </div>

            </div>

            {/* Datalists for native browser suggestions */}
            <datalist id="hero-origin-cities">
              {POPULAR_ORIGIN_CITIES.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>

            <datalist id="hero-destinations">
              {DESTINATIONS.map((d) => (
                <option key={d.id} value={d.name} />
              ))}
            </datalist>

            <datalist id="hero-days">
              <option value="3 days" />
              <option value="5 days" />
              <option value="7 days" />
              <option value="10 days" />
            </datalist>

            <datalist id="hero-travelers">
              <option value="1 traveler" />
              <option value="2 travelers" />
              <option value="4 travelers" />
              <option value="6 travelers" />
            </datalist>

            <datalist id="hero-budget">
              <option value="₹10,000" />
              <option value="₹20,000" />
              <option value="₹35,000" />
              <option value="₹50,000" />
            </datalist>

            {/* Bottom Trust Line */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs text-stone-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Transparent IRCTC train rates, local stays, and street food prices</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-bold text-teal-800">
                <span>✓ Instant Itinerary</span>
                <span>✓ 100% Free</span>
              </div>
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
