import React, { createContext, useState, useContext } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState("all");
  const [filteredTodoList, setFilteredTodoList] = useState([]);

  return (
    <FilterContext.Provider
      value={{ filter, setFilter, filteredTodoList, setFilteredTodoList }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
