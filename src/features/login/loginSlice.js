import { createSlice } from "@reduxjs/toolkit";

// The initial state of the LoginSlice
const initialState = {
    data: [],
    status: "idle",
    error: null,
};

// Slice
export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.status = "loading";
        },
        loginSuccess: (state, action) => {
            state.status = "success";
            state.data = action.payload;
        },
        loginFailure: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        }
    },
});

// Actions
export const { loginStart, loginSuccess, loginFailure } = loginSlice.actions;

export default loginSlice.reducer;