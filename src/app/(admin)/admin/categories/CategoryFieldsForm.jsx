import TextField from "@/common/TextField"
import Loading from "@/common/loading/Loading"

export default function CategoryFieldForm({ formik, isLoading, submitButtonText }) {
    const textFieldObj = [
        { label: "عنوان دسته بندی", title: "title" },
        { label: "نام انگلیسی دسته بندی", title: "englishTitle" },
        { label: "توضیحات", title: "description" },
        { label: "نوع", title: "type" },
    ]

    return (
        <div className="space-y-6 w-full flex-1 flex flex-col justify-between">
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
            </div>

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