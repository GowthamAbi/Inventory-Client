import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../DataContext/DataContext";
import api from "../../../services/api";

export default function Outward() {
  const { selectData, setSelectData } = useContext(DataContext);

  // ❗ Changed: userData is now an ARRAY (not object)
  const [userData, setUserData] = useState([]);

  if (!selectData) return <h3>No data received</h3>;

  // ----------------------------------------------
  // 1️⃣ Populate userData when selectData loads
  // ----------------------------------------------
  useEffect(() => {
    if (selectData && selectData.length > 0) {
      const mapped = selectData.map((row) => ({
        _id: row._id,
        DOC_NO: row.DOC_NO,
        FABRIC_GROUP: row.FABRIC_GROUP,
        COLOR_NAME: row.COLOR_NAME,
        RECD_DC_ROLL: row.RECD_DC_ROLL,
        RECD_DC_WGT: row.RECD_DC_WGT,

        // Editable fields (initially empty)
        ROLL: "",
        WGT: "",
        ITEM_CODE: "",
        ITEM_NAME: "",
        STYLE: "",
        SIZE: "",
      }));

      setUserData(mapped);
    }
  }, [selectData]);

  // ----------------------------------------------
  // 2️⃣ Handle input update for a specific row
  // ----------------------------------------------
  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      const updated = [...prev];
      updated[index][name] = value;
      return updated;
    });
  };

  // ----------------------------------------------
  // 3️⃣ Remove row from BOTH tables
  // ----------------------------------------------
  const handleRemove = (index) => {
    const updatedSelect = selectData.filter((_, i) => i !== index);
    const updatedUser = userData.filter((_, i) => i !== index);

    setSelectData(updatedSelect);
    setUserData(updatedUser);
  };

  // ----------------------------------------------
  // 4️⃣ Submit final outward data
  // ----------------------------------------------
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post('/inventory/outward', { items: userData });

    console.log("Submitted:", userData);

    // Clear both tables
    setSelectData([]);
    setUserData([]);

    alert("Outward saved successfully!");

  } catch (error) {
    console.log("Outward Error:", error);
  }
};


  return (
    <div className="overflow-x-auto uppercase p-4 flex flex-col items-center justify-center">
      {/* DISPLAY TABLE ONLY IF DATA EXISTS */}
      {selectData.length > 0 && (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Id</th>
              <th className="border px-4 py-2">DOC NO</th>
              <th className="border px-4 py-2">FABRIC GROUP</th>
              <th className="border px-4 py-2">COLOR_NAME</th>
              <th className="border px-4 py-2">ROLL</th>
              <th className="border px-4 py-2">WEIGHT</th>

              <th className="border px-4 py-2">ROLL</th>
              <th className="border px-4 py-2">WGT</th>
              <th className="border px-4 py-2">Item Code</th>
              <th className="border px-4 py-2">Item Name</th>
              <th className="border px-4 py-2">Style</th>
              <th className="border px-4 py-2">Size</th>

              <th className="border px-4 py-2">Add</th>
              <th className="border px-4 py-2">Remove</th>
            </tr>
          </thead>

          <tbody>
            {selectData.map((data, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{data._id}</td>
                <td className="border px-4 py-2">{data.DOC_NO}</td>
                <td className="border px-4 py-2">{data.FABRIC_GROUP}</td>
                <td className="border px-4 py-2">{data.COLOR_NAME}</td>
                <td className="border px-4 py-2">{data.RECD_DC_ROLL}</td>
                <td className="border px-4 py-2">{data.RECD_DC_WGT}</td>

                {/* Editable Inputs */}
                <td className="border">
                  <input
                    type="text"
                    name="ROLL"
                    value={userData[index]?.ROLL || ""}
                    onChange={(e) => handleChange(index, e)}
                    className="outline-none w-full h-full block px-1"
                  />
                </td>

                <td className="border">
                  <input
                    type="text"
                    name="WGT"
                    value={userData[index]?.WGT || ""}
                    onChange={(e) => handleChange(index, e)}
                    className="outline-none w-full h-full block px-1"
                  />
                </td>

                <td className="border">
                  <input
                    type="text"
                    name="ITEM_CODE"
                    value={userData[index]?.ITEM_CODE || ""}
                    onChange={(e) => handleChange(index, e)}
                    className="outline-none w-full h-full block px-1"
                  />
                </td>

                <td className="border">
                  <input
                    type="text"
                    name="ITEM_NAME"
                    value={userData[index]?.ITEM_NAME || ""}
                    onChange={(e) => handleChange(index, e)}
                    className="outline-none w-full h-full block px-1"
                  />
                </td>

                <td className="border">
                  <input
                    type="text"
                    name="STYLE"
                    value={userData[index]?.STYLE || ""}
                    onChange={(e) => handleChange(index, e)}
                    className="outline-none w-full h-full block px-1"
                  />
                </td>

                <td className="border">
                  <input
                    type="text"
                    name="SIZE"
                    value={userData[index]?.SIZE || ""}
                    onChange={(e) => handleChange(index, e)}
                    className="outline-none w-full h-full block px-1"
                  />
                </td>

                {/* Add Button */}
                <td className="border px-4 text-center">
                  <button className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer">
                    Add
                  </button>
                </td>

                {/* Remove Button */}
                <td className="border px-4 text-center">
                  <button
                    onClick={() => handleRemove(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* SUBMIT BUTTON */}
      {selectData.length > 0 && (
        <button
          onClick={handleSubmit}
          className="cursor-pointer bg-blue-500 px-3 py-2 rounded-xl text-white mt-4"
        >
          Submit
        </button>
      )}
    </div>
  );
}
