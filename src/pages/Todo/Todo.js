import React from "react";
import AddTodo from "./AddTodo";
import ListTodo from "./ListTodo";
import FilterTodo from "./TodoFilter/FilterTodo";
import i18n from "../../i18n/i18n";

function Todo() {
  return (
    <div className="grid justify-center rounded-md gap-5">
      <label className="text-3xl font-bold text-center text-title">
        {i18n.t("todo_page:title")}
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
