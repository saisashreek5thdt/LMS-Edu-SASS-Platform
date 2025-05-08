import Image from "next/image";
import React from "react";
import { FiServer, FiChevronRight, FiBookOpen } from "react-icons/fi";
import { HiOutlineBookmarkSquare, HiOutlineAcademicCap } from "react-icons/hi2";

export default function CourseList() {
  return (
    <>
      <div className="mt-3 w-full h-full">
        <div className="m-3 p-2 flex justify-between items-start border-b-2">
          <h3 className="flex gap-2 justify-center items-center text-xl font-medium">
            <FiServer />
            Course List
          </h3>
          <div className="flex gap-3 justify-center items-center">
            <h3 className="flex gap-2 justify-center items-center cursor-pointer text-lg border-2 rounded-full p-1 hover:border-slate-600">
              Create Course
              <HiOutlineAcademicCap className="text-xl" />
            </h3>
            <h3 className="flex gap-2 justify-center items-center cursor-pointer text-lg border-2 rounded-full p-1 hover:border-slate-600">
              View All
              <FiChevronRight />
            </h3>
          </div>
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
              <h3 className="flex gap-3 text-2xl font-semibold">
                Course Title
              </h3>
              <h4 className="flex justify-start items-center gap-3 text-lg">
                <FiBookOpen />
                15 Modules
              </h4>
              <h2 className="bg-[#e9327c] text-slate-200 p-3 flex justify-center items-center gap-2 w-fit rounded-3xl text-center cursor-pointer shadow-lg text-sm sm:text-base">
                <HiOutlineBookmarkSquare className="text-xl" /> View Course
              </h2>
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
              <h3 className="flex gap-3 text-2xl font-semibold">
                Course Title
              </h3>
              <h4 className="flex justify-start items-center gap-3 text-lg">
                <FiBookOpen />
                15 Modules
              </h4>
              <h2 className="bg-[#e9327c] text-slate-200 p-3 flex justify-center items-center gap-2 w-fit rounded-3xl text-center cursor-pointer shadow-lg text-sm sm:text-base">
                <HiOutlineBookmarkSquare className="text-xl" /> View Course
              </h2>
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
              <h3 className="flex gap-3 text-2xl font-semibold">
                Course Title
              </h3>
              <h4 className="flex justify-start items-center gap-3 text-lg">
                <FiBookOpen />
                15 Modules
              </h4>
              <h2 className="bg-[#e9327c] text-slate-200 p-3 flex justify-center items-center gap-2 w-fit rounded-3xl text-center cursor-pointer shadow-lg text-sm sm:text-base">
                <HiOutlineBookmarkSquare className="text-xl" /> View Course
              </h2>
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
              <h3 className="flex gap-3 text-2xl font-semibold">
                Course Title
              </h3>
              <h4 className="flex justify-start items-center gap-3 text-lg">
                <FiBookOpen />
                15 Modules
              </h4>
              <h2 className="bg-[#e9327c] text-slate-200 p-3 flex justify-center items-center gap-2 w-fit rounded-3xl text-center cursor-pointer shadow-lg text-sm sm:text-base">
                <HiOutlineBookmarkSquare className="text-xl" /> View Course
              </h2>
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
              <h3 className="flex gap-3 text-2xl font-semibold">
                Course Title
              </h3>
              <h4 className="flex justify-start items-center gap-3 text-lg">
                <FiBookOpen />
                15 Modules
              </h4>
              <h2 className="bg-[#e9327c] text-slate-200 p-3 flex justify-center items-center gap-2 w-fit rounded-3xl text-center cursor-pointer shadow-lg text-sm sm:text-base">
                <HiOutlineBookmarkSquare className="text-xl" /> View Course
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
