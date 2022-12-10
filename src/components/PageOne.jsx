import React, { useContext, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import moment from "moment";
import { pageContext } from '../context/PageContext'

const genderTypes = ["Male", "Female", "Others"]

const PageOne = ({ isComplete }) => {

    const [selectedGender, setSelectedGender] = useState("Male")

    const { setcurrentSubmitButton, OnNextClick } = useContext(pageContext);
    const buttonRef = useRef();

    useEffect(() => {
        setcurrentSubmitButton(buttonRef);
    }, [])

    const ValidationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        fatherName: Yup.string().required("Father name is required"),
        email: Yup.string().email("Please check you email").required("Email address is required"),
        phoneNumber: Yup.string().matches(/(7|8|9)\d{9}/, "Invalid phone number").required("Phone number is required"),
        date: Yup.string().nullable().test("dateOfBirth", "You must be 18 years or older", function (value) {
          return moment().diff(moment(value, "YYYY-MM-DD"), "years") >= 18;
        }).required("Please enter your age")
    })

    const { handleBlur, handleChange, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            name: "",
            fatherName: "",
            email:"",
            phoneNumber: "",
            date:""
        },
        validationSchema: ValidationSchema,
        onSubmit: (values) => {
            OnNextClick();
        }
    })

    const SelectGender = () => {
        return (
            <div className='flex gap-2'>
                {
                    genderTypes.map((gender, i) => {
                        return (
                            <div key={i} className={`${selectedGender == gender ? 'bg-blue-600 text-white' : 'bg-white text-black'} rounded-2xl shadow-[1px_3px_7px_0.05px_rgba(0,0,0,0.15)] cursor-pointer px-4 py-2`} onClick={() => { setSelectedGender(gender) }}>
                                {gender}
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <motion.div className='w-full' animate={{ x: isComplete ? -700 : 0 }} transition={{ duration: 0.35 }}>
            <p className='self-start text-gray-500 mb-6'>Please fill in the student information so we will be able to contact</p>
            <form className='grid grid-cols-2 gap-8 w-full' onSubmit={handleSubmit}>
                <div className='input-group'>
                    <label className='input-label' htmlFor="name">Name<span>*</span></label>
                    <input className='input' type="text" name='name' placeholder='Enter your name' value={values.name} onBlur={handleBlur} onChange={handleChange} />
                    {touched.name && errors.name ? <p className='text-red-600'>{errors.name}</p> : null}
                </div>
                <div className='input-group'>
                    <label className='input-label' htmlFor="fatherName">Father Name<span>*</span></label>
                    <input className='input' type="text" name='fatherName' placeholder='Enter father name' onBlur={handleBlur} onChange={handleChange} value={values.fatherName} />
                    {errors.fatherName && touched.fatherName ? <p className='text-red-600'>{errors.fatherName}</p> : null}
                </div>
                <div className='input-group'>
                    <label className='input-label' htmlFor="gender">Gender<span>*</span></label>
                    {SelectGender()}
                </div>
                <div className='input-group'>
                    <label className='input-label' htmlFor="email">Email Address<span>*</span></label>
                    <input className='input' type="text" name='email' placeholder='Enter email address' onBlur={handleBlur} onChange={handleChange} value={values.email} />
                    {errors.email && touched.email ? <p className='text-red-600'>{errors.email}</p> : null}
                </div>
                <div className='input-group'>
                    <label className='input-label' htmlFor="phoneNumber">Phone Number<span>*</span></label>
                    <input className='input' type="text" name='phoneNumber' placeholder='Enter phone number' onBlur={handleBlur} onChange={handleChange} value={values.phoneNumber} />
                    {errors.phoneNumber && touched.phoneNumber ? <p className='text-red-600'>{errors.phoneNumber}</p> : null}
                </div>
                <div className='input-group'>
                    <label className='input-label' htmlFor="date">Date<span>*</span></label>
                    <input className='input' type="date" name='date' onBlur={handleBlur} onChange={handleChange} value={values.date} />
                    {errors.date && touched.date ? <p className='text-red-600'>{errors.date}</p> : null}
                </div>
                <button className='hidden' type='submit' ref={buttonRef}></button>
            </form>
        </motion.div>
    )
}

export default PageOne