import { useContext } from "react";
import { DataContext } from "../../../DataContext/DataContext";

export default function Outward() {
  const { selectData,setSelectData } = useContext(DataContext);   

  if (!selectData) {return <h3>No data received</h3>};

const handleRemove=(index)=>{
  const updated = selectData.filter((_, i) => i !== index);
  setSelectData(updated);
}
  return (
    <div className="overflow-x-auto uppercase p-4 flex flex-col items-center justify-center">
    
      {selectData && selectData.length > 0 && <table className="min-w-full border">
        <thead>
          <tr>
      <th className="border px-4 py-2">Id </th>
      <th className="border px-4 py-2">DOC NO</th>
      <th className="border px-4 py-2">FABRIC GROUP</th>
      <th className="border px-4 py-2">ROLL</th>
      <th className="border px-4 py-2">weight</th>
      <th className="border px-4 py-2">ROLL</th>
      <th className="border px-4 py-2">WGT</th>  
      <th className="border px-4 py-2 ">item code</th>   
      <th className="border px-4 py-2 ">item name</th>
      <th className="border px-4 py-2 ">style</th>
      <th className="border px-4 py-2">size</th>  
        <th className="border px-4 py-2">Add</th>
        <th className="border px-4 py-2">Remove</th>
      
          </tr>
        </thead>
        <tbody>
         
            {
        selectData.map((data,index)=>(
         <tr key={index}>
      <td className="border px-4 py-2">{data._id}</td>
      <td className="border px-4 py-2">{data.DOC_NO}</td>
      <td className="border px-4 py-2">{data.FABRIC_GROUP}</td>
      <td className="border px-4 py-2">{data.RECD_DC_ROLL}</td>
      <td className="border px-4 py-2">{data.RECD_DC_WGT}</td>
      <th className="border ">
        <input type="text" className="outline-none w-full h-full block px-1"/>
        </th>     
      <th className="border">
      <input type="text" className="outline-none w-full h-full block px-1"/>
      </th>
      <th className="border">
      <input type="text" className="outline-none w-full h-full block px-1"/>
      </th>
      <th className="border">
      <input type="text" className="outline-none w-full h-full block px-1"/>
      </th>  
      <th className="border">
      <input type="text" className="outline-none w-full h-full block px-1"/>
      </th>  
      <th className="border">
      <input type="text" className="outline-none w-full h-full block px-1"/>
      </th>  
     <td className="border px-4 text-center">
            <button  className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer">
              Add
            </button>
          </td>

          <td className="border px-4 text-center">
            <button onClick={()=>handleRemove(index)} className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer">
              Remove
            </button>
          </td> 
      </tr>
        ))
      }
          
        </tbody>
      </table>}
    {selectData && selectData.length > 0 &&<button className="cursor-pointer bg-blue-500 px-2 py-2 rounded-2xl text-white mt-2">Submit</button>}
    </div>
  );
}
