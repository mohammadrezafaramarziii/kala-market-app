import kalamehFont from "@/constants/localFonts";
import "../globals.css";
import Header from "../../components/header/Header";
import { Toaster } from "react-hot-toast";
import Provideres from "../Providers";
import BottomMenu from "@/components/header/BottomMenu";
import Topbar from "@/components/header/Topbar";
import Navbar from "@/components/header/Navbar";
import Category from "@/components/header/Category";

export const metadata = {
  title: "کالا مارکت | فروشگاه اینترنتی",
  description: "فروشگاه اینترنتی کالا مارکت",
};

export default function RootLayout({children}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${kalamehFont.variable} relative font-sans max-w-[1440px] mx-auto`}>
        <Toaster />
        <Provideres>
          {/* <Header /> */}
          {/* <Navbar /> */}
          <Topbar />
          <Navbar />
          <Category />
          <BottomMenu />
          {children}
        </Provideres>
      </body>
    </html>
  );
}
