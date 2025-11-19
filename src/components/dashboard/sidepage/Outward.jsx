import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../DataContext/DataContext";
import api from "../../../services/api";

export default function Outward() {
  const { selectData, setSelectData } = useContext(DataContext);

  const [userData, setUserData] = useState([]);

const[size,setSize]=useState([])

  if (!selectData) return <h3>No data received</h3>;

  // ----------------------------------------------------
  // 1️⃣ Load incoming table rows → convert to editable rows
  // ----------------------------------------------------
  useEffect(() => {
    if (selectData && selectData.length > 0) {
      const mapped = selectData.map((row) => ({
        _id: row._id,
        DOC_NO: row.DOC_NO,
        FABRIC_GROUP: row.FABRIC_GROUP,
        COLOR_NAME: row.COLOR_NAME,
        SET_NO: row.SET_NO,
        RECD_DC_ROLL: row.RECD_DC_ROLL,
        RECD_DC_WGT: row.RECD_DC_WGT,

        // Editable fields
        ROLL: "",
        WGT: "",
        ITEM_CODE: "",
        ITEM_NAME: "",
        STYLE: "",
        SIZE: {
                first_size: "",
                first_size_pcs_wt: "",
                first_size_fab_wt: ""
              },
        PCS_WEIGHT: "",
        WEIGHT: "",
      }));

      setUserData(mapped);
    }
  }, [selectData]);

  // ----------------------------------------------------
  // 2️⃣ Main handler for updating each row
  // ----------------------------------------------------
  const handleChange = (index, field, value) => {
    setUserData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };


  const handleSizeChange = (index, field, value) => {
  setUserData(prev => {
    const updated = [...prev];

    updated[index] = {
      ...updated[index],
      SIZE: {
        ...updated[index].SIZE,
        [field]: value
      }
    };

    return updated;
  });
};

  // ----------------------------------------------------
  // 3️⃣ Remove row
  // ----------------------------------------------------
  const handleRemove = (index) => {
    setSelectData((prev) => prev.filter((_, i) => i !== index));
    setUserData((prev) => prev.filter((_, i) => i !== index));
  };

  // ----------------------------------------------------
  // 4️⃣ Submit to backend
  // ----------------------------------------------------
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
    }
  };

  return (
    <div className="overflow-x-auto uppercase p-4 flex flex-col items-center justify-center">

      {selectData.length > 0 && (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Id</th>
              <th className="border px-4 py-2">DOC NO</th>
              <th className="border px-4 py-2">FABRIC GROUP</th>
              <th className="border px-4 py-2">COLOR</th>
              <th className="border px-4 py-2">SET NO</th>

              <th className="border px-4 py-2">ROLL</th>
              <th className="border px-4 py-2">WGT</th>

              <th className="border px-4 py-2">NEW ROLL</th>
              <th className="border px-4 py-2">NEW WGT</th>

              <th className="border px-4 py-2">Item Code</th>
              <th className="border px-4 py-2">Item Name</th>
              <th className="border px-4 py-2">Style</th>

              <th className="border px-4 py-2">Size</th>
              <th className="border px-4 py-2">Remove</th>
            </tr>
          </thead>

          <tbody>
            {userData.map((row, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{row._id}</td>
                <td className="border px-4 py-2">{row.DOC_NO}</td>
                <td className="border px-4 py-2">{row.FABRIC_GROUP}</td>
                <td className="border px-4 py-2">{row.COLOR_NAME}</td>
                <td className="border px-4 py-2">{row.SET_NO}</td>

                <td className="border px-4 py-2">{row.RECD_DC_ROLL}</td>
                <td className="border px-4 py-2">{row.RECD_DC_WGT}</td>

                {/* Editable Fields */}
                <td className="border">
                  <input
                    value={row.ROLL}
                    onChange={(e) =>
                      handleChange(index, "ROLL", e.target.value)
                    }
                    className="outline-none w-full px-1"
                  />
                </td>

                <td className="border">
                  <input
                    value={row.WGT}
                    onChange={(e) =>
                      handleChange(index, "WGT", e.target.value)
                    }
                    className="outline-none w-full px-1"
                  />
                </td>

                <td className="border">
                  <input
                    value={row.ITEM_CODE}
                    onChange={(e) =>
                      handleChange(index, "ITEM_CODE", e.target.value)
                    }
                    className="outline-none w-full px-1"
                  />
                </td>

                <td className="border">
                  <input
                    value={row.ITEM_NAME}
                    onChange={(e) =>
                      handleChange(index, "ITEM_NAME", e.target.value)
                    }
                    className="outline-none w-full px-1"
                  />
                </td>

                <td className="border">
                  <input
                    value={row.STYLE}
                    onChange={(e) =>
                      handleChange(index, "STYLE", e.target.value)
                    }
                    className="outline-none w-full px-1"
                  />
                </td>

                {/* SIZE + POPUP */}
                <td className="border relative">

  {/* SIZE main field */}
  <input
    value={userData[index]?.SIZE.first_size || ""}
    onChange={(e) =>
      handleSizeChange(index, "first_size", e.target.value)
    }
    className="outline-none w-full px-1"
  />

  {/* POPUP BOX */}
  <div className="absolute left-0 top-full bg-white border p-1 shadow-md w-44 z-10">
    <label className="text-xs">75</label>

    <input
      placeholder="pcs weight"
      value={userData[index]?.SIZE.first_size_pcs_wt || ""}
      onChange={(e) =>
        handleSizeChange(index, "first_size_pcs_wt", e.target.value)
      }
      className="border w-full px-1 text-xs my-1"
    />

    <input
      placeholder="fabric weight"
      value={userData[index]?.SIZE.first_size_fab_wt || ""}
      onChange={(e) =>
        handleSizeChange(index, "first_size_fab_wt", e.target.value)
      }
      className="border w-full px-1 text-xs"
    />
  </div>

</td>


                {/* Remove button */}
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleRemove(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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
