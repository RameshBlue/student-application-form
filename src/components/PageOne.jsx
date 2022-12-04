import React, { useState } from 'react'
import {motion} from 'framer-motion'

const genderTypes = ["Male", "Female", "Others"]

const PageOne = ({isComplete}) => {

    const [selectedGender, setSelectedGender] = useState("Male")

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
        <motion.div className='w-full' animate={{x: isComplete ? -700 : 0}} transition={{duration:0.35}}>
            <p className='self-start text-gray-500 mb-6'>Please fill in the student information so we will be able to contact</p>
            <form className='flex gap-14 w-full'>
                <div className='flex flex-col gap-8 w-full'>
                    <div className='input-group'>
                        <label className='input-label' htmlFor="firstName">First Name<span>*</span></label>
                        <input className='input' type="text" name='firstName' placeholder='Enter First Name' />
                    </div>
                    <div className='input-group'>
                        <label className='input-label' htmlFor="gender">Gender<span>*</span></label>
                        {SelectGender()}
                    </div>
                </div>
                <div className='flex flex-col gap-8 w-full'>
                    <div className='input-group'>
                        <label className='input-label' htmlFor="lastName">Last Name<span>*</span></label>
                        <input className='input' type="text" name='lastName' placeholder='Enter Last Name' />
                    </div>
                    <div className='input-group'>
                        <label className='input-label' htmlFor="fatherName">Father Name<span>*</span></label>
                        <input className='input' type="text" name='fatherName' placeholder='Enter Father Name' />
                    </div>
                </div>
            </form>
        </motion.div>
    )
}

export default PageOne