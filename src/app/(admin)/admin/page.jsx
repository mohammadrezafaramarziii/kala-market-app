"use client"
import { BoxIcon, UsersIcon } from '@/common/Icons'
import Loading from '@/common/loading/Loading'
import TitlebarAdmin from '@/components/adminComponent/TitlebarAdmin'
import Box from '@/components/profileComponent/Box'
import { useGetAllUser } from '@/hooks/useAuth'
import { useGetProducts } from '@/hooks/useProducts'
import { numberWithCommas } from '@/utils/numberWithCommas'
import { toPersianDate } from '@/utils/toPersianDate'
import { toPersianDigit } from '@/utils/toPersianDigit'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function AdminPage() {
  const { data, isPending } = useGetAllUser();
  const [countSoldProducts, setCountSoldProducts] = useState(0);
  const { data: productsData, isPending: isGetProducts } = useGetProducts();
  const { products } = productsData || [];
  const sortProducts = !isGetProducts &&
    products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6);

  useEffect(() => {
    if (!isPending) {
      let solds = 0;
      data.users.forEach((productUser) => {
        solds += productUser.Products.length;
      })
      setCountSoldProducts(solds);
    }
  }, [data, isPending])

  if (isPending || isGetProducts) {
    return (
      <div className="w-full h-full max-[1024px]:min-h-[calc(100vh-3rem)] flex items-center justify-center">
        <Loading />
      </div>
    )
  }

  return (
    <div>
      <TitlebarAdmin title="داشبورد ادمین" />

      {/* welcome message */}
      <div className="py-4 lg:py-6 sm:flex items-center justify-between">
        <h2 className="text-lg lg:text-2xl text-secondary-800 font-bold">
          به پنل ادمین خوش آمدید
        </h2>
        <span className="text-sm text-secondary-400">
          امروز {toPersianDate(new Date())}
        </span>
      </div>


      {/* states */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="w-full bg-slate-50 rounded-lg p-6 flex items-center justify-between text-xs text-secondary-500">
          <div className="flex items-center gap-2">
            <UsersIcon className="w-6 h-6 text-secondary-800" />
            <span className="font-medium">
              تعداد کاربران
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-xl  md:text-2xl text-secondary-800 font-semibold">
              {toPersianDigit(data.users.length || 0)}
            </span>
            <span>
              کاربر
            </span>
          </div>
        </div>
        <div className="w-full bg-slate-50 rounded-lg p-6 flex items-center justify-between text-xs text-secondary-500">
          <div className="flex items-center gap-2">
            <BoxIcon className="w-6 h-6 text-primary-900" />
            <span className="font-medium">
              محصولات فروخته شده
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xl  md:text-2xl text-secondary-800 font-semibold">
              {toPersianDigit(countSoldProducts)}
            </span>
            <span>
              محصول
            </span>
          </div>
        </div>
        <div className="w-full bg-slate-50 rounded-lg p-6 flex items-center justify-between text-xs text-secondary-500">
          <div className="flex items-center gap-2">
            <BoxIcon className="w-6 h-6 text-warning" />
            <span className="font-medium">
              کل محصولات
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xl  md:text-2xl text-secondary-800 font-semibold">
              {toPersianDigit(productsData.products.length || 0)}
            </span>
            <span>
              محصول
            </span>
          </div>
        </div>
      </div>


      <div className="mt-8">
        <Box title={'محصولات جدید'}>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {!isGetProducts && sortProducts.map((product) => {
              return (
                <div key={product._id} className="w-full flex flex-col gap-3 md:flex-row lg:justify-between lg:items-center p-4 border border-slate-100 rounded-lg">
                  <div className="flex-1 flex items-center gap-3">
                    <div>
                      <div className={`w-[50px] h-[50px] md:w-[80px] md:h-[80px] rounded-lg ${!product.imageLink && "bg-slate-100"}`}>
                          {
                              product.imageLink &&
                              <Image
                                  src={`/images/${product.imageLink}`}
                                  alt={product.title}
                                  width={1000}
                                  height={1000}
                                  priority
                                  className="w-full h-full mix-blend-multiply"
                              />
                          }
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 md:gap-2">
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="text-sm font-semibold text-secondary-800">
                          {product.title}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-secondary-500">
                        {product.brand}
                        <div className="w-1 h-1 rounded-full bg-secondary-300"></div>
                        گارانتی یکساله کالا مارکت
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
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

                      <span className="max-w-[22px] mb-4 -rotate-90 inline-block text-xs text-secondary-400 -ml3">
                        تومــــان
                      </span>

                      {
                        !!product.discount &&
                        <div className="-rotate-90 py-[2px] px-2 bg-error text-white text-xs font-medium flex items-center justify-center rounded-xl rounded-bl">
                          {toPersianDigit(`%${product.discount}`)}
                        </div>
                      }
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Box>
      </div>
    </div>
  )
}
