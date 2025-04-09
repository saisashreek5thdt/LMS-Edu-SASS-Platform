import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

const coursesList = [
    {
        id: 1,
        tooltipDirection:"right"
    },
    {
        id: 2,
        tooltipDirection:"right"
    },
    {
        id: 3,
        tooltipDirection:"right"
    },
    {
        id: 4,
        tooltipDirection:"right"
    },
    {
        id: 5,
        tooltipDirection:"left"
    }
]

export default function Courses() {
    return (
        <>
            <div className="mt-20">
                <h1 className="text-center text-3xl mb-14 font-semibold text-gray-500">
                    UPCOMING COURSES
                </h1>
                <div className="grid place-content-center sm:grid-cols-1 lg:grid-cols-5 px-16 gap-10">
                    {/* Tooltip Provider */}
                    {coursesList.map((course,index) => (
                        <Tooltip.Provider key={index}>
                            <Tooltip.Root>
                                {/* Tooltip Trigger */}
                                <Tooltip.Trigger asChild>
                                    <div className="border p-4 shadow-xl cursor-pointer">
                                        <img
                                            src="https://dummyjson.com/image/200x100"
                                            alt="Course Thumbnail"
                                            className="w-full h-auto"
                                        />
                                        <div className="flex flex-col gap-1 mt-2">
                                            <h2 className="font-medium">Title</h2>
                                            <p className="text-sm text-gray-600">Paragraph</p>
                                            <p className="text-sm text-gray-600">Price</p>
                                        </div>
                                    </div>
                                </Tooltip.Trigger>

                                {/* Tooltip Content */}
                                <Tooltip.Portal>
                                    <Tooltip.Content
                                        side={`${course.tooltipDirection}`} // Position the tooltip above the trigger
                                        sideOffset={5} // Offset from the trigger
                                        className="bg-gray-100 text-black shadow-lg rounded-lg p-4 max-w-xs flex flex-col gap-2"
                                    >
                                        <p className="text-sm">Add to library Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque, eveniet?</p>
                                        <p className="text-sm">View details</p>
                                        <p className="text-sm">Enroll now</p>
                                        <p className="text-sm">Share with friends</p>
                                        <p className="text-sm">Share with friends lorem15</p>
                                        <button className="bg-red-500 rounded-lg h-8 hover:opacity-85 border-none text-white">Add to Cart</button>
                                        <Tooltip.Arrow className="fill-gray-100 w-5 h-5 " />
                                    </Tooltip.Content>
                                </Tooltip.Portal>
                            </Tooltip.Root>
                        </Tooltip.Provider>
                    ))}
                </div>
            </div>
        </>
    );
}