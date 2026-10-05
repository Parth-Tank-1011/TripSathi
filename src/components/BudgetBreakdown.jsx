import React from "react";
import { Train, Hotel, Utensils, Ticket, ShieldAlert } from "lucide-react";

export default function BudgetBreakdown({
  breakdown = {
    travel: 4500,
    stay: 4000,
    food: 3500,
    activities: 4000,
    misc: 1450
  },
  totalBudget = 20000
}) {
  const items = [
    {
      id: "travel",
      label: "Travel & Transit",
      shortLabel: "Travel",
      amount: breakdown.travel || 4500,
      icon: Train,
      color: "bg-blue-500",
      textColor: "text-blue-700",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      emoji: "🚆"
    },
    {
      id: "stay",
      label: "Accommodation",
      shortLabel: "Stay",
      amount: breakdown.stay || 4000,
      icon: Hotel,
      color: "bg-teal-500",
      textColor: "text-teal-700",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      emoji: "🏨"
    },
    {
      id: "food",
      label: "Food & Dining",
      shortLabel: "Food",
      amount: breakdown.food || 3500,
      icon: Utensils,
      color: "bg-amber-500",
      textColor: "text-amber-700",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      emoji: "🍛"
    },
    {
      id: "activities",
      label: "Activities & Sightseeing",
      shortLabel: "Activities",
      amount: breakdown.activities || 4000,
      icon: Ticket,
      color: "bg-purple-500",
      textColor: "text-purple-700",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      emoji: "🎟"
    },
    {
      id: "misc",
      label: "Contingency & Misc",
      shortLabel: "Miscellaneous",
      amount: breakdown.misc || 1450,
      icon: ShieldAlert,
      color: "bg-stone-500",
      textColor: "text-stone-700",
      bgColor: "bg-stone-100",
      borderColor: "border-stone-300",
      emoji: "💰"
    }
  ];

  const totalSpent = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Expense Allocation Breakdown
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Transparent distribution across essential vacation categories
          </p>
        </div>
        <div className="text-sm font-bold text-slate-800 bg-stone-100 px-3.5 py-1.5 rounded-full self-start sm:self-auto">
          Allocated: <span className="text-teal-700 font-black">₹{totalSpent.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* Segmented Horizontal Progress Bar */}
      <div className="h-4.5 w-full bg-stone-100 rounded-full overflow-hidden flex p-0.5 border border-stone-200 shadow-inner">
        {items.map((item) => {
          const widthPercent = totalSpent > 0 ? (item.amount / totalSpent) * 100 : 20;
          return (
            <div
              key={item.id}
              className={`${item.color} h-full transition-all duration-700 first:rounded-l-full last:rounded-r-full hover:opacity-90`}
              style={{ width: `${widthPercent}%` }}
              title={`${item.shortLabel}: ₹${item.amount.toLocaleString("en-IN")} (${Math.round(widthPercent)}%)`}
            />
          );
        })}
      </div>

      {/* Category Cards / Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {items.map((item) => {
          const percentage = totalSpent > 0 ? Math.round((item.amount / totalSpent) * 100) : 0;
          return (
            <div
              key={item.id}
              className={`${item.bgColor} border ${item.borderColor} p-3.5 rounded-2xl flex flex-col justify-between transition-transform hover:-translate-y-0.5`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg">{item.emoji}</span>
                <span className="text-[10px] font-bold text-stone-500 bg-white/70 px-1.5 py-0.5 rounded-md">
                  {percentage}%
                </span>
              </div>
              <div>
                <span className="text-xs font-semibold text-stone-600 block truncate">
                  {item.shortLabel}
                </span>
                <span className={`text-base font-extrabold ${item.textColor} tracking-tight`}>
                  ₹{item.amount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
