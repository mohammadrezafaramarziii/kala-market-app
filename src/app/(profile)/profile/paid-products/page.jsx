"use client"
import Loading from "@/common/loading/Loading";
import { useGetUser } from "@/hooks/useAuth";
import { numberWithCommas } from "@/utils/numberWithCommas";
import { toPersianDigit } from "@/utils/toPersianDigit";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PaidProductsPage() {
    const { data, isPending } = useGetUser();
    const { payments } = data || {};
    const [paidProducts, setPaidProducts] = useState([]);

    useEffect(() => {
        if (!isPending) {
            let paids = [];
            payments
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .forEach(payment => {
                    payment.cart.productDetail.forEach((product) => {
                        paids.push(product);
                    })
                });
            setPaidProducts(paids);
        }
    }, [payments, isPending])

    if (isPending) {
        return (
            <div className="w-full h-full max-[1024px]:min-h-[calc(100vh-3rem)] flex items-center justify-center">
                <Loading />
            </div>
        )
    }

    return (
        <>

            {
                paidProducts.length > 0 ?

                    <div className="w-full mt-8">
                        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4">
                            {paidProducts.map((product, index) => {
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