import { HeartBoldIcon, HeartIcon } from "@/common/Icons";
import ToastError from "@/common/toasts/ToastError";
import ToastSuccess from "@/common/toasts/ToastSuccess";
import { likeProduct } from "@/services/productService";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function LikeProduct({product}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const likeProductHandler = async () => {
    try {
        const {message} = await likeProduct(product._id);
        ToastSuccess(message);
        router.refresh();
        queryClient.invalidateQueries({queryKey:["get-products"]});
    } catch (error) {
        ToastError(error?.response?.data?.message);
    }
  }

  return (
    <div className="absolute top-5 right-5 z-20">
        <button onClick={likeProductHandler} className="btn !text-secondary-500">
            {
                product.isLiked ?
                <HeartBoldIcon className={`w-5 h-5 !text-red-500`}/>
                :
                <HeartIcon className={`w-5 h-5`}/>
            }
        </button>
    </div>
  )
}
