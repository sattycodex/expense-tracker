// src/api/axiosInstance.js
import axios from 'axios';
import { getToken } from './auth';

const axiosInstance = axios.create({
  baseURL:'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': getToken()
  },
});

export default axiosInstance;