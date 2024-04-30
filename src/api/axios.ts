import axios from 'axios';
import { refreshAccessToken } from '../Hooks/RefreshToken';


const BASE_URL = 'http://localhost:3000';


export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});



axiosPrivate.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


axiosPrivate.interceptors.request.use(config => {
  const token = sessionStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

axiosPrivate.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true; // Mark the request as retried
    try {
      // Attempt to refresh the access token
      await refreshAccessToken();
      // On success, retry the original request with the new token
      return axiosPrivate(originalRequest);
    } catch (refreshError) {
      // If the refresh attempt fails (e.g., refresh token is invalid), handle accordingly
     window.dispatchEvent(new CustomEvent('authRefreshFailed'));
      return Promise.reject(refreshError);
    }
  }
  return Promise.reject(error);
});

