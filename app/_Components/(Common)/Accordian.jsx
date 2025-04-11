"use client";
import React, { useState, useRef, useEffect } from "react";
import { Minus, Plus, Lock } from "lucide-react";

export default function Accordian({ title, info, subModules, isLocked }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && !isLocked) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen, isLocked]);

  const totalMinutes = subModules.reduce((acc, sub) => {
    const match = sub.time.match(/\d+/);
    return acc + (match ? parseInt(match[0]) : 0);
  }, 0);

  return (
    <>
      <div className="rounded-xl shadow-md bg-white p-4 transition-all duration-300">
        {/* Header */}
        <div
          onClick={() => !isLocked && setIsOpen(!isOpen)}
          className={`flex justify-between items-center cursor-pointer ${
            isLocked ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          <div>
            <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
            <p className="text-sm text-slate-600">{info}</p>
            <p className="text-xs mt-1 text-rose-500 font-medium">
              {totalMinutes} minutes
            </p>
          </div>

          <div className="text-slate-700 transition-transform duration-300">
            {isLocked ? (
              <Lock size={20} />
            ) : isOpen ? (
              <Minus size={20} className="transform rotate-180" />
            ) : (
              <Plus size={20} />
            )}
          </div>
        </div>

        {/* Collapsible Content */}
        <div
          ref={contentRef}
          style={{
            maxHeight: `${height}px`,
          }}
          className="overflow-hidden transition-all duration-500 ease-in-out"
        >
          <div className="mt-4 space-y-2">
            {subModules.map((sub, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200"
              >
                <p className="text-slate-700 text-sm">{sub.title}</p>
                <span className="text-xs text-slate-500">{sub.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
