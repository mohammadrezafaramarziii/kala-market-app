"use client"
import Loading from "@/common/loading/Loading";
import TitleBar from "@/components/profileComponent/TitleBar";
import { useGetUser } from "@/hooks/useAuth";
import { numberWithCommas } from "@/utils/numberWithCommas";
import { toPersianDate } from "@/utils/toPersianDate";
import { toPersianDigit } from "@/utils/toPersianDigit";
import Image from "next/image";
import Link from "next/link";

export default function PaymentDetail({ params }) {
    const { data, isPending } = useGetUser();
    const { payments } = data || {};
    const payment = !isPending && payments.filter((p) => p.invoiceNumber === params.paymentId)[0];

    if (isPending) {
        return (
            <div className="w-full h-full max-[1024px]:min-h-[calc(100vh-3rem)] flex items-center justify-center">
                <Loading />
            </div>
        )
    }

    return (
        <div className="w-full max-[1024px]:min-h-screen">

            <TitleBar title={'جزئیات سفارش'}/>

            <div className="mt-6">

                <div className="mb-6 flex justify-end">
                    <button onClick={() => history.back()} className="btn btn--light !w-[80px] !h-10 !text-xs">
                        بازگشت
                    </button>
                </div>

                {/* invoice number and date */}
                <div className="w-full flex flex-col xl:grid xl:grid-cols-2 gap-3 md:gap-5 border-b border-slate-100 pb-4">

                    <div className="w-full xl:w-auto flex items-center justify-between xl:justify-start gap-4 text-xs md:text-sm">
                        <div className="text-secondary-500">
                            شماره فاکتور
                        </div>
                        <div className="font-semibold text-secondary-800">
                            {toPersianDigit(payment.invoiceNumber)}
                        </div>
                    </div>

                    <div className="w-full xl:w-auto flex items-center justify-between xl:justify-start gap-4 text-xs md:text-sm">
                        <div className="text-secondary-500">
                            تاریخ سفارش
                        </div>
                        <div className="font-semibold text-secondary-800">
                            {toPersianDate(payment.createdAt)}
                        </div>
                    </div>

                    <div className="w-full xl:w-auto flex items-center justify-between xl:justify-start gap-4 text-xs md:text-sm">
                        <div className="text-secondary-500">
                            نام تحویل گیرنده
                        </div>
                        <div className="font-semibold text-secondary-800">
                            {toPersianDigit(payment.description.split("|")[1])}
                        </div>
                    </div>

                    <div className="w-full xl:w-auto flex items-center justify-between xl:justify-start gap-4 text-xs md:text-sm">
                        <div className="text-secondary-500">
                            مبلغ
                        </div>
                        <div className="flex items-center gap-1 font-semibold text-secondary-800">
                            {toPersianDigit(numberWithCommas(payment.amount))}
                            <span className="text-xs !font-normal text-secondary-400">
                                تومان
                            </span>
                        </div>
                    </div>

                </div>


                <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4 mt-6">
                    {payment.cart.productDetail.map((product, index) => {
                        return (
                            <div key={product._id} className="w-full flex flex-col gap-3 md:flex-row lg:justify-between lg:items-center p-4 border border-slate-100 rounded-lg">
                                <div className="flex-1 flex items-center gap-3">
                                    <div className="text-sm text-secondary-800 font-semibold">
                                        {toPersianDigit(index + 1)}
                                    </div>
                                    <div>
                                        <div className={`w-[50px] h-[50px] md:w-[80px] md:h-[80px] rounded-lg ${!product.imageLink && "bg-slate-100"}`}>
                                            {
                                                product.imageLink &&
                                                <Image
                                                    src={`/images/${product.imageLink}`}
                                                    alt={product.title}
                                                    width={1000}
                                                    height={1000}
                                                    priority
                                                    className="w-full h-full mix-blend-multiply"
                                                />
                                            }
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1 md:gap-2">
                                        <Link href={`/products/${product.slug}`}>
                                            <h3 className="text-sm font-semibold text-secondary-800">
                                                {product.title}
                                            </h3>
                                        </Link>
                                        <div className="flex items-center gap-2 text-xs text-secondary-500">
                                            {product.brand}
                                            <div className="w-1 h-1 rounded-full bg-secondary-300"></div>
                                            گارانتی یکساله کالا مارکت
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-secondary-500">
                                            {toPersianDigit(`${product.quantity} عدد از این محصول`)}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="w-full flex items-center justify-end">
                                        <div className="w-full flex flex-col items-end font-semibold">
                                            <div className="text-secondary-900">
                                                {toPersianDigit(numberWithCommas(product.offPrice))}
                                            </div>
                                            {
                                                !!product.discount &&
                                                <div className="text-secondary-200 -mt-1 line-through">
                                                    {toPersianDigit(numberWithCommas(product.price))}
                                                </div>
                                            }
                                        </div>

                                        <span className="max-w-[22px] mb-4 -rotate-90 inline-block text-xs text-secondary-400 -ml3">
                                            تومــــان
                                        </span>

                                        {
                                            !!product.discount &&
                                            <div className="-rotate-90 py-[2px] px-2 bg-error text-white text-xs font-medium flex items-center justify-center rounded-xl rounded-bl">
                                                {toPersianDigit(`%${product.discount}`)}
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

