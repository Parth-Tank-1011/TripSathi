import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Luggage,
  Plus,
  ArrowRight,
  Trash2,
  Edit
} from "lucide-react";
import { useTrip } from "../context/TripContext";

export default function MyTripsPage() {
  const navigate = useNavigate();
  const { savedTrips, deleteSavedTrip, setCurrentPlan } = useTrip();

  const handleViewTrip = (trip) => {
    setCurrentPlan(trip);
    navigate(`/my-trips/${trip.id}`);
  };

  const handleEditTrip = (trip) => {
    setCurrentPlan(trip);
    navigate(`/planner?step=1`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-10">
      
      {/* Header & "+ Plan New Trip" CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold mb-2">
            <Luggage className="w-3.5 h-3.5 text-teal-600" />
            <span>Traveler Dashboard</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            My Saved Trips
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Access your custom itineraries, budgets, and saved bookings
          </p>
        </div>

        <Link
          to="/planner"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm shadow-md shadow-teal-600/20 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Plan New Trip</span>
        </Link>
      </div>

      {/* Trips Grid */}
      {savedTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {savedTrips.map((trip) => {
            const isUpcoming = trip.status === "Upcoming";

            return (
              <div
                key={trip.id}
                className="group bg-white rounded-3xl border border-stone-200/90 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Trip Card Hero Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                    <img
                      src={trip.image || "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop"}
                      alt={trip.destination}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-sm ${
                          isUpcoming
                            ? "bg-teal-500 text-white"
                            : "bg-stone-800/80 text-stone-200"
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-white" />
                        {trip.status || "Upcoming"}
                      </span>
                    </div>

                    {/* Title & Dates */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="text-2xl font-black text-white drop-shadow-sm">
                        {trip.destination}
                      </h3>
                      <p className="text-xs text-stone-200">
                        {trip.dates || `${trip.days} Days Vacation`}
                      </p>
                    </div>
                  </div>

                  {/* Trip Specs: Days, Budget, Travelers */}
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-3 gap-2 py-3 bg-stone-50 rounded-2xl border border-stone-200/60 text-center">
                      <div>
                        <span className="text-[10px] text-stone-400 font-semibold uppercase block">
                          Duration
                        </span>
                        <span className="text-sm font-black text-slate-800">
                          {trip.days} Days
                        </span>
                      </div>

                      <div className="border-x border-stone-200">
                        <span className="text-[10px] text-stone-400 font-semibold uppercase block">
                          Travelers
                        </span>
                        <span className="text-sm font-black text-slate-800">
                          {trip.travelers} People
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-stone-400 font-semibold uppercase block">
                          Budget
                        </span>
                        <span className="text-sm font-black text-teal-800">
                          ₹{(trip.budget || 20000).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {/* Cost utilization pill */}
                    {trip.estimatedCost && (
                      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
                        <span>Est. Cost: <strong className="text-slate-800">₹{trip.estimatedCost.toLocaleString("en-IN")}</strong></span>
                        <span className="text-emerald-700 font-bold">₹{trip.remainingBudget?.toLocaleString("en-IN")} buffer</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions: View Trip, Edit, Delete */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    
                    <button
                      type="button"
                      onClick={() => handleViewTrip(trip)}
                      className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
                    >
                      <span>View Trip</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleEditTrip(trip)}
                      className="p-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 hover:text-slate-900 transition-colors"
                      title="Edit Trip"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete the ${trip.destination} trip?`)) {
                          deleteSavedTrip(trip.id);
                        }
                      }}
                      className="p-2.5 rounded-xl border border-stone-200 hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors"
                      title="Delete Trip"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-stone-200">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
            <Luggage className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-slate-900">
            No saved trips yet
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Ready to plan your first budget adventure? Enter where you want to go and how much you can spend.
          </p>
          <Link
            to="/planner"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-bold text-xs shadow-md shadow-teal-600/20"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Plan My First Trip</span>
          </Link>
        </div>
      )}

    </div>
  );
}
