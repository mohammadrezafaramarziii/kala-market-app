"use client"
import { useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({queryKey:["get-user"]});

  return (
    <main className="p-6 text-2xl font-semibold">

    </main>
  );
}
