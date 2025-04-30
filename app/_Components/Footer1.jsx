import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
export default function Footer1() {
    return (
        <>
            <div className="grid sm:grid-rows-[40%_60%] md:grid-rows-[50%_50%] lg:grid-cols-[28%_72%] xl:grid-cols-[28%_72%] w-full bg-slate-200 mt-10">
                <div className="flex flex-col p-10 gap-5">
                    <Link href="/" >
                        <Image src="/logo.svg" alt="logo" width={150} height={150} />
                    </Link>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum officiis ullam praesentium odit fugiat ab amet? Perferendis eligendi mollitia amet!</p>
                    <div className="flex gap-2">
                        <div className="border-2 border-black p-2 rounded-full cursor-pointer">
                           <FaFacebookF/>
                        </div>
                        <div className="border-2 border-black p-2 rounded-full cursor-pointer">
                           <FaYoutube />
                        </div>
                        <div className="border-2 border-black p-2 rounded-full cursor-pointer">
                           <FaInstagram/>
                        </div>
                        <div className="border-2 border-black p-2 rounded-full cursor-pointer">
                           <FaXTwitter/>
                        </div>
                    </div>
                </div>

                <div className="flex justify-evenly gap-3 pl-10 sm:pl-10 md:pl-10 lg:pl-28 xl:pl-28 py-10">
                    <div className="flex flex-col gap-1">
                       <h1 className="text-lg font-semibold cursor-context-menu">Quick Menu</h1>
                       <p className="mt-3 cursor-pointer">Home</p>
                       <p className="cursor-pointer">Courses</p>
                       <p className="cursor-pointer">Team</p>
                       <p className="cursor-pointer">Blog</p>
                    </div>
                    <div className="flex flex-col gap-1">
                       <h1 className="text-lg font-semibold cursor-context-menu">Support us</h1>
                       <p className="mt-3 cursor-pointer">FAQ's</p>
                       <p className="cursor-pointer">Support Center</p>
                       <p className="cursor-pointer">Security</p>
                       <p className="cursor-pointer">Contact</p>
                    </div>
                    <div className="flex flex-col gap-1">
                       <h1 className="text-lg font-semibold cursor-context-menu">Quick Menu</h1>
                       <p className="mt-3 cursor-pointer">+91 9999999999</p>
                       <p className="cursor-pointer">info@gmail.com</p>
                    </div>
                </div>
            </div>

            <hr className="w-full h-[2px] bg-gray-400"/>

            <div className="flex p-3 justify-center items-center">
            © {new Date().getFullYear()} All Rights Reserved
            </div>
        </>
    )
}