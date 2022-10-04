import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
    name: "form",
    initialState: {
        new: false,
        edit: false,
        event: null,
    },
    reducers: {
        openNew: (state) => {
            state.new = true;
        },

        closeNew: (state) => {
            state.new = false;
        },

        openEdit: (state, action) => {
            state.event = action.payload;
            state.edit = true;
        },

        closeEdit: (state) => {
            state.edit = false;
        },

        setEvent: (state, action) => {
            state.event = action.payload;
        },
    },
});

export const { openNew, openEdit, closeNew, closeEdit } = formSlice.actions;
export default formSlice.reducer;
