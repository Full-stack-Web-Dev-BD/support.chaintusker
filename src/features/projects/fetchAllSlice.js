import { createSlice } from "@reduxjs/toolkit";

// The initial state of the FetchAllSlice
const initialState = {
    data: [],
    status: "idle",
    error: null,
};

// Slice
export const fetchAllSlice = createSlice({
    name: "fetchAll",
    initialState,
    reducers: {
        fetchAllStart: (state) => {
            state.status = "loading";
        },
        fetchAllSuccess: (state, action) => {
            state.status = "success";
            state.data = action.payload;
        },
        fetchAllFailure: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        }
    },
});

// Actions
export const { fetchAllStart, fetchAllSuccess, fetchAllFailure } = fetchAllSlice.actions;

export default fetchAllSlice.reducer;