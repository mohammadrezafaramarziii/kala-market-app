"use client";
import { CartIcon, HomeIcon, LogoutIcon, MenuIcon } from "@/common/Icons";
import { useGetUser } from "@/hooks/useAuth";
import { toPersianDigit } from "@/utils/toPersianDigit";
import Link from "next/link";
import { useState } from "react";
import { logout } from "@/services/authService";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import Sidebar from "./Siderbar";


export default function Titlebar(){
    const todayDate = new Date().toLocaleDateString('fa-IR', {year: 'numeric', month: 'long', day: 'numeric'});
    const weekday = new Date().toLocaleDateString('fa-IR', {weekday:"long"});
    const { data, isPending } = useGetUser();
    const { user } = data || {};
    const [showSidebar, setShowsidebar] = useState(false);

    const logoutHandler = async () => {
        await logout();
        document.location.href = "/";
    }

    return(
        <>
        <div className="lg:hidden">
            <Sidebar show={showSidebar} onClose={()=>setShowsidebar(false)}/>
        </div>

        <div className="w-full md:flex items-center justify-between p-6 sticky lg:static top-0 right-0 z-50">

            <div className="w-full sm:w-auto flex sm:inline-flex bg-white lg:bg-transparent lg:shadow-none items-center gap-4 p-6 lg:p-6 shadow-2xl rounded-2xl">
                <button onClick={()=>setShowsidebar(true)} className="lg:!hidden btn text-secondary-800">
                    <MenuIcon className={'w-6 h-6'}/>
                </button>
                <div className="flex-1 flex flex-col gap-1 sm:flex-row sm:gap-6 sm:items-center">
                    <div className="lg:hidden">
                    {
                        isPending ?
                        <Skeleton 
                            containerClassName="!w-[200px] !h-6 !block"
                            className="!w-full !h-6 !block !rounded-lg"
                        />
                        :
                        <h1 className="text-secondary-800 font-bold">
                            {toPersianDigit(`سلام ${user.name} عزیز، خوش آمدید`)}
                        </h1>
                    }
                    </div>
                    <h1 className="text-secondary-800 font-bold text-3xl hidden lg:block">
                        پنل ادمین
                    </h1>
                    <div className="text-xs text-secondary-500">
                        امروز {weekday} {todayDate}
                    </div>
                </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
                <button onClick={logoutHandler} className="btn btn--light !w-10 !h-10 shadow-xl">
                    <LogoutIcon className={'w-5 h-5'}/>
                </button>

                <Link href={'/'} className="btn btn--light !w-10 !h-10 shadow-xl">
                    <HomeIcon className={'w-5 h-5'}/>
                </Link>
            </div>
        </div>
        </>
    )
}