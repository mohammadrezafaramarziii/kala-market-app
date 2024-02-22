export default function FormTemplate({title, desc, children, titleChild, icon}) {
  return (
    <div className="w-full">
        <div className="w-full md:bg-white md:rounded-xl p-4 md:p-10 md:shadow-2xl">
            <div className="mb-10 border-b md:border-slate-100 pb-6">
                <h1 className="w-full flex items-center gap-2 text-sm text-secondary-700 font-medium">
                    <span className="text-secondary-400"> 
                        {icon}
                    </span>
                    {title}
                </h1>
            </div>

            {children}
        </div>
    </div>
  )
}
