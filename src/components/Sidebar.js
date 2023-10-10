import React from "react";
import Menu from "./Sidebar/Menu";
import fenerbahce from "../img/fenerbahce.png";
function Sidebar() {
  return (
    <aside className="w-60 pt-6 flex flex-shrink-0 flex-col bg-black">
      <a href="/" className="flex items-center justify-center mb-7 px-6">
        <img src={fenerbahce} alt="" className="h-10" />
      </a>
      <Menu />
    </aside>
  );
}

export default Sidebar;
