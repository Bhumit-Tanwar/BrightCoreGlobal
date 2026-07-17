import axios from "axios";

const api = axios.create({
  baseURL: "brightglobal-repo-production.up.railway.app",
});

export default api;