import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addTaskAPI, deleteTaskAPI, gettaskAPI, updateStatusTaskAPI } from "./taskAPI.js";

//api call for all task
export const getTasks = createAsyncThunk(
    "tasks/getTasks",
    async (_, { rejectWithValue }) => {
        try {
            const data = await gettaskAPI();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Task loading Failed");
        }
    }
);

//api call for add task
export const newTask = createAsyncThunk(
    "tasks/newTask",
    async (taskData, { rejectWithValue }) => {
        try {
            const data = await addTaskAPI(taskData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Add Failed");
        }
    }
);

//api call for delete task
export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (taskId, { rejectWithValue }) => {
        try {
            const data = await deleteTaskAPI(taskId);
            return { ...data, taskId };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Delete Failed");
        }
    }
);

//api call for update task status
export const updaeteStatusOfTask = createAsyncThunk(
    "tasks/updateStatus",
    async ({ taskId, status }, { rejectWithValue }) => {
        try {
            const data = await updateStatusTaskAPI(taskId, status);
            return  data ;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Status Updation Failed");
        }
    }
);

//intial state
const initialState = {
    tasks: [],
    loading: false,
    message: null,
    error: null
};

//task slice
const taskSlice = createSlice({
    name: "task",
    initialState,

    reducers: {
        clearMessages: (state) => {
            state.message = null;
            state.error = null;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(
                getTasks.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                getTasks.fulfilled, (state, action) => {
                    state.loading = false;
                    state.tasks = action.payload.tasks
                    state.message = action.payload.message;
                }
            )

            .addCase(
                getTasks.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )

            .addCase(
                newTask.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                newTask.fulfilled, (state, action) => {
                    state.loading = false;
                    state.message = action.payload.message;
                    state.tasks.push(action.payload.task);

                }
            )

            .addCase(
                newTask.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )

            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;

                state.tasks = state.tasks.filter(
                    (task) => task._id !== action.payload.taskId
                );
            })

            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updaeteStatusOfTask.pending, (state) => {
                state.loading = true;
            })

            .addCase(updaeteStatusOfTask.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                const updatedTask = action.payload.task

                const index = state.tasks.findIndex(
                    task => task._id === updatedTask._id
                );

                if (index !== -1) {
                    state.tasks[index] = updatedTask;
                }

            })

            .addCase(updaeteStatusOfTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


    },

});

export const { clearMessages } = taskSlice.actions;
export default taskSlice.reducer;