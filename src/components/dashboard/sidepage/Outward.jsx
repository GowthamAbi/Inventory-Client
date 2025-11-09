import React from 'react'
import api from '../../../services/api';
import { useState } from 'react';

export default function Products() {
  const [userData, setUserData] = useState({
    DOC_NO: "",
    FABRIC_GROUP: "",
    COLOR_NAME: "",
    SET_NO: "",
    DC_DIA: "",
    RECD_DC_ROLL: "",
    RECD_DC_WGT: ""
  });

  const[data,setData]=useState({
    FABRIC_GROUP: "",
    COLOR_NAME: "",
  })

  const handleChange=(e)=>{
    const {name,value}=e.target
    setData({...data,[name]:value})
  }

  const handleSubmit=async(e)=>{
e.preventDefault()
try {
  const datas=await api.post('/inventory/outward',data)
  console.log(datas)
} catch (error) {
  console.log("Outward err",error)
}
  }
  return (
    <div>
      <form onSubmit={handleSubmit} >
        <label >FABRIC_GROUP :</label>
        <input type="text" name="FABRIC_GROUP" value={data.FABRIC_GROUP ||" "} onChange={handleChange}/>
        <label>FABRIC_COLOUR :</label>
        <input type="text" name="FABRIC_COLOUR" value={data.FABRIC_COLOUR ||" "} onChange={handleChange}/>
        <button type='submit'>ENTER</button>
      </form>

      <div>

      </div>
    </div>
  )
}
