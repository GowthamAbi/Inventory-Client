import React from 'react'
import Nav from './Nav'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

export default function Option() {
  return (
        <section>
        <Nav/>
        <div className='flex'>
         <Sidebar/>
        <Outlet/>
        </div>
    </section>
  )
}


