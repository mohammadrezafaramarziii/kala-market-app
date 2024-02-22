"use client"
import { ArrowRightIcon } from "@/common/Icons"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "@/styles/swiper.css";

export default function BanerSlider() {
  return (
    <Swiper
        spaceBetween={8}
        autoplay={true}
        pagination={{
            clickable: true,
        }}
        navigation={{ nextEl: ".baner-arrow-left", prevEl: ".baner-arrow-right" }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-3xl shadow-xl" 
    >
        {[1,2,3,4,5,6,7,8].map((baner, index)=>{
            return(
            <SwiperSlide key={index}>
                <div className="w-full relative h-[250px] md:h-[400px]">
                <Image
                    src={`/images/baner${baner}.jpg`}
                    alt=""
                    width={1630}
                    height={600}
                    className="w-full h-full object-cover rounded-lg"
                    priority
                />
                </div>
            </SwiperSlide>
            )
        })}

        <div className="hidden md:flex absolute bottom-8 right-8 items-center gap-2 z-20">
            <button className="btn btn--light baner-arrow-right !w-8 !h-8 shadow-md">
            <ArrowRightIcon className={'w-5 h-5'}/>
            </button>
            <button className="btn btn--light baner-arrow-left !w-8 !h-8 shadow-md">
            <ArrowRightIcon className={'w-5 h-5 rotate-180'}/>
            </button>
        </div>
    </Swiper>
  )
}
