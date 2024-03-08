import { getProductBySlug, getProducts } from "@/services/productService";
import Image from "next/image";
import { LikeIcon, StarIcon, DownIcon, HashtagIcon, CommentIcon, SecureIcon, SupportIcon, PayInHomeIcon, ReturnTen, MedalIcon, PlayIcon, DislikeIcon } from "@/common/Icons";
import { toPersianDigit } from "@/utils/toPersianDigit";
import { numberWithCommas } from "@/utils/numberWithCommas";
import { CartLink } from "./CartLink";
import { AddToCart } from "./AddToCart";
import { LikeProduct } from "./LikeProduct";
import ShareLink from "./ShareLink";
import BackLink from "./BackLink";

export const dynamic = "force-static";
export const dynamicParams = false;

export default async function ProductDetailsPage({params}){
    const { slug } = params;
    const { product } = await getProductBySlug(slug);
   
    return(
        <div className="w-full xl:max-w-6xl mx-auto">
            
            {/* ***** top bar ***** */}
            <div className="w-full lg:hidden sticky flex items-center z-50 justify-between top-0 right-0 bg-white/70 backdrop-blur-md p-6 shadow-md">
                <div className="flex items-center gap-3">
                    <BackLink />
                    <div>
                        <Image 
                            src={'/images/logo-lg.svg'}
                            alt=""
                            width={120}
                            height={30}
                            className="w-[120px]"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <ShareLink />
                    <CartLink />
                    <LikeProduct product={product}/>
                </div>
            </div>



            {/* ***** address and options ***** */}
            <div className="w-full p-6">
                <div className="w-full flex items-center justify-between border-b border-slate-200 pb-4">
                    <div className="flex items-center gap-10">
                        <ul className="flex items-center gap-1 text-xs text-secondary-400 flex-wrap">
                            <li className="whitespace-nowrap">صفحه اصلی</li>
                            <DownIcon className={'w-3 h-3 rotate-90'}/>
                            <li className="whitespace-nowrap">محصولات</li>
                            <DownIcon className={'w-3 h-3 rotate-90'}/>
                            <li className="whitespace-nowrap">{product.category.title}</li>
                            <DownIcon className={'w-3 h-3 rotate-90'}/>
                            <li className="!text-secondary-800 font-medium ">{product.title}</li>
                        </ul>

                        <div className="hidden lg:flex items-center gap-6">
                            <ShareLink />
                            <LikeProduct product={product}/>
                        </div>
                    </div>
                    <div className={`hidden lg:block text-xs ${Number(product.countInStock) <= 5  ? "text-error" : "text-secondary-400"}`}>
                        <span>
                            {
                                Number(product.countInStock) !== 0 ?
                                toPersianDigit(`تنها تعداد ${product.countInStock} عدد از این کالا در انبار باقی مانده`)
                                :
                                "ناموجود"
                            }
                        </span>
                    </div>
                </div>
            </div>



            {/* ***** details product ***** */}
            <div className="w-full px-6 lg:flex flex-row-reverse gap-8">

                {/* image */}
                <div className="w-full">
                    <div className="aspect-w-10 aspect-h-10 bg-slate-200 rounded-lg">
                        <Image
                            src={'/images/logo-sm.svg'}
                            alt=""
                            width={1000}
                            height={1000}
                            className="opacity-20 !w-[50px] object-center objectcover mx-auto"
                            priority
                        />
                    </div>
                </div>

                {/* data */}
                <div className="w-full mt-4 lg:mt-0 lg:flex flex-col justify-between">
                    <div className="w-full border-b border-slate-200 pb-4 xl:flex justify-between items-center">
                        <div className="pb-3 xl:pb-0 xl:flex-1">
                            <h1 className="text-secondary-900 font-bold mb-1 lg:text-xl">
                                {product.title}
                            </h1>
                        </div>
                        <div className="w-full xl:w-auto flex items-center justify-between xl:justify-start text-primary-900 xl:border-r xl:border-slate-300 xl:pr-4 xl:mr-4">
                            <div className="text-xs text-secondary-400 xl:hidden">
                                نام برند
                            </div>
                            <div className="xl:w-full xl:!font-semibold">
                                {product.brand}
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex gap-2 mt-4 mb-6">
                        <ul className="text-xs text-secondary-500 flex items-center gap-3 flex-wrap">
                            {product.tags.map((tag, index)=>{
                                return(
                                    <li key={index} className="flex items-center gap-1">
                                        <HashtagIcon className={'w-3 h-3'}/>
                                        {tag}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    
                    <div className="flex-1 space-y-8 lg:space-y-6 lg:flex flex-col justify-between">
                        <div>
                            <h4 className="text-sm lg:text-base text-secondary-700 font-semibold mb-4">
                                جزئیات برای خرید
                            </h4>
                            <div className="space-y-4">
                                <div className="w-full flex items-center gap-2">
                                    <LikeIcon className={'w-5 h-5 text-primary-900'}/>
                                    <div className="text-sm text-secondary-500">
                                        {toPersianDigit(`${product.likes.length} نفر این محصول رو لایک کردن`)}
                                    </div>
                                </div>
                                <div className="w-full flex items-center gap-2">
                                    <StarIcon className={'w-5 h-5 text-yellow-500'}/>
                                    <div className="text-sm text-secondary-500">
                                        {toPersianDigit(`${product.rating} امتیاز این محصول`)}
                                    </div>
                                </div>
                                <div className="w-full flex items-center gap-2">
                                    <CommentIcon className={'w-5 h-5 text-green-700'}/>
                                    <div className="text-sm text-secondary-500">
                                        {toPersianDigit(`${product.numReviews} نظر درباره این محصول`)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm lg:text-base text-secondary-700 font-semibold mb-2">
                                توضیحات کامل
                            </h4>
                            <p className="text-xs text-secondary-500 leading-[20px]">
                                {product.description}
                            </p>
                        </div>

                        <div className="hidden w-full lg:flex flex-row-reverse justify-between items-center">
                            <div className="w-full flex items-center">
                                <div className="w-full flex flex-col items-end">
                                    {
                                        !!product.discount &&
                                        <div className="pl-10 text-secondary-200 line-through">
                                            {toPersianDigit(numberWithCommas(product.price))}
                                        </div>
                                    }
                                    <div className="text-secondary-900 text-2xl flex items-center gap-1 !font-bold">
                                        {toPersianDigit(numberWithCommas(product.offPrice))}
                                        <span className="inline-block text-xs text-secondary-400 !font-normal">
                                            تومــــان   
                                        </span>
                                    </div>
                                </div>


                                {
                                    !!product.discount &&
                                    <span className="-rotate-90 inline-block text-sm font-medium px-3 py-[2px] text-white bg-red-600 rounded-full !rounded-bl-xl">
                                        {toPersianDigit(`٪${product.discount}`)}   
                                    </span>
                                }
                            </div>
                            <div className="w-full">
                                <AddToCart product={product}/>
                            </div>
                        </div>

                        <div className="w-full flex items-center justify-between text-xs gap-5 p-5 bg-slate-200 rounded-lg text-secondary-700 font-medium">
                            <p className="flex-1 leading-[18px]">
                                این محصول به دلیل کیفیت بالا دارای گارانتی یک ساله کالا مارکت می باشد
                            </p>
                            <SecureIcon className="w-6 h-6"/>
                        </div>

                    </div>
                </div>

                {/* add to cart in mobile */}
                <div className="w-full lg:hidden p-4 fixed bottom-0 right-0 z-50">
                    <div className="w-full py-4 pr-4 pl-2 rounded-xl bg-white/70 backdrop-blur-md shadow-[0_0px_15px_-3px_rgba(0,0,0,0.3)]">
                        <div className={` text-xs ${Number(product.countInStock) <= 5  ? "text-error" : "text-secondary-400"}`}>
                            <span>
                                {
                                    Number(product.countInStock) !== 0 ?
                                    toPersianDigit(`تنها تعداد ${product.countInStock} عدد از این کالا در انبار باقی مانده`)
                                    :
                                    "ناموجود"
                                }
                            </span>
                        </div>

                        <div className="w-full flex flex-col min-[430px]:flex-row-reverse items-center gap-4 mt-4">
                            <div className="w-full flex items-center justify-end">
                                <div className="w-full flex flex-col items-end font-semibold">
                                    <div className="text-secondary-900">
                                        {toPersianDigit(numberWithCommas(product.offPrice))}
                                    </div>
                                    {
                                        !!product.discount &&
                                        <div className="text-secondary-200 -mt-1 line-through">
                                            {toPersianDigit(numberWithCommas(product.price))}
                                        </div>
                                    }
                                </div>

                                <span className="max-w-[22px] mb-4 -rotate-90 inline-block text-xs text-secondary-400">
                                    تومــــان   
                                </span>

                                {
                                    !!product.discount &&
                                    <span className="-rotate-90 inline-block text-sm font-medium px-3 py-[2px] text-white bg-red-600 rounded-full !rounded-bl-xl">
                                        {toPersianDigit(`٪${product.discount}`)}   
                                    </span>
                                }
                            </div>
                            <div className="w-full">
                                <AddToCart product={product}/>
                            </div>
                        </div>
                        
                    </div>
                </div>

            </div>



            {/* ***** kala market features ***** */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-20 px-6">
                <div className="w-full flex flex-row-reverse items-center justify-between gap-4 bg-slate-100 px-5 py-6 rounded-xl">
                    <SupportIcon className="w-6 h-6 text-secondary-400"/>
                    <span className="text-xs text-secondary-700 font-semibold">
                        {toPersianDigit("پشتیبانی 24 ساعت، 7 روز هفته")} 
                    </span>
                </div>
                <div className="w-full flex flex-row-reverse items-center justify-between gap-4 bg-slate-100 px-5 py-6 rounded-xl">
                    <PayInHomeIcon className="w-6 h-6 text-secondary-400"/>
                    <span className="text-xs text-secondary-700 font-semibold">
                        {toPersianDigit("امکان پرداخت در محل")} 
                    </span>
                </div>
                <div className="w-full flex flex-row-reverse items-center justify-between gap-4 bg-slate-100 px-5 py-6 rounded-xl">
                    <ReturnTen className="w-6 h-6 text-secondary-400"/>
                    <span className="text-xs text-secondary-700 font-semibold">
                        {toPersianDigit("10 روز ضمانت بازگشت کالا")} 
                    </span>
                </div>
                <div className="w-full flex flex-row-reverse items-center justify-between gap-4 bg-slate-100 px-5 py-6 rounded-xl">
                    <MedalIcon className="w-6 h-6 text-secondary-400"/>
                    <span className="text-xs text-secondary-700 font-semibold">
                        {toPersianDigit("ضمانت اصل بودن کالا")} 
                    </span>
                </div>
            </div>



            {/* ***** description, comments, checking product ***** */}
            <div className="mt-8 space-y-16 px-6">

                <div>
                    <div className="w-full border-b border-slate-200 py-4 mb-6 right-0 top-[77.91px] lg:top-[104px] bg-slate-50">
                        <ul className="w-full flex items-center gap-4 sm:gap-8 text-[10px] min-[430px]:text-xs md:text-sm text-secondary-500">
                            <li className={`!text-primary-900 !font-medium before:h-1 relative before:absolute before:-bottom-4 before:right-0 before:w-full before:rounded-t-lg before:bg-primary-900`}>
                                نقد و بررسی کوتاه
                            </li>
                            <li className={`relative before:absolute before:-bottom-4 before:right-0 before:w-full before:rounded-t-lg before:bg-primary-900`}>
                                بررسی تخصصی
                            </li>
                            <li className={`relative before:absolute before:-bottom-4 before:right-0 before:w-full before:rounded-t-lg before:bg-primary-900`}>
                                دیدگاه کاربران
                            </li>
                        </ul>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-3 h-3 bg-primary-900 rounded-full"></div>
                            <h5 className="text-sm md:text-base font-semibold text-secondary-800">
                                نقد و بررسی {product.title}
                            </h5>
                        </div>
                        <p className="text-xs md:text-sm text-secondary-500 leading-[28px] md:leading-[32px]">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                        </p>
                    </div>
                </div>

                <div>
                    <div className="w-full border-b border-slate-200 py-4 mb-6 right-0 top-[77.91px] lg:top-[104px] bg-slate-50">
                        <ul className="w-full flex items-center gap-4 sm:gap-8 text-[10px] min-[430px]:text-xs md:text-sm text-secondary-500">
                            <li className={`relative before:absolute before:-bottom-4 before:right-0 before:w-full before:rounded-t-lg before:bg-primary-900`}>
                                نقد و بررسی کوتاه
                            </li>
                            <li className={`!text-primary-900 !font-medium before:h-1 relative before:absolute before:-bottom-4 before:right-0 before:w-full before:rounded-t-lg before:bg-primary-900`}>
                                بررسی تخصصی
                            </li>
                            <li className={` relative before:absolute before:-bottom-4 before:right-0 before:w-full before:rounded-t-lg before:bg-primary-900`}>
                                دیدگاه کاربران
                            </li>
                        </ul>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-3 h-3 bg-primary-900 rounded-full"></div>
                            <h5 className="text-sm md:text-base font-semibold text-secondary-800">
                                بررسی تخصصی {product.title}
                            </h5>
                        </div>
                        <p className="text-xs md:text-sm text-secondary-500 leading-[28px] md:leading-[32px]">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                        </p>
                        <div className="w-full aspect-video mt-4 relative  rounded-xl overflow-hidden">
                            <Image
                                src={'/images/baner1.jpg'}
                                alt=""
                                width={1000}
                                height={1000}
                                className="w-full h-full object-cover object-center blur-lg"
                                priority
                            />
                            <div className="w-full h-full flex items-center justify-center absolute top-0 right-0 bg-secondary-900/60">
                                <button className="btn text-white">
                                    <PlayIcon className="w-8 h-8 sm:w-14 sm:h-14"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="w-full border-b border-slate-200 py-4 mb-6 right-0 top-[77.91px] lg:top-[104px] bg-slate-50">
                        <ul className="w-full flex items-center gap-4 sm:gap-8 text-[10px] min-[430px]:text-xs md:text-sm text-secondary-500">
                            <li className={`relative before:absolute before:-bottom-4 before:right-0 before:w-full before:rounded-t-lg before:bg-primary-900`}>
                                نقد و بررسی کوتاه
                            </li>
                            <li className={`relative before:absolute before:-bottom-4 before:right-0 before:w-full before:rounded-t-lg before:bg-primary-900`}>
                                بررسی تخصصی
                            </li>
                            <li className={`!text-primary-900 !font-medium before:h-1 relative before:absolute before:-bottom-4 before:right-0 before:w-full before:rounded-t-lg before:bg-primary-900`}>
                                دیدگاه کاربران
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-3 h-3 bg-primary-900 rounded-full"></div>
                            <h5 className="text-sm md:text-base font-semibold text-secondary-800">
                                دیدگاه کاربران
                            </h5>
                        </div>
                        <div className="lg:grid lg:grid-cols-8 lg:gap-6 relative items-start">
                            <div className="mb-6 lg:col-span-2 lg:sticky top-[104px] right-0 pt-4">
                                <button className="!w-full btn btn--primary">
                                    دیدگاه خود را بنویسید
                                </button>
                            </div>
                            <div className="space-y-4 lg:col-span-6">
                                {Array(product.numReviews).fill({}).map((item,index)=>{
                                    return(
                                        <div key={index} className="w-full space-y-2 bg-white border border-slate-200 rounded-xl p-4">
                                            <div className="w-full flex flex-col min-[430px]:flex-row items-start gap-3 min-[430px]:items-center min-[430px]:justify-between">
                                            <div className="flex items-center gap-2">
                                                    <h6 className="text-sm text-secondary-800 font-semibold">
                                                        نام کاربر
                                                    </h6>
                                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                                                    <div className="text-xs text-secondary-600 font-semibold truncate">
                                                        {product.title}
                                                    </div>
                                            </div>
                                                <div className="text-xs text-error bg-slate-100 px-2 py-1 rounded-full">
                                                    خریدار
                                                </div>
                                            </div>
                                            <p className="text-xs text-secondary-500 leading-[26px]">
                                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                                            </p>
                                            <div className="w-full flex items-center gap-4 justify-end">
                                                <button className="btn text-secondary-500">
                                                    <LikeIcon className={'w-4 h-4'}/>
                                                </button>
                                                <button className="btn text-secondary-500">
                                                    <DislikeIcon className={'w-4 h-4'}/>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
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