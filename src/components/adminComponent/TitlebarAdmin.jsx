"use client"
import { HomeIcon, MenuIcon, SearchIcon } from "@/common/Icons";
import { useState } from "react";
import Link from "next/link";
import SidebarAdmin from "./SidebarAdmin";

export default function TitlebarAdmin({ title }){
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            <div className="lg:hidden">
                <SidebarAdmin show={showSidebar} onClose={() => setShowSidebar(false)} />
            </div>

            <div className="w-full sticky z-50 top-0 right-0 bg-white flex items-center justify-between py-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="lg:hidden">
                        <button onClick={() => setShowSidebar(true)} className="btn text-secondary-700">
                            <MenuIcon className={'w-5 h-5'} />
                        </button>
                    </div>
                    <div className="text-secondary-900 font-bold">
                        {title}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="btn text-secondary-600">
                        <SearchIcon className={'w-5 h-5'} />
                    </button>
                    <Link href={'/'} className="btn text-secondary-600">
                        <HomeIcon className={'w-5 h-5'} />
                    </Link>
                </div>
            </div>
        </>
    )
}