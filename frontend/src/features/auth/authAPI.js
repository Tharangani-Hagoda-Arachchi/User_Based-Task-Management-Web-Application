import {API} from "../../api/axios.js";

export const signupAPI = async(userData) =>{
    const response = await API.post("/auth/register", userData);
    return response.data
}