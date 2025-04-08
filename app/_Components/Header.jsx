"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = ["Home", "Resources", "Courses", "Team", "Contact Us"];

  return (
    <header className="w-full bg-red-400 dark:bg-gray-900 text-white shadow-md fixed z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="logo" width={50} height={50} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center font-semibold text-lg">
          {navLinks.map((link) => (
            <Link href={`${link.toLowerCase().replace(/\s+/g, "")}`} key={link}>
              <span className="hover:text-gray-100 transition-colors duration-300 cursor-pointer">
                {link}
              </span>
            </Link>
          ))}
        </nav>

        {/* Right section - desktop */}
        <div className="hidden md:flex items-center gap-6">
          <ShoppingCart className="cursor-pointer hover:text-gray-100 transition-colors duration-300" />
          <button className="font-semibold text-lg hover:text-gray-100 transition-colors duration-300">
            Login
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden focus:outline-none transition-all duration-300"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={30} className="text-white" />
          ) : (
            <Menu size={30} className="text-white" />
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
            className="md:hidden bg-red-400 dark:bg-gray-900 overflow-hidden"
          >
            <div className="flex flex-col divide-y divide-white/20 dark:divide-gray-600">
              {navLinks.map((link) => (
                <Link
                  href={`${link.toLowerCase().replace(/\s+/g, "")}`}
                  key={link}
                  onClick={toggleMenu}
                  className="py-3 text-center text-lg hover:bg-red-300 dark:hover:bg-gray-800 transition-colors"
                >
                  {link}
                </Link>
              ))}
              {/* Shopping Cart */}
              <div className="py-4 flex justify-center items-center gap-4">
                <ShoppingCart className="cursor-pointer hover:text-gray-100" />
              </div>
              {/* Login */}
              <div className="py-3 text-center hover:bg-red-300 dark:hover:bg-gray-800 transition-colors">
                <button className="text-lg">Login</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
