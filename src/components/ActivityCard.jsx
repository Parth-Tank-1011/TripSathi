import React from "react";
import {
  Clock,
  MapPin,
  Compass,
  Utensils,
  Landmark,
  Palmtree,
  Moon,
  Coffee,
  ShoppingBag,
  Train,
  Bed,
  Sunset,
  Camera,
  Music,
  Trash2,
  Info
} from "lucide-react";

const ICON_MAP = {
  Clock,
  MapPin,
  Compass,
  Utensils,
  Landmark,
  Palmtree,
  Moon,
  Coffee,
  ShoppingBag,
  Train,
  Bed,
  Sunset,
  Camera,
  Music
};

export default function ActivityCard({
  activity,
  onDelete,
  onEdit
}) {
  const IconComponent = ICON_MAP[activity.icon] || MapPin;

  return (
    <div className="group relative bg-white rounded-2xl p-4 md:p-5 border border-stone-200/80 shadow-xs hover:shadow-md transition-all">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        
        {/* Left: Time badge & Activity Icon */}
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200/70 text-teal-700 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-xs">
            <IconComponent className="w-5 h-5" />
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold text-teal-800 bg-teal-100/70 px-2.5 py-0.5 rounded-md">
                {activity.time}
              </span>
              {activity.travelTime && (
                <span className="text-[11px] font-medium text-stone-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-stone-400" />
                  {activity.travelTime}
                </span>
              )}
              {activity.category && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                  {activity.category}
                </span>
              )}
            </div>

            <h4 className="text-base font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
              {activity.place}
            </h4>

            <p className="text-xs md:text-sm text-stone-600 leading-relaxed max-w-xl">
              {activity.description}
            </p>

            {activity.tips && (
              <div className="flex items-center gap-1.5 text-[11px] text-amber-800 bg-amber-50/80 px-2.5 py-1 rounded-lg border border-amber-200/50 mt-2">
                <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Tip: {activity.tips}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Estimated Cost & Actions */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
          <div className="text-right">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">
              Estimated Cost
            </span>
            <span className="text-sm md:text-base font-black text-slate-900">
              {activity.cost > 0 ? `₹${activity.cost.toLocaleString("en-IN")}` : "Free"}
            </span>
          </div>

          {onDelete && (
            <button
              onClick={() => onDelete(activity.id)}
              className="text-stone-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
              title="Remove activity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
