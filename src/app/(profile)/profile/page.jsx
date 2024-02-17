"use client"
import { ArrowRightIcon, CartIcon, HeartIcon, OrderBagIcon, OrderIcon } from "@/common/Icons";
import { useGetUser } from "@/hooks/useAuth";
import { toPersianDigit } from "@/utils/toPersianDigit";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import Loading from "@/common/loading/Loading";

export default function HomeProfile(){
    const { data, isPending } = useGetUser();
    const { user, payments } = data || {};
    const [paiedProducts, setPaiedProducts] = useState(0);
    const [counter,setCounter] = useState(1);

    useEffect(()=>{
        if(!isPending) {
            if(counter !== payments.length){
                payments.map((payment)=>{
                    setPaiedProducts(payment.cart.productDetail.length + paiedProducts)
                    setCounter(counter+1)
                })
            }
        }
    })
    
    return(
        <>
            {/* order states */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="w-full flex-col gap-3 p-8 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                    <div className="flex items-center justify-center gap-2 p-2 bg-success rounded-lg text-white text-[10px] sm:text-xs">
                        <OrderIcon className={'w-5 h-5'}/>
                        تعداد کل سفارشات
                    </div>

                    {
                        isPending ?
                        <Skeleton 
                            containerClassName="!w-8 !h-8 !block"
                            className="!w-full !h-8 !block !rounded-lg"
                        />
                        :
                        <div className="text-2xl text-secondary-800 font-bold">
                            {toPersianDigit(payments ? payments.length : "0")}
                        </div>
                    }

                    <div className="text-xs text-secondary-700">
                        سفارش
                    </div>
                </div>

                <div className="w-full flex-col gap-3 p-8 bg-white rounded-2xl shadow-xl flex items-center justify-center">

                    <div className="flex items-center justify-center gap-2 p-2 bg-warning rounded-lg text-white text-[10px] sm:text-xs">
                        <OrderBagIcon className={'w-5 h-5'}/>
                        تعداد محصولات خریداری شده
                    </div>
                        {/* {toPersianDigit(payments ? paiedProducts : "0")} */}
                    {
                        isPending ?
                        <Skeleton 
                            containerClassName="!w-8 !h-8 !block"
                            className="!w-full !h-8 !block !rounded-lg"
                        />
                        :
                        <div className="text-2xl text-secondary-800 font-bold">
                            {toPersianDigit(paiedProducts)}
                        </div>
                    }

                    <div className="text-xs text-secondary-700">
                        کالا
                    </div>
                </div>

                <div className="w-full flex-col gap-3 p-8 bg-white rounded-2xl shadow-xl flex items-center justify-center">

                    <div className="flex items-center justify-center gap-2 p-2 bg-primary-900 rounded-lg text-white text-[10px] sm:text-xs">
                        <CartIcon className={'w-5 h-5'}/>
                        محصولات سبد خرید
                    </div>

                    {
                        isPending ?
                        <Skeleton 
                            containerClassName="!w-8 !h-8 !block"
                            className="!w-full !h-8 !block !rounded-lg"
                        />
                        :
                        <div className="text-2xl text-secondary-800 font-bold">
                            {toPersianDigit(payments && user?.cart?.products.length !== 0 ? user?.cart?.products.length : "0")}
                        </div>
                    }

                    <div className="text-xs text-secondary-700">
                      محصول
                    </div>
                </div>
            </div>


            {/* favorite */}
            <div className="p-6">
                <div className="w-full mb-6 flex-col gap-3 min-[430px]:flex-row flex items-center justify-between">
                    <div className="text-xl lg:text-2xl text-secondary-900 font-bold">
                        علاقه مندی های من
                    </div>
                    
                    {
                        !isPending && user.likedProducts.length !== 0 &&
                    
                        <button className="!w-auto btn btn--primary !text-xs gap-2 px-3 !h-10">
                            مشاهده همه
                            <ArrowRightIcon className={'rotate-180 w-5 h-6'}/>
                        </button>
                    }
                </div>

                {
                    isPending ?
                    <div className="py-8 flex items-center justify-center">
                        <Loading />
                    </div>
                    :
                    user.likedProducts.length !== 0 ?
                    <div>لایک شده ها</div>
                    :
                    <div className="flex-col gap-3 py-8 flex items-center justify-center">
                        <HeartIcon className={'w-14 h-14 text-secondary-400/30'}/>
                        <div className="text-xl text-secondary-700 font-bold">
                            محصولی موجود نیست
                        </div>
                        <Link href={'/products'} className="text-xs text-primary-900">
                            مشاهده محصولات
                        </Link>
                    </div>
                }
                
            </div>
        </>
    )
}