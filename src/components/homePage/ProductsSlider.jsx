import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "@/styles/swiper.css";
import Link from "next/link";
import { DownIcon, MoreIcon } from "@/common/Icons";
import ProductCard from "../ProductCard";
import Skeleton from "react-loading-skeleton";

export default function ProductsSlider({ title, etitle, href, products, isLoading, name }) {
  return (
    <div>

      <div className="w-full px-6 mb-6">
        <div className="w-full flex items-end justify-between">
          
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-[36px] sm:h-12 bg-primary-900 rounded-full"></div>
            <div className="flex flex-col border-r6 border-primary-900 pr3">
              <div className="text-xs sm:text-sm text-secondary-300 font-semibold">
                {etitle}
              </div>
              <div className="text-secondary-900 text-sm sm:text-lg font-semibold">
                {title}
              </div>
            </div>
          </div>

          <Link href={href} className="btn text-primary-900 text-xs flex items-center gap-1">
            <span>مشاهد همه</span>
            <div><MoreIcon className={'w-6 h-6'}/></div>
          </Link>
        </div>
      </div>

      <Swiper
        className="mySwiper !pb-10 !pl-6 lg:!pl-0 !pr-6" 
        navigation={{ nextEl: `.${name}-arrow-left`, prevEl: `.${name}-arrow-right` }}
        modules={[Navigation]}
        breakpoints={{
          0:{
            slidesPerView:1,
            spaceBetween:24
          },
          430:{
            slidesPerView:'auto',
            spaceBetween:0
          }
        }}
      >
        {
          isLoading ?
          [1,2,3,4,5].map((item)=>{
            return(
              <SwiperSlide key={item} className="ml-6 min-[430px]:!w-[250px] !h-[416px]">
                <Skeleton className="!w-full !h-full !rounded-xl"/>
              </SwiperSlide>
            )
          })
          :
          products.map((product, index)=>{
            if(Number(product.countInStock) !== 0) {
              return(
              <SwiperSlide key={index} className="min-[430px]:ml-6 !h-auto min-[430px]:!w-[250px]">
                <ProductCard product={product} isLoading={isLoading} className={'h-full'} notShowHome={true}/>
              </SwiperSlide>
              )
            }
          })
        }
        
        
        <button className={`${name}-arrow-right disabled:!hidden !hidden lg:!flex z-20 !w-12 !h-12 !rounded-full btn btn--light absolute right-8 top-[calc(50%-40px)] translate-y-1/2`}>
          <DownIcon className={'-rotate-90 w-5 h-5'}/>
        </button>
        <button className={`${name}-arrow-left disabled:!hidden !hidden lg:!flex z-20 !w-12 !h-12 !rounded-full btn btn--light absolute left-8 top-[calc(50%-40px)] translate-y-1/2`}>
          <DownIcon className={'rotate-90 w-5 h-5'}/>
        </button>
      </Swiper>
    </div>
  )
}
