import { EditIcon, EyeIcon, TrashIcon } from "@/common/Icons"
import { adminProductsTHeads } from "@/constants/tableHeads"
import { numberWithCommas } from "@/utils/numberWithCommas"
import { toPersianDigit } from "@/utils/toPersianDigit"
import Link from "next/link"
import { useState } from "react"
import DeleteProductModal from "./DeleteProductModal"

export default function ProductsTable({ products }) {
    const [deleteModal, setDeleteModal] = useState({ show: false, productId: null });

    return (
        <>
            <DeleteProductModal
                show={deleteModal.show}
                productId={deleteModal.productId}
                onClose={() => setDeleteModal({ show: false, productId: null })}
            />

            <div className="w-full overflow-x-auto">
                <table className="w-full">
                    <thead className="w-full h-12">
                        <tr>
                            {adminProductsTHeads.map((item) => {
                                return (
                                    <th key={item.id} className="table__th">
                                        {item.label}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product, index) => {
                            return (
                                <tr key={product._id} className="border-b border-b-slate-100">
                                    <th className="table__td pl-5">
                                        {toPersianDigit(index + 1)}
                                    </th>
                                    <th className="table__td pl-5">
                                        {toPersianDigit(product.title)}
                                    </th>
                                    <th className="table__td pl-5">
                                        {
                                            Number(product.countInStock) > 0 ?
                                                toPersianDigit(`${product.countInStock} عدد`)
                                                :
                                                <span className="!text-error">ناموجود</span>
                                        }
                                    </th>
                                    <th className="table__td pl-5">
                                        {toPersianDigit(product.category.title)}
                                    </th>
                                    <th className="table__td pl-5">
                                        <div className="flex items-center gap-1">
                                            {toPersianDigit(numberWithCommas(product.price))}
                                            <span className="text-[10px] !font-normal !text-secondary-500">
                                                تومان
                                            </span>
                                        </div>
                                    </th>
                                    <th className="table__td pl-5">
                                        <div className="flex items-center gap-1">
                                            {
                                                !!product.discount ?
                                                    <>
                                                        {toPersianDigit(numberWithCommas(product.offPrice))}
                                                        <span className="text-[10px] !font-normal !text-secondary-500">
                                                            تومان
                                                        </span>
                                                    </>
                                                    :
                                                    "---"
                                            }

                                        </div>
                                    </th>
                                    <th className="table__td pl-8">
                                        {
                                            !!product.discount ?
                                                toPersianDigit(`%${product.discount}`)
                                                :
                                                "---"
                                        }
                                    </th>
                                    <th className="table__td">
                                        <div className="flex items-center gap-4">
                                            <Link href={`/products/${product.slug}`}>
                                                <EyeIcon className={'w-5 h-5 text-yellow-500'} />
                                            </Link>
                                            <Link href={`/admin/products/edit/${product._id}`}>
                                                <EditIcon className={'w-5 h-5 text-primary-900'} />
                                            </Link>
                                            <button onClick={() => setDeleteModal({ show: true, productId: product._id })} href={`/admin/products/${product._id}`}>
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