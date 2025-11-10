import React from 'react'
import api from '../../../services/api';
import { useState } from 'react';

export default function Products() {

const [userData, setUserData] = useState([]);


  const[data,setData]=useState({
    FABRIC_GROUP: "",
    COLOR_NAME: ""
  })

  const handleChange=(e)=>{
    const {name,value}=e.target
    setData({...data,[name]:value})
  }

  const handleSubmit=async(e)=>{
e.preventDefault()
try {
  
  const fabric=await api.post('/inventory/selection',data)

  setUserData(fabric.data)
console.log(userData)
    
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
        <input type="text" name="COLOR_NAME" value={data.COLOR_NAME ||" "} onChange={handleChange}/>
        <button type='submit'>ENTER</button>
      </form>

      <div>
          {Array.isArray(userData)
            ? userData.map((item, index) => (
                <div key={index}>
                  <h1>{item}</h1>
                </div>
    )): <p>No data found</p>}


      </div>
    </div>
  )
}


/*{
    DOC_NO: "",
    FABRIC_GROUP: "",
    COLOR_NAME: "",
    SET_NO: "",
    DC_DIA: "",
    RECD_DC_ROLL: "",
    RECD_DC_WGT: ""
  }*/