import React, { useEffect, useState } from "react";
import api from "../../../services/api";

export default function List() {
  const [fabricList, setFabricList] = useState([]);
  const [cuttingList, setCuttingList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  // -----------------------------
  // FORMATTING HELPERS
  // -----------------------------
  const formatColorName = (colorName) => {
    if (!colorName) return "";

    if (typeof colorName === "string") return colorName;

    if (typeof colorName === "object") {
      return Object.values(colorName)
        .filter(Boolean)
        .join(", ");
    }

    return String(colorName);
  };

  const formatDCNo = (dcno) => {
    if (!dcno) return "";
    if (typeof dcno === "string") return dcno;

    if (typeof dcno === "object") {
      return Object.values(dcno)
        .filter(Boolean)
        .join(", ");
    }

    return String(dcno);
  };

  const formatValue = (v) => {
    if (!v) return "";
    if (typeof v === "string") return v;

    if (typeof v === "object") {
      return Object.values(v)
        .filter(Boolean)
        .join(", ");
    }

    return String(v);
  };

  // -----------------------------
  // FETCH DATA
  // -----------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fabricRes, cuttingRes] = await Promise.all([
          api.get("/inventory/list"),
          api.get("/inventory/cuttinglist"),
        ]);

        setFabricList(fabricRes.data);
        setCuttingList(cuttingRes.data);
      } catch (err) {
        console.log("Error fetching list:", err);
        setError("Unable to fetch data from server.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // -----------------------------
  // SEARCH FILTERS
  // -----------------------------
  const searchText = search.toLowerCase();

  const filteredFabric = fabricList.filter((item) => {
    const dc = formatDCNo(item.DOC_NO).toLowerCase();
    const color = formatColorName(item.COLOR_NAME).toLowerCase();
    const fabricGroup = (item.FABRIC_GROUP || "").toLowerCase();
    return (
      dc.includes(searchText) ||
      color.includes(searchText) ||
      fabricGroup.includes(searchText)
    );
  });

  const filteredCutting = cuttingList.filter((item) => {
    const dc = formatDCNo(item.DOC_NO).toLowerCase();
    const color = formatColorName(item.COLOR_NAME).toLowerCase();
    const itemName = (item.ITEM_NAME || "").toLowerCase();
    return (
      dc.includes(searchText) ||
      color.includes(searchText) ||
      itemName.includes(searchText)
    );
  });

  return (
    <div className="uppercase p-6 mx-auto max-w-5xl flex flex-col gap-10">

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search by DC No / Color / Item..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded p-2 w-full lowercase"
      />

      {/* LOADING */}
      {loading && (
        <p className="text-center text-blue-600 font-semibold">Loading...</p>
      )}

      {/* ERROR */}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* ---------------- FABRIC LIST ---------------- */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Fabric Inward</h2>

        {filteredFabric.length === 0 ? (
          <p className="text-gray-600">No Fabric Records Found</p>
        ) : (
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">S No</th>
                <th className="border p-2">DC No</th>
                <th className="border p-2">Fabric Group</th>
                <th className="border p-2">Color</th>
                <th className="border p-2">Set No</th>
                <th className="border p-2">Roll</th>
                <th className="border p-2">Weight</th>
              </tr>
            </thead>

            <tbody>
              {filteredFabric.map((item, index) => (
                <tr key={index} className="border text-center">
                  <td className="border p-1">{index + 1}</td>
                  <td className="border p-1">{formatDCNo(item.DOC_NO)}</td>
                  <td className="border p-1">{item.FABRIC_GROUP}</td>
                  <td className="border p-1">{formatColorName(item.COLOR_NAME)}</td>
                  <td className="border p-1">{item.SET_NO}</td>
                  <td className="border p-1">{formatValue(item.RECD_DC_ROLL)}</td>
                  <td className="border p-1">{formatValue(item.RECD_DC_WGT)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ---------------- CUTTING LIST ---------------- */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Cutting Outward</h2>

        {filteredCutting.length === 0 ? (
          <p className="text-gray-600">No Cutting Records Found</p>
        ) : (
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">S No</th>
                <th className="border p-2">Order No</th>
                <th className="border p-2">DC No</th>
                <th className="border p-2">Fabric Group</th>
                <th className="border p-2">Color</th>
                <th className="border p-2">Set No</th>
                <th className="border p-2">Item Name</th>
                <th className="border p-2">Style</th>
                <th className="border p-2">Roll</th>
                <th className="border p-2">Weight</th>
              </tr>
            </thead>

            <tbody>
              {filteredCutting.map((item, index) => (
                <tr key={index} className="border text-center">
                  <td className="border p-1">{index + 1}</td>
                  <td className="border p-1">{item.ORDER_NO}</td>
                  <td className="border p-1">{formatDCNo(item.DOC_NO)}</td>
                  <td className="border p-1">{item.FABRIC_GROUP}</td>
                  <td className="border p-1">{formatColorName(item.COLOR_NAME)}</td>
                  <td className="border p-1">{item.SET_NO}</td>
                  <td className="border p-1">{item.ITEM_NAME}</td>
                  <td className="border p-1">{item.STYLE}</td>
                  <td className="border p-1">{formatValue(item.ROLL)}</td>
                  <td className="border p-1">{formatValue(item.WGT)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
