import axios from "axios";

//create axio instance

export const API = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
})