import { configureStore } from "@reduxjs/toolkit";


import FilterReducer from "./slices/Filter"
import userReducer from './slices/LoginSlice';




export const store = configureStore({
    reducer:{
        filter : FilterReducer, 
        user: userReducer,
    },
});

export default store;