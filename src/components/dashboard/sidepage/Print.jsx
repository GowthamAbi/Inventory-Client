import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../../DataContext/DataContext'
import api from '../../../services/api'

export default function Print() {
  const { fabric } = useContext(DataContext);

  const [dcno, setDecNo] = useState({ DOC_NO: "" });
  const [userData, setUserData] = useState([]);

  const fabricList = async () => {
    try {
      const response = await api.post('/inventory/print/1', {
        DOC_NO: dcno.DOC_NO
      });

      setUserData(response.data);
      console.log(response.data)

    } catch (error) {
      console.log("Error in print", error);
    }
  };
   const cutting = async () => {
    try {
      const response = await api.post('/inventory/print/2', {
        DOC_NO: dcno.DOC_NO
      });

      setUserData(response.data);
      console.log(response.data)

    } catch (error) {
      console.log("Error in print", error);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='flex justify-center py-4'>
        <label>Enter Dc No : </label>

        <input
          type="text"
          className='outline-none'
          value={dcno.DOC_NO}
          onChange={(e) =>
            setDecNo({ ...dcno, DOC_NO: e.target.value })
          }
        />

        <button
          className='cursor-pointer bg-blue-500 rounded-sm px-2'
          onClick={()=>((fabric=="fabric")?fabricList():cutting())}
        >
          Submit
        </button>
      </div>
    

      {(fabric=="fabric")?(
        <div className='grid grid-cols-6 border border-gray-400 gap-0 w-full text-center uppercase   '>
  
  <h1 className='col-span-6 border border-gray-400 flex justify-center items-center text-2xl  '>R AND R TEXTILE</h1>
  <h1 className='col-span-6 border border-gray-400 flex justify-center items-center  text-2xl '>RRP3 FABRIC</h1>

  {/* LEFT LABELS */}
  <div className='col-span-1'>
    <ol className="grid grid-rows-6">
      <h1 className='border border-gray-400'>lot gsm</h1>
      <h1 className='border border-gray-400'>r gsm</h1>
      <h1 className='border border-gray-400'>dc no</h1>
      <h1 className='border border-gray-400'>set no</h1>
      <h1 className='border border-gray-400'>item</h1>
      <h1 className='border border-gray-400'>size</h1>
    </ol>
  </div>

  {/* LEFT INPUTS */}
  <div className='border col-span-2 grid grid-rows-6'>
    <input type="text" className='border' />
    <input type="text" className='border' />
    <input type="text" className='border' />
    
  </div>

  {/* RIGHT LABELS */}
  <div className='col-span-1'>
    <ol className="grid grid-rows-6">
      <h1 className='border border-gray-400'>T Dia</h1>
      <h1 className='border border-gray-400'>j or no</h1>
      <h1 className='border border-gray-400'>c p no</h1>
      <h1 className='border border-gray-400'>pcs</h1>
      <h1 className='border border-gray-400'>date</h1>
      <h1 className='border border-gray-400'>dia</h1>
    </ol>
  </div>

  {/* RIGHT INPUTS */}
  <div className='border col-span-2 grid grid-rows-6'>
    <input type="text" className='border' />
    <input type="text" className='border' />
    <input type="text" className='border' />
    <input type="text" className='border' />
    <input type="text" className='border' />
    <input type="text" className='border' />
  </div>

  <div className='border col-span-6 grid grid-cols-6 m-0'>
    <h1>quality</h1>
    <input type="text" className='border col-span-5'  />
  </div>

<div className="grid grid-cols-6 col-span-6 place-items-center border">
  <h1 className='border w-full h-full  flex items-center justify-center'>s no</h1>
  <h1>batch no</h1>
  <h1>colour</h1>
  <h1>roll</h1>
  <h1>system weight</h1>
  <h1>physical weight</h1>
</div>


</div>):(
        userData.length>0 && (<div className='grid grid-cols-6 border border-gray-400 gap-0 w-full text-center uppercase   '>
  
  <h1 className='col-span-6 border border-gray-400 flex justify-center items-center text-2xl  '>R AND R TEXTILE</h1>
  <h1 className='col-span-6 border border-gray-400 flex justify-center items-center  text-2xl '>RRP3 LAY CUTTING</h1>

  {/* LEFT LABELS */}
  <div className='col-span-1'>
    <ol className="grid grid-rows-6">
      <h1 className='border border-gray-400'>lot gsm</h1>
      <h1 className='border border-gray-400'>r gsm</h1>
      <h1 className='border border-gray-400'>dc no</h1>
      <h1 className='border border-gray-400'>set no</h1>
      <h1 className='border border-gray-400'>item</h1>
      <h1 className='border border-gray-400'>size</h1>
    </ol>
  </div>

  {/* LEFT INPUTS */}
  <div className='border col-span-2 grid grid-rows-6'>
    <input type="text" className='border' />
    <input type="text" className='border' />
    <input type="text" className='border' />
    {userData.map((item,index)=>(
     
        <React.Fragment key={index}>
    <h1 className='border'>{item.SET_NO}</h1>
    <h1 className='border'>{item.SET_NO}</h1>
    <h1 className='border'>{item.SET_NO}</h1>
  </React.Fragment>
   
    ))}
  </div>

  {/* RIGHT LABELS */}
  <div className='col-span-1'>
    <ol className="grid grid-rows-6">
      <h1 className='border border-gray-400'>T Dia</h1>
      <h1 className='border border-gray-400'>j or no</h1>
      <h1 className='border border-gray-400'>c p no</h1>
      <h1 className='border border-gray-400'>pcs</h1>
      <h1 className='border border-gray-400'>date</h1>
      <h1 className='border border-gray-400'>dia</h1>
    </ol>
  </div>

  {/* RIGHT INPUTS */}
  <div className='border col-span-2 grid grid-rows-6'>
    <input type="text" className='border' />
    <input type="text" className='border' />
    <input type="text" className='border' />
    <input type="text" className='border' />
    <input type="text" className='border' />
    <input type="text" className='border' />
  </div>

  <div className='border col-span-6 grid grid-cols-6 m-0'>
    <h1>quality</h1>
    <input type="text" className='border col-span-5'  />
  </div>
<div className='col-span-6'>
      <table className="w-full border border-gray-400 text-center">
  <thead>
    <tr>
      <th className="border p-2">s no</th>
      <th className="border p-2">batch no</th>
      <th className="border p-2">colour</th>
      <th className="border p-2">roll</th>
      <th className="border p-2">system weight</th>
      <th className="border p-2">physical weight</th>
    </tr>
  </thead>

  <tbody>
    {userData.map((item, index) => (
      <tr key={index}>
        <td className="border p-1">{index + 1}</td>
        <td className="border p-1">{item.DOC_NOO}</td>
        <td className="border p-1">{item.COLOR_NAME}</td>
        <td className="border p-1">{item.ROLL}</td>
        <td className="border p-1">{item.WGT}</td>
        <td className="border p-1">
          <input
            type="text"
            className="w-full outline-none text-center"
          />
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>

        </div>)
)}
    </div>
  )
}

