import axios from "axios";

const instance = axios.create({
  baseURL: "http://43.205.3.109:4002",
});

export default instance;
