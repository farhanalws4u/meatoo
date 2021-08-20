import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const signUp = (formData) => API.post("/user/signUp", formData);
