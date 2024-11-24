// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8800/api',
  withCredentials: true, // Send cookies with requests
});

export default axiosInstance;

