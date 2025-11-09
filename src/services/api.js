import axios from 'axios';

const api = axios.create({
  baseURL: "https://inventory-server-l2h3.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

export default api;
