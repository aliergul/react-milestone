import React, { useContext, useEffect, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FilterContext } from "./FilterContext";
import i18n from "../../../i18n/i18n";
import { db } from "../../../firebase";
import { ref, onValue } from "firebase/database";

const FilterTodo = () => {
  const { filter, setFilter, setFilteredTodoList } = useContext(FilterContext);
  const [todoArray, setTodoArray] = useState([]);

  useEffect(() => {
    const todosRef = ref(db, "todos");

    onValue(todosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const updatedTodoArray = Object.keys(data).map((key) => ({
          id: key,
          content: data[key].content,
          status: data[key].status,
        }));
        setTodoArray(updatedTodoArray);
        setFilteredTodoList(updatedTodoArray);
      }
    });
  }, [setFilteredTodoList]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredTodoList(todoArray);
    } else if (filter === "completed") {
      const filteredList = todoArray.filter((todo) => todo.status === true);
      setFilteredTodoList(filteredList);
    } else if (filter === "not_completed") {
      const filteredList = todoArray.filter((todo) => todo.status === false);
      setFilteredTodoList(filteredList);
    }
  }, [filter, setFilteredTodoList, todoArray]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

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
