import React, { useState } from "react";
import api from "../../../services/api";

function Reports() {
  const [balanceData, setBalanceData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getBalance = async () => {
    setLoading(true);
    try {
      const res = await api.get("/inventory/reports");
      setBalanceData(res.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching balance");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Fabric Balance</h2>

      <button onClick={getBalance}>
        {loading ? "Loading..." : "Get Balance"}
      </button>

      {/* SUMMARY */}
      {balanceData && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>Total Inward:</strong> {balanceData.totalInward}</p>
          <p><strong>Total Outward:</strong> {balanceData.totalOutward}</p>
          <p><strong>Balance:</strong> {balanceData.balance}</p>
        </div>
      )}

      {/* TABLE */}
      {balanceData?.rows?.length > 0 && (
        <table
          style={{
            marginTop: "20px",
            borderCollapse: "collapse",
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>S.No</th>
              <th style={thStyle}>Fabric Group</th>
              <th style={thStyle}>Dia</th>
              <th style={thStyle}>Roll</th>
              <th style={thStyle}>Wgt</th>
            </tr>
          </thead>

          <tbody>
            {balanceData.rows.map((row, index) => (
              <tr key={index}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{row.fabric_group}</td>
                <td style={tdStyle}>{row.dia}</td>
                <td style={tdStyle}>{row.roll}</td>
                <td style={tdStyle}>{row.wgt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  background: "#f4f4f4",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "8px",
};

export default Reports;
