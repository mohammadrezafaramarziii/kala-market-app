"use client";
import { useGetUser } from "@/hooks/useAuth";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { toPersianDigit } from "@/utils/toPersianDigit";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/common/loading/Loading";


export default function CartPage() {
  const { data, isPending } = useGetUser();  
  const { user, cart } = data || {};

  if(isPending) {
    return(
      <div className="w-full h-[calc(100vh-3rem-81px-80px)] p-4 lg:p-10">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Loading />
        </div>
      </div>
    )
  }


  if(!user || !data) {
    return(
      <div className="w-full h-[calc(100vh-3rem-81px-80px)] p-4 lg:p-10">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="text-lg lg:text-xl font-semibold text-secondary-800">
            لطفا ابتدا وارد حساب کاربری خود شوید!
          </div>
          <Link href={'/auth'} className="text-sm text-primary-900 mt-2">
            صفحه ورود | ثبت نام 
          </Link>
        </div>
      </div>
    )
  }


  if(!user.cart?.products || user.cart?.products.length === 0) {
    return(
      <div className="w-full h-[calc(100vh-3rem-81px-80px)]">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="mb-4">
            <Image
              src={'/images/empty-cart.png'}
              alt=""
              width={512}
              height={512}
              priority
              className="w-[120px] lg:w-[140px] opacity-70"
            />
          </div>
          <div className="text-lg lg:text-xl font-semibold text-secondary-800">
            سبد خرید شما خالی است!  
          </div>
          <Link href={'/products'} className="text-sm text-primary-900 mt-2">
            مشاهده محصولات 
          </Link>
        </div>
      </div>
    )
  }


  return(
    <div className="w-full p-6 xl:max-w-6xl mx-auto pb-[88px] lg:p-6">
      <div className="w-full">

        {/* ***** title ***** */}
        <h3 className="w-full flex items-center justify-between mb-5 border-b pb-4">
          <div className="font-bold text-secondary-800 lg:text-xl">
            سبد خرید شما
          </div>
          <span className="text-xs text-secondary-500">
            {toPersianDigit(`${cart.productDetail.length} کالا`)}
          </span>
        </h3>


        <div className="grid grid-cols-1 relative lg:grid-cols-12 lg:gap-4 lg:items-start">
          {/* ***** cart items ***** */}
          <div className="flex flex-col gap-4 lg:col-span-8">
            {cart && cart.productDetail.map((item)=>{
              return(
                <CartItem key={item._id} cartItem={item}/>
              )
            })}
          </div>


          {/* ***** cart summary ***** */}
          <div className="py-6 lg:p-0 lg:col-span-4 sticky top-[144px]">
            <CartSummary payDetail={cart.payDetail}/>
            <div className="block text-xs text-secondary-500 px-3 !leading-5 mt-4">
              هزینه این سفارش هنوز پرداخت نشده‌ و در صورت اتمام موجودی، کالاها از سبد خرید حذف می‌شوند 
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
