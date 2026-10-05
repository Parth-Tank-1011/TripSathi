import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapPin,
  Compass,
  Calendar,
  Users,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check
} from "lucide-react";
import confetti from "canvas-confetti";
import { useTrip } from "../context/TripContext";
import { DESTINATIONS, POPULAR_ORIGIN_CITIES } from "../data/destinations";

const TRAVEL_STYLES = [
  { id: "Relaxed", label: "Relaxed", emoji: "🌴", desc: "Slow pace, chill vibes" },
  { id: "Adventure", label: "Adventure", emoji: "🧗", desc: "Trekking & adrenaline" },
  { id: "Family", label: "Family", emoji: "👨‍👩‍👧‍👦", desc: "Comfort & kid-friendly" },
  { id: "Couple", label: "Couple", emoji: "💑", desc: "Romantic & scenic spots" },
  { id: "Backpacking", label: "Backpacking", emoji: "🎒", desc: "Shoestring & hostels" },
  { id: "Luxury", label: "Luxury", emoji: "✨", desc: "Premium stays & cabs" },
  { id: "Solo", label: "Solo", emoji: "🚶", desc: "Independence & culture" }
];

const INTERESTS_LIST = [
  { id: "Beaches", label: "Beaches", emoji: "🏖️" },
  { id: "Mountains", label: "Mountains", emoji: "🏔️" },
  { id: "History", label: "History", emoji: "🏛️" },
  { id: "Nature", label: "Nature", emoji: "🌿" },
  { id: "Food", label: "Food", emoji: "🍛" },
  { id: "Nightlife", label: "Nightlife", emoji: "🎉" },
  { id: "Shopping", label: "Shopping", emoji: "🛍️" },
  { id: "Adventure", label: "Adventure", emoji: "🏄" },
  { id: "Photography", label: "Photography", emoji: "📸" },
  { id: "Culture", label: "Culture", emoji: "🎭" }
];

const FOOD_PREFERENCES = [
  { id: "Vegetarian", label: "Vegetarian", emoji: "🥬", desc: "No meat or egg" },
  { id: "Non-Vegetarian", label: "Non-Vegetarian", emoji: "🍗", desc: "Meat & coastal seafood" },
  { id: "Jain", label: "Jain", emoji: "🌱", desc: "No onion, garlic, or root veg" },
  { id: "Vegan", label: "Vegan", emoji: "🥑", desc: "Plant-based dining" },
  { id: "Local Food", label: "Local Food", emoji: "🍛", desc: "Authentic regional thalis" },
  { id: "Street Food", label: "Street Food", emoji: "🥟", desc: "Famous bazaar snacks" }
];

const STAY_PREFERENCES = [
  { id: "Hostel", label: "Hostel", emoji: "🛏️", desc: "Social dorms (₹500–₹800/night)", badge: "Budget Pick" },
  { id: "Budget Hotel", label: "Budget Hotel", emoji: "🏨", desc: "Private room with AC (₹1,000–₹1,500/night)" },
  { id: "3-Star Hotel", label: "3-Star Hotel", emoji: "⭐", desc: "Comfort with pool & buffet (₹1,800–₹2,500/night)" },
  { id: "Homestay", label: "Homestay", emoji: "🏡", desc: "Local family hospitality (₹1,000–₹1,600/night)", badge: "Authentic" }
];

const GENERATION_STEPS = [
  "Understanding your preferences",
  "Finding budget-friendly stays",
  "Planning your itinerary",
  "Estimating travel costs",
  "Finding food options",
  "Your trip is ready!"
];

export default function PlannerPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    plannerForm,
    updatePlannerForm,
    isGenerating,
    generationStep,
    executeTripGeneration
  } = useTrip();

  // Multi-step: 1 = Details, 2 = Preferences, 3 = Budget, 4 = Generating
  const initialStep = Number(searchParams.get("step")) || 1;
  const [currentStep, setCurrentStep] = useState(initialStep);

  // Form local state synced with context
  const [startingLocation, setStartingLocation] = useState(plannerForm.startingLocation || "Rajkot");
  const [destination, setDestination] = useState(plannerForm.destination || "Goa");
  const [days, setDays] = useState(plannerForm.days || 5);
  const [travelers, setTravelers] = useState(plannerForm.travelers || 2);
  const [travelDates, setTravelDates] = useState(plannerForm.travelDates || "2026-11-14 to 2026-11-19");

  const [travelStyle, setTravelStyle] = useState(plannerForm.travelStyle || "Relaxed");
  const [interests, setInterests] = useState(plannerForm.interests || ["Beaches", "Food", "Heritage"]);
  const [foodPreference, setFoodPreference] = useState(plannerForm.foodPreference || "Local Food");
  const [stayPreference, setStayPreference] = useState(plannerForm.stayPreference || "Hostel");

  const [totalBudget, setTotalBudget] = useState(plannerForm.totalBudget || 20000);

  // Sync to plannerForm when moving forward
  const syncFormData = () => {
    updatePlannerForm({
      startingLocation,
      destination,
      days: Number(days),
      travelers: Number(travelers),
      travelDates,
      travelStyle,
      interests,
      foodPreference,
      stayPreference,
      totalBudget: Number(totalBudget)
    });
  };

  const handleNext = () => {
    syncFormData();
    setCurrentStep((prev) => Math.min(3, prev + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleInterest = (id) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleGeneratePlan = async () => {
    syncFormData();
    setCurrentStep(4); // Generating screen

    const fullPayload = {
      startingLocation,
      destination,
      days: Number(days),
      travelers: Number(travelers),
      travelDates,
      travelStyle,
      interests,
      foodPreference,
      stayPreference,
      totalBudget: Number(totalBudget)
    };

    await executeTripGeneration(fullPayload, () => {
      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log("Confetti trigger", e);
      }

      setTimeout(() => {
        navigate("/results");
      }, 1000);
    });
  };

  // Dynamic budget allocation preview calculation
  const bNum = Number(totalBudget) || 20000;
  const allocTransport = Math.round(bNum * 0.25);
  const allocStay = Math.round(bNum * 0.25);
  const allocFood = Math.round(bNum * 0.20);
  const allocActivities = Math.round(bNum * 0.20);
  const allocMisc = Math.round(bNum * 0.10);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      
      {/* GENERATING SCREEN (OVERLAY / VIEW) */}
      {(currentStep === 4 || isGenerating) ? (
        <div className="bg-white rounded-4xl p-8 md:p-14 border border-stone-200 shadow-xl text-center space-y-8 animate-in fade-in duration-300">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-teal-100 border-t-teal-600 animate-spin" />
            <div className="w-full h-full flex items-center justify-center text-teal-600 font-black">
              <Sparkles className="w-8 h-8 animate-pulse text-amber-500" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Creating your perfect trip...
            </h2>
            <p className="text-stone-500 text-sm md:text-base">
              Customizing {destination} plan for {travelers} traveler(s) within ₹{totalBudget.toLocaleString("en-IN")}
            </p>
          </div>

          {/* Animated Checklist Steps */}
          <div className="max-w-md mx-auto space-y-3 text-left bg-stone-50 p-6 rounded-3xl border border-stone-200/80">
            {GENERATION_STEPS.map((stepText, idx) => {
              const isDone = generationStep > idx;
              const isCurrent = generationStep === idx;

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 transition-all duration-300 ${
                    isDone
                      ? "text-emerald-700 font-bold"
                      : isCurrent
                      ? "text-teal-900 font-extrabold scale-102"
                      : "text-stone-400 font-medium"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs transition-colors ${
                      isDone
                        ? "bg-emerald-600 text-white"
                        : isCurrent
                        ? "bg-teal-500 text-white animate-pulse"
                        : "bg-stone-200 text-stone-500"
                    }`}
                  >
                    {isDone ? <Check className="w-3.5 h-3.5 stroke-3" /> : idx + 1}
                  </div>
                  <span className="text-sm">
                    {idx === GENERATION_STEPS.length - 1 && isDone ? "Your trip is ready!" : stepText}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-stone-400">
            Scanning local transit routes, verified homestays, and authentic food recommendations...
          </p>
        </div>
      ) : (
        /* MULTI-STEP TRIP PLANNER FORM */
        <div className="space-y-8">
          
          {/* Header & Value Prop */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200/60">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>India Budget Travel Planner</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Build Your Custom Itinerary
            </h1>
            <p className="text-stone-500 text-sm md:text-base max-w-xl mx-auto">
              Tell us where you want to go and how much you can spend — we'll plan the trip around your budget.
            </p>
          </div>

          {/* PROGRESS INDICATOR */}
          <div className="bg-white p-4 md:p-6 rounded-3xl border border-stone-200/80 shadow-xs">
            <div className="grid grid-cols-4 gap-2 text-center">
              
              {/* Step 1 */}
              <div
                onClick={() => setCurrentStep(1)}
                className={`flex flex-col items-center cursor-pointer ${
                  currentStep >= 1 ? "text-teal-700" : "text-stone-400"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 transition-all ${
                    currentStep === 1
                      ? "bg-teal-600 text-white ring-4 ring-teal-100"
                      : currentStep > 1
                      ? "bg-emerald-600 text-white"
                      : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {currentStep > 1 ? <Check className="w-4 h-4 stroke-3" /> : "1"}
                </div>
                <span className="text-xs font-bold hidden sm:inline">1. Trip Details</span>
                <span className="text-[11px] font-bold sm:hidden">Details</span>
              </div>

              {/* Step 2 */}
              <div
                onClick={() => currentStep > 1 && setCurrentStep(2)}
                className={`flex flex-col items-center ${
                  currentStep >= 2 ? "cursor-pointer text-teal-700" : "text-stone-400"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 transition-all ${
                    currentStep === 2
                      ? "bg-teal-600 text-white ring-4 ring-teal-100"
                      : currentStep > 2
                      ? "bg-emerald-600 text-white"
                      : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {currentStep > 2 ? <Check className="w-4 h-4 stroke-3" /> : "2"}
                </div>
                <span className="text-xs font-bold hidden sm:inline">2. Preferences</span>
                <span className="text-[11px] font-bold sm:hidden">Preferences</span>
              </div>

              {/* Step 3 */}
              <div
                onClick={() => currentStep > 2 && setCurrentStep(3)}
                className={`flex flex-col items-center ${
                  currentStep >= 3 ? "cursor-pointer text-teal-700" : "text-stone-400"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 transition-all ${
                    currentStep === 3
                      ? "bg-teal-600 text-white ring-4 ring-teal-100"
                      : currentStep > 3
                      ? "bg-emerald-600 text-white"
                      : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {currentStep > 3 ? <Check className="w-4 h-4 stroke-3" /> : "3"}
                </div>
                <span className="text-xs font-bold hidden sm:inline">3. Budget</span>
                <span className="text-[11px] font-bold sm:hidden">Budget</span>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-stone-400">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 bg-stone-100 text-stone-500">
                  4
                </div>
                <span className="text-xs font-bold hidden sm:inline">4. Generate Plan</span>
                <span className="text-[11px] font-bold sm:hidden">Plan</span>
              </div>

            </div>

            {/* Connecting line */}
            <div className="h-1.5 bg-stone-100 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-teal-600 transition-all duration-500"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* STEP 1: TRIP DETAILS */}
          {currentStep === 1 && (
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/80 shadow-xs space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-stone-100 pb-4">
                <h3 className="text-xl font-extrabold text-slate-900">
                  Step 1 — Where & When Are You Travelling?
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Pick your starting city and dream destination across Bharat
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Starting Location */}
                <div>
                  <label className="text-xs font-extrabold uppercase tracking-wider text-stone-600 flex items-center gap-1.5 mb-2">
                    <MapPin className="w-4 h-4 text-teal-600" />
                    <span>Starting Location (Origin City)</span>
                  </label>
                  <select
                    value={startingLocation}
                    onChange={(e) => setStartingLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 font-bold text-slate-800 text-sm focus:outline-hidden focus:border-teal-500 focus:bg-white"
                  >
                    {POPULAR_ORIGIN_CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Destination */}
                <div>
                  <label className="text-xs font-extrabold uppercase tracking-wider text-stone-600 flex items-center gap-1.5 mb-2">
                    <Compass className="w-4 h-4 text-teal-600" />
                    <span>Destination</span>
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 font-bold text-slate-800 text-sm focus:outline-hidden focus:border-teal-500 focus:bg-white"
                  >
                    {DESTINATIONS.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.state})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Number of Days */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-teal-600" />
                      <span>Number of Days</span>
                    </label>
                    <span className="text-sm font-black text-teal-800">
                      {days} Days
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={10}
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full accent-teal-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                    <span>2 Days</span>
                    <span>5 Days (Recommended)</span>
                    <span>10 Days</span>
                  </div>
                </div>

                {/* Number of Travelers */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-teal-600" />
                      <span>Number of Travelers</span>
                    </label>
                    <span className="text-sm font-black text-teal-800">
                      {travelers} {travelers === 1 ? "Traveler" : "Travelers"}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setTravelers(num)}
                        className={`py-2.5 rounded-xl font-bold text-xs transition-all ${
                          travelers === num
                            ? "bg-teal-600 text-white shadow-xs"
                            : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                        }`}
                      >
                        {num === 1 ? "1 Solo" : num === 2 ? "2 Couple" : `${num} People`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Dates */}
                <div className="md:col-span-2">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-stone-600 flex items-center gap-1.5 mb-2">
                    <span>Travel Dates (Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={travelDates}
                    onChange={(e) => setTravelDates(e.target.value)}
                    placeholder="e.g. 14 Nov – 19 Nov (or Diwali holidays)"
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm focus:outline-hidden focus:border-teal-500 focus:bg-white"
                  />
                </div>

              </div>

              {/* Next Button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm rounded-2xl flex items-center gap-2 shadow-md shadow-teal-600/20 active:scale-95 transition-all"
                >
                  <span>Next: Preferences</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PREFERENCES */}
          {currentStep === 2 && (
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/80 shadow-xs space-y-8 animate-in fade-in duration-200">
              <div className="border-b border-stone-100 pb-4">
                <h3 className="text-xl font-extrabold text-slate-900">
                  Step 2 — Personalize Your Experience
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Select your travel vibe, favorite activities, dietary rules, and stay style
                </p>
              </div>

              {/* Travel Style */}
              <div className="space-y-3">
                <label className="text-xs font-extrabold uppercase tracking-wider text-stone-700 block">
                  Travel Style
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {TRAVEL_STYLES.map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setTravelStyle(style.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        travelStyle === style.id
                          ? "bg-teal-50 border-teal-500 ring-2 ring-teal-500/20 shadow-xs"
                          : "bg-white border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <span className="text-2xl block mb-1">{style.emoji}</span>
                      <h4 className="text-xs font-bold text-slate-900">{style.label}</h4>
                      <p className="text-[10px] text-stone-500">{style.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-stone-700 block">
                    Interests (Select Multiple)
                  </label>
                  <span className="text-[11px] text-stone-400 font-medium">
                    {interests.length} selected
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS_LIST.map((item) => {
                    const isSelected = interests.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleInterest(item.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                          isSelected
                            ? "bg-teal-600 text-white shadow-xs"
                            : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                        }`}
                      >
                        <span>{item.emoji}</span>
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Food Preference */}
              <div className="space-y-3">
                <label className="text-xs font-extrabold uppercase tracking-wider text-stone-700 block">
                  Food & Dietary Preference
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {FOOD_PREFERENCES.map((food) => (
                    <button
                      key={food.id}
                      type="button"
                      onClick={() => setFoodPreference(food.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        foodPreference === food.id
                          ? "bg-teal-50 border-teal-500 ring-2 ring-teal-500/20 shadow-xs"
                          : "bg-white border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <span className="text-xl block mb-1">{food.emoji}</span>
                      <h4 className="text-xs font-bold text-slate-900">{food.label}</h4>
                      <p className="text-[10px] text-stone-500">{food.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stay Preference */}
              <div className="space-y-3">
                <label className="text-xs font-extrabold uppercase tracking-wider text-stone-700 block">
                  Accommodation Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {STAY_PREFERENCES.map((stay) => (
                    <button
                      key={stay.id}
                      type="button"
                      onClick={() => setStayPreference(stay.id)}
                      className={`p-4 rounded-2xl border text-left transition-all relative flex items-start gap-3 ${
                        stayPreference === stay.id
                          ? "bg-teal-50 border-teal-500 ring-2 ring-teal-500/20 shadow-xs"
                          : "bg-white border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <span className="text-2xl">{stay.emoji}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{stay.label}</h4>
                          {stay.badge && (
                            <span className="text-[10px] bg-teal-100 text-teal-800 font-extrabold px-1.5 py-0.5 rounded-sm">
                              {stay.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">{stay.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Actions */}
              <div className="pt-4 flex items-center justify-between border-t border-stone-100">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm rounded-2xl flex items-center gap-2 shadow-md shadow-teal-600/20 active:scale-95 transition-all"
                >
                  <span>Next: Budget</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: BUDGET */}
          {currentStep === 3 && (
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/80 shadow-xs space-y-8 animate-in fade-in duration-200">
              <div className="border-b border-stone-100 pb-4">
                <h3 className="text-xl font-extrabold text-slate-900">
                  Step 3 — Set Your Total Trip Budget
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  How much do you want to spend in total for this trip?
                </p>
              </div>

              {/* Large Budget Input */}
              <div className="text-center py-6 bg-gradient-to-b from-teal-50/50 to-stone-50 p-6 rounded-3xl border border-teal-200/60 space-y-4">
                <label className="text-xs font-black uppercase tracking-wider text-teal-800 block">
                  What's your total trip budget?
                </label>

                <div className="flex items-center justify-center text-4xl sm:text-5xl md:text-6xl font-black text-teal-900 tracking-tight">
                  <span>₹</span>
                  <input
                    type="number"
                    step="1000"
                    min="5000"
                    max="200000"
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(Number(e.target.value))}
                    className="w-56 sm:w-72 bg-transparent text-center font-black focus:outline-hidden border-b-2 border-teal-500/40 focus:border-teal-600 text-teal-950"
                  />
                </div>

                <p className="text-xs text-stone-500">
                  Total for {travelers} traveler(s) over {days} days • Approx ₹{Math.round(totalBudget / (travelers * days)).toLocaleString("en-IN")}/day per person
                </p>

                {/* Visual Budget Slider */}
                <div className="max-w-lg mx-auto pt-4 space-y-2">
                  <input
                    type="range"
                    min={8000}
                    max={60000}
                    step={1000}
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(Number(e.target.value))}
                    className="w-full accent-teal-600 h-3 bg-stone-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-stone-500 font-bold">
                    <span>₹8,000 (Shoestring)</span>
                    <span>₹20,000 (Standard)</span>
                    <span>₹60,000 (Comfort)</span>
                  </div>
                </div>
              </div>

              {/* Estimated Live Allocation */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
                    Estimated Live Allocation
                  </h4>
                  <span className="text-xs text-stone-400 font-medium">
                    Calculated for {destination}
                  </span>
                </div>

                {/* Horizontal segmented breakdown */}
                <div className="h-4 w-full bg-stone-100 rounded-full overflow-hidden flex p-0.5 border border-stone-200">
                  <div className="bg-blue-500 h-full rounded-l-full" style={{ width: "25%" }} title="Transportation" />
                  <div className="bg-teal-500 h-full" style={{ width: "25%" }} title="Accommodation" />
                  <div className="bg-amber-500 h-full" style={{ width: "20%" }} title="Food" />
                  <div className="bg-purple-500 h-full" style={{ width: "20%" }} title="Activities" />
                  <div className="bg-stone-400 h-full rounded-r-full" style={{ width: "10%" }} title="Emergency / Misc" />
                </div>

                {/* 5 Allocation Chips matching prompt */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
                  
                  {/* Transportation */}
                  <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-left">
                    <span className="text-[10px] font-bold text-blue-700 uppercase block">Transportation</span>
                    <span className="text-base font-black text-blue-900">
                      ₹{allocTransport.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-stone-500 block">Trains / Bus / Scooter</span>
                  </div>

                  {/* Accommodation */}
                  <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200 text-left">
                    <span className="text-[10px] font-bold text-teal-700 uppercase block">Accommodation</span>
                    <span className="text-base font-black text-teal-900">
                      ₹{allocStay.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-stone-500 block">{days} nights in {stayPreference}</span>
                  </div>

                  {/* Food */}
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-left">
                    <span className="text-[10px] font-bold text-amber-700 uppercase block">Food</span>
                    <span className="text-base font-black text-amber-900">
                      ₹{allocFood.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-stone-500 block">Regional thalis & snacks</span>
                  </div>

                  {/* Activities */}
                  <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 text-left">
                    <span className="text-[10px] font-bold text-purple-700 uppercase block">Activities</span>
                    <span className="text-base font-black text-purple-900">
                      ₹{allocActivities.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-stone-500 block">Fort entry & sight tickets</span>
                  </div>

                  {/* Emergency / Misc */}
                  <div className="p-3 rounded-2xl bg-stone-100 border border-stone-200 text-left col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-bold text-stone-700 uppercase block">Emergency/Misc.</span>
                    <span className="text-base font-black text-slate-800">
                      ₹{allocMisc.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-stone-500 block">Contingency buffer</span>
                  </div>

                </div>
              </div>

              {/* Navigation & Generate CTA */}
              <div className="pt-6 flex items-center justify-between border-t border-stone-100">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleGeneratePlan}
                  className="px-8 py-4 bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-black text-base rounded-2xl flex items-center gap-2 shadow-lg shadow-teal-600/25 active:scale-95 transition-all"
                >
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>Generate My Trip</span>
                </button>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
