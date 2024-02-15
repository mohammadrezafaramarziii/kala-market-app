import { LocationIcon, SearchIcon } from "@/common/Icons";
import Image from "next/image";

export default function SearchBar(){
    return(
        <div className="w-full flex items-center justify-between px-4 h-12 border border-slate-200 bg-secondary-100/30 rounded-xl">
            <div className="flex items-center gap-2">
                <div>
                    <SearchIcon className={'w-5 h-5 text-slate-600'}/>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-400 font-medium lg:hidden">
                        جستـــجو در
                    </span>
                    <span className="text-xs text-slate-400 font-medium hidden lg:inline-block">
                        جستجو
                    </span>
                    <Image
                        src={'/images/logo-text.svg'}
                        alt=""
                        width={1000}
                        height={1000}
                        priority
                        className="w-[80px] lg:hidden mt-1"
                    />
                </div>
            </div>

            <div className="flex items-center gap-1 border-r border-slate-300 pr-2">
                <div>
                    <LocationIcon className={'w-5 h-5 text-slate-600'}/>
                </div>
                <div className="text-xs text-slate-600">
                    انتخاب شهر
                </div>
            </div>
        </div>
    )
}