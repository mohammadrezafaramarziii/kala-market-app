"use client";
import Link from "next/link"
import { CartIcon, CategoryIcon, HomeIcon, LoginIcon, UserAdminIcon, UserIcon } from "@/common/Icons"
import { usePathname } from "next/navigation"
import { useGetUser } from "@/hooks/useAuth";
import { toPersianDigit } from "@/utils/toPersianDigit";

export default function BottomMenu(){
    const pathname = usePathname();

    const { data, isPending } = useGetUser();

    const { user, cart }  = data || {};

    if(pathname === "/auth" || pathname === "/complete-profile") return null
    if(pathname.startsWith("/products") && pathname !== "/products") return null

    return(
        <div className="w-full fixed bottom-0 right-0 lg:hidden z-50">
            <div className="bg-white py-4 px-6 shadow-[0_-10px_25px_-5px_rgb(0,0,0,0.1)]">
                <ul className="w-full flex items-center justify-between gap-4">
                    <li className={`w-full ${pathname === "/" ? "text-primary-900 before:h-[3px]" : "text-slate-600 before:h-0"} relative before:w-full before:absolute before:-bottom-4 before:right-0 before:bg-primary-900 before:duration-200 before:rounded-t-full`}>
                        <Link 
                            href={'/'}
                            className="flex flex-col items-center gap-2"
                        >
                            <HomeIcon className={'w-6 h-6'}/>
                            <span className="text-xs truncate">
                                خانه
                            </span>
                        </Link>
                    </li>
                    <li className={`w-full ${pathname === "/products" ? "text-primary-900 before:h-[3px]" : "text-slate-600 before:h-0"} relative before:w-full before:absolute before:-bottom-4 before:right-0 before:bg-primary-900 before:duration-200 before:rounded-t-full`}>
                        <Link 
                            href={'/products'}
                            className="flex flex-col items-center gap-2"
                        >
                            <CategoryIcon className={'w-6 h-6'}/>
                            <span className="text-xs truncate">
                                محصولات
                            </span>
                        </Link>
                    </li>
                    <li className={`w-full ${pathname === "/cart" ? "text-primary-900 before:h-[3px]" : "text-slate-600 before:h-0"} relative before:w-full before:absolute before:-bottom-4 before:right-0 before:bg-primary-900 before:duration-200 before:rounded-t-full`}>
                        <Link 
                            href={'/cart'}
                            className="flex flex-col items-center gap-2"
                        >
                            <div className="w-auto relative">
                                {
                                cart && cart.payDetail.productIds.length !== 0 &&
                                <div className="absolute flex items-center justify-center top-[13px] right-[-3px] w-4 h-4 text-[10px] rounded-full bg-error text-white">
                                    {toPersianDigit(cart ? cart.payDetail.productIds.length : "0")}
                                </div>
                                }
                                <CartIcon className={'w-6 h-6'}/>
                            </div>
                            <span className="text-xs truncate">
                                سبد خرید
                            </span>
                        </Link>
                    </li>
                    {
                        user && user.role === "ADMIN" &&
                        <li className={`w-full ${pathname === "/admin" ? "text-primary-900 before:h-[3px]" : "text-slate-600 before:h-0"} relative before:w-full before:absolute before:-bottom-4 before:right-0 before:bg-primary-900 before:duration-200 before:rounded-t-full`}>
                            <Link 
                                href={"/admin"}
                                className="flex flex-col items-center gap-2"
                            >
                                <UserAdminIcon className={'w-6 h-6'}/>
                                <span className="text-xs truncate">
                                    پنل ادمین
                                </span>
                            </Link>
                        </li>
                    }
                    {
                        isPending ?
                        <li className={`w-full flex flex-col justify-center gap-2 items-center relative before:w-full before:absolute before:-bottom-4 before:right-0 before:bg-primary-900 before:duration-200 before:rounded-t-full`}>
                            <div className="w-6 h-6 bg-slate-100 rounded-full"></div>
                            <div className="w-full h-4 bg-slate-100 rounded-lg"></div>
                        </li>
                        :
                        <li className={`w-full ${pathname.startsWith("/profile") ? "text-primary-900 before:h-[3px]" : "text-slate-600 before:h-0"} relative before:w-full before:absolute before:-bottom-4 before:right-0 before:bg-primary-900 before:duration-200 before:rounded-t-full`}>
                            <Link 
                                href={user ? "/profile" : "/auth"}
                                className="flex flex-col items-center gap-2"
                            >
                                {user ?  <UserIcon className={'w-6 h-6'}/> :  <LoginIcon className={'w-6 h-6'}/>}
                                <span className="text-xs truncate">
                                    {user ? "حساب کاربری" : "ورود | ثب نام"}
                                </span>
                            </Link>
                        </li>
                    }
                </ul>
            </div>
        </div>
    )
}