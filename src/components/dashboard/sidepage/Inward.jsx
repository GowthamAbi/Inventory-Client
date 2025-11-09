import React, { useState } from 'react'
import api from '../../../services/api'

export default function Inward() {
const [userData, setUserData] = useState({
  DOC_NO: "",
  DATE: "",
  JOB_ORDER_NO: "",
  RECORD_TYPE: "",
  FABRIC_GROUP: "",
  COLOR_NAME: "",
  SET_NO: "",
  DC_DIA: "",
  DIA_TYPE: "",
  PRCESS_NAME: "",
  PROCESS_DC_NO: "",
  COMPACT_NO: "",
  RECD_DC_NO: "",
  RECD_DC_DATE: "",
  RECD_DC_ROLL: "",
  RECD_DC_WGT: ""
});


const title=["DOC_NO","DATE","JOB_ORDER_NO","RECORD_TYPE","FABRIC_GROUP",'COLOR_NAME',"SET_NO","DC_DIA","DIA_TYPE",
                "PRCESS_NAME","PROCESS_DC_NO","COMPACT_NO","RECD_DC_NO","RECD_DC_DATE","RECD_DC_ROLL","RECD_DC_WGT"]

const handleChange=(e)=>{
  const {name,value}=e.target
  setUserData({...userData,[name]:value})
}

const handleSubmit=async(e)=>{
e.preventDefault()
try {
  const data=await api.post('/inventory/inward',userData)

 setUserData({
      DOC_NO: "",
      DATE: "",
      JOB_ORDER_NO: "",
      RECORD_TYPE: "",
      FABRIC_GROUP: "",
      COLOR_NAME: "",
      SET_NO: "",
      DC_DIA: "",
      DIA_TYPE: "",
      PRCESS_NAME: "",
      PROCESS_DC_NO: "",
      COMPACT_NO: "",
      RECD_DC_NO: "",
      RECD_DC_DATE: "",
      RECD_DC_ROLL: "",
      RECD_DC_WGT: ""
    });
  
} catch (error) {
  console.log("Inventory error",error)
}
}

  return (
    <section className='bg-white p-4 w-full'>
        <div>
            <h1> New Item </h1>
           <form className='w-full' onSubmit={handleSubmit}>
                  {
                    title.map((item,index)=>(
                      <div key={index} className='flex gap-1 space-y-2 justify-center '>
                        <h2 className='text-xl'>{index+1}</h2>
                        <p>.</p>
                        <label className='text-xl w-1/4' >{item}</label>
                        <input className='w-3/4' name={item} value={userData[item || " "]} onChange={handleChange}></input>
                      </div>
                    ))
                  }
                  <button className='text-center border-2 bg-blue-200 text-white text-xl hover:bg-blue-300
                    cursor-pointer p-2 rounded-xl w-full'>SUBMIT</button>
                  </form>
   
        </div>
    </section>
  )
}
