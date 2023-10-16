import React from "react";
import Navbar from "./Navbar";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Todo from "../pages/Todo/Todo";
import Home from "../pages/Home/Home";
import Weather from "../pages/Weather/Weather";
import ThemeOperations from "../pages/ThemeOperations/ThemeOperations";
import { FilterProvider } from "../pages/Todo/TodoFilter/FilterContext";

function Content() {
  return (
    <main className="flex-auto overflow-auto">
      <Navbar />
      <div className="px-8 py-5 ">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
        <Switch>
          <Route path="/todo">
            <FilterProvider>
              <Todo />
            </FilterProvider>
          </Route>
          <Route path="/weather">
            <Weather />
          </Route>
          <Route path="theme">
            <ThemeOperations />
          </Route>
        </Switch>
      </div>
    </main>
  );
}

export default Content;
