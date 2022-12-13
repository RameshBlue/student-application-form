import React from 'react'
import CheckMark from '../assets/check.png'

const FinalPage = () => {
  return (
    <div className='flex flex-col items-center'>
        <img src={CheckMark} alt='check' className='w-[30%]'/>
        <h1 className='text-blue-600 font-semibold text-[40px]'>Thank you!</h1>
        <p className='text-gray-600 text-xl mt-1'>Your application has been submitted successfully.</p>
    </div>
  )
}

export default FinalPage