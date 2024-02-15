"use client";
import Sectionbox from "@/components/profileComponent/Sectionbox";
import TextField from "@/common/TextField";
import { useGetUser } from "@/hooks/useAuth";
import Loading from "@/common/loading/Loading";
import Titlebar from "@/components/profileComponent/Titlebar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { EditIcon } from "@/common/Icons";
import { toPersianDigit } from "@/utils/toPersianDigit";
import { toPersianDate } from "@/utils/toPersianDate";
import NameFormEdit from "./NameFormEdit";
import BioFormEdit from "./BioFormEdit";
import EmailFormEdit from "./EmailFormEdit";
import PhoneNumberFormEdit from "./PhoneNumberFormEdit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getOtp } from "@/services/authService";


export default function PersonalInfoPage(){
    const [modals, setModals] = useState({
        name: false,
        phoneNumber: false,
        email: false,
        biography: false,
    })
    const { data, isPending } = useGetUser();
    const { user } = data || {};
    const queryClient = useQueryClient();
    const userObj = [
        {label:"نام و نام خانوادگی", title:"name"},
        {label:"بیوگرافی", title:"biography"},
        {label:"شماره موبایل", title:"phoneNumber"},
        {label:"ایمیل", title:"email"},
    ];

    const { isPending : isGetingOtp, mutateAsync: mutateSendOtp } = useMutation({ mutationFn: getOtp });

    const getOtpPhoneNumberHandler = async () => {
        try {
            const res = await mutateSendOtp({phoneNumber: user.phoneNumber});
        } catch (error) {
            if(error?.response?.data?.statusCode === 403 && error?.response?.data?.message === "کد اعتبارسنجی ارسال نشد") {
                setModals({...modals, phoneNumber:true})
            }
        }
    }

    return(
        <div className="mt-[72px] pb-[128px] lg:mt-0">
            <Titlebar title={'اطلاعات کاربری'}/>

            <Sectionbox title={'اطلاعات کاربری'}>
                {
                isPending ?
                <div className="w-full h-28 flex items-center justify-center">
                    <Loading />
                </div>
                :
                <>
                <NameFormEdit 
                    show={modals.name} 
                    onClose={()=>{
                        setModals({...modals, name:false});
                        queryClient.invalidateQueries({queryKey: ["get-user"]})
                    }}
                    value={user}
                />

                <BioFormEdit
                    show={modals.biography} 
                    onClose={()=>{
                        setModals({...modals, biography:false});
                        queryClient.invalidateQueries({queryKey: ["get-user"]})
                    }}
                    value={user}
                />

                <PhoneNumberFormEdit
                    show={modals.phoneNumber} 
                    onClose={()=>{
                        setModals({...modals, phoneNumber:false});
                        queryClient.invalidateQueries({queryKey: ["get-user"]})
                    }}
                    value={user}
                />

                <EmailFormEdit
                    show={modals.email} 
                    onClose={()=>{
                        setModals({...modals, email:false});
                        queryClient.invalidateQueries({queryKey: ["get-user"]})
                    }}
                    value={user}
                />

                <div className="w-full grid grid-cols-1` lg:grid-cols-2 gap-6 mt-4">
                    {userObj.map((obj, index)=>{
                        return(
                            <div key={index}>
                                <label className="text-sm text-slate-500 block pr-1">
                                    {obj.label}
                                </label>
                                <div className="w-full mt-2 flex items-center justify-between px-4 rounded-xl bg-slate-100 h-12">
                                    <span className="text-sm text-secondary-800 font-medium">
                                        {toPersianDigit(user[obj.title] || "")}
                                    </span>
                                    {
                                        obj.title !== "phoneNumber" ?
                                        <button onClick={()=>{
                                            if(obj.title !== "phoneNumber"){
                                                setModals({...modals, [obj.title]:true})
                                            } else {
                                                getOtpPhoneNumberHandler();
                                            }
                                        }} className="btn text-secondary-800 hover:text-primary-900">
                                            <EditIcon className="w-5 h-5"/>
                                        </button>
                                        :
                                        isGetingOtp ?
                                        <div className="ml-4">
                                            <Loading />
                                        </div>
                                        :
                                        <button onClick={()=>{
                                            if(obj.title !== "phoneNumber"){
                                                setModals({...modals, [obj.title]:true})
                                            } else {
                                                getOtpPhoneNumberHandler();
                                            }
                                        }} className="btn text-secondary-800 hover:text-primary-900">
                                            <EditIcon className="w-5 h-5"/>
                                        </button>
                                    }
                                    
                                </div>
                            </div>
                        )
                    })}
                    <div>
                        <label className="text-sm text-slate-500 block pr-1">
                            تاریخ عضویت
                        </label>
                        <div className="w-full mt-2 flex items-center justify-between px-4 rounded-xl bg-slate-100 h-12">
                            <span className="text-sm text-secondary-800 font-medium">
                                {toPersianDigit(toPersianDate(user.createdAt) || "")}
                            </span>
                        </div>
                    </div>
                </div>
                </>
                }
            </Sectionbox>
        </div>
    )
}