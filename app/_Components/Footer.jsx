"use client";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Image from "next/legacy/image";

export default function Footer() {
  return (
    <footer id="footer" className="mt-20">
      <div className="w-full bg-slate-400 h-auto flex gap-48">
        {/* Logo Section */}
        <div className="flex flex-col ml-10 gap-8 sm:gap-16">
          <div className="my-10">
            <Image
              className="cursor-pointer"
              src="/logo.svg"
              alt="logo"
              width={70}
              height={70}
            />
           
          </div>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-2 mb-5 lg:gap-6">
            <p className="bg-white p-1 flex justify-center items-center rounded-xl cursor-pointer">
              <Instagram size={24} />
            </p>
            <p className="bg-white p-1 flex justify-center items-center rounded-xl cursor-pointer">
              <Youtube size={24} />
            </p>
            <p className="bg-white p-1 flex justify-center items-center rounded-xl cursor-pointer">
              <Facebook size={24} />
            </p>
            <p className="bg-white p-1 flex justify-center items-center rounded-xl">
              <Linkedin size={24} />
            </p>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-10 pb-10 text-white w-full mt-16">
          {/* Menu 1 */}
          <div>
            <h6 className="text-xl font-semibold mb-2 cursor-pointer">Menu</h6>
            <ul className="list-none">
              <li className="cursor-pointer">lorem</li>
              <li className="cursor-pointer">lorem</li>
              <li className="cursor-pointer">lorem</li>
              <li className="cursor-pointer">lorem</li>
            </ul>
          </div>

          {/* Menu 2 */}
          <div>
            <h6 className="text-xl font-semibold mb-2 cursor-pointer">Menu</h6>
            <ul className="list-none">
              <li className="cursor-pointer">lorem</li>
              <li className="cursor-pointer">lorem</li>
              <li className="cursor-pointer">lorem</li>
              <li className="cursor-pointer">lorem</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="h-14 bg-slate-200 text-center flex items-center justify-center">
        Copyright ©️ {new Date().getFullYear()}
      </div>
    </footer>
  );
}
