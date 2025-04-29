"use client";
import Image from "next/image";
import { UserPen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import img1 from "../../../public/slider/images/slide1.jpg";
import img2 from "../../../public/slider/images/slide2.jpg";
import img3 from "../../../public/slider/images/slide3.jpg";
import img4 from "../../../public/slider/images/slide4.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./About.css";

export default function AboutGrid() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <div className="flex justify-center items-center w-full mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[50%_50%] lg:grid-cols-[60%_40%] xl:grid-cols-[60%_40%]   gap-2 w-10/12">
          <div className=" bg-slate-800 rounded-md ">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              onAutoplayTimeLeft={onAutoplayTimeLeft}
              className="mySwiper"
            >
              <div className="autoplay-progress" slot="container-end">
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                  <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
              </div>
              <SwiperSlide>
                <Image className="rounded-md" src={img1} alt="image" />
              </SwiperSlide>
              <SwiperSlide>
                <Image className="rounded-md" src={img2} alt="image" />
              </SwiperSlide>
              <SwiperSlide>
                <Image className="rounded-md" src={img3} alt="image" />
              </SwiperSlide>
              {/* <SwiperSlide>
                                <Image src={img4} alt="image" />
                            </SwiperSlide> */}
            </Swiper>
          </div>
          <div className="grid grid-rows-[70%_30%] gap-2">
            <div className="flex justify-center items-center flex-col bg-slate-100 shadow-lg rounded-md">
              <h1 className="text-2xl text-[#E69DB8]">
                About LMS EDU Platform
              </h1>
              <p className="p-3 text-center text-lg text-[#E69DB8] font-medium ">
                LMS Edu Platform is an organization that offers innovative,
                effective and research based products and services that promote
                authentic learning opportunities relevant for 21st century
                learners.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex justify-center items-center flex-col shadow-lg bg-slate-100 rounded-md">
                <div className="flex justify-between flex-col items-center gap-5">
                  <div className="flex justify-center items-center flex-col">
                    <h1>No of Schools</h1>
                    <p>10+</p>
                  </div>
                  <div className="flex justify-center items-center flex-col">
                    <h1>No of Tutors</h1>
                    <p>45+</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center flex-col shadow-lg bg-slate-100 rounded-md">
                <h1 className="">No.of Courses</h1>
                <p>100+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
