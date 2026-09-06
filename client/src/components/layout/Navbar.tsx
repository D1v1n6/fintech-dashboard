import React from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { RiNotificationLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const pageInfo: Record<
  string,
  {
    title: string;
    subtitle: string;
  }
> = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Manage your finances at a glance",
  },
  "/transactions": {
    title: "Transactions",
    subtitle: "View and manage all your transactions",
  },
  "/cards": {
    title: "Cards",
    subtitle: "Manage your physical and virtual cards",
  },
  "/payments": {
    title: "Payments",
    subtitle: "Pay bills, buy airtime and transfer money",
  },
  "/analytics": {
    title: "Analytics",
    subtitle: "Track your spending and financial insights",
  },
  "/settings": {
    title: "Settings",
    subtitle: "Manage your account preferences",
  },
  "/accounts": {
    title: "Account",
    subtitle: "View and update your personal information",
  },
};

const Navbar = () => {
  const location = useLocation();

  const currentPage = pageInfo[location.pathname] || {
    title: "Dashboard",
    subtitle: "Welcome back",
  };
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between bg-[#0F172A] px-3 py-5 md:px-6">
      {/* Mobile Menu */}
      <button
        className="block cursor-pointer rounded-xl border border-slate-700
        bg-slate-800 px-2 py-1 text-2xl text-zinc-400 transition
        hover:bg-slate-700 md:hidden"
      >
        ☰
      </button>

      {/* Page Title */}
      <div className="hidden md:block">
        <h2 className="text-xl font-semibold text-white">
          {currentPage.title}
        </h2>
        <p className="text-sm text-slate-400">{currentPage.subtitle}</p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <button
          className="rounded-full border border-slate-700
          bg-slate-800 p-3 transition hover:bg-slate-700"
        >
          <RiNotificationLine className="text-xl text-white" />
        </button>

        <button
          className="hidden rounded-full border border-slate-700
          bg-slate-800 p-3 transition hover:bg-slate-700 md:block"
        >
          <MdOutlineDarkMode className="text-xl text-white" />
        </button>

        <button
          className="rounded-full border border-slate-700
          bg-slate-800 p-3 transition hover:bg-slate-700"
        >
          <FiUser className="text-xl text-white" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
