import { EyeIcon } from "@/common/Icons"
import { adminPaymentsTHeads } from "@/constants/tableHeads"
import { numberWithCommas } from "@/utils/numberWithCommas"
import { toPersianDate } from "@/utils/toPersianDate"
import { toPersianDigit } from "@/utils/toPersianDigit"
import Link from "next/link"

export default function PaymentsTable({ payments }) {
    return (
        <div className="w-full mt-8 overflow-x-auto">
            <table className="w-full">
                <thead className="w-full h-12">
                    <tr>
                        {adminPaymentsTHeads.map((item) => {
                            return (
                                <th key={item.id} className={`table__th`}>
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
                                <td className="table__td pl-8">
                                    {toPersianDigit(index + 1)}
                                </td>
                                <td className="table__td pl-8">
                                    {toPersianDigit(payment.invoiceNumber)}
                                </td>
                                <td className="table__td pl-8">
                                    {toPersianDigit(payment.user?.name)}
                                </td>
                                <td className="table__td pl-8">
                                    {toPersianDigit(payment.user?.phoneNumber)}
                                </td>
                                <td className="table__td pl-8">
                                    <div className="flex items-center gap-1">
                                        {toPersianDigit(numberWithCommas(payment.amount))}
                                        <span className="text-xs text-secondary-400 !font-normal">
                                            تومان
                                        </span>
                                    </div>
                                </td>
                                <td className="table__td pl-8">
                                    {toPersianDate(payment.createdAt)}
                                </td>
                                <td className="table__td pl-8">
                                    <div className={payment.status === "COMPLETED" ? "badge__success" : "badge__error"}>
                                        {payment.status === "COMPLETED" ? "موفق" : "ناموفق"}
                                    </div>
                                </td>
                                <td className="table__td">
                                    <Link href={`/admin/payments/${payment._id}`} className="btn !text-primary-900">
                                        <EyeIcon className="w-6 h-6" />
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}