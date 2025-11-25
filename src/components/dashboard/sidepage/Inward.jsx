import React, { useState } from "react";
import api from "../../../services/api";

export default function Inward() {
  // 10 rows
  const [userData, setUserData] = useState(
    Array.from({ length: 10 }, () => ({}))
  );

  const [popup, setPopup] = useState(false);
  const [num, setNum] = useState(0);

  const title = [
    "PROCESS_NAME",
    "PROCESS_DC_NO",
    "COMPACT_NAME",
    "COMPACT_NO",
    "FABRIC_GROUP",
    "COLOR_NAME",
    "SET_NO",
    "RECORD_TYPE",
    "JOB_ORDER_NO",
    "DC_DIA",
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
    "TOTAL_ROLL",
    "TOTAL_WEIGHT",
    "BATCH_NO"
  ];

  // Dynamic field names for 10 rows
  const diaSets = Array.from({ length: 10 }, (_, i) => ({
    dia_type: `dia_type_${i + 1}`,
    d_dia: `d_dia_${i + 1}`,
    d_roll: `d_roll_${i + 1}`,
    d_wgt: `d_wgt_${i + 1}`,
    r_roll: `r_roll_${i + 1}`,
    r_wgt: `r_wgt_${i + 1}`,
    df_wgt: `df_wgt_${i + 1}`,
    d_prec: `d_prec_${i + 1}`,
    s_roll: `s_roll_${i + 1}`,
    s_wgt: `s_wgt_${i + 1}`,
    s_roll2: `s_roll2_${i + 1}`,
    s_wgt2: `s_wgt2_${i + 1}`,
    s_roll3: `s_roll3_${i + 1}`,
    s_wgt3: `s_wgt3_${i + 1}`,
    s_roll4: `s_roll4_${i + 1}`,
    s_wgt4: `s_wgt4_${i + 1}`,
    t_roll:`t_roll_${i + 1}`,
    t_wgt:`t_wgt_${i + 1}`,
    batch_no:`batch_no_${i + 1}`,
  }));

  // Proper handleChange with auto-calculation
  const handleChange = (index, key, value) => {
  setUserData((prev) => {
    const updated = [...prev];
    const row = { ...updated[index], [key]: value };

    const s = diaSets[index];

    const d = Number(row[s.d_wgt]);
    const r = Number(row[s.r_wgt]);
    const recroll = Number(row[s.r_roll]);
    
    let smr = Number(row[s.s_roll]);
    let smw = Number(row[s.s_wgt]);

    for (let i = 2; i <= 4; i++) {
      smr += Number(row[`s_roll${i}_${index + 1}`]);
      smw += Number(row[`s_wgt${i}_${index + 1}`]);
    }



    // AUTO TOTAL ROLL & WEIGHT
    if (
      Number.isFinite(recroll) &&
      Number.isFinite(r) &&
      Number.isFinite(smr) &&
      Number.isFinite(smw)
    ) {
      row[s.t_roll] = recroll + smr;
      let tr = r + smw;
      row[s.t_wgt]=(tr).toFixed(2)
    }

      const tr = Number(row[s.t_wgt]);
    // AUTO DF_WGT & %
    if (Number.isFinite(d) && Number.isFinite(tr)) {
      row[s.df_wgt] = (d - tr).toFixed(2);
      row[s.d_prec] = d !== 0 ? ((((d - tr) / d) * 100).toFixed(3)) : "";
    }

    // ALWAYS AUTO-FILL BATCH NUMBER
    row[s.batch_no] = `25-26/${updated[0]?.JOB_ORDER_NO || ""}/${updated[0]?.COLOR_NAME || ""}/${row[s.d_dia] || ""}/${index + 1}`;

    updated[index] = row;
    return updated;
  });
};


  // Submit data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dc_dia = userData.map((row, i) => {
      const f = diaSets[i];
      return {
        dia_type: row[f.dia_type] || 0,
        d_dia: row[f.d_dia] || null,
        d_roll: row[f.d_roll] || null,
        d_wgt: row[f.d_wgt] || null,
 
        r_roll: row[f.r_roll] || null,
        r_wgt: row[f.r_wgt] || null,
        df_wgt: row[f.df_wgt] || null,
        d_prec: row[f.d_prec] || null,
        s_roll: row[f.s_roll] || null,
        s_wgt: row[f.s_wgt] || null,
        s_roll2: row[f.s_roll2] || null,
        s_wgt2: row[f.s_wgt2] || null,
        s_roll3: row[f.s_roll3] || null,
        s_wgt3: row[f.s_wgt3] || null,
        s_roll4: row[f.s_roll4] || null,
        s_wgt4: row[f.s_wgt4] || null,
        t_roll: row[f.t_roll] || null,
        t_wgt: row[f.t_wgt] || null,
        batch_no:row[f.batch_no] || null
      };
    });

    const sendable = {
      ...Object.fromEntries(
        Object.entries(userData[0] || {}).filter(([_, v]) => v !== "")
      ),
      dc_dia,
    };

    try {

      console.log("sendable",sendable)
      await api.post("/inventory/inward", sendable);
      alert("Saved Successfully!");

      
      setPopup(false);
      setNum(0);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <section className="p-4 w-full">
      <form className="mx-auto max-w-4xl" onSubmit={handleSubmit}>
        
        {/* FIRST 9 FIELDS */}
        {title.map(
          (item, index) =>
            index < 9 && (
              <div
                key={index}
                className="flex justify-between items-center border-b py-3"
              >
                <label className="w-1/3 text-gray-500">
                  {index + 1}. {item}
                </label>
                <input
                  className="border rounded p-2 w-2/3"
                  value={userData[0][item] || ""}
                  onChange={(e) => handleChange(0, item, e.target.value)}
                />
              </div>
            )
        )}

        {/* NO OF ROWS */}
        <div className="flex items-center border-b py-3">
          <label className="w-1/3 text-gray-500">10. NO OF DIA</label>
          <input
            type="number"
            className="border rounded p-2 w-20 text-center"
            value={num}
            onChange={(e) => setNum(Number(e.target.value))}
          />

          <button
            type="button"
            className="ml-4 bg-amber-500 text-white px-4 py-2 rounded"
            onClick={() => setPopup(true)}
          >
            CLICK HERE
          </button>
        </div>

        <button className="w-full mt-4 bg-blue-500 text-white p-3 rounded-lg">
          SUBMIT
        </button>
      </form>

      {/* POPUP */}
      {popup && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-5 rounded-xl w-full max-h-[90vh] overflow-y-auto  overflow-x-auto">
            <h1 className="text-xl font-semibold text-center mb-3">
              DC_DIA Entry
            </h1>

            {/* Header */}
<div className="grid grid-cols-20 bg-gray-100 text-xs font-semibold text-center border rounded w-full sticky top-0 z-10">
  {[
    "#","BATCH_NO","DIA TYPE","D DIA","D ROLL","D WGT","R ROLL","R WGT",
    "DF WGT","D %","S ROLL 1","S WGT 1","S ROLL 2","S WGT 2",
    "S ROLL 3","S WGT 3","S ROLL 4","S WGT 4","TOTAL ROLL","TOTAL WGT"
  ].map((h, i) => (
    <span
      key={i}
      className="p-2 border  break-words whitespace-normal leading-tight text-center"
    >
      {h}
    </span>
  ))}
</div>


            {/* Dynamic Rows */}
            {diaSets.map((set, index) =>
              num > index ? (
                <div key={index} className="grid grid-cols-20 text-sm border-b">

                  {/* Index */}
                  <span className="border p-2 text-center">{index + 1}</span>
                   <input className="border  text-center break-all h-16 text-wrap "
                value={userData[index]?.[set.batch_no] ?? ""}
                onChange={(e) =>
                  handleChange(index, set.batch_no, e.target.value)
                }
              />

                  {/* Editable fields */}
                  {[
                     set.dia_type, set.d_dia, set.d_roll, set.d_wgt,
                     set.r_roll, set.r_wgt
                  ].map((field) => (
                    <input
                      key={field}
                      className="border p-2 text-center"
                      value={userData[index][field] || ""}
                      onChange={(e) =>
                        handleChange(index, field, e.target.value)
                      }
                    />
                  ))}

                  {/* AUTO DF_WGT */}
                  <span className="border p-2 text-center text-wrap">
                    {userData[index]?.[set.df_wgt] || ""}
                  </span>

                  {/* AUTO PREC */}
                  <span className="border p-2 text-center text-wrap">
                    {userData[index]?.[set.d_prec] || ""}
                  </span>

                  {/* Samples */}
                  {[
                    set.s_roll, set.s_wgt, set.s_roll2, set.s_wgt2,
                    set.s_roll3, set.s_wgt3, set.s_roll4, set.s_wgt4
                  ].map((field) => (
                    <input
                      key={field}
                      className="border p-2 text-center"
                      value={userData[index][field] || ""}
                      onChange={(e) =>
                        handleChange(index, field, e.target.value)
                      }
                    />
                  ))}

                    {/* AUTO DF_WGT */}
                  <span className="border p-2 text-center">
                    {userData[index]?.[set.t_roll] || ""}
                  </span>

                  {/* AUTO PREC */}
                  <span className="border p-2 text-center">
                    {userData[index]?.[set.t_wgt] || ""}
                  </span>

                </div>
              ) : null
            )}

            <button
              className="w-full bg-red-500 text-white p-2 mt-3 rounded"
              onClick={() => setPopup(false)}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
