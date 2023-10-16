import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import i18n from "../../i18n/i18n";
function Menu() {
  return (
    <nav className="px-2">
      <ul className="flex flex-col gap-2">
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
            {i18n.t("pages:home_page")}
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
            {i18n.t("pages:to_do_list")}
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="bg-active text-white"
            exact
            to={"/weather"}
            className="h-10 flex gap-x-4 items-center text-sm font-semibold text-link rounded hover:text-white px-4"
          >
            <span className="transition-all">
              <ThermostatIcon />
            </span>
            {i18n.t("pages:weather")}
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="bg-active text-white"
            exact
            to={"/exchange"}
            className="h-10 flex gap-x-4 items-center text-sm font-semibold text-link rounded hover:text-white px-4"
          >
            <span className="transition-all">
              <CurrencyExchangeIcon />
            </span>
            {i18n.t("pages:exchange")}
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="bg-active text-white"
            exact
            to={"/theme"}
            className="h-10 flex gap-x-4 items-center text-sm font-semibold text-link rounded hover:text-white px-4"
          >
            <span className="transition-all">
              <ColorLensIcon />
            </span>
            {i18n.t("pages:theme_operations")}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
