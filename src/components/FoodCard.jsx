import React from "react";
import { Star, MapPin, Utensils, Info } from "lucide-react";

export default function FoodCard({ restaurant, onSelect }) {
  return (
    <div className="group bg-white rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-lg hover:border-teal-300 transition-all duration-300 overflow-hidden flex flex-col justify-between">
      <div>
        {/* Food Image */}
        <div className="relative h-44 w-full overflow-hidden bg-stone-100">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Veg / Non-Veg Indicator Badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-xs ${
                restaurant.isPureVeg
                  ? "bg-emerald-600 text-white"
                  : "bg-amber-600 text-white"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${restaurant.isPureVeg ? "bg-white" : "bg-white"}`} />
              {restaurant.vegBadge || (restaurant.isPureVeg ? "Pure Veg" : "Veg & Non-Veg")}
            </span>
          </div>

          {/* Rating */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-300" />
            <span>{restaurant.rating}</span>
            <span className="text-[10px] text-stone-300 font-normal">
              ({restaurant.reviewsCount})
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="text-lg font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                {restaurant.name}
              </h4>
              <p className="text-xs font-medium text-stone-500 mt-0.5">
                {restaurant.cuisine}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>{restaurant.distance}</span>
          </div>

          {/* Specialties */}
          {restaurant.specialties && (
            <div className="pt-2">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
                Must Try Dishes:
              </span>
              <div className="flex flex-wrap gap-1">
                {restaurant.specialties.map((dish, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium"
                  >
                    {dish}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Budget tip */}
          {restaurant.budgetTip && (
            <div className="text-[11px] text-teal-900 bg-teal-50/80 p-2.5 rounded-xl border border-teal-200/50 flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
              <span>{restaurant.budgetTip}</span>
            </div>
          )}
        </div>
      </div>

      {/* Pricing & Button */}
      <div className="p-5 pt-0">
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between mb-3">
          <div>
            <span className="text-[10px] text-stone-400 font-semibold uppercase block">
              Average Spend
            </span>
            <span className="text-sm font-extrabold text-teal-800">
              {restaurant.avgPricePerPerson}
            </span>
          </div>
          <span className="text-[11px] text-stone-400 font-medium">per person</span>
        </div>

        <button
          type="button"
          onClick={() => {
            if (onSelect) onSelect(restaurant);
            else alert(`Viewing details for ${restaurant.name}`);
          }}
          className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-teal-50 hover:text-teal-800 font-bold text-xs text-stone-700 transition-all border border-stone-200 hover:border-teal-300"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
