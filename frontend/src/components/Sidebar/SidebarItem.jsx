import React,{ useContext } from "react"
import { SidebarContext } from "./Sidebar"

const SidebarItem = ({ icon, text, active, alert }) => {
    const { expanded } = useContext(SidebarContext)

    return (
      <li
        className={`
          flex items-center 
          font-family-sans text-14 cursor-pointer
          transition-colors group p-12 rounded-12 mr-8
          ${
            active
              ? "bg-primary text-white-100"
              : "hover:bg-hover-primary text-font-color"
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
    )
}

export default SidebarItem