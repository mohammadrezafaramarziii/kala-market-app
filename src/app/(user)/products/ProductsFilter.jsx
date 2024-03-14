"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import CheckBox from "@/common/CheckBox"
import { useState } from "react";
import { CategoryIcon, CloseIcon, SortBottomIcon } from "@/common/Icons";
import Modal from "@/components/Modal";
import AccordionCustome from "@/common/Accordion";
import Link from "next/link";


export default function ProductsFilter({ categories }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("category")?.split(",") || []
  );

  const createQueryString = useCallback((name, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    return params.toString()
  },
    [searchParams]
  )

  const categoryHandler = (value) => {

    if (selectedCategories.includes(value)) {
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
      {/* in desktop */}
      <div className="hidden w-full mb5 lg:flex flex-col overflow-hidden">
        <div className="w-full p-4 text-secondary-800 font-bold">
          دسته بندی
        </div>

        <div className="flex flex-col max-h-[180px] overflow-y-auto px-6">
          {categories.map((category) => {
            return (
              <CheckBox
                key={category._id}
                label={category.title}
                englishLabel={category.englishTitle}
                onClick={() => categoryHandler(category.englishTitle)}
                checked={selectedCategories.includes(category.englishTitle)}
              />
            )
          })}
        </div>
      </div>

      {/* in mobile */}
      <div className="lg:hidden">
        <button
          onClick={() => setShowCategoryModal(true)}
          className="py-1 px-3 text-xs text-secondary-700 flex items-center gap-1 border rounded-full"
        >
          <CategoryIcon className={'w-4 h-4'} />
          <span>
            دسته بندی
          </span>
        </button>

        <Modal
          title={'دسته بندی ها'}
          show={showCategoryModal}
          onClose={() => setShowCategoryModal(false)}
          modalName={'product-category-modal'}
        >
          <div>
            <ul className="flex flex-col gap-5">
              {categories.map((category) => {
                return (
                  <CheckBox
                    key={category._id}
                    label={category.title}
                    onClick={() => categoryHandler(category.englishTitle)}
                    checked={selectedCategories.includes(category.englishTitle)}
                  />
                )
              })}
            </ul>
          </div>
        </Modal>
      </div>
    </>
  )
}
