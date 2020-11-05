import axios,  { AxiosInstance } from "axios";

export const http:AxiosInstance =  axios.create({
  baseURL: "http://localhost:3005",
  headers: {
    "Content-type": "application/json"
  }
});
