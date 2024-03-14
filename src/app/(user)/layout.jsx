import kalamehFont from "@/constants/localFonts";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import Provideres from "../Providers";
import BottomMenu from "@/components/header/BottomMenu";
import Topbar from "@/components/header/Topbar";
import Navbar from "@/components/header/Navbar";
import Category from "@/components/header/Category";
import Footer from "@/components/footer/Footer";

export const metadata = {
  title: "کالا مارکت | فروشگاه اینترنتی",
  description: "فروشگاه اینترنتی کالا مارکت",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${kalamehFont.variable} relative font-sans max-w-[1440px] mx-auto pb-[80px] lg:pb-0`}>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <Provideres>
          <Topbar />
          <Navbar />
          <Category />
          <BottomMenu />
          {children}
          <Footer />
        </Provideres>
      </body>
    </html>
  );
}
