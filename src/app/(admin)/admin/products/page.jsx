"use client"
import { AddCircleIcon } from "@/common/Icons";
import Loading from "@/common/loading/Loading";
import TitlebarAdmin from "@/components/adminComponent/TitlebarAdmin";
import { useGetProducts } from "@/hooks/useProducts";
import Link from "next/link";
import ProductsTable from "./ProductsTable";

export default function ProductsPage() {
    const { data, isPending } = useGetProducts();
    const { products } = data || [];


    if (isPending) {
        return (
            <div className="w-full h-full max-[1024px]:min-h-[calc(100vh-3rem)] flex items-center justify-center">
                <Loading />
            </div>
        )
    }

    return (
        <div>
            <TitlebarAdmin title={'محصولات'} />

            <div className="mt-8 mb-6 flex items-center justify-end">
                <Link href={'/admin/products/add'} className="!w-auto !inline-flex btn gap-2 !text-sm !text-primary-900">
                    افزودن محصول جدید
                    <AddCircleIcon className="w-5 h-5 !mt-1" />
                </Link>
            </div>

            <ProductsTable products={products} />
        </div>
    )
}