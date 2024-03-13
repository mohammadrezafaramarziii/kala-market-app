import { EditIcon, EyeIcon, TrashIcon } from "@/common/Icons"
import ToastError from "@/common/toasts/ToastError"
import ToastSuccess from "@/common/toasts/ToastSuccess"
import { adminCouponsTHeads } from "@/constants/tableHeads"
import { deleteCoupon } from "@/services/couponService"
import { toPersianDate } from "@/utils/toPersianDate"
import { toPersianDigit } from "@/utils/toPersianDigit"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"

export default function CouponTable({ coupons }) {
    const { mutateAsync } = useMutation({ mutationFn: deleteCoupon })
    const queryClient = useQueryClient();

    const deleteCouponHandler = async (couponId) => {
        try {
            const { message } = await mutateAsync(couponId);
            ToastSuccess(message);
            queryClient.invalidateQueries({ queryKey: ['get-coupons'] })
        } catch (error) {
            ToastError(error?.response?.data?.message);
        }
    }

    return (
        <div className="w-full mt-8 overflow-x-auto">
            <table className="w-full">
                <thead className="w-full h-12">
                    <tr>
                        {adminCouponsTHeads.map((item) => {
                            return (
                                <th key={item.id} className={`table__th`}>
                                    {item.label}
                                </th>
                            )
                        })}
                    </tr>
                </thead>

                <tbody>
                    {coupons.map((coupon, index) => {
                        return (
                            <tr key={coupon._id} className="border-b border-slate-100">
                                <td className="table__td pl-8">
                                    {toPersianDigit(index + 1)}
                                </td>
                                <td className="table__td pl-8">
                                    {toPersianDigit(coupon.code)}
                                </td>
                                <td className="table__td pl-8">
                                    <div className="badge__primary">
                                        {toPersianDigit(coupon.type)}
                                    </div>
                                </td>
                                <td className="table__td pl-8">
                                    {toPersianDigit(coupon.amount)}
                                </td>
                                <td className="table__td pl-8">
                                    {toPersianDigit(coupon.usageCount)}
                                </td>
                                <td className="table__td pl-8">
                                    {toPersianDigit(coupon.usageLimit)}
                                </td>
                                <td className="table__td pl-8">
                                    {toPersianDate(coupon.expireDate)}
                                </td>
                                <td className="table__td pl-8">
                                    <div className="flex flex-col items-start gap-1">
                                        {coupon.productIds.map((product) => {
                                            return (
                                                <span key={product._id} className="badge__primary">
                                                    {product.title}
                                                </span>
                                            )
                                        })}
                                    </div>
                                </td>
                                <td className="table__td">
                                    <div className="flex items-center gap-4">
                                        <Link href={`/admin/coupons/edit/${coupon._id}`}>
                                            <EditIcon className={'w-5 h-5 text-primary-900'} />
                                        </Link>
                                        <button onClick={() => deleteCouponHandler(coupon._id)}>
                                            <TrashIcon className={'w-5 h-5 text-red-600'} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}