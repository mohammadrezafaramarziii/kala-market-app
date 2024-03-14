import NotFoundComponent from "@/common/notFoundComponent/NotFoundComponent"

export default function NotFoundCatchAll() {
  return <NotFoundComponent />
}

export async function generateMetadata() {
  return {
    title: "صفحه مورد نظر یافت نشد!",
    description: "صفحه مورد نظر یافت نشد"
  }
}
