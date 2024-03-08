"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./swiper.css";
import Image from "next/image";

export default function EnamdSlider(){
    return(
        <div className="w-full relative">
            <div id="containerForBullets"></div>
            <Swiper
                className="mySwiper !w-[170px] !h-[170px]  bg-white rounded-xl p-6 shadow-lg" 
                autoplay
                loop
                pagination={{
                    el: "#containerForBullets",
                    type: "bullets",
                    bulletClass: "swiper-custom-bullet",
                    bulletActiveClass: "swiper-custom-bullet-active",
                    clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                slidesPerView={'1'}
            >
                <SwiperSlide>
                    <div className="w-full h-full flex items-center justify-center">
                        <Image
                            src={`/images/enamad.png`}
                            alt=""
                            width={1000}
                            height={1000}
                            className="w-[100px] mix-blend-multiply"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-full flex items-center justify-center">
                        <Image
                            src={`/images/kasbokar.png`}
                            alt=""
                            width={1000}
                            height={1000}
                            className="w-[80px] mix-blend-multiply"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-full flex items-center justify-center">
                        <Image
                            src={`/images/rezi.png`}
                            alt=""
                            width={1000}
                            height={1000}
                            className="w-[100px] mix-blend-multiply"
                        />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}