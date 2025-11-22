import React from 'react'

export default function Settings() {
  return (
    <div>{title.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 border-b pb-3"
                  >
                    <div className="flex items-center gap-2 w-1/8">
                      <span className="text-lg font-semibold text-gray-700">{index + 1}.</span>
                      <label className="text-lg font-medium text-gray-800">{item}</label>
                    </div>

                    <input
                      type="text"
                      name={item}
                      value={userData[item] || ""}
                      onChange={handleChange}
                      placeholder={`ENTER ${item}`}
                      className="w-7/8  text-center text-gray-700 
                      rounded-xl px-3 py-2 focus:outline-none "
                    />
                  </div>
                ))}</div>
  )
}
