"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

export default function CourseCard({
  slug,
  title,
  description,
  price,
  skills = [],
  highlights = [],
  instructor,
}) {
  const [hovered, setHovered] = useState(false);
  const [flip, setFlip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const cardRef = useRef(null);

  // Detect viewport size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Flip tooltip direction
  useEffect(() => {
    const handlePosition = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const spaceRight = window.innerWidth - rect.right;
        setFlip(spaceRight < 340);
      }
    };

    hovered && handlePosition();
    window.addEventListener("resize", handlePosition);
    return () => window.removeEventListener("resize", handlePosition);
  }, [hovered]);

  const renderPreviewContent = () => (
    <div className="text-sm text-gray-700">
      <h4 className="font-semibold mb-2 text-gray-800">What you'll learn</h4>
      <ul className="list-disc list-inside space-y-1">
        {highlights.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>

      <h4 className="font-semibold mt-3 mb-1 text-gray-800">Skills</h4>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="bg-gray-200 px-2 py-0.5 rounded-full text-xs"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-3 text-gray-600">
        Instructor: <span className="font-medium">{instructor}</span>
      </div>

      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
        Add to Cart
      </button>
      {/* Mobile-only: Link to course */}
      {isMobile && (
        <Link
          href={`/courses/${slug}`}
          className="mt-2 block text-center text-blue-600 hover:underline"
        >
          Go to Course Page
        </Link>
      )}
    </div>
  );

  return (
    <>
      <Link href={`/courses/${slug}`} passHref>
        <div
          className="relative group w-full max-w-xs rounded-xl border bg-white shadow-md p-4 hover:shadow-lg transition-all duration-300"
          onMouseEnter={() => !isMobile && setHovered(true)}
          onMouseLeave={() => !isMobile && setHovered(false)}
          onClick={(e) => {
            if (isMobile) {
              e.preventDefault(); // stop link navigation
              setShowModal(true);
            }
          }}
          ref={cardRef}
        >
          {/* Thumbnail Placeholder */}
          <div className="h-36 bg-gray-200 flex items-center justify-center text-gray-500 text-sm rounded-md mb-4">
            Course Thumbnail
          </div>

          <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {description}
          </p>
          <div className="mt-2 text-primary font-bold text-lg">${price}</div>

          {/* Desktop Tooltip */}
          {!isMobile && hovered && (
            <div
              className={`absolute z-50 top-0 w-80 bg-white shadow-2xl border rounded-xl p-4 transition-all duration-300 animate-fade-in
              ${flip ? "right-full mr-4" : "left-full ml-4"} hidden md:block`}
            >
              {renderPreviewContent()}
            </div>
          )}
        </div>
      </Link>

      {/* Mobile Modal Preview */}
      {isMobile && showModal && (
        <div
          className="fixed inset-0 bg-black/50 z-[99] flex items-end md:hidden"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white w-full rounded-t-xl p-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-right mb-2">
              <button
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>
            {renderPreviewContent()}
          </div>
        </div>
      )}
    </>
  );
}
