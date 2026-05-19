import axios from "axios";

const API = axios.create({
  baseURL: "https://job-application-tracker-zhly.onrender.com/api/",
});

API.interceptors.request.use((req) => {

  const token = localStorage.getItem("access");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  console.log("TOKEN SENT:", token);

  return req;
});

export default API;