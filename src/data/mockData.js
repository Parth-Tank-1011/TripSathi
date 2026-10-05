// Realistic mock travel data for TripSathi: Stays, Food, Transports, Tips, and Itineraries

export const ACCOMMODATIONS = {
  goa: [
    {
      id: "h1",
      name: "Goa Backpackers Hostel",
      type: "Hostel",
      rating: 4.6,
      reviewsCount: 840,
      location: "Anjuna, North Goa",
      distanceFromAttraction: "450m from Anjuna Beach",
      pricePerNight: 700,
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800&auto=format&fit=crop",
      badge: "Best Value",
      badgeColor: "teal",
      amenities: ["Free High-speed WiFi", "Complimentary Breakfast", "Air Conditioned", "Shared Social Pool", "Co-working lounge", "Lockers"],
      description: "Vibrant community hostel with a pool, tropical garden cafe, and friendly vibe perfect for solo and budget travelers."
    },
    {
      id: "h2",
      name: "Palm Breeze Heritage Homestay",
      type: "Homestay / Villa",
      rating: 4.8,
      reviewsCount: 512,
      location: "Candolim, North Goa",
      distanceFromAttraction: "1.2 km from Candolim Beach",
      pricePerNight: 1250,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
      badge: "Top Rated",
      badgeColor: "amber",
      amenities: ["Private Balcony", "AC Rooms", "Free Parking", "Home-cooked Meals", "Scooter Rental Desk"],
      description: "Quiet, peaceful Portuguese-style villa run by a warm local Goan family with lush coconut grove surroundings."
    },
    {
      id: "h3",
      name: "Coastal Haven Resort & Suites",
      type: "3-Star Hotel",
      rating: 4.3,
      reviewsCount: 690,
      location: "Calangute, North Goa",
      distanceFromAttraction: "800m from Calangute Beach",
      pricePerNight: 1800,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
      badge: "Comfort Pick",
      badgeColor: "blue",
      amenities: ["Swimming Pool", "En-suite Bathroom", "Buffet Breakfast", "Daily Housekeeping", "24/7 Front Desk"],
      description: "Modern, clean mid-range hotel offering comfortable queen beds, pool access, and quick access to Calangute market."
    }
  ],
  manali: [
    {
      id: "hm1",
      name: "Zostel Old Manali",
      type: "Hostel",
      rating: 4.7,
      reviewsCount: 1120,
      location: "Old Manali village",
      distanceFromAttraction: "300m from Old Manali Cafe Lane",
      pricePerNight: 650,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
      badge: "Best Value",
      badgeColor: "teal",
      amenities: ["Mountain View Balconies", "Bonfire Evenings", "Cafe & WiFi", "Heated Dorms", "Board Games"],
      description: "Iconic backpacker hub situated amidst apple orchards with sweeping views of the snow-clad Pir Panjal ranges."
    },
    {
      id: "hm2",
      name: "Cedar Valley Riverside Cottage",
      type: "Homestay",
      rating: 4.6,
      reviewsCount: 420,
      location: "Aleo, Manali",
      distanceFromAttraction: "1.5 km from Mall Road",
      pricePerNight: 1300,
      image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=800&auto=format&fit=crop",
      badge: "Scenic Views",
      badgeColor: "emerald",
      amenities: ["Hot Water 24/7", "Home Cooked Siddu", "Garden", "Quiet Location", "Parking"],
      description: "Traditional Himachali wooden cottage by the bubbling stream with cozy wood paneling and warm host hospitality."
    },
    {
      id: "hm3",
      name: "The Pine Woods Hotel",
      type: "3-Star Hotel",
      rating: 4.4,
      reviewsCount: 560,
      location: "Hadimba Road, Manali",
      distanceFromAttraction: "400m from Hadimba Temple",
      pricePerNight: 1950,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop",
      badge: "Comfort Pick",
      badgeColor: "blue",
      amenities: ["Room Heaters", "In-house Multi-cuisine Restaurant", "Power Backup", "Mountain Facing"],
      description: "Spacious family and couple friendly rooms nested in towering deodar pine trees."
    }
  ],
  jaipur: [
    {
      id: "hj1",
      name: "Moustache Jaipur Heritage",
      type: "Hostel",
      rating: 4.8,
      reviewsCount: 1450,
      location: "MI Road, Jaipur",
      distanceFromAttraction: "1.8 km from City Palace",
      pricePerNight: 600,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop",
      badge: "Best Value",
      badgeColor: "teal",
      amenities: ["Rooftop Cafe", "Rajasthani Courtyard", "High-speed WiFi", "Cultural Events", "AC Dorms"],
      description: "Vibrant traditional art hostel with rooftop puppet shows, stunning pink stone courtyards, and chai socials."
    },
    {
      id: "hj2",
      name: "Haveli Kalwara Boutique",
      type: "Heritage Homestay",
      rating: 4.6,
      reviewsCount: 380,
      location: "Old Pink City, Jaipur",
      distanceFromAttraction: "400m from Hawa Mahal",
      pricePerNight: 1400,
      image: "https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=800&auto=format&fit=crop",
      badge: "Heritage Pick",
      badgeColor: "amber",
      amenities: ["Jharokha Seating", "Traditional Rajasthani Thali", "AC", "Walking Tour guide"],
      description: "120-year-old restored merchant haveli right inside the historic walled city gates."
    },
    {
      id: "hj3",
      name: "Hotel Pearl Palace",
      type: "3-Star Hotel",
      rating: 4.7,
      reviewsCount: 2200,
      location: "Hathroi Fort, Jaipur",
      distanceFromAttraction: "1 km from Railway Station",
      pricePerNight: 1700,
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop",
      badge: "Legendary Stay",
      badgeColor: "blue",
      amenities: ["Famous Peacock Rooftop Restaurant", "Artwork Decor", "Travel Desk", "AC"],
      description: "Globally acclaimed budget boutique hotel famous for its award-winning rooftop restaurant and art."
    }
  ]
};

export const RESTAURANTS = {
  goa: [
    {
      id: "r1",
      name: "Anand Seafood & Thali Bar",
      cuisine: "Authentic Goan & Seafood",
      rating: 4.6,
      reviewsCount: 1820,
      avgPricePerPerson: "₹200–₹350",
      avgCostNum: 250,
      distance: "1.1 km from Baga",
      vegFriendly: "Both",
      vegBadge: "Non-Veg & Veg",
      isPureVeg: false,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
      specialties: ["Surmai Fish Thali", "Prawn Rava Fry", "Sol Kadhi", "Goan Chana Masala Thali"],
      budgetTip: "Arrive before 1:30 PM for lunch to skip long tourist queues and get the fresh daily catch!"
    },
    {
      id: "r2",
      name: "Navtara Pure Vegetarian",
      cuisine: "South Indian & North Indian",
      rating: 4.4,
      reviewsCount: 3100,
      avgPricePerPerson: "₹150–₹250",
      avgCostNum: 180,
      distance: "Calangute Circle",
      vegFriendly: "Pure Veg",
      vegBadge: "100% Pure Veg & Jain Available",
      isPureVeg: true,
      image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=800&auto=format&fit=crop",
      specialties: ["Masala Dosa", "Executive Veg Thali", "Chole Bhature", "Paneer Tikka"],
      budgetTip: "The unlimited morning breakfast combos and executive lunch thalis give unbeatable value."
    },
    {
      id: "r3",
      name: "Curlies Beach Shack (Day Vibes)",
      cuisine: "Continental, Goan, Italian",
      rating: 4.2,
      reviewsCount: 4200,
      avgPricePerPerson: "₹350–₹500",
      avgCostNum: 400,
      distance: "South Anjuna Beach",
      vegFriendly: "Both",
      vegBadge: "Non-Veg & Veg",
      isPureVeg: false,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
      specialties: ["Wood-fired Pizza", "Garlic Butter Prawns", "Fresh Fruit Smoothies", "Fish Fingers"],
      budgetTip: "Visit during late afternoon happy hours for beach loungers without expensive minimum spend."
    },
    {
      id: "r4",
      name: "Vinayak Family Restaurant",
      cuisine: "Local Goan Cuisine",
      rating: 4.7,
      reviewsCount: 2900,
      avgPricePerPerson: "₹180–₹300",
      avgCostNum: 220,
      distance: "Assagao",
      vegFriendly: "Both",
      vegBadge: "Goan Specialties",
      isPureVeg: false,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
      specialties: ["Special Fish Thali", "Squid Masala", "Crab Xacuti", "Kokum Curry"],
      budgetTip: "Beloved by locals; costs half of beachfront restaurants with double the flavor."
    }
  ],
  manali: [
    {
      id: "rm1",
      name: "Cafe 1947",
      cuisine: "Italian & Continental",
      rating: 4.5,
      reviewsCount: 1600,
      avgPricePerPerson: "₹300–₹500",
      avgCostNum: 380,
      distance: "Old Manali Bridge",
      vegFriendly: "Both",
      vegBadge: "Riverside Seating",
      isPureVeg: false,
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop",
      specialties: ["Trout Fish with Lemon Butter", "Thin Crust Pizzas", "Pesto Pasta", "Hot Chocolate"],
      budgetTip: "Sit by the riverside listening to the gushing Manalsu river with just a coffee and snack."
    },
    {
      id: "rm2",
      name: "Mayur Pure Veg Restaurant",
      cuisine: "North Indian & Gujarati Thali",
      rating: 4.6,
      reviewsCount: 1980,
      avgPricePerPerson: "₹200–₹320",
      avgCostNum: 240,
      distance: "Mall Road, Manali",
      vegFriendly: "Pure Veg",
      vegBadge: "Pure Veg & Jain",
      isPureVeg: true,
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop",
      specialties: ["Dal Makhani", "Special Gujarati / Marwari Thali", "Paneer Butter Masala", "Gulab Jamun"],
      budgetTip: "The unlimited thali is the favorite spot for families and budget travelers visiting Mall Road."
    },
    {
      id: "rm3",
      name: "Old Manali Corner Momos & Siddu",
      cuisine: "Himachali & Tibetan Street Food",
      rating: 4.8,
      reviewsCount: 890,
      avgPricePerPerson: "₹100–₹180",
      avgCostNum: 130,
      distance: "Near Club House",
      vegFriendly: "Both",
      vegBadge: "Local Street Food",
      isPureVeg: false,
      image: "https://images.unsplash.com/photo-1625398407797-0332c418931b?q=80&w=800&auto=format&fit=crop",
      specialties: ["Steamed Himachali Siddu with desi ghee", "Chicken Momos", "Thukpa Noodle Soup"],
      budgetTip: "One warm Siddu (₹80) is super filling and keeps you energized through alpine treks!"
    }
  ],
  jaipur: [
    {
      id: "rj1",
      name: "Laxmi Mishthan Bhandar (LMB)",
      cuisine: "Traditional Rajasthani & Sweets",
      rating: 4.5,
      reviewsCount: 3800,
      avgPricePerPerson: "₹250–₹450",
      avgCostNum: 320,
      distance: "Johari Bazaar",
      vegFriendly: "Pure Veg",
      vegBadge: "100% Pure Veg Heritage",
      isPureVeg: true,
      image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800&auto=format&fit=crop",
      specialties: ["Rajasthani Royal Thali", "Pyaaz Kachori", "Paneer Ghewar", "Rasmalai"],
      budgetTip: "Grab their legendary Pyaaz Kachori for ₹60 at the counter instead of a full sit-down meal."
    },
    {
      id: "rj2",
      name: "Rawat Mishthan Bhandar",
      cuisine: "Street Food & North Indian",
      rating: 4.6,
      reviewsCount: 4500,
      avgPricePerPerson: "₹120–₹250",
      avgCostNum: 160,
      distance: "Station Road, Sindhi Camp",
      vegFriendly: "Pure Veg",
      vegBadge: "Famous Street Gem",
      isPureVeg: true,
      image: "https://images.unsplash.com/photo-1505253758473-96b3015f21c9?q=80&w=800&auto=format&fit=crop",
      specialties: ["Mawa Kachori", "Mirchi Vada", "Dal Kachori", "Chole Kulche"],
      budgetTip: "Two piping hot kachoris and chai make a hearty Jaipur breakfast for under ₹100."
    }
  ]
};

export const TRANSPORTATION_OPTIONS = {
  goa: [
    {
      id: "t1",
      name: "Scooter / Activa Rental",
      mode: "Scooter",
      icon: "Bike",
      dailyCost: 400,
      totalCost: 1600, // for 4-5 days
      unit: "per day + fuel (~₹250)",
      recommended: true,
      recommendedBadge: "Best for your budget",
      pros: ["Freedom to explore any secret beach", "Easy parking anywhere", "Cheapest personal transit in Goa"],
      cons: ["Helmet mandatory", "Avoid late night dark village roads"]
    },
    {
      id: "t2",
      name: "Kadamba State Bus & Local Shuttles",
      mode: "Bus",
      icon: "Bus",
      dailyCost: 150,
      totalCost: 750,
      unit: "per day for 2 travelers",
      recommended: false,
      recommendedBadge: "Ultra-Shoestring",
      pros: ["Panaji to Mapusa / Calangute costs only ₹25-35", "Scenic routes through old Goan towns"],
      cons: ["Slower frequency", "Limited service after 8:30 PM"]
    },
    {
      id: "t3",
      name: "Local Taxi / GoaMiles Cab",
      mode: "Taxi",
      icon: "Car",
      dailyCost: 1400,
      totalCost: 5600,
      unit: "per day (point to point)",
      recommended: false,
      recommendedBadge: "Comfort Pick",
      pros: ["Air-conditioned", "Zero hassle navigating traffic"],
      cons: ["Significantly higher cost", "Goa local taxi unions have steep minimum fares"]
    }
  ],
  manali: [
    {
      id: "tm1",
      name: "Local HRTC Buses & Shared Sumos",
      mode: "Bus & Shared Jeep",
      icon: "Bus",
      dailyCost: 250,
      totalCost: 1000,
      unit: "per day for 2 travelers",
      recommended: true,
      recommendedBadge: "Best for your budget",
      pros: ["Manali to Solang Valley shared jeeps cost just ₹80/person", "Regular HRTC buses connecting towns"],
      cons: ["Fixed departure timings"]
    },
    {
      id: "tm2",
      name: "Rental Mountain Scooter / Royal Enfield",
      mode: "Bike",
      icon: "Bike",
      dailyCost: 700,
      totalCost: 2800,
      unit: "per day + fuel",
      recommended: false,
      recommendedBadge: "Adventurous",
      pros: ["Spectacular mountain biking experience", "Stop anywhere for photos"],
      cons: ["Requires confident mountain driving skills in traffic"]
    },
    {
      id: "tm3",
      name: "Private Cab Package",
      mode: "Cab",
      icon: "Car",
      dailyCost: 1800,
      totalCost: 7200,
      unit: "per day for sightseeing",
      recommended: false,
      recommendedBadge: "Family Friendly",
      pros: ["Warm heated car in chilly weather", "Direct hotel pickup"],
      cons: ["Eats into a budget traveler's wallet"]
    }
  ],
  jaipur: [
    {
      id: "tj1",
      name: "E-Rickshaws & Jaipur Metro",
      mode: "E-Rickshaw & Metro",
      icon: "CarTaxiFront",
      dailyCost: 300,
      totalCost: 900,
      unit: "per day for 2 travelers",
      recommended: true,
      recommendedBadge: "Best for your budget",
      pros: ["Effortlessly navigates congested bazaar lanes", "Fixed metro rates (₹10-20)"],
      cons: ["Negotiate e-rickshaw rate beforehand"]
    },
    {
      id: "tj2",
      name: "Auto Rickshaw Day Hire",
      mode: "Auto",
      icon: "Car",
      dailyCost: 650,
      totalCost: 1950,
      unit: "per day (covering Amer, Nahargarh)",
      recommended: false,
      recommendedBadge: "Convenient",
      pros: ["Driver acts as a local city guide", "Cover all 3 forts in one day"],
      cons: ["Confirm full itinerary upfront"]
    }
  ]
};

export const BUDGET_SAVING_TIPS = {
  goa: [
    {
      id: "tip1",
      icon: "Bed",
      title: "Stay in a hostel / homestay instead of a luxury resort",
      description: "Book social backpacker hostels in Anjuna or Candolim. You get clean AC dorms or budget private rooms plus free WiFi and common kitchens.",
      savingsAmount: 1800,
      savingsLabel: "Save approx ₹1,800"
    },
    {
      id: "tip2",
      icon: "Bike",
      title: "Rent a scooter instead of hiring tourist taxis",
      description: "Goa taxis charge ₹1,200 to ₹1,800 just for one airport or cross-beach trip. A scooter rental is only ₹400/day and gives complete freedom.",
      savingsAmount: 2400,
      savingsLabel: "Save approx ₹2,400"
    },
    {
      id: "tip3",
      icon: "Utensils",
      title: "Eat seafood thalis at local Goan joints",
      description: "Beachfront shacks often mark up food by 300%. Walk 300 meters inland to local joints like Anand or Vinayak for authentic Goan thalis at ₹220.",
      savingsAmount: 1200,
      savingsLabel: "Save approx ₹1,200"
    },
    {
      id: "tip4",
      icon: "Ticket",
      title: "Skip over-hyped watersport ticket brokers",
      description: "Book watersports directly at the water sports operator booth at Calangute/Morjim rather than third-party hotel agents to avoid commissions.",
      savingsAmount: 800,
      savingsLabel: "Save approx ₹800"
    }
  ],
  manali: [
    {
      id: "tipm1",
      icon: "Bus",
      title: "Take HRTC Volvo from Delhi/Chandigarh",
      description: "Government HRTC Volvo buses run overnight for ₹1,100 to ₹1,400 with great safety and comfort, saving ₹4,000+ compared to flights to Bhuntar.",
      savingsAmount: 3500,
      savingsLabel: "Save approx ₹3,500"
    },
    {
      id: "tipm2",
      icon: "Footprints",
      title: "Self-guided trek to Jogini Waterfall",
      description: "You do not need a tour package for Jogini Falls. It is an easy, picturesque marked 3 km walk from Vashisht village.",
      savingsAmount: 700,
      savingsLabel: "Save approx ₹700"
    },
    {
      id: "tipm3",
      icon: "Soup",
      title: "Savor local Himachali Siddu & street momos",
      description: "Fill up on traditional Himachali steamed Siddu with pure ghee (₹70-90) which keeps you satisfied and warm for hours.",
      savingsAmount: 900,
      savingsLabel: "Save approx ₹900"
    }
  ],
  jaipur: [
    {
      id: "tipj1",
      icon: "Ticket",
      title: "Buy the Composite Monument Entry Pass",
      description: "The Rajasthan Tourism composite ticket covers Amer Fort, Hawa Mahal, Jantar Mantar, Nahargarh, and Albert Hall for just ₹400 instead of buying individual tickets.",
      savingsAmount: 600,
      savingsLabel: "Save approx ₹600"
    },
    {
      id: "tipj2",
      icon: "Utensils",
      title: "Breakfast on street Pyaaz Kachori & Lassi",
      description: "Skip expensive hotel breakfasts. Jaipur's famous street kachoris and MI Road Lassiwala give royal taste under ₹100.",
      savingsAmount: 800,
      savingsLabel: "Save approx ₹800"
    }
  ]
};

// 5-Day Detailed Realistic Goa Itinerary matching user request specifications
export const GOA_5_DAY_ITINERARY = [
  {
    dayNumber: 1,
    title: "Arrival & North Goa Beaches",
    subtitle: "Check-in, beach vibes, historic fort & sunset dinner",
    dayCost: 2850,
    activities: [
      {
        id: "a101",
        time: "09:00 AM",
        place: "Arrival in Goa (Madgaon / Thivim / Dabolim)",
        description: "Arrive via train or flight. Pick up your pre-booked rental scooter (₹400/day) right outside the station or take an electric shuttle to your stay.",
        cost: 450,
        travelTime: "45 mins",
        category: "Transit",
        icon: "Train",
        tips: "Keep your driving license handy for scooter delivery."
      },
      {
        id: "a102",
        time: "10:30 AM",
        place: "Hotel Check-in & Freshen Up",
        description: "Check into Goa Backpackers Hostel / Palm Breeze Homestay. Unpack, grab a refreshing kokum cooler, and get ready for the beach.",
        cost: 0,
        travelTime: "20 mins",
        category: "Stay",
        icon: "Bed",
        tips: "Dorms have free secure digital lockers."
      },
      {
        id: "a103",
        time: "12:00 PM",
        place: "Baga Beach Stroll",
        description: "Walk along the golden sands of Baga Beach. Watch the parasailers and soak in the vibrant coastal atmosphere.",
        cost: 100,
        travelTime: "15 mins",
        category: "Sightseeing",
        icon: "Palmtree",
        tips: "Carry sunscreen and rent a beach lounger for ₹100 if you order a tender coconut."
      },
      {
        id: "a104",
        time: "02:00 PM",
        place: "Lunch at Anand Seafood & Thali Bar",
        description: "Relish an authentic Goan fish or vegetable curry thali with Sol Kadhi, fried fish/paneer, poee bread, and rice.",
        cost: 500,
        travelTime: "10 mins",
        category: "Food",
        icon: "Utensils",
        tips: "Ask for extra Sol Kadhi — it is great for digestion!"
      },
      {
        id: "a105",
        time: "04:00 PM",
        place: "Fort Aguada & Lighthouse",
        description: "Explore the 17th-century Portuguese fortress overlooking the vast Arabian Sea. Witness where freshwater springs once replenished passing ships.",
        cost: 100,
        travelTime: "25 mins",
        category: "Heritage",
        icon: "Landmark",
        tips: "Entry ticket is ₹50 per person. Great panoramic photography angles."
      },
      {
        id: "a106",
        time: "06:30 PM",
        place: "Calangute Beach Sunset & Street Market",
        description: "Watch a breathtaking Goan sunset over the waves, followed by shopping for cotton dresses, handmade souvenirs, and beach accessories.",
        cost: 300,
        travelTime: "15 mins",
        category: "Shopping & Sunset",
        icon: "Sunset",
        tips: "Bargaining is expected at the beachside stalls."
      },
      {
        id: "a107",
        time: "08:30 PM",
        place: "Dinner at Coastal Shack & Live Music",
        description: "Unwind with dinner by candlelit shacks featuring live acoustic acoustic Goan songs and fresh tandoori bites.",
        cost: 600,
        travelTime: "10 mins",
        category: "Dining",
        icon: "Music",
        tips: "Try the Goan Poi with butter or mushroom xacuti."
      }
    ]
  },
  {
    dayNumber: 2,
    title: "Forts, Flea Markets & Sunset Cliffs",
    subtitle: "Chapora Fort, Vagator cliffs, and legendary Anjuna vibes",
    dayCost: 3100,
    activities: [
      {
        id: "a201",
        time: "08:30 AM",
        place: "Breakfast at German Bakery Anjuna",
        description: "Freshly brewed Goan coffee, croissants, fluffy masala omelette or vegan chia pudding in an open garden cafe.",
        cost: 350,
        travelTime: "15 mins",
        category: "Food",
        icon: "Coffee",
        tips: "Grab an outdoor table under the banyan tree."
      },
      {
        id: "a202",
        time: "10:30 AM",
        place: "Chapora Fort ('Dil Chahta Hai' Fort)",
        description: "Hike up the red laterite stone ramparts of Chapora Fort overlooking the Vagator coastline and Ozran beach.",
        cost: 50,
        travelTime: "20 mins",
        category: "Heritage",
        icon: "Landmark",
        tips: "Wear comfortable walking shoes for the 10-minute climb."
      },
      {
        id: "a203",
        time: "01:00 PM",
        place: "Lunch at Vinayak Family Restaurant",
        description: "Beloved neighborhood Goan eatery serving homestyle Fish Thali, Veg Rava Fry, and local prawn curry.",
        cost: 480,
        travelTime: "15 mins",
        category: "Food",
        icon: "Utensils",
        tips: "Very popular with Goan locals; arrive before 1:45 PM."
      },
      {
        id: "a204",
        time: "03:30 PM",
        place: "Anjuna Beach & Flea Market Stroll",
        description: "Browse bohemian handicrafts, silver jewelry, handmade tote bags, and vintage music memorabilia.",
        cost: 400,
        travelTime: "15 mins",
        category: "Shopping",
        icon: "ShoppingBag",
        tips: "Carry cash as cellular network can be spotty around the flea market."
      },
      {
        id: "a205",
        time: "06:00 PM",
        place: "Vagator Hilltop Sunset & Thalassa View",
        description: "Catch golden hour atop the red cliffs overlooking Little Vagator. Mesmerizing sunset views with gentle sea breeze.",
        cost: 200,
        travelTime: "15 mins",
        category: "Nature",
        icon: "Sunset",
        tips: "One of Goa's most photographed sunset vantage spots."
      },
      {
        id: "a206",
        time: "08:30 PM",
        place: "Dinner & Night Vibes at Curlies Shack",
        description: "Enjoy thin crust pizza, Goan tapas, and beachside ambient soundscapes under fairy lights.",
        cost: 700,
        travelTime: "20 mins",
        category: "Nightlife",
        icon: "Moon",
        tips: "Reserve a seaside table upon arrival."
      }
    ]
  },
  {
    dayNumber: 3,
    title: "Old Goa Heritage & Panaji Latin Quarter",
    subtitle: "UNESCO Basilicas, colorful Fontainhas lanes, and Mandovi river",
    dayCost: 2600,
    activities: [
      {
        id: "a301",
        time: "09:00 AM",
        place: "Basilica of Bom Jesus & Se Cathedral (UNESCO)",
        description: "Visit the 400-year-old world-renowned baroque church holding the sacred remains of St. Francis Xavier.",
        cost: 0,
        travelTime: "35 mins",
        category: "Heritage",
        icon: "Church",
        tips: "Modest attire required (shoulders and knees covered). Free entry."
      },
      {
        id: "a302",
        time: "11:30 AM",
        place: "Walking Tour of Fontainhas (Latin Quarter)",
        description: "Wander through charming narrow alleys lined with vibrant mustard yellow and terracotta Portuguese houses, rooster weather vanes, and art galleries.",
        cost: 150,
        travelTime: "15 mins",
        category: "Culture",
        icon: "Camera",
        tips: "Visit Confeitaria 31 De Janeiro for fresh warm Bebinca and cashew biscuits."
      },
      {
        id: "a303",
        time: "01:30 PM",
        place: "Lunch at Navtara / Ritz Classic Panaji",
        description: "Treat yourself to a lavish Goan lunch thali with vegetarian and seafood specialties in the capital city.",
        cost: 450,
        travelTime: "10 mins",
        category: "Food",
        icon: "Utensils",
        tips: "Ritz Classic thalis are legendary in Panaji."
      },
      {
        id: "a304",
        time: "04:30 PM",
        place: "Miramar Beach & Dona Paula Viewpoint",
        description: "Breezy seaside promenade where the Mandovi and Zuari rivers meet the open Arabian Sea.",
        cost: 50,
        travelTime: "20 mins",
        category: "Sightseeing",
        icon: "Compass",
        tips: "Great spot for evening chai and roasted sweet corn."
      },
      {
        id: "a305",
        time: "06:30 PM",
        place: "Mandovi River Sunset Cruise (Budget Govt Ferry)",
        description: "Board the state tourism evening cruise on the Mandovi river featuring live Goan folk dance (Fugdi & Corridinho).",
        cost: 500,
        travelTime: "15 mins",
        category: "Entertainment",
        icon: "Ship",
        tips: "GTDC official jetty tickets are much cheaper than private casino ferries."
      },
      {
        id: "a306",
        time: "08:45 PM",
        place: "Dinner at Viva Panjim",
        description: "Authentic family-run heritage home serving Goan vindaloo, stuffed crab, and mushroom caldin in a cozy heritage alley.",
        cost: 650,
        travelTime: "15 mins",
        category: "Food",
        icon: "Utensils",
        tips: "Outdoor seating in the cobble lane is enchanting."
      }
    ]
  },
  {
    dayNumber: 4,
    title: "Serene South Goa & Hidden Waterfalls",
    subtitle: "Dudhsagar falls expedition or Palolem crescent beach serenity",
    dayCost: 3200,
    activities: [
      {
        id: "a401",
        time: "08:00 AM",
        place: "Road Trip to Dudhsagar Waterfalls / Mollem",
        description: "Journey towards the Western Ghats to witness the mighty 4-tiered milk-like cascades roaring through lush jungle.",
        cost: 850,
        travelTime: "70 mins",
        category: "Adventure",
        icon: "Mountain",
        tips: "Life jacket included with the forest department safari jeep."
      },
      {
        id: "a402",
        time: "01:30 PM",
        place: "Traditional Spice Plantation Lunch (Sahakari / Savoi)",
        description: "Guided tour through organic vanilla, cardamom, and cinnamon groves followed by an authentic buffet lunch served on betel leaves.",
        cost: 550,
        travelTime: "25 mins",
        category: "Culture & Food",
        icon: "TreePine",
        tips: "Includes complimentary herbal tea welcome and fresh spices tasting."
      },
      {
        id: "a403",
        time: "05:00 PM",
        place: "Palolem Beach Sunset & Kayaking",
        description: "Head to the calm, crescent-shaped bay of Palolem Beach in South Goa. Rent a kayak (₹250) into the gentle turquoise water.",
        cost: 350,
        travelTime: "50 mins",
        category: "Nature",
        icon: "Sunset",
        tips: "Palolem waters are extremely calm and safe for swimming."
      },
      {
        id: "a404",
        time: "08:00 PM",
        place: "Silent Noise / Beach Shack Acoustic Dinner",
        description: "Dine with your feet in the cool sand while lanterns illuminate the beach and waves lap against the shore.",
        cost: 650,
        travelTime: "10 mins",
        category: "Food",
        icon: "Utensils",
        tips: "Try grilled kingfish or stuffed paneer capsicum."
      }
    ]
  },
  {
    dayNumber: 5,
    title: "Leisure, Souvenirs & Farewell",
    subtitle: "Morning beach yoga, Mapusa spice shopping & departure",
    dayCost: 1900,
    activities: [
      {
        id: "a501",
        time: "07:30 AM",
        place: "Sunrise Walk & Yoga at Morjim Beach",
        description: "Quiet morning stroll along the pristine Olive Ridley turtle nesting beach with clear skies and calm waters.",
        cost: 0,
        travelTime: "20 mins",
        category: "Wellness",
        icon: "Sun",
        tips: "Much quieter than North Goa beaches; ideal for morning contemplation."
      },
      {
        id: "a502",
        time: "09:30 AM",
        place: "Lazy Breakfast at Baba Au Rhum",
        description: "Famous open-air French cafe hidden in bamboo trees. Artisan croissants, cappuccino, and sourdough toasts.",
        cost: 450,
        travelTime: "15 mins",
        category: "Food",
        icon: "Coffee",
        tips: "Their lemon tart and avocado toast are top tier."
      },
      {
        id: "a503",
        time: "11:30 AM",
        place: "Mapusa Friday / Municipal Bazaar",
        description: "Pick up authentic Goan spices, homemade Feni, Goan Chorizo / dried mangoes, and cashew nuts at wholesale market prices.",
        cost: 600,
        travelTime: "20 mins",
        category: "Shopping",
        icon: "ShoppingBag",
        tips: "Buy whole W-180 cashews for the best gift at half airport prices."
      },
      {
        id: "a504",
        time: "02:00 PM",
        place: "Farewell Thali Lunch & Hotel Checkout",
        description: "Final hearty coastal meal, packing bags, returning the rental scooter, and heading to the station/airport.",
        cost: 450,
        travelTime: "20 mins",
        category: "Food & Transit",
        icon: "Luggage",
        tips: "Keep digital tickets ready on your phone."
      }
    ]
  }
];

// Default Saved Trips for the user dashboard
export const DEFAULT_SAVED_TRIPS = [
  {
    id: "trip-goa-2026",
    destination: "Goa",
    startingLocation: "Rajkot",
    state: "Goa",
    days: 5,
    travelers: 2,
    budget: 20000,
    estimatedCost: 17450,
    remainingBudget: 2550,
    dates: "Nov 14 – Nov 19",
    status: "Upcoming",
    travelStyle: "Relaxed & Beach",
    interests: ["Beaches", "Food", "Heritage", "Nightlife"],
    foodPreference: "Both Veg & Non-Veg",
    stayPreference: "Hostel / Homestay",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop",
    budgetBreakdown: {
      travel: 4500,
      stay: 4000,
      food: 3500,
      activities: 4000,
      misc: 1450
    },
    itinerary: GOA_5_DAY_ITINERARY,
    hotel: {
      name: "Goa Backpackers Hostel",
      rating: 4.6,
      pricePerNight: 700,
      totalCost: 2800,
      location: "Anjuna, North Goa",
      badge: "Best Value"
    },
    notes: [
      "Book scooter rental at Thivim station",
      "Carry sunscreen SPF 50 and cotton shirts",
      "Don't miss Fontainhas bakery Bebinca"
    ],
    checklist: [
      { id: "c1", text: "ID Proofs (Aadhaar / Driving License)", done: true },
      { id: "c2", text: "Comfortable beachwear and flip-flops", done: true },
      { id: "c3", text: "Power bank and charging cables", done: false },
      { id: "c4", text: "Sunscreen and sunglasses", done: true },
      { id: "c5", text: "Cash for flea market stalls", done: false }
    ]
  },
  {
    id: "trip-manali-2026",
    destination: "Manali",
    startingLocation: "Delhi",
    state: "Himachal Pradesh",
    days: 4,
    travelers: 2,
    budget: 18000,
    estimatedCost: 15800,
    remainingBudget: 2200,
    dates: "Dec 08 – Dec 12",
    status: "Upcoming",
    travelStyle: "Adventure & Mountains",
    interests: ["Mountains", "Adventure", "Nature"],
    foodPreference: "Vegetarian",
    stayPreference: "Hostel",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1000&auto=format&fit=crop",
    budgetBreakdown: {
      travel: 3800,
      stay: 3600,
      food: 3200,
      activities: 3800,
      misc: 1400
    },
    itinerary: [],
    hotel: {
      name: "Zostel Old Manali",
      rating: 4.7,
      pricePerNight: 650,
      totalCost: 2600,
      location: "Old Manali",
      badge: "Best Value"
    },
    notes: ["Book HRTC Volvo from Kashmiri Gate ISBT Delhi"],
    checklist: [
      { id: "cm1", text: "Warm thermal inners & fleece jacket", done: true },
      { id: "cm2", text: "Waterproof trekking shoes", done: true },
      { id: "cm3", text: "Gloves and woollen beanie", done: false }
    ]
  },
  {
    id: "trip-jaipur-2025",
    destination: "Jaipur",
    startingLocation: "Ahmedabad",
    state: "Rajasthan",
    days: 3,
    travelers: 3,
    budget: 15000,
    estimatedCost: 13200,
    remainingBudget: 1800,
    dates: "Feb 10 – Feb 13",
    status: "Completed",
    travelStyle: "Heritage & Food",
    interests: ["Heritage", "Food", "Photography"],
    foodPreference: "Vegetarian",
    stayPreference: "Budget Hotel",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop",
    budgetBreakdown: {
      travel: 3200,
      stay: 3800,
      food: 2900,
      activities: 2300,
      misc: 1000
    },
    itinerary: [],
    hotel: {
      name: "Moustache Jaipur Heritage",
      rating: 4.8,
      pricePerNight: 600,
      totalCost: 1800,
      location: "MI Road, Jaipur",
      badge: "Heritage Pick"
    },
    notes: ["Try Dal Baati Churma at Chokhi Dhani"],
    checklist: []
  }
];

export const USER_PROFILE_DATA = {
  name: "Parth Sharma",
  email: "parth.sharma@tripsathi.in",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  location: "Rajkot, Gujarat",
  memberSince: "January 2025",
  stats: {
    tripsPlanned: 4,
    moneySaved: "₹18,500",
    statesVisited: 8,
    reviewsGiven: 12
  },
  preferences: {
    favoriteStyle: "Backpacking & Adventure",
    foodPreference: "Vegetarian & Local Street Food",
    accommodation: "Hostel & Boutique Homestays",
    budgetPhilosophy: "Smart Budget (High experience, low fluff)"
  },
  savedPlaces: [
    { name: "Fort Aguada", dest: "Goa", type: "Heritage" },
    { name: "Hadimba Temple", dest: "Manali", type: "Culture" },
    { name: "Hawa Mahal", dest: "Jaipur", type: "Architecture" },
    { name: "Ambrai Ghat", dest: "Udaipur", type: "Sunset View" }
  ]
};
