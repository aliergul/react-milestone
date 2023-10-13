import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "toDo",
  initialState: {
    todoList: [
      { id: 1, content: "Hello World!", status: 0 }, //incompleted
      { id: 2, content: "Hello Ankara!", status: 1 }, //completed
    ],
  },
  reducers: {
    addToDo: (state, action) => {
      let newToDoList = {
        id: Math.random(),
        content: action.payload.newContent,
        status: false,
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
    markToDo: (state) => {
      let { todoList } = state;
      state.todoList = todoList.map((task) => {
        return { ...task, status: !task.status };
      });
    },
  },
});
export const { addToDo, deleteToDo, editToDo, markToDo } = todoSlice.actions;
export default todoSlice.reducer;
