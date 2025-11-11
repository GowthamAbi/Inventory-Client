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
    <section className=' p-4 w-full'>
        <div>
           <form className='w-full space-y-2' onSubmit={handleSubmit}>
              <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-4">
                {title.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4 border-b pb-3"
                  >
                    <div className="flex items-center gap-2 w-1/3">
                      <span className="text-lg font-semibold text-gray-700">{index + 1}.</span>
                      <label className="text-lg font-medium text-gray-800">{item}</label>
                    </div>

                    <input
                      type="text"
                      name={item}
                      value={userData[item] || ""}
                      onChange={handleChange}
                      placeholder={`Enter ${item}`}
                      className="w-2/3 border border-gray-300 text-center text-gray-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                    />
                  </div>
                ))}
              </div>

               <button className='text-center border-2 bg-blue-200 text-white text-xl hover:bg-blue-300 cursor-pointer p-2 rounded-xl w-full'>SUBMIT</button>
            </form>
   
        </div>
    </section>
  )
}
