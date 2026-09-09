import { useEffect, useRef, useState } from "react";
import MobileNav from "./MobileNav";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { RiNotificationLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { notifications } from "../../types/notification";

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

const notificationIcons = {
  payment: {
    icon: "💰",
    bg: "bg-green-500/20",
  },
  pending: {
    icon: "⚡",
    bg: "bg-yellow-500/20",
  },
  security: {
    icon: "🔒",
    bg: "bg-blue-500/20",
  },
};

const Navbar = () => {
  const location = useLocation();

  const currentPage = pageInfo[location.pathname] || {
    title: "Dashboard",
    subtitle: "Welcome back",
  };

  const { darkMode, toggleTheme } = useTheme();

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between bg-slate-100 dark:bg-[#0F172A] px-3 py-5 md:px-6">
      {/* Mobile Menu */}
      <button
        onClick={() => setIsMobileNavOpen(true)}
        className="block cursor-pointer rounded-xl border border-slate-200 bg-white hover:bg-slate-100 dark:border-slate-700
        dark:bg-slate-800 px-2 py-1 text-2xl dark:text-zinc-400 transition
        dark:hover:bg-slate-700 md:hidden"
      >
        ☰
      </button>

      {/* Page Title */}
      <div className="hidden md:block">
        <h2 className="text-xl font-semibold  text-slate-900 dark:text-white">
          {currentPage.title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {currentPage.subtitle}
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <div ref={notificationRef} className="relative">
          <button
            onClick={() => setIsNotificationsOpen((prev) => !prev)}
            className="relative rounded-full border border-slate-200 bg-white p-3 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <RiNotificationLine className="text-xl text-slate-700 dark:text-white" />

            {/* Notification indicator */}
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>
          {isNotificationsOpen && (
            <div
              className="absolute right-0 top-14 z-50 w-80 overflow-hidden rounded-2xl
border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-[#1E293B]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Notifications
                </h3>

                <span className="text-xs text-blue-500 dark:text-blue-400">
                  {notifications.length} New
                </span>
              </div>

              {/* Notification Items */}
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {notifications.map((notification) => {
                  const notificationStyle =
                    notificationIcons[notification.type];

                  return (
                    <div
                      key={notification.id}
                      className="cursor-pointer p-4 transition hover:bg-slate-100 dark:hover:bg-slate-700/50"
                    >
                      <div className="flex gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${notificationStyle.bg}`}
                        >
                          {notificationStyle.icon}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">
                            {notification.title}
                          </p>

                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {notification.message}
                          </p>

                          <span className="mt-1 block text-xs text-slate-500">
                            {notification.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <button
                className="w-full border-t border-slate-200 p-3 text-center
                text-sm text-blue-500 transition hover:bg-slate-100
              dark:border-slate-700 dark:text-blue-400 dark:hover:bg-slate-700/50 cursor-pointer"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>

        <button
          onClick={toggleTheme}
          className="rounded-full border border-slate-200 bg-white p-3
  transition hover:bg-slate-100
  dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 md:block"
        >
          {darkMode ? (
            <MdOutlineLightMode className="text-xl text-white" />
          ) : (
            <MdOutlineDarkMode className="text-xl text-slate-700" />
          )}
        </button>

        <button className="rounded-full border border-slate-200 bg-white p-3 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700">
          <FiUser className="text-xl text-slate-700 dark:text-white" />
        </button>
      </div>

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </div>
  );
};

export default Navbar;
