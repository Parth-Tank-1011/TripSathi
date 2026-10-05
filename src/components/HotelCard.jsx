import React from "react";
import { Star, MapPin, Check, ExternalLink, Sparkles, Building2 } from "lucide-react";

export default function HotelCard({
  hotel,
  onSelect,
  isSelected = false
}) {
  return (
    <div
      className={`group bg-white rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
        isSelected
          ? "border-teal-500 ring-2 ring-teal-500/20 shadow-lg"
          : "border-stone-200/80 hover:border-teal-300 hover:shadow-lg shadow-xs"
      }`}
    >
      <div>
        {/* Hotel Image Container */}
        <div className="relative h-48 w-full overflow-hidden bg-stone-100">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badge (e.g. Best Value, Top Rated, Comfort Pick) */}
          {hotel.badge && (
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-teal-600 text-white text-xs font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{hotel.badge}</span>
            </div>
          )}

          {/* Rating */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-300" />
            <span>{hotel.rating}</span>
            <span className="text-[10px] text-stone-300 font-normal">
              ({hotel.reviewsCount || 480})
            </span>
          </div>

          <div className="absolute bottom-3 left-3 text-white">
            <span className="text-[11px] font-semibold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md">
              {hotel.type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <h4 className="text-lg font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
            {hotel.name}
          </h4>

          <div className="space-y-1 text-xs text-stone-500">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>{hotel.location}</span>
            </div>
            {hotel.distanceFromAttraction && (
              <p className="text-teal-700 font-medium pl-5">
                • {hotel.distanceFromAttraction}
              </p>
            )}
          </div>

          {/* Amenities Chips */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {(hotel.amenities || []).slice(0, 4).map((amenity, i) => (
              <span
                key={i}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 flex items-center gap-1"
              >
                <Check className="w-3 h-3 text-teal-600" />
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="p-5 pt-0 mt-2">
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between mb-3">
          <div>
            <span className="text-[10px] text-stone-400 font-semibold uppercase block">
              Per Night
            </span>
            <span className="text-lg font-extrabold text-teal-800">
              ₹{hotel.pricePerNight.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-stone-400 font-semibold uppercase block">
              Total Stay Cost
            </span>
            <span className="text-sm font-extrabold text-slate-800">
              ₹{(hotel.totalCost || hotel.pricePerNight * 4).toLocaleString("en-IN")} total
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            if (onSelect) onSelect(hotel);
            else alert(`Selected ${hotel.name} for your trip plan!`);
          }}
          className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 ${
            isSelected
              ? "bg-teal-700 text-white"
              : "bg-teal-50 text-teal-800 hover:bg-teal-600 hover:text-white border border-teal-200/80"
          }`}
        >
          <span>{isSelected ? "Selected Stay" : "View Stay"}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
