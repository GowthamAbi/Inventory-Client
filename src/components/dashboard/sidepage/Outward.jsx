import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../DataContext/DataContext";
import api from "../../../services/api";

export default function Outward() {
  const { selectData, setSelectData } = useContext(DataContext);

  const [userData, setUserData] = useState([]);
  const [colorPopupRow, setColorPopupRow] = useState(null);
  const [sizePopupRow, setSizePopupRow] = useState(null);

  if (!selectData) return <h3>No data received</h3>;

  // For combining multi rows' dc/color/roll/wgt into one outward row
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

  // For size popup fields
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

  // --------------------------------
  // 1️⃣ Build single outward row
  // --------------------------------
  useEffect(() => {
    if (!selectData || selectData.length === 0) {
      setUserData([]);
      return;
    }

    // base from first row (fabric group, style, etc.)
    const base = selectData[0];

    const combined = {
      _id: base._id || "",
      DATE: base.DATE || "",
      FABRIC_GROUP: base.FABRIC_GROUP || "",
      SET_NO: base.SET_NO || "",
      DC_DIA: base.DC_DIA || "",
      ITEM_CODE: base.ITEM_CODE || "",
      ITEM_NAME: base.ITEM_NAME || "",
      STYLE: base.STYLE || "",

      DOC_NO: {},
      COLOR_NAME: {},
      RECD_DC_ROLL: {},
      RECD_DC_WGT: {},
      ROLL: {},
      WGT: {},

      // SIZE from first row (if available)
      SIZE: {
  first_size: base.SIZE?.first_size || "",
  first_size_pcs_wt: base.SIZE?.first_size_pcs_wt || "",
  first_size_fab_wt: base.SIZE?.first_size_fab_wt || "",
  first_size_pcs: base.SIZE?.first_size_pcs || "",

  second_size: base.SIZE?.second_size || "",
  second_size_pcs_wt: base.SIZE?.second_size_pcs_wt || "",
  second_size_fab_wt: base.SIZE?.second_size_fab_wt || "",
  second_size_pcs: base.SIZE?.second_size_pcs || "",

  third_size: base.SIZE?.third_size || "",
  third_size_pcs_wt: base.SIZE?.third_size_pcs_wt || "",
  third_size_fab_wt: base.SIZE?.third_size_fab_wt || "",
  third_size_pcs: base.SIZE?.third_size_pcs || "",

  fourth_size: base.SIZE?.fourth_size || "",
  fourth_size_pcs_wt: base.SIZE?.fourth_size_pcs_wt || "",
  fourth_size_fab_wt: base.SIZE?.fourth_size_fab_wt || "",
  fourth_size_pcs: base.SIZE?.fourth_size_pcs || "",

  fifth_size: base.SIZE?.fifth_size || "",
  fifth_size_pcs_wt: base.SIZE?.fifth_size_pcs_wt || "",
  fifth_size_fab_wt: base.SIZE?.fifth_size_fab_wt || "",
  fifth_size_pcs: base.SIZE?.fifth_size_pcs || "",

  sixth_size: base.SIZE?.sixth_size || "",
  sixth_size_pcs_wt: base.SIZE?.sixth_size_pcs_wt || "",
  sixth_size_fab_wt: base.SIZE?.sixth_size_fab_wt || "",
  sixth_size_pcs: base.SIZE?.sixth_size_pcs || "",

  seventh_size: base.SIZE?.seventh_size || "",
  seventh_size_pcs_wt: base.SIZE?.seventh_size_pcs_wt || "",
  seventh_size_fab_wt: base.SIZE?.seventh_size_fab_wt || "",
  seventh_size_pcs: base.SIZE?.seventh_size_pcs || "",

  eighth_size: base.SIZE?.eighth_size || "",
  eighth_size_pcs_wt: base.SIZE?.eighth_size_pcs_wt || "",
  eighth_size_fab_wt: base.SIZE?.eighth_size_fab_wt || "",
  eighth_size_pcs: base.SIZE?.eighth_size_pcs || "",

  ninth_size: base.SIZE?.ninth_size || "",
  ninth_size_pcs_wt: base.SIZE?.ninth_size_pcs_wt || "",
  ninth_size_fab_wt: base.SIZE?.ninth_size_fab_wt || "",
  ninth_size_pcs: base.SIZE?.ninth_size_pcs || "",

  tenth_size: base.SIZE?.tenth_size || "",
  tenth_size_pcs_wt: base.SIZE?.tenth_size_pcs_wt || "",
  tenth_size_fab_wt: base.SIZE?.tenth_size_fab_wt || "",
  tenth_size_pcs: base.SIZE?.tenth_size_pcs || "",

  eleventh_size: base.SIZE?.eleventh_size || "",
  eleventh_size_pcs_wt: base.SIZE?.eleventh_size_pcs_wt || "",
  eleventh_size_fab_wt: base.SIZE?.eleventh_size_fab_wt || "",
  eleventh_size_pcs: base.SIZE?.eleventh_size_pcs || "",

  twelfth_size: base.SIZE?.twelfth_size || "",
  twelfth_size_pcs_wt: base.SIZE?.twelfth_size_pcs_wt || "",
  twelfth_size_fab_wt: base.SIZE?.twelfth_size_fab_wt || "",
  twelfth_size_pcs: base.SIZE?.twelfth_size_pcs || ""
}

    };

    // If you still want to merge DOC_NO/COLOR/ROLL/WGT from multiple rows:
    labels.forEach((label, index) => {
      const row = selectData[index];

      // Safely read from each selectData row
      combined.DOC_NO[`${label}_dcno`] = row?.DOC_NO || "";
      combined.COLOR_NAME[`${label}_color`] = row?.COLOR_NAME || "";
      combined.RECD_DC_ROLL[`${label}_roll`] = row?.RECD_DC_ROLL || "";
      combined.RECD_DC_WGT[`${label}_wgt`] = row?.RECD_DC_WGT || "";

      // Outward editable fields
      combined.ROLL[`${label}_roll`] = "";
      combined.WGT[`${label}_wgt`] = "";
    });

    setUserData([combined]);
  }, [selectData]);

  // --------------------------------
  // 2️⃣ Handlers
  // --------------------------------
  const handleFieldChange = (field, value) => {
    setUserData((prev) => [{ ...prev[0], [field]: value }]);
  };

  const handleNestedChange = (section, key, value) => {
    setUserData((prev) => [
      {
        ...prev[0],
        [section]: {
          ...prev[0][section],
          [key]: value
        }
      }
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/inventory/outward", { items: userData });
      alert("Outward saved successfully!");

      setSelectData([]);
      setUserData([]);
    } catch (error) {
      console.log("Outward Error:", error);
      alert("Error saving outward.");
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
            <th className="border px-2 py-1">Id</th>
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
            <td className="border px-2 py-1">{mainRow._id}</td>

            <td className="border px-2 py-1">
              {mainRow.FABRIC_GROUP}
            </td>

            <td className="border px-2 py-1">
              {mainRow.SET_NO}
            </td>

            <td className="border px-2 py-1">
              <input
                className="outline-none w-full px-1"
                value={mainRow.DC_DIA}
                onChange={(e) => handleFieldChange("DC_DIA", e.target.value)}
              />
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto w-[900px]">
            <h2 className="text-xl font-semibold mb-3 text-center">
              DcNo / Color / Roll / Wgt
            </h2>

            <table className="w-full border text-sm text-center">
              <thead className="bg-gray-200">
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

    return (
      <tr key={i}>
        <td className="border px-2 py-1">{i + 1}</td>
        <td className="border px-2 py-1">{item.DOC_NO}</td>
        <td className="border px-2 py-1">{item.COLOR_NAME}</td>
        <td className="border px-2 py-1">{item.RECD_DC_ROLL}</td>
        <td className="border px-2 py-1">{item.RECD_DC_WGT}</td>

        {/* NEW ROLL */}
        <td className="border px-2 py-1">
          <input
            className="outline-none w-full px-1"
            value={mainRow.ROLL?.[rollKey] || ""}
            onChange={(e) =>
              handleNestedChange("ROLL", rollKey, e.target.value)
            }
          />
        </td>

        {/* NEW WGT */}
        <td className="border px-2 py-1">
          <input
            className="outline-none w-full px-1"
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

            <div className="flex justify-center mt-4">
              <button
                onClick={() => setColorPopupRow(null)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
              >
                Close
              </button>
            </div>
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
