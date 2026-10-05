import React from "react";
import { Bus, Bike, Car, Check, ShieldCheck, Sparkles, Navigation } from "lucide-react";

const MODE_ICONS = {
  Bus: Bus,
  Scooter: Bike,
  Bike: Bike,
  Taxi: Car,
  Cab: Car,
  Auto: Navigation
};

export default function TransportCard({ transport, onSelect, isSelected }) {
  const IconComponent = MODE_ICONS[transport.mode] || Car;

  return (
    <div
      className={`relative bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
        transport.recommended
          ? "border-teal-500 ring-2 ring-teal-500/20 shadow-md bg-gradient-to-b from-teal-50/30 to-white"
          : "border-stone-200/90 shadow-xs hover:border-stone-300"
      }`}
    >
      {/* Recommended Highlight Badge */}
      {transport.recommended && (
        <div className="absolute -top-3 left-6 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-600 text-white text-xs font-black uppercase tracking-wider shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{transport.recommendedBadge || "Best for your budget"}</span>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4 mt-1">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                transport.recommended
                  ? "bg-teal-600 text-white shadow-md shadow-teal-600/20"
                  : "bg-stone-100 text-stone-700"
              }`}
            >
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">{transport.name}</h4>
              <span className="text-xs text-stone-500">{transport.mode} Transit</span>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/60 mb-4">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">
              ₹{transport.dailyCost.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-stone-500 font-medium">
              /{transport.unit || "day"}
            </span>
          </div>
          {transport.totalCost && (
            <span className="text-[11px] text-teal-800 font-semibold block mt-0.5">
              Approx. ₹{transport.totalCost.toLocaleString("en-IN")} for entire trip
            </span>
          )}
        </div>

        {/* Pros / Highlights */}
        {transport.pros && (
          <ul className="space-y-1.5 text-xs text-stone-600 mb-4">
            {transport.pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="button"
        onClick={() => {
          if (onSelect) onSelect(transport);
          else alert(`Selected ${transport.name} as preferred transit`);
        }}
        className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
          transport.recommended
            ? "bg-teal-600 hover:bg-teal-700 text-white shadow-xs"
            : "bg-stone-100 hover:bg-teal-50 text-stone-700 hover:text-teal-800 border border-stone-200"
        }`}
      >
        {transport.recommended ? "Recommended Choice" : "Select Option"}
      </button>
    </div>
  );
}
