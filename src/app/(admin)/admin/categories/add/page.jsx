"use client"
import { ArrowRightIcon } from "@/common/Icons";
import TitlebarAdmin from "@/components/adminComponent/TitlebarAdmin";
import CategoryFieldForm from "../CategoryFieldsForm";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { addCategory } from "@/services/categoryService";
import ToastSuccess from "@/common/toasts/ToastSuccess";
import { useRouter } from "next/navigation";
import ToastError from "@/common/toasts/ToastError";


const initialValues = {
    title: "",
    englishTitle: "",
    type: "product",
    description: ""
}

const validationSchema = Yup.object({
    title: Yup.string().required("عنوان دسته بندی را وارد کنید").min(3, "عنوان باید حداقل 3 حرف باشد"),
    englishTitle: Yup.string().required("نام انگلیسی را وارد کنید").min(3, "نام انگلیسی باید حداقل 3 حرف باشد"),
    description: Yup.string().required("توضیحات دسته بندی را وارد کنید")
})

export default function AddCategoryPage() {
    const router = useRouter();

    const { mutateAsync, isPending } = useMutation({mutationFn:addCategory});

    const addCategoryHandler = async () => {
        try {
            const { message } = await mutateAsync(formik.values);
            ToastSuccess(message);
            router.push('/admin/categories');
        } catch (error) {
            ToastError(error?.response?.data?.message);
        }   
    }
    const formik = useFormik({
        initialValues,
        onSubmit: addCategoryHandler,
        validationSchema
    })


    return (
        <div className="w-full min-h-full flex flex-col">
            <TitlebarAdmin title={'افزودن دسته بندی جدید'} />

            <div className="w-full flex justify-end mt-8">
                <button onClick={() => history.back()} className="btn btn--icon">
                    <ArrowRightIcon className={'w-5 h-5 rotate-180'} />
                </button>
            </div>

            <CategoryFieldForm
                formik={formik}
                submitButtonText={"ثبت"}
                isLoading={isPending}
            />
        </div>
    )
}