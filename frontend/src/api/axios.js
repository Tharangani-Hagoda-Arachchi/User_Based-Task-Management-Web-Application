import axios from "axios";

//create axio instance

export const API = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
})

//jwt automatically atached interceptot
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

})