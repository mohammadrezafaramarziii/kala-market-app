import { getProductById, getProducts } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () =>
  useQuery({
    queryKey: ["get-products"],
    queryFn: getProducts,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetProductById = (id) =>
  useQuery({
    queryKey: ["get-product-by-id", id],
    queryFn: () => getProductById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetLatestProducts = () =>
  useQuery({
    queryKey: ["get-latest-products"],
    queryFn: (filter) => getProducts("sort=latest"),
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetLatestMobiles = () =>
  useQuery({
    queryKey: ["get-latest-mobiles-products"],
    queryFn: (filter) => getProducts("sort=latest&category=mobile"),
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetLatestLaptop = () =>
  useQuery({
    queryKey: ["get-latest-laptop-products"],
    queryFn: (filter) => getProducts("sort=latest&category=laptop"),
    retry: false,
    refetchOnWindowFocus: true,
  });
