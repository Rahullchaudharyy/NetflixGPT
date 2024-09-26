import React from 'react'

const Title = ({title,overview}) => {
  return (
    <div className='h-full justify-center z-30  pb-[10vmin] absolute w-[90vmin] md:w-[70vmin] pl-10 flex flex-col gap-5 text-white bg-gradient-to-r from-black' >

      <div className='md:w-[50vmin] p-5 flex flex-col gap-6'>
      <h1 className='text-5xl font-bold'>{title}</h1>
    <p className='text-[2vmin]'>{overview}</p>
    <div className='flex gap-4'>
        <button className='bg-white hover:bg-opacity-15 text-2xl px-2 md:px-7 py-0 md:py-3  text-black hover:text-white font-bold rounded-md'> ▸ Play</button>
        <button className='bg-white bg-opacity-50 text-2xl px-2 md:px-7 py-0 md:py-3  text-white font-bold rounded-md'>! More info</button>
    </div>
      </div>
   
    </div>
  )
}

export default Title