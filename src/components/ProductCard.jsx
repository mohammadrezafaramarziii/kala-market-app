"use client";
import { toPersianDigit } from "@/utils/toPersianDigit";
import Image from "next/image";
import { numberWithCommas } from "@/utils/numberWithCommas";
import { CardSendIcon, CartBoldIcon, CartIcon, HeartIcon, OrderIcon, SadEmojiIcon } from "@/common/Icons";
import Link from "next/link";
import { useGetUser } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "@/services/cartService";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import ToastError from "@/common/toasts/ToastError";
import ToastSuccess from "@/common/toasts/ToastSuccess";
import { useAddToCart } from "@/hooks/useCart";
import LikeProduct from "./LikeProduct";
import { useEffect, useState } from "react";


export default function ProductCard({ product, className, classNamePriceBox, isLoading, notShowHome }) {
    const { data, isPending: isGettingUser } = useGetUser();
    const { user } = data || {};
    const { isPending, mutateAsync: mutateAddToCart } = useAddToCart();
    const queryClient = useQueryClient();
    const [rednering, setRendring] = useState(true);

    const addToCartHandler = async () => {
        if (!user) {
            ToastError("لطفا ابتدا وارد حساب کاربری خود شوید");
        } else {
            try {
                const { message } = await mutateAddToCart(product._id);

                ToastSuccess(message);

                queryClient.invalidateQueries({ queryKey: ["get-user"] });
            } catch (error) {
                ToastError(error?.response?.data?.message);
            }
        }
    }

    const isInCart = () => {
        const isProduct = user?.cart?.products.some((p) => p.productId === product._id);
        return isProduct;
    }

    useEffect(() => {
        setRendring(false);
    }, [])

    return (
        <div className={`w-full ${className} shadow-custome relative duration-200 bg-white rounded-xl overflow-hidden p-6`}>
            <div className={`w-full h-full flex flex-col gap-4`}>

                {
                    !!product.discount &&
                    <div className="absolute top-5 left-5 py-[2px] z-20 px-2 bg-error text-white text-xs font-medium flex items-center justify-center rounded-xl rounded-bl">
                        {toPersianDigit(`${product.discount} %`)}
                    </div>
                }

                {!notShowHome && <LikeProduct product={product} />}

                {
                    product.imageLink && !rednering ?
                        <Link href={`/products/${product.slug}`} className="w-full aspect-square">
                            <Image
                                src={`/images/${product.imageLink}`}
                                alt={product.title}
                                width={1000}
                                height={1000}
                                className="w-full h-full object-fill object-center mix-blend-multiply"
                            />
                        </Link>
                        :
                        <Link href={`/products/${product.slug}`} className="w-full h-[200px] flex items-center justify-center">
                            <Image
                                src="/images/logo-sm.svg"
                                alt="logo"
                                width={1000}
                                height={1000}
                                className="w-[50px] opacity-10"
                            />
                        </Link>
                }

                <div className="w-full flex-1 flex flex-col justify-between">
                    <div className="mb-6">
                        {
                            !isLoading ?
                                <h3 className="mt-2 mb-1 leading-[26px] duration-200 font-semibold text-secondary-800">
                                    <Link href={`/products/${product.slug}`}>
                                        {product.title}
                                    </Link>
                                </h3>
                                :
                                <Skeleton containerClassName="!w-[80%] !block !h-[27px] mt-2 mb-1" className="!w-full !block !h-[27px] !rounded-lg" />
                        }
                        <div className="flex items-center justify-between">
                            {
                                !isLoading ?
                                    <>
                                        <span className="text-xs text-secondary-400">
                                            {product.brand}
                                        </span>
                                        <span className="text-xs text-secondary-400">
                                            گارانتی یک ساله
                                        </span>
                                    </>
                                    :
                                    <>
                                        <Skeleton
                                            containerClassName="!w-12 !block !h-4"
                                            className="!w-full !block !h-4 !rounded-md"
                                        />
                                        <Skeleton
                                            containerClassName="!w-12 !block !h-4"
                                            className="!w-full !block !h-4 !rounded-md"
                                        />
                                    </>
                            }
                        </div>

                        {
                            !isLoading && Number(product.countInStock) < 5 && Number(product.countInStock) !== 0 &&
                            <div className="text-xs text-error mt-3">
                                {toPersianDigit(`تنها ${product.countInStock} عدد در انبار باقی مانده`)}
                            </div>
                        }
                    </div>

                    {
                        !isLoading ?
                            Number(product.countInStock) !== 0 ?

                                <div className={`w-full flex items-center justify-between ${classNamePriceBox}`}>

                                    {
                                        isInCart() ?
                                            <div className="w-full">
                                                <Link href={'/cart'} className=" btn btn--primary !bg-success hover:!bg-success/80 !w-10 !h-10">
                                                    <CartBoldIcon className={'w-6 h-6'} />
                                                </Link>
                                            </div>
                                            :
                                            <div className="w-full flex items-center gap-1.5">
                                                <button onClick={addToCartHandler} className="btn btn--primary !w-10 !h-10">
                                                    <CartBoldIcon className={'w-6 h-6'} />
                                                </button>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-secondary-500">
                                                        همین الان
                                                    </span>
                                                    <span className="font-semibold text-primary-900 -mt-1">
                                                        بخــرش
                                                    </span>
                                                </div>
                                            </div>
                                    }

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
                                    </div>
                                </div>

                                :

                                <div className="w-full h-12 rounded-xl flex items-center justify-center bg-slate-200 text-secondary-400 text-sm font-medium">
                                    ناموجود <SadEmojiIcon className='w-5 h-5 mr-2' />
                                </div>

                            :

                            <Skeleton
                                containerClassName="!w-full !block !h-12"
                                className="!w-full !block !h-12 !rounded-xl"
                            />
                    }
                </div>
            </div>
        </div>
    )
}