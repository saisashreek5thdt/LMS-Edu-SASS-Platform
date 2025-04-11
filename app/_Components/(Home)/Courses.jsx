import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import Link from "next/link";
import Image from "next/image";

const coursesList = [
  {
    id: 1,
    tooltipDirection: "right",
  },
  {
    id: 2,
    tooltipDirection: "right",
  },
  {
    id: 3,
    tooltipDirection: "right",
  },
  {
    id: 4,
    tooltipDirection: "right",
  },
  {
    id: 5,
    tooltipDirection: "left",
  },
];

export default function Courses() {
  return (
    <section className="mt-20 px-4 sm:px-8 lg:px-16">
      <h1 className="text-center text-2xl sm:text-3xl mb-10 font-semibold text-gray-700">
        UPCOMING COURSES
      </h1>

      {/* Center align the card list */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {coursesList.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <Tooltip.Provider>
                <Tooltip.Root>
                  {/* Tooltip Trigger */}
                  <Tooltip.Trigger asChild>
                    <div className="border rounded-xl p-4 w-64 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white cursor-pointer">
                      <Image
                        src="https://dummyjson.com/image/200x100"
                        alt={`Course ${course.id} Thumbnail`}
                        className="rounded-md w-full object-cover"
                        width={200}
                        height={100}
                      />
                      <div className="flex flex-col gap-1 mt-3">
                        <h2 className="font-semibold text-lg">Course Title</h2>
                        <p className="text-sm text-gray-600">
                          Course Description
                        </p>
                        <p className="text-sm text-gray-700 font-medium">
                          $49.99
                        </p>
                      </div>
                    </div>
                  </Tooltip.Trigger>

                  {/* Tooltip Content */}
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side={course.tooltipDirection}
                      sideOffset={8}
                      className="bg-white text-gray-800 shadow-xl rounded-lg p-4 max-w-xs z-50"
                    >
                      <div className="flex flex-col gap-2 text-sm">
                        <p>Add to library: Learn anytime anywhere.</p>
                        <p>View details</p>
                        <p>Enroll now</p>
                        <p>Share with friends</p>
                        <button className="mt-2 bg-red-500 hover:bg-red-600 transition-colors text-white font-medium rounded-md py-2 px-4">
                          Add to Cart
                        </button>
                      </div>
                      <Tooltip.Arrow className="fill-white w-4 h-2" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
