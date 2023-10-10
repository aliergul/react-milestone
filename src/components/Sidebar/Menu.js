import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import i18n from "../../i18n/i18n";
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
            <span className="transition-all">
              <HomeIcon />
            </span>
            {i18n.t("home_page")}
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="bg-active text-white"
            exact
            to={"/todo"}
            className="h-10 flex gap-x-4 items-center text-sm font-semibold text-link rounded hover:text-white px-4"
          >
            <span className="transition-all">
              <FormatListNumberedIcon />
            </span>
            {i18n.t("to_do_list")}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
