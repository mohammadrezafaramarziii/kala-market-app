"use client";
import Loading from "@/common/loading/Loading";
import Sectionbox from "@/components/profileComponent/Sectionbox";
import { userPaymentsTHeads } from "@/constants/tableHeads";
import { useGetUser } from "@/hooks/useAuth";
import { toPersianDate } from "@/utils/toPersianDate";

export default function PaymentsPage() {

  const { data, isPending } = useGetUser();
  const { user, payments } = data || {};
    
  if(isPending) return <Loading />

  return (
    <div className="p-6">
        <Sectionbox title={'سفارشات'}>

            <div>
                <table>
                    <thead>
                        <tr>
                            {
                                userPaymentsTHeads.map((item)=>{
                                    return(
                                        <th key={item.id} className="whitespace-nowrap">
                                            {item.label}
                                        </th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index)=>{
                            return(
                                <tr key={payment._id} className="text-xs">
                                    <td>{index}</td>
                                    <td>{payment.invoiceNumber}</td>
                                    <td>{payment.description}</td>
                                    <td>{payment.amount}</td>
                                    <td>{toPersianDate(payment.createdAt)}</td>
                                    <td>{payment.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </Sectionbox>
    </div>
  )
}
