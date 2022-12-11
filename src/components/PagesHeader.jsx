import React from 'react'

const PagesHeader = ({ currentPage }) => {

    const PageNumber = (number) => {
        return (
            <div className={`${currentPage >= number ? 'bg-blue-600 opacity-100' : 'bg-gray-500 opacity-50'} rounded-full grid place-items-center text-white w-6 h-6`}>
                {number}
            </div>
        )
    }

    const Line = () => {
        return (
            <div className='h-[1.75px] bg-gray-500 flex-1 opacity-70'>
            </div>
        )
    }

    return (
        <div className='flex w-[90%] items-center mb-12'>
            {PageNumber(1)}
            {Line()}
            {PageNumber(2)}
            {Line()}
            {PageNumber(3)}
            {Line()}
            {PageNumber(4)}
        </div>
    )
}

export default PagesHeader