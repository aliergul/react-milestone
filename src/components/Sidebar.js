import React from "react";
import Menu from "./Sidebar/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

function Sidebar() {
  return (
    <aside className="w-60 pt-6 flex flex-shrink-0 flex-col bg-black">
      <a href="/" className="flex items-center justify-center mb-7 px-6 gap-4">
        <GitHubIcon className="h-10" />
        <TwitterIcon className="h-10" />
        <InstagramIcon className="h-10" />
      </a>
      <Menu />
    </aside>
  );
}

export default Sidebar;
