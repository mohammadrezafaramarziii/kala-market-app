export default function Sectionbox({ title, isAllBtn, children }){
    return(
        <div className="w-full flex flex-col gap-4 rounded-2xl bg-white p-6">
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <div className="text-lg lg:text-xl text-secondary-800 font-semibold">
                        {title}
                    </div>
                    <div className="h-1 w-3/4 bg-primary-900 rounded-full"></div>
                </div>
                {
                    isAllBtn &&
                    <button className="btn text-xs text-primary-900 whitespace-normal">
                        مشاهده همه
                    </button>
                }
            </div>

            <div>
                {children}
            </div>
        </div>
    )
}