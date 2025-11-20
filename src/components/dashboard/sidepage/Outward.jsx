import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../DataContext/DataContext";
import api from "../../../services/api";

export default function Outward() {
  const { selectData, setSelectData } = useContext(DataContext);

  const [userData, setUserData] = useState([]);

const[sizeClick,setSizeClick]=useState(false)

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
        SIZE: [
  {
    first_size: "",
    first_size_pcs_wt: "",
    first_size_fab_wt: ""
  },
  {
    second_size: "",
    second_size_pcs_wt: "",
    second_size_fab_wt: ""
  },
  {
    third_size: "",
    third_size_pcs_wt: "",
    third_size_fab_wt: ""
  },
  {
    fourth_size: "",
    fourth_size_pcs_wt: "",
    fourth_size_fab_wt: ""
  },
  {
    fifth_size: "",
    fifth_size_pcs_wt: "",
    fifth_size_fab_wt: ""
  },
  {
    sixth_size: "",
    sixth_size_pcs_wt: "",
    sixth_size_fab_wt: ""
  },
  {
    seventh_size: "",
    seventh_size_pcs_wt: "",
    seventh_size_fab_wt: ""
  },
  {
    eighth_size: "",
    eighth_size_pcs_wt: "",
    eighth_size_fab_wt: ""
  },
  {
    ninth_size: "",
    ninth_size_pcs_wt: "",
    ninth_size_fab_wt: ""
  },
  {
    tenth_size: "",
    tenth_size_pcs_wt: "",
    tenth_size_fab_wt: ""
  },
  {
    eleventh_size: "",
    eleventh_size_pcs_wt: "",
    eleventh_size_fab_wt: ""
  },
  {
    twelfth_size: "",
    twelfth_size_pcs_wt: "",
    twelfth_size_fab_wt: ""
  }
],
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

const sizeKeys = [
  "first", "second", "third", "fourth", "fifth", "sixth",
  "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"
];



  return (
    <div className="overflow-x-auto uppercase p-4 flex flex-col items-center justify-center realtive">

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
      <button onClick={()=>setSizeClick(!sizeClick)} className="cursor-pointer relative w-full">Click Here</button>
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

      {sizeClick && (
        <div className="absolute overflow-y-auto top-ful bg-gray-200 border p-1 shadow-md text-xl  ">
            
          {userData.map((row,index)=>(
            <div className=" px-2 flex flex-col justify-center py-2"  key={`${row.DOC_NO}_${index}`}>
            <table className="w-full border text-center text-xl">
              <thead>
                <tr className="bg-gray-300">
                  <th className="border px-2 py-1">S.No</th>
                  <th className="border px-2 py-1">Size</th>
                  <th className="border px-2 py-1">PCS Weight</th>
                  <th className="border px-2 py-1">Fabric Weight</th>
                </tr>
              </thead>

              <tbody className="">
                {sizeKeys.map((label, i) => (
                  <tr key={i} className="border ">
                    <td className="border px-2 py-1">{i + 1}</td>

                    <td className="border px-2 py-1 ">
                      <input
                      
                        value={userData[index]?.SIZE[`${label}_size`] || ""}
                        onChange={(e) =>
                          handleSizeChange(index, `${label}_size`, e.target.value)
                        }
                        className="outline-none w-full px-1"
                      />
                    </td>

                    <td className="border px-2 py-1">
                      <input
                      
                        value={userData[index]?.SIZE[`${label}_size_pcs_wt`] || ""}
                        onChange={(e) =>
                          handleSizeChange(index, `${label}_size_pcs_wt`, e.target.value)
                        }
                        className="outline-none w-full px-1"
                      />
                    </td>

                    <td className="border px-2 py-1">
                      <input
                        
                        value={userData[index]?.SIZE[`${label}_size_fab_wt`] || ""}
                        onChange={(e) =>
                          handleSizeChange(index, `${label}_size_fab_wt`, e.target.value)
                        }
                        className="outline-none w-full px-1"
                      />
                    </td>
                  </tr>
                ))}
                
              </tbody>
            </table>
          <div className="flex justify-center gap-4">
            <button className=" bg-blue-400 px-4 py-2 rounded-xl my-2 cursor-pointer hover:bg-blue-800 ">Submit</button>
          <button onClick={()=>setSizeClick(!sizeClick)} className=" bg-red-400 px-4 py-2 rounded-xl my-2 cursor-pointer hover:bg-red-800">Cencel</button>
          </div>
            </div>
          ))}
          </div>
        )}
    </div>
  );
}
