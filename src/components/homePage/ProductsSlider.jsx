
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "@/styles/swiper.css";

export default function ProductsSlider() {
  return (
    <Swiper
        // autoplay={true}
        slidesPerView={'auto'}
        modules={[Autoplay]}
        className="mySwiper" 
    >
        {[1,2,3,4,5,6,7,8].map((baner, index)=>{
            return(
            <SwiperSlide key={index} className="">
               
            </SwiperSlide>
            )
        })}
    </Swiper>
  )
}
