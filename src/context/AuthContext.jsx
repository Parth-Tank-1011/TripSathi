import React, { createContext, useContext, useState, useEffect } from "react";
import { USER_PROFILE_DATA } from "../data/mockData";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("tripsathi_user");
      return saved ? JSON.parse(saved) : USER_PROFILE_DATA;
    } catch {
      return USER_PROFILE_DATA;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: "login" });

  useEffect(() => {
    if (user) {
      localStorage.setItem("tripsathi_user", JSON.stringify(user));
    }
  }, [user]);

  const login = (userData) => {
    setUser((prev) => ({
      ...prev,
      ...userData
    }));
    setIsLoggedIn(true);
    setAuthModal({ isOpen: false, mode: "login" });
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const updateUser = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const openAuthModal = (mode = "login") => {
    setAuthModal({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: "login" });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        updateUser,
        authModal,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
