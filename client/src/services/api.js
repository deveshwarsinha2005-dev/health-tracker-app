import axios from "axios";

const API = axios.create({
  baseURL: "https://health-backend-ne9f.onrender.com/api",
});

export default API;