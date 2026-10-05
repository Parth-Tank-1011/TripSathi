import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Wallet,
  Share2,
  Download,
  Edit3,
  CheckSquare,
  Square,
  Trash2,
  Hotel,
  FileText,
  Save
} from "lucide-react";
import { useTrip } from "../context/TripContext";
import BudgetCard from "../components/BudgetCard";
import BudgetBreakdown from "../components/BudgetBreakdown";
import ItineraryTimeline from "../components/ItineraryTimeline";
import HotelCard from "../components/HotelCard";
import FoodCard from "../components/FoodCard";
import TransportCard from "../components/TransportCard";
import ShareTripModal from "../components/modals/ShareTripModal";
import AddActivityModal from "../components/modals/AddActivityModal";
import MapModal from "../components/modals/MapModal";

export default function TripDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { savedTrips, updateSavedTrip, setCurrentPlan, loadTripIntoPlanner } = useTrip();

  // Find trip
  const trip = savedTrips.find((t) => t.id === id) || savedTrips[0];

  const [activeTab, setActiveTab] = useState("itinerary"); // itinerary | stays | budget | notes
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [addActModal, setAddActModal] = useState({ isOpen: false, dayNumber: 1 });
  const [mapModal, setMapModal] = useState({ isOpen: false, day: null });
  const [saveToast, setSaveToast] = useState(false);

  // Editable notes state
  const [notes, setNotes] = useState(trip?.notes || [
    "Book scooter rental right at the station",
    "Carry student ID card for fort entry discounts",
    "Download offline map for beach trails"
  ]);
  const [newNote, setNewNote] = useState("");

  // Editable checklist state
  const [checklist, setChecklist] = useState(trip?.checklist || [
    { id: "c1", text: "Identity documents (Aadhaar / Driving License)", done: true },
    { id: "c2", text: "Comfortable beachwear & sunscreen SPF 50", done: true },
    { id: "c3", text: "Power bank and extra cables", done: false },
    { id: "c4", text: "Cash reserve (₹2,000 in ₹100 notes for street stalls)", done: false }
  ]);
  const [newItem, setNewItem] = useState("");

  if (!trip) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Trip not found</h2>
        <Link to="/my-trips" className="text-teal-600 font-bold underline">
          Back to My Trips
        </Link>
      </div>
    );
  }

  const handleSaveChanges = () => {
    updateSavedTrip(trip.id, {
      notes,
      checklist
    });
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  // Load this trip's data into the planner so "Edit Trip" continues this trip.
  const handleEditTrip = () => {
    setCurrentPlan(trip);
    loadTripIntoPlanner(trip);
    navigate("/planner?step=1");
  };

  const handleDownloadItinerary = () => {
    let content = `TripSathi Detailed Itinerary: ${trip.destination}\n`;
    content += `Days: ${trip.days} | Travelers: ${trip.travelers} | Budget: ₹${trip.budget}\n`;
    content += `Estimated Cost: ₹${trip.estimatedCost}\n\n`;

    content += "--- NOTES ---\n";
    notes.forEach((n, i) => { content += `${i + 1}. ${n}\n`; });
    content += "\n--- PACKING CHECKLIST ---\n";
    checklist.forEach((c) => { content += `[${c.done ? "X" : " "}] ${c.text}\n`; });
    content += "\n--- DAILY SCHEDULE ---\n";

    (trip.itinerary || []).forEach((d) => {
      content += `=== DAY ${d.dayNumber}: ${d.title} ===\n`;
      (d.activities || []).forEach((a) => {
        content += `  [${a.time}] ${a.place} - ₹${a.cost}\n    ${a.description}\n`;
      });
      content += "\n";
    });

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `TripSathi-${trip.destination}-Complete-Plan.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([...notes, newNote.trim()]);
    setNewNote("");
  };

  const handleDeleteNote = (idx) => {
    setNotes(notes.filter((_, i) => i !== idx));
  };

  const toggleChecklist = (checkId) => {
    setChecklist(
      checklist.map((item) =>
        item.id === checkId ? { ...item, done: !item.done } : item
      )
    );
  };

  const handleAddChecklist = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    setChecklist([...checklist, { id: `item-${Date.now()}`, text: newItem.trim(), done: false }]);
    setNewItem("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-10">
      
      {/* Top Navigation Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <Link
          to="/my-trips"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-teal-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Trips</span>
        </Link>

        {/* Action Buttons Toolbar: Edit Trip, Save Changes, Share Trip, Download Itinerary */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleSaveChanges}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saveToast ? "Saved Changes!" : "Save Changes"}</span>
          </button>

          <button
            type="button"
            onClick={handleEditTrip}
            className="px-4 py-2 border border-stone-200 hover:bg-stone-50 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
          >
            <Edit3 className="w-3.5 h-3.5 text-stone-500" />
            <span>Edit Trip</span>
          </button>

          <button
            type="button"
            onClick={() => setShareModalOpen(true)}
            className="px-4 py-2 border border-stone-200 hover:bg-stone-50 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
          >
            <Share2 className="w-3.5 h-3.5 text-stone-500" />
            <span>Share Trip</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadItinerary}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Itinerary</span>
          </button>
        </div>
      </div>

      {/* Hero Trip Summary Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md">
              {trip.status || "Upcoming"}
            </span>
            <span className="text-xs text-stone-400">•</span>
            <span className="text-xs font-semibold text-stone-500">
              Trip ID: #{trip.id}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            {trip.destination} Detailed Plan
          </h1>

          <p className="text-sm md:text-base text-stone-600 font-semibold flex flex-wrap items-center gap-2">
            <span>{trip.days} Days</span>
            <span>•</span>
            <span>{trip.travelers} Travelers</span>
            <span>•</span>
            <span className="text-teal-700">₹{(trip.budget || 20000).toLocaleString("en-IN")} Total Budget</span>
          </p>
        </div>

        {/* Quick financial pill */}
        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/60 flex items-center gap-4 text-center">
          <div>
            <span className="text-[10px] text-stone-400 font-semibold uppercase block">Estimated</span>
            <span className="text-lg font-black text-slate-900">₹{(trip.estimatedCost || 17450).toLocaleString("en-IN")}</span>
          </div>
          <div className="h-8 w-px bg-stone-200" />
          <div>
            <span className="text-[10px] text-stone-400 font-semibold uppercase block">Remaining</span>
            <span className="text-lg font-black text-emerald-700">₹{(trip.remainingBudget || 2550).toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto">
        {[
          { id: "itinerary", label: "Itinerary Timeline", icon: Calendar },
          { id: "budget", label: "Budget & Costs", icon: Wallet },
          { id: "stays", label: "Stays & Food", icon: Hotel },
          { id: "notes", label: "Notes & Packing", icon: FileText }
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
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: ITINERARY */}
      {activeTab === "itinerary" && (
        <div className="space-y-6">
          <ItineraryTimeline
            itinerary={trip.itinerary || []}
            onOpenMap={(day) => setMapModal({ isOpen: true, day })}
            onAddActivity={(dayNum) => setAddActModal({ isOpen: true, dayNumber: dayNum })}
            onDeleteActivity={(actId) => {
              const updatedItinerary = (trip.itinerary || []).map((day) => ({
                ...day,
                activities: (day.activities || []).filter((a) => a.id !== actId)
              }));
              updateSavedTrip(trip.id, { itinerary: updatedItinerary });
            }}
          />
        </div>
      )}

      {/* TAB CONTENT: BUDGET */}
      {activeTab === "budget" && (
        <div className="space-y-8">
          <BudgetCard
            totalBudget={trip.budget || 20000}
            estimatedCost={trip.estimatedCost || 17450}
            remainingBudget={trip.remainingBudget || 2550}
          />

          <BudgetBreakdown
            breakdown={trip.budgetBreakdown}
            totalBudget={trip.budget || 20000}
          />

          {/* Interactive Trip Expense Logger */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-200/90 shadow-xs space-y-4">
            <h3 className="text-xl font-black text-slate-900">
              Live Expense Tracker (During Vacation)
            </h3>
            <p className="text-xs text-stone-500">
              Keep track of actual rupee spends while on the road to ensure you don't breach your remaining ₹{(trip.remainingBudget || 2550).toLocaleString("en-IN")} buffer
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-500 font-semibold block">Spent So Far</span>
                <span className="text-2xl font-black text-slate-900">₹0</span>
                <span className="text-[10px] text-stone-400 block mt-1">Trip starts soon</span>
              </div>
              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200">
                <span className="text-xs text-teal-800 font-semibold block">Budget Remaining</span>
                <span className="text-2xl font-black text-teal-900">₹{(trip.budget || 20000).toLocaleString("en-IN")}</span>
                <span className="text-[10px] text-teal-700 block mt-1">100% untouched</span>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs text-emerald-800 font-semibold block">Daily Allowance</span>
                <span className="text-2xl font-black text-emerald-900">₹{Math.round((trip.budget || 20000) / (trip.days || 5)).toLocaleString("en-IN")}</span>
                <span className="text-[10px] text-emerald-700 block mt-1">per day for group</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: STAYS & FOOD */}
      {activeTab === "stays" && (
        <div className="space-y-10">
          {/* Stays */}
          <section className="space-y-4">
            <h3 className="text-2xl font-black text-slate-900">Accommodations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(trip.accommodations || []).map((hotel, i) => (
                <HotelCard key={i} hotel={hotel} isSelected={i === 0} />
              ))}
            </div>
          </section>

          {/* Food */}
          <section className="space-y-4">
            <h3 className="text-2xl font-black text-slate-900">Local Food & Cafes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(trip.restaurants || []).map((rest, i) => (
                <FoodCard key={i} restaurant={rest} />
              ))}
            </div>
          </section>

          {/* Transports */}
          <section className="space-y-4">
            <h3 className="text-2xl font-black text-slate-900">Transportation Modes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(trip.transportation || []).map((t, i) => (
                <TransportCard key={i} transport={t} />
              ))}
            </div>
          </section>
        </div>
      )}

      {/* TAB CONTENT: NOTES & PACKING */}
      {activeTab === "notes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Travel Notes */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-200/90 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Trip Notes & Reminders</h3>
                <p className="text-xs text-stone-500">Local contacts, train coaches, and advice</p>
              </div>
              <span className="text-xs font-bold text-stone-400">{notes.length} notes</span>
            </div>

            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a new note..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:border-teal-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shrink-0"
              >
                Add Note
              </button>
            </form>

            <ul className="space-y-2.5">
              {notes.map((note, i) => (
                <li
                  key={i}
                  className="flex items-start justify-between gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700"
                >
                  <span className="leading-relaxed">• {note}</span>
                  <button
                    onClick={() => handleDeleteNote(i)}
                    className="text-stone-400 hover:text-red-500 transition-colors shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Packing Checklist */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-200/90 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Packing Checklist</h3>
                <p className="text-xs text-stone-500">Tick items as you pack your bags</p>
              </div>
              <span className="text-xs font-bold text-teal-700">
                {checklist.filter((c) => c.done).length}/{checklist.length} packed
              </span>
            </div>

            <form onSubmit={handleAddChecklist} className="flex gap-2">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add packing item..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:border-teal-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shrink-0"
              >
                Add Item
              </button>
            </form>

            <ul className="space-y-2">
              {checklist.map((item) => (
                <li
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    item.done
                      ? "bg-teal-50/50 border-teal-200 text-stone-400 line-through"
                      : "bg-white border-stone-200 text-slate-800 hover:bg-stone-50"
                  }`}
                >
                  {item.done ? (
                    <CheckSquare className="w-4 h-4 text-teal-600 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                  <span className="text-xs font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}

      {/* MODALS */}
      <ShareTripModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        trip={trip}
      />

      <AddActivityModal
        isOpen={addActModal.isOpen}
        dayNumber={addActModal.dayNumber}
        onClose={() => setAddActModal({ isOpen: false, dayNumber: 1 })}
        onAdd={(newAct) => {
          const updatedItinerary = (trip.itinerary || []).map((day) => {
            if (day.dayNumber === addActModal.dayNumber) {
              return {
                ...day,
                activities: [...(day.activities || []), newAct]
              };
            }
            return day;
          });
          updateSavedTrip(trip.id, { itinerary: updatedItinerary });
        }}
      />

      <MapModal
        isOpen={mapModal.isOpen}
        day={mapModal.day}
        destinationName={trip.destination}
        onClose={() => setMapModal({ isOpen: false, day: null })}
      />

    </div>
  );
}
