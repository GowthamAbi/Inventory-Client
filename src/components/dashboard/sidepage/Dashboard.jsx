import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">


      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Fabric Inventory Dashboard</h1>
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString()}
          </span>
        </header>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

          {/* Total Inward */}
          <div className="bg-white shadow rounded p-5 border-l-4 border-blue-500">
            <h3 className="text-sm text-gray-500 mb-1">Total Inward (Today)</h3>
            <p className="text-3xl font-bold text-gray-800">1260 Kg</p>
          </div>

          {/* Total Outward */}
          <div className="bg-white shadow rounded p-5 border-l-4 border-green-500">
            <h3 className="text-sm text-gray-500 mb-1">Total Outward (Today)</h3>
            <p className="text-3xl font-bold text-gray-800">740 Kg</p>
          </div>

          {/* Current Balance */}
          <div className="bg-white shadow rounded p-5 border-l-4 border-purple-500">
            <h3 className="text-sm text-gray-500 mb-1">Current Balance</h3>
            <p className="text-3xl font-bold text-gray-800">3125 Kg</p>
          </div>
        </div>

        {/* RECENT INWARD */}
        <div className="bg-white shadow rounded p-5 mb-6">
          <h3 className="text-lg font-semibold mb-3">Recent Fabric Inward</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-sm">
                <th className="border p-2">DC No</th>
                <th className="border p-2">Color</th>
                <th className="border p-2">Dia</th>
                <th className="border p-2">Roll</th>
                <th className="border p-2">Weight</th>
              </tr>
            </thead>
            <tbody>
              {/* Example rows */}
              <tr>
                <td className="border p-2 text-center">11221</td>
                <td className="border p-2 text-center">Brown</td>
                <td className="border p-2 text-center">34</td>
                <td className="border p-2 text-center">12</td>
                <td className="border p-2 text-center">220.5</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 text-center">11222</td>
                <td className="border p-2 text-center">Grey</td>
                <td className="border p-2 text-center">28</td>
                <td className="border p-2 text-center">10</td>
                <td className="border p-2 text-center">185.0</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* RECENT OUTWARD */}
        <div className="bg-white shadow rounded p-5">
          <h3 className="text-lg font-semibold mb-3">Recent Fabric Outward</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-sm">
                <th className="border p-2">Order No</th>
                <th className="border p-2">Color</th>
                <th className="border p-2">Dia</th>
                <th className="border p-2">Roll</th>
                <th className="border p-2">Weight</th>
              </tr>
            </thead>
            <tbody>
              {/* Example rows */}
              <tr>
                <td className="border p-2 text-center">25</td>
                <td className="border p-2 text-center">Navy</td>
                <td className="border p-2 text-center">30</td>
                <td className="border p-2 text-center">8</td>
                <td className="border p-2 text-center">150.0</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 text-center">26</td>
                <td className="border p-2 text-center">Olive</td>
                <td className="border p-2 text-center">34</td>
                <td className="border p-2 text-center">15</td>
                <td className="border p-2 text-center">290.0</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
