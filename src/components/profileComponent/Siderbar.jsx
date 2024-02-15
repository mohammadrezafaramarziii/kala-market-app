"use client";
import { EditIcon, LogoutIcon } from "@/common/Icons";
import { useGetUser } from "@/hooks/useAuth";
import { toPersianDigit } from "@/utils/toPersianDigit";
import menuJson from "@/app/(profile)/profile/menu.json";
import Link from "next/link";
import { renderIconMenu } from "@/app/(profile)/profile/renderIconMenu";
import { usePathname } from "next/navigation";
import LogoutModal from "@/app/(profile)/profile/LogoutModal";
import { useState } from "react";

export default function Sidebar(){
    const { data, isPending } = useGetUser();
    const { user } = data || {};
    const pathname = usePathname();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    return(
        <aside className="w-full bg-white h-full rounded-2xl border p-8">
            <div className="w-full flex items-center justify-between border-b border-slate-200 pb-5">
                <LogoutModal 
                    show={showLogoutModal} 
                    onClose={()=>setShowLogoutModal(false)}
                    modalName={'logout-modal-desk'}
                />

                {
                    isPending ?
                    <div className="w-full flex flex-col gap-1">
                        <div className="w-[137px] h-[28px] bg-slate-100 rounded-lg"></div>
                        <div className="w-[90px] h-5 bg-slate-100 rounded-lg"></div>
                    </div>
                    :
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-semibold text-secondary-800">
                            {user.name}
                        </h2>
                        <span className="text-sm text-secondary-400">
                            {toPersianDigit(user.phoneNumber)}
                        </span>
                    </div>
                }

                <Link href={'/profile/personal-info'} className="btn text-primary-900">
                    <EditIcon className={'w-5 h-5'}/>
                </Link>
            </div>

            <div>
                <ul>
                    {menuJson.map((item, index)=>(
                        <li key={index} className={`${pathname === item.link ? "before:w-[3px]  text-primary-900" : "before:w-0  text-secondary-800"} border-b first:border-t border-slate-200 py-4 relative before:absolute before:top-0 before:-right-8 before:bg-primary-900 before:rounded-l-full before:h-full before:duration-200`}>
                            <Link href={item.link} className="w-full flex items-center gap-2">
                                {renderIconMenu(item.label)}
                                <span className="text-sm font-medium">
                                    {item.title}
                                </span>
                            </Link>
                        </li>
                    ))}
                    <button onClick={()=>setShowLogoutModal(true)} className="!w-full !rounded-none btn text-error !justify-start !gap-2 border-b first:border-t border-slate-200 py-4">
                        <LogoutIcon className={'w-5 h-5'}/>
                        <span className="text-sm font-medium">
                            خروج از حساب کاربری
                        </span>
                    </button>
                </ul>
            </div>
        </aside>
    )
}