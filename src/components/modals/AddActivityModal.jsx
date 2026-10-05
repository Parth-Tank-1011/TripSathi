import React, { useState } from "react";
import { X, Plus, Clock, MapPin, IndianRupee, Tag } from "lucide-react";

export default function AddActivityModal({
  isOpen,
  dayNumber,
  onClose,
  onAdd
}) {
  const [time, setTime] = useState("03:00 PM");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("200");
  const [travelTime, setTravelTime] = useState("15 mins");
  const [category, setCategory] = useState("Sightseeing");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!place.trim()) return;

    onAdd({
      id: `custom-act-${Date.now()}`,
      time,
      place,
      description: description || "Custom planned activity",
      cost: Number(cost) || 0,
      travelTime,
      category,
      icon: "Compass",
      tips: "Added to your custom itinerary"
    });

    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md">
            Day {dayNumber}
          </span>
          <h3 className="text-xl font-black text-slate-900 mt-1">
            Add Custom Activity
          </h3>
          <p className="text-xs text-stone-500">
            Include additional sightseeing, dining, or shopping stops to this day
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Time</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-teal-500"
                placeholder="e.g. 04:30 PM"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Estimated Cost (₹)</label>
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                required
                className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-teal-500"
                placeholder="0 for free"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Place / Activity Name</label>
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              required
              className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-teal-500"
              placeholder="e.g. Sunset Boat Cruise / Curlies Shack"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm bg-white focus:outline-hidden focus:border-teal-500"
            >
              <option value="Sightseeing">Sightseeing</option>
              <option value="Food">Food & Dining</option>
              <option value="Heritage">Heritage & Culture</option>
              <option value="Adventure">Adventure & Sports</option>
              <option value="Shopping">Shopping</option>
              <option value="Relaxation">Relaxation / Beach</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Short Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:border-teal-500"
              placeholder="Brief notes about this stop..."
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20"
            >
              Add to Itinerary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
