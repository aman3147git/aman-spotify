import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "https://aman-spotify.onrender.com", 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true,
});

export default axiosInstance;
