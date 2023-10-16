import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "toDo",
  initialState: {
    todoList: [
      {
        id: 1,
        content: "Hello World",
        status: 0,
      },
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
    markToDo: (state, action) => {
      const { id } = action.payload;
      const updatedList = state.todoList.map((task) => {
        if (task.id === id) {
          return { ...task, status: !task.status };
        } else {
          return task;
        }
      });
      state.todoList = updatedList;
    },
  },
});
export const { addToDo, deleteToDo, editToDo, markToDo } = todoSlice.actions;
export default todoSlice.reducer;
