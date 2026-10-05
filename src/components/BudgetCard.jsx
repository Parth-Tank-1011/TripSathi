import React from "react";
import { Wallet, TrendingDown, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

export default function BudgetCard({
  totalBudget = 20000,
  estimatedCost = 17450,
  remainingBudget = 2550
}) {
  const percentUsed = Math.min(100, Math.round((estimatedCost / totalBudget) * 100));
  const isUnderBudget = remainingBudget > 0;
  const savingsPercent = Math.round((remainingBudget / totalBudget) * 100);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

      {/* Header & Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Trip Budget Health
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Budget Optimized
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Financial Summary
          </h2>
        </div>

        {/* Savings Badge */}
        {isUnderBudget && (
          <div className="flex items-center gap-2 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200/80 px-4 py-2.5 rounded-2xl">
            <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
            <div className="text-left">
              <span className="text-[11px] text-teal-800 font-semibold uppercase block">
                Estimated Surplus
              </span>
              <span className="text-sm font-extrabold text-teal-700">
                ₹{remainingBudget.toLocaleString("en-IN")} ({savingsPercent}% buffer)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Total Budget */}
        <div className="bg-stone-50/80 p-5 rounded-2xl border border-stone-200/60">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold mb-2">
            <span>Total Trip Budget</span>
            <Wallet className="w-4 h-4 text-stone-400" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-slate-900">
            ₹{totalBudget.toLocaleString("en-IN")}
          </div>
          <span className="text-[11px] text-stone-500 mt-1 block">
            Set by traveler
          </span>
        </div>

        {/* Estimated Cost */}
        <div className="bg-teal-50/60 p-5 rounded-2xl border border-teal-200/60">
          <div className="flex items-center justify-between text-teal-800 text-xs font-semibold mb-2">
            <span>Total Estimated Cost</span>
            <TrendingDown className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-teal-900">
            ₹{estimatedCost.toLocaleString("en-IN")}
          </div>
          <span className="text-[11px] text-teal-700 font-medium mt-1 block">
            {percentUsed}% of total budget used
          </span>
        </div>

        {/* Remaining Budget */}
        <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200/60">
          <div className="flex items-center justify-between text-emerald-800 text-xs font-semibold mb-2">
            <span>Remaining Budget</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-emerald-700">
            ₹{remainingBudget.toLocaleString("en-IN")}
          </div>
          <span className="text-[11px] text-emerald-700 font-medium mt-1 block">
            Available for shopping & emergency
          </span>
        </div>
      </div>

      {/* Visual Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-stone-600">
          <span>Budget Utilization ({percentUsed}%)</span>
          <span className="text-teal-700">₹{estimatedCost.toLocaleString("en-IN")} of ₹{totalBudget.toLocaleString("en-IN")}</span>
        </div>

        <div className="h-4 w-full bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200">
          <div
            className="h-full bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-500 rounded-full transition-all duration-1000 ease-out shadow-xs"
            style={{ width: `${percentUsed}%` }}
          />
        </div>

        <div className="flex justify-between text-[11px] text-stone-400">
          <span>₹0</span>
          <span>₹{(totalBudget / 2).toLocaleString("en-IN")} (50%)</span>
          <span>₹{totalBudget.toLocaleString("en-IN")} (100%)</span>
        </div>
      </div>
    </div>
  );
}
