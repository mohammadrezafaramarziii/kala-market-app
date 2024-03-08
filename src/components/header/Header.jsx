"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import { CartIcon, LoginIcon, UserAdminIcon, UserIcon } from "@/common/Icons";
import { toPersianDigit } from "@/utils/toPersianDigit";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/services/authService";
import { useGetUser } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export default function Header() {
  const items = ["شگفت انگیز ها", "کارت هدیه", "پرفروش ترین", "تخفیف ها و پیشنهاد ها", "سوالی دارید؟"]
  const pathName = usePathname();
  const { data, error, isPending } = useGetUser();
  const [screenSize, setScreenSize] = useState(typeof window !== "undefined" && window.innerWidth);

  const { user, cart }  = data || {};

  useEffect(()=>{
    const resizeHandler = () =>{
      setScreenSize(window.innerWidth);
    }
    
    if(!screenSize) resizeHandler();
    window.addEventListener("resize", resizeHandler);

    return()=>{
      window.removeEventListener("resize", resizeHandler);
    }
  })

  if(pathName === "/auth" || pathName === "/complete-profile") return null
  if(pathName.startsWith("/products") && pathName !== "/products" && screenSize <= 1024) return null

  return (
    <header className={`w-full flex flex-col gap-6 p-3 lg:px-6 shadow sticky top-0 right-0 bg-background transition-all duration-200 z-50`}>
        <div className="w-full flex items-center justify-between">
          <div className="w-full flex items-center gap-3">
            <div className="hidden lg:flex w-[170px]">
              <Link href={'/'}>
                <Image
                  src={'/images/logo-lg.svg'}
                  alt=""
                  width={1000}
                  height={1000}
                  priority
                  className="w-full"
                />
              </Link>
            </div>
            <SearchBar />
          </div>

          <div className="w-full hidden lg:flex items-center flex-row-reverse gap-2">
            
            {
              isPending ?
              <div className="btn btn--primary hover:outline-none !bg-slate-200 !w-[143px]"></div>
              :
              user ?
              <Link href={'/profile'} className="btn btn--iconText">
                <UserIcon className={'w-6 h-6'}/>
                <span className="mb-1">
                  {user.name}
                </span>
              </Link>
              :
              <Link href={'/auth'} className="btn btn--iconText">
                <LoginIcon className={'w-6 h-6'}/>
                <span className="mb-1">
                  ورود | ثبت نام
                </span>
              </Link>
            }
            

            <Link href={'/cart'} className="btn btn--light w-12 relative">
              <CartIcon className={'w-6 h-6'}/>
              {
                cart && cart.payDetail.productIds.length !== 0 &&
                <div className="absolute flex items-center justify-center -top-[3px] -right-1 w-4 h-4 text-[10px] rounded-full bg-error text-white">
                  {toPersianDigit(cart ? cart.payDetail.productIds.length : "0")}
                </div>
              }
            </Link>

            {
              user && user.role === "ADMIN" &&
              <Link href={'/admin'} className="btn btn--light w-12 relative">
                <UserAdminIcon className={'w-6 h-6'}/>
              </Link>
            }
          </div>
        </div>

        <div className="hidden lg:block">
          <ul className="flex items-center gap-6 text-xs text-slate-500">
            <li 
              className="relative before:absolute before:-bottom-3 before:w-0 before:h-[2px] before:bg-primary-900 before:rounded-t-full before:hover:w-full before:duration-200"
            >
              <Link href={'/products'}>
                محصولات
              </Link>
            </li>
            {
              items.map((item, index)=>(
                <li 
                  key={index}
                  className="relative before:absolute before:-bottom-3 before:w-0 before:h-[2px] before:bg-primary-900 before:rounded-t-full before:hover:w-full before:duration-200"
                >
                  {item}
                </li>
              ))
            }
          </ul>
        </div>
    </header>
  )
}
