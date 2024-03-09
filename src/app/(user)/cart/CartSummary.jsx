import ToastError from "@/common/toasts/ToastError";
import ToastSuccess from "@/common/toasts/ToastSuccess";
import { createPayment } from "@/services/paymentService";
import { numberWithCommas } from "@/utils/numberWithCommas";
import { toPersianDigit } from "@/utils/toPersianDigit";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CartSummary({payDetail}) {
    const { totalGrossPrice, totalOffAmount, totalPrice } = payDetail;
    const { mutateAsync, isPending } = useMutation({mutationFn:createPayment});
    const queryClient = useQueryClient();

    const createPaymentHandler = async () => {
        try {
            const { message } = await mutateAsync();
            ToastSuccess(message);
            queryClient.invalidateQueries({queryKey:['get-user']});
        } catch (error) {
            ToastError(error?.response?.data?.message);
        }
    }

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-6 z-50"> 
            <div className="text-lg text-secondary-800 font-semibold border-b pb-4 mb-5">
                اطلاعات پرداخت
            </div>

            <div className="flex flex-col gap-4">
                <div className="w-full flex items-center justify-between text-xs lg:text-sm text-secondary-600">
                    <span className="font-semibold">
                        قیمت کالا ها
                    </span>
                    <span className="flex items-center gap-1">
                        {toPersianDigit(numberWithCommas(totalGrossPrice))}
                        <span>تومان</span>
                    </span>
                </div>

                <div className="w-full flex items-center justify-between text-xs lg:text-sm text-secondary-800">
                    <span className="font-semibold">
                        مبلغ قابل پرداخت
                    </span>
                    <span className="flex items-center gap-1">
                        <div className="font-medium">{toPersianDigit(numberWithCommas(totalPrice))}</div>
                        <span>تومان</span>
                    </span>
                </div>
                
                {
                    totalOffAmount !== 0 &&
                
                    <div className="w-full flex items-center justify-between text-xs lg:text-sm text-error">
                        <span className="font-semibold">
                            سود شما از این خرید
                        </span>
                        <span className="flex items-center gap-1">
                            {toPersianDigit(numberWithCommas(totalOffAmount))}
                            <span>تومان</span>
                        </span>
                    </div>
                }
                <div className="hidden lg:block mt-8">
                    <button onClick={createPaymentHandler} className="!w-full btn btn--primary">
                        تایید و تکمیل سفارش
                    </button>
                </div>
            </div>
                
            <div className="fixed bottom-20 right-0 w-full lg:hidden z-[99999]">
                <div className="grid grid-cols-2 items-center justify-between w-full bg-white shadow-[0_-10px_25px_-5px_rgb(0,0,0,0.1)] p-4">
                    <div className="w-full">
                        <button onClick={createPaymentHandler} className="!w-full btn btn--primary">
                            تایید و تکمیل سفارش
                        </button>
                    </div>

                    <div className="w-full flex flex-col items-end gap-2 text-secondary-800">
                        <span className="text-xs">
                            مبلغ قابل پرداخت
                        </span>
                        <span className="flex items-center gap-1">
                            <div className="font-semibold text-lg">{toPersianDigit(numberWithCommas(totalPrice))}</div>
                            <span className="text-xs">تومان</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
