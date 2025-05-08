import Image from "next/image";
import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { HiOutlineAcademicCap, HiOutlineBeaker } from "react-icons/hi2";

export default function Assesment() {
  return (
    <>
      <div className="mt-3 w-full h-full">
        <div className="m-3 p-2 flex justify-between items-start border-b-2">
          <h3 className="flex gap-2 justify-center items-center text-xl font-medium">
            <HiOutlineBeaker className="text-2xl" />
            Assesment
          </h3>
          <div className="flex gap-3 justify-center items-center">
            <h3 className="flex gap-2 justify-center items-center cursor-pointer text-lg border-2 rounded-full p-1 hover:border-slate-600">
              Create Assesment
              <HiOutlineAcademicCap className="text-xl" />
            </h3>
            <h3 className="flex gap-2 justify-center items-center cursor-pointer text-lg border-2 rounded-full p-1 hover:border-slate-600">
              View All
              <FiChevronRight />
            </h3>
          </div>
        </div>
        <div className="p-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="flex flex-col justify-around items-center gap-5 p-3 bg-slate-200 rounded-lg shadow-md cursor-pointer">
            <div className="w-full h-full border-2 border-slate-100 rounded-lg flex justify-center bg-slate-400">
              <Image
                src="/favicon.png"
                alt="logo"
                width={40}
                height={40}
                className="w-24 h-24"
              />
            </div>
            <h3 className="flex gap-3 text-2xl font-semibold">Title</h3>
            <div className="flex justify-between items-center gap-x-3">
              <h3>
                Accuracy: <span className="font-semibold">60%</span>
              </h3>
              <h3>
                Ratio: <span className="font-semibold">60%</span>
              </h3>
              <h3>
                Questions: <span className="font-semibold">25</span>
              </h3>
            </div>
            <h3 className="flex justify-start ext-xl font-medium">
              Created By: <span className="px-1 font-semibold">User Name</span>
            </h3>
          </div>
          <div className="flex flex-col justify-around items-center gap-5 p-3 bg-slate-200 rounded-lg shadow-md cursor-pointer">
            <div className="w-full h-full border-2 border-slate-100 rounded-lg flex justify-center bg-slate-400">
              <Image
                src="/favicon.png"
                alt="logo"
                width={40}
                height={40}
                className="w-24 h-24"
              />
            </div>
            <h3 className="flex gap-3 text-2xl font-semibold">Title</h3>
            <div className="flex justify-between items-center gap-x-3">
              <h3>
                Accuracy: <span className="font-semibold">60%</span>
              </h3>
              <h3>
                Ratio: <span className="font-semibold">60%</span>
              </h3>
              <h3>
                Questions: <span className="font-semibold">25</span>
              </h3>
            </div>
            <h3 className="flex justify-start ext-xl font-medium">
              Created By: <span className="px-1 font-semibold">User Name</span>
            </h3>
          </div>
          <div className="flex flex-col justify-around items-center gap-5 p-3 bg-slate-200 rounded-lg shadow-md cursor-pointer">
            <div className="w-full h-full border-2 border-slate-100 rounded-lg flex justify-center bg-slate-400">
              <Image
                src="/favicon.png"
                alt="logo"
                width={40}
                height={40}
                className="w-24 h-24"
              />
            </div>
            <h3 className="flex gap-3 text-2xl font-semibold">Title</h3>
            <div className="flex justify-between items-center gap-x-3">
              <h3>
                Accuracy: <span className="font-semibold">60%</span>
              </h3>
              <h3>
                Ratio: <span className="font-semibold">60%</span>
              </h3>
              <h3>
                Questions: <span className="font-semibold">25</span>
              </h3>
            </div>
            <h3 className="flex justify-start ext-xl font-medium">
              Created By: <span className="px-1 font-semibold">User Name</span>
            </h3>
          </div>
          <div className="flex flex-col justify-around items-center gap-5 p-3 bg-slate-200 rounded-lg shadow-md cursor-pointer">
            <div className="w-full h-full border-2 border-slate-100 rounded-lg flex justify-center bg-slate-400">
              <Image
                src="/favicon.png"
                alt="logo"
                width={40}
                height={40}
                className="w-24 h-24"
              />
            </div>
            <h3 className="flex gap-3 text-2xl font-semibold">Title</h3>
            <div className="flex justify-between items-center gap-x-3">
              <h3>
                Accuracy: <span className="font-semibold">60%</span>
              </h3>
              <h3>
                Ratio: <span className="font-semibold">60%</span>
              </h3>
              <h3>
                Questions: <span className="font-semibold">25</span>
              </h3>
            </div>
            <h3 className="flex justify-start ext-xl font-medium">
              Created By: <span className="px-1 font-semibold">User Name</span>
            </h3>
          </div>
          <div className="flex flex-col justify-around items-center gap-5 p-3 bg-slate-200 rounded-lg shadow-md cursor-pointer">
            <div className="w-full h-full border-2 border-slate-100 rounded-lg flex justify-center bg-slate-400">
              <Image
                src="/favicon.png"
                alt="logo"
                width={40}
                height={40}
                className="w-24 h-24"
              />
            </div>
            <h3 className="flex gap-3 text-2xl font-semibold">Title</h3>
            <div className="flex justify-between items-center gap-x-3">
              <h3>
                Accuracy: <span className="font-semibold">60%</span>
              </h3>
              <h3>
                Ratio: <span className="font-semibold">60%</span>
              </h3>
              <h3>
                Questions: <span className="font-semibold">25</span>
              </h3>
            </div>
            <h3 className="flex justify-start ext-xl font-medium">
              Created By: <span className="px-1 font-semibold">User Name</span>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
