"use client";
import { EditIcon, LogoutIcon, UserIcon } from "@/common/Icons";
import { useGetUser } from "@/hooks/useAuth";
import { toPersianDigit } from "@/utils/toPersianDigit";
import menuJson from "@/app/(admin)/admin/menu.json";
import Link from "next/link";
import { renderIconMenu } from "@/app/(admin)/admin/renderIconMenu";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { logout } from "@/services/authService";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


export default function Sidebar({show, onClose}){
    const { data, isPending } = useGetUser();
    const { user } = data || {};
    const pathname = usePathname();

    const logoutHandler = async () => {
        await logout();
        document.location.href = "/";
    }

    useEffect(()=>{
        if(show) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    },[show])


    return(
        <>
        <div onClick={onClose} className={`${show ? "block" : "hidden"} lg:!hidden fixed top-0 right-0 w-full h-screen bg-secondary-800/30 backdrop-blur-sm z-[900]`}></div>
        <aside className={`${show ? "translate-x-0" : "translate-x-full"} lg:static lg:!translate-x-0 w-full max-w-[350px] duration-300 ease-in-out bg-white h-full z-[9000] fixed top-0 right-0`}>
            <div>
                <div className="w-full flex items-center justify-center bg-primary-700 pt-12 pb-20">
                    <Image
                        src={'/images/logo-lg-white.svg'}
                        alt=""
                        width={1000}
                        height={1000}
                        className="w-[170px]"
                    />
                </div>

                <div className="w-full px-5 -mt-[44px]">
                    <div className="flex items-center justify-between bg-white shadow-2xl p-4 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col gap-1">
                                {
                                    isPending ?
                                    <Skeleton 
                                        containerClassName="!w-[100px] !h-6 !block"
                                        className="!w-full !h-6 !block !rounded-lg"
                                    />
                                    :
                                    <div className="text-secondary-800 font-bold truncate">
                                        {user.name}
                                    </div>
                                }

                                {
                                    isPending ?
                                    <Skeleton 
                                        containerClassName="!w-[70px] !h-4 !block"
                                        className="!w-full !h-4 !block !rounded-lg"
                                    />
                                    :
                                    <span className="text-xs text-secondary-500">
                                        {toPersianDigit(user.phoneNumber)}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col gap-6 p-6">
                    <div className="text-xs px-4 text-secondary-500">
                        فهرست
                    </div>

                    <ul className="flex flex-col">
                        {menuJson.map((item, index)=>{
                            return(
                                <li key={index} onClick={onClose} className={`text-sm ${pathname === item.link ? "text-primary-900 font-bold bg-slate-200 rounded-xl" : "text-secondary-800"} px-4 w-full h-12 flex items-center`}>
                                    <Link href={item.link} className="w-full flex items-center gap-2">
                                        {renderIconMenu(item.label)}
                                        {item.title}
                                    </Link>  
                                </li>
                            )
                        })}
                        <button onClick={logoutHandler} className={`text-sm text-error px-4 w-full h-12 flex items-center`}>
                            <div className="w-full flex items-center gap-2">
                                <LogoutIcon className={'w-6 h-6'}/>
                                خروج از حساب
                            </div>  
                        </button>
                    </ul>
                </div>
            </div>

        </aside>
        </>
    )
}