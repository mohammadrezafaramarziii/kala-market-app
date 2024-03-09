export default function Box({title, children}){
    return(
        <div>
            <div className="space-y-6">
                <div className="border-b border-slate-100">
                    <div className="inline-block relative">
                        <h4 className="inline-block text-secondary-800 font-semibold pb-4">
                            {title}
                        </h4>
                        <div className="absolute bottom-0 right-0 w-full h-1 bg-primary-900 rounded-t-full"></div>
                    </div>
                </div>

                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}