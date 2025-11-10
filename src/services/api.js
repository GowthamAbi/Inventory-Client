import axios from 'axios';

const api = axios.create({
       baseURL:import.meta.env.MODE === "development"
      ? "http://localhost:3000"
      : "https://inventory-server-l2h3.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

export default api;
