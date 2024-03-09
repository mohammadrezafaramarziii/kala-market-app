"use client";
import { CloseIcon, SortBottomIcon, TickIcon } from "@/common/Icons";
import RadioInput from "@/common/RadioInput";
import Modal from "@/components/Modal";
import { toPersianDigit } from "@/utils/toPersianDigit";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import AccordionCustome from "@/common/Accordion";

const sortOptions = [
    {
      id: 1,
      value: "latest",
      label: "جدید ترین",
    },
    {
      id: 2,
      value: "earliest",
      label: "قدیمی ترین",
    },
    {
      id: 3,
      value: "popular",
      label: "محبوب ترین",
    },
];


export function ProductsSort(){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [sortActive, setSortActive] = useState(searchParams.get("sort") || "");
    const [showModalSort, setShowModalSort] = useState(false);
  
    const createQueryString = useCallback((name, value)=>{
        const params = new URLSearchParams(searchParams);
        params.set(name, value);
        return params.toString()
        }, 
        [searchParams]
      )
    
    const sortHandler = (value) =>{
        setSortActive(value);
        router.push(`${pathname}?${createQueryString("sort", value)}`);
    }
    

    return(
        <>
        <div className="hidden w-full mb5 lg:flex flex-col overflow-hidden">
            <div className="w-full p-4 text-secondary-800 font-bold">
                مرتب سازی
            </div>

            <div className="flex flex-col max-h-[350px] overflow-y-auto px-6">
                {sortOptions.map((sortItem)=>{
                    return(
                        <RadioInput
                            key={sortItem.id}
                            onClick={()=>sortHandler(sortItem.value)}
                            checked={sortActive===sortItem.value}
                            label={sortItem.label}
                        />
                    )
                })}
            </div>
        </div>

        <div className="lg:hidden">
            <button 
                onClick={()=>setShowModalSort(true)}
                className="py-1 px-3 text-xs text-secondary-700 flex items-center gap-1 border rounded-full"
            >
                <SortBottomIcon className={'w-4 h-4'}/>
                <span>
                    {
                        sortActive ? 
                        sortOptions.map((sort)=>{
                            if(sortActive === sort.value) return sort.label
                        })
                        :
                        "مرتب سازی"
                    }
                </span>
            </button>

            <Modal
                title={'مرتب سازی بر اساس'}
                show={showModalSort}
                onClose={()=>setShowModalSort(false)}
                modalName={'product-sort-modal'}
            >
                <div className="flex flex-col gap-4">
                    {sortOptions.map((sortItem)=>{
                        return(
                            <RadioInput
                                key={sortItem.id}
                                onClick={()=>{
                                    sortHandler(sortItem.value);
                                    setShowModalSort(false)
                                }}
                                checked={sortActive===sortItem.value}
                                label={sortItem.label}
                            />
                        )
                    })}
                </div>
            </Modal>
        </div>
        </>
    )
}