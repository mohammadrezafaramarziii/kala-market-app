import Image from "next/image";
import Link from "next/link";

export default function FormTemplate({title, desc, children, titleChild}) {
  return (
    <div className="w-full max-w-[420px] max-h-[380px] px-6 pt-8 bg-secondary-100/40 rounded-3xl">
        <div className="w-full flex justify-center mb-6">
            <Link href={'/'}>
                <Image 
                    src={'/images/logo-lg.svg'}
                    alt=""
                    width={1000}
                    height={1000}
                    priority
                    className="w-[150px]"
                />
            </Link>
        </div>

        <div className="w-full bg-white rounded-3xl px-6 pb-6 pt-8 shadow-input-focus">
            <div className="mb-10">
                <h1 className="text-xl text-slate-800 font-bold text-center mb-2">
                    {title}
                </h1>
                <p className="text-xs text-slate-700 text-center">
                    {desc}
                </p>
                {titleChild}
            </div>

            {children}
        </div>
    </div>
  )
}
