import React from 'react'

const PageOne = () => {

    const SelectGender = ()=>{
        return(
            <div className='flex gap-4'>
                <div>
                    
                </div>
            </div>
        )
    }

    return (
        <>
            <p className='self-start text-gray-500 mb-6'>Please fill in the student information so we will be able to contact</p>
            <form className='flex flex-col gap-8 w-full'>
                <div className='flex justify-between'>
                    <div className='input-group'>
                        <label className='input-label' htmlFor="firstName">First Name<span>*</span></label>
                        <input className='input' type="text" name='firstName' placeholder='Enter First Name' />
                    </div>
                    <div className='input-group'>
                        <label className='input-label' htmlFor="lastName">Last Name<span>*</span></label>
                        <input className='input' type="text" name='lastName' placeholder='Enter Last Name' />
                    </div>
                </div>

                <div className='flex justify-between'>
                    <div className='input-group'>
                        <label className='input-label' htmlFor="gender">Gender<span>*</span></label>
                        <input className='input' type="text" name='gender' placeholder='Enter First Name' />
                    </div>
                    <div className='input-group'>
                        <label className='input-label' htmlFor="fatherName">Father Name<span>*</span></label>
                        <input className='input' type="text" name='fatherName' placeholder='Enter Father Name' />
                    </div>
                </div>
            </form>
        </>
    )
}

export default PageOne