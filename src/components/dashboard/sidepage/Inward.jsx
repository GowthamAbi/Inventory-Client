import React, { useState } from "react";
import api from "../../../services/api";

export default function Inward() {
  const [userData, setUserData] = useState({});
  const [popup, setPopup] = useState(false);

  const title = [
    "PRCESS_NAME",
    "PROCESS_DC_NO",
    "COMPACT_NAME",
    "COMPACT_NO",
    "FABRIC_GROUP",
    "COLOR_NAME",
    "SET_NO",
    "RECORD_TYPE",
    "JOB_ORDER_NO",
    "DC_DIA", // index 9 (we are handling this separately as 10.DC_DIA)
    "S.NO",
    "DIA_TYPE",
    "D_DIA",
    "D_ROLL",
    "D_WGT",
    "RECD_DC_ROLL",
    "RECD_DC_WGT",
    "DF_WGT",
    "DF_PERCE",
    "SAM_ROLL 1",
    "SAM_WGT1",
    "SAM_ROLL 2",
    "SAM_WGT2",
    "SAM_ROLL 3",
    "SAM_WGT3",
  ];

  // This describes all the DC_DIA related fields that will be generated
const diaSets = Array.from({ length: 10 }, (_, i) => ({
  // Base Fields
  dia_type: `dia_type_${i + 1}`,

  d_dia: `d_dia_${i + 1}`,
  d_roll: `d_roll_${i + 1}`,
  d_wgt: `d_wgt_${i + 1}`,

  r_dia: `r_dia_${i + 1}`,
  r_roll: `r_roll_${i + 1}`,
  r_wgt: `r_wgt_${i + 1}`,

  df_wgt: `df_wgt_${i + 1}`,
  d_prec: `d_prec_${i + 1}`,

  // Sample Roll 1
  s_roll: `s_roll_${i + 1}`,
  s_wgt: `s_wgt_${i + 1}`,

  // Sample Roll 2
  s_roll2: `s_roll2_${i + 1}`,
  s_wgt2: `s_wgt2_${i + 1}`,

  // Sample Roll 3
  s_roll3: `s_roll3_${i + 1}`,
  s_wgt3: `s_wgt3_${i + 1}`,

  // Sample Roll 4 (optional extra to make 18 fields)
  s_roll4: `s_roll4_${i + 1}`,
  s_wgt4: `s_wgt4_${i + 1}`,
}));

  const handleChange = (key, value) => {
    setUserData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dc_dia = diaSets.map((set) => ({
      dia_type: userData[set.dia_type] || "",
      d_dia: userData[set.d_dia] || "",
      d_roll: userData[set.d_roll] || "",
      d_wgt: userData[set.d_wgt] || "",
      r_dia: userData[set.r_dia] || "",
      r_roll: userData[set.r_roll] || "",
      r_wgt: userData[set.r_wgt] || "",
      df_wgt: userData[set.df_wgt] || "",
      d_prec: userData[set.d_prec] || "",
      s_roll: userData[set.s_roll] || "",
      s_wgt: userData[set.s_wgt] || "",
      s_roll2: userData[set.s_roll2] || "",
      s_wgt2: userData[set.s_wgt2] || "",
      s_roll3: userData[set.s_roll3] || "",
      s_wgt3: userData[set.s_wgt3] || "",
      s_roll4: userData[set.s_roll4] || "",
      s_wgt4: userData[set.s_wgt4] || "",
    }));

    const finalData = {
      ...userData,
      dc_dia,
    };

      const { data } = await api.post("/inventory/inward", finalData);
      alert("Data is Saved")
      setUserData({});
      setPopup(false);
    } catch (error) {
      console.log("Inventory error", error);
    }
  };

  return (
    <section className="p-4 w-full">
      <div>
        <form className="mx-auto max-w-4xl" onSubmit={handleSubmit}>
          {/* First 9 labels (1–9) */}
          <div>
            {title.map(
              (item, index) =>
                index < 9 && (
                  <div
                    className="flex border-b border-gray-300 px-2 py-4 gap-4 justify-between items-center"
                    key={index}
                  >
                    <h1 className="w-1/4 text-gray-400">
                      {index + 1}. {item}
                    </h1>
                    <input
                      className="w-3/4 outline-none border rounded px-2 py-1"
                      value={userData[item] || ""}
                      name={item}
                      onChange={(e) => handleChange(item, e.target.value)}
                    />
                  </div>
                )
            )}
          </div>

          {/* 10. DC_DIA Popup trigger */}
          <div className="flex border-b border-gray-300 px-2 py-4 gap-4 items-center">
            <h1 className="w-1/4 text-gray-400">10. DC_DIA</h1>
            <button
              type="button"
              className="bg-amber-400 px-4 py-2 rounded-2xl cursor-pointer hover:bg-amber-800 text-white"
              onClick={(e) => {
                e.preventDefault();
                setPopup(true);
              }}
            >
              CLICK HERE
            </button>
          </div>

          <button
            type="submit"
            className="mt-4 text-center border-2 bg-blue-500 text-white text-xl hover:bg-blue-800 cursor-pointer p-2 rounded-xl w-full"
          >
            SUBMIT
          </button>
        </form>
      </div>

      {/* POPUP */}
          {popup && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-5 rounded-xl shadow-2xl w-[950px] max-h-[90vh] overflow-y-auto">

      {/* HEADER */}
      
        <h2 className="text-2xl font-semibold text-center py-2">DC_DIA Entry</h2>
      

      {/* TABLE HEADER */}
      <div className="grid grid-cols-18  border bg-gray-100 text-center  rounded font-semibold text-xs ">
        <span className="border p-2 items-center ">#</span>
        <span className="border p-2 items-center ">DIA TYPE</span>
        <span className="border p-2 items-center">D DIA</span>
        <span className="border p-2 items-center">D ROLL</span>
        <span className="border p-2 items-center">D WGT</span>
        <span className="border p-2 items-center">R DIA</span>
        <span className="border p-2 items-center">R ROLL</span>
        <span className="border p-2 items-center">R WGT</span>
        <span className="border p-2 items-center">DF WGT</span>
        <span className="border p-2 items-center">D %</span>
        <span className="border p-2 items-center">S ROLL 1</span>
        <span className="border p-2 items-center">S WGT 1</span>
        <span className="border p-2 items-center">S ROLL 2</span>
        <span className="border p-2 items-center">S WGT 2</span>
        <span className="border p-2 items-center">S ROLL 3</span>
        <span className="border p-2 items-center">S WGT 3</span>
        <span className="border p-2 items-center">S ROLL 4</span>
        <span className="border p-2 items-center">S WGT 4</span>
      </div>

      {/* FORM ROWS */}
              {diaSets.map((set, index) => (
  <div
    key={index}
    className={`grid grid-cols-18  gap-0 text-sm ${
      index % 2 === 0 ? "bg-gray-50" : "bg-white"
    }`}
  >
    {/* Index */}
    <span className="border p-2 text-center font-semibold flex items-center justify-center">
      {index + 1}.
    </span>

    {/* DIA TYPE */}
    <input
      className="border text-center "
      value={userData[set.dia_type] || ""}
      onChange={(e) => handleChange(set.dia_type, e.target.value)}
    />

    {/* D_DIA */}
    <input
      className="border p-2 text-center"
      value={userData[set.d_dia] || ""}
      onChange={(e) => handleChange(set.d_dia, e.target.value)}
    />

    {/* D_ROLL */}
    <input
      className="border p-2 text-center"
      value={userData[set.d_roll] || ""}
      onChange={(e) => handleChange(set.d_roll, e.target.value)}
    />

    {/* D_WGT */}
    <input
      className="border p-2 text-center"
      value={userData[set.d_wgt] || ""}
      onChange={(e) => handleChange(set.d_wgt, e.target.value)}
    />

    {/* R_DIA */}
    <input
      className="border p-2 text-center"
      value={userData[set.r_dia] || ""}
      onChange={(e) => handleChange(set.r_dia, e.target.value)}
    />

    {/* R_ROLL */}
    <input
      className="border p-2 text-center"
      value={userData[set.r_roll] || ""}
      onChange={(e) => handleChange(set.r_roll, e.target.value)}
    />

    {/* R_WGT */}
    <input
      className="border p-2 text-center"
      value={userData[set.r_wgt] || ""}
      onChange={(e) => handleChange(set.r_wgt, e.target.value)}
    />

    {/* DF_WGT */}
    <input
      className="border p-2 text-center"
      value={userData[set.df_wgt] || ""}
      onChange={(e) => handleChange(set.df_wgt, e.target.value)}
    />

    {/* D_PREC */}
    <input
      className="border p-2 text-center"
      value={userData[set.d_prec] || ""}
      onChange={(e) => handleChange(set.d_prec, e.target.value)}
    />

    {/* S_ROLL 1 */}
    <input
      className="border p-2 text-center"
      value={userData[set.s_roll] || ""}
      onChange={(e) => handleChange(set.s_roll, e.target.value)}
    />

    {/* S_WGT 1 */}
    <input
      className="border p-2 text-center"
      value={userData[set.s_wgt] || ""}
      onChange={(e) => handleChange(set.s_wgt, e.target.value)}
    />

    {/* S_ROLL 2 */}
    <input
      className="border p-2 text-center"
      value={userData[set.s_roll2] || ""}
      onChange={(e) => handleChange(set.s_roll2, e.target.value)}
    />

    {/* S_WGT 2 */}
    <input
      className="border p-2 text-center"
      value={userData[set.s_wgt2] || ""}
      onChange={(e) => handleChange(set.s_wgt2, e.target.value)}
    />

    {/* S_ROLL 3 */}
    <input
      className="border p-2 text-center"
      value={userData[set.s_roll3] || ""}
      onChange={(e) => handleChange(set.s_roll3, e.target.value)}
    />

    {/* S_WGT 3 */}
    <input
      className="border p-2 text-center"
      value={userData[set.s_wgt3] || ""}
      onChange={(e) => handleChange(set.s_wgt3, e.target.value)}
    />

    {/* S_ROLL 4 */}
    <input
      className="border p-2 text-center"
      value={userData[set.s_roll4] || ""}
      onChange={(e) => handleChange(set.s_roll4, e.target.value)}
    />

    {/* S_WGT 4 */}
    <input
      className="border p-2 text-center"
      value={userData[set.s_wgt4] || ""}
      onChange={(e) => handleChange(set.s_wgt4, e.target.value)}
    />
  </div>
))}

        <button
          onClick={() => setPopup(false)}
          className="px-4 py-2 mt-2 text-center w-full bg-red-500 text-white rounded-lg hover:bg-red-700 cursor-pointer"
        >
          Close
        </button>
    </div>
  </div>
)}

    </section>
  );
}
