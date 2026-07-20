import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupAPI, loginAPI, getUserAPI, logoutAPI } from "./authAPI.js";

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

//api call for login
export const userLogin = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await loginAPI(credentials);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Login Failed");
        }
    }
);

//api call for user profile
export const getUser = createAsyncThunk(
    "auth/me",
    async (_, { rejectWithValue }) => {
        try {
            const data = await getUserAPI();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Login Failed");
        }
    }
);

//api call for logout
export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const data = await logoutAPI();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "logout fail");
        }
    }
);

//intial state
const initialState = {
    accessToken: localStorage.getItem("accessToken") || null,
    user: null,
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

            .addCase(
                userLogin.pending, (state) => {
                    state.loading = true;
                    state.message = null;
                    state.error = null;
                }
            )

            .addCase(
                userLogin.fulfilled, (state, action) => {
                    state.loading = false;
                    state.accessToken = action.payload.accessToken;
                    localStorage.setItem("accessToken", action.payload.accessToken);
                    state.message = action.payload.message;
                }
            )

            .addCase(
                userLogin.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )

            .addCase(
                getUser.fulfilled, (state, action) => {
                    state.loading = false;
                    state.user = action.payload.user;
                }
            )

            .addCase(
                getUser.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )

            .addCase(logoutUser.fulfilled, (state, action) => {
                state.user = null;
                state.accessToken = null;
                state.isAuthenticated = false;
                state.message = action.payload.message;
            })

            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload;
            })

    },

});

export const { clearMessages } = authSlice.actions;
export default authSlice.reducer;