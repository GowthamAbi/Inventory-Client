import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api.js'



export default function Login() {
  const [userData,setUserData]=useState({
    email:'',password:''
  })

 const navigate=useNavigate()

  const handleChange=(e)=>{
    const {name,value}=e.target
    setUserData({...userData,[name]:value})
  }
    
  const handleSubmit= async(e)=>{
    e.preventDefault()
try {

      const response = await api.post("/login", {
        email: userData.email,
        password: userData.password,
      });
        console.log("Login Success:", response.data);
    navigate('/inventory/dashboard')
    setUserData({email:'',password:''})
} catch (error) {
  console.log("Login Error")
}

  }
  return (
    <section >
         <div className='p-8 cursor-pointer'>
          <button className='cursor-pointer' onClick={()=>{navigate('/')}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className='h-6 w-6' >
        <path strokeLinecap="round" 
        strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        </button>
         </div>
      <div className='flex items-center min-h-screen  font-serif p-8' >
        
      <div className='bg-gray-300 mx-auto max-w-2xl rounded-lg p-4 shadow-2xl'>
        <div>
        <h1 className='text-center text-2xl font-bold text-purple-800 mb-4 '>LOG IN</h1>
        <form onSubmit={handleSubmit} className='flex flex-col w-80 space-y-4  '>
        <label >EMAIL<span className='text-red-600'> *</span></label>
          <input type="mail" required className=' px-2 outline-none text-center border border-gray-200 rounded-lg focus:ring-2  focus:ring-blue-400 ' onChange={handleChange} name='email' value={userData.email}/>
        <label >PASSWORD<span className='text-red-600'> *</span></label>
          <input type="text" required
           className=' px-2 outline-none text-center border border-gray-200 rounded-lg focus:ring-2  focus:ring-blue-400 ' onChange={handleChange} name='password' value={userData.password}/>
        <button  type='submit'
        disabled={!userData.email && !userData.password}
         className={`${( !userData.email && !userData.password )?'bg-gary-400':"bg-blue-300 hover:bg-blue-500"} cursor-pointer text-white   rounded-3xl`}
        >SUBMIT</button>
        <div className='flex  space-x-2'>
          <h3>You haven't a Account ?</h3>
          <a href="" className='cursor-pointer hover:text-blue-400 transform transition-tarnsform hover:scale-120' onClick={()=>navigate('/register')}>Register</a>
        </div>
        </form>
        </div>
      </div>

    
      
      </div>
    </section>
  )
}
