# 🧭 TripSathi — "Plan more. Spend less. Travel better."

> **TripSathi** is a modern, responsive travel-tech web application built specifically for Indian budget travelers, students, families, and solo backpackers.
> 
> **Core Value Proposition**: *"Tell us where you want to go and how much you can spend — we'll plan the trip around your budget."*

---

## 📸 Key Features & Pages

### 1. Landing Page (`/`)
- **Hero Section**: High-resolution travel visuals, dark gradient overlay, and high-converting CTA.
- **Floating Trip Planner Card**: Quick-start configurator with Indian departure hubs (Rajkot, Ahmedabad, Delhi, Mumbai, Bengaluru, etc.), destinations, duration, travelers, and budget in Indian Rupees (₹).
- **Explore Popular Destinations**: Featured cards for **Goa**, **Manali**, **Jaipur**, **Kerala**, **Udaipur**, and **Rishikesh** with starting budgets, recommended days, and direct planner triggers.
- **How It Works**: 4-step clean process (Tell Us Your Plan ➔ We Build Your Trip ➔ Optimize Your Budget ➔ Travel & Enjoy).
- **Features Section**: Smart Itinerary, Budget Optimizer, Affordable Stays, Local Food, Transportation, and Personalized Trips.
- **Traveler Stories & Testimonials**: Real social proof of Indian travelers saving money on trips.

### 2. Multi-Step Trip Planner (`/planner`)
- **Step 1 — Trip Details**: Starting city, destination selector, dynamic day slider (2–10 days), travelers counter (1–6+), and travel dates.
- **Step 2 — Preferences**: Interactive selectable chips for:
  - *Travel Style*: Relaxed, Adventure, Family, Couple, Backpacking, Luxury, Solo.
  - *Interests*: Beaches, Mountains, History, Nature, Food, Nightlife, Shopping, Adventure, Photography, Culture.
  - *Food Preferences*: Vegetarian, Non-Vegetarian, Jain, Vegan, Local Food, Street Food.
  - *Stay Preferences*: Hostel (₹600–₹800), Budget Hotel (₹1,200), 3-Star Hotel (₹1,800+), Homestay (₹1,100).
- **Step 3 — Budget**: Interactive visual budget slider and numeric input in ₹ INR with real-time live allocation preview:
  - 🚆 Transportation (25%)
  - 🏨 Accommodation (25%)
  - 🍛 Food (20%)
  - 🎟 Activities (20%)
  - 💰 Emergency / Contingency (10%)
- **Generating Screen**: Animated loading state with progress checkmarks:
  - ✓ Understanding your preferences
  - ✓ Finding budget-friendly stays
  - ✓ Planning your itinerary
  - ✓ Estimating travel costs
  - ✓ Finding food options
  - 🎆 Celebration confetti trigger and seamless redirect to results.

### 3. Trip Results / Itinerary (`/results`)
- **Budget Summary Card**:
  - Total Budget: ₹20,000
  - Estimated Cost: ₹17,450
  - Remaining Buffer: ₹2,550
  - Progress bar showing percentage utilized with surplus indicator.
- **Visual Horizontal Budget Breakdown**: Segmented colored bar and category chips for Travel, Stay, Food, Activities, and Misc.
- **Day-by-Day Vertical Itinerary Timeline**:
  - Expand/collapse toggle for each day.
  - Time-sequenced activities (09:00 AM, 10:30 AM, 12:00 PM, 02:00 PM, 04:00 PM, 06:30 PM, 08:30 PM).
  - Activity details: time, place, description, cost in ₹, transit time, and insider tips.
  - **"View on Map"** modal with simulated route and numbered stops.
  - **"Add Activity"** modal to append custom stops to any day.
  - Individual activity deletion and edit capabilities.
- **Where You'll Stay (`HotelCard`)**: Verified hostels, boutique homestays, and budget hotels with per-night and total stay costs.
- **Eat Like a Local (`FoodCard`)**: Authentic thali spots and street food hubs with veg/non-veg badges and average spend per person.
- **Getting Around (`TransportCard`)**: Local transit options (Bus ₹300/day, Scooter Rental ₹400/day, Taxi ₹1,200/day) with *"Best for your budget"* highlight.
- **Save More on This Trip (`BudgetTipsCard`)**: Actionable rupee hacks with total potential savings calculation.

### 4. Explore Indian Destinations (`/explore`)
- Search bar with instant autocomplete.
- Category filters: 🏖 Beaches, 🏔 Mountains, 🏛 Heritage, 🌿 Nature, 🧘 Spiritual, 🍛 Food, 🎒 Backpacking.
- Multi-dimensional filters for Region (North, West, South, East) and Maximum Budget.

### 5. My Trips Dashboard (`/my-trips`)
- Grid of saved and upcoming trips.
- Quick actions: "View Trip", "Edit", "Delete", and "+ Plan New Trip".
- Persistent storage in `localStorage`.

### 6. Trip Details Deep-Dive (`/my-trips/:id`)
- Tabbed interface:
  - **Itinerary Timeline**: Full customizable daily schedule.
  - **Budget & Expense Tracker**: Live on-trip expense logging against the set budget.
  - **Stays & Food**: Quick reference for bookings.
  - **Notes & Packing**: Interactive packing checklist and custom reminders.
- Action toolbar: **"Save Changes"**, **"Share Trip"** (copy link, WhatsApp share), **"Download Itinerary"** (clean text export), and **"Print / PDF"**.

### 7. User Profile & Preferences (`/profile`)
- User information (Parth Sharma / travel enthusiast).
- Travel stats: Trips planned, Money saved (₹18,500), States visited (8).
- Saved places / bookmarked destinations.
- Profile and travel style preference editor.

### 8. About & Philosophy (`/about`)
- The story behind TripSathi and our mission to democratize budget travel across Bharat.
- Breakdown of how our algorithm models realistic Indian travel costs (IRCTC trains, state buses, thali pricing, ASI monument passes).

---

## 🛠️ Tech Stack

- **React 19**
- **Vite 8**
- **Tailwind CSS v4** (with `@tailwindcss/vite`)
- **React Router DOM 7**
- **Lucide React** (modern travel & UI icons)
- **Canvas Confetti** (celebration animations)
- **Plus Jakarta Sans** (Google Fonts)

---

## 🔌 Future Python FastAPI Backend Integration

All API operations and budget optimization logic are decoupled into:
```
src/services/tripService.js
```

To connect a live FastAPI backend:
1. Update `tripService.js` to point to `http://localhost:8000/api/v1/...`
2. Maintain the existing JSON response contracts.
3. No UI components need modification.

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Run Vite development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```
The application will be running on `http://localhost:5173/`.
