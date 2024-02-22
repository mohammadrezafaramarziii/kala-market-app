"use client"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Topbar() {

  const menuItems = ["قوانین","حریم خصوصی","عودت کالا","شیوه پرداخت","سوالات متداول"];
  const [screenSize, setScreenSize] = useState(typeof window !== "undefined" && window.innerWidth);
  const pathName = usePathname();

  useEffect(()=>{
      const resizeHandler = () =>{
        setScreenSize(window.innerWidth);
      }
  
      window.addEventListener("resize", resizeHandler);
  
      return()=>{
        window.removeEventListener("resize", resizeHandler);
      }
  })
  
  if(pathName === "/auth" || pathName === "/complete-profile") return null
  if(pathName.startsWith("/products") && pathName !== "/products" && screenSize <= 1024) return null
  
  return (
    <div className="hidden lg:flex items-center justify-between py-4 px-6 lg:px-8 bg-white">
        {/* ** menu ** */}
        <div>
            <ul className="flex items-center gap-4">
                {menuItems.map((item, index)=>(
                    <li key={index} className="text-xs text-secondary-400">
                        {item}
                    </li>
                ))}
            </ul>
        </div>

        {/* support call */}
        <div className="flex items-center gap-3">
            <p className="text-xs text-secondary-400">همین الان با مشاور های پشتیبان ما تماس بگیرید</p>
            <div className="text-sm text-primary-900 font-medium">
                تماس با پشتیبان
            </div>
        </div>
    </div>
  )
}
