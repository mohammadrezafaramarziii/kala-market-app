"use client"
import { AddCircleIcon } from "@/common/Icons";
import Loading from "@/common/loading/Loading";
import TitlebarAdmin from "@/components/adminComponent/TitlebarAdmin";
import { useGetCategories } from "@/hooks/useCategories";
import Link from "next/link";
import CategoriesTable from "./CategoriesTable";


export default function CategoriesPage() {
    const { data, isPending } = useGetCategories();
    const { categories } = data || {};

    if (isPending) {
        return (
            <div className="w-full h-full max-[1024px]:min-h-[calc(100vh-3rem)] flex items-center justify-center">
                <Loading />
            </div>
        )
    }

    return (
        <div>
            <TitlebarAdmin title={'دسته بندی ها'} />

            <div className="mt-8 mb-6 flex items-center justify-end">
                <Link href={'/admin/categories/add'} className="!w-auto !inline-flex btn gap-2 !text-sm !text-primary-900">
                    افزودن دسته بندی جدید
                    <AddCircleIcon className="w-5 h-5 !mt-1" />
                </Link>
            </div>

            <CategoriesTable categories={categories} />
        </div>
    )
}