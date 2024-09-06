import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://143.110.177.32/api/editor",
  headers: {
    "Content-Type": "application/json",
  },
});

export default httpClient;
