"use client"
import Sectionbox from "@/components/profileComponent/Sectionbox";
import { adminUsersTHeads } from "@/constants/tableHeads";
import { useGetAllUser } from "@/hooks/useAuth";
import Link from "next/link";

export default function UsersPage() {
  const { data, isPending } = useGetAllUser();
  const { users } = data || {};

  if(isPending) return null

  return (
    <div className="p-6">
        <Sectionbox title={'کاربران'}>
            <table>
                <thead>
                    <tr>
                        {
                            adminUsersTHeads.map((item)=>{
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
                    {users.map((user, index)=>{
                        return(
                            <tr key={user._id} className="text-xs">
                                <td>{index}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td><Link href={'#'}>مشاهده</Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Sectionbox>
    </div>
  )
}
