import axios from "axios";
console.log("API URL:", import.meta.env.VITE_API_URL);
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("AUTH_TOKEN");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
export default api;
