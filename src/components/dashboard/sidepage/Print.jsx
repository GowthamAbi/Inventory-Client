import React, { useContext, useState } from "react";
import { DataContext } from "../../../DataContext/DataContext";
import api from "../../../services/api";
import html2pdf from "html2pdf.js";

export default function Print() {
  const { fabric } = useContext(DataContext);

  const [order_no, setOrder_no] = useState({ ORDER_NO: "" });
  const [userData, setUserData] = useState([]);

  const labels = [
    "first", "second", "third", "fourth", "fifth",
    "sixth", "seventh", "eighth", "ninth", "tenth",
    "eleventh", "twelfth", "thirteenth"
  ];

  // Convert nested objects into printable string
  const safeDisplay = (obj) => {
    if (!obj) return "";
    if (typeof obj === "string" || typeof obj === "number") return obj;
    return Object.values(obj).filter(Boolean).join(", ");
  };

  // Fetch fabric print data
  const fabricList = async () => {
    try {
      const response = await api.post("/inventory/print/1", {
        ORDER_NO: order_no.ORDER_NO,
      });
      setUserData(response.data);
    } catch (error) {
      console.log("Fabric Print Error:", error);
    }
  };

  // Fetch cutting print data
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

  // Print page
  const handlePrint = () => window.print();

  // Download PDF
  const handleDownload = () => {
    const element = document.getElementById("print-area");
    html2pdf().from(element).save("print.pdf");
  };

  return (
    <div className="flex flex-col items-center py-4">

      {/* ============ Search Panel =============== */}
      <div className="flex gap-2 items-center pb-4">
        <label>Enter ORDER_NO :</label>
        <input
          type="text"
          className="border px-2 outline-none"
          value={order_no.ORDER_NO}
          onChange={(e) =>
            setOrder_no({ ...order_no, ORDER_NO: e.target.value })
          }
        />

        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => (fabric === "fabric" ? fabricList() : cutting())}
        >
          Submit
        </button>
      </div>

      {/* PRINT + DOWNLOAD buttons */}
      {userData.length > 0 && (
        <div className="flex gap-3 pb-4">
          <button onClick={handlePrint} className="bg-green-600 text-white px-3 py-1 rounded">
            Print
          </button>

          <button onClick={handleDownload} className="bg-red-600 text-white px-3 py-1 rounded">
            Download PDF
          </button>
        </div>
      )}

      {/* ============ PRINT AREA =============== */}
      <div id="print-area" className="w-full max-w-4xl print:p-0">


        {/* ===================== FABRIC PRINT ===================== */}
        {fabric === "fabric" && (
          <div className="grid grid-cols-6 border border-black uppercase text-center">

            <h1 className="col-span-6 border text-2xl">R AND R TEXTILE</h1>
            <h1 className="col-span-6 border text-2xl">RRP3 FABRIC</h1>

            {/* LEFT LABELS */}
            <div className="col-span-1 grid grid-rows-6">
              <div className="border">lot gsm</div>
              <div className="border">r gsm</div>
              <div className="border">dc no</div>
              <div className="border">set no</div>
              <div className="border">item</div>
              <div className="border">size</div>
            </div>

            {/* LEFT INPUTS */}
            <div className="col-span-2 grid grid-rows-6">
              <input className="border print:border-none" />
              <input className="border print:border-none" />
              <input className="border print:border-none" />
              <input className="border print:border-none" />
              <input className="border print:border-none" />
              <input className="border print:border-none" />
            </div>

            {/* RIGHT LABELS */}
            <div className="col-span-1 grid grid-rows-6">
              <div className="border">T Dia</div>
              <div className="border">j or no</div>
              <div className="border">c p no</div>
              <div className="border">pcs</div>
              <div className="border">date</div>
              <div className="border">dia</div>
            </div>

            {/* RIGHT INPUTS */}
            <div className="col-span-2 grid grid-rows-6">
              <input className="border print:border-none" />
              <input className="border print:border-none" />
              <input className="border print:border-none" />
              <input className="border print:border-none" />
              <input className="border print:border-none" />
              <input className="border print:border-none" />
            </div>

            {/* QUALITY */}
            <div className="col-span-6 grid grid-cols-6 mt-2">
              <div className="border">quality</div>
              <input className="border col-span-5 print:border-none" />
            </div>

            {/* TABLE HEADINGS */}
            <div className="col-span-6 grid grid-cols-6 border mt-2">
              <div className="border">s no</div>
              <div className="border">batch no</div>
              <div className="border">colour</div>
              <div className="border">roll</div>
              <div className="border">system weight</div>
              <div className="border">physical weight</div>
            </div>

          </div>
        )}


        {/* ===================== CUTTING PRINT ===================== */}
        {fabric !== "fabric" && userData.length > 0 && (

          <div className="grid grid-cols-6 border border-black uppercase text-center">

            <h1 className="col-span-6 border text-2xl">R AND R TEXTILE</h1>
            <h1 className="col-span-6 border text-2xl">RRP3 LAY CUTTING</h1>

            {/* LEFT LABELS */}
            <div className="col-span-1 grid grid-rows-6">
              <div className="border">lot gsm</div>
              <div className="border">r gsm</div>
              <div className="border">dc no</div>
              <div className="border">set no</div>
              <div className="border">item</div>
              <div className="border">size</div>
            </div>

            {/* LEFT VALUES */}
            <div className="col-span-2 grid grid-rows-6">
              <input className="border print:border-none" />
              <input className="border print:border-none" />
              <input className="border print:border-none" />

              <div className="border">{userData[0].SET_NO}</div>
              <div className="border">{safeDisplay(userData[0].ITEM_NAME)}</div>

              {/* FIX FOR SIZE → Safely join values */}
              <div className="border">
                {safeDisplay(userData[0].SIZE)}
              </div>
            </div>

            {/* RIGHT LABELS */}
            <div className="col-span-1 grid grid-rows-6">
              <div className="border">T Dia</div>
              <div className="border">j or no</div>
              <div className="border">c p no</div>
              <div className="border">pcs</div>
              <div className="border">date</div>
              <div className="border">dia</div>
            </div>

            {/* RIGHT INPUTS */}
            <div className="col-span-2 grid grid-rows-6">
              <input className="border print:border-none" />
              <input className="border print:border-none" />
              <input className="border print:border-none" />
              <input className="border print:border-none" />
              <input className="border print:border-none" />
              <input className="border print:border-none" />
            </div>

            {/* QUALITY */}
            <div className="col-span-6 grid grid-cols-6 mt-2">
              <div className="border">quality</div>
              <input className="border col-span-5 print:border-none" />
            </div>

            {/* CUTTING TABLE */}
            <div className="col-span-6 mt-2">
              <table className="w-full border text-center">
                <thead>
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
                    <tr key={label}>
                      <td className="border p-1">{index + 1}</td>
                      <td className="border p-1">{userData[0].DOC_NO?.[`${label}_dcno`] || ""}</td>
                      <td className="border p-1">{userData[0].COLOR_NAME?.[`${label}_color`] || ""}</td>
                      <td className="border p-1">{userData[0].ROLL?.[`${label}_roll`] || ""}</td>
                      <td className="border p-1">{userData[0].WGT?.[`${label}_wgt`] || ""}</td>

                      <td className="border p-1">
                        <input className="w-full outline-none text-center print:border-none" />
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
