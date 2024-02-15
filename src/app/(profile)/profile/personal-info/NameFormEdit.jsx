"use client";
import TextField from "@/common/TextField";
import Loading from "@/common/loading/Loading";
import Modal from "@/components/profileComponent/Modal";
import { updateProfile } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function NameFormEdit({show, onClose, value}){
    const [name, setName] = useState(value.name);
    const { data, error, isPending, mutateAsync } = useMutation({ mutationFn: updateProfile });

    const updateProfileHandler = async () => {
        try {
            const res = await mutateAsync({
                name,
                email: value.email,
                phoneNumber: value.phoneNumber,
                biography: value.biography || ""
            });
            
            if(res){
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <Modal 
            title="ویرایش نام و نام خانوادگی" 
            modalName="name-form-edit"
            show={show}
            onClose={onClose}
        >
            <TextField 
                value={name}
                onChange={(e)=>setName(e.target.value)}
                name={'name'}
                label={'نام و نام خانوادگی'}
                inputClassName={'bg-slate-100'}
           />
           {
            isPending ?
            <div className="w-full btn btn--primary hover:outline-none mt-6">
                <Loading />
            </div>
            :
            <button disabled={!name && true} onClick={updateProfileHandler} className="btn btn--primary w-full mt-6">
                ویرایش  
            </button>
           }
        </Modal>
    )
}