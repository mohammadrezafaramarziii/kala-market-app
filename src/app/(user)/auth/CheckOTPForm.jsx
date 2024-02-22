import OTPInput from "react-otp-input";
import FormTemplate from "./FormTemplate";
import Loading from "@/common/loading/Loading";
import { kalamehNumFont } from "@/constants/localFonts";
import { toPersianDigit } from "@/utils/toPersianDigit";
import { ArrowRightIcon, PasswordIcon } from "@/common/Icons";

export default function CheckOTPForm({isLoading, phoneNumber, error, otp, setOtp, onSubmit, onBack, time, onResendOtp}){
    return(
    <FormTemplate 
        title={'اعتبارسنجی'}
        icon={<PasswordIcon className={'w-5 h-5'}/>} 
    >
        <div className="mt-4">

            <div className="w-full flex flex-col items-center gap-2 mb-6">
                <p className="text-xs text-slate-500 text-center">
                    رمز یکبار مصرف به شماره موبایل {toPersianDigit(phoneNumber)} ارسال شد.
                </p>
                <button onClick={onBack} className="text-xs text-primary-900">
                    ویرایش شماره موبایل
                </button>
            </div>

            <div className="w-full max-w-[376px] mx-auto">
                <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    inputType="number"
                    shouldAutoFocus={true}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={`${kalamehNumFont.variable} !bg-transparent !font-number ${error ? "border-error" : "border-slate-200 focus:border-primary-900"} border !w-full !h-14 !text-slate-900 outline-0 border rounded-xl text-xl text-center text-slate-800`}
                    containerStyle="w-full flex flex-row-reverse items-center justify-center gap-2"
                />
                {
                    error && 
                    <span className="text-xs text-error mr-1 font-medium block mt-2">
                        {error}
                    </span>
                }
            </div>

            <div className="mt-12 flex flex-col items-center gap-3">
                {
                    time > 0 ?
                    <div className="w-full flex justify-center text-xs text-primary-900">
                        {toPersianDigit(time)} ثانیه تا ارسال مجدد کد یکبار مصرف
                    </div>
                    :
                    <div className="w-full flex justify-center">
                        <button onClick={onResendOtp} className="text-xs text-primary-900">
                            ارسال مجدد کد یکبار مصرف
                        </button>
                    </div>
                }
                {
                    !isLoading ?
                    <button onClick={onSubmit} type="submit" className="w-full gap-4 max-w-[200px] btn btn--primary">
                        <span className="">
                            تایید و بررسی
                        </span>
                        <span className="pt-1 border-r pr-4 border-slate-50/30">
                            <ArrowRightIcon className={'w-5 h-5 rotate-180'}/>
                        </span>
                    </button>
                    :
                    <div className="btn btn--primary max-w-[200px] w-full hover:!outline-none">
                        <Loading />
                    </div>
                }
            </div>
        </div>
    </FormTemplate>
    )
}