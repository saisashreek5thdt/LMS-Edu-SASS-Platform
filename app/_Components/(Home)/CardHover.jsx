"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { BookOpenCheck } from "lucide-react";
import { useState } from "react";

export default function CardHover() {
    // State to track the hovered card index
    const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

    // Array of card data to avoid hardcoding
    const cards = [
        {
            title: "Find Your Module/Course",
            description: "Choose your course from our library",
        },
        {
            title: "Explore Course Details",
            description: "Select and explore detailed course information",
        },
        {
            title: "Enroll in Your Course",
            description: "Complete enrollment and start learning",
        },
    ];

    return (
        <>
            <div className="w-full flex flex-col mt-20 justify-center items-center gap-20">
                <h1 className="text-center text-2xl font-semibold text-gray-500">
                    HOW IT WORKS
                </h1>
                <div className="flex gap-10">
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            className={`w-[300px] h-[325px] bg-gray-100 flex flex-col rounded-3xl overflow-hidden relative transition-all duration-500`}
                            onMouseEnter={() => setHoveredCardIndex(index)}
                            onMouseLeave={() => setHoveredCardIndex(null)}
                        >
                            {/* Expanding Circle */}
                            <div
                                className={`absolute inset-0 bg-red-400 rounded-full transition-all duration-500 ${
                                    hoveredCardIndex === index
                                        ? "scale-150"
                                        : "scale-0"
                                }`}
                            ></div>

                            <CardContent
                                className={`relative z-10 flex justify-center items-center flex-col p-10 transition-all duration-500 ${
                                    hoveredCardIndex === index
                                        ? "text-white"
                                        : "text-gray-400"
                                }`}
                            >
                                <BookOpenCheck className="w-16 h-16 mt-5" />
                                <p className="text-center text-base">
                                    {card.description}
                                </p>
                            </CardContent>
                            <CardFooter
                                className={`relative z-10 w-full h-20 rounded-b-3xl mt-10 flex items-center justify-center transition-all duration-500 ${
                                    hoveredCardIndex === index
                                        ? "bg-slate-500 text-white"
                                        : "bg-transparent text-transparent"
                                }`}
                            >
                                <p className="text-center text-xl">
                                    {card.title}
                                </p>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}