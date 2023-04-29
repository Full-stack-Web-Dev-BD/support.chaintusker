import { createSlice } from "@reduxjs/toolkit";

// The initial state of the fetchProjectSlice
const initialState = {
    data: [],
    status: "idle",
    error: null,
};

// Slice
export const fetchProjectSlice = createSlice({
    name: "fetchProject",
    initialState,
    reducers: {
        fetchProjectStart: (state) => {
            state.status = "loading";
        },
        fetchProjectSuccess: (state, action) => {
            state.status = "success";
            state.data = action.payload;
        },
        fetchProjectFailure: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        }
    },
});

// Actions
export const { fetchProjectStart, fetchProjectSuccess, fetchProjectFailure } = fetchProjectSlice.actions;

export default fetchProjectSlice.reducer;