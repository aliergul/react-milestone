import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import i18n from "../i18n/i18n";
import ReactCountryFlag from "react-country-flag";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function Language() {
  const changeLanguage = (lang) => {
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
    window.location.reload(false);
  };
  return (
    <div className="relative mr-4">
      <Menu
        as="div"
        className="inline-block text-left absolute right-0 mt-2 z-50"
      >
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-30 px-4 py-2 text-sm font-medium text-sidebar hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {i18n.t("language:change")}
            <ChevronDownIcon className="w-5" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items>
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-main "
                    } text-sidebar group flex w-full items-center rounded-md px-2 py-2 text-sm bg-black bg-opacity-10`}
                    onClick={() => changeLanguage("tr")}
                  >
                    <ReactCountryFlag
                      countryCode="tr"
                      className="mr-2 h-5 w-5"
                    />
                    {i18n.t("language:tr")}
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-main "
                    } text-sidebar group flex w-full items-center rounded-md px-2 py-2 text-sm bg-black bg-opacity-10`}
                    onClick={() => changeLanguage("en")}
                  >
                    <ReactCountryFlag
                      countryCode="US"
                      className="mr-2 h-5 w-5"
                    />
                    {i18n.t("language:en")}
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
export default Language;
