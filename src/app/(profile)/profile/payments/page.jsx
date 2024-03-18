"use client";
import Loading from "@/common/loading/Loading";
import { userPaymentsTHeads } from "@/constants/tableHeads";
import { useGetUser } from "@/hooks/useAuth";
import { toPersianDate } from "@/utils/toPersianDate";
import { toPersianDigit } from "@/utils/toPersianDigit";
import { numberWithCommas } from "@/utils/numberWithCommas";
import Image from "next/image";
import Link from "next/link";
import TitleBar from "@/components/profileComponent/TitleBar";

export default function PaymentsPage() {
    const { data, isPending } = useGetUser();
    const { payments } = data || {};

    const renderTHeadsSize = (id) => {
        switch (id) {
            case 1:
                return "w-[10%]"
                break;

            case 2:
                return "w-[30%]"
                break;

            case 3:
                return "w-[15%]"
                break;

            case 4:
                return "w-[15%]"
                break;

            case 5:
                return "w-[15%]"
                break;

            case 6:
                return "w-[15%]"
                break;

            default:
                break;
        }
    }

    if (isPending) {
        return (
            <div className="w-full h-full max-[1024px]:min-h-[calc(100vh-3rem)] flex items-center justify-center">
                <Loading />
            </div>
        )
    }

    return (
        <>
            <TitleBar title={'سفارشات'}/>
            {
                payments.length > 0 ?

                    <div className="w-full mt-8">
                        {/* in desktop */}
                        <table className="w-full hidden xl:table">
                            <thead className="w-full h-12">
                                <tr>
                                    {userPaymentsTHeads.map((item) => {
                                        return (
                                            <th key={item.id} className={`${renderTHeadsSize(Number(item.id))} table__th`}>
                                                {item.label}
                                            </th>
                                        )
                                    })}
                                </tr>
                            </thead>

                            <tbody>
                                {payments.map((payment, index) => {
                                    return (
                                        <tr key={payment._id} className="border-b border-slate-100">
                                            <td className="table__td">
                                                {toPersianDigit(index + 1)}
                                            </td>
                                            <td className="table__td">
                                                {toPersianDigit(payment.invoiceNumber)}
                                            </td>
                                            <td className="table__td">
                                                <div className="flex items-center gap-1">
                                                    {toPersianDigit(numberWithCommas(payment.amount))}
                                                    <span className="text-xs text-secondary-400 !font-normal">
                                                        تومان
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="table__td">
                                                {toPersianDate(payment.createdAt)}
                                            </td>
                                            <td className="table__td">
                                                <div className={payment.status === "COMPLETED" ? "badge__success" : "badge__error"}>
                                                    {payment.status === "COMPLETED" ? "موفق" : "ناموفق"}
                                                </div>
                                            </td>
                                            <td className="table__td">
                                                <Link href={`/profile/payments/${payment.invoiceNumber}`} className="btn btn--primary !w-[160px] !h-10">
                                                    جزئیات سفارش
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>


                        {/* in mobile */}
                        <div className="w-full xl:hidden space-y-4">
                            {payments.map((payment, index) => {
                                return (
                                    <div key={index} className="w-full border border-slate-100 rounded-lg p-4 space-y-4">
                                        <div className="w-full flex items-center justify-between">
                                            <div>
                                                {toPersianDigit(index + 1)}
                                            </div>
                                            <div>
                                                <div className={payment.status === "COMPLETED" ? "badge__success" : "badge__error"}>
                                                    {payment.status === "COMPLETED" ? "موفق" : "ناموفق"}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full flex items-center gap-1">
                                            <div className="text-xs text-secondary-400">
                                                شماره فاکتور
                                            </div>
                                            <div className="text-sm text-secondary-800 font-medium">
                                                {toPersianDigit(payment.invoiceNumber)}
                                            </div>
                                        </div>

                                        <div className="w-full flex items-center justify-between">
                                            <div className="text-xs text-secondary-500">
                                                {toPersianDate(payment.createdAt)}
                                            </div>
                                            <div className="flex items-center gap-1 text-secondary-800 font-semibold">
                                                {toPersianDigit(numberWithCommas(payment.amount))}
                                                <span className="text-[10px] text-secondary-400">
                                                    تومان
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 flex-wrap">
                                            {payment.cart.productDetail.map((product) => {
                                                return (
                                                    <div key={product._id}>
                                                        <div className={`w-[60px] h-[60px] flex items-center justify-center ${product.imageLink ? "border" : "bg-slate-100"} rounded-lg`}>
                                                            {
                                                                product.imageLink &&
                                                                <Image
                                                                    src={`/images/${product.imageLink}`}
                                                                    alt={product.title}
                                                                    width={1000}
                                                                    height={1000}
                                                                    priority
                                                                    className="w-[80%] mix-blend-multiply"
                                                                />
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        <div>
                                            <Link href={`/profile/payments/${payment.invoiceNumber}`} className="w-full btn btn--primary !h-10 !text-xs">
                                                جزئیات سفارش
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    :
                    <div className="w-full h-[calc(100vh-6.1rem)] lg:h-[calc(100%-73px)] flex flex-col gap-3 items-center justify-center">
                        <Image
                            src={'/images/orderEmpty.png'}
                            alt="orderEmpty"
                            width={1000}
                            height={1000}
                            priority
                            className="w-[60px] lg:w-[80px]"
                        />
                        <div className="text-secondary-800 text-sm">
                            شما هیچ سفارشی نداشته اید
                        </div>
                    </div>
            }
        </>
    )
}