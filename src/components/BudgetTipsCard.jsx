import React from "react";
import { useNavigate } from "react-router-dom";
import { Lightbulb, PiggyBank, ArrowRight } from "lucide-react";

export default function BudgetTipsCard({ tips = [] }) {
  const navigate = useNavigate();
  const defaultTips = [
    {
      id: "tip1",
      title: "Stay in a verified social hostel / homestay instead of a hotel",
      description: "Book social backpacker hostels or Portuguese homestays in Anjuna or Candolim. Includes free WiFi and communal breakfast.",
      savingsAmount: 1500,
      savingsLabel: "Save approximately ₹1,500"
    },
    {
      id: "tip2",
      title: "Use local buses & rental scooter for local transit",
      description: "Airport taxis charge steep private tariffs. Use electric shuttle buses or a ₹400/day scooter for freedom.",
      savingsAmount: 800,
      savingsLabel: "Save approximately ₹800"
    },
    {
      id: "tip3",
      title: "Try authentic local restaurants & thali bars",
      description: "Local joints located 300m inland offer authentic Goan seafood & veg thalis at 1/3rd the price of tourist beach shacks.",
      savingsAmount: 600,
      savingsLabel: "Save approximately ₹600"
    }
  ];

  const displayTips = tips.length > 0 ? tips : defaultTips;
  const totalPotentialSavings = displayTips.reduce((sum, t) => sum + (t.savingsAmount || 600), 0);

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-teal-500/5 to-white rounded-3xl p-6 md:p-8 border border-amber-300/60 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>Smart Money Hacks</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Save More on This Trip
          </h3>
          <p className="text-xs text-stone-600 mt-0.5">
            Practical, zero-sacrifice insider tips curated by experienced Indian backpackers
          </p>
        </div>

        {/* Total Potential Saving Banner */}
        <div className="bg-white px-5 py-3 rounded-2xl border border-amber-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
            <PiggyBank className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-stone-500 uppercase font-semibold block">
              Total Potential Extra Savings
            </span>
            <span className="text-xl font-black text-amber-700">
              ₹{totalPotentialSavings.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* Tips Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {displayTips.map((tip, idx) => (
          <div
            key={tip.id || idx}
            className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl">💡</span>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
                  {tip.savingsLabel || `Save approx ₹${tip.savingsAmount}`}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug">
                {tip.title}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {tip.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/planner?step=3")}
              className="w-full pt-3 mt-3 border-t border-stone-100 flex items-center text-xs font-bold text-teal-700 hover:text-teal-900 cursor-pointer"
            >
              <span>Apply this hack</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
