import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../DataContext/DataContext";
import api from "../../../services/api";

export default function Outward() {
  const { selectData, setSelectData } = useContext(DataContext);

  const [userData, setUserData] = useState([]);
  const [colorPopupRow, setColorPopupRow] = useState(null);
  const [sizePopupRow, setSizePopupRow] = useState(null);

  if (!selectData) return <h3>No data received</h3>;

  const labels = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
    "ninth",
    "tenth",
    "eleventh",
    "twelfth",
    "thirteenth"
  ];

  const sizeKeys = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
    "ninth",
    "tenth",
    "eleventh",
    "twelfth"
  ];

  // =======================================================
  // BUILD OUTWARD ROW
  // =======================================================
  useEffect(() => {
    if (!selectData || selectData.length === 0) {
      setUserData([]);
      return;
    }

    const base = selectData[0];

    const combined = {
      _id: base._id || "",
      DATE: base.DATE || "",
      FABRIC_GROUP: base.FABRIC_GROUP || "",
      SET_NO: base.SET_NO || "",
      D_DIA: base.D_DIA || "",
      ITEM_CODE: base.ITEM_CODE || "",
      ITEM_NAME: base.ITEM_NAME || "",
      STYLE: base.STYLE || "",
      DOC_NO: {},
      COLOR_NAME: {},
      RECD_DC_ROLL: {},
      RECD_DC_WGT: {},
      ROLL: {},
      WGT: {},
      SIZE: { ...base.SIZE }
    };

    // --------------------------------------------
    // ❤️ FIX 1: NORMALIZE COLOR FROM DB
    // --------------------------------------------
    labels.forEach((label, index) => {
      const row = selectData[index];

      // If DB returns string (ex: "Blue"), convert to "first_color"
      if (typeof row?.COLOR_NAME === "string") {
        combined.COLOR_NAME[`${label}_color`] = row.COLOR_NAME;
      } else {
        combined.COLOR_NAME[`${label}_color`] =
          row?.COLOR_NAME?.[`${label}_color`] || "";
      }

      // Other fields
      combined.DOC_NO[`${label}_dcno`] =
        row?.DOC_NO?.[`${label}_dcno`] || row?.JOB_ORDER_NO || "";

      combined.RECD_DC_ROLL[`${label}_roll`] =
        row?.dc_dia?.[index]?.r_roll || "";

      combined.RECD_DC_WGT[`${label}_wgt`] =
        row?.dc_dia?.[index]?.r_wgt || "";

      combined.ROLL[`${label}_roll`] = "";
      combined.WGT[`${label}_wgt`] = "";
    });

    setUserData([combined]);
  }, [selectData]);

  // ===========================================
  // HANDLERS
  // ===========================================
  const handleFieldChange = (field, value) => {
    setUserData((prev) => [{ ...prev[0], [field]: value }]);
  };

  const handleNestedChange = (section, key, value) => {
    setUserData((prev) => [
      {
        ...prev[0],
        [section]: { ...prev[0][section], [key]: value }
      }
    ]);
  };

  function removeEmpty(obj) {
    if (Array.isArray(obj)) {
      return obj
        .map(removeEmpty)
        .filter((v) => v !== null && v !== undefined && v !== "");
    }

    if (obj && typeof obj === "object") {
      const cleaned = {};
      Object.entries(obj).forEach(([key, value]) => {
        const val = removeEmpty(value);
        if (
          val !== "" &&
          val !== null &&
          val !== undefined &&
          !(typeof val === "object" && Object.keys(val).length === 0)
        ) {
          cleaned[key] = val;
        }
      });
      return cleaned;
    }
    return obj;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cleaned = removeEmpty(userData[0]);
      await api.post("/inventory/outward", { items: [cleaned] });

      alert("Outward saved successfully!");
      setSelectData([]);
      setUserData([]);
    } catch (err) {
      console.log("Error:", err);
      alert("Saving failed.");
    }
  };




  // --------------------------------
  // 3️⃣ Render
  // --------------------------------
  if (userData.length === 0) return null;

  const mainRow = userData[0];

  return (
    <div className="overflow-x-auto uppercase p-4 flex flex-col items-center relative">
      {/* MAIN TABLE (single outward row) */}
      <table className="min-w-full border text-sm">
        <thead>
          <tr>
            
            <th className="border px-2 py-1">Fabric Group</th>
            <th className="border px-2 py-1">Set No</th>
            <th className="border px-2 py-1">DC Dia</th>
            <th className="border px-2 py-1">Item Code</th>
            <th className="border px-2 py-1">Item Name</th>
            <th className="border px-2 py-1">Style</th>
            <th className="border px-2 py-1">DcNo / Color / Roll / Wgt</th>
            <th className="border px-2 py-1">Size</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            

            <td className="border px-2 py-1">
              {mainRow.FABRIC_GROUP}
            </td>

            <td className="border px-2 py-1">
              {mainRow.SET_NO}
            </td>

            <td className="border px-2 py-1">
              {mainRow.D_DIA}
              
            </td>

            <td className="border px-2 py-1">
              <input
                className="outline-none w-full px-1"
                value={mainRow.ITEM_CODE}
                onChange={(e) => handleFieldChange("ITEM_CODE", e.target.value)}
              />
            </td>

            <td className="border px-2 py-1">
              <input
                className="outline-none w-full px-1"
                value={mainRow.ITEM_NAME}
                onChange={(e) => handleFieldChange("ITEM_NAME", e.target.value)}
              />
            </td>

            <td className="border px-2 py-1">
              <input
                className="outline-none w-full px-1"
                value={mainRow.STYLE}
                onChange={(e) => handleFieldChange("STYLE", e.target.value)}
              />
            </td>

            {/* Color popup button */}
            <td className="border px-2 py-1 text-center">
              <button
                onClick={() => setColorPopupRow(0)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Colors
              </button>
            </td>

            {/* Size popup button */}
            <td className="border px-2 py-1 text-center">
              <button
                onClick={() => setSizePopupRow(0)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Size
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="cursor-pointer bg-blue-600 px-4 py-2 rounded-xl text-white mt-4 hover:bg-blue-800"
      >
        Submit
      </button>

      {/* ===================== */}
      {/* COLOR POPUP           */}
      {/* ===================== */}
      {colorPopupRow !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl w-[900px] overflow-y-auto">
            <h2 className="text-xl font-bold text-center mb-3">
              DC No / Color / Roll / Wgt
            </h2>

            <table className="w-full border text-sm text-center">
              <thead>
                <tr>
                  <th className="border px-2 py-1">S.No</th>
                  <th className="border px-2 py-1">DC No</th>
                  <th className="border px-2 py-1">Color</th>
                  <th className="border px-2 py-1">Recv Roll</th>
                  <th className="border px-2 py-1">Recv Wgt</th>
                  <th className="border px-2 py-1">New Roll</th>
                  <th className="border px-2 py-1">New Wgt</th>
                </tr>
              </thead>

              <tbody>
                {selectData.map((item, i) => {
                  const rollKey = `${labels[i]}_roll`;
                  const wgtKey = `${labels[i]}_wgt`;
                  const colorKey = `${labels[i]}_color`;

                  return (
                    <tr key={i}>
                      <td className="border px-2 py-1">{i + 1}</td>
                      <td className="border px-2 py-1">
                        {item.JOB_ORDER_NO}
                      </td>

                      {/* ❤️ FIX 2: CORRECT COLOR BINDING */}
                      <td className="border px-2 py-1">
                        <input
                          value={mainRow.COLOR_NAME?.[colorKey] || ""}
                          onChange={(e) =>
                            handleNestedChange(
                              "COLOR_NAME",
                              colorKey,
                              e.target.value
                            )
                          }
                        />
                      </td>

                      <td className="border px-2 py-1">
                        {item.TOTAL_ROLL || ""}
                      </td>
                      <td className="border px-2 py-1">
                        {item.TOTAL_WEIGHT || ""}
                      </td>

                      <td className="border px-2 py-1">
                        <input
                          value={mainRow.ROLL?.[rollKey] || ""}
                          onChange={(e) =>
                            handleNestedChange("ROLL", rollKey, e.target.value)
                          }
                        />
                      </td>

                      <td className="border px-2 py-1">
                        <input
                          value={mainRow.WGT?.[wgtKey] || ""}
                          onChange={(e) =>
                            handleNestedChange("WGT", wgtKey, e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <button
              onClick={() => setColorPopupRow(null)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ===================== */}
      {/* SIZE POPUP            */}
      {/* ===================== */}
      {sizePopupRow !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto w-[800px]">
            <h2 className="text-xl font-semibold mb-3 text-center">Sizes</h2>

            <table className="w-full border text-sm text-center">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-2 py-1">S.No</th>
                  <th className="border px-2 py-1">Size</th>
                  <th className="border px-2 py-1">PCS Wgt</th>
                  <th className="border px-2 py-1">Fab Wgt</th>
                  <th className="border px-2 py-1">pcs</th>
                </tr>
              </thead>

              <tbody>
            {sizeKeys.map((label, i) => {
  const sizeKey = `${label}_size`;
  const pcswtKey = `${label}_size_pcs_wt`;
  const fabKey = `${label}_size_fab_wt`;
  const pcsKey = `${label}_size_pcs`;

  const row = mainRow;

  const pcswt = Number(row.SIZE?.[pcswtKey] || 0);
  const fab = Number(row.SIZE?.[fabKey] || 0);

  return (
    <tr key={label}>
      <td className="border px-2 py-1">{i + 1}</td>

      {/* SIZE */}
      <td className="border px-2 py-1">
        <input
          value={row.SIZE?.[sizeKey] || ""}
          onChange={(e) =>
            handleNestedChange("SIZE", sizeKey, e.target.value)
          }
        />
      </td>

      {/* PCS WT */}
      <td className="border px-2 py-1">
        <input
          value={row.SIZE?.[pcswtKey] || ""}
          onChange={(e) => {
            const val = e.target.value;

            // save pcswt
            handleNestedChange("SIZE", pcswtKey, val);

            // calculate PCS and save
            const pcsValue = Number(val) > 0
              ? Math.round(Number(row.SIZE[fabKey] || 0) / Number(val))
              : 0;

            handleNestedChange("SIZE", pcsKey, pcsValue);
          }}
        />
      </td>

      {/* FAB WT */}
      <td className="border px-2 py-1">
        <input
          value={row.SIZE?.[fabKey] || ""}
          onChange={(e) => {
            const val = e.target.value;

            // save fab wt
            handleNestedChange("SIZE", fabKey, val);

            // calculate PCS and save
            const pcsValue = Number(row.SIZE[pcswtKey] || 0) > 0
              ? Math.round(Number(val) / Number(row.SIZE[pcswtKey]))
              : 0;

            handleNestedChange("SIZE", pcsKey, pcsValue);
          }}
        />
      </td>

      {/* PCS (saved value) */}
      <td className="border px-2 py-1">
        <input
          className="bg-gray-100"
          value={row.SIZE?.[pcsKey] || ""}
          readOnly
        />
      </td>
    </tr>
  );
})}

              </tbody>
            </table>

            <div className="flex justify-center mt-4">
              <button
                onClick={() => setSizePopupRow(null)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
