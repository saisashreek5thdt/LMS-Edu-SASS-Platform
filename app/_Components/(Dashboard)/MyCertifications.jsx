// components/MyCertifications.jsx

import React from 'react';

export default function MyCertifications() {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-3xl mx-auto p-4">
      {/* Certification Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 shadow-xl rounded-2xl p-8 w-full border border-indigo-100 transition-transform hover:scale-[1.01]">
        <div className="flex flex-col items-center text-center">
          {/* Icon Placeholder */}
          <div className="p-4 bg-indigo-100 rounded-full text-indigo-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
            Congratulations on Completing the Course!
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-6">
            You've successfully completed all modules and earned your certification.
          </p>

          {/* Certificate Info Box */}
          <div className="bg-white shadow-md rounded-xl p-5 w-full max-w-md border border-gray-200 mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Your Certification</h3>
            <p className="text-sm text-gray-500 mb-4">
              Issued on April 5, 2025 • Verified by Learning Platform
            </p>
            <button className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>Download Certificate (PDF)</span>
            </button>
          </div>

          {/* Encouragement Text */}
          <p className="text-sm text-gray-500">
            Share this achievement with your network and keep growing!
          </p>
        </div>
      </div>
    </div>
  );
}