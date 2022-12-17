import axios from "axios";

let baseURL;
if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:5000";
} else if (process.env.NODE_ENV === "production") {
  baseURL = process.env.SERVERORIGIN;
}

export default axios.create({
  baseURL,
});

export const axiosPrivate = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
