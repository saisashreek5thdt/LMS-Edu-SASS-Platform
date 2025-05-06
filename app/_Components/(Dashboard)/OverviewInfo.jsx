import Image from "next/image";
import React from "react";
import { HiOutlineTrophy } from "react-icons/hi2";

export default function OverviewInfo() {
  return (
    <>
      {/* Welcome and Scores Card Start */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-4">
        {/* Welcome Info Start */}
        <div className="md:col-span-2">
          <div className="w-full h-full bg-slate-100 rounded-lg shadow-md">
            <div className="p-4 flex flex-col justify-start text-gray-600 font-medium gap-4">
              <h1 className="text-xl sm:text-2xl">Online Course</h1>
              <p className="text-xl sm:text-3xl text-justify">
                Sharpen Your Skills with Professional Online Courses
              </p>
              <h2 className="bg-[#e9327c] text-slate-200 p-3 w-fit rounded-3xl text-center cursor-pointer shadow-lg text-sm sm:text-base">
                Join Now
              </h2>
            </div>
          </div>
        </div>
        {/* Welcome Info End */}

        {/* Score Statistics Start */}
        <div className="w-full h-full bg-slate-100 rounded-lg shadow-md">
          <h2 className="px-4 py-2 text-gray-600 text-lg sm:text-xl font-medium border-b-2">
            Score Statistics
          </h2>

          <div className="p-4 flex flex-col md:flex-row gap-4">
            {/* Image (Top on Mobile, Right on Desktop) */}
            <div className="order-1 md:order-2 flex justify-center items-center w-full md:w-1/2">
              <Image
                src="/favicon.png"
                alt="logo"
                width={96}
                height={96}
                className="object-contain w-24 h-24"
              />
            </div>

            {/* Text Content (Centered on Mobile, Left-aligned on md+) */}
            <div className="order-2 md:order-1 flex flex-col gap-2 w-full md:w-1/2 items-center text-center md:items-start md:text-left justify-center">
              <h2 className="bg-[#e9327c] text-slate-200 p-3 flex justify-center items-center gap-2 w-fit rounded-3xl text-center cursor-pointer shadow-lg text-sm sm:text-base">
                <HiOutlineTrophy className="text-lg" /> Grade 1
              </h2>
              <h2 className="text-gray-600 text-md sm:text-lg">My Score</h2>
              <h2 className="text-gray-600 text-3xl font-semibold">77.48</h2>
            </div>
          </div>
        </div>
        {/* Score Statistics End */}
      </div>
      {/* Welcome and Scores Card End */}
    </>
  );
}
