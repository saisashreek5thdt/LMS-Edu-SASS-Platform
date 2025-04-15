"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
export default function CoursesLists({
  image,
  title,
  shortInfo,
  instructorPhoto,
  description,
  duration,
  hours,
  bulletPoints,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const pageLinkHandler = (e) => {
    e.preventDefault();
    router.push(`/courses/${title}`);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="relative w-full max-w-xs h-[335px] bg-white rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 transform scale-95 hover:scale-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Course Image */}
        <img src={image} alt="Course" className="w-full h-44 object-cover" />

        {/* Static Content */}
        <div className="p-2">
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-sm text-gray-600 mt-2">{shortInfo}</p>
          <div className="flex items-center mt-3">
            <img
              src={instructorPhoto}
              alt="Instructor"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="ml-2 text-sm text-gray-700">Instructor</span>
          </div>
        </div>

        {/* Hover Overlay */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: isHovered ? "0%" : "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-full h-full bg-white bg-opacity-95 p-5 z-10 overflow-y-auto"
        >
          <h3 className="text-base font-semibold mb-2">Course Description</h3>
          <p className="text-sm text-gray-700 mb-2">{description}</p>

          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-3">
            {bulletPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>

          <p className="text-sm text-gray-600 mb-1">
            <strong>Duration:</strong> {duration}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            <strong>Total Hours:</strong> {hours}
          </p>

          <div className="flex gap-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md">
              Add to Cart
            </button>
            <button
              onClick={pageLinkHandler}
              className="border border-blue-600 text-blue-600 hover:bg-blue-100 text-xs px-3 py-1.5 rounded-md"
            >
              View Full Course
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
