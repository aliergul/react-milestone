import { createSlice } from "@reduxjs/toolkit";
import updateArray from "immutability-helper";

export const todoSlice = createSlice({
  name: "toDo",
  initialState: {
    todoList: [],
  },
  reducers: {
    addToDo: (state, action) => {
      let newToDoList = {
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
    moveTodo: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const dragRecord = state.todoList[dragIndex];
      state.todoList = updateArray(state.todoList, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRecord],
        ],
      });
      state.todoList.map((item, index) => {
        item.order = index;
        return item;
      });
      console.log(JSON.parse(JSON.stringify(state.todoList)));
    },
  },
});

export const { setTodo, addToDo, deleteToDo, editToDo, markToDo, moveTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
