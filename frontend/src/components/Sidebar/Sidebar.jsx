import React, { createContext, useEffect, useState } from "react";
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
import { useLocation } from "react-router-dom";

export const SidebarContext = createContext();

const Sidebar = ({ onToggle }) => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  const handleMouseHover = () => {
    setExpanded(true);
    onToggle(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
    onToggle(false);
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

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  return (
    <aside
      className={`sidebar h-screen transition-all duration-300 ${
        expanded ? "w-[260px]" : "w-[64px]"
      }`}
    >
      <nav className="pl-4 pr-4 pt-8 pb-8 h-full flex flex-col justify-between items-stretch bg-(--color-background-1) border-black-10">
        <img
          src={logo}
          className={`overflow-hidden transition-all ${
            expanded ? "icon-size-80" : "icon-size-40"
          }`}
          alt="logo"
        />

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex flex-col gap-4">
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              text="Overview"
              path="/Overview"
              active={activePath === "/Overview"}
              setActivePath={setActivePath}
            />
            <SidebarItem
              icon={<ListTodo size={20} />}
              text="Tasks"
              path="/tasks"
              active={activePath === "/tasks"}
              setActivePath={setActivePath}
            />
            <SidebarItem
              icon={<CircleDollarSign size={20} />}
              text="Expense"
              path="/expense"
              active={activePath === "/expense"}
              setActivePath={setActivePath}
            />
            <SidebarItem
              icon={<MessageSquare size={20} />}
              text="Chat"
              path="/chat"
              active={activePath === "/chat"}
              setActivePath={setActivePath}
            />
            <SidebarItem
              icon={<SquareActivity size={20} />}
              text="Fitness"
              path="/fitness"
              active={activePath === "/fitness"}
              setActivePath={setActivePath}
            />
            <SidebarItem
              icon={<Settings size={20} />}
              text="Settings"
              path="/settings"
              active={activePath === "/settings"}
              setActivePath={setActivePath}
            />
          </ul>
        </SidebarContext.Provider>

        <div className="pb-12 pt-12 pl-12 pr-12 gap-8 flex">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="icon-size-28 mt-auto mb-auto rounded-md"
          />
          {expanded && (
            <div className="flex justify-between items-center overflow-hidden gap-16 transition-all">
              <div className="flex flex-col">
                <h4 className="font-family-sans font-normal text-12 text-(--color-black-80)">
                  Zohaib Hassan
                </h4>
                <span className="font-family-sans font-normal text-12 text-(--color-black-40)">
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
