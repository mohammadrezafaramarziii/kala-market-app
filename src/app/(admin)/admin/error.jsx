'use client' // Error components must be Client Components

import { ResetIcon } from '@/common/Icons'
import Image from 'next/image'

export default function Error({ reset }) {

    return (
        <div className="w-full h-screen lg:h-full flex flex-col items-center justify-center">

            <div className="mb-2">
                <Image
                    src={'/images/error.png'}
                    alt="error"
                    width={100}
                    height={100}
                    priority
                />
            </div>

            <h2 className="text-xl text-error font-bold mb-3">در دریافت اطلاعات خطایی به وجود اومده</h2>

            <div className="mt-8">
                <button onClick={() => reset()} className="w-full gap-4 px-5 !text-xs btn btn--primary">
                    <span className="">
                        تلاش مجدد
                    </span>
                    <span className="pt-1 border-r pr-4 border-slate-50/30">
                        <ResetIcon className={'w-5 h-5'} />
                    </span>
                </button>
            </div>

        </div>
    )
}