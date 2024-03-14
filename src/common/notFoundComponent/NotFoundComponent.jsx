"use client"
import { toPersianDigit } from "@/utils/toPersianDigit";
import style from "./not-found.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ResetIcon } from "../Icons";
import Link from "next/link";

export default function NotFoundComponent() {
    const [timer, setTimer] = useState(7);
    const router = useRouter();

    // useEffect(()=>{
    //     const time = timer != 0 && setTimeout(()=>setTimer(timer-1), 1000);
    //     if(timer === 0) router.replace("/");
    //     return () => clearTimeout(time)
    // })

    return (
        <div className="w-full py-12 flex flex-col items-center">

            <div className="mb-2">
                <Image
                    src={'/images/404-icon.png'}
                    alt="404 page"
                    width={100}
                    height={100}
                    priority
                />
            </div>

            <h2 className="text-xl text-error font-bold mb-3"> صفحه مورد نظر یافت نشد!</h2>

            <div className="flex items-center justify-center gap-3 text-sm text-secondary-600">
                <span>تا</span>
                <div className="w-12 h-12 text-xl text-secondary-800 font-bold flex items-center justify-center relative">
                    {toPersianDigit(timer)}
                    <span className={`${style.loader} absolute top right-0`}>

                    </span>
                </div>
                <span>ثانیه دیگر به صفحه اصلی منتقل می شوید</span>
            </div>

            <div className="mt-14">
                <Link href={'/'} className="w-full gap-4 px-5 !text-xs btn btn--primary">
                    <span className="">
                        بازگشت به صفحه اصلی
                    </span>
                    <span className="pt-1 border-r pr-4 border-slate-50/30">
                        <ResetIcon className={'w-5 h-5'} />
                    </span>
                </Link>
            </div>

        </div>
    )
}