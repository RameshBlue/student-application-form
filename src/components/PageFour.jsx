import React, { useContext, useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Form, useFormik } from 'formik'
import * as Yup from 'yup'
import { pageContext } from '../context/PageContext'
import UploadIcon from '../assets/upload-icon.svg'

const PageFour = ({ isComplete }) => {

    const { setcurrentSubmitButton, OnNextClick } = useContext(pageContext);
    const buttonRef = useRef();

    const photoRef = useRef();
    const signatureRef = useRef();

    const [photoName, setPhotoName] = useState("");
    const [sigantureName, setSigantureName] = useState("");

    useEffect(() => {
        setcurrentSubmitButton(buttonRef);
    }, [])

    const ValidationSchema = Yup.object().shape({
        photo: Yup.mixed().required("Photo is required").test("fileSize", "File size is too large", function (value) {
            return value != null && value.size <= 1000000;
        }),
        signature: Yup.mixed().required("Photo is required").test("fileSize", "File size is too large", function (value) {
            return value != null && value.size <= 1000000;
        })
    })

    const { handleSubmit, errors, setFieldValue } = useFormik({
        initialValues: {
            photo: undefined,
            signature: undefined
        },
        validationSchema: ValidationSchema,
        onSubmit: (values) => {
            OnNextClick();
        }
    })

    return (
        <motion.div className='w-full' animate={{ x: isComplete ? -700 : 0 }} transition={{ duration: 0.35 }}>
            <form className='grid sm:grid-cols-2 gap-12' onSubmit={handleSubmit}>
                <div className='input-group'>
                    <label className='input-label' htmlFor="photo">Upload Photo<span>*</span></label>
                    <div className='flex flex-col text-center items-center rounded-xl shadow-[1px_3px_7px_0.05px_rgba(0,0,0,0.15)] border-[2px] border-dashed border-gray-400 p-12 cursor-pointer' onClick={() => { photoRef.current.click() }}>
                        <img className='w-8 h-8 mb-2' src={UploadIcon} alt="uploadicon" />
                        <p className='mb-1 mt-1 font-semibold'>Upload Image</p>
                        <p className='text-gray-600'>Max Size: 1MB</p>
                    </div>
                    <input className='hidden' name="photo" type="file" accept='image/*' ref={photoRef} onChange={(e) => {
                        setFieldValue("photo", e.target.files[0]);
                        e.target.files[0].size <= 1000000 ? setPhotoName(e.target.files[0].name) : setPhotoName(undefined);
                    }} />
                    <p>{photoName}</p>
                    {errors.photo ? <p className='text-red-600'>{errors.photo}</p> : null}
                </div>
                <div className='input-group'>
                    <label className='input-label' htmlFor="signature">Upload Signature<span>*</span></label>
                    <div className='flex flex-col text-center items-center rounded-xl shadow-[1px_3px_7px_0.05px_rgba(0,0,0,0.15)] border-[2px] border-dashed border-gray-400 p-12 cursor-pointer' onClick={() => { signatureRef.current.click() }}>
                        <img className='w-8 h-8 mb-2' src={UploadIcon} alt="uploadicon" />
                        <p className='mb-2 mt-1 font-semibold'>Upload Image</p>
                        <p className='text-gray-600'>Max Size: 1MB</p>
                    </div>
                    <input className='hidden' name="signature" type="file" accept='image/*' ref={signatureRef} onChange={(e) => {
                        setFieldValue("signature", e.target.files[0]);
                        e.target.files[0].size <= 1000000 ? setSigantureName(e.target.files[0].name) : setSigantureName(undefined);
                    }} />
                    <p>{sigantureName}</p>
                    {errors.signature ? <p className='text-red-600'>{errors.signature}</p> : null}
                </div>
                <button className='hidden' type='submit' ref={buttonRef}></button>
            </form>
        </motion.div>
    )
}

export default PageFour