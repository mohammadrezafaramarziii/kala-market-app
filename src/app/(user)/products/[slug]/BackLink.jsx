"use client"
import { ArrowRightIcon } from "@/common/Icons";

export default function BackLink(){

    return(
        <button onClick={()=>history.back()} className="btn text-secondary-800">
            <ArrowRightIcon className={'w-6 h-6'}/>
        </button>
    )
}