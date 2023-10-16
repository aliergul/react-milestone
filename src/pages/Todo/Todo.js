import React from "react";
import AddTodo from "./AddTodo";
import ListTodo from "./ListTodo";
import FilterTodo from "./TodoFilter/FilterTodo";

function Todo() {
  return (
    <div className="grid justify-center rounded-md gap-5">
      <label className="text-3xl font-bold text-center text-title">
        Add Todo
      </label>
      <div className="flex items-center justify-center">
        <AddTodo />
        <FilterTodo />
      </div>
      <ListTodo />
    </div>
  );
}

export default Todo;
