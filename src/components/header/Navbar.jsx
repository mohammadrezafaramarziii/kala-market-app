"use client";
import { LoginIcon, MenuIcon, SearchIcon, UserIcon, UserSolidIcon } from "@/common/Icons";
import Image from "next/image";
import Link from "next/link";
import { toPersianDigit } from "@/utils/toPersianDigit";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { useGetUser } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SidebarMenu from "./SidebarMenu";

export default function Navbar() {
    const { data, isPending } = useGetUser();
    const { user, cart } = data || {};
    const [screenSize, setScreenSize] = useState();
    const [showSidebarMenu, setShowSidebarMenu] = useState(false);
    const pathName = usePathname();

    useEffect(() => {
        const resizeHandler = () => {
            setScreenSize(window.innerWidth);
        }

        if (!screenSize) resizeHandler();
        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener("resize", resizeHandler);
        }
    })

    if (pathName === "/auth" || pathName === "/complete-profile") return null
    if (pathName.startsWith("/products") && pathName !== "/products" &&  screenSize <= 1024) return null

    return (
        <>

            {
                screenSize <= 1024 &&
                <SidebarMenu onClose={() => setShowSidebarMenu(false)} show={showSidebarMenu} />
            }

            <header className={`w-full sticky z-[60] bg-white  shadow-[0px_30px_16px_-30px_rgba(0,0,0,0.1)] top-0 right-0`}>

                <nav className="py-5 lg:py-6 px-6 xl:max-w-6xl mx-auto">

                    <div className="border-slate-50 w-full flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between lg:gap-4 xl:gap-8">
                        <div className="flex items-center justify-between">
                            <div className="lg:hidden">
                                <button onClick={() => setShowSidebarMenu(true)} className="btn text-secondary-800">
                                    <MenuIcon className={'w-6 h-6'} />
                                </button>
                            </div>

                            <div className="flex w-10 md:w-[160px]">
                                <Link href={'/'} className="w-full h-full inline-block">
                                    <Image
                                        src={'/images/logo-sm.svg'}
                                        alt=""
                                        width={1000}
                                        height={1000}
                                        priority
                                        className="w-full md:hidden"
                                    />
                                    <Image
                                        src={'/images/logo-lg.svg'}
                                        alt=""
                                        width={1000}
                                        height={1000}
                                        priority
                                        className="w-full hidden md:block"
                                    />
                                </Link>
                            </div>

                            <div className="lg:hidden">
                                <Link href={user && !isPending ? "/profile" : "/auth"} className="btn text-secondary-800">
                                    <UserIcon className={'w-6 h-6'} />
                                </Link>
                            </div>
                        </div>

                        <div className="w-full lg:flex justify-center hidden">
                            <div className="w-full xl:max-w-[90%] h-12 md:h-14 px-5 bg-slate-100 flex items-center justify-between rounded-xl">
                                <p className="text-secondary-400 text-xs">جستجو بین محصولات</p>
                                <SearchIcon className={'w-5 h-5 !text-secondary-400'} />
                            </div>
                        </div>

                        <div className="hidden lg:flex items-center gap-4">
                            {
                                isPending ?
                                    <div className="!w-[143px] flex items-center gap-1">
                                        <Skeleton
                                            containerClassName="!w-10 !h-10 !block"
                                            className="!w-10 !h-10 !block !rounded-full"
                                        />
                                        <div className="flex flex-col gap-1">
                                            <Skeleton
                                                containerClassName="!w-[90px] !h-5 !block"
                                                className="!w-full !h-5 !block !rounded-md"
                                            />
                                            <Skeleton
                                                containerClassName="!w-[60px] !h-4 !block"
                                                className="!w-full !h-4 !block !rounded-md"
                                            />
                                        </div>
                                    </div>
                                    :
                                    user ?
                                        <Link href={'/profile'} className="w-[143px] btn text-sm !items-start gap-1 text-secondary-700 hover:text-secondary-900">
                                            <div>
                                                <div className="w-10 btn h-10 text-white overflow-hidden rounded-full bg-purple-800">
                                                    <UserSolidIcon className="w-6 h-6" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start gap-1">
                                                <div className="text-secondary-800 font-medium">حساب کاربری</div>
                                                <div className="text-xs text-secondary-600">{user.name || "کاربر"}</div>
                                            </div>
                                        </Link>
                                        :
                                        <Link href={'/auth'} className="w-[143px] btn text-sm gap-3 text-secondary-700 hover:text-secondary-900">
                                            ورود | ثبت نام
                                            <LoginIcon className={'w-5 h-5'} />
                                        </Link>
                            }

                            <Link href={'/cart'} className="w-[143px] btn btn--primary gap-3">
                                <div>
                                    سبد خرید
                                </div>
                                {cart && cart.payDetail.productIds.length !== 0 &&
                                    <div className="w-10 h-10 btn text-2xl font-semibold border-r border-slate-200/50 rounded-full">
                                        {toPersianDigit(cart.payDetail.productIds.length)}
                                    </div>
                                }
                            </Link>
                        </div>
                    </div>

                </nav>
            </header>
        </>
    )
}