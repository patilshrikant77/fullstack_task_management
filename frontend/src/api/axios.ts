import axios from 'axios';
import { RootState } from './interface';
import { store } from '../redux/store';
import { logout } from '../features/auth/authSlice';

const BASE_URL = process.env.REACT_APP_API_URL; // Replace with your actual base URL

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // This is for sending cookies with requests if needed
});

// Add an interceptor to include the Authorization header
axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState() as RootState; // Get the state
        const token = state.auth.token; // Access the token from the state
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.data && error.response.data.error === "Unauthorized: Token is either missing or invalid") {
        store.dispatch(logout());
      }
      return Promise.reject(error);
    }
  );

export default axiosInstance;
