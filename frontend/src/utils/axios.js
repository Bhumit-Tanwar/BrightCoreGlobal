import axios from "axios";

const api = axios.create({
  baseURL: "brightcoreglobal-production.up.railway.app",
});

export default api;