import { API } from "../../api/axios.js";

//get user api
export const gettaskAPI = async (taskData) => {
    const response = await API.get("/tasks", taskData);
    return response.data
}

//add task api
export const addTaskAPI = async (taskData) => {
    const response = await API.post("/tasks", taskData);
    return response.data
}