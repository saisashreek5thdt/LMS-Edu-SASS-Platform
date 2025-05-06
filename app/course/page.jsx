"use client";
import Image from "next/legacy/image";
import React, { useState } from "react";
import CourseCard from "../_Components/Courses/CourseCard";
import Link from 'next/link';



const dummyCourses = [
  {
    slug: 1,
    title: "Next.js Mastery",
    description: "Become a full-stack Next.js developer.",
    price: 49.99,
    skills: ["Next.js", "React", "API Routes"],
    highlights: ["Build SSR apps", "Learn API routing", "Deploy to Vercel"],
    instructor: "John Smith",
  },
  {
    slug: 2,
    title: "TailwindCSS Pro",
    description: "Design fast, responsive UIs effortlessly.",
    price: 29.99,
    skills: ["Tailwind", "Responsive Design"],
    highlights: ["Utility classes", "Real projects", "Dark mode"],
    instructor: "Sara Lee",
  },
  {
    slug: 3,
    title: "Next.js Mastery",
    description: "Become a full-stack Next.js developer.",
    price: 49.99,
    skills: ["Next.js", "React", "API Routes"],
    highlights: ["Build SSR apps", "Learn API routing", "Deploy to Vercel"],
    instructor: "John Smith",
  },
  {
    slug: 4,
    title: "TailwindCSS Pro",
    description: "Design fast, responsive UIs effortlessly.",
    price: 29.99,
    skills: ["Tailwind", "Responsive Design"],
    highlights: ["Utility classes", "Real projects", "Dark mode"],
    instructor: "Sara Lee",
  },
  {
    slug: 5,
    title: "Next.js Mastery",
    description: "Become a full-stack Next.js developer.",
    price: 49.99,
    skills: ["Next.js", "React", "API Routes"],
    highlights: ["Build SSR apps", "Learn API routing", "Deploy to Vercel"],
    instructor: "John Smith",
  },
  {
    slug: 6,
    title: "TailwindCSS Pro",
    description: "Design fast, responsive UIs effortlessly.",
    price: 29.99,
    skills: ["Tailwind", "Responsive Design"],
    highlights: ["Utility classes", "Real projects", "Dark mode"],
    instructor: "Sara Lee",
  },
  {
    slug: 7,
    title: "Next.js Mastery",
    description: "Become a full-stack Next.js developer.",
    price: 49.99,
    skills: ["Next.js", "React", "API Routes"],
    highlights: ["Build SSR apps", "Learn API routing", "Deploy to Vercel"],
    instructor: "John Smith",
  },
  {
    slug: 8,
    title: "TailwindCSS Pro",
    description: "Design fast, responsive UIs effortlessly.",
    price: 29.99,
    skills: ["Tailwind", "Responsive Design"],
    highlights: ["Utility classes", "Real projects", "Dark mode"],
    instructor: "Sara Lee",
  },
  {
    slug: 9,
    title: "Next.js Mastery",
    description: "Become a full-stack Next.js developer.",
    price: 49.99,
    skills: ["Next.js", "React", "API Routes"],
    highlights: ["Build SSR apps", "Learn API routing", "Deploy to Vercel"],
    instructor: "John Smith",
  },
  {
    slug: 10,
    title: "TailwindCSS Pro",
    description: "Design fast, responsive UIs effortlessly.",
    price: 29.99,
    skills: ["Tailwind", "Responsive Design"],
    highlights: ["Utility classes", "Real projects", "Dark mode"],
    instructor: "Sara Lee",
  },
  // Add more as needed
];

export default function Course() {
  const [page, setPage] = useState(1);
  const perPage = 8;
  const totalPages = Math.ceil(dummyCourses.length / perPage);

  const handlePageChange = (num) => setPage(num);

  return (
    <>
      <div className="min-h-screen w-full">
        {/* Course Info BG Start */}
        <div className="bg-gradient-to-tr from-purple-500 via-slate-500 to-sky-500 py-10 px-4 md:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 items-start gap-8">
            {/* Course Image (top on mobile, side on desktop) */}
            <div className="order-1 md:order-2 w-full flex justify-center">
              <Image
                src="https://dummyjson.com/image/200x100"
                width={400}
                height={250}
                className="object-contain rounded-lg w-full max-w-sm"
                alt="Course Image"
              />
            </div>

            {/* Course Info Section */}
            <div className="order-2 md:order-1 md:col-span-3 flex flex-col justify-center gap-6">
              <h1 className="text-white text-2xl md:text-4xl font-semibold capitalize">
                List Of Courses
              </h1>

              <p className="text-white text-base md:text-lg text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                reiciendis commodi animi ad quia, cupiditate ex blanditiis
                repellat quibusdam adipisci deleniti dignissimos quisquam magnam
                unde veniam optio aperiam est nesciunt.
              </p>
            </div>
          </div>
        </div>
        {/* Course Info BG End */}
        {/* Course Card Info Start */}
        <div className="flex flex-col items-center justify-center p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dummyCourses
              .slice((page - 1) * perPage, page * perPage)
              .map((course, idx) => (
                <CourseCard key={idx} {...course} />
              ))}
          </div>
          {/* Pagination Start */}
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`px-4 py-1 rounded-full border text-sm ${
                  page === idx + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          {/* Pagination End */}
        </div>
        {/* Course Card Info End */}
      </div>
    </>
  );
}
