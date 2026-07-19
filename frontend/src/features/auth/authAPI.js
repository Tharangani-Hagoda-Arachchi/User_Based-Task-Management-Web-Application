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