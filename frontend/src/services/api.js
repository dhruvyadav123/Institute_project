// src/services/api.js
// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// export default API;

import axios from "axios";

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const API = axios.create({
  baseURL: API_BASE_URL,
});

export default API;
