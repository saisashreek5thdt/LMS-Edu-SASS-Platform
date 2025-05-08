import Image from "next/image";
import React from "react";
import {
  FiBook,
  FiChevronRight,
  FiBookOpen,
  FiPieChart,
  FiAward,
} from "react-icons/fi";

export default function MyCourses() {
  return (
    <>
      <div className="mt-3 w-full h-full">
        <div className="m-3 p-2 flex justify-between items-start border-b-2">
          <h3 className="flex gap-2 justify-center items-center text-xl font-medium">
            <FiBook />
            MyCourses
          </h3>
          <h3 className="flex gap-2 justify-center items-center cursor-pointer text-lg border-2 rounded-full p-1 hover:border-slate-600">
            View All
            <FiChevronRight />
          </h3>
        </div>
        <div className="p-3 grid grid-cols-1 md:grid-cols-3 justify-around items-center gap-4">
          <h3 className="flex justify-center items-center gap-3 text-xl">
            <FiBookOpen />
            Total Courses: <span className="font-semibold">85</span>
          </h3>
          <h3 className="flex justify-center items-center gap-3 text-xl">
            <FiPieChart />
            Inprogress Courses: <span className="font-semibold">85</span>
          </h3>
          <h3 className="flex justify-center items-center gap-3 text-xl">
            <FiAward />
            Completed Courses: <span className="font-semibold">85</span>
          </h3>
        </div>
        <div className="my-2 px-5 mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="flex justify-around items-center gap-5 p-3 bg-slate-200 rounded-lg shadow-md">
            <Image
              src="/favicon.png"
              alt="logo"
              width={40}
              height={40}
              className="w-24 h-24"
            />
            <div className="flex flex-col justify-start gap-4">
              <h3 className="flex gap-3 text-2xl font-semibold">Course Title</h3>
              <h4 className="flex justify-start items-center gap-3 text-lg">
                <FiBookOpen />
                15 Modules
              </h4>
              <h3 className="flex gap-3 text-lg">Progress: 40%</h3>
            </div>
          </div>
          <div className="flex justify-around items-center gap-5 p-3 bg-slate-200 rounded-lg shadow-md">
            <Image
              src="/favicon.png"
              alt="logo"
              width={40}
              height={40}
              className="w-24 h-24"
            />
            <div className="flex flex-col justify-start gap-4">
              <h3 className="flex gap-3 text-2xl font-semibold">Course Title</h3>
              <h4 className="flex justify-start items-center gap-3 text-lg">
                <FiBookOpen />
                15 Modules
              </h4>
              <h3 className="flex gap-3 text-lg">Progress: 40%</h3>
            </div>
          </div>
          <div className="flex justify-around items-center gap-5 p-3 bg-slate-200 rounded-lg shadow-md">
            <Image
              src="/favicon.png"
              alt="logo"
              width={40}
              height={40}
              className="w-24 h-24"
            />
            <div className="flex flex-col justify-start gap-4">
              <h3 className="flex gap-3 text-2xl font-semibold">Course Title</h3>
              <h4 className="flex justify-start items-center gap-3 text-lg">
                <FiBookOpen />
                15 Modules
              </h4>
              <h3 className="flex gap-3 text-lg">Progress: 40%</h3>
            </div>
          </div>
          <div className="flex justify-around items-center gap-5 p-3 bg-slate-200 rounded-lg shadow-md">
            <Image
              src="/favicon.png"
              alt="logo"
              width={40}
              height={40}
              className="w-24 h-24"
            />
            <div className="flex flex-col justify-start gap-4">
              <h3 className="flex gap-3 text-2xl font-semibold">Course Title</h3>
              <h4 className="flex justify-start items-center gap-3 text-lg">
                <FiBookOpen />
                15 Modules
              </h4>
              <h3 className="flex gap-3 text-lg">Progress: 40%</h3>
            </div>
          </div>
          <div className="flex justify-around items-center gap-5 p-3 bg-slate-200 rounded-lg shadow-md">
            <Image
              src="/favicon.png"
              alt="logo"
              width={40}
              height={40}
              className="w-24 h-24"
            />
            <div className="flex flex-col justify-start gap-4">
              <h3 className="flex gap-3 text-2xl font-semibold">Course Title</h3>
              <h4 className="flex justify-start items-center gap-3 text-lg">
                <FiBookOpen />
                15 Modules
              </h4>
              <h3 className="flex gap-3 text-lg">Progress: 40%</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
