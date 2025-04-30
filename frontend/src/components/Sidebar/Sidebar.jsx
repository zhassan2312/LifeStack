import { createContext, useState } from "react";
import { logo } from "../../constants/images";
import SidebarItem from "./SidebarItem";
import {
  MoreVertical,
  LayoutDashboard,
  ListTodo,
  MessageSquare,
  Settings,
  FolderKanban,
  CircleDollarSign,
  SquareActivity,
} from "lucide-react";
export const SidebarContext = createContext();

import React, { useEffect } from "react";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  const handleMouseHover = () => {
    setExpanded(true);
  };
  const handleMouseLeave = () => {
    setExpanded(false);
  };

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.addEventListener("mouseenter", handleMouseHover);
    sidebar.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      sidebar.removeEventListener("mouseenter", handleMouseHover);
      sidebar.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <aside
      className={`sidebar h-screen transition-all duration-300 ${
        expanded ? "w-[280px]" : "w-fit"
      }`}
    >
      <nav className="pl-4 pr-4 pt-8 pb-8 h-full flex flex-col justify-between items-stretch bg-background-1 border-black-10">
        <img
          src={logo}
          className={`overflow-hidden transition-all ${
            expanded ? "icon-size-80" : "icon-size-32"
          }`}
          alt="logo"
        />

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex flex-col gap-4">
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Overview" alert />
            <SidebarItem icon={<FolderKanban size={20} />} text="Projects" active />
            <SidebarItem icon={<ListTodo size={20} />} text="Tasks" />
            <SidebarItem icon={<CircleDollarSign size={20} />} text="Expense" />
            <SidebarItem icon={<MessageSquare size={20} />} text="Chat" alert />
            <SidebarItem icon={<SquareActivity size={20} />} text="Fitness" />
            <SidebarItem icon={<Settings size={20} />} text="Settings" />
          </ul>
        </SidebarContext.Provider>

        <div className="pb-12 pt-12 pl-12 pr-12 gap-8 flex">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="icon-size-28 mt-auto mb-auto rounded-md"
          />
          {expanded && (
            <div
              className={`
              flex justify-between items-center
              overflow-hidden gap-16 transition-all
          `}
            >
              <div className="flex flex-col ">
                <h4 className="font-family-sans font-normal text-14 text-black-80">
                  Zohaib Hassan
                </h4>
                <span className="font-family-sans font-normal text-14 text-black-40">
                  zhassan2312@gmail.com
                </span>
              </div>
              <MoreVertical size={20} />
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;