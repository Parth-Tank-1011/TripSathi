import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getStoredTrips,
  saveTrip as persistTrip,
  deleteTrip as removeTripFromStorage,
  generateSmartTripPlan
} from "../services/tripService";
import { DEFAULT_SAVED_TRIPS } from "../data/mockData";

const TripContext = createContext(null);

const DEFAULT_FORM = {
  startingLocation: "Rajkot",
  destination: "Goa",
  days: 5,
  travelers: 2,
  totalBudget: 20000,
  travelDates: "",
  travelStyle: "Relaxed",
  interests: ["Beaches", "Food", "Heritage"],
  foodPreference: "Both",
  stayPreference: "Hostel"
};

export function TripProvider({ children }) {
  const [savedTrips, setSavedTrips] = useState(() => getStoredTrips());
  
  // Initialize current plan with default saved Goa trip so results page is rich by default
  const [currentPlan, setCurrentPlan] = useState(() => {
    try {
      const stored = localStorage.getItem("tripsathi_current_plan");
      return stored ? JSON.parse(stored) : DEFAULT_SAVED_TRIPS[0];
    } catch {
      return DEFAULT_SAVED_TRIPS[0];
    }
  });

  const [plannerForm, setPlannerForm] = useState(DEFAULT_FORM);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem("tripsathi_bookmarks");
      return saved ? JSON.parse(saved) : ["goa", "manali", "jaipur", "udaipur"];
    } catch {
      return ["goa", "manali", "jaipur", "udaipur"];
    }
  });

  // Persist current plan
  useEffect(() => {
    if (currentPlan) {
      localStorage.setItem("tripsathi_current_plan", JSON.stringify(currentPlan));
    }
  }, [currentPlan]);

  // Persist bookmarks
  useEffect(() => {
    localStorage.setItem("tripsathi_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const updatePlannerForm = (fields) => {
    setPlannerForm((prev) => ({ ...prev, ...fields }));
  };

  /**
   * Seeds the planner form from an existing trip so "Edit Trip" reopens that
   * exact trip instead of an empty default plan.
   */
  const loadTripIntoPlanner = (trip) => {
    if (!trip) return;
    setPlannerForm((prev) => ({
      ...prev,
      startingLocation: trip.startingLocation || prev.startingLocation,
      destination: trip.destination || prev.destination,
      days: Number(trip.days) > 0 ? Number(trip.days) : prev.days,
      travelers: Number(trip.travelers) > 0 ? Number(trip.travelers) : prev.travelers,
      travelDates: trip.travelDates || trip.dates || prev.travelDates,
      travelStyle: trip.travelStyle || prev.travelStyle,
      interests:
        Array.isArray(trip.interests) && trip.interests.length > 0
          ? trip.interests
          : prev.interests,
      foodPreference: trip.foodPreference || prev.foodPreference,
      stayPreference: trip.stayPreference || prev.stayPreference,
      totalBudget: Number(trip.budget) > 0 ? Number(trip.budget) : prev.totalBudget
    }));
  };

  /**
   * Updates the plan currently open on /results. Also persists it when that
   * plan has already been saved, so itinerary edits are never dropped.
   */
  const updateCurrentPlan = (updates) => {
    if (!currentPlan) return;
    const next = { ...currentPlan, ...updates };
    setCurrentPlan(next);

    if (next.id) {
      const trips = getStoredTrips();
      if (trips.some((t) => t.id === next.id)) {
        const updated = trips.map((t) => (t.id === next.id ? next : t));
        localStorage.setItem("tripsathi_saved_trips", JSON.stringify(updated));
        setSavedTrips(updated);
      }
    }
  };

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  /**
   * Orchestrates the animated trip generation flow
   */
  const executeTripGeneration = async (formData = plannerForm, onComplete) => {
    setIsGenerating(true);
    setGenerationStep(0);

    // Sequence of animated steps
    const stepInterval = 650;
    
    setTimeout(() => setGenerationStep(1), stepInterval * 1);
    setTimeout(() => setGenerationStep(2), stepInterval * 2);
    setTimeout(() => setGenerationStep(3), stepInterval * 3);
    setTimeout(() => setGenerationStep(4), stepInterval * 4);
    setTimeout(() => setGenerationStep(5), stepInterval * 5);

    try {
      const plan = await generateSmartTripPlan(formData);
      setTimeout(() => {
        setCurrentPlan(plan);
        setIsGenerating(false);
        if (onComplete) onComplete(plan);
      }, stepInterval * 6);
      return plan;
    } catch (err) {
      console.error("Error generating trip plan:", err);
      setIsGenerating(false);
      setGenerationStep(0);
      // Always notify the caller so navigation still happens with fallback data.
      if (onComplete) onComplete(null);
      return null;
    }
  };

  const saveActivePlanToTrips = (plan = currentPlan) => {
    if (!plan) return;
    const updated = persistTrip(plan);
    setSavedTrips(updated);
  };

  const deleteSavedTrip = (id) => {
    const updated = removeTripFromStorage(id);
    setSavedTrips(updated);
  };

  const updateSavedTrip = (id, updates) => {
    const trips = getStoredTrips();
    const updated = trips.map((t) => (t.id === id ? { ...t, ...updates } : t));
    localStorage.setItem("tripsathi_saved_trips", JSON.stringify(updated));
    setSavedTrips(updated);
    if (currentPlan && currentPlan.id === id) {
      setCurrentPlan((prev) => ({ ...prev, ...updates }));
    }
  };

  return (
    <TripContext.Provider
      value={{
        savedTrips,
        currentPlan,
        setCurrentPlan,
        updateCurrentPlan,
        plannerForm,
        updatePlannerForm,
        loadTripIntoPlanner,
        isGenerating,
        generationStep,
        executeTripGeneration,
        saveActivePlanToTrips,
        deleteSavedTrip,
        updateSavedTrip,
        bookmarks,
        toggleBookmark
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (!context) throw new Error("useTrip must be used within a TripProvider");
  return context;
}
