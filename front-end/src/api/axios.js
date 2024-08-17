import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Base URL from environment variables
  timeout: 10000, // Request timeout (optional)
  headers: {
    'Content-Type': 'application/json', // Default content type
  },
});

export default axiosInstance;
