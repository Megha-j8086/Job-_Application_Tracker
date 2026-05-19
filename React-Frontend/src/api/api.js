import axios from "axios";

const API = axios.create({

  baseURL:
    "https://job-application-tracker-zhly.onrender.com/api",

});

// ADD TOKEN IN EVERY REQUEST
API.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem("access");

    console.log(
      "TOKEN SENT:",
      token
    );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  },

  (error) => {

    return Promise.reject(error);

  }

);

export default API;