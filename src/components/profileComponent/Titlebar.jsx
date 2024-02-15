"use client";
import { ArrowRightIcon } from "@/common/Icons";

export default function Titlebar({title}){
    return(
        <div className="w-full fixed lg:hidden shadow top-0 right-0 flex items-center gap-3 p-6 bg-white text-slate-800">
            <button onClick={()=>window.history.back()} className="btn">
                <ArrowRightIcon className={'w-6 h-6'}/>
            </button>
            <div className="font-medium">
                {title}
            </div>
        </div>
    )
}