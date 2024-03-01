import Link from "next/link";
import { ArrowRightIcon } from "@/common/Icons";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";

export default function CategorySlider({ title, etitle, categories, isLoading }){
    return(
        <div className="px-6">

            <div className="w-full flex items-start gap-2 mb-6">
                <div className="w-1.5 h-[36px] sm:h-12 bg-primary-900 rounded-full"></div>
                <div className="flex flex-col border-r6 border-primary-900 pr3">
                    <div className="text-xs sm:text-sm text-secondary-300 font-semibold">
                        {etitle}
                    </div>
                    <div className="text-secondary-900 text-sm sm:text-lg font-semibold">
                        {title}
                    </div>
                </div>
            </div>
            
            <div className="w-full grid grid-cols-2 smgrid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {isLoading ? 

                [1,2,3,4,5,6,7,8,9,10].map((item, index)=>{
                    return(
                        <div key={index} className="react-loading-skeleton !w-full !h-auto !py-12 !flex !flex-col !items-center !justify-center !gap-6 !px-6 !rounded-xl">
                            <div className="w-full aspect-w-2 aspect-h-2">
                                <div className="w-full h-full"></div>
                            </div>
                            <div className="w-full h-6 text-secondary-800 font-semibold">
                                
                            </div>
                        </div>
                    )
                })
                :
                categories.map((category)=>{
                    return(
                        <Link 
                            key={category._id}
                            href={`/products?category=${category.englishTitle}`}
                            className="w-full relative h-auto py-12 hover:scale-105 duration-200 flex flex-col items-center justify-center gap-6 px-6 bg-slate-200 rounded-t-xl rounded-br-xl rounded-bl-2xl"
                        >
                            <div className="absolute bottom-0 left-0">
                                <button className="btn btn--primary !w-8 !h-8 rounded-full">
                                    <ArrowRightIcon className={'w-4 h-4 -rotate-[135deg]'}/>
                                </button>
                            </div>
                            <div className="w-full aspect-w-2 aspect-h-2">
                                <Image
                                    src={`/images/${category.icon.sm}`}
                                    alt={category.englishTitle}
                                    width={1000}
                                    height={1000}
                                    className="mix-blend-multiply w-full h-full object-center object-cover"
                                />
                            </div>
                            <div className="text-secondary-800 font-semibold">
                                {category.title}
                            </div>
                        </Link>
                    )
                })}
            </div>
            
        </div>
    )
}