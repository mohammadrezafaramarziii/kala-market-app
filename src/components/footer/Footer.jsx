"use client"
import Image from "next/image";
import { EmailIcon, FacebookIcon, InstagramIcon, MedalIcon, PayInHomeIcon, ReturnTen, SupportIcon, TwitterIcon, YoutubeIcon } from "@/common/Icons";
import EnamdSlider from "./EnamdSlider";
import { toPersianDigit } from "@/utils/toPersianDigit";
import { usePathname } from "next/navigation";

export default function Footer(){
    const pathname = usePathname();

    if(pathname === "/cart") return null
    if(pathname === "/auth") return null

    return(
        <footer className="w-full mt-20">

            <div className="w-full px-6 flex flex-col lg:flex-row justify-center items-center gap-4 mb-8 lg:mb-12">
                <div className="w-full lg:w-[200px] flex items-center gap-4">
                    <div className="lg:hidden flex-1 h-px bg-slate-200"></div>
                    <div className="w-[170px] lg:w-[200px]">
                        <Image
                            src={'/images/logo-lg.svg'}
                            alt=""
                            width={1000}
                            height={1000}
                            priority
                            className="w-full"
                        />
                    </div>
                    <div className="lg:hidden flex-1 h-px bg-slate-200"></div>
                </div>
                <div className="hidden lg:block flex-1 h-px bg-slate-200"></div>
                <div>
                    <ul className="w-full flex items-center gap-2">
                        <li className="w-12 h-12 duration-150 hover:bg-primary-900 hover:!text-white bg-white rounded-xl flex items-center justify-center text-primary-900">
                            <InstagramIcon className={'w-5 h-5'}/>
                        </li>
                        <li className="w-12 h-12 duration-150 hover:bg-primary-900 hover:!text-white bg-white rounded-xl flex items-center justify-center text-primary-900">
                            <TwitterIcon className={'w-5 h-5'}/>
                        </li>
                        <li className="w-12 h-12 duration-150 hover:bg-primary-900 hover:!text-white bg-white rounded-xl flex items-center justify-center text-primary-900">
                            <FacebookIcon className={'w-5 h-5'}/>
                        </li>
                        <li className="w-12 h-12 duration-150 hover:bg-primary-900 hover:!text-white bg-white rounded-xl flex items-center justify-center text-primary-900">
                            <YoutubeIcon className={'w-5 h-5'}/>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-10 gap-8 mb-10 px-6">
                <div className="flex flex-col items-center lg:items-start gap-2 lg:col-span-3">
                    <h4 className="text-secondary-900 font-bold md:text-xl">
                        درباره کالا مارکت
                    </h4>
                    <p className="max-w-[300px] text-center lg:text-right text-xs md:text-sm md:leading-[26px] text-secondary-600 leading-[24px] ">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفادهلورم ایپسوم متن ساختگی با تولید سادگی از چاپ و با استفادهلورم ایپسوم متن ساختگی با تولید با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
                    </p>
                </div>
                <div className="flex flex-col items-center lg:items-start gap-2 lg:col-span-2">
                    <h4 className="text-secondary-900 font-bold md:text-xl">
                        خدمات مشتریان
                    </h4>
                    <ul className="flex flex-col gap-3 items-center lg:items-start">
                        <li className="text-xs text-secondary-600 md:text-sm">
                            پاسخ به پرسش های متداول
                        </li>
                        <li className="text-xs text-secondary-600 md:text-sm">
                            شرایط استفاده
                        </li>
                        <li className="text-xs text-secondary-600 md:text-sm">
                            حریم خصوصی
                        </li>
                        <li className="text-xs text-secondary-600 md:text-sm">
                            پشتیبانی
                        </li>
                        <li className="text-xs text-secondary-600 md:text-sm">
                            گزارش باگ
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col items-center lg:items-start gap-2 lg:col-span-2">
                    <h4 className="text-secondary-900 font-bold md:text-xl">
                        راهنمای خرید
                    </h4>
                    <ul className="flex flex-col gap-3 items-center lg:items-start">
                        <li className="text-xs text-secondary-600 md:text-sm">
                            نحوه ثبت سفارش
                        </li>
                        <li className="text-xs text-secondary-600 md:text-sm">
                            رویه ارسال سفارش
                        </li>
                        <li className="text-xs text-secondary-600 md:text-sm">
                            شیوه های پرداخت
                        </li>
                    </ul>
                </div>

                <div className="lg:col-span-3">
                    <EnamdSlider />
                </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-20 px-6">
                <div className="w-full flex flex-row-reverse items-center justify-between gap-4 bg-slate-100 px-5 py-6 rounded-xl">
                    <SupportIcon className="w-6 h-6 text-secondary-400"/>
                    <span className="text-xs text-secondary-700 font-semibold">
                        {toPersianDigit("پشتیبانی 24 ساعت، 7 روز هفته")} 
                    </span>
                </div>
                <div className="w-full flex flex-row-reverse items-center justify-between gap-4 bg-slate-100 px-5 py-6 rounded-xl">
                    <PayInHomeIcon className="w-6 h-6 text-secondary-400"/>
                    <span className="text-xs text-secondary-700 font-semibold">
                        {toPersianDigit("امکان پرداخت در محل")} 
                    </span>
                </div>
                <div className="w-full flex flex-row-reverse items-center justify-between gap-4 bg-slate-100 px-5 py-6 rounded-xl">
                    <ReturnTen className="w-6 h-6 text-secondary-400"/>
                    <span className="text-xs text-secondary-700 font-semibold">
                        {toPersianDigit("10 روز ضمانت بازگشت کالا")} 
                    </span>
                </div>
                <div className="w-full flex flex-row-reverse items-center justify-between gap-4 bg-slate-100 px-5 py-6 rounded-xl">
                    <MedalIcon className="w-6 h-6 text-secondary-400"/>
                    <span className="text-xs text-secondary-700 font-semibold">
                        {toPersianDigit("ضمانت اصل بودن کالا")} 
                    </span>
                </div>
            </div>

            <div className="w-full px-6 flex justify-center mb-6">
                <div className="w-full h-12 flex items-center max-w-[500px]">
                    <div className="w-full h-full flex items-center gap-2 bg-white rounded-r-xl overflow-hidden px-2 border border-s-slate-200">
                        <EmailIcon className="w-5 h-5 text-secondary-400"/>
                        <input 
                            type="text" 
                            placeholder="برای اطلاع از آخرین تخفیف ها ایمیل خود را وارد کنید."
                            className="border-0 w-full h-full outline-none appearance-none text-xs text-secondary-800 placeholder-secondary-400"
                        />
                    </div>
                    <button className="btn btn--primary whitespace-nowrap !h-full !rounded-r-none !text-xs px-5">
                        ثبت ایمیل
                    </button>
                </div>
            </div>

            <div className="w-full bg-white p-6">
                <p className="text-xs text-primary-900 font-medium text-center">
                    کلیه حقوق این سایت متعلق به کالا مارکت می باشد. ساخته شده توسط محمدرضا فرامرزی.
                </p>
            </div>
        </footer>
    )
}