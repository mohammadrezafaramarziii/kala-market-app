"use client";
import TextField from "@/common/TextField";
import Loading from "@/common/loading/Loading";
import Modal from "@/components/profileComponent/Modal";
import { checkOtp, updateProfile } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toPersianDigit } from "@/utils/toPersianDigit";
import OTPInput from "react-otp-input";
import { kalamehNumFont } from "@/constants/localFonts";

export default function PhoneNumberFormEdit({show, onClose, value}){
    const { isPending:isUpdating, mutateAsync:mutateUpdateProfile } = useMutation({ mutationFn: updateProfile });
    const { isPending : isCheckingOtp, mutateAsync : mutateCheckOtp } = useMutation({ mutationFn: checkOtp });
    
    const [otp, setOtp] = useState("")
    const [otpErr, setOtpErr] = useState("");


    const closeHandler = () => {
        formik.setFieldValue("phoneNumber", "");
        setOtp("")
        setOtpErr("")
        onClose();
    }


    const updateProfileHandler = async () => {
        if(otp) {
            
            setOtpErr("");
            try {
                const { user } = await mutateCheckOtp({phoneNumber:value.phoneNumber , otp});
                
                if(user) {
                    try {
                        const data = await mutateUpdateProfile({
                            name: value.name,
                            email: value.email,
                            phoneNumber: formik.values.phoneNumber,
                            biography: value.biography || ""
                        });

                        if(data){
                           closeHandler();
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            } catch (error) {
                setOtpErr(error?.response?.data?.message);
            }            
        } else {
            setOtpErr("کد یکبار مصرف را وارد کنید")
        }
    }
    const formik = useFormik({
        initialValues: {phoneNumber: ""},
        onSubmit: updateProfileHandler,
        validationSchema: Yup.object({
            phoneNumber: Yup.string()
                .required("لطفا شماره موبایل جدید را وارد کنید")
                .matches(/^(09)\d{9}$/, "شماره موبایل وارد شده اشتباه است")
                .test(
                    'notValidPhoneNumber',
                    'شماره موبایل جدید نمیتواند با شماره موبایل فعلی یکسان باشد',
                    (v) => v !== value.phoneNumber
                )
        })
    })

    return(
        <Modal 
            title="ویرایش شماره موبایل" 
            modalName="phoenumber-form-edit"
            show={show}
            onClose={closeHandler}
        >
            <p className="text-error my-4">برای ویرایش کد یکبار مصرف به شماره موبایل فعلی ارسال می شود</p>

            <label className="text-sm mr-1 text-slate-500">شماره موبایل فعلی</label>
            <div className="textField__input flex items-center bg-slate-50 mb-6">
                {toPersianDigit(value.phoneNumber)}
            </div>

            <TextField 
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                name={'phoneNumber'}
                label={'شماره موبایل جدید'}
                inputClassName={'bg-slate-100'}
                error={formik.errors.phoneNumber}
           />

            <div className="w-full flex flex-col gap-2 mt-6">
                <div className="w-full max-w-[322px] mx-auto flex">
                    <label className="w-full text-sm block mr-1 text-slate-500">
                        کد یکبار مصرف
                    </label>
                </div>
                <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    inputType="number"
                    shouldAutoFocus={true}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={`${kalamehNumFont.variable} !font-number ${otpErr ? "border-error" : "border-slate-200 focus:border-primary-900"} bg-slate-100 border !w-full !max-w-[47px] !h-[47px] !text-slate-900 outline-0 border rounded-lg text-xl text-center text-slate-800`}
                    containerStyle="w-full flex flex-row-reverse items-center justify-center gap-2"
                />
                {
                    otpErr && 
                    <div className="w-full max-w-[322px] mx-auto flex ">
                        <span className="text-xs text-error mr-1 font-medium">
                            {otpErr}
                        </span>
                    </div>
                }
            </div>
           {
            isUpdating || isCheckingOtp?
            <div className="w-full btn btn--primary hover:outline-none mt-6">
                <Loading />
            </div>
            :
            <button type="submit"  onClick={formik.handleSubmit} className="btn btn--primary w-full mt-6">
                ویرایش  
            </button>
           }
        </Modal>
    )
}