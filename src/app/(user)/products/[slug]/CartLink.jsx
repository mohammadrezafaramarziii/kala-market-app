"use client";
import { CartIcon } from "@/common/Icons";
import { useGetUser } from "@/hooks/useAuth";
import { toPersianDigit } from "@/utils/toPersianDigit";
import Link from "next/link";

export function CartLink(){
    const { data, isPending } = useGetUser();
    const { cart } = data || {};
    
    return(
        <Link href={'/cart'} className="btn relative">
            {
                cart && cart.payDetail.productIds.length !== 0 &&
                <div className="absolute flex items-center justify-center top-[13px] right-[-3px] w-4 h-4 text-[10px] rounded-full bg-error text-white">
                    {toPersianDigit(cart.payDetail.productIds.length)}
                </div>
            }
            <CartIcon className={'w-6 h-6'}/>
        </Link>
    )
}