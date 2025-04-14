"use client";
import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(null); // store profile image path
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setProfileImage(null); // Clear profile image on logout
  };

  return (
    <UserContext.Provider value={{ profileImage, setProfileImage, isLoggedIn, login, logout}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
