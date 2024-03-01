import { useQuery } from "@tanstack/react-query"; 
import { getAllUser, getUserProfile } from "@/services/authService";

export const useGetUser = () =>
  useQuery({ 
    queryKey: ["get-user"], 
    queryFn: getUserProfile ,
    retry: false,
    refetchOnWindowFocus: true
})

export const useGetAllUser = () =>
  useQuery({ 
    queryKey: ["get-all-user"], 
    queryFn: getAllUser ,
    retry: false,
    refetchOnWindowFocus: true
})