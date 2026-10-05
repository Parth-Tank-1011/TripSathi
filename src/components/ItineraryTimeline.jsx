import React, { useState } from "react";
import DayCard from "./DayCard";
import { Calendar, ChevronDown, ChevronUp, MapPin, Sparkles } from "lucide-react";

export default function ItineraryTimeline({
  itinerary = [],
  onOpenMap,
  onAddActivity,
  onDeleteActivity
}) {
  const [expandAll, setExpandAll] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Day-by-Day Itinerary</span>
            <span className="text-xs font-bold text-teal-700 bg-teal-100/70 px-2.5 py-0.5 rounded-full">
              {itinerary.length} Days Planned
            </span>
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Optimized route to minimize local travel time and avoid unnecessary tourist fees
          </p>
        </div>

        <button
          type="button"
          onClick={() => setExpandAll(!expandAll)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 bg-teal-50 px-3.5 py-2 rounded-xl border border-teal-200/60 self-start sm:self-auto transition-colors"
        >
          {expandAll ? (
            <>
              <ChevronUp className="w-4 h-4" />
              <span>Collapse All Days</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              <span>Expand All Days</span>
            </>
          )}
        </button>
      </div>

      {/* Days Stack */}
      <div className="space-y-4">
        {itinerary.map((day) => (
          <DayCard
            key={day.dayNumber}
            day={day}
            isDefaultExpanded={expandAll}
            onOpenMap={onOpenMap}
            onAddActivity={onAddActivity}
            onDeleteActivity={onDeleteActivity}
          />
        ))}
      </div>
    </div>
  );
}
