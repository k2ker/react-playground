import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    const token = Cookies.get("hong_access_token");

    if (token) {
      config.headers.Authorization = token;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.data.exception_status_code) {
      return Promise.reject(response);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
