import React from 'react'
import data from '../../data.jsx'


export default function Feature() {
  return (
<div className='grid grid-cols-2 md:grid-cols-3  mx-auto max-w-6xl'>
      {data.map(item => (
        <div key={item.id} className='bg-gray-200 p-4 mx-4 my-2 rounded-lg transform transition-transform hover:scale-105'>
          <div className='flex flex-wrap gap-6 items-center '>
          <div className='my-2 '>{item.icon}</div>
          <h2 className='font-bold text-sm md:text-lg text-wrap '>{item.title}</h2>
          </div>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  )
}





