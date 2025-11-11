import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import { useState } from 'react';

export default function Products() {

const [userData, setUserData] = useState([]);
const navigate = useNavigate();

  const[data,setData]=useState({
    FABRIC_GROUP: "",
    COLOR_NAME: ""
  })

  const handleChange=(e)=>{
    const {name,value}=e.target
    setData({...data,[name]:value})
  }

  const handleSubmit=async(e)=>{
e.preventDefault()
try {
  
  const fabric=await api.post('/inventory/selection',data)
  setUserData(fabric.data)
console.log({"data":userData})
    
} catch (error) {
  console.log("Outward err",error)
}
  }

  const InwardData=["S.NO","DC NO","FABRIC GROUP","COLOR NAME","SET NO","DIA","ROLL","WEIGHT"]

    const [selectedRow, setSelectedRow] = useState(null);

      const handleNextPage = () => {
    if (selectedRow !== null) {
   
      navigate("/inventory/orders", { state: userData[selectedRow] });
    }
  };
  return (
    <div className="p-4">
  {/* FORM SECTION */}
  <form
    onSubmit={handleSubmit}
    className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 flex flex-wrap items-center justify-center gap-4"
  >
    <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
      <label className="font-semibold text-gray-700">FABRIC GROUP:</label>
      <input
        type="text"
        required
        name="FABRIC_GROUP"
        className="border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        value={data.FABRIC_GROUP || ""}
        onChange={handleChange}
      />
    </div>

    <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
      <label className="font-semibold text-gray-700">FABRIC COLOUR:</label>
      <input
        type="text"
        required
        name="COLOR_NAME"
        className="border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        value={data.COLOR_NAME || ""}
        onChange={handleChange}
      />
    </div>

    <button
      type="submit"
      className="bg-amber-400 hover:bg-amber-500 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all"
    >
      ENTER
    </button>
  </form>

  {/* TABLE SECTION */}
  <div className="max-w-6xl mx-auto mt-6 bg-white shadow-md rounded-2xl overflow-x-auto">
    <table className="w-full border-collapse text-sm text-gray-700">
      <thead className="bg-gray-100">
        <tr>
          {InwardData.map((col, index) => (
            <th
              key={index}
              className="px-4 py-3 text-left font-semibold border-b border-gray-300 whitespace-nowrap"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {userData.map((item, index) => (
          <tr
            key={index}
            className={`cursor-pointer text-center border-b border-gray-200 transition-all ${
              selectedRow === index
                ? "bg-blue-100"
                : "hover:bg-gray-50"
            }`}
            onClick={() => setSelectedRow(index)}
          >
            <td className="border px-4 py-2">{index + 1}</td>
            <td className="border px-4 py-2">{item.DOC_NO}</td>
            <td className="border px-4 py-2">{item.FABRIC_GROUP}</td>
            <td className="border px-4 py-2">{item.COLOR_NAME}</td>
            <td className="border px-4 py-2">{item.SET_NO}</td>
            <td className="border px-4 py-2">{item.DC_DIA}</td>
            <td className="border px-4 py-2">{item.RECD_DC_ROLL}</td>
            <td className="border px-4 py-2">{item.RECD_DC_WGT}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* BUTTON SECTION */}
  <div className="flex justify-center mt-6">
    <button
      onClick={handleNextPage}
      className={`px-6 py-2 rounded-lg font-semibold text-white shadow transition-all ${
        selectedRow !== null
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-gray-400 cursor-not-allowed"
      }`}
      disabled={selectedRow === null}
    >
      Proceed
    </button>
  </div>
</div>

  )
}



    