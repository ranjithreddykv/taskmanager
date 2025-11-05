
import clsx from 'clsx'
import React from 'react'

const Card = ({label,count,bg,icon}) => {
  return (
    <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
        <div className='h-full flex flex-1 flex-col justify-between'>
            <p className='text-base text-gray-600'>{label}</p>
            <span className='text-2xl font-semibold'>{count}</span>
            <span className='text-sm text-gray-400'>{"110 last month"}</span>
        </div>
        <div className={clsx("w-10 h-10 rounded-full items-center justify-center text-white",bg)}>
        <span className='flex items-center justify-center h-full w-full'>{icon}</span>
        </div>
    </div>
  )
}

export default Card
