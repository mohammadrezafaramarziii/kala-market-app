"use client"
import Loading from "@/common/loading/Loading";
import TitlebarAdmin from "@/components/adminComponent/TitlebarAdmin";
import { useGetCoupons } from "@/hooks/useCoupon";
import CouponTable from "./CouponTable";
import Link from "next/link";
import { AddCircleIcon } from "@/common/Icons";

export default function CouponsPage(){
    const { data, isPending } = useGetCoupons();
    const { coupons } = data || {};

    if (isPending) {
        return (
            <div className="w-full h-full max-[1024px]:min-h-[calc(100vh-3rem)] flex items-center justify-center">
                <Loading />
            </div>
        )
    }

    return(
        <div>
            <TitlebarAdmin title={'تخفیفات'}/>

            <div className="mt-8 mb-6 flex items-center justify-end">
                <Link href={'/admin/coupons/add'} className="!w-auto !inline-flex btn gap-2 !text-sm !text-primary-900">
                    افزودن تخفیف جدید
                    <AddCircleIcon className="w-5 h-5 !mt-1" />
                </Link>
            </div>

            <CouponTable coupons={coupons}/>
        </div>
    )
}