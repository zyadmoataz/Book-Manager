import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.API_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
});
