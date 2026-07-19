import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupAPI } from "./authAPI.js";

//api call for signup
export const userSignup = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        try {
            const data = await signupAPI(userData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Signup Failed");
        }
    }
);

//intial state
const initialState = {
    loading: false,
    message: null,
    error: null
};

//auth slice
const authSlice = createSlice({
    name: "auth",
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
                userSignup.pending, (state) => {
                    state.loading = true;
                    state.message = null;
                    state.error = null;
                }
            )

            .addCase(
                userSignup.fulfilled, (state, action) => {
                    state.loading = false;
                    state.message = action.payload.message;
                }
            )

            .addCase(
                userSignup.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )

    },

});

export const { clearMessages } = authSlice.actions;
export default authSlice.reducer;