import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../DataContext/DataContext";
import api from "../../../services/api";

export default function Outward() {
  const { selectData, setSelectData } = useContext(DataContext);

  // All rows you will submit to /inventory/outward
  const [userData, setUserData] = useState([]);

  // Popup controls
  const [colorPopupRow, setColorPopupRow] = useState(null); // index of row for colors
  const [sizePopupRow, setSizePopupRow] = useState(null);   // index of row for sizes

  if (!selectData) return <h3>No data received</h3>;

  // Helpers: label arrays
  const colorKeys = [
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

  // ----------------------------------------------------
  // 1️⃣ Load incoming table rows → convert to editable rows
  // ----------------------------------------------------
  useEffect(() => {
    if (selectData && selectData.length > 0) {
      const mapped = selectData.map((row) => ({
        _id: row._id || "",
        DOC_NO: row.DOC_NO || "",
        DATE: row.DATE || "",
        FABRIC_GROUP: row.FABRIC_GROUP || "",
        SET_NO: row.SET_NO || "",
        DC_DIA: row.DC_DIA || "",
        ITEM_CODE: row.ITEM_CODE || "",
        ITEM_NAME: row.ITEM_NAME || "",
        STYLE: row.STYLE || "",

        // Nested COLOR_NAME object (13 colors)
        COLOR_NAME: {
          first_color: row.COLOR_NAME?.first_color || "",
          second_color: row.COLOR_NAME?.second_color || "",
          third_color: row.COLOR_NAME?.third_color || "",
          fourth_color: row.COLOR_NAME?.fourth_color || "",
          fifth_color: row.COLOR_NAME?.fifth_color || "",
          sixth_color: row.COLOR_NAME?.sixth_color || "",
          seventh_color: row.COLOR_NAME?.seventh_color || "",
          eighth_color: row.COLOR_NAME?.eighth_color || "",
          ninth_color: row.COLOR_NAME?.ninth_color || "",
          tenth_color: row.COLOR_NAME?.tenth_color || "",
          eleventh_color: row.COLOR_NAME?.eleventh_color || "",
          twelfth_color: row.COLOR_NAME?.twelfth_color || "",
          thirteenth_color: row.COLOR_NAME?.thirteenth_color || ""
        },

        // RECD_DC_ROLL (13)
        RECD_DC_ROLL: {
          first_roll: row.RECD_DC_ROLL?.first_roll || "",
          second_roll: row.RECD_DC_ROLL?.second_roll || "",
          third_roll: row.RECD_DC_ROLL?.third_roll || "",
          fourth_roll: row.RECD_DC_ROLL?.fourth_roll || "",
          fifth_roll: row.RECD_DC_ROLL?.fifth_roll || "",
          sixth_roll: row.RECD_DC_ROLL?.sixth_roll || "",
          seventh_roll: row.RECD_DC_ROLL?.seventh_roll || "",
          eighth_roll: row.RECD_DC_ROLL?.eighth_roll || "",
          ninth_roll: row.RECD_DC_ROLL?.ninth_roll || "",
          tenth_roll: row.RECD_DC_ROLL?.tenth_roll || "",
          eleventh_roll: row.RECD_DC_ROLL?.eleventh_roll || "",
          twelfth_roll: row.RECD_DC_ROLL?.twelfth_roll || "",
          thirteenth_roll: row.RECD_DC_ROLL?.thirteenth_roll || ""
        },

        // RECD_DC_WGT (13)
        RECD_DC_WGT: {
          first_wgt: row.RECD_DC_WGT?.first_wgt || "",
          second_wgt: row.RECD_DC_WGT?.second_wgt || "",
          third_wgt: row.RECD_DC_WGT?.third_wgt || "",
          fourth_wgt: row.RECD_DC_WGT?.fourth_wgt || "",
          fifth_wgt: row.RECD_DC_WGT?.fifth_wgt || "",
          sixth_wgt: row.RECD_DC_WGT?.sixth_wgt || "",
          seventh_wgt: row.RECD_DC_WGT?.seventh_wgt || "",
          eighth_wgt: row.RECD_DC_WGT?.eighth_wgt || "",
          ninth_wgt: row.RECD_DC_WGT?.ninth_wgt || "",
          tenth_wgt: row.RECD_DC_WGT?.tenth_wgt || "",
          eleventh_wgt: row.RECD_DC_WGT?.eleventh_wgt || "",
          twelfth_wgt: row.RECD_DC_WGT?.twelfth_wgt || "",
          thirteenth_wgt: row.RECD_DC_WGT?.thirteenth_wgt || ""
        },

        // OUTWARD new ROLL (13)
        ROLL: {
          first_roll: row.ROLL?.first_roll || "",
          second_roll: row.ROLL?.second_roll || "",
          third_roll: row.ROLL?.third_roll || "",
          fourth_roll: row.ROLL?.fourth_roll || "",
          fifth_roll: row.ROLL?.fifth_roll || "",
          sixth_roll: row.ROLL?.sixth_roll || "",
          seventh_roll: row.ROLL?.seventh_roll || "",
          eighth_roll: row.ROLL?.eighth_roll || "",
          ninth_roll: row.ROLL?.ninth_roll || "",
          tenth_roll: row.ROLL?.tenth_roll || "",
          eleventh_roll: row.ROLL?.eleventh_roll || "",
          twelfth_roll: row.ROLL?.twelfth_roll || "",
          thirteenth_roll: row.ROLL?.thirteenth_roll || ""
        },

        // OUTWARD new WGT (13)
        WGT: {
          first_wgt: row.WGT?.first_wgt || "",
          second_wgt: row.WGT?.second_wgt || "",
          third_wgt: row.WGT?.third_wgt || "",
          fourth_wgt: row.WGT?.fourth_wgt || "",
          fifth_wgt: row.WGT?.fifth_wgt || "",
          sixth_wgt: row.WGT?.sixth_wgt || "",
          seventh_wgt: row.WGT?.seventh_wgt || "",
          eighth_wgt: row.WGT?.eighth_wgt || "",
          ninth_wgt: row.WGT?.ninth_wgt || "",
          tenth_wgt: row.WGT?.tenth_wgt || "",
          eleventh_wgt: row.WGT?.eleventh_wgt || "",
          twelfth_wgt: row.WGT?.twelfth_wgt || "",
          thirteenth_wgt: row.WGT?.thirteenth_wgt || ""
        },

        // SIZE object (12 sizes)
        SIZE: {
          first_size: row.SIZE?.first_size || "",
          first_size_pcs_wt: row.SIZE?.first_size_pcs_wt || "",
          first_size_fab_wt: row.SIZE?.first_size_fab_wt || "",

          second_size: row.SIZE?.second_size || "",
          second_size_pcs_wt: row.SIZE?.second_size_pcs_wt || "",
          second_size_fab_wt: row.SIZE?.second_size_fab_wt || "",

          third_size: row.SIZE?.third_size || "",
          third_size_pcs_wt: row.SIZE?.third_size_pcs_wt || "",
          third_size_fab_wt: row.SIZE?.third_size_fab_wt || "",

          fourth_size: row.SIZE?.fourth_size || "",
          fourth_size_pcs_wt: row.SIZE?.fourth_size_pcs_wt || "",
          fourth_size_fab_wt: row.SIZE?.fourth_size_fab_wt || "",

          fifth_size: row.SIZE?.fifth_size || "",
          fifth_size_pcs_wt: row.SIZE?.fifth_size_pcs_wt || "",
          fifth_size_fab_wt: row.SIZE?.fifth_size_fab_wt || "",

          sixth_size: row.SIZE?.sixth_size || "",
          sixth_size_pcs_wt: row.SIZE?.sixth_size_pcs_wt || "",
          sixth_size_fab_wt: row.SIZE?.sixth_size_fab_wt || "",

          seventh_size: row.SIZE?.seventh_size || "",
          seventh_size_pcs_wt: row.SIZE?.seventh_size_pcs_wt || "",
          seventh_size_fab_wt: row.SIZE?.seventh_size_fab_wt || "",

          eighth_size: row.SIZE?.eighth_size || "",
          eighth_size_pcs_wt: row.SIZE?.eighth_size_pcs_wt || "",
          eighth_size_fab_wt: row.SIZE?.eighth_size_fab_wt || "",

          ninth_size: row.SIZE?.ninth_size || "",
          ninth_size_pcs_wt: row.SIZE?.ninth_size_pcs_wt || "",
          ninth_size_fab_wt: row.SIZE?.ninth_size_fab_wt || "",

          tenth_size: row.SIZE?.tenth_size || "",
          tenth_size_pcs_wt: row.SIZE?.tenth_size_pcs_wt || "",
          tenth_size_fab_wt: row.SIZE?.tenth_size_fab_wt || "",

          eleventh_size: row.SIZE?.eleventh_size || "",
          eleventh_size_pcs_wt: row.SIZE?.eleventh_size_pcs_wt || "",
          eleventh_size_fab_wt: row.SIZE?.eleventh_size_fab_wt || "",

          twelfth_size: row.SIZE?.twelfth_size || "",
          twelfth_size_pcs_wt: row.SIZE?.twelfth_size_pcs_wt || "",
          twelfth_size_fab_wt: row.SIZE?.twelfth_size_fab_wt || ""
        }
      }));

      setUserData(mapped);
    } else {
      setUserData([]);
    }
  }, [selectData]);

  // ----------------------------------------------------
  // 2️⃣ Handlers
  // ----------------------------------------------------

  // Simple top-level field: DOC_NO, FABRIC_GROUP, ITEM_CODE, ...
  const handleFieldChange = (rowIndex, field, value) => {
    setUserData((prev) => {
      const updated = [...prev];
      updated[rowIndex] = { ...updated[rowIndex], [field]: value };
      return updated;
    });
  };

  // Nested object update: COLOR_NAME, RECD_DC_ROLL, RECD_DC_WGT, ROLL, WGT, SIZE
  const handleNestedChange = (rowIndex, section, key, value) => {
    setUserData((prev) => {
      const updated = [...prev];
      updated[rowIndex] = {
        ...updated[rowIndex],
        [section]: {
          ...updated[rowIndex][section],
          [key]: value
        }
      };
      return updated;
    });
  };

  // For SIZE popup convenience
  const handleSizeChange = (rowIndex, key, value) => {
    handleNestedChange(rowIndex, "SIZE", key, value);
  };

  const handleRemoveRow = (rowIndex) => {
    setSelectData((prev) => prev.filter((_, idx) => idx !== rowIndex));
    setUserData((prev) => prev.filter((_, idx) => idx !== rowIndex));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/inventory/outward", { items: userData });

      console.log("Submitted:", userData);

      setSelectData([]);
      setUserData([]);

      alert("Outward saved successfully!");
    } catch (error) {
      console.log("Outward Error:", error);
      alert("Error saving outward. Check console.");
    }
  };

  // ----------------------------------------------------
  // 3️⃣ Render
  // ----------------------------------------------------
  return (
    <div className="overflow-x-auto uppercase p-4 flex flex-col items-center relative">
      {userData.length > 0 && (
        <>
          {/* Main Table */}
          <table className="min-w-full border text-sm">
            <thead>
              <tr>
                <th className="border px-2 py-1">Id</th>
                <th className="border px-2 py-1">DOC NO</th>
                <th className="border px-2 py-1">FABRIC GROUP</th>
                <th className="border px-2 py-1">SET NO</th>
                <th className="border px-2 py-1">DC DIA</th>

                <th className="border px-2 py-1">Item Code</th>
                <th className="border px-2 py-1">Item Name</th>
                <th className="border px-2 py-1">Style</th>

                {/* Buttons to open popups */}
                <th className="border px-2 py-1">Colors / Roll / Wgt</th>
                <th className="border px-2 py-1">Size</th>

                <th className="border px-2 py-1">Remove</th>
              </tr>
            </thead>

            <tbody>
              {userData.map((row, index) => (
                <tr key={row._id || index}>
                  <td className="border px-2 py-1">{row._id}</td>

                  <td className="border px-2 py-1">
                    <input
                      className="outline-none w-full px-1"
                      value={row.DOC_NO}
                      onChange={(e) =>
                        handleFieldChange(index, "DOC_NO", e.target.value)
                      }
                    />
                  </td>

                  <td className="border px-2 py-1">
                    <input
                      className="outline-none w-full px-1"
                      value={row.FABRIC_GROUP}
                      onChange={(e) =>
                        handleFieldChange(index, "FABRIC_GROUP", e.target.value)
                      }
                    />
                  </td>

                  <td className="border px-2 py-1">
                    <input
                      className="outline-none w-full px-1"
                      value={row.SET_NO}
                      onChange={(e) =>
                        handleFieldChange(index, "SET_NO", e.target.value)
                      }
                    />
                  </td>

                  <td className="border px-2 py-1">
                    <input
                      className="outline-none w-full px-1"
                      value={row.DC_DIA}
                      onChange={(e) =>
                        handleFieldChange(index, "DC_DIA", e.target.value)
                      }
                    />
                  </td>

                  <td className="border px-2 py-1">
                    <input
                      className="outline-none w-full px-1"
                      value={row.ITEM_CODE}
                      onChange={(e) =>
                        handleFieldChange(index, "ITEM_CODE", e.target.value)
                      }
                    />
                  </td>

                  <td className="border px-2 py-1">
                    <input
                      className="outline-none w-full px-1"
                      value={row.ITEM_NAME}
                      onChange={(e) =>
                        handleFieldChange(index, "ITEM_NAME", e.target.value)
                      }
                    />
                  </td>

                  <td className="border px-2 py-1">
                    <input
                      className="outline-none w-full px-1"
                      value={row.STYLE}
                      onChange={(e) =>
                        handleFieldChange(index, "STYLE", e.target.value)
                      }
                    />
                  </td>

                  {/* Colors popup button */}
                  <td className="border px-2 py-1 text-center">
                    <button
                      type="button"
                      onClick={() => setColorPopupRow(index)}
                      className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer hover:bg-blue-700"
                    >
                      Colors
                    </button>
                  </td>

                  {/* Size popup button */}
                  <td className="border px-2 py-1 text-center">
                    <button
                      type="button"
                      onClick={() => setSizePopupRow(index)}
                      className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer hover:bg-green-700"
                    >
                      Size
                    </button>
                  </td>

                  <td className="border px-2 py-1 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            className="cursor-pointer bg-blue-600 px-4 py-2 rounded-xl text-white mt-4 hover:bg-blue-800"
          >
            Submit
          </button>
        </>
      )}

      {/* ========================== */}
      {/*  POPUP: COLORS / ROLL / WGT */}
      {/* ========================== */}
      {colorPopupRow !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto w-[900px]">
            <h2 className="text-xl font-semibold mb-3 text-center">
              Colors / Roll / Weight (Row {colorPopupRow + 1})
            </h2>

            <table className="w-full border text-sm text-center">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-2 py-1">S.No</th>
                  <th className="border px-2 py-1">Color</th>
                  <th className="border px-2 py-1">Recv Roll</th>
                  <th className="border px-2 py-1">Recv Wgt</th>
                  <th className="border px-2 py-1">New Roll</th>
                  <th className="border px-2 py-1">New Wgt</th>
                </tr>
              </thead>
              <tbody>
                {colorKeys.map((label, i) => {
                  const colorKey = `${label}_color`;
                  const rollKey = `${label}_roll`;
                  const wgtKey = `${label}_wgt`;
                  const row = userData[colorPopupRow];

                  return (
                    <tr key={label}>
                      <td className="border px-2 py-1">{i + 1}</td>

                      {/* COLOR_NAME.first_color, second_color... */}
                      <td className="border px-2 py-1">
                        <input
                          className="outline-none w-full px-1"
                          value={row.COLOR_NAME?.[colorKey] || ""}
                          onChange={(e) =>
                            handleNestedChange(
                              colorPopupRow,
                              "COLOR_NAME",
                              colorKey,
                              e.target.value
                            )
                          }
                        />
                      </td>

                      {/* RECD_DC_ROLL.first_roll... */}
                      <td className="border px-2 py-1">
                        <input
                          className="outline-none w-full px-1"
                          value={row.RECD_DC_ROLL?.[rollKey] || ""}
                          onChange={(e) =>
                            handleNestedChange(
                              colorPopupRow,
                              "RECD_DC_ROLL",
                              rollKey,
                              e.target.value
                            )
                          }
                        />
                      </td>

                      {/* RECD_DC_WGT.first_wgt... */}
                      <td className="border px-2 py-1">
                        <input
                          className="outline-none w-full px-1"
                          value={row.RECD_DC_WGT?.[wgtKey] || ""}
                          onChange={(e) =>
                            handleNestedChange(
                              colorPopupRow,
                              "RECD_DC_WGT",
                              wgtKey,
                              e.target.value
                            )
                          }
                        />
                      </td>

                      {/* OUTWARD ROLL.first_roll... */}
                      <td className="border px-2 py-1">
                        <input
                          className="outline-none w-full px-1"
                          value={row.ROLL?.[rollKey] || ""}
                          onChange={(e) =>
                            handleNestedChange(
                              colorPopupRow,
                              "ROLL",
                              rollKey,
                              e.target.value
                            )
                          }
                        />
                      </td>

                      {/* OUTWARD WGT.first_wgt... */}
                      <td className="border px-2 py-1">
                        <input
                          className="outline-none w-full px-1"
                          value={row.WGT?.[wgtKey] || ""}
                          onChange={(e) =>
                            handleNestedChange(
                              colorPopupRow,
                              "WGT",
                              wgtKey,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="flex justify-center gap-4 mt-4">
              <button
                type="button"
                onClick={() => setColorPopupRow(null)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ */}
      {/* POPUP: SIZE  */}
      {/* ============ */}
      {sizePopupRow !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto w-[800px]">
            <h2 className="text-xl font-semibold mb-3 text-center">
              Sizes (Row {sizePopupRow + 1})
            </h2>

            <table className="w-full border text-sm text-center">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-2 py-1">S.No</th>
                  <th className="border px-2 py-1">Size</th>
                  <th className="border px-2 py-1">PCS Weight</th>
                  <th className="border px-2 py-1">Fabric Weight</th>
                </tr>
              </thead>
              <tbody>
                {sizeKeys.map((label, i) => {
                  const sizeKey = `${label}_size`;
                  const pcsKey = `${label}_size_pcs_wt`;
                  const fabKey = `${label}_size_fab_wt`;
                  const row = userData[sizePopupRow];

                  return (
                    <tr key={label}>
                      <td className="border px-2 py-1">{i + 1}</td>

                      <td className="border px-2 py-1">
                        <input
                          className="outline-none w-full px-1"
                          value={row.SIZE?.[sizeKey] || ""}
                          onChange={(e) =>
                            handleSizeChange(sizePopupRow, sizeKey, e.target.value)
                          }
                        />
                      </td>

                      <td className="border px-2 py-1">
                        <input
                          className="outline-none w-full px-1"
                          value={row.SIZE?.[pcsKey] || ""}
                          onChange={(e) =>
                            handleSizeChange(sizePopupRow, pcsKey, e.target.value)
                          }
                        />
                      </td>

                      <td className="border px-2 py-1">
                        <input
                          className="outline-none w-full px-1"
                          value={row.SIZE?.[fabKey] || ""}
                          onChange={(e) =>
                            handleSizeChange(sizePopupRow, fabKey, e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="flex justify-center gap-4 mt-4">
              <button
                type="button"
                onClick={() => setSizePopupRow(null)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-700"
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
