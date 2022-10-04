import { createSlice } from "@reduxjs/toolkit";
import { incMonth, incYear, decMonth, decYear } from "@/Logic/Calander";

const calenderSlice = createSlice({
    name: "calender",
    initialState: {
        day: null,
        month: null,
        year: null,
        events: [],
        days: [[], [], [], [], []],
    },
    reducers: {
        setDay: (state, action) => {
            state.day = action.payload;
        },

        setMonth: (state, action) => {
            state.month = action.payload;
        },

        setYear: (state, action) => {
            state.year = action.payload;
        },

        setDays: (state, action) => {
            state.days = action.value;
        },

        setEvents: (state, action) => {
            state.events = [...action.payload];
            if (state.day)
                state.day = state.events[state.day.week][state.day.dayOfWeek];
        },

        addEvent: (state, action) => {
            state.events.push(action.payload);
        },

        addWeek: (state, action) => {
            state.days[action.payload.week] = action.payload.days;
        },

        addDay: (state, action) => {
            const { week, dayOfWeek } = action.payload;
            state.days[week][dayOfWeek] = action.payload;
        },

        incrementMonth: (state) => {
            const { month, year } = incMonth({
                month: state.month,
                year: state.year,
            });

            state.day = null;
            state.month = month;
            state.year = year;
        },

        incrementYear: (state) => {
            state.day = null;
            state.year = incYear(state.year);
        },

        decrementMonth: (state) => {
            const { month, year } = decMonth({
                month: state.month,
                year: state.year,
            });

            state.day = null;
            state.month = month;
            state.year = year;
        },

        decrementYear: (state) => {
            state.day = null;
            state.year = decYear(state.year);
        },
    },
});

export const {
    setDay,
    setMonth,
    setYear,
    incrementDay,
    incrementMonth,
    incrementYear,
    decrementDay,
    decrementMonth,
    decrementYear,
    setDays,
    addWeek,
    addDay,
    setEvents,
    addEvent,
} = calenderSlice.actions;
export default calenderSlice.reducer;
