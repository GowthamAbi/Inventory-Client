// data.jsx
const data = [
  {
    id: "Box",
    title: "Real Time Inventory",
    content: "Keep track of stock across multiple warehouse",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <title>Real-time Inventory (Cube)</title>
        <path d="M21 16V8a2 2 0 0 0-1-1.73L13 3.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <path d="M12 3v5"/>
        <path d="M3.27 6.96L12 11l8.73-4.04"/>
        <path d="M12 11v10"/>
      </svg>
    )
  },
  {
    id: "Bar_chart",
    title: "Smart Sales Analytics",
    content: "Visualize sales and revenue trends",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <title>Smart Sales Analytics (Bar Chart)</title>
        <rect x="2.5" y="14" width="3" height="6" rx="0.5" />
        <rect x="9.5" y="9" width="3" height="11" rx="0.5" />
        <rect x="16.5" y="4" width="3" height="16" rx="0.5" />
        <path d="M1 20h22" />
      </svg>
    )
  },
  {
    id: "Bell",
    title: "Low Stock Alerts",
    content: "Get instant notifications when items run low",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <title>Low Stock Alerts (Bell)</title>
        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11c0-3.07-1.64-5.64-4.5-6.32V4a1.5 1.5 0 0 0-3 0v0.68C7.64 5.36 6 7.93 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h11z" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    )
  },
  {
    id: "Reports_Insights",
    title: "Reports & Insights",
    content: "Generate downloadable reports easily",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <title>Reports & Insights (File + Chart)</title>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <path d="M14 2v6h6" />
        <rect x="8.5" y="11.5" width="1.8" height="4.5" rx="0.3" />
        <rect x="11" y="9" width="1.8" height="7" rx="0.3" />
        <rect x="13.5" y="13" width="1.8" height="3" rx="0.3" />
      </svg>
    )
  },
  {
    id: "Multi_channel",
    title: "Multi-channel Sync",
    content: "Manage inventory across Amazon,Flipkart,Shopify,etc",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <title>Multi-channel Sync (Globe)</title>
        <circle cx="12" cy="12" r="9" />
        <path d="M2.5 12h19" />
        <path d="M12 3a15 15 0 0 1 0 18" />
        <path d="M12 3a15 15 0 0 0 0 18" />
        <path d="M5 6c1.8 1 3 3.5 3.8 6.5C10.6 16.5 11.8 19 14 20" />
      </svg>
    )
  },
  {
    id: "Monitor",
    title: "Dashboard Preview",
    content: "Monitoring every time",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <title>Dashboard Preview (Monitor)</title>
        <rect x="2.5" y="3" width="19" height="12" rx="1.2" />
        <path d="M8 7h8" />
        <rect x="4.5" y="9.2" width="6" height="4.2" rx="0.4" />
        <rect x="12.8" y="9.2" width="6.7" height="4.2" rx="0.4" />
        <path d="M8 18h8" />
        <path d="M11.5 15v3" />
      </svg>
    )
  },
  // Add remaining icons like `world`, `clock`, `setting`, `doc`, `order`, `sales`, `dashboard` similarly
];

export default data;
