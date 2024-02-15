"use client";
import { useEffect } from "react"
import { CloseIcon } from "@/common/Icons";

export default function Modal({show, onClose, title, children, modalName}){

    useEffect(()=>{
        const modal = document.getElementById(modalName);

        if(show) {
            modal.classList.remove("hidden");
            setTimeout(()=>{
                modal.classList.remove("translate-y-full");
                modal.classList.remove("lg:opacity-0");
            }, 200)
        } else {
            modal.classList.add("translate-y-full");
            modal.classList.add("lg:opacity-0");

            setTimeout(()=>{
                modal.classList.add("hidden");
            }, 200)
        }
    }, [show]);

    return(
        <>
        <div onClick={onClose} className={`${show ? "block" : "hidden"} w-full h-full fixed top-0 right-0 bg-slate-900/30 backdrop-blur-sm z-[80]`}></div>
        
        <div id={modalName} className={`translate-y-full lg:opacity-0 hidden duration-300 h-auto ease-in-out lg:right-1/2 lg:top-1/2 lg:bottom-auto lg:!-translate-y-1/2 lg:translate-x-1/2 w-full lg:w-[450px] bg-white fixed bottom-0 right-0 rounded-t-2xl lg:rounded-2xl lg:shadow-md z-[90]`}>

            <div className="w-full h-full p-6">
                <div className="w-full flex items-center justify-between border-b border-slate-200 pb-4">
                    <div className="text-base text-secondary-800 font-semibold">
                        {title}
                    </div>
                    <button onClick={onClose} className="btn text-secondary-800">
                        <CloseIcon className="w-5 h-5"/>
                    </button>
                </div>

                <div className="mt-4">
                    {children}
                </div>
            </div>

        </div>
        </>
    )
}