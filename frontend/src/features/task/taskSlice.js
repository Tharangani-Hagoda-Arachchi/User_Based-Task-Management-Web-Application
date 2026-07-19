import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { gettaskAPI } from "./taskAPI.js";

//api call for all task
export const getTasks = createAsyncThunk(
    "tasks",
    async (_, { rejectWithValue }) => {
        try {
            const data = await gettaskAPI();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Task loading Failed");
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
                    state.message = null;
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

    },

});

export const { clearMessages } = taskSlice.actions;
export default taskSlice.reducer;