"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "@/styles/swiper.css";
import Link from "next/link";
import { DownIcon, MoreIcon } from "@/common/Icons";
import ProductCard from "../ProductCard";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";

export default function BrandSlider({ title, etitle, href, products, isLoading, name }) {
  return (
    <div>

      <div className="w-full px-6 mb-6">
        <div className="w-full flex items-end justify-between">
          
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-[36px] sm:h-12 bg-primary-900 rounded-full"></div>
            <div className="flex flex-col border-r6 border-primary-900 pr3">
              <div className="text-xs sm:text-sm text-secondary-300 font-semibold">
                popular brands
              </div>
              <div className="text-secondary-900 text-sm sm:text-lg font-semibold">
                برترین برند ها
              </div>
            </div>
          </div>
        </div>
      </div>

      <Swiper
        className="mySwiper !pb-10 !pl-6 lg:!pl-0 !pr-6" 
        autoplay
        loop
        modules={[Autoplay]}
        slidesPerView={'auto'}
        spaceBetween={24}
      >
          {Array(10).fill({}).map((brand, index)=>{
              return(
              <SwiperSlide key={index} className="!w-auto !h-auto !flex !items-center !justify-center">
                <div className="w-[150px] flex items-center justify-center">
                    <Image
                        src={`/images/brand-${index+1}.png`}
                        alt=""
                        width={1000}
                        height={1000}
                        className="w-full h-full mix-blend-multiply"
                    />
                </div>
              </SwiperSlide>
              )
          })}
      </Swiper>
    </div>
  )
}
