import { MinusIcon, PlusIcon, TrashIcon } from "@/common/Icons";
import Loading from "@/common/loading/Loading";
import ToastError from "@/common/toasts/ToastError";
import ToastSuccess from "@/common/toasts/ToastSuccess";
import { useAddToCart, useRemoveFromCart } from "@/hooks/useCart";
import { numberWithCommas } from "@/utils/numberWithCommas";
import { toPersianDigit } from "@/utils/toPersianDigit";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

export default function CartItem({cartItem}) {
    const { isPending: isRemoving, mutateAsync:mutateRemoveFromCart } = useRemoveFromCart();
    const { isPending: isAdding, mutateAsync:mutateAddToCart } = useAddToCart();
    const queryClient = useQueryClient();

    const removeCartItemHandler = async () => {
        try {
            const { message } = await mutateRemoveFromCart(cartItem._id);
            if(cartItem.quantity === 1) {
                ToastSuccess(message)
            }
            queryClient.invalidateQueries({queryKey:["get-user"]});
        } catch (error) {
            ToastError(error?.response?.data?.message);
        }
    }
    
    const addToCartHandler = async () => {
        try {
            const { message } = await mutateAddToCart(cartItem._id);
            queryClient.invalidateQueries({queryKey:["get-user"]});
        } catch (error) {
            ToastError(error?.response?.data?.message);
        }
    }


    return (
        <div className="w-full flex flex-col gap-4 p-6 bg-white rounded-xl shadow-custome items-start">

            <div className="w-full flex flex-col min-[430px]:flex-row lg:items-center items-center min-[430px]:items-start gap-3">
                <div className="flex items-center justify-center w-[80px] h-[80px] lg:w-[110px] lg:h-[110px] bg-slate-100 rounded-xl overflow-hidden">
                    <Image
                        src={'/images/logo-sm.svg'}
                        alt=""
                        width={1000}
                        height={1000}
                        priority
                        className="w-[35px] opacity-20"
                    />
                </div>

                <div className="flex-1 flex flex-col gap-2">
                    <h4 className="text-sm lg:text-base font-semibold text-secondary-800 leading-[26px]">
                        {cartItem.description}
                    </h4>
                    <span className="text-xs lg:text-sm text-primary-900">
                        {cartItem.brand}
                    </span>
                    <span className="text-[10px] lg:text-xs text-secondary-600">
                        گارانتی یک ساله کالا مارکت
                    </span>
                </div>
            </div>

            <div className="w-full flex flex-col min-[430px]:flex-row min-[430px]:items-end justify-between gap-3">
                <div>
                    <div className="w-full flex items-center justify-between gap-5 lg:gap-6 px-3 h-10 btn !rounded-lg border border-slate-200">
                        <button 
                            disabled={cartItem.countInStock === cartItem.quantity} 
                            onClick={addToCartHandler}
                            className="btn text-success disabled:text-secondary-200"
                        >
                            <PlusIcon className={'w-4 h-4'}/>
                        </button>
                        {
                            isAdding || isRemoving ? 
                            <Loading />
                            :
                            <div className="text-primary-900 text-sm">
                                {toPersianDigit(cartItem.quantity)}
                            </div>
                        }
                        {
                            <button onClick={removeCartItemHandler} className="btn text-error">
                                {
                                    cartItem.quantity === 1 ?
                                    <TrashIcon className={'w-4 h-4'}/>
                                    :
                                    <MinusIcon className={'w-4 h-4'}/>
                                }
                            </button>
                        }
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    {!!cartItem.discount &&
                    <div className="text-[10px] lg:text-xs text-error">
                        {toPersianDigit(numberWithCommas(cartItem.price-cartItem.offPrice))} تومان تخفیف
                    </div>}

                    <div className="flex items-center gap-1 text-secondary-900">
                        <span className="font-bold lg:text-lg">
                            {toPersianDigit(numberWithCommas(cartItem.offPrice))}
                        </span>
                        <span className="text-xs">
                            تومان
                        </span>
                    </div>

                    {Number(cartItem.countInStock) <= 3 && Number(cartItem.countInStock) !== 0 &&
                    <div className="text-[10px] lg:text-xs text-error">
                        {toPersianDigit(`تنها ${cartItem.countInStock} عدد در انبار باقی مانده`)}
                    </div>}
                </div>
            </div>


            
        </div>
    )
}
