"use client";
import Modal from "@/components/profileComponent/Modal";
import { logout } from "@/services/authService";

export default function LogoutModal({show, onClose, modalName}){

    const logoutHandler = async () => {
        await logout();
        document.location.href = "/";
    }

    return(
        <Modal 
            show={show}
            onClose={onClose}
            modalName={modalName}
            title="از حساب کاربری خارج می‌شوید؟"
        >
            <p className="text-sm leading-[24px] mb-5 text-secondary-800 font-medium">
            با خروج از حساب کاربری، به سبد خرید فعلی‌تان دسترسی نخواهید داشت. هروقت بخواهید می‌توانید مجددا وارد شوید و خریدتان را ادامه دهید.
            </p>

            <div className="w-full flex items-center gap-3">
                <button onClick={logoutHandler} className="btn btn--primary !w-auto px-5">
                    خروج از حساب
                </button>
                <button onClick={onClose} className="btn btn--light px-5">
                    انصراف
                </button>
            </div>
        </Modal>
    )
}