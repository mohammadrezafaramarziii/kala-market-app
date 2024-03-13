import RadioInput from "@/common/RadioInput";
import TextField from "@/common/TextField";
import DatePicker from "react-multi-date-picker";
import Select from 'react-select';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import Loading from "@/common/loading/Loading";
import "@/styles/react-select.css";


export default function CouponFieldsForm({ formik, products, isLoading, submitButtonText, selectedsProduct }) {

    return (
        <div>

            {/* fields */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-xs text-secondary-500 mb-2 mr-1 inline-block">
                        کد تخفیف
                    </label>
                    <TextField
                        name={"code"}
                        value={formik.values.code}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.code && formik.touched.code && formik.errors.code}
                    />
                </div>

                <div>
                    <label className="text-xs text-secondary-500 mb-2 mr-1 inline-block">
                        ظرفیت
                    </label>
                    <TextField
                        name={"usageLimit"}
                        value={formik.values.usageLimit}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.usageLimit && formik.touched.usageLimit && formik.errors.usageLimit}
                    />
                </div>

                <div>
                    <label className="text-xs text-secondary-500 mb-2 mr-1 inline-block">
                        مقدار تخفیف
                    </label>
                    <TextField
                        name={"amount"}
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.amount && formik.touched.amount && formik.errors.amount}
                    />
                </div>

                <div>
                    <label className="text-xs text-secondary-500 mb-2 mr-1 inline-block">
                        نوع کد تخفیف
                    </label>
                    <div className="textField__input flex items-center gap-4">
                        <RadioInput
                            onClick={() => formik.setFieldValue("type", "percent")}
                            checked={formik.values.type === "percent"}
                            label={'درصد'}
                            className={'!border-none'}
                        />
                        <RadioInput
                            onClick={() => formik.setFieldValue("type", "fixedProduct")}
                            checked={formik.values.type === "fixedProduct"}
                            label={'قیمت'}
                            className={'!border-none'}
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className={`text-xs text-secondary-500 mb-2 mr-1 inline-block`}>
                        تاریخ انقضا
                    </label>

                    <DatePicker
                        onChange={(date) => formik.setFieldValue("expireDate", date)}
                        value={formik.values.expireDate}
                        name="expireDate"
                        format="YYYY/MM/DD"
                        calendar={persian}
                        locale={persian_fa}
                        inputClass={`textField__input !text-base !text-right ${formik.errors.expireDate && formik.touched.expireDate && "!border-error"}`}
                    />
                    {
                        formik.errors.expireDate && formik.touched.expireDate &&
                        <span className="text-xs text-error mr-1 mt-2 inline-block font-medium">
                            {formik.errors.expireDate}
                        </span>
                    }
                </div>

                <div className="flex flex-col">
                    <label className={`text-xs text-secondary-500 mb-2 mr-1 inline-block`}>
                        محصولات شامل تخفیف
                    </label>
                    <div className={`textField__input !px-0 ${formik.errors.productIds && formik.touched.productIds ? "border-error" : "border-slate-200"}`}>
                        <Select
                            instanceId={'products'}
                            isMulti
                            onChange={(e) => formik.setFieldValue("productIds", e)}
                            options={products}
                            getOptionLabel={(options) => options.title}
                            getOptionValue={(options) => options._id}
                            defaultValue={selectedsProduct}
                            placeholder="انتخاب محصولات"
                        />
                    </div>
                    {
                        formik.errors.productIds && formik.touched.productIds &&
                        <span className="text-xs text-error mr-1 mt-2 inline-block font-medium">
                            {formik.errors.productIds}
                        </span>
                    }
                </div>
            </div>

            

            <div className="pt-4 mt-6 border-t border-slate-100">
                {
                    isLoading ?
                        <div className="btn btn--primary hover:!bg-primary-900 !max-w-[170px] !w-full">
                            <Loading />
                        </div>
                        :
                        <button type="submit" onClick={formik.handleSubmit} className="btn btn--primary !max-w-[170px] !w-full">
                            {submitButtonText}
                        </button>
                }
            </div>
        </div>
    )
}