import React, { useContext, useState } from "react";
import { DataContext } from "../../../DataContext/DataContext";
import api from "../../../services/api";
import html2pdf from "html2pdf.js";

export default function Print() {
  const { fabric } = useContext(DataContext);

  const [order_no, setOrder_no] = useState({
  JOB_ORDER_NO: "",
  ORDER_NO: ""
});

  const [userData, setUserData] = useState([]);

  const labels = [
    "first", "second", "third", "fourth", "fifth",
    "sixth", "seventh", "eighth", "ninth", "tenth",
    "eleventh", "twelfth", "thirteenth"
  ];

  const safeDisplay = (obj) => {
    if (!obj) return "";
    if (typeof obj === "string" || typeof obj === "number") return obj;
    return Object.values(obj).filter(Boolean).join(", ");
  };

  const fabricList = async () => {
  try {
    const response = await api.post("/inventory/print/1", {
      JOB_ORDER_NO: order_no.JOB_ORDER_NO,
    });

    

    setUserData(response.data); // <-- must be an array
  } catch (error) {
    console.log("Fabric Print Error:", error);
  }
};


  const cutting = async () => {
    try {
      const response = await api.post("/inventory/print/2", {
        ORDER_NO: order_no.ORDER_NO,
      });
      setUserData(response.data);
    } catch (error) {
      console.log("Cutting Print Error:", error);
    }
  };

  const handlePrint = () => window.print();

  const handleDownload = () => {
    const element = document.getElementById("print-area");
    html2pdf().from(element).save(`${order_no.ORDER_NO}`);
  };

  const data = userData[0];

const totals = data?.dc_dia?.reduce(
  (acc, row) => {
    acc.d_roll += Number(row.d_roll || 0);
    acc.d_wgt += Number(row.d_wgt || 0);
    acc.t_roll += Number(row.t_roll || 0);
    acc.t_wgt += Number(row.t_wgt || 0);
    acc.df_wgt += Number(row.df_wgt || 0);
    acc.d_prec += (Number(row.d_prec || 0));
    return acc;
  },
  {
    d_roll: 0,
    d_wgt: 0,
    t_roll: 0,
    t_wgt: 0,
    df_wgt: 0,
    d_prec: 0
  }
);


  

  return (
    <div className="flex flex-col items-center py-4 mx-auto max-w-4xl">

      {/* SEARCH PANEL */}
      <div className="flex gap-2 items-center pb-4">
  
         {fabric === "fabric" ? (
          <div className="flex gap-6 text-gray-400">
          <label >Enter Job Order No :</label>
          <input
            type="text"
            className="border px-2 outline-none rounded-2xl text-center"
            value={order_no.JOB_ORDER_NO}
            onChange={(e) =>
              setOrder_no({ ...order_no, JOB_ORDER_NO: e.target.value })
            }
          /></div>):
            <div className="flex gap-6 text-gray-400">
          <label>Enter Order No :</label>
          <input type="text" className="border px-2 outline-none rounded-2xl text-center"
          value={order_no.ORDER_NO} 
          onChange={(e) => setOrder_no({ ...order_no, ORDER_NO: e.target.value }) } 
          />
          </div>
          }

  <button
    className="bg-blue-500 text-white px-3 py-1 rounded-2xl cursor-pointer"
    onClick={() => (fabric === "fabric" ? fabricList() : cutting())}
  >
    Submit
  </button>
</div>
      {/* PRINT + DOWNLOAD */}
      {userData.length > 0 && (
        <div className="flex gap-3 pb-4">
          <button onClick={handlePrint} className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer">
            Print
          </button>

          <button onClick={handleDownload} className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer">
            Download PDF
          </button>
        </div>
      )}

      {/* PRINT AREA */}
      <div id="print-area" className="w-full max-w-4xl print:p-0 print-no-colors">

        {/* ========= FABRIC PRINT ========= */}
        {fabric === "fabric" && data && (
          <div className="grid grid-cols-13 border border-black uppercase text-center">

            <h1 className="col-span-13 border text-2xl py-4">R AND R TEXTILE</h1>
            <h1 className="col-span-13 border text-2xl py-2">COLOR FABRIC RECEIVED DETAILS</h1>

            <div className="col-span-13 border text-xl grid grid-cols-4">
              <h1 className="border p-2">Process Name : {safeDisplay(data.PROCESS_NAME)}</h1>
              <h1 className="border p-2">DC No : {safeDisplay(data.PROCESS_DC_NO)}</h1>
              <h1 className="border p-2">Compact Name : {safeDisplay(data.COMPACT_NAME)}</h1>
              <h1 className="border p-2">Compact DC No : {safeDisplay(data.COMPACT_NO)}</h1>
            </div>

            <div className="col-span-13 border text-xl grid grid-cols-3">
              <h1 className="border p-2">Fabric Group : {safeDisplay(data.FABRIC_GROUP)}</h1>
              <h1 className="border p-2">Color : {safeDisplay(data.COLOR_NAME)}</h1>
              <h1 className="border p-2">Set No : {safeDisplay(data.SET_NO)}</h1>
            </div>

            {/* TABLE HEADER */}
            <h1 className="border p-2">S No</h1>
            <h1 className="border p-2">Type</h1>
            <h1 className="border p-2">Job Order No</h1>
            <h1 className="border p-2">Dia</h1>
            <h1 className="border p-2">Dia Type</h1>
            <h1 className="border p-2">Recd Roll</h1>
            <h1 className="border p-2">Recd Wgt</h1>
            <h1 className="border p-2">sam roll 1</h1>
            <h1 className="border p-2">sam wgt 1</h1>
            <h1 className="border p-2">sam roll 2</h1>
            <h1 className="border p-2">sam wgt 2</h1>
            <h1 className="border p-2">sam roll 3</h1>
            <h1 className="border p-2">sam wgt 3</h1>

            {/* ROWS */}
            {data.dc_dia?.map((row, index) => (
              <React.Fragment key={row._id}>
                <h1 className="border p-2">{index + 1}</h1>
                <h1 className="border p-2">{safeDisplay(data.RECORD_TYPE)}</h1>
                <h1 className="border p-2">{safeDisplay(data.JOB_ORDER_NO)}</h1>
                <h1 className="border p-2">{safeDisplay(row.d_dia)}</h1>
                <h1 className="border p-2">{safeDisplay(row.dia_type)}</h1>
                <h1 className="border p-2">{safeDisplay(row.r_roll)}</h1>
                <h1 className="border p-2">{safeDisplay(row.r_wgt)}</h1>

                <h1 className="border p-2">{safeDisplay(row.s_roll)}</h1>
                <h1 className="border p-2">{safeDisplay(row.s_wgt)}</h1>
                <h1 className="border p-2">{safeDisplay(row.s_roll2)}</h1>
                <h1 className="border p-2">{safeDisplay(row.s_wgt2)}</h1>
                <h1 className="border p-2">{safeDisplay(row.s_roll3)}</h1>
                <h1 className="border p-2">{safeDisplay(row.s_wgt3)}</h1>
              </React.Fragment>
            ))}
         
             <h1 className="col-span-13 border text-2xl py-2"> RECEIVED FABRIC DETAILS AND JOB ORDER FINALIZED</h1>
              <h1 className="border p-2">S No</h1>
            <h1 className="border p-2">dia</h1>
            <h1 className="border p-2">roll</h1>
            <h1 className="col-span-2 border p-2">dc wgt</h1>
            <h1 className="col-span-2 border p-2">recd roll</h1>
            <h1 className="col-span-2 border p-2">recd wgt</h1>
            <h1 className="col-span-2 border p-2">diff wgt</h1>
            <h1 className="col-span-2 border p-2">%</h1>
            
            {data.dc_dia?.map((row, index) => (
              <React.Fragment key={row._id}>
                <h1 className="border p-2">{index + 1}</h1>
                <h1 className="border p-2">{safeDisplay(row.d_dia)}</h1>
                <h1 className="border p-2">{safeDisplay(row.d_roll)}</h1>
                <h1 className=" col-span-2 border p-2">{safeDisplay(row.d_wgt)}</h1>

                <h1 className="col-span-2 border p-2">{safeDisplay(row.t_roll)}</h1>
                <h1 className="col-span-2 border p-2">{safeDisplay(row.t_wgt)}</h1>
                <h1 className="col-span-2 border p-2">{safeDisplay(row.df_wgt)}</h1>
                <h1 className="col-span-2 border p-2">{safeDisplay(row.d_prec)}</h1>
              </React.Fragment>
            ))}

              <h1 className="col-span-2 border p-2 font-semibold text-center">Total</h1>

              <h1 className="border p-2">{totals.d_roll}</h1>
              <h1 className="col-span-2 border p-2">{totals.d_wgt}</h1>

              <h1 className="col-span-2 border p-2">{totals.t_roll}</h1>
              <h1 className="col-span-2 border p-2">{totals.t_wgt}</h1>

              <h1 className="col-span-2 border p-2">{totals.df_wgt}</h1>

              <h1 className="col-span-2 border p-2">{totals.d_prec}</h1>
              
          <div className="col-span-13 border text-2xl">
            {(totals.d_roll===totals.t_roll)?(
              <div className="grid grid-cols-3 text-center pt-4">
                <div>
                  <h1 className="font-semibold">prepared by</h1>
                <div className="mt-12 border-t border-dotted pt-4 w-32 mx-auto"></div>
                  </div>
                <h1 className="font-semibold">LOT COMPLETED</h1>

                <div>
    <h1 className="font-semibold">Color Fabric Warehouse Incharge</h1>
    <div className="mt-12 border-t border-dotted pt-4 w-64 mx-auto"></div>
  </div>
              </div>):
              (
<div className="grid grid-cols-3 text-center pt-4">
  <div>
    <h1 className="font-semibold">Prepared By</h1>
    <div className="mt-12 border-t border-dotted pt-4 w-32 mx-auto"></div>
  </div>

  <div>
    <h1 className="font-semibold">LOT PENDING</h1>
    
  </div>

  <div>
    <h1 className="font-semibold">Color Fabric Warehouse Incharge</h1>
    <div className="mt-12 border-t border-dotted pt-4 w-64 mx-auto"></div>
  </div>
</div>
)
              }
          </div>

          </div>
        )}

        {/* ========= CUTTING PRINT ========= */}
        {fabric !== "fabric" && data && (
          <div className="grid grid-cols-6 border border-black uppercase text-center">

            <h1 className="col-span-6 border text-2xl font-bold py-1">R AND R TEXTILE</h1>
            <h1 className="col-span-6 border text-2xl font-bold py-1">RRP3 LAY CUTTING</h1>

            <div className="col-span-1 grid grid-rows-6 font-semibold">
              <div className="border p-1">lot gsm</div>
              <div className="border p-1">r gsm</div>
              <div className="border p-1">dc no</div>
              <div className="border p-1">set no</div>
              <div className="border p-1">item</div>
              <div className="border p-1">size</div>
            </div>

            <div className="col-span-2 grid grid-rows-6">
              <input className="border p-1 print:border-none" />
              <input className="border p-1 print:border-none" />
              <input className="border p-1 print:border-none" />
              <div className="border p-1">{safeDisplay(data.SET_NO)}</div>
              <div className="border p-1">{safeDisplay(data.ITEM_NAME)}</div>

              <div className="border p-1 flex flex-wrap gap-1 justify-center">
                {userData.map((item) =>
                  labels.map((label) => {
                    const sizeValue = item.SIZE?.[`${label}_size`];
                    if (!sizeValue || sizeValue <= 0) return null;
                    return <span key={label}>{safeDisplay(sizeValue)},</span>;
                  })
                )}
              </div>
            </div>

            <div className="col-span-1 grid grid-rows-6 font-semibold">
              <div className="border p-1">T Dia</div>
              <div className="border p-1">j or no</div>
              <div className="border p-1">c p no</div>
              <div className="border p-1">pcs</div>
              <div className="border p-1">date</div>
              <div className="border p-1">dia</div>
            </div>

            <div className="col-span-2 grid grid-rows-6">
              <input className="border p-1 print:border-none" />
              <input className="border p-1 print:border-none" />
              <input className="border p-1 print:border-none" />
              <input className="border p-1 print:border-none" />
              <input className="border p-1 print:border-none" />
              <input className="border p-1 print:border-none" />
            </div>

            <div className="col-span-6 grid grid-cols-6 mt-2">
              <div className="border p-1 font-semibold">quality</div>
              <input className="border col-span-5 p-1 print:border-none" />
            </div>

            <div className="col-span-6 mt-2">
              <table className="w-full border text-center">
                <thead className="bg-gray-100 font-semibold">
                  <tr>
                    <th className="border p-2">s no</th>
                    <th className="border p-2">batch no</th>
                    <th className="border p-2">colour</th>
                    <th className="border p-2">roll</th>
                    <th className="border p-2">weight</th>
                    <th className="border p-2">remarks</th>
                  </tr>
                </thead>

                <tbody>
                  {labels.map((label, index) => (
                    userData.length>index && <tr key={label}>
                      <td className="border p-1">{index + 1}</td>

                      <td className="border p-1">
                        {safeDisplay(data.DOC_NO?.[`${label}_dcno`])}
                      </td>

                      <td className="border p-1">
                        {safeDisplay(data.COLOR_NAME?.[`${label}_color`])}
                      </td>

                      <td className="border p-1">
                        {safeDisplay(data.ROLL?.[`${label}_roll`])}
                      </td>

                      <td className="border p-1">
                        {safeDisplay(data.WGT?.[`${label}_wgt`])}
                      </td>

                      <td className="border p-1"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="col-span-6 mt-2">
              <table className="w-full border text-center">
                <thead className="bg-gray-100 font-semibold">
                  <tr>
                    <th className="border p-2">s no</th>
                    <th className="border p-2">Size</th>
                    <th className="border p-2">pcs wt</th>
                    <th className="border p-2">pcs</th>
                    <th className="border p-2">total wt</th>
                    <th className="border p-2">remarks</th>
                  </tr>
                </thead>

               <tbody>
  {labels.map((label, index) => (
    <React.Fragment key={index}>

      {/* MAIN ROW (First row) */}
      
        
    

      {/* SUB ROWS (data rows) */}
      {userData.map((item, idx) => {
        const sizeValue = item.SIZE?.[`${label}_size`];
        const pcswtValue = item.SIZE?.[`${label}_size_pcs_wt`];
        const pcsValue = item.SIZE?.[`${label}_size_pcs`];
        const fabwtValue = item.SIZE?.[`${label}_size_fab_wt`];

        // skip empty rows
        if (!sizeValue && !pcswtValue && !pcsValue && !fabwtValue) return null;

        return (
          <tr key={`${idx}-${label}`} className="bg-gray-50">
          <td className="border p-1">{index + 1}</td>
            

            <td className="border p-1">{sizeValue || ""}</td>
            <td className="border p-1">{pcswtValue || ""}</td>
            <td className="border p-1">{pcsValue || ""}</td>
            <td className="border p-1">{fabwtValue || ""}</td>
            <td className="border p-1"></td>
          </tr>
        );
      })}

    </React.Fragment>
  ))}
</tbody>

              </table>
            </div>

            <div className="col-span-6 mt-2 flex justify-around">
                <div>
                  <h1 className="font-semibold">Prepared By</h1>
                  <div className="mt-12 border-t border-dotted pt-4 w-32 mx-auto"></div>
                </div>

                <div>
                  <h1 className="font-semibold">Color Fabric Warehouse Incharge</h1>
                  <div className="mt-12 border-t border-dotted pt-4 w-64 mx-auto"></div>
                </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
