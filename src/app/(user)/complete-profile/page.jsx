"use client";
import TextField from "@/common/TextField";
import FormTemplate from "../auth/FormTemplate";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { completeProfile } from "@/services/authService";
import Loading from "@/common/loading/Loading";
import ToastSuccess from "@/common/toasts/ToastSuccess";
import ToastError from "@/common/toasts/ToastError";
import { useRouter } from "next/navigation";

export default function CompleteProfilePage(){
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

    return(
        <div className="w-full h-screen flex items-center justify-center p-4">
            <FormTemplate title={'تکمیل پروفایل'} desc={'مشخصات خود را برای تکمیل پروفایل وارد کنید.'}>

                <div className="flex flex-col gap-4">
                    <TextField 
                        label={'نام و نام خانوادگی'}
                        name={'name'}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.name && formik.touched.name && formik.errors.name}
                    />

                    <TextField 
                        label={'ایمیل'}
                        name={'email'}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.email && formik.touched.email && formik.errors.email}
                    />

                    {
                        !isPending ?
                        <button type="submit" onClick={formik.handleSubmit} className="btn btn--primary mt-4"> 
                            ثبت
                        </button>
                        :
                        <div className="btn btn--primary hover:!outline-none">
                            <Loading />
                        </div>
                    }
                </div>
            </FormTemplate>
        </div>
    )
}