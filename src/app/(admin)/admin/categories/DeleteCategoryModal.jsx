import ToastError from "@/common/toasts/ToastError";
import ToastSuccess from "@/common/toasts/ToastSuccess";
import Modal from "@/components/Modal";
import { deleteCategory } from "@/services/categoryService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function DeleteCategoryModal({ show, onClose, categoryId }) {
    const { mutateAsync, isPending } = useMutation({mutationFn:deleteCategory});
    const queryClient = useQueryClient();

    const deleteHandler = async () => {
        try {
            const { message } = await mutateAsync(categoryId);
            ToastSuccess(message);
            onClose();
            queryClient.invalidateQueries({queryKey:["get-categories"]});
        } catch (error) {
            ToastError(error?.response?.data?.message);
        }
    }

    return (
        <Modal
            title={'حذف دسته بندی'}
            show={show}
            onClose={onClose}
        >
            <p className="text-secondary-700 font-medium">
                آیا از حذف این دسته بندی مطمئن هستید؟
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