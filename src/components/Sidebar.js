import React from "react";
import Menu from "./Sidebar/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Tooltip } from "@mui/material";
import i18n from "../i18n/i18n";

function Sidebar() {
  return (
    <aside className="w-60 pt-6 flex flex-shrink-0 flex-col bg-black">
      <a href="/" className="flex items-center justify-center mb-7 px-6 gap-4">
        <Tooltip title={i18n.t("tooltips:github")} disableInteractive>
          <a
            href="https://github.com/aliergul"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon className="h-10" />
          </a>
        </Tooltip>
        <a
          href="https://www.linkedin.com/in/muhammed-ali-erg%C3%BCl-974443173/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Tooltip title={i18n.t("tooltips:linkedin")} disableInteractive>
            <LinkedInIcon className="h-10" />
          </Tooltip>
        </a>
        <a
          href="https://twitter.com/hobulus"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Tooltip title={i18n.t("tooltips:twitter")} disableInteractive>
            <TwitterIcon className="h-10" />
          </Tooltip>
        </a>
        <a
          href="https://www.instagram.com/ali_ergul_"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Tooltip title={i18n.t("tooltips:instagram")} disableInteractive>
            <InstagramIcon className="h-10" />
          </Tooltip>
        </a>
      </a>
      <Menu />
    </aside>
  );
}

export default Sidebar;
