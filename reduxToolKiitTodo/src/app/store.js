import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";

// This creates and exports the store
export const store = configureStore({
  reducer: todoReducer,   
});
