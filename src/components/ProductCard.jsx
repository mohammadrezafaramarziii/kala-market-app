"use client";
import { toPersianDigit } from "@/utils/toPersianDigit";
import Image from "next/image";
import { numberWithCommas } from "@/utils/numberWithCommas";
import { CardSendIcon, CartIcon, HeartIcon, OrderIcon, SadEmojiIcon } from "@/common/Icons";
import Link from "next/link";
import { useGetUser } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "@/services/cartService";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import ToastError from "@/common/toasts/ToastError";
import ToastSuccess from "@/common/toasts/ToastSuccess";


export default function ProductCard({ product }) {
    const { data, isPending:isGettingUser } = useGetUser();
    const { user } = data || {};
    const { isPending, mutateAsync: mutateAddToCart } = useMutation({ mutationFn : addToCart });
    const queryClient = useQueryClient();

    const addToCartHandler = async () => {
        if(!user){
            ToastError("لطفا ابتدا وارد حساب کاربری خود شوید");
        } else {
            try {
               const { message } = await mutateAddToCart(product._id);

                ToastSuccess(message);

                queryClient.invalidateQueries({queryKey:["get-user"]});
            } catch (error) {
                ToastError(error?.response?.data?.message);
            }
        }
    }

    const isInCart = () => {
        const isProduct = user?.cart.products.some((p) => p.productId === product._id);
        return isProduct;
     }

    return(
        <div className={`w-full shadow-lg hover:scale-105 duration-200 bg-slate-50 relative rounded-xl overflow-hidden p-6`}>
           <div className={`w-full h-full flex flex-col gap-4`}>
                
                {
                !!product.discount &&
                    <div className="absolute top-4 right-4 py-[2px] px-2 bg-error text-white text-xs font-medium flex items-center justify-center rounded-xl rounded-br">
                        {toPersianDigit(`${product.discount} %`)}
                    </div>
                }

                <button className="absolute top-4 left-4 btn !text-secondary-500">
                    <HeartIcon className="w-5 h-5"/>
                </button>


                <Link href={`/products/${product.slug}`} className="w-full h-[200px] flex items-center justify-center">
                    <Image 
                        src="/images/logo-sm.svg"
                        alt=""
                        width={1000}
                        height={1000}
                        className="w-[50px] opacity-10"
                    />
                </Link>

                <div className="w-full flex-1 flex flex-col justify-between">
                    <div>
                        <span className="text-xs text-secondary-400">
                            {product.brand}
                        </span>
                        <h3 className="mt-2 leading-[26px] hover:text-primary-900 duration-200 font-bold text-secondary-900">
                            <Link href={`/products/${product.slug}`}>
                                {product.title}
                            </Link>
                        </h3>
                        {
                            Number(product.countInStock) < 5 && Number(product.countInStock) !== 0 &&
                            <div className="text-xs text-error mt-3">
                                {toPersianDigit(`تنها ${product.countInStock} عدد در انبار باقی مانده`)}
                            </div>
                        }
                    </div>

                    {
                        Number(product.countInStock) !== 0 ?
                    
                        <div className="mt-6">
                            {
                                !!product.discount &&
                                <div className="text-xs line-through text-secondary-400 text-left">
                                    {toPersianDigit(numberWithCommas(product.price))}
                                </div>
                            }
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    {
                                        isGettingUser ?
                                        <Skeleton 
                                            className="!w-10 !h-10 !rounded-xl"
                                        />
                                        :
                                        isInCart() ?
                                        <Link href={'/cart'} title="ادامه سفارش" className="btn btn--light w-10 h-10">
                                            <OrderIcon className="w-5 h-5"/>
                                        </Link>
                                        :
                                        <button title="افزودن به سبد خرید" onClick={addToCartHandler} className="btn btn--primary w-10 h-10">
                                            <CartIcon className="w-5 h-5"/>
                                        </button>
                                    }
                                </div>
                                <div className="flex items-center justify-end gap-3">
                                    <div className="text-primary-900 text-lg flex items-center gap-1 font-semibold">
                                        {toPersianDigit(numberWithCommas(product.offPrice))}
                                        <span className="text-[10px]">
                                            تومان
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        :

                        <div className="w-full h-12 rounded-xl flex items-center justify-center bg-slate-200 text-secondary-400 text-sm font-medium">
                            ناموجود <SadEmojiIcon className='w-5 h-5 mr-2'/>
                        </div>
                    }
                </div>
           </div>
        </div>
    )
}