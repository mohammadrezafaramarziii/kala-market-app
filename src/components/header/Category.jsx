"use client"
import { useGetUser } from "@/hooks/useAuth";
import { useGetCategories } from "@/hooks/useCategories";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Category() {
    const { data, isPending } = useGetUser();
    const { user } = data || {};
    const { data: categoriesData, isPending: isGetCategories } = useGetCategories();
    const { categories } = categoriesData || [];
    const navbarCategoryRef = useRef();

    const [screenSize, setScreenSize] = useState();
    const pathName = usePathname();

    useEffect(() => {
        const category = navbarCategoryRef.current;
        let lastScrollTop = 0;

        window.addEventListener("scroll", () => {
            var { scrollY } = window;

            if (scrollY > lastScrollTop) {
                category?.classList.remove("top-[104px]");
                category?.classList.add("top-0");
            } else if (scrollY < lastScrollTop) {
                category?.classList.remove("top-0");
                category?.classList.add("top-[104px]");
            }

            lastScrollTop = scrollY <= 0 ? 0 : scrollY;
        })

        
        const resizeHandler = () => {
            setScreenSize(window.innerWidth);
        }

        if (!screenSize) resizeHandler();
        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener("resize", resizeHandler);
        }
    })

    if (pathName === "/auth" || pathName === "/complete-profile") return null
    if (pathName.startsWith("/products") && pathName !== "/products" && screenSize <= 1024) return null


    return (
        <div ref={navbarCategoryRef} className="duration-200 ease-out shadow-[0px_30px_16px_-30px_rgba(0,0,0,0.1)] bg-white sticky top-[104px] right-0 pt-6 hidden lg:block pb-6 px-6 lg:px-8 z-50">
            <ul className="flex items-center gap-6 xl:max-w-6xl mx-auto px-6">
                <li className="text-xs text-secondary-400 hover:text-primary-900 duration-200">
                    <Link href={`/products`}>
                        همه محصولات
                    </Link>
                </li>
                {
                    !isGetCategories && categories.map((item, index) => {
                        return (
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