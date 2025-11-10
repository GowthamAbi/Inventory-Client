import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {
  const navigate=useNavigate()
  return (
    <div className=' pl-2  border-r-2 border-gray-200'>
    <ul className='py-4 '  >
  <button className='flex gap-1 items-center  hover:bg-gray-200 p-2 rounded-lg cursor-pointer w-full '
   onClick={()=>navigate('/inventory/dashboard')} 
   
   >
    <svg width="20" height="20" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
    Dashboard
  </button>

    <button className='flex gap-1 items-center  hover:bg-gray-200 p-2 pr-8 rounded-lg cursor-pointer w-full '
   onClick={()=>navigate('/inventory/inward')} 
   
   >
<svg xmlns="http://www.w3.org/2000/svg"
 fill="none" viewBox="0 0 24 24"
  strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
    Inward
  </button>

  <button className='flex gap-1 items-center hover:bg-gray-200 p-2 rounded-lg cursor-pointer  w-full' onClick={()=>navigate('/inventory/selection')} >

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <rect x="3" y="3" width="7" height="7" stroke="black" strokeWidth="2"/>
  <rect x="14" y="3" width="7" height="7" stroke="black" strokeWidth="2"/>
  <rect x="3" y="14" width="7" height="7" stroke="black" strokeWidth="2"/>
  <rect x="14" y="14" width="7" height="7" stroke="black" strokeWidth="2"/>
</svg>

    Select
  </button>

  <button className='flex gap-1 items-center hover:bg-gray-200 p-2 cursor-pointer rounded-lg w-full'  onClick={()=>navigate('/inventory/outward')} >

    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 16V8a2 2 0 0 0-1-1.73L12 3 4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73L12 21l8-3.27A2 2 0 0 0 21 16z"></path>
      <path d="M12 3v18"></path>
    </svg>
    Outward
  </button>

  <button className='flex gap-1 items-center hover:bg-gray-200 p-2 rounded-lg cursor-pointer  w-full' onClick={()=>navigate('/inventory/orders')}>

    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 11h6"></path>
      <path d="M9 15h6"></path>
      <path d="M9 7h6"></path>
      <path d="M16 4h-1.5a2 2 0 0 0-3 0H9"></path>
      <rect x="3" y="5" width="18" height="16" rx="2"></rect>
    </svg>
    Orders
  </button>

  <button className='flex gap-1 items-center hover:bg-gray-200 p-2 rounded-lg cursor-pointer  w-full' onClick={()=>navigate('/inventory/sales')}>

    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3 17 9 11 13 15 21 7"></polyline>
      <polyline points="14 7 21 7 21 14"></polyline>
    </svg>
    Sales
  </button>

  <button className='flex gap-1 items-center hover:bg-gray-200 p-2 rounded-lg  cursor-pointer  w-full' onClick={()=>navigate('/inventory/reports')} >

    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="4" height="7"></rect>
      <rect x="10" y="7" width="4" height="11"></rect>
      <rect x="17" y="4" width="4" height="14"></rect>
      <path d="M3 21h18"></path>
    </svg>
    Reports
  </button>

  <button className='flex gap-1 items-center hover:bg-gray-200 p-2 rounded-lg  cursor-pointer w-full' onClick={()=>navigate('/inventory/settings')}>
   
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82L4.3 4.3a2 2 0 1 1 2.83-2.83L7.2 1.53a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09c.14.63.64 1.12 1.27 1.27L16.47 4.3a2 2 0 1 1 2.83 2.83l-.06.06c-.31.31-.46.73-.37 1.15.09.42.4.78.83.96.43.18.9.06 1.23-.28l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06c-.34.34-.46.8-.28 1.23.18.43.54.74.96.83.42.09.84-.06 1.15-.37l.06-.06A2 2 0 0 1 19.4 15z"></path>
    </svg>
    Settings
  </button>
</ul>

    </div>
  )
}
