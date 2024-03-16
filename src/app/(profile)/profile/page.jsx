"use client"
import { BoxIcon, ListIcon, WaitForPaidIcon } from "@/common/Icons";
import { useGetUser } from "@/hooks/useAuth";
import { toPersianDigit } from "@/utils/toPersianDigit";
import Link from "next/link";
import { useEffect, useState } from "react";
import 'react-loading-skeleton/dist/skeleton.css'
import Loading from "@/common/loading/Loading";
import { toPersianDate } from "@/utils/toPersianDate";
import Image from "next/image";
import { numberWithCommas } from "@/utils/numberWithCommas";
import Box from "@/components/profileComponent/Box";
import { useGetProducts } from "@/hooks/useProducts";

export default function HomeProfile() {
    const { data, isPending } = useGetUser();
    const { user, payments } = data || {};
    const [paidProducts, setPaidProducts] = useState([]);
    const { data: productsData, isPending: isGettingProduct } = useGetProducts();
    const { products } = productsData || [];

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
    }, [isPending, payments])


    if (isPending || isGettingProduct) {
        return (
            <div className="w-full h-full max-[1024px]:min-h-[calc(100vh-3rem)] flex items-center justify-center">
                <Loading />
            </div>
        )
    }

    return (
        <div>

            {/* welcome message */}
            <div className="py-4 lg:py-6 sm:flex items-center justify-between">
                <h2 className="text-lg lg:text-2xl text-secondary-800 font-bold">
                    {toPersianDigit(`${user?.name || "کاربر"} عزیز، خوش آمدید`)}
                </h2>
                <span className="text-sm text-secondary-400">
                    امروز {toPersianDate(new Date())}
                </span>
            </div>


            {/* states */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="w-full bg-slate-50 rounded-lg p-6 flex items-center justify-between text-xs text-secondary-500">
                    <div className="flex items-center gap-2">
                        <WaitForPaidIcon className="w-6 h-6 text-secondary-800" />
                        <span className="font-medium">
                            در انتظار پرداخت
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <span className="text-xl  md:text-2xl text-secondary-800 font-semibold">
                            {toPersianDigit(user?.cart?.products.length || 0)}
                        </span>
                        <span>
                            محصول
                        </span>
                    </div>
                </div>
                <div className="w-full bg-slate-50 rounded-lg p-6 flex items-center justify-between text-xs text-secondary-500">
                    <div className="flex items-center gap-2">
                        <BoxIcon className="w-6 h-6 text-primary-900" />
                        <span className="font-medium">
                            محصولات خریداری شده
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-xl  md:text-2xl text-secondary-800 font-semibold">
                            {toPersianDigit(paidProducts.length)}
                        </span>
                        <span>
                            محصول
                        </span>
                    </div>
                </div>
                <div className="w-full bg-slate-50 rounded-lg p-6 flex items-center justify-between text-xs text-secondary-500">
                    <div className="flex items-center gap-2">
                        <ListIcon className="w-6 h-6 text-warning" />
                        <span className="font-medium">
                            کل سفارشات
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-xl  md:text-2xl text-secondary-800 font-semibold">
                            {toPersianDigit(payments?.length)}
                        </span>
                        <span>
                            سفارش
                        </span>
                    </div>
                </div>
            </div>


            {/* paid products */}
            {paidProducts.length > 0 &&
                <Box title={'خرید های پر تکرار'}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            {paidProducts.slice(0, 4).map((product) => {
                                return (
                                    <div key={product._id} className="w-full flex flex-col gap-3 md:flex-row lg:justify-between lg:items-center p-4 border border-slate-100 rounded-lg">
                                        <div className="flex-1 flex items-center gap-3">
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

                        <div className="w-full flex justify-center">
                            <Link href={'/profile/paid-products'} className="!w-full btn btn--light !text-xs max-w-[150px] text-primary-900">
                                مشاهده همه...
                            </Link>
                        </div>
                    </div>
                </Box>
            }


            {/* liked products */}
            <div className="mt-8">
                <Box title={'علاقه مندی ها'}>
                    {
                        user.likedProducts.length > 0 ?
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                {!isGettingProduct && products.map((product) => {
                                    if (user?.likedProducts.includes(product._id)) {
                                        return (
                                            <div key={product._id} className="w-full flex flex-col gap-3 md:flex-row lg:justify-between lg:items-center p-4 border border-slate-100 rounded-lg">
                                                <div className="flex-1 flex items-center gap-3">
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
                                    }
                                })}
                            </div>
                            :
                            <div className="w-full h-[250px] flex flex-col gap-3 items-center justify-center">
                                <Image
                                    src={'/images/emptyLiked.png'}
                                    alt="emptyProduct image"
                                    width={1000}
                                    height={1000}
                                    priority
                                    className="w-[100px]"
                                />
                                <h2 className="text-sm text-secondary-700">لیست علاقه مندی ها خالی است</h2>
                            </div>
                    }
                </Box>
            </div>

        </div>
    )
}