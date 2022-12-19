import React, { useContext, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { pageContext } from '../context/PageContext'
import moment from "moment";

const Boards = ["Select", "State Board", "CBSE", "ICSE"]

const PageTwo = ({ isComplete }) => {

    const { setcurrentSubmitButton, OnNextClick } = useContext(pageContext);
    const buttonRef = useRef();

    useEffect(() => {
        setcurrentSubmitButton(buttonRef);
    }, [])

    const ValidationSchema = Yup.object().shape({
        schoolName: Yup.string().required("School name is required"),
        dateGraduated: Yup.date().required("Graduated date is required").max(new Date(Date.now()),"You are not graduated yet"),
        board: Yup.string().test("board", "Select a board", function (value) {
            return value != "" && value != "Select";
        }).required("Select a board"),
        mark: Yup.number().typeError("Mark should be in numbers").min(0, "Mark should be greater than or equal to zero").max(100, "Mark should be less than or equal to 100").required("Total mark is required")
    })

    const { handleBlur, handleChange, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            schoolName: "",
            dateGraduated: "",
            board: "",
            mark: ""
        },
        validationSchema: ValidationSchema,
        onSubmit: (values) => {
            OnNextClick();
        }
    })

    return (
        <motion.div className='w-full' animate={{ x: isComplete ? -700 : 0 }} transition={{ duration: 0.35 }}>
            <form className='grid grid-cols-2 gap-8 w-full' onSubmit={handleSubmit}>
                <div className='input-group col-span-2 md:col-span-1'>
                    <label className='input-label' htmlFor="schoolName">Name of higher secondary school<span>*</span></label>
                    <input className='input' type="text" name='schoolName' placeholder='Enter school name' value={values.schoolName} onBlur={handleBlur} onChange={handleChange} />
                    {touched.schoolName && errors.schoolName ? <p className='text-red-600'>{errors.schoolName}</p> : null}
                </div>
                <div className='input-group col-span-2 md:col-span-1'>
                    <label className='input-label' htmlFor="board">Board<span>*</span></label>
                    <select className='input cursor-pointer' name='board' value={values.board} onBlur={handleBlur} onChange={handleChange}>
                        {
                            Boards.map((board, i) => {
                                return (
                                    <option key={i} value={board}>{board}</option>
                                )
                            })
                        }
                    </select>
                    {errors.board && touched.board ? <p className='text-red-600'>{errors.board}</p> : null}
                </div>
                <div className='input-group col-span-2 md:col-span-1'>
                    <label className='input-label' htmlFor="dateGraduated">Graduated date<span>*</span></label>
                    <input className='input' type="date" name='dateGraduated' onBlur={handleBlur} onChange={handleChange} value={values.dateGraduated} />
                    {errors.dateGraduated && touched.dateGraduated ? <p className='text-red-600'>{errors.dateGraduated}</p> : null}
                </div>
                <div className='input-group col-span-2 md:col-span-1'>
                    <label className='input-label' htmlFor="mark">{"Total Mark (%)"}<span>*</span></label>
                    <input className='input' type="text" name='mark' placeholder='Enter total mark' value={values.mark} onBlur={handleBlur} onChange={handleChange} />
                    {touched.mark && errors.mark ? <p className='text-red-600'>{errors.mark}</p> : null}
                </div>
                <div className='input-group col-span-2'>
                    <label className='input-label' htmlFor="award">Have you received any recognition, citation, or awards during school?</label>
                    <textarea className='input' name="award" rows="4" />
                </div>
                <div className='input-group col-span-2'>
                    <label className='input-label' htmlFor="participation">Have you participated in any organization in your school?</label>
                    <textarea className='input' name="participation" rows="4" />
                </div>
                <button className='hidden' type='submit' ref={buttonRef}></button>
            </form>
        </motion.div>
    )
}

export default PageTwo