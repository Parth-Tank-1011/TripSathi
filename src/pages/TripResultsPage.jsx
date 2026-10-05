import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bookmark,
  Share2,
  Edit,
  Sparkles,
  CheckCircle2,
  Printer,
  ArrowLeft
} from "lucide-react";
import { useTrip } from "../context/TripContext";
import BudgetCard from "../components/BudgetCard";
import BudgetBreakdown from "../components/BudgetBreakdown";
import ItineraryTimeline from "../components/ItineraryTimeline";
import HotelCard from "../components/HotelCard";
import FoodCard from "../components/FoodCard";
import TransportCard from "../components/TransportCard";
import BudgetTipsCard from "../components/BudgetTipsCard";
import ShareTripModal from "../components/modals/ShareTripModal";
import AddActivityModal from "../components/modals/AddActivityModal";
import MapModal from "../components/modals/MapModal";
import { ACCOMMODATIONS, RESTAURANTS, TRANSPORTATION_OPTIONS, BUDGET_SAVING_TIPS } from "../data/mockData";

export default function TripResultsPage() {
  const { currentPlan, saveActivePlanToTrips, updateSavedTrip } = useTrip();

  // Modals state
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [addActModal, setAddActModal] = useState({ isOpen: false, dayNumber: 1 });
  const [mapModal, setMapModal] = useState({ isOpen: false, day: null });
  const [isSaved, setIsSaved] = useState(false);

  // Fallback safe plan data if user visited page directly
  const plan = currentPlan || {
    destination: "Goa",
    startingLocation: "Rajkot",
    days: 5,
    travelers: 2,
    budget: 20000,
    estimatedCost: 17450,
    remainingBudget: 2550,
    budgetBreakdown: {
      travel: 4500,
      stay: 4000,
      food: 3500,
      activities: 4000,
      misc: 1450
    },
    itinerary: []
  };

  const destSlug = (plan.destination || "goa").toLowerCase().replace(/[^a-z]/g, "");
  const stays = plan.accommodations || ACCOMMODATIONS[destSlug] || ACCOMMODATIONS.goa;
  const foodPlaces = plan.restaurants || RESTAURANTS[destSlug] || RESTAURANTS.goa;
  const transports = plan.transportation || TRANSPORTATION_OPTIONS[destSlug] || TRANSPORTATION_OPTIONS.goa;
  const savingTips = plan.savingTips || BUDGET_SAVING_TIPS[destSlug] || BUDGET_SAVING_TIPS.goa;

  const handleSaveTrip = () => {
    saveActivePlanToTrips(plan);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddActivity = (newActivity) => {
    const updatedItinerary = (plan.itinerary || []).map((day) => {
      if (day.dayNumber === addActModal.dayNumber) {
        return {
          ...day,
          activities: [...(day.activities || []), newActivity]
        };
      }
      return day;
    });

    if (plan.id) {
      updateSavedTrip(plan.id, { itinerary: updatedItinerary });
    }
  };

  const handleDeleteActivity = (actId) => {
    const updatedItinerary = (plan.itinerary || []).map((day) => ({
      ...day,
      activities: (day.activities || []).filter((a) => a.id !== actId)
    }));

    if (plan.id) {
      updateSavedTrip(plan.id, { itinerary: updatedItinerary });
    }
  };

  return (
    <div className="space-y-12 pb-24 print:space-y-6">
      
      {/* HEADER SECTION */}
      <section className="bg-white border-b border-stone-200/80 pt-8 pb-10 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between">
            <Link
              to="/planner"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-teal-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Planner</span>
            </Link>

            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Personalized Smart Plan</span>
            </span>
          </div>

          {/* Title Row with Action Buttons */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  From {plan.startingLocation || "Rajkot"}
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                  Confirmed Itinerary
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Your {plan.destination || "Goa"} Trip
              </h1>

              <p className="text-base sm:text-lg font-bold text-stone-600 flex flex-wrap items-center gap-2">
                <span>{plan.days || 5} Days</span>
                <span className="text-stone-300">•</span>
                <span>{plan.travelers || 2} Travelers</span>
                <span className="text-stone-300">•</span>
                <span className="text-teal-700">₹{(plan.budget || 20000).toLocaleString("en-IN")} Budget</span>
              </p>
            </div>

            {/* Action Buttons Toolbar */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleSaveTrip}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-2xs ${
                  isSaved
                    ? "bg-emerald-600 text-white"
                    : "bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20"
                }`}
              >
                {isSaved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Saved to My Trips!</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>Save Trip</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShareModalOpen(true)}
                className="px-4 py-2.5 rounded-xl border border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-slate-800 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <Share2 className="w-4 h-4 text-stone-600" />
                <span>Share</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl border border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-slate-800 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <Printer className="w-4 h-4 text-stone-600" />
                <span>Print / PDF</span>
              </button>

              <Link
                to="/planner?step=3"
                className="px-4 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 font-bold text-xs flex items-center gap-1.5 transition-all"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Recalculate</span>
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* MAIN CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 1. BUDGET SUMMARY CARD & BREAKDOWN */}
        <section className="space-y-6">
          <BudgetCard
            totalBudget={plan.budget || 20000}
            estimatedCost={plan.estimatedCost || 17450}
            remainingBudget={plan.remainingBudget || 2550}
          />

          <BudgetBreakdown
            breakdown={plan.budgetBreakdown}
            totalBudget={plan.budget || 20000}
          />
        </section>

        {/* 2. DAY-BY-DAY ITINERARY */}
        <section className="bg-white p-6 md:p-8 rounded-4xl border border-stone-200/90 shadow-sm">
          <ItineraryTimeline
            itinerary={plan.itinerary || []}
            onOpenMap={(day) => setMapModal({ isOpen: true, day })}
            onAddActivity={(dayNum) => setAddActModal({ isOpen: true, dayNumber: dayNum })}
            onDeleteActivity={handleDeleteActivity}
          />
        </section>

        {/* 3. WHERE YOU'LL STAY (ACCOMMODATIONS) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold mb-2">
                <span>Verified Clean & Budget Friendly</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Where You'll Stay
              </h3>
              <p className="text-xs md:text-sm text-stone-500 mt-0.5">
                Carefully selected hostels and homestays matching your ₹{(plan.budgetBreakdown?.stay || 4000).toLocaleString("en-IN")} accommodation budget
              </p>
            </div>
            <span className="text-xs font-bold text-stone-500">
              3 Curated Options
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stays.map((hotel, idx) => (
              <HotelCard
                key={hotel.id || idx}
                hotel={hotel}
                isSelected={idx === 0}
                onSelect={(h) => alert(`You have selected ${h.name} for your stay!`)}
              />
            ))}
          </div>
        </section>

        {/* 4. EAT LIKE A LOCAL (FOOD RECOMMENDATIONS) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-2">
                <span>Legendary Food & Regional Flavors</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Eat Like a Local
              </h3>
              <p className="text-xs md:text-sm text-stone-500 mt-0.5">
                Authentic thali spots, beach bakeries, and pure veg joints loved by residents
              </p>
            </div>
            <span className="text-xs font-bold text-stone-500">
              Avg ₹180–₹350 per meal
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {foodPlaces.map((rest, idx) => (
              <FoodCard
                key={rest.id || idx}
                restaurant={rest}
                onSelect={(r) => alert(`Viewing menu and directions for ${r.name}`)}
              />
            ))}
          </div>
        </section>

        {/* 5. TRANSPORTATION SECTION */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold mb-2">
                <span>Seamless Mobility</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Getting Around
              </h3>
              <p className="text-xs md:text-sm text-stone-500 mt-0.5">
                Compare local transport options in {plan.destination} to keep daily commute within ₹400
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {transports.map((item, idx) => (
              <TransportCard
                key={item.id || idx}
                transport={item}
                onSelect={(t) => alert(`Selected ${t.name} transit!`)}
              />
            ))}
          </div>
        </section>

        {/* 6. BUDGET SAVING TIPS */}
        <section>
          <BudgetTipsCard tips={savingTips} />
        </section>

      </div>

      {/* MODALS */}
      <ShareTripModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        trip={plan}
      />

      <AddActivityModal
        isOpen={addActModal.isOpen}
        dayNumber={addActModal.dayNumber}
        onClose={() => setAddActModal({ isOpen: false, dayNumber: 1 })}
        onAdd={handleAddActivity}
      />

      <MapModal
        isOpen={mapModal.isOpen}
        day={mapModal.day}
        destinationName={plan.destination}
        onClose={() => setMapModal({ isOpen: false, day: null })}
      />

    </div>
  );
}
