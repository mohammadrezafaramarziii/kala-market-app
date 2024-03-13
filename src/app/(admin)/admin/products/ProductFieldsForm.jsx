import { ImageIcon } from "@/common/Icons";
import TextField from "@/common/TextField";
import Loading from "@/common/loading/Loading";
import { numberWithCommas } from "@/utils/numberWithCommas";
import { toPersianDigit } from "@/utils/toPersianDigit";
import Image from "next/image";
import Select from 'react-select';
import { TagsInput } from "react-tag-input-component";
import "@/styles/react-select.css";

export default function ProductFieldsForm({ formType, formik, isLoading, submitButtonText, categories, selectedCategory = "" }) {
    const textFieldObj = [
        { label: "عنوان محصول", title: "title" },
        { label: "اسلاگ", title: "slug" },
        { label: "برند", title: "brand" },
        { label: "موجودی در انبار", title: "countInStock" },
        { label: "قیمت پایه", title: "price" },
        { label: "میزان تخفیف", title: "discount" },
    ]

    return (
        <div className="mt-8 space-y-6">

            {/* select image product */}
            <div className="inline-flex flex-col gap-3">
                <div className={`w-[180px] h-[180px] flex items-center justify-center rounded-xl border border-slate-100 bg-slate-100 overflow-hidden ${formik.touched.imageLink && formik.errors.imageLink && "!border-error"}`}>
                    {
                        formik.values.imageLink ?
                            <Image
                                src={formType === "edit" && typeof formik.values.imageLink === "string" ? `/images/${formik.values.imageLink}` : URL.createObjectURL(formik.values.imageLink)}
                                alt=""
                                width={1000}
                                height={1000}
                                className="w-[80%] h-[80%] mix-blend-multiply"
                                priority
                            />
                            :
                            <ImageIcon className="w-8 h-8 text-secondary-100" />
                    }
                </div>
                <input
                    type="file"
                    id="imageLink"
                    hidden
                    name="imageLink"
                    onChange={(e) => formik.setFieldValue("imageLink", e.target.files[0])}
                />
                <label htmlFor="imageLink" className="btn btn--light !text-xs !w-full">
                    انتخاب تصویر
                </label>
            </div>


            {/* data product */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                {textFieldObj.map((field, index) => {
                    return (
                        <div key={index}>
                            <label className="text-xs text-secondary-500 mb-2 mr-1 inline-block">
                                {field.label}
                            </label>
                            <TextField
                                name={field.title}
                                value={formik.values[field.title]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors[field.title] && formik.touched[field.title] && formik.errors[field.title]}
                            />
                        </div>
                    )
                })}

                <div>
                    <label className={`text-xs text-secondary-500 mb-2 mr-1 inline-block`}>
                        دسته بندی
                    </label>
                    <div className={`textField__input !px-0 ${formik.errors.category && formik.touched.category ? "border-error" : "border-slate-200"}`}>
                        <Select
                            instanceId={'category'}
                            onChange={(e) => formik.setFieldValue("category", e._id)}
                            options={categories}
                            getOptionLabel={(options) => options.title}
                            getOptionValue={(options) => options._id}
                            defaultValue={selectedCategory}
                            placeholder="دسته بندی"
                        />
                    </div>
                    {
                        formik.errors.category && formik.touched.category &&
                        <span className="text-xs text-error mr-1 font-medium">
                            {formik.errors.category}
                        </span>
                    }
                </div>

                <div>
                    <label className="text-xs text-secondary-500 mb-2 mr-1 inline-block">
                        تگ ها
                    </label>
                    <div className={`textField__input !h-auto !min-h-14 !p-4 ${formik.errors.tags && formik.touched.tags ? "border-error" : "border-slate-200"}`}>
                        <TagsInput
                            value={formik.values.tags}
                            onChange={(e) => formik.setFieldValue("tags", e)}
                            name="tags"
                        />
                    </div>
                    {
                        formik.errors.tags && formik.touched.tags &&
                        <span className="text-xs text-error mr-1 font-medium">
                            {formik.errors.tags}
                        </span>
                    }
                </div>

                <div className="md:col-span-2">
                    <label className="text-xs text-secondary-500 mb-2 mr-1 inline-block">
                        توضیحات
                    </label>
                    <textarea
                        className={`textField__input !h-auto !p-4 ${formik.errors.description && formik.touched.description ? "border-error" : "border-slate-200"}`}
                        rows={6}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        name="description"
                    />
                    {
                        formik.errors.description && formik.touched.description &&
                        <span className="text-xs text-error mr-1 font-medium">
                            {formik.errors.description}
                        </span>
                    }
                </div>
            </div>


            {/* result price */}
            <div>
                <label className={`text-green-500 font-semibold mb-2 mr-1 inline-block`}>
                    قیمت نهایی کالا
                </label>
                <div className="textField__input !flex items-center !bg-slate-100 gap-1">
                    {toPersianDigit(numberWithCommas(formik.values.offPrice))}
                    <span className="text-xs text-secondary-400">
                        تومان
                    </span>
                </div>
            </div>


            {/* submit button */}
            <div className="pt-4 border-t border-slate-100">
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