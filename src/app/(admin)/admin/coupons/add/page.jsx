"use client"
import TitlebarAdmin from "@/components/adminComponent/TitlebarAdmin";
import { useFormik } from "formik";
import * as  Yup from 'yup';
import CouponFieldsForm from "../CouponFieldsForm";
import { useGetProducts } from "@/hooks/useProducts";
import { ArrowRightIcon } from "@/common/Icons";
import { useMutation } from "@tanstack/react-query";
import { addCoupon } from "@/services/couponService";
import ToastSuccess from "@/common/toasts/ToastSuccess";
import ToastError from "@/common/toasts/ToastError";
import { useRouter } from "next/navigation";


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

export default function AddCoupons() {
    const { data } = useGetProducts();
    const { products } = data || {};
    const router = useRouter();

    const { mutateAsync, isPending } = useMutation({ mutationFn: addCoupon });

    const submitCouponHandler = async () => {
        const { code, type, amount, usageLimit, expireDate, productIds } = formik.values;

        try {
            const { message } = await mutateAsync({
                code, type,
                amount: Number(amount),
                usageLimit: Number(usageLimit),
                expireDate: new Date(expireDate).toISOString(),
                productIds: productIds.map(p => p._id)
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

    return (
        <div>
            <TitlebarAdmin title={'افزودن تخفیف جدید'} />

            <div className="w-full flex justify-end mt-8">
                <button onClick={() => history.back()} className="btn btn--icon">
                    <ArrowRightIcon className={'w-5 h-5 rotate-180'} />
                </button>
            </div>

            <CouponFieldsForm
                formik={formik}
                products={products}
                isLoading={isPending}
                submitButtonText={'ثبت'}
            />
        </div>
    )
}