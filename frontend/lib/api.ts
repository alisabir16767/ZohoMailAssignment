import axios from "axios";

let BASE_URL = "https://zohomailassignment.onrender.com/api";

if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  BASE_URL = "http://localhost:5000/api";
}

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default API;
