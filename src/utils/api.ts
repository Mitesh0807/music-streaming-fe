import axios from "axios";

const api = axios.create({
  baseURL: "https://music-streaming-be.onrender.com/",
  withCredentials: true,
});

api.interceptors.request.use(
  function (config) {
    config.headers.authorization = localStorage.getItem("token");
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

export default api;
