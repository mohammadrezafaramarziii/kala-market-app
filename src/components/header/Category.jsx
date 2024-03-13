"use client"
import { useGetUser } from "@/hooks/useAuth";
import { useGetCategories } from "@/hooks/useCategories";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Category(){
    const { data, isPending } = useGetUser();
    const { user } = data || {};
    const { data:categoriesData, isPending:isGetCategories } = useGetCategories();
    const { categories } = categoriesData || [];

    const [screenSize, setScreenSize] = useState();
    const pathName = usePathname();

    useEffect(()=>{
        const resizeHandler = () =>{
          setScreenSize(window.innerWidth);
        }
        
        if(!screenSize) resizeHandler();
        window.addEventListener("resize", resizeHandler);
    
        return()=>{
          window.removeEventListener("resize", resizeHandler);
        }
    })
    
    if(pathName === "/auth" || pathName === "/complete-profile") return null
    if(pathName.startsWith("/products") && pathName !== "/products" && screenSize <= 1024) return null
    

    return(
        <div className="shadow-[0px_30px_16px_-30px_rgba(0,0,0,0.1)] bg-white sticy top-0 right-0 pt-6 hidden lg:block pb-6 px-6 lg:px-8">
            <ul className="flex items-center gap-6 xl:max-w-6xl mx-auto px-6">
                <li className="text-xs text-secondary-400 hover:text-primary-900 duration-200">
                    <Link href={`/products`}>
                       همه محصولات
                    </Link>
                </li>
                {
                    !isGetCategories && categories.map((item, index)=>{
                        return(
                            <li key={index} className="text-xs text-secondary-400 hover:text-primary-900 duration-200">
                                <Link href={`/products?category=${item.englishTitle}`}>
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })
                }
                {
                    !isPending && user && user.role === "ADMIN" &&
                    <li className="text-xs text-secondary-400 hover:text-primary-900 duration-200">
                        <Link href={'/admin'}>
                            پنل ادمین
                        </Link>
                    </li>
                }
            </ul>
        </div>
    )
}