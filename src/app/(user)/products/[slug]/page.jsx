import { getProductBySlug, getProducts } from "@/services/productService";
import Image from "next/image";
import { LikeIcon, StarIcon, CategoryIcon, ArrowRightIcon, HeartIcon, CartIcon, DownIcon, ShareIcon, HashtagIcon } from "@/common/Icons";
import { toPersianDigit } from "@/utils/toPersianDigit";
import { numberWithCommas } from "@/utils/numberWithCommas";
import Link from "next/link";
import { CartLink } from "./CartLink";
import { AddToCart } from "./AddToCart";

export const dynamic = "force-static";
export const dynamicParams = false;

export default async function ProductDetailsPage({params}){
    const { slug } = params;
    const { product } = await getProductBySlug(slug);

    return(
        <div className="pb-[128px]">

            {/* ***** top bar ***** */}
            <div className="w-full lg:hidden z-50 shadow flex items-center justify-between sticky top-0 right-0 bg-white p-5">
                <div className="flex items-center gap-2">
                    <Link href={'/products'} className="btn">
                        <ArrowRightIcon className="w-6 h-6 text-secondary-900"/>
                    </Link>
                    <div>
                        <Image
                            src="/images/logo-lg.svg"
                            alt=""
                            width={1000}
                            height={1000}
                            className="w-[100px]"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3 text-secondary-700">
                    <CartLink />
                    <button className="btn">
                        <HeartIcon className='w-6 h-6'/>
                    </button>
                    <button className="btn">
                        <ShareIcon className={'w-6 h-6'}/>
                    </button>
                </div>
            </div>


            {/* ***** address bar ***** */}
            <div className="px-5 lg:px-10 pt-5">
                <ul className="lg:border-b lg:pb-5 flex items-center gap-2 text-xs text-secondary-700">
                    <li>
                        صفحه اصلی
                    </li>
                    <DownIcon className={'w-4 h-4 rotate-90'}/>
                    <li>
                        محصولات
                    </li>
                    <DownIcon className={'w-4 h-4 rotate-90'}/>
                    <li>
                        {product.category.title}
                    </li>
                    <DownIcon className={'w-4 h-4 rotate-90'}/>
                    <li>
                        {product.brand}
                    </li>
                </ul>
            </div>


            {/* ***** product ***** */}
            <div className="p-5 lg:px-10 lg:grid grid-cols-12 items-start gap-6">
                
                {/* ** image product ** */}
                <div className="w-full lg:col-span-4 flex items-center justify-center aspect-1 bg-white rounded-3xl">
                    <Image
                        src="/images/logo-sm.svg"
                        alt=""
                        width={1000}
                        height={1000}
                        className="w-[50px] opacity-10"
                    />
                </div>

                {/* ** details product ** */}
                <div className="mt-4 lg:col-span-4">

                    {/* brand */}
                    <span className="text-xs lg:text-sm text-primary-500">
                        {product.brand}
                    </span>

                    {/* title */}
                    <h1 className="text-secondary-900 text-xl lg:text-2xl font-semibold leading-[28px]">
                        {product.title}
                    </h1>

                    {/* rating */}
                    <div className="flex items-center gap-2 mt-3">
                        <StarIcon className={'w-4 lg:w-5 h-4 lg:h-5 text-warning'}/>
                        <span className="text-xs lg:text-sm text-secondary-500">
                            {toPersianDigit(`${product.rating} (امتیاز این محصول)`)}
                        </span>
                    </div>

                    {/* likes */}
                    <div className="flex items-center gap-2 mt-2">
                        <LikeIcon className={'w-4 lg:w-5 h-4 lg:h-5 text-success'}/>
                        <span className="text-xs lg:text-sm text-secondary-500">
                            {toPersianDigit(`${product.likes.length} نفر از خریداران، این محصول را پیشنهاد کردند`)}
                        </span>
                    </div>

                    {/* categoris */}
                    <div className="flex items-center gap-2 mt-2">
                        <CategoryIcon className={'w-4 lg:w-5 h-4 lg:h-5 text-primary-900'}/>
                        <span className="text-xs lg:text-sm text-secondary-500">
                            دسته بندی : {product.category.title}
                        </span>
                    </div>

                    {/* hashtags */}
                    <div className="flex gap-2 mt-2">
                        <HashtagIcon className={'w-4 lg:w-5 h-4 lg:h-5 text-secondary-900'}/>
                        <div className="flex items-center flex-wrap gap-3">
                            {product.tags.map((tag, index)=>{
                                return(
                                    <div key={index} className="text-xs text-secondary-500">
                                        #{tag}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* description */}
                    <div className="mt-8">
                        <div className="text-secondary-900 font-medium"> 
                            توضیحات:
                        </div>
                        <p className="text-sm leading-[24px] text-secondary-700 mt-1">
                            {product.description}
                        </p>
                    </div>
                </div>

                {/* ** add to cart and price ** */}
                <div className="hidden lg:flex lg:col-span-4 flex-col gap-4">
                    <div className="p-6 flex flex-col gap-4 bg-white rounded-3xl">

                        {/* garanty */}
                        <div className="flex items-center gap-3">
                            <div className="font-bold text-sm text-secondary-800">
                                گارانتی:
                            </div>
                            <div className="w-full text-center text-secondary-800 px-2 py-2 rounded-full text-xs bg-primary-100/50">
                                سلامت فیزیکی 18 ماهه محصول  
                            </div>
                        </div>

                        {/* count product */}
                        {
                            Number(product.countInStock) < 5 && Number(product.countInStock) !== 0 &&
                            <div className="text-xs text-error">
                                {toPersianDigit(`تنها ${product.countInStock} عدد در انبار باقی مانده`)}
                            </div>
                        }

                        {/* add to cart button and price and discount */}
                        <div className="w-full flex flex-col-reverse gap-3">
                            <AddToCart product={product}/>

                            <div className="flex flex-col">
                                {
                                    !!product.discount &&
                                    <div className="flex flex-row-reverse items-center justify-between gap-2">
                                        <div className="text-xs line-through text-secondary-400">
                                            {toPersianDigit(numberWithCommas(product.price))}
                                        </div>                            <div className="py-[2px] px-2 bg-error text-white text-xs font-medium flex items-center justify-center rounded-xl">
                                            {toPersianDigit(`${product.discount}٪`)}
                                        </div>
                                    </div>
                                }
                                <div className="justify-end text-primary-900 text-xl flex items-center gap-1 font-semibold">
                                    {toPersianDigit(numberWithCommas(product.offPrice))}
                                    <span className="text-[10px]">
                                        تومان
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 px-5">
                        <button className="btn text-secondary-800">
                            <ShareIcon className={'w-6 h-6'}/>
                        </button>
                        <button className="btn text-secondary-800">
                            <HeartIcon className={'w-6 h-6'}/>
                        </button>
                    </div>
                </div>
            </div>


            {/* ***** description ***** */}
            <div className="p-5 lg:p-10">
                <div className="w-full flex items-center gap-5 text-xs text-secondary-700 p-4 lg:text-sm rounded-xl bg-slate-200">
                    <button>
                        توضیحات
                    </button>
                    <button>
                        معرفی محصول
                    </button>
                </div>

                <div className="w-full flex flex-col gap-8 p-6 lg:p-8 bg-white rounded-2xl mt-3">

                    <div className="flex flex-col gap-4">
                        <h5 className="text-secondary-800 font-medium">
                            توضیحات
                        </h5>
                        <div className="text-sm text-secondary-500 leading-[28px]">
                            {product.description}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h5 className="text-secondary-800 font-medium">
                            معرفی محصول
                        </h5>
                        <div className="text-sm text-justify text-secondary-500 leading-[28px]">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                        </div>
                    </div>

                </div>
            </div>


            {/* ***** add to cart and price ***** */}
            <div className="w-full lg:hidden pt-5 rounded-t-2xl fixed z-50 bottom-0 right-0 p-5 bg-white flex flex-col gap-4 shadow-[0_-2px_3px_0_rgba(0,0,0,0.1)]">
                
                {/* ** count product ** */}
                {
                    Number(product.countInStock) < 5 && Number(product.countInStock) !== 0 &&
                    <div className="text-xs text-error">
                        {toPersianDigit(`تنها ${product.countInStock} عدد در انبار باقی مانده`)}
                    </div>
                }

                <div className="w-full grid grid-cols-2 items-center">
                    <AddToCart product={product}/>

                    <div className="flex flex-col items-end">
                        {
                            !!product.discount &&
                            <div className="flex items-center gap-2">
                                <div className="text-xs line-through text-secondary-400">
                                    {toPersianDigit(numberWithCommas(product.price))}
                                </div>                            <div className="py-[2px] px-2 bg-error text-white text-xs font-medium flex items-center justify-center rounded-xl">
                                    {toPersianDigit(`${product.discount}٪`)}
                                </div>
                            </div>
                        }
                        <div className="text-primary-900 text-xl flex items-center gap-1 font-semibold">
                            {toPersianDigit(numberWithCommas(product.offPrice))}
                            <span className="text-[10px]">
                                تومان
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export async function generateStaticParams(){
    const { products } = await getProducts();

    return products.map((product)=>{
        slug: product.slug
    })
}