import { CategoryIcon, UserIcon } from "@/common/Icons";
import { toPersianDigit } from "@/utils/toPersianDigit";
import Image from "next/image";

export default function WeblogCard({ weblog }){
    return(
        <div className="w-full flex flex-col">
            <div className="w-full aspect-w-13 aspect-h-9 mb-6">
                <Image
                    src={weblog.pic}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-full h-full object-fill object-center  rounded-xl"
                />
            </div>

            <div className="border-b border-slate-200 pb-4 mb-4">
                <h3 className="text-sm font-semibold text-secondary-900 mb-4 truncate">
                    {weblog.title}
                </h3>
                <div className="w-full gap-1 flex items-center">
                    <p className="wauto inline text-xs text-secondary-500 leading-[22px]">
                        {weblog.description}
                    </p>
                    <div className="flex-1">
                        <div className="w-12 h-12 inline-flex flex-col items-center justify-center rounded-full bg-gradient-to-b from-slate-200 to-transparent">
                            <span className="text-xl font-medium text-secondary-600">{toPersianDigit(weblog.readTime)}</span>
                            <span className="text-[10px] text-secondary-600">دقیقه</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-secondary-500">
                    <CategoryIcon className={'w-4 h-4'}/>
                    <span>{weblog.category}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-secondary-500">
                    <UserIcon className={'w-4 h-4'}/>
                    <span>{weblog.auther}</span>
                </div>
            </div>
        </div>
    )
}