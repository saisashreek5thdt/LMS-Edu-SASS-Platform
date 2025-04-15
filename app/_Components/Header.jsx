"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUser } from "../_Context/UserContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { profileImage, isLoggedIn, logout } = useUser();
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // const navLinks = ["Home", "Courses", "Team", "Contact Us"];

  const navLinks = [
    {
      id: 1,
      name: "Home",
      link: "/",
    },
    {
      id: 2,
      name: "Courses",
      link: "/course",
    },
    {
      id: 3,
      name: "Team",
      link: "/team",
    },
    {
      id: 4,
      name: "Get In Touch",
      link: "/#footer",
    },
  ];

  const handleLogout = () => {
    logout(); // Call the logout function from context
    router.push("/"); // Redirect to the home page
  };

  return (
    <header className="w-full bg-[#F1E7E7] dark:bg-gray-900 text-[#E69DB8] shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="logo" width={50} height={50} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center font-semibold text-lg">
          {navLinks.map((link) => (
            <Link href={link.link} key={link}>
              <span className="transition-colors duration-300 cursor-pointer">
                {link.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Right section - desktop */}
        <div className="hidden md:flex items-center gap-6 relative">
          <ShoppingCart className="cursor-pointer hover:text-gray-600 transition-colors duration-300" />

          {/* Login/Logout Button */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="font-semibold text-lg hover:text-gray-600 hover:font-bold transition-colors duration-300"
            >
              Logout
            </button>
          ) : (
            <Link href="/signin">
              <h2 className="font-semibold text-lg hover:text-gray-600 hover:font-bold transition-colors duration-300">
                Login
              </h2>
            </Link>
          )}

          {/* Profile Image Button */}
          {profileImage && isLoggedIn && (
            <div className="relative">
              <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
                <Image
                  src={profileImage}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-[#E69DB8] cursor-pointer"
                />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && isLoggedIn && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
                  <ul className="py-2">
                    <li
                      className="px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => alert("Change Profile Image")}
                    >
                      Change Profile Image
                    </li>
                    <li
                      className="px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => alert("Settings")}
                    >
                      Settings
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden focus:outline-none transition-all duration-300"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={30} className="text-gray-800" />
          ) : (
            <Menu size={30} className="text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown with animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden text-gray-600 dark:bg-gray-900 overflow-hidden"
          >
            <div className="flex flex-col divide-y divide-white/20 dark:divide-gray-600">
              {navLinks.map((link) => (
                <Link
                  href={link.link}
                  key={link}
                  onClick={toggleMenu}
                  className="py-3 text-center text-lg hover:bg-red-300 dark:hover:bg-gray-800 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              {/* Shopping Cart */}
              <div className="py-4 flex justify-center items-center gap-4">
                <ShoppingCart className="cursor-pointer hover:text-gray-100" />
              </div>
              {/* Login/Logout */}
              <div className="flex py-3 text-center">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="text-lg hover:text-gray-700 dark:hover:bg-gray-800 transition-colors"
                  >
                    Logout
                  </button>
                ) : (
                  <Link href="/signin">
                    <h2 className="text-lg hover:text-gray-700 dark:hover:bg-gray-800 transition-colors">
                      Login
                    </h2>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
