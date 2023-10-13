import { configureStore } from "@reduxjs/toolkit";
import toDoReducer from "./todoService/todoSlice";

export const store = configureStore({
  reducer: {
    toDo: toDoReducer,
  },
});
