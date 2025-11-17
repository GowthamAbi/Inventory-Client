import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Orders({data}) {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="p-4 text-center">
        <p>No data found. Please go back and select a record.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }
console.log("order")
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Fabric Details</h2>
      <table className="border border-gray-300 min-w-[300px]">
        <tbody>
          {data.selectedRow.map(([key, value]) => (
            <tr key={key}>
              <td className="border px-4 py-2 font-semibold">{key}</td>
              <td className="border px-4 py-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 bg-gray-600 text-white rounded"
      >
        Back
      </button>
    </div>
  );
}

