"use client"

import Loading from "@/common/loading/Loading";
import ToastError from "@/common/toasts/ToastError";
import ToastSuccess from "@/common/toasts/ToastSuccess";
import TitlebarAdmin from "@/components/adminComponent/TitlebarAdmin";
import { useGetCouponById } from "@/hooks/useCoupon";
import { useGetProducts } from "@/hooks/useProducts";
import { updateCoupon } from "@/services/couponService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useRouter } from "next/navigation"
import CouponFieldsForm from "../../CouponFieldsForm";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { ArrowRightIcon } from "@/common/Icons";

const initialValues = {
    type: "percent",
    code: "",
    amount: "",
    usageLimit: "",
    productIds: [],
    expireDate: ""
}

const validationSchema = Yup.object({
    code: Yup.string().required("کد تخفیف را وارد کنید"),
    amount: Yup.string().required("مقدار تخفیف را وارد کنید"),
    usageLimit: Yup.string().required("ظرفیت کد تخفیف را وارد کنید"),
    expireDate: Yup.string().required("تاریخ انقضای تخفیف را وارد کنید"),
    productIds: Yup.array().min(1, "محضولات شامل تخفیف را انتخاب کنید").required("محضولات شامل تخفیف را انتخاب کنید"),
})

export default function EditCoupon(){
    const { id } = useParams();
    const { data:couponData, isPending:isGetCoupon } = useGetCouponById(id);
    const { coupon } = couponData || {};
    const { data } = useGetProducts();
    const { products } = data || {};
    const router = useRouter();

    const { mutateAsync, isPending } = useMutation({ mutationFn: updateCoupon });

    const submitCouponHandler = async () => {
        const { code, type, amount, usageLimit, expireDate, productIds } = formik.values;

        try {
            const { message } = await mutateAsync({
                couponId: coupon._id,
                data:{
                    code, type,
                    amount: Number(amount),
                    usageLimit: Number(usageLimit),
                    expireDate: new Date(expireDate).toISOString(),
                    productIds: productIds.map(p => p._id)
                }
            })
            ToastSuccess(message);
            router.push('/admin/coupons');
        } catch (error) {
            ToastError(error?.response?.data?.message);
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit: submitCouponHandler,
        validationSchema
    })

    useEffect(()=>{
        if(!isGetCoupon){
            const couponFields = ["code", "type", "amount", "usageLimit", "productIds"]
            
            couponFields.forEach((item)=>{
                formik.setFieldValue(item, coupon[item])
            })

            formik.setFieldValue("expireDate", new Date(coupon.expireDate))
        }
    }, [coupon])

    if (isGetCoupon) {
        return (
            <div className="w-full h-full max-[1024px]:min-h-[calc(100vh-3rem)] flex items-center justify-center">
                <Loading />
            </div>
        )
    }

    return(
        <div>
            <TitlebarAdmin title={'ویرایش کد تخفیف'}/>

            <div className="w-full flex justify-end mt-8">
                <button onClick={() => history.back()} className="btn btn--icon">
                    <ArrowRightIcon className={'w-5 h-5 rotate-180'} />
                </button>
            </div>

            <CouponFieldsForm
                formik={formik}
                products={products}
                isLoading={isPending}
                submitButtonText={'ویرایش'}
                selectedsProduct={coupon.productIds}
            />
        </div>
    )
}