import React, { useState, useEffect } from "react";
import api from "../../../services/api";

function Reports() {
  const [balanceData, setBalanceData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePrint = () => window.print();

  useEffect(() => {
    const getBalance = async () => {
      setLoading(true);
      try {
        const res = await api.get("/inventory/reports");
        setBalanceData(res.data);
        console.log("data", res.data);
      } catch (error) {
        console.error("Error:", error);
        alert("Error fetching balance");
      }
      setLoading(false);
    };

    getBalance();
  }, []);

  return (
    <div className="p-4 mx-auto max-w-8xl">

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="no-print bg-blue-600 text-white px-4 py-2 rounded mx-auto max-w-2xl cursor-pointer"
      >
        Print
      </button>

      {/* PRINT CONTENT */}
      <div id="print-area" className="print-container no-print-overflow mx-auto">

        <h2 className="text-xl font-semibold text-center mb-3 no-print">
          Fabric Balance Report
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-300">
              <th className="border p-2 text-center">S NO</th>
              <th className="border p-2 text-center">BATCH NO</th>
              <th className="border p-2 text-center">Fabric Group</th>
              <th className="border p-2 text-center">Colour Name</th>
              <th className="border p-2 text-center">Set No</th>
              <th className="border p-2 text-center">Color Name</th>
              <th className="border p-2 text-center">DIA</th>
              <th className="border p-2 text-center">ROLL</th>
              <th className="border p-2 text-center">WEIGHT</th>
            </tr>
          </thead>

          <tbody>
            {balanceData.map((item, i) => (
              <tr key={i} className="border">
                <td className="border p-2 text-center break-all">{i+1}</td>
                <td className="border p-2 text-center break-all">{item.BATCH_NO}</td>
                <td className="border p-2 text-center">{item.FABRIC_GROUP}</td>
                <td className="border p-2 text-center">{item.COLOR_NAME}</td>
                <td className="border p-2 text-center">{item.SET_NO}</td>
                <td className="border p-2 text-center">{item.COLOR_NAME}</td>
                <td className="border p-2 text-center">{item.D_DIA}</td>
                <td className="border p-2 text-center">{item.TOTAL_ROLL}</td>
                <td className="border p-2 text-center">{item.TOTAL_WEIGHT}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Reports;
