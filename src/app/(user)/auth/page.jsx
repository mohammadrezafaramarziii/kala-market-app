"use client";
import { useEffect, useState } from "react";
import SendOTPForm from "./SendOTPForm";
import { useMutation } from "@tanstack/react-query";
import {checkOtp, getOtp} from "@/services/authService";
import { useFormik } from "formik";
import * as Yup from "yup";
import CheckOTPForm from "./CheckOTPForm";
import { useRouter } from "next/navigation";
import ToastSuccess from "@/common/toasts/ToastSuccess";

const RESET_TIME = 90;

export default function AuthPage(){
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState();
    const [time, setTime] = useState();
    const router = useRouter();

    const { isPending : sendOtpLoading, mutateAsync : mutateSendOtp} = useMutation({
        mutationFn: getOtp
    })
    const { isPending : checkOtpLoading, mutateAsync : mutateCheckOtp} = useMutation({
        mutationFn: checkOtp
    })


    const sendOtpHandler = async () => {        
        try {
            const data = await mutateSendOtp({ 
                phoneNumber: formikPhoneNumber.values.phoneNumber
            });
            
        } catch (error) {
            if(error.response.data.message === "کد اعتبارسنجی ارسال نشد"  &&error.response.data.statusCode === 403){
                setStep(2);
                setTime(RESET_TIME);
                setOtp("");
            } else {
                formikPhoneNumber.setFieldError("phoneNumber", error?.response?.data?.message);
            }
        }
    }

    const checkOtpHandler = async () => {
        if(otp.length === 6){
            try {
                const { user, message } = await mutateCheckOtp({ 
                    phoneNumber: formikPhoneNumber.values.phoneNumber,
                    otp
                });
                setOtpError();

                if(user.isActive) {
                    ToastSuccess("به کالا مارکت خوش آمدید");
                    router.replace("/");

                } else {
                    router.replace("/complete-profile");
                }
    
            } catch (error) {
                setOtpError(error?.response?.data?.message);
            }
        } else {
            setOtpError("رمز ارسال شده را وارد کنید")
        }
    }

    const autoCheckOtpHandler = async (e) => {
        setOtp(e);

        if(e.length === 6) {
            try {
                const { user, message } = await mutateCheckOtp({ 
                    phoneNumber: formikPhoneNumber.values.phoneNumber,
                    otp: e
                });
                setOtpError();

                if(user.isActive) {
                    ToastSuccess("به کالا مارکت خوش آمدید");
                    router.replace("/");
                } else {
                    router.replace("/complete-profile");
                }
    
            } catch (error) {
                setOtpError(error?.response?.data?.message);
            }
        }
    }


    const formikPhoneNumber = useFormik({
        initialValues: {phoneNumber: ""},
        onSubmit: sendOtpHandler,
        validationSchema: Yup.object({
            phoneNumber: Yup.string()
                .required("شماره موبایل خود را وارد کنید")
                .matches(/^(09)\d{9}$/, "شماره موبایل وارد شده نادرست است")
        })
    });


    useEffect(() => {
      const timer = time > 0 && setInterval(() => setTime(time - 1), 1000);
    
      return () => {
        if(timer) clearInterval(timer)
      }
    }, [time])
    

    const renderStep = () => {
        switch (step) {
            case 1:
                return(
                    <SendOTPForm 
                        formik={formikPhoneNumber}
                        isLoading={sendOtpLoading}
                    />
                )
                break;
            
            case 2:
                return(
                    <CheckOTPForm 
                        phoneNumber={formikPhoneNumber.values.phoneNumber}
                        otp={otp}
                        setOtp={autoCheckOtpHandler}
                        isLoading={checkOtpLoading}
                        onSubmit={checkOtpHandler}
                        error={otpError}
                        onBack={()=>setStep(1)}
                        time={time}
                        onResendOtp={sendOtpHandler}
                    />
                )
                break;

            default:
                break;
        }
    }

    return(
        <div className="w-full h-screen flex items-center justify-center p-4">
            {renderStep()}
        </div>
    )
}
