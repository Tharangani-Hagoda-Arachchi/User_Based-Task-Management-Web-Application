import { configureStore } from "@reduxjs/toolkit";
import reducer from "../features/auth/authSlice.js";
import taskReducer from "../features/task/taskSlice.js"

export const store = configureStore({
    reducer: {
        auth: reducer,
        task: taskReducer

    }

})