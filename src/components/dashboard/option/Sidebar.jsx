import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../DataContext/DataContext";

export default function Sidebar() {
  const navigate = useNavigate();

  // MAIN MENU ACTIVE STATE
  const [activeMenu, setActiveMenu] = useState("dashboard");

  // PRINT DROPDOWN
  const [open, setOpen] = useState(false);

  // FABRIC / CUTTING SUB-MENU (inside Print)
  const [activeTab, setActiveTab] = useState("fabric");

  const { fabric, setFabric } = useContext(DataContext);

  return (
    <div className="pl-2 border-r-2 border-gray-200 h-screen">
      <ul className="py-4">
        {/* DASHBOARD */}
        <button
          onClick={() => {
            navigate("/inventory/dashboard");
            setActiveMenu("dashboard");
          }}
          className={`flex gap-2 items-center p-2 rounded-lg cursor-pointer w-full
            ${
              activeMenu === "dashboard"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          Dashboard
        </button>

        {/* INWARD */}
        <button
          onClick={() => {
            navigate("/inventory/inward");
            setActiveMenu("inward");
          }}
          className={`flex gap-2 items-center p-2 rounded-lg cursor-pointer w-full
            ${
              activeMenu === "inward"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Inward
        </button>

        {/* SELECTION */}
        <button
          onClick={() => {
            navigate("/inventory/selection");
            setActiveMenu("selection");
          }}
          className={`flex gap-2 items-center p-2 rounded-lg cursor-pointer w-full
            ${
              activeMenu === "selection"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" stroke="black" strokeWidth="2" />
            <rect x="14" y="3" width="7" height="7" stroke="black" strokeWidth="2" />
            <rect x="3" y="14" width="7" height="7" stroke="black" strokeWidth="2" />
            <rect x="14" y="14" width="7" height="7" stroke="black" strokeWidth="2" />
          </svg>
          Select
        </button>

        {/* OUTWARD */}
        <button
          onClick={() => {
            navigate("/inventory/outward");
            setActiveMenu("outward");
          }}
          className={`flex gap-2 items-center p-2 rounded-lg cursor-pointer w-full
            ${
              activeMenu === "outward"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73L12 3 4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73L12 21l8-3.27A2 2 0 0 0 21 16z"></path>
            <path d="M12 3v18"></path>
          </svg>
          Outward
        </button>

        {/* LIST */}
        <button
          onClick={() => {
            navigate("/inventory/list");
            setActiveMenu("list");
          }}
          className={`flex gap-2 items-center p-2 rounded-lg cursor-pointer w-full
            ${
              activeMenu === "list"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M9 11h6"></path>
            <path d="M9 15h6"></path>
            <path d="M9 7h6"></path>
            <rect x="3" y="5" width="18" height="16" rx="2"></rect>
          </svg>
          List
        </button>

        {/* PRINT */}
        <button
          onClick={() => {
            navigate("/inventory/print");
            setOpen(!open);
            setActiveMenu("print");
          }}
          className={`flex gap-2 items-center p-2 rounded-lg cursor-pointer w-full
            ${
              activeMenu === "print"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <polyline points="3 17 9 11 13 15 21 7"></polyline>
            <polyline points="14 7 21 7 21 14"></polyline>
          </svg>
          Print
        </button>

        {/* PRINT SUB MENU */}
        {open && (activeMenu === "print") && (
          <div className="flex flex-col gap-2 mt-2 ml-6">

            <button
              onClick={() => {
                setActiveTab("fabric");
                setFabric("fabric");
              }}
              className={`p-2 rounded-lg w-full cursor-pointer ${
                activeTab === "fabric"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Fabric
            </button>

            <button
              onClick={() => {
                setActiveTab("cutting");
                setFabric("cutting");
              }}
              className={`p-2 rounded-lg w-full cursor-pointer ${
                activeTab === "cutting"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Cutting
            </button>

          </div>
        )}

        {/* REPORTS */}
        <button
          onClick={() => {
            navigate("/inventory/reports");
            setActiveMenu("reports");
          }}
          className={`flex gap-2 items-center p-2 rounded-lg cursor-pointer w-full
            ${
              activeMenu === "reports"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <rect x="3" y="11" width="4" height="7"></rect>
            <rect x="10" y="7" width="4" height="11"></rect>
            <rect x="17" y="4" width="4" height="14"></rect>
            <path d="M3 21h18"></path>
          </svg>
          Reports
        </button>

        {/* SETTINGS */}
        <button
          onClick={() => {
            navigate("/inventory/settings");
            setActiveMenu("settings");
          }}
          className={`flex gap-2 items-center p-2 rounded-lg cursor-pointer w-full
            ${
              activeMenu === "settings"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82L4.3 4.3a2 2 0 1 1 2.83-2.83L7.2 1.53a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09c.14.63.64 1.12 1.27 1.27L16.47 4.3a2 2 0 1 1 2.83 2.83l-.06.06c-.31.31-.46.73-.37 1.15.09.42.4.78.83.96.43.18.9.06 1.23-.28l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06c-.34.34-.46.8-.28 1.23.18.43.54.74.96.83.42.09.84-.06 1.15-.37l.06-.06A2 2 0 0 1 19.4 15z"></path>
          </svg>
          Settings
        </button>
      </ul>
    </div>
  );
}
