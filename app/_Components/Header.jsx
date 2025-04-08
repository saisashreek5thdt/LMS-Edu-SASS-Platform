"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ShoppingCart, Menu } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="w-full h-20 bg-red-400 flex justify-around items-center relative">
        {/* Logo */}
        <div className="cursor-pointer">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={50} height={50} />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-5 text-white text-lg font-semibold">
          <span className="cursor-pointer">Home</span>
          <span className="cursor-pointer">Resources</span>
          <span className="cursor-pointer">Courses</span>
          <span className="cursor-pointer">Team</span>
          <span className="cursor-pointer">Contact Us</span>
        </div>

        {/* Right Section (Desktop) */}
        <div className="hidden md:flex gap-8">
          <div className="text-white cursor-pointer">
            <ShoppingCart />
          </div>
          <div className="text-white font-semibold text-lg cursor-pointer">Login</div>
        </div>

        {/* Mobile Menu Button */}
        <div
          className="md:hidden text-white cursor-pointer"
          onClick={toggleMenu}
        >
          <Menu size={30} />
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-red-400 text-white py-4 flex flex-col items-center space-y-4 z-10">
            <span className="cursor-pointer">Home</span>
            <hr className="h-1 w-11/12 text-red-100" />
            <span className="cursor-pointer">Resources</span>
            <hr className="h-1 w-11/12 text-red-100" />
            <span className="cursor-pointer">Courses</span>
            <hr className="h-1 w-11/12 text-red-100" />
            <span className="cursor-pointer">Team</span>
            <hr className="h-1 w-11/12 text-red-100" />
            <span className="cursor-pointer">Contact Us</span>
            <hr className="h-1 w-11/12 text-red-100" />
            <div className="flex gap-4">
              <ShoppingCart className="cursor-pointer" />
              <span className="cursor-pointer">Login</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
