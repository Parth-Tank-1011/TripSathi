import React, { useState } from "react";
import { X, Copy, Check, Share2, MessageCircle, Download, FileText } from "lucide-react";

export default function ShareTripModal({ isOpen, onClose, trip }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !trip) return null;

  const shareUrl = window.location.href;
  const shareText = `🌴 Check out my ${trip.destination} budget trip on TripSathi!\n` +
    `⏱️ Duration: ${trip.days} Days • 👥 Travelers: ${trip.travelers}\n` +
    `💰 Estimated Budget: ₹${(trip.estimatedCost || trip.budget).toLocaleString("en-IN")}\n` +
    `🔗 Plan yours: ${shareUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, "_blank");
  };

  const handleDownloadText = () => {
    let content = `TripSathi Itinerary: ${trip.destination}\n`;
    content += `Days: ${trip.days} | Travelers: ${trip.travelers} | Budget: ₹${trip.budget}\n`;
    content += `Estimated Cost: ₹${trip.estimatedCost}\n\n`;

    (trip.itinerary || []).forEach((d) => {
      content += `=== DAY ${d.dayNumber}: ${d.title} ===\n`;
      (d.activities || []).forEach((a) => {
        content += `  [${a.time}] ${a.place} - ₹${a.cost}\n    ${a.description}\n`;
      });
      content += "\n";
    });

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `TripSathi-${trip.destination}-Itinerary.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">
              Share Your Itinerary
            </h3>
            <p className="text-xs text-stone-500">
              {trip.destination} • {trip.days} Days • ₹{(trip.estimatedCost || trip.budget).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Copy Link Input */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Direct Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-600 bg-stone-50 focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Quick Share Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share to WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadText}
              className="py-3 px-4 rounded-xl border border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4 text-teal-600" />
              <span>Download Text</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
