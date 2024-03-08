"use client";
import { HeartBoldIcon, HeartIcon } from "@/common/Icons";
import ToastError from "@/common/toasts/ToastError";
import ToastSuccess from "@/common/toasts/ToastSuccess";
import { useGetUser } from "@/hooks/useAuth";
import { likeProduct } from "@/services/productService";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function LikeProduct({product}){
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data } = useGetUser();
    const { user } = data || {};

    const likeProductHandler = async () => {
        try {
            const {message} = await likeProduct(product._id);
            ToastSuccess(message);
            router.refresh();
            queryClient.invalidateQueries({queryKey:["get-user"]});
        } catch (error) {
            ToastError(error?.response?.data?.message);
        }
    }
    
    return(
        <button onClick={likeProductHandler} className="btn relative">
            {
                user?.likedProducts.includes(product._id) ?
                <HeartBoldIcon className={`w-6 h-6 !text-red-500`}/>
                :
                <HeartIcon className={`w-6 h-6 text-secondary-800`}/>
            }
        </button>
    )
}