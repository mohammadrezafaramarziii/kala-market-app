"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import CheckBox from "@/common/CheckBox"
import { useState } from "react";
import { CategoryIcon, SortBottomIcon } from "@/common/Icons";
import Modal from "@/components/profileComponent/Modal";
import AccordionCustome from "@/common/Accordion";


export default function ProductsFilter({categories}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("category")?.split(",")  || []
  );

  const createQueryString = useCallback((name, value)=>{
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    return params.toString()
    }, 
    [searchParams]
  )
  
  const categoryHandler = (value) => {
    
    if(selectedCategories.includes(value)) {
        const categories = selectedCategories.filter(c => c !== value);
        setSelectedCategories(categories);

        router.push(`${pathname}?${createQueryString("category", categories)}`)
    } else {
        setSelectedCategories([...selectedCategories, value]);

        router.push(`${pathname}?${createQueryString("category", [...selectedCategories, value])}`)
    }
  }


  return (
    <>
      {/* <div className="hidden">
          <h3 className="font-medium mb-5">
          دسته بندی
          </h3>
          <ul className="flex flex-col gap-3">
              {
                  categories.map((category)=>{
                      return(
                          <CheckBox
                              key={category._id} 
                              id={category._id}
                              value={category.englishTitle}
                              name={'product-type'}
                              label={category.title}
                              onChange={categoryHandler}
                              checked={selectedCategories.includes(category.englishTitle)}
                          />
                      )
                  })
              }
          </ul>
      </div> */}
      <div className="hidden w-full mb5 lg:flex">
            <AccordionCustome 
                title={'دسته بندی'}
            >
                <div className="flex flex-col gap-2">
                    {categories.map((category)=>{
                        return(
                          <CheckBox
                            key={category._id} 
                            label={category.title}
                            onClick={()=>categoryHandler(category.englishTitle)}
                            checked={selectedCategories.includes(category.englishTitle)}
                          />
                        )
                    })}
                </div>
            </AccordionCustome>
        </div>

      <div className="lg:hidden">
        <button 
            onClick={()=>setShowCategoryModal(true)}
            className="py-1 px-3 text-xs text-secondary-700 flex items-center gap-1 border rounded-full"
        >
            <CategoryIcon className={'w-4 h-4'}/>
            <span>
                دسته بندی
            </span>
        </button>

        <Modal
            title={'دسته بندی ها'}
            show={showCategoryModal}
            onClose={()=>setShowCategoryModal(false)}
            modalName={'product-category-modal'}
        >
            <div>
              <ul className="flex flex-col gap-3">
                {categories.map((category)=>{
                  return(
                      <CheckBox
                          key={category._id} 
                          label={category.title}
                          onClick={()=>categoryHandler(category.englishTitle)}
                          checked={selectedCategories.includes(category.englishTitle)}
                      />
                  )})}
              </ul>
            </div>
        </Modal>
      </div>
    </>
  )
}
