import { EditIcon, TrashIcon } from "@/common/Icons"
import { adminCategoriesTHeads } from "@/constants/tableHeads"
import { toPersianDigit } from "@/utils/toPersianDigit"
import Link from "next/link"
import DeleteCategoryModal from "./DeleteCategoryModal"
import { useState } from "react"

export default function CategoriesTable({ categories }) {
    const [deleteModal, setDeleteModal] = useState({show:false, categoryId:null});

    return (
        <>
        <DeleteCategoryModal
            show={deleteModal.show} 
            categoryId={deleteModal.categoryId}
            onClose={()=>setDeleteModal({show:false, categoryId:null})}
        />

        <div className="w-full overflow-x-auto">
            <table className="w-full">
                <thead className="w-full h-12">
                    <tr>
                        {adminCategoriesTHeads.map((item) => {
                            return (
                                <th key={item.id} className="table__th">
                                    {item.label}
                                </th>
                            )
                        })}
                    </tr>
                </thead>

                <tbody>
                    {categories.map((category, index) => {
                        return (
                            <tr key={category._id} className="border-b border-b-slate-100">
                                <th className="table__td pl-5">
                                    {toPersianDigit(index + 1)}
                                </th>
                                <th className="table__td pl-5">
                                    {toPersianDigit(category.title)}
                                </th>
                                <th className="table__td pl-5">
                                    {toPersianDigit(category.description)}
                                </th>
                                <th className="table__td pl-5">
                                    {toPersianDigit(category.englishTitle)}
                                </th>
                                <th className="table__td pl-5">
                                    <span className="badge__primary">
                                        {toPersianDigit(category.type)}
                                    </span>
                                </th>
                                <th className="table__td">
                                    <div className="flex items-center justify-end gap-4">
                                        <Link href={`/admin/categories/edit/${category._id}`}>
                                            <EditIcon className={'w-5 h-5 text-primary-900'} />
                                        </Link>
                                        <button onClick={()=>setDeleteModal({show:true, categoryId:category._id})}>
                                            <TrashIcon className={'w-5 h-5 text-red-600'} />
                                        </button>
                                    </div>
                                </th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        </>
    )
}