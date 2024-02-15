import Providers from "@/app/Providers"
import BottomMenu from "@/components/header/BottomMenu"
import kalamehFont from "@/constants/localFonts"
import { Toaster } from "react-hot-toast"
import "../../globals.css"
import Sidebar from "@/components/profileComponent/Siderbar";

export const metadata = {
  title: 'پروفایل',
  description: 'پروفایل کاربر',
}

export default function RootLayout({children}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${kalamehFont.variable} font-sans`}>
        <Toaster />
        <Providers>
          <BottomMenu />
          <main className="w-full max-w-[1280px] mx-auto lg:h-screen grid grid-cols-12 lg:grid-cols-7 p-6 lg:py-8 lg:px-10 gap-4">
            <section className="hidden lg:block w-full col-span-2 lg:h-full lg:overflow-y-auto">
              <Sidebar />
            </section>
            <section className="w-full lg:h-full lg:overflow-y-auto col-span-12 lg:col-span-5">
              {children}
            </section>
          </main>
        </Providers>
      </body>
    </html>
  )
}
