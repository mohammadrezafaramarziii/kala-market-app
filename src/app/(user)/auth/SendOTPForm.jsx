import { ArrowRightIcon, UserOutlineIcon } from "@/common/Icons";
import FormTemplate from "./FormTemplate";
import TextField from "@/common/TextField";
import Loading from "@/common/loading/Loading";

export default function SendOTPForm({isLoading, formik}) {
  return (
    <FormTemplate 
        title={'ثبت نام یا ورود به حساب کاربری'} 
        icon={<UserOutlineIcon className={'w-5 h-5'}/>}
    >
        <div className="mt-10">
            <TextField 
                name={'phoneNumber'}
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={formik.errors.phoneNumber}
                placeholder={'شماره موبایل خود را وارد کنید'}
            />

            <div className="mt-12 flex justify-center gap-3">
                {
                    !isLoading ?
                    <button onClick={formik.handleSubmit} type="submit" className="w-full gap-4 max-w-[200px] btn btn--primary">
                        <span className="">
                            دریافت کد تایید
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

            <p className="text-xs text-slate-500 text-center mt-4">ثبت نام و ورود شما به معنای پذیر قوانین کالا مارکت است.</p>
        </div>
    </FormTemplate>
  )
}
