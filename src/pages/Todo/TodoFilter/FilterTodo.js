import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FilterContext } from "./FilterContext";

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
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
        <MenuItem value="not_completed">Not Completed</MenuItem>
      </Select>
    </div>
  );
};

export default FilterTodo;
