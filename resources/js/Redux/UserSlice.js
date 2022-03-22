import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        people: [],
        current: null,
        default: null,
    },
    reducers: {
        setUser: (state, action) => {
            const user = action.payload;
            if (user) state.user = user;
        },
        setPeople: (state, action) => {
            const people = action.payload;
            if (people) state.people = people;
        },
        addPerson: (state, action) => {
            const person = action.payload;
            if (person) state.people.push(person);
        },
        setDefault: (state, action) => {
            const active = action.payload;
            if (active) state.default = active;
        },

        setCurrent: (state, action) => {
            const current = action.payload;
            if (current) state.current = current;
        },
    },
});

export const { setUser, setPeople, setDefault, setCurrent, addPerson } =
    userSlice.actions;
export default userSlice.reducer;
