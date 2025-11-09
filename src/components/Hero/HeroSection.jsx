import React from 'react'
import Feature from './Feature'

export default function HeroSection() {
  return (
    <section>
        <div className='flex mx-auto max-w-2xl flex-col px-8 py-8 md:py-16'>
            <h1 className='text-xl text-gray-600 md:text-3xl text-center font-bold pb-4'>Manage Your eCommerce Inventory Effortlessly</h1>
            <p className=' text-center pb-8'>Track stock, automate orders, and grow your business with real-time analytics.</p>
          <div className='flex space-x-4 justify-center'>
          <button className='bg-red-500 hover:bg-red-600 rounded-lg  px-6 py-2 text-white font-bold '>GET STARTED</button>
          <button className=' border border-red-500  text-red-600 hover:bg-orange-200 cursor-pointer rounded-lg  px-6 py-2  font-bold '>EXPLORE DEMO ACCOUNT</button>
          </div>
        </div>
        <Feature/>
    </section>
  )
}
