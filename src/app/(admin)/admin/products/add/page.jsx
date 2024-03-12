"use client"
import TitlebarAdmin from "@/components/adminComponent/TitlebarAdmin";
import { useGetCategories } from "@/hooks/useCategories";
import { useFormik } from "formik";
import * as  Yup from "yup";
import { useEffect } from "react";
import "@/styles/react-tag-input.css";
import { useMutation } from "@tanstack/react-query";
import { addProduct } from "@/services/productService";
import ToastError from "@/common/toasts/ToastError";
import ToastSuccess from "@/common/toasts/ToastSuccess";
import { useRouter } from "next/navigation";
import ProductFieldsForm from "../ProductFieldsForm";


const initialValues = {
    title: "",
    description: "",
    slug: "",
    tags: [],
    imageLink: "",
    brand: "",
    price: "",
    discount: 0,
    offPrice: 0,
    countInStock: "",
    category: "",
}

const validationSchema = Yup.object({
    title: Yup.string().required("عنوان کالا را وارد کنید"),
    slug: Yup.string().required("اسلاگ را وارد کنید"),
    description: Yup.string().required("توضیحات را وارد کنید"),
    tags: Yup.array().min(1, "تگ های کالا را وارد کنید"),
    imageLink: Yup.string().required("تصویر کالا را انتخاب کنید"),
    brand: Yup.string().required("نام برند را وارد کنید"),
    price: Yup.number().required("قیمت کالا را وارد کنید").min(1, "قیمت کالا حداقل 1000 تومان است"),
    countInStock: Yup.number().required("تعداد موجودی محصول را وارد کنید").min(3, "حداقل موجودی کالا 3 عدد"),
    category: Yup.string().required("دسته بندی کالا را انتخاب کنید"),
})

export default function AddNewProduct() {
    const router = useRouter();
    const { data: categoriesData } = useGetCategories();
    const { categories } = categoriesData || {};

    const { mutateAsync, isPending } = useMutation({ mutationFn: addProduct });

    const addProductHandler = async () => {
        const { title, description, slug, tags, imageLink, brand, price, discount, offPrice, countInStock, category } = formik.values;
        try {
            const { message } = await mutateAsync({
                title,
                description,
                slug,
                tags,
                imageLink: imageLink.name,
                brand,
                price: Number(price),
                discount: Number(discount) || 0,
                offPrice: Number(offPrice),
                countInStock,
                category,
            })
            ToastSuccess(message);
            router.push('/admin/products')
        } catch (error) {
            ToastError(error?.response?.data?.message);
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit: addProductHandler,
        validationSchema
    })

    useEffect(() => {
        let offPrice = formik.values.discount > 0 && (formik.values.price * formik.values.discount) / 100;
        formik.setFieldValue("offPrice", offPrice ? formik.values.price - offPrice : formik.values.price);
    }, [formik.values.price, formik.values.discount])


    return (
        <div>
            <TitlebarAdmin title={'افزودن محصول جدید'} />

            <ProductFieldsForm 
                formik={formik}
                categories={categories}
                isLoading={isPending}
                submitButtonText={"ثبت"}
            />
        </div>
    )
}