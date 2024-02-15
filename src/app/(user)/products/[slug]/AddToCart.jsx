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

export function AddToCart({ product }){
    const { data, isPending:isGettingUser } = useGetUser();
    const { user } = data || {};
    const { isPending, mutateAsync: mutateAddToCart } = useMutation({ mutationFn : addToCart });
    const queryClient = useQueryClient();

    const isInCart = () => {
       const isProduct = user?.cart.products.some((p) => p.productId === product._id);
       return isProduct;
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

    const  getQuantityHandler = () =>{
        const userCart = user?.cart.products;
        for(let i in userCart) {
            if(userCart[i].productId === product._id){
                return userCart[i].quantity;
            }
        }
    }

    if(isGettingUser) return <Skeleton className="!w-full !h-full !rounded-xl" containerClassName="!w-full !h-12 !block"/>

    return(
        <div>
            {
                isInCart() ? 
                <div className="w-full flex items-center justify-between px-4 h-12 btn bg-slate-200">
                    <button 
                        disabled={product.countInStock <= 3} 
                        onClick={addToCartHandler} 
                        className="btn text-success disabled:text-secondary-200"
                    >
                        <PlusIcon className={'w-6 h-6'}/>
                    </button>
                    <div className="text-primary-900">
                        {toPersianDigit(getQuantityHandler())}
                    </div>
                    <button className="btn text-error">
                        {
                            getQuantityHandler() === 1 ?
                            <TrashIcon className={'w-6 h-6'}/>
                            :
                            <MinusIcon className={'w-6 h-6'}/>
                        }
                    </button>
                </div>
                :
                isPending ?
                <div className="btn btn--primary hover:outline-transparent">
                    <Loading />
                </div>
                :
                product.countInStock !== 0 ?
                <button onClick={addToCartHandler} className="btn btn--primary">
                    افزودن به سبد خرید
                </button>
                :
                <div className="w-full h-12 rounded-xl flex items-center justify-center bg-slate-200 text-secondary-400 text-sm font-medium">
                    ناموجود <SadEmojiIcon className='w-5 h-5 mr-2'/>
                </div>
            }
        </div>
    )
}