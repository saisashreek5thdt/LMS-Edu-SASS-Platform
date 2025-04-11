"use client";
import Accordian from "@/app/_Components/(Common)/Accordian";
import CourseInfoCard from "@/app/_Components/Courses/CourseInfoCard";
import { Button } from "@/components/ui/button";
import { LibraryBig } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function CourseInfo() {
  const moduleData = [
    {
      title: "Module 1: React Basics",
      info: "Getting started with components",
      subModules: [
        { title: "Intro to React", time: "5 min" },
        { title: "JSX Syntax", time: "7 min" },
      ],
    },
    {
      title: "Module 2: State & Props",
      info: "Managing data in components",
      subModules: [
        { title: "Using useState", time: "6 min" },
        { title: "Passing Props", time: "8 min" },
      ],
    },
    {
      title: "Module 3: useEffect",
      info: "Side effects and lifecycle",
      subModules: [
        { title: "Basic useEffect", time: "9 min" },
        { title: "Cleanup Functions", time: "5 min" },
      ],
    },
    {
      title: "Module 4: Routing",
      info: "React Router and Navigation",
      subModules: [
        { title: "BrowserRouter Setup", time: "7 min" },
        { title: "Route Params", time: "6 min" },
      ],
    },
    {
      title: "Module 5: Context API",
      info: "Global state management",
      subModules: [
        { title: "Creating Context", time: "5 min" },
        { title: "Consuming Context", time: "7 min" },
      ],
    },
  ];

  return (
    <>
      <div className="min-h-screen w-full">
        {/* Course Info BG Start */}
        <div className="bg-gradient-to-tr from-teal-500 via-slate-500 to-emerald-800 py-10 px-4 md:px-6">
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
                Course Title
              </h1>

              <p className="text-white text-base md:text-lg text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                reiciendis commodi animi ad quia, cupiditate ex blanditiis
                repellat quibusdam adipisci deleniti dignissimos quisquam magnam
                unde veniam optio aperiam est nesciunt.
              </p>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {Array.from({ length: 7 }).map((_, i) => (
                  <Button key={i} className="bg-[#E69DB8] hover:bg-rose-500">
                    Skill {i + 1}
                  </Button>
                ))}
              </div>

              {/* Add to Cart Button */}
              <Button variant="outline" className="w-fit gap-2">
                <LibraryBig strokeWidth={2} />
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
        {/* Course Info BG End */}
        {/* About Instructor Start */}
        <div className="bg-slate-100 shadow-lg px-4 py-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Instructor Image + Name */}
            <div className="flex items-center gap-4 justify-center md:justify-start col-span-1">
              <div className="w-16 h-16 rounded-full bg-slate-100 overflow-hidden border border-slate-300 shadow-sm">
                <Image
                  src="https://dummyjson.com/image/200x100"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  alt="Instructor Photo"
                />
              </div>
              <h1 className="text-lg text-slate-700 font-semibold capitalize">
                Instructor Name
              </h1>
            </div>

            {/* Instructor Description */}
            <div className="md:col-span-2">
              <p className="text-slate-700 text-sm md:text-base text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                reiciendis commodi animi ad quia, cupiditate ex blanditiis
                repellat quibusdam adipisci deleniti dignissimos quisquam magnam
                unde veniam optio aperiam est nesciunt.
              </p>
            </div>
          </div>
        </div>
        {/* About Instructor End */}
        {/* Course Module + Hours Info Start */}
        <div className="px-4 py-6 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 items-start">
            {/* No. of Hours Info — top on mobile */}
            <div className="order-1 md:order-2 md:col-span-2">
              <h1 className="text-lg font-semibold text-slate-800">
                No of Hours Info with Additional Info
              </h1>
              <CourseInfoCard
                hours={`12 Hours`}
                modules={8}
                topics={36}
                ratings={`4.8 (120)`}
                onAddToCart={() => {}}
                certification={true}
              />
            </div>

            {/* Modules Info */}
            <div className="order-2 md:order-1 md:col-span-3">
              <h1 className="text-lg font-semibold text-slate-800">
                Modules Info
              </h1>
              <div className="py-4 flex flex-col gap-8">
                <div className="space-y-6">
                  {moduleData.map((module, idx) => (
                    <Accordian
                      key={idx}
                      title={module.title}
                      info={module.info}
                      subModules={module.subModules}
                      isLocked={idx >= 3} // Only first 3 modules are unlocked
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Module + Hours Info End */}
      </div>
    </>
  );
}
