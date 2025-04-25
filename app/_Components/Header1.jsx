"use client";
import React, { useState } from "react";
import Image from "next/image";
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

export default function Header1() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const { profileImage, isLoggedIn, logout, email } = useUser();
    const router = useRouter();
    return (
        <>
            <div className="flex justify-center items-center my-2">
                <div className="bg-[#454545] rounded-full h-16 w-[60%] flex justify-around items-center">
                    <Link href="/" className="flex items-center">
                        <Image src="/logo.svg" alt="logo" width={50} height={50} />
                    </Link>
                    <nav className="hidden md:flex gap-6 items-center font-semibold text-lg text-white">
                        {navLinks.map(({ id, name, link }) => (
                            <Link
                                key={id}
                                href={link}
                                className="transition-colors duration-300 hover:text-yellow-50"
                            >
                                {name}
                            </Link>
                        ))}

                        <div className="hidden md:flex items-center gap-6 relative">
                            <ShoppingCart className="cursor-pointer hover:text-yellow-50 transition-colors duration-300" />
                            {isLoggedIn ? (
                                <>
                                    <button
                                        onClick={handleLogout}
                                        className="font-semibold text-lg hover:text-yellow-50 transition-colors duration-300"
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
                                    className="font-semibold text-lg hover:text-yellow-50 transition-colors duration-300"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}