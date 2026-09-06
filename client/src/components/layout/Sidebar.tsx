import React from "react";
import { BsCreditCard2Back } from "react-icons/bs";
import { GrAnalytics, GrTransaction } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { LuWallet } from "react-icons/lu";
import { TbLayoutDashboard } from "react-icons/tb";
import { NavLink } from "react-router-dom";

interface SidebarLink {
  label: string;
  link: string;
  icon?: React.ReactNode;
}

interface NavItemProps {
  el: SidebarLink;
}

const linkData: SidebarLink[] = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <TbLayoutDashboard/>
  },
  {
    label: "Accounts",
    link: "accounts",
    icon: <LuWallet/>
  },
  {
    label: "Transactions",
    link: "transactions",
    icon: <GrTransaction />
  },
  {
    label: "Credit Cards",
    link: "cards",
    icon: <BsCreditCard2Back />
  },
  {
    label: "Analytics",
    link: "analytics",
    icon: <GrAnalytics />
  },
  {
    label: "Settings",
    link: "settings",
    icon: <IoSettingsOutline />
  },
];

const Sidebar = () => {
  const sidebarLinks = linkData;

  const NavItem = ({ el }: NavItemProps) => {
    return (
      <NavLink
        to={el.link}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
            isActive
              ? "bg-black text-white"
              : "text-zinc-400 hover:bg-gray-800 hover:text-white"
          }`
        }
      >
        {el.icon}
        <span>{el.label}</span>
      </NavLink>
    );
  };
  return (
    <div className="w-full h-full flex flex-col gap-1 p-5">
        <span className="text-2xl font-bold text-white">Vault X</span>
      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {sidebarLinks.map((link) => (
          <NavItem el={link} key={link.label} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
