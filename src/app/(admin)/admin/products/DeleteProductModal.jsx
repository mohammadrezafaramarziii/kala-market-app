import ToastError from "@/common/toasts/ToastError";
import ToastSuccess from "@/common/toasts/ToastSuccess";
import Modal from "@/components/Modal";
import { deleteProduct } from "@/services/productService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function DeleteProductModal({ show, onClose, productId }){
    const { mutateAsync, isPending } = useMutation({mutationFn:deleteProduct});
    const queryClient = useQueryClient();

    const deleteHandler = async () => {
        try {
            const { message } = await mutateAsync(productId);
            ToastSuccess(message);
            onClose();
            queryClient.invalidateQueries({queryKey:["get-products"]});
        } catch (error) {
            ToastError(error?.response?.data?.message);
        }
    }

    return (
        <Modal
            title={'حذف محصول'}
            show={show}
            onClose={onClose}
        >
            <p className="text-secondary-700 font-medium">
                آیا از حذف این محصول مطمئن هستید؟
            </p>

            <div className="flex items-center gap-3 mt-6">
                <button onClick={deleteHandler} className="!w-full !max-w-[160px] !h-12 btn btn--primary">
                    حذف
                </button>
                <button onClick={onClose} className="!w-full !max-w-[160px] btn btn--light">
                    لغو
                </button>
            </div>
        </Modal>
    )
}