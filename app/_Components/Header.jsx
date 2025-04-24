"use client";
import React, { useState } from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "../_Context/UserContext";

const navLinks = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Courses", link: "/course" },
  { id: 3, name: "Team", link: "/team" },
  { id: 4, name: "Get In Touch", link: "/#footer" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { profileImage, isLoggedIn, logout, email } = useUser();
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const getUserInitial = () => {
    if (!email) return "U"; // Default fallback
    return email.charAt(0).toUpperCase();
  };

  return (
    <header className="w-full bg-[#F1E7E7] dark:bg-gray-900 text-[#E69DB8] shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="logo" width={50} height={50} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center font-semibold text-lg">
          {navLinks.map(({ id, name, link }) => (
            <Link
              key={id}
              href={link}
              className="transition-colors duration-300 hover:text-gray-600"
            >
              {name}
            </Link>
          ))}
        </nav>

        {/* Right Desktop Section */}
        <div className="hidden md:flex items-center gap-6 relative">
          <ShoppingCart className="cursor-pointer hover:text-gray-600 transition-colors duration-300" />
          {isLoggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className="font-semibold text-lg hover:text-gray-600 transition-colors duration-300"
              >
                Logout
              </button>
              <div className="relative">
                <button onClick={toggleProfileMenu}>
                  {profileImage ? (
                    <Image
                      src={`data:image/png;base64,${profileImage}`}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-[#E69DB8] cursor-pointer"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500 text-white font-bold text-lg border-2 border-[#E69DB8] cursor-pointer">
                      {getUserInitial()}
                    </div>
                  )}
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
                    <ul className="py-2">
                      <li
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => alert("Change Profile Image")}
                      >
                        Change Profile Image
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => alert("Settings")}
                      >
                        Settings
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              href="/signin"
              className="font-semibold text-lg hover:text-gray-600 transition-colors duration-300"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <X size={30} className="text-gray-800" />
          ) : (
            <Menu size={30} className="text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
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
              {navLinks.map(({ id, name, link }) => (
                <Link
                  key={id}
                  href={link}
                  onClick={toggleMenu}
                  className="py-3 text-center text-lg hover:bg-red-300 dark:hover:bg-gray-800 transition-colors"
                >
                  {name}
                </Link>
              ))}
              <div className="py-4 flex justify-center items-center gap-4">
                <ShoppingCart className="cursor-pointer hover:text-gray-100" />
              </div>
              <div className="flex py-3 justify-center">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="text-lg hover:text-gray-700 dark:hover:bg-gray-800 transition-colors"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/signin"
                    className="text-lg hover:text-gray-700 dark:hover:bg-gray-800 transition-colors"
                  >
                    Login
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