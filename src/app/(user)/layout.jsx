import kalamehFont from "@/constants/localFonts";
import "../globals.css";
import Header from "../../components/header/Header";
import { Toaster } from "react-hot-toast";
import Provideres from "../Providers";
import BottomMenu from "@/components/header/BottomMenu";

export const metadata = {
  title: "کالا مارکت | فروشگاه اینترنتی",
  description: "فروشگاه اینترنتی کالا مارکت",
};

export default function RootLayout({children}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${kalamehFont.variable} font-sans`}>
        <Toaster />
        <Provideres>
          <Header />
          <BottomMenu />
          {children}
        </Provideres>
      </body>
    </html>
  );
}
