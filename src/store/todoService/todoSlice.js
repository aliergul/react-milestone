import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "toDo",
  initialState: {
    todoList: [
      { id: 1, content: "Hello World!" },
      { id: 2, content: "Hello Ankara!" },
    ],
  },
  reducers: {
    addToDo: (state, action) => {
      let newToDoList = {
        id: Math.random(),
        content: action.payload.newContent,
      };
      state.todoList.push(newToDoList);
    },
    deleteToDo: (state, action) => {
      let { todoList } = state;
      state.todoList = todoList.filter((task) => task.id !== action.payload.id);
    },
    editToDo: (state, action) => {
      let { todoList } = state;
      state.todoList = todoList.map((task) => {
        return task.id === action.payload.id ? action.payload : task;
      });
    },
  },
});
export const { addToDo, deleteToDo, editToDo } = todoSlice.actions;
export default todoSlice.reducer;
