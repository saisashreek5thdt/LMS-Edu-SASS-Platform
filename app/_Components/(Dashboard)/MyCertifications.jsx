import Image from "next/image";
import React from "react";
import {
  FiBook,
  FiChevronRight,
  FiBookOpen,
  FiPieChart,
  FiAward,
} from "react-icons/fi";

export default function MyCertifications() {
  return (
    <>
      <div className="mt-3 w-full h-full bg-slate-100">
        {/* Header */}
        <div className="m-3 p-2 flex justify-between items-start border-b-2">
          <h3 className="flex gap-2 justify-center items-center text-xl font-medium">
            <FiBook />
            My Certifications
          </h3>
          <h3 className="flex gap-2 justify-center items-center cursor-pointer text-xl border-2 rounded-full p-1 hover:border-slate-600 transition-all">
            View All
            <FiChevronRight />
          </h3>
        </div>

        {/* Stats */}
        <div className="p-3 grid grid-cols-1 md:grid-cols-3 justify-around items-center gap-4">
          <h3 className="flex justify-center items-center gap-3 text-xl">
            <FiBookOpen />
            Total Courses: <span className="font-semibold">85</span>
          </h3>
          <h3 className="flex justify-center items-center gap-3 text-xl">
            <FiPieChart />
            In Progress Courses: <span className="font-semibold">85</span>
          </h3>
          <h3 className="flex justify-center items-center gap-3 text-xl">
            <FiAward />
            Completed Courses: <span className="font-semibold">85</span>
          </h3>
        </div>

        {/* Course Cards */}
        <div className="my-2 px-5 mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Single Card Example (Repeat as needed) */}
          {Array(5)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="flex justify-around items-center gap-5 p-3 bg-slate-200 rounded-lg shadow-md"
              >
                <Image
                  src="/favicon.png"
                  alt="logo"
                  width={40}
                  height={40}
                  className="w-24 h-24"
                />
                <div className="flex flex-col justify-start gap-4">
                  <h3 className="flex gap-3 text-2xl font-semibold">
                    Course Title
                  </h3>
                  <h4 className="flex justify-start items-center gap-3 text-lg">
                    <FiBookOpen />
                    15 Modules
                  </h4>
                  {/* Modern Download Button */}
                  <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-all shadow-md hover:shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    <span className="font-medium">Download Certificate</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}