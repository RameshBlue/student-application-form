import React from 'react'
import {motion} from 'framer-motion'

const PageTwo = ({isComplete}) => {
  return (
    <motion.div className='w-full' animate={{x: isComplete ? -700 : 0}} transition={{duration:0.35}}>
        <form className='grid grid-cols-2 gap-8 w-full'>
    
        </form>

    </motion.div>
  )
}

export default PageTwo