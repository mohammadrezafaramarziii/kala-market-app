import { getProducts } from "@/services/productService"
import CategorySidebar from "./CategorySidebar";
import queryString from "query-string";
import ProductCard from "@/components/ProductCard";
import { DownIcon } from "@/common/Icons";
import { toPersianDigit } from "@/utils/toPersianDigit";
import { cookies } from "next/headers";
import { toStringCookies } from "@/utils/toStringCookies";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic"; // force-dynamic or lazy (lazy is default)

export default async function ProductsPage({searchParams}){
    const cookieStore = cookies();
    const strCookies = toStringCookies(cookieStore);
    const { products } = await getProducts(
        queryString.stringify(searchParams),
        strCookies
    );
    
    return(
        <div className="w-full">
            

            <div className="w-full px-3 pb-3 pt-6 lg:p-6">
                <div className="w-full mb-6">
                    <h1 className="text-xl lg:text-2xl font-bold text-secondary-900">
                        همه محصولات
                    </h1>
                </div>
                <div className="w-full h-[270px] lg:h-[320px]">
                    <Image
                        src={'/images/products-baner.png'}
                        alt=""
                        width={1366}
                        height={248}
                        className="w-full h-full object-cover obect-right rounded-xl md:rounded-2xl"
                    />
                </div>
            </div>


            <div className="w-full relative lg:grid lg:grid-cols-12 items-start">


                <div className="border-y lg:border-none p-4 mt-5 sticky top-20 lg:top-[115px] z-50 bg-slate-50 lg:col-span-3">
                    <CategorySidebar />
                </div>


                <div className="sm:p-6 lg:col-span-9">
                    <div className="mb-4 flex items-center justify-between px-4 pt-4 sm:p-0">
                        <ul className="flex items-center gap-2 text-xs lg:text-sm text-secondary-400">
                            <li className="flex items-center gap-2">
                                <Link href={'/'}>
                                    خانه
                                </Link>
                                <DownIcon className={'rotate-90 w-4 h-4 mt-1'}/>
                            </li>
                            <li>
                                <Link href={'/products'}>
                                    محصولات
                                </Link>
                            </li>
                        </ul>

                        <div className="text-xs lg:text-sm text-secondary-500 font-medium">
                            { products && toPersianDigit(products.length)} محصول
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 sm:border-t sm:border-r">   
                        {products.map((product)=>{
                            return(
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    isLoading={false}
                                    className={'!border-l !border-b !bg-transparent hover:!bg-white hover:!shadow-lg !shadow-none !rounded-none'}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function generateMetadata() {  
    return {
      title: "محصولات",
      description: "صفحه تمامی محصولات"
    }
}
