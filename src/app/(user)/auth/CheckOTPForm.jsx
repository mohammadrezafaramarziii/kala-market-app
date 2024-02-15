import OTPInput from "react-otp-input";
import FormTemplate from "./FormTemplate";
import Loading from "@/common/loading/Loading";
import { kalamehNumFont } from "@/constants/localFonts";
import { toPersianDigit } from "@/utils/toPersianDigit";

export default function CheckOTPForm({isLoading, phoneNumber, error, otp, setOtp, onSubmit, onBack, time, onResendOtp}){
    return(
    <FormTemplate 
        title={'اعتبارسنجی'} 
        desc={`رمز یکبار مصرف به شماره موبایل ${toPersianDigit(phoneNumber)} ارسال شد.`}
        titleChild={
            <div className="w-full flex justify-center mt-2">
                <button onClick={onBack} className="text-xs text-primary-900">ویرایش شماره موبایل</button>
            </div>
        }
    >
        <div className="mt-10">
            
            <div className="w-full flex flex-col gap-2">
                <label className="text-sm mr-1 text-slate-500">
                    کد یکبار مصرف
                </label>
                <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    inputType="number"
                    shouldAutoFocus={true}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={`${kalamehNumFont.variable} !font-number ${error ? "border-error" : "border-slate-200 focus:border-primary-900"} border !w-full !min-w-[47px] !h-[47px] !text-slate-900 outline-0 border rounded-lg text-xl text-center text-slate-800`}
                    containerStyle="w-full flex flex-row-reverse items-center gap-2"
                />
                {
                    error && 
                    <span className="text-xs text-error mr-1 font-medium">
                        {error}
                    </span>
                }
            </div>

            <div className="mt-8 flex flex-col gap-4">
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
                    <button onClick={onSubmit} type="submit" className="btn btn--primary">
                        تایید
                    </button>
                    :
                    <div className="btn btn--primary hover:!outline-none">
                        <Loading />
                    </div>
                }
            </div>
        </div>
    </FormTemplate>
    )
}