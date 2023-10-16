import React from "react";
import AddTodo from "./AddTodo";
import ListTodo from "./ListTodo";

function Todo() {
  return (
    <div className="grid justify-center rounded-md gap-5">
      <label className="text-3xl font-bold text-center text-title">
        Add Todo
      </label>
      <AddTodo />
      <ListTodo />
    </div>
  );
}

export default Todo;
