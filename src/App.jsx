import React from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Footer from './components/Footer'
import Router from './components/router/Router'
import { BrowserRouter } from 'react-router-dom'
import {DataProvider} from './DataContext/DataContext'

export default function App() {
  return (
    <div className='bg-gray-100'>
      <DataProvider>
        <BrowserRouter>
          <Router />
          <Footer />
        </BrowserRouter>
      </DataProvider>
    </div>
  )
}
