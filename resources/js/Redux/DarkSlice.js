import { createSlice } from "@reduxjs/toolkit";

const darkSlice = createSlice({
    name: "dark",
    initialState: {
        value: window.matchMedia("(prefers-color-scheme: dark)") ? true : false,
    },
    reducers: {
        on: (state) => {
            state.value = true;
        },
        off: (state) => {
            state.value = false;
        },
    },
});

export const { on: darkOn, off: darkOff } = darkSlice.actions;
export default darkSlice.reducer;
