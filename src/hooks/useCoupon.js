import { getCouponById, getCoupons } from "@/services/couponService";
import { useQuery } from "@tanstack/react-query";

export const useGetCoupons = () =>
  useQuery({
    queryKey: ["get-coupons"],
    queryFn: getCoupons,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetCouponById = (id) =>
  useQuery({
    queryKey: ["get-coupon-by-id", id],
    queryFn: ()=> getCouponById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

