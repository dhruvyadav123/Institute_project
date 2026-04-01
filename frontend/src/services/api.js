import axios from "axios";

const resolveApiBaseUrl = () => {
  const configuredBaseUrl = import.meta.env.VITE_API_URL?.trim();

  if (configuredBaseUrl) {
    return configuredBaseUrl.replace(/\/$/, "");
  }

  if (import.meta.env.PROD) {
    return "/api";
  }

  return "http://localhost:5000/api";
};

export const API_BASE_URL = resolveApiBaseUrl();

export const buildApiUrl = (path = "") =>
  `${API_BASE_URL}/${String(path).replace(/^\/+/, "")}`;

const API = axios.create({
  baseURL: API_BASE_URL,
});

export default API;
