/* eslint-disable react-hooks/exhaustive-deps */
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

  const STORAGE_KEY = "app-user-auth";
  const isIndexedDBAvailable = typeof indexedDB !== "undefined";

  // Dummy login
  const dummyUsers = {
    "sai@5thdt.com": { type: "school" },
    "sashreek@5thdt.com": { type: "tutor" },
    "rakesh@5thdt.com": { type: "teacher" },
    "rakeshv@5thdt.com": { type: "student" },
  };

  const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("UserDB", 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("AuthStore")) {
          db.createObjectStore("AuthStore");
        }
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        console.error("IndexedDB open error:", event.target.error);
        reject(event.target.error);
      };
    });
  };

  const saveToStorage = async (data) => {
    const payload = {
      ...data,
      expiry: Date.now() + TOKEN_EXPIRY_MS,
    };

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

  const clearStorage = async () => {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);

    if (isIndexedDBAvailable) {
      try {
        const db = await openDatabase();
        const tx = db.transaction("AuthStore", "readwrite");
        const store = tx.objectStore("AuthStore");
        store.delete(STORAGE_KEY);
      } catch (err) {
        console.error("Failed to clear from IndexedDB:", err);
      }
    }
  };

  const login = async (email, password) => {
    if (password === "password123" && dummyUsers[email]) {
      const userInfo = {
        id: Math.floor(Math.random() * 1000000).toString(),
        type: dummyUsers[email].type,
      };

      setIsLoggedIn(true);
      setUserType(userInfo.type);
      setUserId(userInfo.id);
      saveToStorage(userInfo);
      return userInfo;
    }

    setIsLoggedIn(false);
    clearStorage();
    return null;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setProfileImage(null);
    setUserType(null);
    setUserId(null);
    clearStorage();
  };

  const loadUserFromStorage = () => {
    try {
      const stored =
        JSON.parse(localStorage.getItem(STORAGE_KEY)) ||
        JSON.parse(sessionStorage.getItem(STORAGE_KEY));

      if (stored && stored.expiry > Date.now()) {
        setIsLoggedIn(true);
        setUserType(stored.type);
        setUserId(stored.id);
      } else {
        logout();
      }
    } catch (err) {
      console.error("Failed to load user from storage:", err);
      logout();
    }
  };

  useEffect(() => {
    loadUserFromStorage();

    // Shared storage (cross-tab logout/login sync)
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
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
