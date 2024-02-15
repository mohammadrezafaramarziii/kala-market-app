import FormTemplate from "./FormTemplate";
import TextField from "@/common/TextField";
import Loading from "@/common/loading/Loading";

export default function SendOTPForm({isLoading, formik}) {
  return (
    <FormTemplate title={'سلام خوش آمدید'} desc={'برای ورود یا ثبت نام شماره موبایل خود را وارد کنید.'}>
        <div className="mt-10">
            <TextField 
                label={'شماره موبایل'}
                name={'phoneNumber'}
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={formik.errors.phoneNumber}
            />

            <div className="mt-8 flex flex-col gap-3">
                <p className="text-xs text-slate-500">ثبت نام و ورود شما به معنای پذیر قوانین کالا مارکت است.</p>

                {
                    !isLoading ?
                    <button onClick={formik.handleSubmit} type="submit" className="btn btn--primary">
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
