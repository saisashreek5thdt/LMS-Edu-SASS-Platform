"use client";
import Image from "next/image";
import React from "react";
import client1 from "../../../public/slider/images/sponsor1.svg";
import client2 from "../../../public/slider/images/sponsor2.svg";
import client3 from "../../../public/slider/images/sponsor3.svg";
import client4 from "../../../public/slider/images/sponsor4.svg";
import client5 from "../../../public/slider/images/sponsor5.svg";
import client6 from "../../../public/slider/images/sponsor6.svg";

const clients = [client1, client2, client3, client4, client5, client6];

export default function Clients() {
  return (
    <div className="flex items-center justify-center min-h-fit">
      <section className="bg-white py-10 px-4 w-full max-w-7xl overflow-hidden">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Our Trusted Clients
        </h2>
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll whitespace-nowrap w-max">
            {[...clients, ...clients].map((src, index) => (
              <div
                key={index}
                className="w-[150px] h-[80px] mx-6 flex-shrink-0 flex items-center justify-center"
              >
                <Image
                  src={src}
                  alt={`Sponsor ${index}`}
                  width={150}
                  height={80}
                  className="w-full h-full object-contain filter grayscale hover:filter-none transition duration-300 ease-in-out"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}