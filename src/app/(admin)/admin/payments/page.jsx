"use client"
import Loading from "@/common/loading/Loading";
import TitlebarAdmin from "@/components/adminComponent/TitlebarAdmin";
import { useGetPayments } from "@/hooks/usePayments";
import PaymentsTable from "./PaymentsTable";

export default function PaymentsPage(){
    const { data, isPending } = useGetPayments();
    const { payments } = data || {};

    if (isPending) {
        return (
            <div className="w-full h-full max-[1024px]:min-h-[calc(100vh-3rem)] flex items-center justify-center">
                <Loading />
            </div>
        )
    }

    return(
        <div>
            <TitlebarAdmin title={'سفارشات'}/>

            <PaymentsTable payments={payments}/>
        </div>
    )
}