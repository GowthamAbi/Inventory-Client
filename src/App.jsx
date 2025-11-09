import React from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Footer from './components/Footer'
import Router from './components/router/Router'
import { BrowserRouter } from 'react-router-dom'

export default function App() {
  return (
    <div className='bg-gray-100'>
      <BrowserRouter>
      
      <Router />   
      <Footer/>
      </BrowserRouter>
    </div>
  )
}
