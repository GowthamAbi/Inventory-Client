import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Nav() {

  const[open,setOpen]= useState(false)
const navigate=useNavigate()

const logout=()=>{
  navigate('/')
}

  return (
    <nav className='sticky top-0'>
        <ul className='flex justify-between  bg-gray-600 px-4 py-2 text-white '>
        <div className='flex justify-center gap-2 items-center'>
        <button onClick={()=>navigate('/')}   >LeaTem</button>
        <li>| Inventory Manager</li>
        </div>

        <div className='flex justify-center gap-2 items-center'>
        <li><svg xmlns="http://www.w3.org/2000/svg"
         width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="currentColor"
           strokeWidth="1.8" strokeLinecap="round"
            strokeLinejoin="round">
        <title>Low Stock Alerts (Bell)</title>
        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11c0-3.07-1.64-5.64-4.5-6.32V4a1.5 1.5 0 0 0-3 0v0.68C7.64 5.36 6 7.93 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h11z" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg></li>

        <div className='relative'> 
        <button >
        <svg xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24" 
        strokeWidth="1.5" stroke="currentColor" 
        className="w-6 h-6 cursor-pointer" onClick={()=>setOpen(!open)}>
        <path strokeLinecap="round"
         strokeLinejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>

        </button>
        
        {open && <div className='absolute top-10 right-0 bg-white text-black w-32  py-2 '>

            <ul  >
            <li className='hover:bg-gray-200 px-4 cursor-pointer'>My Account</li>
            <li className='hover:bg-gray-200 px-4 cursor-pointer' onClick={logout}>Log Out</li>
            </ul>
        </div>}
        </div>

        </div>
        </ul>
    </nav>
  )
}
