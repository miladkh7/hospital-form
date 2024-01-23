import axios from "axios";

export const baseURL = "http://185.97.117.249:8000";
const client = axios.create({
  baseURL,
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
