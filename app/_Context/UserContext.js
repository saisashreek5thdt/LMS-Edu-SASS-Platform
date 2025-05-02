"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

// Expiry: 1 Day
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000;
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);
  const [plan, setPlan] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [email, setEmail] = useState(null); // Store user email
  const STORAGE_KEY = "app-user-auth";

  // Check if IndexedDB is available
  const isIndexedDBAvailable = typeof indexedDB !== "undefined";

  // Recreate the database with a new store
  const recreateDatabaseWithStore = () => {
    return new Promise((resolve, reject) => {
      const deleteRequest = indexedDB.deleteDatabase("UserDB");
      deleteRequest.onsuccess = () => {
        const createRequest = indexedDB.open("UserDB", 1);
        createRequest.onupgradeneeded = (event) => {
          const db = event.target.result;
          db.createObjectStore("AuthStore");
        };
        createRequest.onsuccess = (event) => resolve(event.target.result);
        createRequest.onerror = (event) => reject(event.target.error);
      };
      deleteRequest.onerror = (event) => reject(event.target.error);
    });
  };

  // Open the database
  const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("UserDB", 1);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("AuthStore")) {
          db.createObjectStore("AuthStore");
        }
      };
      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = (event) => reject(event.target.error);
    });
  };

  // Save user data to storage
  const saveToStorage = async (data) => {
    const payload = { ...data, expiry: Date.now() + TOKEN_EXPIRY_MS };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    if (isIndexedDBAvailable) {
      try {
        const db = await openDatabase();
        const tx = db.transaction("AuthStore", "readwrite");
        const store = tx.objectStore("AuthStore");
        store.put(payload, STORAGE_KEY);
      } catch (err) {
        console.error("Failed to save to IndexedDB:", err);
      }
    }
  };

  // Clear user data from storage
  const clearStorage = async () => {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    if (isIndexedDBAvailable) {
      try {
        let db = await openDatabase();
        if (!db.objectStoreNames.contains("AuthStore")) {
          db.close();
          db = await recreateDatabaseWithStore();
        }
        const tx = db.transaction("AuthStore", "readwrite");
        const store = tx.objectStore("AuthStore");
        store.delete(STORAGE_KEY);
      } catch (err) {
        console.error("Failed to clear from IndexedDB:", err);
      }
    }
  };

  // Login function
  const login = (userData) => {
    const { id, type, email, logo, plan } = userData;
    setIsLoggedIn(true);
    setUserType(type);
    setUserId(id);
    setEmail(email);
    if (logo) setProfileImage(logo); // Set profile image if provided
    saveToStorage({ id, type, email, logo, plan });
  };

  // Logout function
  const logout = () => {
    setIsLoggedIn(false);
    setProfileImage(null);
    setUserType(null);
    setUserId(null);
    setEmail(null);
    clearStorage();
  };

  // Load user data from storage on app load
  const loadUserFromStorage = () => {
    try {
      const stored =
        JSON.parse(localStorage.getItem(STORAGE_KEY)) ||
        JSON.parse(sessionStorage.getItem(STORAGE_KEY));
      if (stored && stored.expiry > Date.now()) {
        setIsLoggedIn(true);
        setUserType(stored.type);
        setUserId(stored.id);
        setPlan(stored.plan);
        setEmail(stored.email);
        if (stored.logo) setProfileImage(stored.logo); // Restore profile image
      } else {
        logout();
      }
    } catch (err) {
      console.error("Failed to load user from storage:", err);
      logout();
    }
  };

  // Sync login/logout across tabs
  useEffect(() => {
    loadUserFromStorage();
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY) {
        loadUserFromStorage();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <UserContext.Provider
      value={{
        profileImage,
        setProfileImage,
        isLoggedIn,
        userType,
        userId,
        email,
        login,
        logout,
        plan,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);