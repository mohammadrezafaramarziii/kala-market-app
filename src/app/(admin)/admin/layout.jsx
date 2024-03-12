import Providers from "@/app/Providers"
import kalamehFont from "@/constants/localFonts"
import { Toaster } from "react-hot-toast"
import "../../globals.css"
import SidebarAdmin from "@/components/adminComponent/SidebarAdmin"

export const metadata = {
  title: 'پنل ادمین',
  description: 'پنل ادمین',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${kalamehFont.variable} font-sans bg-slate-100`}>
        <Toaster />
        <Providers>
          <main className="w-full h-screen lg:grid grid-cols-10 xl:grid-cols-9 gap-6 lg:p-6 xl:max-w-[1440px] mx-auto">
            <section className="hidden shadow-custome lg:block w-full h-full col-span-3 xl:col-span-2">
              <SidebarAdmin />
            </section>

            <section className="w-full max-[1024px]:min-h-screen shadow-custome lg:h-full lg:relative lg:overflow-y-auto lg:overflow-x-hidden pb-6 bg-white rounded-lg lg:col-span-7 xl:col-span-7 px-6">
              {children}
            </section>
          </main>
        </Providers>
      </body>
    </html>
  )
}
