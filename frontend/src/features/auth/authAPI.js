import { API } from "../../api/axios.js";

//signup api
export const signupAPI = async (userData) => {
    const response = await API.post("/auth/register", userData);
    return response.data
}

//login api
export const loginAPI = async (userData) => {
    const response = await API.post("/auth/login", userData);
    return response.data
}

//get user api
export const getUserAPI = async (userData) => {
    const response = await API.get("/auth/me", userData);
    return response.data
}