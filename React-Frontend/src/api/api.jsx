import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {

  const token = localStorage.getItem("access");

  // 🚨 DO NOT SEND TOKEN FOR LOGIN/REGISTER
  const publicRoutes = [
    "/users/login/",
    "/users/register/",
  ];

  const isPublic = publicRoutes.some(
    (route) => config.url.includes(route)
  );

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;