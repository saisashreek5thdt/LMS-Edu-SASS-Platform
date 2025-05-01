// pages/team/index.js
"use client";
import { useState } from "react";
import Image from "next/image";

const teamData = [
  {
    image: "https://dummyimage.com/200x100",
    teamInfo: [{ name: "John Doe", designation: "Lead Developer", modules: "23" }],
  },
  {
    image: "https://dummyimage.com/200x100",
    teamInfo: [{ name: "Jane Smith", designation: "UI/UX Designer", modules: "15" }],
  },
  {
    image: "https://dummyimage.com/200x100",
    teamInfo: [{ name: "Alice Johnson", designation: "Product Manager", modules: "30" }],
  },
  {
    image: "https://dummyimage.com/200x100",
    teamInfo: [{ name: "Mike Brown", designation: "QA Engineer", modules: "12" }],
  },
  {
    image: "https://dummyimage.com/200x100",
    teamInfo: [{ name: "Chris Evans", designation: "DevOps Engineer", modules: "10" }],
  },
  {
    image: "https://dummyimage.com/200x100",
    teamInfo: [{ name: "Sara Wilson", designation: "Scrum Master", modules: "8" }],
  },
  {
    image: "https://dummyimage.com/200x100",
    teamInfo: [{ name: "Elon Musk", designation: "CEO", modules: "99" }],
  },
  {
    image: "https://dummyimage.com/200x100",
    teamInfo: [{ name: "Elon Musk", designation: "CEO", modules: "99" }],
  },
  {
    image: "https://dummyimage.com/200x100",
    teamInfo: [{ name: "Elon Musk", designation: "CEO", modules: "99" }],
  },
];

export default function TeamCard() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(teamData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = teamData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-16">
    <div className="bg-gradient-to-tr from-purple-500 via-slate-500 to-sky-500 py-10 px-4 md:px-6">
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
                  Our Team
                  </h1>
    
                  <p className="text-white text-base md:text-lg text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                    reiciendis commodi animi ad quia, cupiditate ex blanditiis
                    repellat quibusdam adipisci deleniti dignissimos quisquam magnam
                    unde veniam optio aperiam est nesciunt.
                  </p>
                </div>
              </div>
            </div>
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-14">
       
      </h1>
      <div className="grid place-content-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {currentItems.map((team, index) => (
            <div
              key={index}
              className="bg-white w-64 rounded-2xl overflow-hidden shadow-xl hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-1"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={team.image}
                  alt="Team Member"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-2xl p-2"
                />
              </div>
              <div className="p-2">
                <div className="flex flex-col justify-center items-center space-y-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {team.teamInfo[0].name}
                  </h2>
                  <h3 className="text-base text-gray-600">
                    {team.teamInfo[0].designation}
                  </h3>
                  <p className="text-sm text-indigo-600 font-medium">
                    Modules: {team.teamInfo[0].modules}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => paginate(pageNum)}
              className={`px-4 py-2 rounded-full border ${
                pageNum === currentPage
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-indigo-600"
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
