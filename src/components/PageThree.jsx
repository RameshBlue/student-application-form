import React, { useContext, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { pageContext } from '../context/PageContext'

const Programs = ["Select", "UG", "PG", "Lateral Entry", "Transfer"]

const UgCourses = ["Select", "B.E - Aerospace Engineering", "B.E - Automobile Engineering", "B.E - Civil Engineering", "B.E - Computer Science and Engineering", "B.E - Electrical and Electronics Engineering", "B.E - Electronics and Communication Engineering", "B.E - Mechanical Engineering", "B.Tech - Artificial Intelligence and Data Science", "B.Tech - Information Technology"]

const PgCourses = ["Select", "M.E - Aeronautical Engineering", "M.E - Communication Systems", "M.E - Computer Science and Engineering", "M.E - Manufacturing Engineering", "M.E - Power Electronics and Drives"]

const PageThree = ({ isComplete }) => {

    const { setcurrentSubmitButton, OnNextClick } = useContext(pageContext);
    const buttonRef = useRef();

    useEffect(() => {
        setcurrentSubmitButton(buttonRef);
    }, [])

    const ValidationSchema = Yup.object().shape({
        program: Yup.string().test("program", "Select a Programme", function (value) {
            return value != "" && value != "Select";
        }).required("Select a Programme"),
        course: Yup.string().test("course", "Select a Course", function (value) {
            return value != "" && value != "Select";
        }).required("Select a Course"),
        information: Yup.bool().oneOf([true], 'You need to accept the information provided are true'),
    })

    const { handleBlur, handleChange, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            program: "",
            course: "",
            information: false
        },
        validationSchema: ValidationSchema,
        onSubmit: (values) => {
            OnNextClick();
        }
    })

    return (
        <motion.div className='w-full' animate={{ x: isComplete ? -700 : 0 }} transition={{ duration: 0.35 }}>
            <form className='grid md:grid-cols-2 gap-8 w-full' onSubmit={handleSubmit}>
                <div className='input-group col-span-2 md:col-span-1'>
                    <label className='input-label' htmlFor="program">Programme<span>*</span></label>
                    <select className='input cursor-pointer' name='program' value={values.program} onBlur={handleBlur} onChange={handleChange}>
                        {
                            Programs.map((program, i) => {
                                return (
                                    <option key={i} value={program}>{program}</option>
                                )
                            })
                        }
                    </select>
                    {errors.program && touched.program ? <p className='text-red-600'>{errors.program}</p> : null}
                </div>
                <div className='input-group col-span-2 md:col-span-1'>
                    <label className='input-label' htmlFor="course">Course<span>*</span></label>
                    <select className='input cursor-pointer w-full' name='course' value={values.course} onBlur={handleBlur} onChange={handleChange}>
                        {
                            values.program == "Select" || values.program == "" ? <option value={"select"} >Select</option> :
                                values.program == "PG" ?
                                    PgCourses.map((pgCourse, i) => {
                                        return (
                                            <option key={i} value={pgCourse}>{pgCourse}</option>
                                        )
                                    }) :
                                    UgCourses.map((ugCourse, i) => {
                                        return (
                                            <option key={i} value={ugCourse}>{ugCourse}</option>
                                        )
                                    })
                        }
                    </select>
                    {errors.course && touched.course ? <p className='text-red-600'>{errors.course}</p> : null}
                </div>
                <div className='input-group col-span-2'>
                    <label className='input-label' htmlFor="remark">Remarks, if any</label>
                    <textarea className='input' name="remark" rows="4" placeholder='Please type here..' />
                </div>
                <div className='flex flex-col gap-2 col-span-2'>
                    <div className='flex md:items-center gap-2'>
                        <input className='w-4 h-4 mt-1 md:mt-0' type="checkbox" name="information" value={values.information} onBlur={handleBlur} onChange={handleChange}/>
                        <label className='text-gray-500' htmlFor="information"> I declare that the information provided are true to the best of my knowledge</label>
                    </div>
                    {errors.information && touched.information ? <p className='text-red-600'>{errors.information}</p> : null}
                </div>
                <button className='hidden' type='submit' ref={buttonRef}></button>
            </form>
        </motion.div>
    )
}

export default PageThree