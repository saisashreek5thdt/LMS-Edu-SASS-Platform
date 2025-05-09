"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa6";

export default function DiscussionDetails({ params }) {
    const router = useRouter();
    const { id } = params;

    // Simulated topics data
    const initialTopics = [
        {
            id: 1,
            title: "How to create a design system?",
            author: "design New Member",
            createdAt: "25 minutes ago",
            comments: 20,
            category: "Design",
            description: "A comprehensive guide to building scalable and maintainable design systems.",
        },
        {
            id: 2,
            title: "User testing feedback important?",
            author: "ux researcher",
            createdAt: "20 minutes ago",
            comments: 10,
            category: "Product Management",
            description: "Discuss the importance of user testing in the design process.",
        },
        {
            id: 3,
            title: "Collaborating in Figma with remote teams?",
            author: "product manager",
            createdAt: "15 minutes ago",
            comments: 30,
            category: "Development",
            description: "Tips and best practices for effective collaboration in Figma with remote teams.",
        },
        {
            id: 4,
            title: "Best plugins for Figma?",
            author: "graphic designer",
            createdAt: "10 minutes ago",
            comments: 25,
            category: "Tools",
            description: "Recommendations for enhancing productivity in Figma.",
        },
        {
            id: 5,
            title: "Figma to code workflow",
            author: "web developer",
            createdAt: "5 minutes ago",
            comments: 18,
            category: "Development",
            description: "Best practices for converting Figma designs into code.",
        },
    ];

    // State for sorting and filtering
    const [sortBy, setSortBy] = useState("createdAt");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showCategoryMenu, setShowCategoryMenu] = useState(false);

    // Available categories (auto-generated from topics)
    const allCategories = ["All", ...new Set(initialTopics.map((t) => t.category))];

    // Filter and sort topics
    const filteredTopics = selectedCategory
        ? initialTopics.filter((topic) => topic.category === selectedCategory)
        : initialTopics;

    const sortedTopics = [...filteredTopics].sort((a, b) => {
        if (sortBy === "createdAt") {
            return new Date(b.createdAt) - new Date(a.createdAt); // Newest first
        }
        return 0;
    });

    // Handle click on category
    const handleCategoryClick = (category) => {
        setSelectedCategory(category === "All" ? "" : category);
        setShowCategoryMenu(false);
    };

    return (
        <div className="mt-14 px-4 sm:px-3 md:px-5 lg:px-28 xl:px-28 w-full h-full p-4">
            {/* Back Button */}
            <div className="flex items-center gap-2 mb-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-lg font-medium text-gray-600 hover:text-gray-800"
                >
                    <FiChevronLeft /> Back
                </button>
            </div>

            {/* Header with Tabs and Create Button */}
            <div className="flex justify-between items-center mb-4">
                {/* Tabs */}
                <div className="flex gap-4 relative">
                    <button
                        onClick={() => setSortBy("createdAt")}
                        className={`text-lg font-medium ${
                            sortBy === "createdAt" ? "text-black" : "text-gray-500"
                        }`}
                    >
                        Latest
                    </button>
                    <button
                        onClick={() => setSortBy("likes")}
                        className="text-lg font-medium text-gray-500"
                    >
                        Hot
                    </button>

                    {/* Categories Dropdown Button */}
                    <button
                        onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                        className="text-lg font-medium text-gray-500 relative"
                    >
                        Categories <span className="ml-1">▾</span>
                    </button>

                    {/* Dropdown Menu */}
                    {showCategoryMenu && (
                        <div className="absolute top-8 left-0 bg-white border rounded shadow-md z-10">
                            <ul className="py-2">
                                {allCategories.map((cat, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleCategoryClick(cat)}
                                        className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                    >
                                        {cat}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Create Button */}
                <button
                    onClick={() => router.push(`/discussion/${id}/create-topic`)}
                    className="bg-black text-white font-bold text-lg px-4 py-2 rounded-md"
                >
                    + Create
                </button>
            </div>

            {/* Topic List */}
            <div className="space-y-4">
                {sortedTopics.map((topic) => (
                    <div
                        key={topic.id}
                        className="border-b border-gray-200 pb-4 last-of-type:border-b-0 cursor-pointer"
                        onClick={() => router.push(`/discussion/${id}/topic/${topic.id}`)}
                    >
                        {/* User Info */}
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                            <div>
                                <p className="text-sm font-medium">{topic.author}</p>
                                <p className="text-xs text-gray-500">{topic.createdAt}</p>
                            </div>
                        </div>

                        {/* Title and Description */}
                        <div>
                            <h3 className="text-lg font-semibold mb-1">{topic.title}</h3>
                            <p className="text-sm text-gray-600">{topic.description}</p>
                        </div>

                        {/* Interaction Icons */}
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <FaRegCommentDots />
                                <span>{topic.comments}</span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}