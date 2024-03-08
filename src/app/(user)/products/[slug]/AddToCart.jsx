"use client";

import { useGetUser } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToastError from "@/common/toasts/ToastError";
import ToastSuccess from "@/common/toasts/ToastSuccess";
import { addToCart } from "@/services/cartService";
import Loading from "@/common/loading/Loading";
import { MinusIcon, PlusIcon, SadEmojiIcon, TrashIcon } from "@/common/Icons";
import { toPersianDigit } from "@/utils/toPersianDigit";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useAddToCart, useRemoveFromCart } from "@/hooks/useCart";

export function AddToCart({ product }){
    const { data, isPending:isGettingUser } = useGetUser();
    const { user } = data || {};
    const { isPending, mutateAsync: mutateAddToCart } = useAddToCart();
    const { isPending: isRemoving, mutateAsync:mutateRemoveFromCart } = useRemoveFromCart();
    const queryClient = useQueryClient();

    const isInCart = () => {
       const isProduct = user?.cart.products.some((p) => p.productId === product._id);
       return isProduct;
    }

    const numOfInCart = () => {
       const quantity = user?.cart.products.filter((p) => p.productId === product._id)
       return quantity[0].quantity
    }
    
    const  getQuantityHandler = () =>{
        const userCart = user?.cart?.products;
        for(let i in userCart) {
            if(userCart[i].productId === product._id){
                return userCart[i].quantity;
            }
        }
    }

    const addToCartHandler = async () => {
        if(!user){
            ToastError("لطفا ابتدا وارد حساب کاربری خود شوید");
        } else {
            try {
               const { message } = await mutateAddToCart(product._id);

               if(!isInCart()){
                   ToastSuccess(message);
                }

                queryClient.invalidateQueries({queryKey:["get-user"]});
            } catch (error) {
                ToastError(error?.response?.data?.message);
            }
        }
    }

    const removeCartItemHandler = async () => {
        try {
            const { message } = await mutateRemoveFromCart(product._id);
            if(getQuantityHandler() === 1) {
                ToastSuccess(message)
            }
            queryClient.invalidateQueries({queryKey:["get-user"]});
        } catch (error) {
            ToastError(error?.response?.data?.message);
        }
    }


    if(isGettingUser) return <Skeleton className="!w-full !h-full !rounded-xl" containerClassName="!w-full !h-14 !block"/>

    return(
        <div>
            {
                isInCart() ? 
                <div className="w-full flex items-center justify-between px-4 h-14 btn border border-slate-200">
                    <button 
                        disabled={product.countInStock === numOfInCart()} 
                        onClick={addToCartHandler} 
                        className="btn text-secondary-500 disabled:text-secondary-200"
                    >
                        <PlusIcon className={'w-5 h-5'}/>
                    </button>
                    {
                        isRemoving || isPending ?
                        <Loading />
                        :
                        <div className="text-primary-900 lg:text-xl">
                            {toPersianDigit(getQuantityHandler())}
                        </div>
                    }
                    <button onClick={removeCartItemHandler} className="btn">
                        {
                            getQuantityHandler() === 1 ?
                            <TrashIcon className={'w-5 h-5 text-error'}/>
                            :
                            <MinusIcon className={'w-5 h-5 text-secondary-500'}/>
                        }
                    </button>
                </div>
                :
                isPending ?
                <div className="btn btn--primary">
                    <Loading />
                </div>
                :
                product.countInStock !== 0 ?
                <button onClick={addToCartHandler} className="!w-full btn btn--primary !text-xs min-[430px]:!text-sm">
                    افزودن به سبد خرید
                </button>
                :
                <div className="w-full h-14 rounded-xl flex items-center justify-center bg-slate-200 text-secondary-400 text-sm font-medium">
                    ناموجود <SadEmojiIcon className='w-5 h-5 mr-2'/>
                </div>
            }
        </div>
    )
}