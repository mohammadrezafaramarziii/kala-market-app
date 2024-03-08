"use client"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Topbar() {

  const menuItems = ["قوانین","حریم خصوصی","عودت کالا","شیوه پرداخت","سوالات متداول"];
  const [screenSize, setScreenSize] = useState();
  const pathName = usePathname();

  useEffect(()=>{
      const resizeHandler = () =>{
        setScreenSize(window.innerWidth);
      }
  
      if(!screenSize) resizeHandler();
      window.addEventListener("resize", resizeHandler);
  
      return()=>{
        window.removeEventListener("resize", resizeHandler);
      }
  })
  
  if(pathName === "/auth" || pathName === "/complete-profile") return null
  if(pathName.startsWith("/products") && pathName !== "/products" && screenSize <= 1024) return null
  
  return (
    <div className="hidden lg:block py-4 bg-white">
        <div className="xl:max-w-6xl mx-auto lg:flex items-center justify-between px-6">
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
    </div>
  )
}
