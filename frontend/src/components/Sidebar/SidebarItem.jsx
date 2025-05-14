import React, { useContext } from "react";
import { SidebarContext } from "./Sidebar";
import { useNavigate } from "react-router-dom";

const SidebarItem = ({ icon, text, active, path }) => {
  const { expanded } = useContext(SidebarContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) navigate(path);
  };

  return (
    <li
      onClick={handleClick}
      className={`
        flex items-center 
        font-family-sans text-14 cursor-pointer
        transition-colors group p-12 rounded-12 mr-8
        ${
          active
            ? "bg-(--color-primary) text-(--color-white-100)"
            : "hover:bg-(--color-hover-primary) text-(--color-font-color)"
        }
      `}
    >
      {icon}
      <span
        className={`overflow-hidden font-weight-normal transition-all ${
          expanded ? "w-[80px] ml-12" : "w-0"
        }`}
      >
        {text}
      </span>
    </li>
  );
};

export default SidebarItem;
