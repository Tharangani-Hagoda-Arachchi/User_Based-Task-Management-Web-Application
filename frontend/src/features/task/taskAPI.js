import { API } from "../../api/axios.js";

//get task api
export const gettaskAPI = async (taskData) => {
    const response = await API.get("/tasks", taskData);
    return response.data
}

//get single task api
export const getSingletaskAPI = async (taskId) => {
    const response = await API.get(`/tasks/${taskId}`);
    return response.data
}

//add task api
export const addTaskAPI = async (taskData) => {
    const response = await API.post("/tasks", taskData);
    return response.data
}

//delete task api
export const deleteTaskAPI = async (taskId) => {
    const response = await API.delete(`/tasks/${taskId}`);
    return response.data
}

//update task status api
export const updateStatusTaskAPI = async (taskId, status) => {
    const response = await API.patch(`/tasks/${taskId}/status`, {status});
    return response.data
}

//update task
export const updateTaskAPI = async (taskId, taskData) => {
    const response = await API.put(`/tasks/${taskId}`, taskData);
    return response.data
}