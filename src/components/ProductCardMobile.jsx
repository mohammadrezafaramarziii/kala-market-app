import { numberWithCommas } from "@/utils/numberWithCommas";
import { toPersianDigit } from "@/utils/toPersianDigit";
import Image from "next/image";
import Link from "next/link";

export default function ProductCardMobile({ title, discount, price, offPrice, href, brand, countInStock }){
    return(
        <div className="w-full flex border-b pb-4">
            <div className="w-full flex items-center gap-3">
                <div className="w-[118px] h-[118px] border rounded-3xl overflow-hidden flex items-center justify-center">
                    <Link href={href}>
                        <Image
                            src="/images/logo-sm.svg"
                            alt=""
                            width={1000}
                            height={1000}
                            className="w-[35px] opacity-10"
                        />
                    </Link>
                </div>

                <div className="flex-1 flex-grow h-full flex flex-col justify-between">
                    <div>
                        <span className="text-xs text-secondary-400">
                            {brand}
                        </span>
                        <h3 className="text-xs min-[430px]:text-sm text-secondary-800 mt-1">
                            <Link href={href} className="leading-[24px]">
                                {title}
                            </Link>
                        </h3>   
                    </div>
                    {
                        Number(countInStock) < 5 && Number(countInStock) !== 0 &&
                        <div className="text-[10px] min-[430px]:text-xs text-error mt-3 mb-2">
                            {toPersianDigit(`تنها ${countInStock} عدد در انبار باقی مانده`)}
                        </div>
                    }
                    <div className={`flex w-full items-center ${discount === 0 ? "justify-end" : "justify-between"}`}>
                        {
                            !!discount &&
                            <span className="py-[2px] px-2 bg-error text-white text-[10px] font-medium flex items-center justify-center rounded-xl">
                                {toPersianDigit(`${discount} %`)}
                            </span>
                        }
                        <div className="flex text-xs min-[430px]:text-base items-center justify-end gap-1 text-primary-900 font-semibold">
                            <span>
                                {toPersianDigit(numberWithCommas(offPrice))}
                            </span>
                            <span className="text-xs">
                                تومان
                            </span>
                        </div>
                    </div>
                    {
                        !!discount &&
                        <div className="pl-[34px] text-left text-[10px] min-[430px]:text-xs line-through text-secondary-400">
                            {toPersianDigit(numberWithCommas(price))}
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}