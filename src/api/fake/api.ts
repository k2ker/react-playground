import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_STORE_URL,
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
