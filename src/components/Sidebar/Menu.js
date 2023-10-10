import React from "react";
import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <nav className="px-2">
      <ul className="flex flex-col">
        <li>
          <NavLink
            activeClassName="bg-active text-white"
            exact
            to={"/#"}
            className="h-10 flex gap-x-4 items-center text-sm font-semibold text-link rounded hover:text-white px-4"
          >
            <span className="transition-all">{/* home icon */}</span>
            Ana sayfa
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="bg-active text-white"
            exact
            to={"/todo"}
            className="h-10 flex gap-x-4 items-center text-sm font-semibold text-link rounded hover:text-white px-4"
          >
            <span className="transition-all">{/* todo icon */}</span>
            Things To Do
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
