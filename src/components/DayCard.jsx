import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  PlusCircle,
  Edit3,
  Calendar,
  Sparkles,
  Map
} from "lucide-react";
import ActivityCard from "./ActivityCard";

export default function DayCard({
  day,
  isDefaultExpanded = true,
  onOpenMap,
  onAddActivity,
  onDeleteActivity
}) {
  const [isExpanded, setIsExpanded] = useState(isDefaultExpanded);

  const totalDayCost = (day.activities || []).reduce((acc, act) => acc + (Number(act.cost) || 0), 0);

  return (
    <div className="bg-stone-50/70 rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs hover:border-stone-300 transition-all">
      {/* Day Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-5 md:p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none transition-colors hover:bg-stone-50/50"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex flex-col items-center justify-center font-black shadow-md shadow-teal-600/20 shrink-0">
            <span className="text-[10px] uppercase tracking-wider font-semibold opacity-80">Day</span>
            <span className="text-xl leading-none">{day.dayNumber}</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">
                {day.title}
              </h3>
            </div>
            <p className="text-xs md:text-sm text-stone-500 mt-0.5 line-clamp-1">
              {day.subtitle}
            </p>
          </div>
        </div>

        {/* Quick Day Stats & Expand/Collapse Toggle */}
        <div className="flex items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-stone-100">
          <div className="text-left md:text-right">
            <span className="text-[10px] text-stone-400 font-semibold uppercase block">
              Day Est. Expenses
            </span>
            <span className="text-base font-extrabold text-teal-800">
              ₹{totalDayCost.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full hidden sm:inline-block">
              {day.activities?.length || 0} stops
            </span>

            <button
              type="button"
              className="p-2 rounded-xl bg-stone-100 text-stone-600 hover:bg-teal-50 hover:text-teal-700 transition-colors"
              aria-label={isExpanded ? "Collapse Day" : "Expand Day"}
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Content with Action Toolbar and Timeline */}
      {isExpanded && (
        <div className="p-5 md:p-6 space-y-5 border-t border-stone-100">
          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200/70">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-600">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>Full Schedule ({day.activities?.length || 0} Planned Activities)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenMap && onOpenMap(day)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-teal-50 hover:border-teal-300 text-stone-700 hover:text-teal-800 text-xs font-bold transition-all shadow-2xs"
              >
                <Map className="w-3.5 h-3.5 text-teal-600" />
                <span>View on Map</span>
              </button>

              <button
                type="button"
                onClick={() => onAddActivity && onAddActivity(day.dayNumber)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-2xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Activity</span>
              </button>
            </div>
          </div>

          {/* Activities List */}
          <div className="relative pl-6 md:pl-8 space-y-4 before:absolute before:left-3 md:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-teal-200">
            {(day.activities || []).map((act, idx) => (
              <div key={act.id || idx} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-6 md:-left-8 top-5 w-3.5 h-3.5 rounded-full bg-white border-3 border-teal-600 shadow-xs" />
                <ActivityCard
                  activity={act}
                  onDelete={onDeleteActivity}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
