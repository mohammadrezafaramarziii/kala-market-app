import { getPaymentById, getPayments } from "@/services/paymentService";
import { useQuery } from "@tanstack/react-query";

export const useGetPayments = () =>
  useQuery({
    queryKey: ["get-payments"],
    queryFn: getPayments,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetPaymentById = (id) =>
  useQuery({
    queryKey: ["get-payment-by-id"],
    queryFn: ()=>getPaymentById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

