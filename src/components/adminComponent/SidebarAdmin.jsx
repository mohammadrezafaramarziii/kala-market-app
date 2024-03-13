"use client"
import { ArrowRightIcon, CloseIcon, EditIcon, LogoutIcon, UserSolidIcon } from "@/common/Icons";
import { useGetUser } from "@/hooks/useAuth";
import { toPersianDigit } from "@/utils/toPersianDigit";
import menuJson from "@/app/(admin)/admin/menu.json";
import { renderIconMenu } from "@/app/(admin)/admin/renderIconMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import LogoutModal from "@/app/(admin)/admin/LogoutModal";

export default function SidebarAdmin({ show, onClose }) {
    const { data, isPending } = useGetUser();
    const { user } = data || {};
    const pathname = usePathname();
    const [logoutModal, setLogoutModal] = useState(false);

    return (
        <>
            <LogoutModal show={logoutModal} onClose={() => setLogoutModal(false)} />
            <div onClick={onClose} className={`lg:!hidden ${show ? "block" : "hidden"} overflow-y-auto z-[60] w-full h-full fixed top-0 right-0 bg-secondary-800/30 backdrop-blur-sm`}></div>

            <aside className={`w-full h-full max-[1024px]:max-w-[280px] z-[60] bg-white lg:rounded-lg lg:static fixed top-0 right-0 ${show ? "translate-x-0" : "translate-x-full"} lg:!translate-x-0 duration-200 ease-out`}>

                <div className="lg:hidden absolute top-6 left-6">
                    <button onClick={onClose} className="btn">
                        <CloseIcon className={'w-5 h-5 text-secondary-800'} />
                    </button>
                </div>

                {/* profile data */}
                <div className="px-8 pt-14 lg:pt-8">
                    <div className="space-y-3 border-b border-slate-100 pb-6">
                        <div className="w-full flex items-center justify-center">
                            <div>
                                <div className="w-[55px] btn h-[55px] shadow-xl text-white overflow-hidden rounded-full bg-green-600">
                                    <UserSolidIcon className="w-8 h-8" />
                                </div>
                            </div>
                        </div>

                        <div className="w-full text-center space-y-1">
                            {
                                isPending ?
                                    <div className="w-full flex flex-col gap-1 items-center">
                                        <Skeleton
                                            className="!w-[100px] !h-6 !rounded-lg"
                                            containerClassName="!w-full !h-6 !rounded-lg"
                                        />
                                        <Skeleton
                                            className="!w-[76px] !h-5 !rounded-lg"
                                            containerClassName="!w-full !h-5 !rounded-lg"
                                        />
                                    </div>
                                    :
                                    <>
                                        <h3 className="font-bold text-secondary-800">
                                            {user?.name}
                                        </h3>
                                        <span className="text-xs text-secondary-400">
                                            {toPersianDigit(user.phoneNumber)}
                                        </span>
                                    </>
                            }
                        </div>
                    </div>
                </div>

                {/* menu */}
                <div>
                    <ul className="flex flex-col">
                        {menuJson.map((menu, index) => {
                            return (
                                <li key={index} className="">
                                    <Link onClick={onClose} href={menu.link} className={`${pathname === menu.link ? "font-semibold text-primary-900 bg-gradient-to-r from-primary-100/20" : "text-secondary-400"} text-xs  px-8 w-full flex`}>
                                        <div className="w-full py-4 flex items-center justify-between border-b border-slate-100">
                                            <div className="flex items-center gap-2">
                                                {renderIconMenu(menu.label)}
                                                <span>
                                                    {menu.title}
                                                </span>
                                            </div>
                                            <ArrowRightIcon className={'w-4 h-4 rotate-180'} />
                                        </div>
                                    </Link>
                                </li>
                            )
                        })}

                        <li>
                            <button onClick={() => setLogoutModal(true)} className={`!text-error text-xs  px-8 w-full flex`}>
                                <div className="w-full py-4 flex items-center justify-between border-b border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <LogoutIcon className={'w-5 h-5'}/>
                                        <span>
                                            خروج از حساب کاربری
                                        </span>
                                    </div>
                                    <ArrowRightIcon className={'w-4 h-4 rotate-180'} />
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>

            </aside>
        </>
    )
}