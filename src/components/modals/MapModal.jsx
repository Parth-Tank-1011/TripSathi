import React, { useState } from "react";
import { X, MapPin, Navigation, Compass, Layers, Info } from "lucide-react";

export default function MapModal({ isOpen, onClose, day, destinationName = "Goa" }) {
  const [selectedStopIndex, setSelectedStopIndex] = useState(0);

  if (!isOpen || !day) return null;

  const stops = day.activities || [];
  const selectedStop = stops[selectedStopIndex] || stops[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-4xl w-full h-[85vh] max-h-[750px] shadow-2xl border border-stone-200 overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 md:px-6 py-4 border-b border-stone-200/80 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black">
              Day {day.dayNumber}
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-900">
                Route Map: {day.title}
              </h3>
              <p className="text-xs text-stone-500">
                {stops.length} planned locations in {destinationName} • Optimized for low transit cost
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Left Interactive Stops list, Right Visual Map */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          
          {/* Stops List (Left 5 cols) */}
          <div className="md:col-span-5 border-r border-stone-200 overflow-y-auto p-4 space-y-2.5 bg-stone-50/50">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block px-1">
              Sequence of Stops
            </span>

            {stops.map((stop, idx) => (
              <div
                key={stop.id || idx}
                onClick={() => setSelectedStopIndex(idx)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                  selectedStopIndex === idx
                    ? "bg-white border-teal-500 shadow-md ring-1 ring-teal-500/20"
                    : "bg-white/80 border-stone-200/70 hover:bg-white hover:border-stone-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      selectedStopIndex === idx
                        ? "bg-teal-600 text-white"
                        : "bg-stone-100 text-stone-700"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-teal-800">
                        {stop.time}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        {stop.travelTime}
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-900 truncate">
                      {stop.place}
                    </h5>
                    <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                      {stop.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Visual Map Simulator (Right 7 cols) */}
          <div className="md:col-span-7 bg-[#E5E9E7] relative overflow-hidden flex flex-col justify-between p-6">
            
            {/* Map styling patterns simulating roads & coastal geometry */}
            <div className="absolute inset-0 opacity-25 pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Simulated winding road */}
                <path
                  d="M 50 100 Q 150 250 250 180 T 450 300 T 600 450"
                  fill="none"
                  stroke="#0d9488"
                  strokeWidth="6"
                  strokeDasharray="8 6"
                />
              </svg>
            </div>

            {/* Map Controls */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-bold text-slate-800 shadow-sm flex items-center gap-2">
                <Compass className="w-4 h-4 text-teal-600 animate-spin-slow" />
                <span>Simulated GPS Route: {destinationName}</span>
              </div>

              <div className="bg-white/90 backdrop-blur-md p-1 rounded-xl border border-stone-200 shadow-sm flex gap-1 text-xs">
                <button className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 font-bold">Road View</button>
                <button className="px-2.5 py-1 rounded-lg text-stone-600 hover:text-slate-900">Satellite</button>
              </div>
            </div>

            {/* Map Stop Pins Floating */}
            <div className="relative z-10 my-auto py-10 flex flex-wrap items-center justify-around gap-6">
              {stops.map((stop, idx) => (
                <div
                  key={stop.id || idx}
                  onClick={() => setSelectedStopIndex(idx)}
                  className={`flex flex-col items-center cursor-pointer transition-transform ${
                    selectedStopIndex === idx ? "scale-125 z-20" : "scale-100 opacity-90 hover:scale-110"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full shadow-lg flex items-center justify-center font-bold text-xs border-2 border-white ${
                      selectedStopIndex === idx
                        ? "bg-rose-500 text-white ring-4 ring-rose-200"
                        : "bg-teal-600 text-white"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span className="mt-1 text-[10px] font-bold bg-white/90 px-2 py-0.5 rounded-md shadow-xs text-slate-800 max-w-[100px] truncate text-center">
                    {stop.place.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>

            {/* Selected Stop Focus Card */}
            {selectedStop && (
              <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-stone-200/90 shadow-xl">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-extrabold text-teal-700 uppercase tracking-wider">
                      Selected Pin #{selectedStopIndex + 1} • {selectedStop.time}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                      {selectedStop.place}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 line-clamp-1">
                      {selectedStop.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-slate-900">
                      {selectedStop.cost > 0 ? `₹${selectedStop.cost}` : "Free Entry"}
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
