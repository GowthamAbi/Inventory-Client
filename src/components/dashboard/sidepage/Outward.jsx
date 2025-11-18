import { useContext } from "react";
import { DataContext } from "../../../DataContext/DataContext";

export default function Outward() {
  const { selectData } = useContext(DataContext);   // <-- FIXED

  if (!selectData) return <h3>No data received</h3>;


  return (
    <div>
      {
        selectData.map((data,index)=>(
        <div key={index}>
      <h1>Outward Page</h1>
      <p>Id : {data._id}</p>
      <p>DOC_NO: {data.DOC_NO}</p>
      <p>FABRIC_GROUP: {data.FABRIC_GROUP}</p>
      <p>RECD_DC_WGT: {data.RECD_DC_WGT}</p>
      <p>RECD_DC_ROLL: {data.RECD_DC_ROLL}</p>
      </div>
        ))
      }
      {console.log(selectData)}
    </div>
  );
}
