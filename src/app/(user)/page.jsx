"use client"
import { useQueryClient } from "@tanstack/react-query";
import BanerSlider from "@/components/homePage/BanerSlider";

export default function Home() {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({queryKey:["get-user"]});

  return (
    <main className="py-6 lg:py-8">
      
      <div className="px-6 lg:px-10 xl:max-w-6xl mx-auto">
        <BanerSlider />
      </div>
    </main>
  );
}
