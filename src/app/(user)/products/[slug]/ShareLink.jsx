"use client"

import { ShareIcon } from "@/common/Icons";
import ToastSuccess from "@/common/toasts/ToastSuccess";
import { usePathname } from "next/navigation";

export default function ShareLink(){
    const pathname = usePathname();

    const copyHandler = () => {
       navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/${pathname}`);
       ToastSuccess("لینک این محصول کپی شد");
    }

    return(
        <button onClick={copyHandler} className="btn gap-2 text-primary-900 text-sm font-medium">
            <span className="hidden lg:block">
                اشتراک گذاری
            </span>
            <ShareIcon className={'text-secondary-800 lg:!text-primary-900 w-6 h-6'}/>
        </button>
    )
}
