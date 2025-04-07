import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
	baseURL: "https://eprocurement-d904.onrender.com/api", // backend API
	withCredentials: true, // For sending cookies (refresh token)
});

export default axiosInstance;
