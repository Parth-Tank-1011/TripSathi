import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TripProvider } from "./context/TripContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AuthModal from "./components/modals/AuthModal";

// Pages
import LandingPage from "./pages/LandingPage";
import PlannerPage from "./pages/PlannerPage";
import TripResultsPage from "./pages/TripResultsPage";
import ExplorePage from "./pages/ExplorePage";
import MyTripsPage from "./pages/MyTripsPage";
import TripDetailsPage from "./pages/TripDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <TripProvider>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-teal-500 selection:text-white">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/planner" element={<PlannerPage />} />
                <Route path="/results" element={<TripResultsPage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/my-trips" element={<MyTripsPage />} />
                <Route path="/my-trips/:id" element={<TripDetailsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            <AuthModal />
          </div>
        </TripProvider>
      </AuthProvider>
    </Router>
  );
}
