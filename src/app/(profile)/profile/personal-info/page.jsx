"use client";
import Sectionbox from "@/components/profileComponent/Sectionbox";
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
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


const initialValues = {
    name:"",
    biography:"",
    email:""
};

const validationSchema = Yup.object({
    name: Yup.string()
        .required("نام و نام خانوادگی خود را وارد کنید")
        .min(3, "نام و نام خانوادگی باید حداقل ۳ حرف باشد"),
    email: Yup.string()
        .required("ایمیل خود را وارد کنید")
        .email("ایمیل وارد شده نادرست است")
});

export default function PersonalInfoPage(){
    const { data, isPending } = useGetUser();
    const { user } = data || {};
    const queryClient = useQueryClient();
    const userObj = ["name","biography","email",];

    const [showPhoneNumberModal, setShowPhoneNumberModal] = useState(false);

    const { isPending:isUpdatingProfile, mutateAsync : mutateUpdateProfile } = useMutation({ mutationFn: updateProfile });
    
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
            queryClient.invalidateQueries({queryKey:['get-user']});

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


    const { isPending : isGetingOtp, mutateAsync: mutateSendOtp } = useMutation({ mutationFn: getOtp });

    const getOtpPhoneNumberHandler = async () => {
        try {
            const res = await mutateSendOtp({phoneNumber: user.phoneNumber});
        } catch (error) {
            if(error?.response?.data?.statusCode === 403 && error?.response?.data?.message === "کد اعتبارسنجی ارسال نشد") {
                setShowPhoneNumberModal(true);
            }
        }
    }

    useEffect(()=>{
        if(!isPending){
            for(let i in userObj) {
                formik.setFieldValue(userObj[i], user[userObj[i]]);
            }
        }
    },[data,user])


    return(
        <div className="p-6 flex flex-col gap-8">
            <Sectionbox title={'اطلاعات کاربری'}>
                <div className="w-full  flex flex-col gap-4">

                    {
                        isPending ?
                        <div className="w-full flex flex-col gap-2">
                            <Skeleton 
                                containerClassName="!w-[150px] !h-5 !block"
                                className="!w-full !h-5 !block !rounded-lg"
                            />          
                            <Skeleton 
                                containerClassName="!w-full !h-12 !block"
                                className="!w-full !h-12 !block !rounded-xl"
                            />          
                        </div>
                        :
                        <TextField 
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            name={'name'}
                            label={'نام و نام خانوادگی'}
                            inputClassName={'bg-slate-100'}
                            error={formik.errors.name && formik.touched.name && formik.errors.name}
                        />
                    }
                    {
                        isPending ?
                        <div className="w-full flex flex-col gap-2">
                            <Skeleton 
                                containerClassName="!w-[150px] !h-5 !block"
                                className="!w-full !h-5 !block !rounded-lg"
                            />          
                            <Skeleton 
                                containerClassName="!w-full !h-12 !block"
                                className="!w-full !h-12 !block !rounded-xl"
                            />          
                        </div>
                        :
                        <TextField 
                            value={formik.values.biography}
                            onChange={formik.handleChange}
                            name={'biography'}
                            label={'بیوگرافی'}
                            inputClassName={'bg-slate-100'}
                        />
                    }
                    {
                        isPending ?
                        <div className="w-full flex flex-col gap-2">
                            <Skeleton 
                                containerClassName="!w-[150px] !h-5 !block"
                                className="!w-full !h-5 !block !rounded-lg"
                            />          
                            <Skeleton 
                                containerClassName="!w-full !h-12 !block"
                                className="!w-full !h-12 !block !rounded-xl"
                            />          
                        </div>
                        :
                        <TextField 
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            name={'email'}
                            label={'ایمیل'}
                            inputClassName={'bg-slate-100'}
                            error={formik.errors.email && formik.touched.email && formik.errors.email}
                        />
                    }
                    
                    {
                        isPending ?
                        <div className="w-full flex gap-4 justify-center">
                            <Skeleton 
                                containerClassName="!w-[108px] !h-12 !block"
                                className="!w-full !h-12 !block !rounded-xl"
                            />          
                            <Skeleton 
                                containerClassName="!w-[108px] !h-12 !block"
                                className="!w-full !h-12 !block !rounded-xl"
                            />            
                        </div>
                        :
                        <div className="flex items-center justify-center gap-4">
                            {
                                isUpdatingProfile ?
                                <div className="btn btn--primary hover:outline-transparent !w-[108px]">
                                    <Loading />
                                </div>
                                :
                                <button 
                                    type="submit" 
                                    disabled={
                                        formik.values.name === user.name && 
                                        formik.values.email === user.email &&
                                        formik.values.biography === user.biography 
                                        &&
                                        true
                                    }
                                    onClick={formik.handleSubmit} 
                                    className="btn btn--primary !w-[108px]"
                                >
                                    ثبت تغییرات
                                </button>
                            }
                            <button 
                                onClick={()=>{
                                    queryClient.invalidateQueries({queryKey:['get-user']});
                                    for(let i in userObj) {
                                        formik.setFieldValue(userObj[i], user[userObj[i]]);
                                    }
                                }} 
                                className="btn btn--light !w-[108px] !text-sm"
                            >
                                لغو تغییرات
                            </button>
                        </div>
                    }
                </div>
            </Sectionbox>

            <PhoneNumberFormEdit
                show={showPhoneNumberModal}
                onClose={()=>setShowPhoneNumberModal(false)}
                value={user || {}}
            />

            <Sectionbox title={'ویرایش شماره موبایل'}>
                
                {
                    isPending ?
                    <div className="w-full flex flex-col gap-2 mb-6">
                        <Skeleton 
                            containerClassName="!w-[150px] !h-5 !block"
                            className="!w-full !h-5 !block !rounded-lg"
                        />          
                        <Skeleton 
                            containerClassName="!w-full !h-12 !block"
                            className="!w-full !h-12 !block !rounded-xl"
                        />          
                    </div>
                    :
                    <>
                    <label className="text-sm mr-1 text-slate-500 mb-2 block">شماره موبایل فعلی</label>
                    <div className="textField__input flex justify-between items-center bg-slate-50 mb-6">
                        {toPersianDigit(user.phoneNumber)}
                        {
                            isGetingOtp ?
                            <div className="px-4">
                                <Loading />
                            </div>
                            :
                            <button onClick={getOtpPhoneNumberHandler} className="btn">
                                <EditIcon className={'text-secondary-700 w-5 h-5'}/>
                            </button>
                        }
                    </div> 
                    </>       
                }
            </Sectionbox>
        </div>
    )
}