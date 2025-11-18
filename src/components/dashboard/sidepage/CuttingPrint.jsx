import React from 'react'

export default function CuttingPrint() {
  return (
    <div className='grid grid-cols-6 border border-gray-400 gap-0 w-full text-center uppercase   '>
  
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


</div>

  )
}
