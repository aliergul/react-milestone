import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FilterContext } from "./FilterContext";
import i18n from "../../../i18n/i18n";

const FilterTodo = () => {
  const { todoList } = useSelector((state) => state.toDo);
  const { filter, setFilter, setFilteredTodoList } = useContext(FilterContext);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    if (filter === "all") {
      setFilteredTodoList(todoList);
    } else if (filter === "completed") {
      const filteredList = todoList.filter((todo) => todo.status === true);
      setFilteredTodoList(filteredList);
    } else if (filter === "not_completed") {
      const filteredList = todoList.filter((todo) => todo.status === false);
      setFilteredTodoList(filteredList);
    }
  }, [filter, todoList, setFilteredTodoList]);

  return (
    <div style={{ width: "200px" }}>
      <Select value={filter} onChange={handleFilterChange}>
        <MenuItem value="all">{i18n.t("todo_page:all")}</MenuItem>
        <MenuItem value="completed">{i18n.t("todo_page:completed")}</MenuItem>
        <MenuItem value="not_completed">
          {i18n.t("todo_page:not_completed")}
        </MenuItem>
      </Select>
    </div>
  );
};

export default FilterTodo;
