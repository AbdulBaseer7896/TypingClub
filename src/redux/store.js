import { configureStore } from "@reduxjs/toolkit";


import FilterReducer from "./slices/Filter"



export const store = configureStore({
    reducer:{
        filter : FilterReducer, 
    },
});

export default store;