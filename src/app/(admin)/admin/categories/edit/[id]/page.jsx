"use client"
import { ArrowRightIcon } from "@/common/Icons";
import TitlebarAdmin from "@/components/adminComponent/TitlebarAdmin";
import CategoryFieldForm from "../../CategoryFieldsForm";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useGetCategoriyById } from "@/hooks/useCategories";
import Loading from "@/common/loading/Loading";
import { useEffect } from "react";
import { updateCategory } from "@/services/categoryService";
import ToastSuccess from "@/common/toasts/ToastSuccess";
import ToastError from "@/common/toasts/ToastError";


const initialValues = {
    title: "",
    englishTitle: "",
    type: "",
    description: ""
}

const validationSchema = Yup.object({
    title: Yup.string().required("عنوان دسته بندی را وارد کنید").min(3, "عنوان باید حداقل 3 حرف باشد"),
    englishTitle: Yup.string().required("نام انگلیسی را وارد کنید").min(3, "نام انگلیسی باید حداقل 3 حرف باشد"),
    type: Yup.string().required("نوع دسته بندی را وارد کنید"),
    description: Yup.string().required("توضیحات دسته بندی را وارد کنید")
})

export default function EditCategory() {
    const router = useRouter();
    const { id } = useParams();
    const { data, isPending } = useGetCategoriyById(id);
    const { category } = data || {};


    const { mutateAsync, isPending:isUpdating } = useMutation({mutationFn:updateCategory});

    const updateCategoryHandler = async () => {
        try {
            const { message } = await mutateAsync({
                categoryId:category._id,
                data:formik.values
            });
            ToastSuccess(message);
            router.push('/admin/categories');
        } catch (error) {
            ToastError(error?.response?.data?.message);
        }   
    }
    const formik = useFormik({
        initialValues,
        onSubmit: updateCategoryHandler,
        validationSchema
    })


    useEffect(() => {
        if (!isPending) {
            const fieldsObj = ["title", "description", "type", "englishTitle"];

            fieldsObj.forEach((field)=>{
                formik.setFieldValue(field, category[field]);
            })
        }
    }, [isPending, category])

    if (isPending) {
        return (
            <div className="w-full h-full max-[1024px]:min-h-[calc(100vh-3rem)] flex items-center justify-center">
                <Loading />
            </div>
        )
    }

    return (
        <div className="w-full min-h-full flex flex-col">
            <TitlebarAdmin title={'ویرایش دسته بندی '} />

            <div className="w-full flex justify-end mt-8">
                <button onClick={() => history.back()} className="btn btn--icon">
                    <ArrowRightIcon className={'w-5 h-5 rotate-180'} />
                </button>
            </div>

            <CategoryFieldForm
                formik={formik}
                submitButtonText={"ویرایش"}
                isLoading={isUpdating}
            />
        </div>
    )
}