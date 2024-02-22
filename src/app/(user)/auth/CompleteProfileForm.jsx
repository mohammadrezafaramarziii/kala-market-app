"use client"
import { UserDataIcon } from "@/common/Icons";
import FormTemplate from "./FormTemplate";
import TextField from "@/common/TextField";
import Loading from "@/common/loading/Loading";
import { useRouter } from "next/navigation";
import { completeProfile } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import ToastSuccess from "@/common/toasts/ToastSuccess";
import ToastError from "@/common/toasts/ToastError";

export default function CompleteProfileForm() {
    const router = useRouter();
    const { data, error, isPending, mutateAsync } = useMutation({ mutationFn: completeProfile });

    const completeProfileHandler = async () => {
        try {
            const { message } = await mutateAsync({ name: formik.values.name, email: formik.values.email });
            ToastSuccess("به کالا مارکت خوش آمدید");
            router.replace("/");
        } catch (error) {
            ToastError(error?.response?.data?.message);
        }
    }

    const formik = useFormik({
        initialValues:{ name: "", email: ""},
        onSubmit: completeProfileHandler,
        validationSchema: Yup.object({
            name :Yup.string()
                .required("نام و نام خانوادگی خود را وارد کنید"),
            email :Yup.string()
                .required("ایمیل خود را وارد کنید")
                .email("ایمیل وارد شده نادرست است")
        }),
        validateOnMount: true
    });

    return (
        <FormTemplate
            title={'تکمیل پروفایل'} 
            icon={<UserDataIcon className={'w-5 h-5'}/>}
        >

            <div className="flex flex-col items-center gap-4">
                <TextField
                    placeholder={'نام و نام خانوادگی خود را وارد کنید'}
                    name={'name'}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.name && formik.touched.name && formik.errors.name}
                />

                <TextField 
                    placeholder={'ایمیل خود را وارد کنید'}
                    name={'email'}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.email && formik.touched.email && formik.errors.email}
                />

                {
                    !isPending ?
                    <button onClick={formik.handleSubmit} type="submit" className="w-full max-w-[200px] btn btn--primary mt-4">
                        ثبت مشخصات
                    </button>
                    :
                    <div className="btn btn--primary max-w-[200px] w-full hover:!outline-none mt-4">
                        <Loading />
                    </div>
                }
            </div>
        </FormTemplate>
    )
}
