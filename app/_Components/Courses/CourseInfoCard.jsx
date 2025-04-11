"use client";
import React from "react";
import {
  BadgeCheck,
  Clock,
  BookOpen,
  Layers,
  Star,
  ShoppingCart,
} from "lucide-react";

export default function CourseInfoCard({
  onAddToCart,
  hours,
  modules,
  topics,
  ratings,
  certification
}) {
  return (
    <>
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6 sm:space-y-4 md:space-y-6">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <div className="flex items-center gap-2 text-teal-600 font-medium">
            <Clock size={20} />
            <span>{hours}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Layers size={20} />
            <span>{modules} Modules</span>
          </div>
        </div>

        {/* Topics + Certification */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-600">
            <BookOpen size={20} />
            <span>{topics} Topics</span>
          </div>
          {certification && (
            <div className="flex items-center gap-2 text-emerald-600 font-medium">
              <BadgeCheck size={20} />
              <span>Certificate Included</span>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 text-yellow-500">
          <Star size={20} />
          <span className="text-slate-700 font-medium">{ratings}</span>
        </div>

        {/* Button */}
        <div>
          <button
            onClick={onAddToCart}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition duration-300"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
