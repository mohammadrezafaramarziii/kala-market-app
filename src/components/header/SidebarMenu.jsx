import { CloseIcon, SearchIcon } from "@/common/Icons";
import Image from "next/image";

export default function SidebarMenu({ show, onClose }){
    const menuItems = [
        "محصولات تخفیف دار",
        "محصولات",
        "گوشی موبایل",
        "لپ تاپ و کیس",
        "تجهیزات جانبی",
        "قطعات سخت افزاری",
        "محصولات نرم افزاری",
    ];
    const menuItemsQuick = ["قوانین","حریم خصوصی","عودت کالا","شیوه پرداخت","سوالات متداول"];

    return(
        <>
        <div onClick={onClose} className={`${show ? "block" : "hidden"} lg:!hidden w-full h-full fixed top-0 right-0 z-[70] bg-secondary-800/30 backdrop-blur-sm`}></div>
        
        <aside className={`${show ? "translate-x-0" : "translate-x-full"} overflow-y-auto p-4 lg:!translate-x-full z-[70] lg:hidden duration-200 ease-out w-full max-w-[17.25rem] h-full fixed bg-white`}>
            <div className="w-full border-b border-slate-200 pb-5">
                <button onClick={onClose} className="btn absolute top-4 left-4">
                    <CloseIcon className={'w-5 h-5'}/>
                </button>
                <div className="w-full flex justify-center pt-8">
                    <Image
                        src={'/images/logo-lg.svg'}
                        alt=""
                        width={1000}
                        height={1000}
                        priority
                        className="w-[160px]"
                    />
                </div>
                <div className="w-full mt-6">
                    <div className="w-full h-12 md:h-14 px-5 bg-slate-100 flex items-center justify-between rounded-xl">
                        <p className="text-secondary-400 text-xs">جستجو بین محصولات</p>
                        <SearchIcon className={'w-5 h-5 text-secondary-400'}/>
                    </div>
                </div>
            </div>


            <div className="w-full py-5">
                <h4 className="w-full text-xs text-secondary-400 pb-4">
                    دسته بندی ها
                </h4>

                <ul className="w-full flex flex-col gap-4 text-sm text-secondary-800 font-medium">
                    {menuItems.map((menu, index)=>{
                        return(
                            <li key={index}>
                                {menu}
                            </li>
                        )
                    })}
                </ul>
            </div>


            <div className="w-full py-5">
                <h4 className="w-full text-xs text-secondary-400 pb-4">
                    دسترسی سریع
                </h4>

                <ul className="w-full flex flex-col gap-4 text-sm text-secondary-800 font-medium">
                    {menuItemsQuick.map((menu, index)=>{
                        return(
                            <li key={index}>
                                {menu}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </aside>
        </>
    )
}