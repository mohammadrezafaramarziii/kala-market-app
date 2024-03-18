"use client";
import TextField from "@/common/TextField";
import { useGetUser } from "@/hooks/useAuth";
import Loading from "@/common/loading/Loading";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { EditIcon } from "@/common/Icons";
import { toPersianDigit } from "@/utils/toPersianDigit";
import PhoneNumberFormEdit from "./PhoneNumberFormEdit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getOtp, updateProfile } from "@/services/authService";
import ToastSuccess from "@/common/toasts/ToastSuccess";
import ToastError from "@/common/toasts/ToastError";
import Box from "@/components/profileComponent/Box";
import { toPersianDate } from "@/utils/toPersianDate";
import TitleBarProfile from "@/components/profileComponent/TitleBarProfile";


const initialValues = {
    name: "",
    biography: "",
    email: ""
};

const validationSchema = Yup.object({
    name: Yup.string()
        .required("نام و نام خانوادگی خود را وارد کنید")
        .min(3, "نام و نام خانوادگی باید حداقل ۳ حرف باشد"),
    email: Yup.string()
        .required("ایمیل خود را وارد کنید")
        .email("ایمیل وارد شده نادرست است")
});

export default function PersonalInfoPage() {
    const { data, isPending } = useGetUser();
    const { user } = data || {};
    const queryClient = useQueryClient();
    const userObj = [
        { label: "name", title: "نام و نام خانوادگی" },
        { label: "biography", title: "بیوگرافی" },
        { label: "email", title: "ایمیل" }
    ];

    const [showPhoneNumberModal, setShowPhoneNumberModal] = useState(false);

    const { isPending: isUpdatingProfile, mutateAsync: mutateUpdateProfile } = useMutation({ mutationFn: updateProfile });

    const updateProfileHandler = async () => {
        const { name, email, biography } = formik.values;

        try {
            const { message } = await mutateUpdateProfile({
                name,
                email,
                phoneNumber: user.phoneNumber,
                biography
            });

            ToastSuccess(message);
            queryClient.invalidateQueries({ queryKey: ['get-user'] });

        } catch (error) {
            ToastError(error?.response?.data?.message);
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit: updateProfileHandler,
        validationSchema,
        validateOnMount: true
    });


    const { isPending: isGetingOtp, mutateAsync: mutateSendOtp } = useMutation({ mutationFn: getOtp });

    const getOtpPhoneNumberHandler = async () => {
        try {
            const res = await mutateSendOtp({ phoneNumber: user.phoneNumber });
        } catch (error) {
            if (error?.response?.data?.statusCode === 403 && error?.response?.data?.message === "کد اعتبارسنجی ارسال نشد") {
                setShowPhoneNumberModal(true);
            }
        }
    }

    useEffect(() => {
        if (!isPending) {
            for (let i in userObj) {
                formik.setFieldValue(userObj[i].label, user[userObj[i].label]);
            }
        }
    }, [data, user])


    if (isPending) {
        return (
            <div className="w-full h-full max-[1024px]:min-h-[calc(100vh-3rem)] flex items-center justify-center">
                <Loading />
            </div>
        )
    }

    return (
        <div>
            <TitleBarProfile title={'اطلاعات کاربری'}/>
            <div className="mt-8">
                <Box title={'ویرایش اطلاعات کاربری'}>
                    <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {userObj.map((obj, index) => {
                            return (
                                <div key={index}>
                                    <label className="text-sm text-secondary-700 font-medium mb-2 mr-1 inline-block">
                                        {obj.title}
                                    </label>
                                    <TextField
                                        onChange={formik.handleChange}
                                        value={formik.values[obj.label]}
                                        name={obj.label}
                                        error={formik.errors[obj.label] && formik.touched[obj.label] && formik.errors[obj.label]}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                            )
                        })}

                        <div>
                            <label className="text-sm text-secondary-700 font-medium mb-2 mr-1 inline-block">
                                تاریخ عضویت
                            </label>
                            <div className="textField__input flex items-center">
                                {toPersianDate(user?.createdAt)}
                            </div>
                        </div>
                    </div>

                    <div className="w-full mt-8">
                        {
                            isUpdatingProfile ?
                                <div className="btn btn--primary hover:outline-transparent !w-full max-w-[200px]">
                                    <Loading />
                                </div>
                                :
                                <button
                                    type="submit"
                                    onClick={formik.handleSubmit} className="!w-full max-w-[200px] btn btn--primary"
                                    disabled={
                                        formik.values.name === user.name &&
                                        formik.values.email === user.email &&
                                        formik.values.biography === user.biography
                                        &&
                                        true
                                    }
                                >
                                    ویرایش
                                </button>
                        }
                    </div>
                </Box>
            </div>

            <div className="mt-12">
                <PhoneNumberFormEdit
                    show={showPhoneNumberModal}
                    onClose={() => setShowPhoneNumberModal(false)}
                    value={user || {}}
                />

                <Box title={'ویرایش شماره موبایل'}>
                    <div>
                        <div>
                            <label className="text-sm text-secondary-700 font-medium mb-2 mr-1 inline-block">
                                شماره موبایل فعلی
                            </label>
                            <div className="textField__input flex items-center justify-between">
                                <span>
                                    {toPersianDigit(user?.phoneNumber)}
                                </span>
                                {
                                    isGetingOtp ?
                                        <div className="px-4">
                                            <Loading />
                                        </div>
                                        :
                                        <button onClick={getOtpPhoneNumberHandler}>
                                            <EditIcon className={'w-5 h-5'} />
                                        </button>
                                }
                            </div>
                        </div>
                    </div>
                </Box>
            </div>
        </div>
    )
}