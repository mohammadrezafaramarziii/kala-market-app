"use client";
import TextField from "@/common/TextField";
import Loading from "@/common/loading/Loading";
import Modal from "@/components/profileComponent/Modal";
import { updateProfile } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

export default function EmailFormEdit({show, onClose, value}){
    const { data, error, isPending, mutateAsync } = useMutation({ mutationFn: updateProfile });
    const updateProfileHandler = async () => {
        try {
            const res = await mutateAsync({
                name: value.name,
                email: formik.values.email,
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

    const formik = useFormik({
        initialValues: {email:value.email},
        onSubmit: updateProfileHandler,
        validationSchema: Yup.object({
            email: Yup.string()
                .required("ایمیل نمیتواند خالی باشد")
                .email("ایمیل وارد شده نادرست است")
        })
    })

    return(
        <Modal 
            title="ویرایش ایمیل" 
            modalName="email-form-edit"
            show={show}
            onClose={onClose}
        >
            <TextField 
                value={formik.values.email}
                onChange={formik.handleChange}
                name={'email'}
                label={'ایمیل'}
                inputClassName={'bg-slate-100'}
                error={formik.errors.email}
           />
           {
            isPending ?
            <div className="w-full btn btn--primary hover:outline-none mt-6">
                <Loading />
            </div>
            :
            <button type="submit" onClick={formik.handleSubmit} className="btn btn--primary w-full mt-6">
                ویرایش  
            </button>
           }
        </Modal>
    )
}