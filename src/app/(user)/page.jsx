"use client"
import BanerSlider from "@/components/homePage/BanerSlider";
import ProductsSlider from "@/components/homePage/ProductsSlider";
import { useGetLatestLaptop, useGetLatestMobiles, useGetLatestProducts, useGetProducts } from "@/hooks/useProducts";
import Image from "next/image";
import BrandSlider from "@/components/homePage/BrandSlider";
import WeblogsBox from "@/components/homePage/WeblogsBox";

export default function Home() {

  const { data: latestMobileProductsData, isPending: isGettingLatestMobile } = useGetLatestMobiles();
  const { products: latestMobileProducts } = latestMobileProductsData || {};

  const { data: latestLaptopProductsData, isPending: isGettingLatestLaptop } = useGetLatestLaptop();
  const { products: latestLaptopProducts } = latestLaptopProductsData || {};

  const { data: latestProductsData, isPending: isGettingLatest } = useGetLatestProducts();
  const { products: latestProducts } = latestProductsData || {};

  const { data: discountersProductsData, isPending: isGettingDiscounters } = useGetProducts();
  const { products: discountersProducts } = discountersProductsData || {};
  const filteredDiscountersProducts = discountersProducts?.filter((p) => p.discount !== 0) || {};

  return (
    <main className="py-6 lg:py-8">

      <div className="space-y-8 lg:space-y-12 xl:max-w-6xl mx-auto">

        <BanerSlider />


        <ProductsSlider
          title={'تخفیف دار ها'}
          etitle={'discounters'}
          href={'/products'}
          products={filteredDiscountersProducts}
          isLoading={isGettingDiscounters}
          name="discounters-products-slider"
        />


        <div className="w-full grid grid-cols-1 gap-5 px-6 md:grid-cols-2">
          <div className="w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={'/images/two-baner-1.jpg'}
              alt="two-baner-1"
              width={1630}
              height={600}
              priority
              className="w-full"
            />
          </div>
          <div className="w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={'/images/two-baner-2.jpg'}
              alt="two-baner-2"
              width={1630}
              height={600}
              priority
              className="w-full"
            />
          </div>
        </div>


        <ProductsSlider
          title={'جدیدترین محصولات'}
          etitle={'discounters'}
          href={'/products?sort=latest'}
          products={latestProducts}
          isLoading={isGettingLatest}
          name="latest-products-slider"
        />


        <div className="w-full pt-8 grid grid-cols-1 gap-5 px-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={'/images/three-baner-1.jpg'}
              alt="three-baner-1"
              width={1630}
              height={600}
              priority
              className="w-full"
            />
          </div>
          <div className="w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={'/images/three-baner-2.jpg'}
              alt="three-baner-2"
              width={1630}
              height={600}
              priority
              className="w-full"
            />
          </div>
          <div className="w-full rounded-2xl overflow-hidden shadow-2xl md:col-span-2 lg:col-auto">
            <Image
              src={'/images/three-baner-3.jpg'}
              alt="three-baner-3"
              width={1630}
              height={600}
              priority
              className="w-full"
            />
          </div>
        </div>


        <ProductsSlider
          title={'جدیدترین موبایل ها'}
          etitle={'latest mobiles'}
          href={'/products?sort=latest&category=mobile'}
          products={latestMobileProducts}
          isLoading={isGettingLatestMobile}
          name="cate-mobile-slider"
        />


        <BrandSlider />


        <ProductsSlider
          title={'جدیدترین لپ تاپ ها'}
          etitle={'latest laptop'}
          href={'/products?sort=latest&category=laptop'}
          products={latestLaptopProducts}
          isLoading={isGettingLatestLaptop}
          name="latest-laptop-products-slider"
        />


        <WeblogsBox title={'جدیدترین مطالب'} etitle={'latest weblogs'} />

      </div>

    </main>
  );
}
