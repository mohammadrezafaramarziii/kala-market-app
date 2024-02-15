"use client";
import TextField from "@/common/TextField";
import Loading from "@/common/loading/Loading";
import Modal from "@/components/profileComponent/Modal";
import { updateProfile } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function BioFormEdit({show, onClose, value}){
    const [bio, setBio] = useState(value.biography);
    const { data, error, isPending, mutateAsync } = useMutation({ mutationFn: updateProfile });

    const updateProfileHandler = async () => {
        try {
            const res = await mutateAsync({
                name: value.name,
                email: value.email,
                phoneNumber: value.phoneNumber,
                biography: bio
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
            title="بیوگرافی" 
            modalName="bio-form-edit"
            show={show}
            onClose={onClose}
        >
            <TextField 
                value={bio}
                onChange={(e)=>setBio(e.target.value)}
                name={'name'}
                label={'بیوگرافی'}
                inputClassName={'bg-slate-100'}
           />
           {
            isPending ?
            <div className="w-full btn btn--primary hover:outline-none mt-6">
                <Loading />
            </div>
            :
            <button onClick={updateProfileHandler} className="btn btn--primary w-full mt-6">
                ویرایش  
            </button>
           }
        </Modal>
    )
}