import Loading from "./Loading";

export default function LoadingFix() {
  return (
    <div className="w-full z-50 h-full flex items-center justify-center fixed top-0 right-0 bg-white">
        <Loading />
    </div>
  )
}
