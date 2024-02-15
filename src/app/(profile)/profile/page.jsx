"use client"
import { EditIcon, LogoutIcon } from "@/common/Icons";
import { useGetUser } from "@/hooks/useAuth";
import { toPersianDigit } from "@/utils/toPersianDigit";
import Sectionbox from "@/components/profileComponent/Sectionbox";
import menuJson from "./menu.json";
import Link from "next/link";
import { renderIconMenu } from "./renderIconMenu";
import LoadingFix from "@/common/loading/LoadingFix";
import { useState } from "react";
import LogoutModal from "./LogoutModal";

export default function HomeProfile(){
    const { data, isPending } = useGetUser();
    const { user } = data || {};
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    return(
        <div className="">

            <div className="w-full lg:hidden flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
                <LogoutModal 
                    show={showLogoutModal} 
                    onClose={()=>setShowLogoutModal(false)}
                    modalName={'logout-modal-mob'}
                />
                {
                    isPending ?
                    <div className="flex flex-col gap-1">
                        <div className="w-[110px] h-6 bg-slate-200 rounded-md"></div>
                        <div className="w-[60px] h-4 bg-slate-200 rounded-md"></div>
                    </div>
                    :
                    <div className="flex flex-col gap-1">
                        <div className=" text-slate-800 font-semibold">{user.name}</div>
                        <div className="text-xs text-slate-500">{toPersianDigit(user.phoneNumber)}</div>
                    </div>
                }
                <Link href={'/profile/personal-info'} className="btn text-primary-900">
                    <EditIcon className={'w-5 h-5'}/>
                </Link>
            </div>

            <Sectionbox title={'سفارش های من'} isAllBtn={true}>
                در این بخش سفارشات من است
            </Sectionbox>

            <div className="w-[calc(100%+48px)] border-y-[10px] -mr-6 my-8 px-6 py-4 lg:hidden">
                <ul className="flex flex-col">
                    {menuJson.map((item, index)=>(
                        <li key={index} className="border-b first:border-t border-slate-200 py-4">
                            <Link href={item.link} className="w-full flex items-center gap-2 text-secondary-800">
                                {renderIconMenu(item.label)}
                                <span className="text-sm font-medium">
                                    {item.title}
                                </span>
                            </Link>
                        </li>
                    ))}
                    <button onClick={()=>setShowLogoutModal(true)} className="btn text-error !rounded-none !justify-start !gap-2 border-b first:border-t border-slate-200 py-4">
                        <LogoutIcon className={'w-5 h-5'}/>
                        <span className="text-sm font-medium">
                            خروج از حساب کاربری
                        </span>
                    </button>
                </ul>
            </div>
        </div>
    )
}