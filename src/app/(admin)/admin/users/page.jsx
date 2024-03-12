"use client"
import Loading from "@/common/loading/Loading";
import TitlebarAdmin from "@/components/adminComponent/TitlebarAdmin";
import { adminUsersTHeads } from "@/constants/tableHeads";
import { useGetAllUser } from "@/hooks/useAuth";
import { toPersianDigit } from "@/utils/toPersianDigit";

export default function UsersPage() {
    const { data, isPending } = useGetAllUser();
    const { users } = data || {};

    if (isPending) {
        return (
            <div className="w-full h-full max-[1024px]:min-h-[calc(100vh-3rem)] flex items-center justify-center">
                <Loading />
            </div>
        )
    }

    return (
        <div>
            <TitlebarAdmin title={'لیست کاربران'} />

            <div className="mt-8 overflow-x-auto">
                <table className="w-full">
                    <thead className="w-full h-12">
                        <tr>
                            {adminUsersTHeads.map((item) => {
                                return (
                                    <th key={item.id} className="table__th">
                                        {item.label}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => {
                            return (
                                <tr key={user._id} className="border-b border-slate-100">
                                    <th className="table__td  pl-8">
                                        {toPersianDigit(index + 1)}
                                    </th>
                                    <th className="table__td  pl-8">
                                        {toPersianDigit(user.name)}
                                    </th>
                                    <th className="table__td  pl-8">
                                        {toPersianDigit(user.email)}
                                    </th>
                                    <th className="table__td  pl-8">
                                        {toPersianDigit(user.phoneNumber)}
                                    </th>
                                    <th className="table__td  pl-8">
                                        <div className={user.role === "ADMIN" && "!text-primary-900"}>
                                            {user.role === "USER" ? "کاربر عادی" : "کاربر ادمین"}
                                        </div>
                                    </th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
