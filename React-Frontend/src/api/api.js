import axios from "axios";

const API = axios.create({
  baseURL: "https://job-application-tracker-zhly.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  const publicRoutes = ["/users/login/", "/users/register/"];

  const isPublic = publicRoutes.some((route) =>
    config.url?.includes(route)
  );

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;