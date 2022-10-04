import { configureStore } from "@reduxjs/toolkit";
import darkReducer from "@/Redux/DarkSlice";
import calenderReducer from "@/Redux/CalenderSlice";
import formReducer from "@/Redux/FormSlice";
import userReducer from "@/Redux/UserSlice";

export default configureStore({
    reducer: {
        dark: darkReducer,
        calender: calenderReducer,
        form: formReducer,
        user: userReducer,
    },
});
