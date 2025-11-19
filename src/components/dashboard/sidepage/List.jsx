import React, { useEffect, useState } from 'react'
import api from '../../../services/api'

export default function List() {
const [fabricList,setFabricList]=useState([])
const [cuttingList,setCuttingList]=useState([])
  useEffect(()=>{
   const fetchList=async()=>{
     try {
      const response=await api.get('/inventory/list')
      setFabricList(response.data)
     

    } catch (error) {
      console.log("Error in list Fetching",error)
    }
   }

   const fetchCutting=async()=>{
    try {
      const response=await api.get('/inventory/outward')
      setCuttingList(response.data)
     

    } catch (error) {
      console.log("Error in list Fetching",error)
    }
   }

   fetchList()
   fetchCutting()
  },[])

  return (
    <div className='uppercase'>
      {/* Fabric Inward section*/}
      <div>
        {fabricList.length>0 && (
          <table>
          <thead>
            <tr className=''>
              <th className='border p-2'>s no</th>
              <th className='border p-2'>dc no</th>
              <th className='border p-2'>FABRIC_GROUP</th>
              <th className='border p-2'>COLOR_NAME</th>
              <th className='border p-2'>set no</th>
              <th className='border p-2'>roll</th>
              <th className='border p-2'>weigth</th>
            </tr>
          </thead>
          <tbody>
            {fabricList.map((item, index) => (
              <tr key={index} className="border text-center ">
                <td className="border ">{index + 1}</td>
                <td className="border ">{item.DOC_NO}</td>
                <td className="border ">{item.FABRIC_GROUP}</td>
                <td className="border ">{item.COLOR_NAME}</td>
                <td className="border ">{item.SET_NO}</td>
                <td className="border ">{item.RECD_DC_ROLL}</td>
                <td className="border ">{item.RECD_DC_WGT}</td>
              </tr>
            ))}
          </tbody>

        </table>)}
      </div>

      {/* Cutting section*/}
      <div>
           {fabricList.length>0 && (
          <table>
          <thead>
            <tr className=''>
              <th className='border p-2'>s no</th>
              <th className='border p-2'>dc no</th>
              <th className='border p-2'>FABRIC_GROUP</th>
              <th className='border p-2'>COLOR_NAME</th>
              <th className='border p-2'>set no</th>
              <th className='border p-2'>roll</th>
              <th className='border p-2'>weigth</th>
            </tr>
          </thead>
          <tbody>
            {cuttingList.map((item, index) => (
              <tr key={index} className="border text-center ">
                <td className="border ">{index + 1}</td>
                <td className="border ">{item.DOC_NO}</td>
                <td className="border ">{item.FABRIC_GROUP}</td>
                <td className="border ">{item.COLOR_NAME}</td>
                <td className="border ">{item.SET_NO}</td>
                <td className="border ">{item.RECD_DC_ROLL}</td>
                <td className="border ">{item.RECD_DC_WGT}</td>
              </tr>
            ))}
          </tbody>

        </table>)}
      </div>
      </div>
  )
}
