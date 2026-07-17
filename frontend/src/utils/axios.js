import axios from "axios";

const api = axios.create({
  baseURL: "https://brightcoreglobal-production.up.railway.app",
});

export default api;