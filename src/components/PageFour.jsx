import React, { useContext, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { pageContext } from '../context/PageContext'
import UploadIcon from '../assets/upload-icon.svg'

const PageFour = ({ isComplete }) => {

    const { setcurrentSubmitButton, OnNextClick } = useContext(pageContext);
    const buttonRef = useRef();

    const photoRef = useRef();
    const signatureRef = useRef();

    useEffect(() => {
        setcurrentSubmitButton(buttonRef);
    }, [])

    const ValidationSchema = Yup.object().shape({
        photo: Yup.mixed().required("Photo is required"),
        signature: Yup.mixed().required("Photo is required")
    })

    const { handleBlur, handleChange, handleSubmit, values, errors, touched } = useFormik({
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
            <form className='grid grid-cols-2 gap-12' onSubmit={handleSubmit}>
                <div className='input-group gap-6'>
                    <label className='input-label' htmlFor="photo">Upload Photo<span>*</span></label>
                    <div className='flex flex-col text-center items-center rounded-xl shadow-[1px_3px_7px_0.05px_rgba(0,0,0,0.15)] border-[2px] border-dashed border-gray-400 p-12 cursor-pointer' onClick={()=> {photoRef.current.click()}}>
                        <img className='w-8 h-8 mb-2' src={UploadIcon} alt="uploadicon" />
                        <p className='mb-2 mt-1 font-semibold'>Upload Image</p>
                        <p className='text-gray-600'>Max Size: 2MB</p>
                        <p className='text-gray-600'>Dimensions: 150 x 150px</p>
                    </div>
                    <input className='hidden' name="photo" type="file" accept='image/*' ref={photoRef} value={values.photo} onBlur={handleBlur} onChange={handleChange} />
                    {errors.photo && touched.photo ? <p className='text-red-600'>{errors.photo}</p> : null}
                </div>
                <div className='input-group gap-6'>
                    <label className='input-label' htmlFor="signature">Upload Signature<span>*</span></label>
                    <div className='flex flex-col text-center items-center rounded-xl shadow-[1px_3px_7px_0.05px_rgba(0,0,0,0.15)] border-[2px] border-dashed border-gray-400 p-12 cursor-pointer' onClick={()=> {signatureRef.current.click()}}>
                        <img className='w-8 h-8 mb-2' src={UploadIcon} alt="uploadicon" />
                        <p className='mb-2 mt-1 font-semibold'>Upload Image</p>
                        <p className='text-gray-600'>Max Size: 2MB</p>
                        <p className='text-gray-600'>Dimensions: 150 x 150px</p>
                    </div>
                    <input className='hidden' name="signature" type="file" accept='image/*' ref={signatureRef} value={values.signature} onBlur={handleBlur} onChange={handleChange} />
                    {errors.signature && touched.signature ? <p className='text-red-600'>{errors.signature}</p> : null}
                </div>
                <button className='hidden' type='submit' ref={buttonRef}></button>
            </form>
        </motion.div>
    )
}

export default PageFour