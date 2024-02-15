import { getProducts } from "@/services/productService"
import CategorySidebar from "./CategorySidebar";
import queryString from "query-string";
import ProductCard from "@/components/ProductCard";
import ProductCardMobile from "@/components/ProductCardMobile";
import { DownIcon } from "@/common/Icons";
import { toPersianDigit } from "@/utils/toPersianDigit";

export const dynamic = "force-dynamic"; // force-dynamic or lazy (lazy is default)

export default async function ProductsPage({searchParams}){
    const { products } = await getProducts(queryString.stringify(searchParams));
    
    return(
        <div className="w-full pb-[128px]">
            

            <div className="w-full h-[300px] p-6">
                <div>
                    <h1 className="text-xl font-bold text-secondary-900">
                        همه محصولات
                    </h1>
                </div>
            </div>


            <div className="w-full bg-white relative">
                <div className="p-4 border-b lg:hidden">
                    <ul className="flex items-center gap-2 text-xs text-secondary-700">
                        <li>
                            صفحه اصلی
                        </li>
                        <DownIcon className={'w-4 h-4 rotate-90'}/>
                        <li>
                            محصولات
                        </li>
                    </ul>
                </div>

                <div className="w-full flex flex-col lg:flex-row lg:items-start">
                    <div className="w-full lg:w-[300px] lg:min-w-[270px] flex items-center gap-2 p-4 border-b lg:border-none sticky top-[72px] lg:top-[calc(112px+32px)] bg-white z-50">
                        <CategorySidebar />
                    </div>

                    <div className="w-full">
                        {/* in mobile */}
                        <div className="w-full flex md:hidden flex-col gap-4 px-4 mt-4">
                            {products.map((product)=>{
                                return(
                                    <ProductCardMobile
                                        key={product._id}
                                        title={product.description}
                                        price={product.price}
                                        offPrice={product.offPrice}
                                        discount={product.discount}
                                        href={`/products/${product.slug}`}
                                        brand={product.brand}
                                        countInStock={product.countInStock}
                                    />
                                )
                            })}
                        </div>
                        

                        {/* in desktop */}
                        <div className="hidden lg:block px-6">
                            <div className="py-6 border-b flex items-center justify-between">
                                <ul className="flex items-center gap-2 text-xs text-secondary-700">
                                    <li>
                                        صفحه اصلی
                                    </li>
                                    <DownIcon className={'w-4 h-4 rotate-90'}/>
                                    <li>
                                        محصولات
                                    </li>
                                </ul>
                                <div className="text-sm text-secondary-500">
                                    {toPersianDigit(`${products.length} کالا`)}
                                </div>
                            </div>
                        </div>
                        <div className="w-full hidden md:grid grid-cols-3 xl:grid-cols-4 gap-5 p-6">   
                            {products.map((product)=>{
                                return(
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

