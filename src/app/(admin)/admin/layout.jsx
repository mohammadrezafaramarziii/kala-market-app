import Providers from "@/app/Providers"
import kalamehFont from "@/constants/localFonts"
import { Toaster } from "react-hot-toast"
import "../../globals.css"
import Sidebar from "@/components/adminComponent/Siderbar"
import Titlebar from "@/components/adminComponent/Titlebar"

export const metadata = {
  title: 'پنل ادمین',
  description: 'پنل ادمین',
}

export default function RootLayout({children}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${kalamehFont.variable} font-sans`}>
        <Toaster />
        <Providers>
          <main className="w-full mx-auto lg:h-screen lg:grid grid-cols-12">

            <div className="hidden lg:block col-span-3">
              <Sidebar />
            </div>

            <div className="col-span-9 lg:overflow-y-auto">
              <Titlebar />
              {children}
            </div>

          </main>
        </Providers>
      </body>
    </html>
  )
}
