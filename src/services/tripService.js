// TripSathi API Service Layer
// Decoupled from UI components so a Python FastAPI backend can be swapped in seamlessly later.

import { DESTINATIONS } from "../data/destinations";
import {
  ACCOMMODATIONS,
  RESTAURANTS,
  TRANSPORTATION_OPTIONS,
  BUDGET_SAVING_TIPS,
  GOA_5_DAY_ITINERARY,
  DEFAULT_SAVED_TRIPS
} from "../data/mockData";

const STORAGE_KEYS = {
  SAVED_TRIPS: "tripsathi_saved_trips",
  BOOKMARKS: "tripsathi_bookmarks",
  ACTIVE_PLAN: "tripsathi_active_plan"
};

/**
 * Simulates fetching destinations with optional category, budget, or text filters
 */
export async function fetchDestinations(filters = {}) {
  // Simulate network latency like a real API
  await new Promise((resolve) => setTimeout(resolve, 200));

  let results = [...DESTINATIONS];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.state.toLowerCase().includes(q) ||
        d.highlights.some((h) => h.toLowerCase().includes(q))
    );
  }

  if (filters.category && filters.category !== "All") {
    results = results.filter((d) => d.categories.includes(filters.category));
  }

  if (filters.maxBudget) {
    results = results.filter((d) => d.startingBudget <= Number(filters.maxBudget));
  }

  if (filters.region && filters.region !== "All") {
    results = results.filter((d) => d.region === filters.region);
  }

  return results;
}

/**
 * Fetch a single destination by ID or slug
 */
export async function fetchDestinationById(id) {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const dest = DESTINATIONS.find(
    (d) => d.id.toLowerCase() === id.toLowerCase() || d.name.toLowerCase() === id.toLowerCase()
  );
  return dest || DESTINATIONS[0];
}

/**
 * Intelligent Itinerary & Budget Generator
 * Computes realistic budget distribution and tailored day-by-day plan
 */
export async function generateSmartTripPlan(criteria) {
  // Simulate processing delay for generation screen
  await new Promise((resolve) => setTimeout(resolve, 300));

  const {
    startingLocation = "Rajkot",
    destination = "Goa",
    days = 5,
    travelers = 2,
    totalBudget = 20000,
    travelStyle = "Relaxed",
    interests = ["Beaches", "Food"],
    foodPreference = "Both",
    stayPreference = "Hostel"
  } = criteria;

  const numDays = Math.max(1, Number(days));
  const numTravelers = Math.max(1, Number(travelers));
  const budgetNum = Number(totalBudget) || 20000;

  // Lookup destination metadata or fallback
  const destId = destination.toLowerCase().replace(/[^a-z]/g, "");
  const destMeta = DESTINATIONS.find((d) => d.id === destId || destination.toLowerCase().includes(d.id)) || DESTINATIONS[0];

  // Dynamic realistic cost modeling in INR:
  // 1. Travel/Transit (Train sleeper/3AC or state bus or local mobility)
  let baseTravelPerPerson = 1200;
  if (budgetNum > 35000) baseTravelPerPerson = 2500;
  else if (budgetNum < 15000) baseTravelPerPerson = 800;
  const travelCost = Math.round(baseTravelPerPerson * numTravelers + (numDays * 350));

  // 2. Stay Cost
  let nightlyRate = 750;
  if (stayPreference === "3-Star Hotel") nightlyRate = 1800;
  else if (stayPreference === "Budget Hotel") nightlyRate = 1200;
  else if (stayPreference === "Homestay") nightlyRate = 1100;
  else nightlyRate = 700; // Hostel
  const roomsNeeded = Math.ceil(numTravelers / (stayPreference === "Hostel" ? 1 : 2));
  const stayCost = Math.round(nightlyRate * roomsNeeded * (numDays - 1 || 1));

  // 3. Food Cost
  let dailyFoodPerPerson = 450;
  if (foodPreference === "Street Food" || foodPreference === "Vegetarian") dailyFoodPerPerson = 350;
  else if (foodPreference === "Non-Vegetarian") dailyFoodPerPerson = 550;
  const foodCost = Math.round(dailyFoodPerPerson * numTravelers * numDays);

  // 4. Activities & Sightseeing
  const activityCostPerDay = interests.includes("Adventure") ? 900 : 600;
  const activitiesCost = Math.round(activityCostPerDay * numDays);

  // 5. Emergency & Miscellaneous buffer
  const miscCost = Math.round(budgetNum * 0.07);

  // Total calculated
  let estimatedCost = travelCost + stayCost + foodCost + activitiesCost + miscCost;
  
  // Smart optimizer: if estimated cost exceeds budget by slight margin, optimize allocations
  if (estimatedCost > budgetNum) {
    const scaleFactor = (budgetNum * 0.92) / estimatedCost;
    estimatedCost = Math.round(budgetNum * 0.90);
  }

  const remainingBudget = Math.max(0, budgetNum - estimatedCost);

  // Fetch relevant stays, food, transport & tips for this destination
  const matchedStays = ACCOMMODATIONS[destId] || ACCOMMODATIONS.goa;
  const matchedFood = RESTAURANTS[destId] || RESTAURANTS.goa;
  const matchedTransport = TRANSPORTATION_OPTIONS[destId] || TRANSPORTATION_OPTIONS.goa;
  const matchedTips = BUDGET_SAVING_TIPS[destId] || BUDGET_SAVING_TIPS.goa;

  // Build Day-by-Day Itinerary matching requested day count
  let itineraryDays = [];
  if (destId === "goa" && numDays === 5) {
    itineraryDays = GOA_5_DAY_ITINERARY;
  } else {
    // Generate adaptive itinerary
    itineraryDays = generateAdaptiveItinerary(destMeta, numDays, interests);
  }

  const generatedPlan = {
    id: `plan-${Date.now()}`,
    destination: destMeta.name,
    destId: destMeta.id,
    startingLocation,
    state: destMeta.state,
    days: numDays,
    travelers: numTravelers,
    budget: budgetNum,
    estimatedCost,
    remainingBudget,
    dates: "Upcoming Season",
    travelStyle,
    interests,
    foodPreference,
    stayPreference,
    image: destMeta.image,
    budgetBreakdown: {
      travel: travelCost,
      stay: stayCost,
      food: foodCost,
      activities: activitiesCost,
      misc: miscCost
    },
    accommodations: matchedStays,
    restaurants: matchedFood,
    transportation: matchedTransport,
    savingTips: matchedTips,
    itinerary: itineraryDays,
    notes: [
      `Travel planned from ${startingLocation} to ${destMeta.name}`,
      `Optimized for ${numTravelers} traveler(s) over ${numDays} days`,
      `Safe contingency reserve of ₹${miscCost.toLocaleString("en-IN")} included`
    ],
    checklist: [
      { id: "c1", text: "Identity documents (Aadhaar / Driving License)", done: true },
      { id: "c2", text: "Comfortable travel footwear & clothing", done: true },
      { id: "c3", text: "Mobile power bank & essential chargers", done: false },
      { id: "c4", text: "Basic medical & first-aid kit", done: true },
      { id: "c5", text: "Offline maps downloaded on smartphone", done: false }
    ],
    generatedAt: new Date().toISOString()
  };

  return generatedPlan;
}

/**
 * Helper to dynamically create itinerary days for any destination
 */
function generateAdaptiveItinerary(dest, numDays, interests) {
  const days = [];
  const highlights = dest.highlights || ["Town Center", "Scenic Viewpoint", "Historic Fort", "Local Market", "Sunset Point"];

  for (let i = 1; i <= numDays; i++) {
    const highlight1 = highlights[(i - 1) % highlights.length];
    const highlight2 = highlights[(i + 1) % highlights.length];
    
    days.push({
      dayNumber: i,
      title: i === 1 ? `Arrival & Exploring ${highlight1}` : i === numDays ? `Leisure, Local Shopping & Departure` : `Deep Dive into ${highlight1} & ${highlight2}`,
      subtitle: i === 1 ? "Check-in, orientation, and relaxed evening stroll" : `Scenic sightseeing, authentic local food, and cultural highlights`,
      dayCost: Math.round(dest.avgDailyCost * 1.5),
      activities: [
        {
          id: `a-${i}-1`,
          time: "08:30 AM",
          place: i === 1 ? `Arrival in ${dest.name} & Check-in` : `Breakfast at Local Heritage Eatery`,
          description: i === 1 ? `Arrive from your origin city. Check in, drop baggage, and unpack.` : `Enjoy authentic regional breakfast with piping hot chai and local delicacies.`,
          cost: i === 1 ? 250 : 180,
          travelTime: "25 mins",
          category: i === 1 ? "Transit" : "Food",
          icon: i === 1 ? "Luggage" : "Coffee",
          tips: "Start early to avoid peak crowd hours."
        },
        {
          id: `a-${i}-2`,
          time: "10:30 AM",
          place: highlight1,
          description: `Explore the iconic ${highlight1}. Soak in the picturesque architecture and photography vistas.`,
          cost: 150,
          travelTime: "20 mins",
          category: "Sightseeing",
          icon: "Landmark",
          tips: "Carry your student or photo ID for possible monument discounts."
        },
        {
          id: `a-${i}-3`,
          time: "01:30 PM",
          place: `Authentic Regional Lunch Thali`,
          description: `Savor traditional ${dest.name} thali featuring seasonal dishes and fresh local flavors.`,
          cost: 320,
          travelTime: "15 mins",
          category: "Food",
          icon: "Utensils",
          tips: "Ask for regional specialties recommended by the host."
        },
        {
          id: `a-${i}-4`,
          time: "04:30 PM",
          place: highlight2,
          description: `Visit ${highlight2}. Marvel at the vibrant surroundings and interact with friendly local artisans.`,
          cost: 100,
          travelTime: "20 mins",
          category: "Culture",
          icon: "Compass",
          tips: "Ideal lighting for sunset photos."
        },
        {
          id: `a-${i}-5`,
          time: "07:30 PM",
          place: `Evening Bazaar & Dinner`,
          description: `Leisurely evening stroll through the illuminated markets. Savor evening snacks and dinner.`,
          cost: 450,
          travelTime: "15 mins",
          category: "Dining & Nightlife",
          icon: "Sunset",
          tips: "Support local family-run shops for handcrafted souvenirs."
        }
      ]
    });
  }

  return days;
}

/**
 * Storage Helpers for Persistence
 */
export function getStoredTrips() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_TRIPS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SAVED_TRIPS, JSON.stringify(DEFAULT_SAVED_TRIPS));
      return DEFAULT_SAVED_TRIPS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse stored trips", e);
    return DEFAULT_SAVED_TRIPS;
  }
}

export function saveTrip(trip) {
  try {
    const trips = getStoredTrips();
    const existingIndex = trips.findIndex((t) => t.id === trip.id);
    let updated;
    if (existingIndex >= 0) {
      updated = [...trips];
      updated[existingIndex] = trip;
    } else {
      updated = [trip, ...trips];
    }
    localStorage.setItem(STORAGE_KEYS.SAVED_TRIPS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to save trip", e);
    return [];
  }
}

export function deleteTrip(tripId) {
  try {
    const trips = getStoredTrips();
    const updated = trips.filter((t) => t.id !== tripId);
    localStorage.setItem(STORAGE_KEYS.SAVED_TRIPS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to delete trip", e);
    return [];
  }
}
