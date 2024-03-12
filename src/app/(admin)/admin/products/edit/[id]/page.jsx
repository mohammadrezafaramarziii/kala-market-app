"use client"

import Loading from "@/common/loading/Loading";
import TitlebarAdmin from "@/components/adminComponent/TitlebarAdmin";
import { useGetProductById } from "@/hooks/useProducts";
import { useParams, useRouter } from "next/navigation"
import ProductFieldsForm from "../../ProductFieldsForm";
import { useGetCategories } from "@/hooks/useCategories";
import { useFormik } from "formik";
import * as Yup from 'yup';
import "@/styles/react-tag-input.css";
import { useEffect, useState } from "react";
import { updateProduct } from "@/services/productService";
import ToastSuccess from "@/common/toasts/ToastSuccess";
import ToastError from "@/common/toasts/ToastError";
import { useMutation } from "@tanstack/react-query";


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

export default function EditProduct() {
    const { id } = useParams();
    const { data, isPending } = useGetProductById(id);
    const { product } = data || {};
    const router = useRouter();
    const { data: categoriesData } = useGetCategories();
    const { categories } = categoriesData || {};
    const [productFake, setProductFake] = useState();
    const { mutateAsync, isPending: isUpdating } = useMutation({ mutationFn: updateProduct });

    const updateProductHandler = async () => {
        const { title, description, slug, tags, imageLink, brand, price, discount, offPrice, countInStock, category, numReviews } = formik.values;
        try {
            const { message } = await mutateAsync({
                id: product._id,
                data: {
                    title,
                    description,
                    slug,
                    tags,
                    // imageLink: imageLink.name,
                    brand,
                    price: Number(price),
                    discount: Number(discount) || 0,
                    offPrice: Number(offPrice),
                    countInStock,
                    category: category._id,
                }
            })
            ToastSuccess(message);
            router.push('/admin/products')
        } catch (error) {
            ToastError(error?.response?.data?.message);
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit: updateProductHandler,
        validationSchema
    })



    useEffect(() => {

        if (!isPending && !productFake) {
            const valueFieldObj = ["title", "slug", "brand", "countInStock", "price", "discount", "description"];

            valueFieldObj.forEach((field) => {
                formik.setFieldValue(field, product[field]);
            })
            setProductFake(product);
        }

        formik.setFieldValue("tags", product?.tags || [])
        formik.setFieldValue("category", product?.category._id || "")


        let offPrice = formik.values.discount > 0 && (formik.values.price * formik.values.discount) / 100;
        formik.setFieldValue("offPrice", offPrice ? formik.values.price - offPrice : formik.values.price);
    }, [formik.values.price, formik.values.discount, product, isPending])


    if (isPending) {
        return (
            <div className="w-full h-full max-[1024px]:min-h-[calc(100vh-3rem)] flex items-center justify-center">
                <Loading />
            </div>
        )
    }

    return (
        <div>
            <TitlebarAdmin title={'ویرایش محصول'} />

            <ProductFieldsForm
                formik={formik}
                categories={categories}
                isLoading={isUpdating}
                submitButtonText={"ویرایش"}
                selectedCategory={product.category}
            />
        </div>
    )
}