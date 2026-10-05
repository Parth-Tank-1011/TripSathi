import React from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  Heart,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  ArrowRight,
  CheckCircle2,
  Users,
  MapPin,
  Cpu
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      
      {/* Hero / Vision */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200/60">
          <Compass className="w-3.5 h-3.5 text-teal-600" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Plan more. Spend less. <br />
          <span className="text-teal-600">Travel better.</span>
        </h1>
        <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
          TripSathi was founded with a singular conviction: travel across incredible India shouldn't be an exclusive luxury reserved for wealthy tourists. Every student, family, and young professional deserves unforgettable vacations within their exact budget.
        </p>
      </div>

      {/* The Sathi Core Values */}
      <div id="transparency" className="grid grid-cols-1 md:grid-cols-3 gap-6 scroll-mt-24">
        
        <div className="bg-white p-7 rounded-3xl border border-stone-200/90 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
            <span className="text-xl font-black">₹</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">Zero Hidden Markups</h3>
          <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
            We don't take agent cuts from inflated taxi prices or 5-star packages. We show you the actual cost of state buses, scooter rentals, and local thalis.
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-stone-200/90 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Smart Budget Allocation</h3>
          <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
            Our planner algorithm intelligently slices your budget across transit, stay, food, activities, and an emergency contingency buffer.
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-stone-200/90 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Eat & Live Local</h3>
          <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
            From heritage Goan bakeries to Tapovan riverside cafes in Rishikesh, we prioritize authentic Indian culture and local homestays.
          </p>
        </div>

      </div>

      {/* How Our Indian Budget Calculator Works */}
      <div id="budget-philosophy" className="bg-gradient-to-br from-teal-900 via-slate-900 to-teal-950 text-white p-8 md:p-12 rounded-4xl space-y-8 shadow-xl scroll-mt-24">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
            Transparent Travel Economics
          </span>
          <h2 className="text-2xl md:text-3xl font-black">
            How TripSathi Estimates Realistic Indian Costs
          </h2>
          <p className="text-stone-300 text-sm">
            We don't use arbitrary Western algorithms or fake foreign currency converters. We benchmark our data directly on real ground realities:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-xs">
            <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">IRCTC & State Transport</h4>
              <p className="text-xs text-stone-300 mt-0.5">Sleeper / 3AC train fares, HRTC/KSRTC Volvo bus tickets, and rental 110cc scooters at ₹400/day.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-xs">
            <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">Verified Hostels & Homestays</h4>
              <p className="text-xs text-stone-300 mt-0.5">Social backpacker dorms from ₹500–₹800/night and authentic Portuguese/Himachali homestays from ₹1,200.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-xs">
            <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">Authentic Regional Thalis</h4>
              <p className="text-xs text-stone-300 mt-0.5">Unlimited veg thalis (₹150–₹220) and coastal fish curry meals (₹250–₹350) instead of overpriced tourist traps.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-xs">
            <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">Composite Monument Passes</h4>
              <p className="text-xs text-stone-300 mt-0.5">Official ASI monument composite entry fees (₹400 for 5 monuments in Rajasthan) and student discount rules.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Backend Integration Note */}
      <div id="backend-architecture" className="bg-stone-50 p-6 md:p-8 rounded-3xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-6 scroll-mt-24">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              FastAPI Python Architecture Ready
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              The entire data access layer is cleanly decoupled in <code className="text-teal-700 bg-stone-200/70 px-1.5 py-0.5 rounded">src/services/tripService.js</code> for effortless FastAPI backend integration.
            </p>
          </div>
        </div>

        <Link
          to="/planner"
          className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-xs shrink-0 whitespace-nowrap"
        >
          Plan a Trip Now
        </Link>
      </div>

    </div>
  );
}
