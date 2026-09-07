import { useEffect, useRef, useState } from "react";
import MobileNav from "./MobileNav";
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
    <div className="sticky top-0 z-10 flex items-center justify-between bg-[#0F172A] px-3 py-5 md:px-6">
      {/* Mobile Menu */}
      <button
        onClick={() => setIsMobileNavOpen(true)}
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
        <div ref={notificationRef} className="relative">
          <button
            onClick={() => setIsNotificationsOpen((prev) => !prev)}
            className="relative rounded-full border border-slate-700
          bg-slate-800 p-3 transition hover:bg-slate-700"
          >
            <RiNotificationLine className="text-xl text-white" />

            {/* Notification indicator */}
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>
          {isNotificationsOpen && (
            <div
              className="absolute right-0 top-14 z-50 w-80 rounded-2xl
    border border-slate-700 bg-[#1E293B] shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-700 p-4">
                <h3 className="font-semibold text-white">Notifications</h3>

                <span className="text-xs text-blue-400">3 New</span>
              </div>

              {/* Notification Items */}
              <div className="divide-y divide-slate-700">
                <div className="cursor-pointer p-4 transition hover:bg-slate-700/50">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
                      💰
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white">
                        Payment Received
                      </p>

                      <p className="text-xs text-slate-400">
                        ₦200,000 was credited to your account.
                      </p>

                      <span className="mt-1 block text-xs text-slate-500">
                        2 hours ago
                      </span>
                    </div>
                  </div>
                </div>

                <div className="cursor-pointer p-4 transition hover:bg-slate-700/50">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/20">
                      ⚡
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white">
                        Transaction Pending
                      </p>

                      <p className="text-xs text-slate-400">
                        Your PHED payment is currently processing.
                      </p>

                      <span className="mt-1 block text-xs text-slate-500">
                        Yesterday
                      </span>
                    </div>
                  </div>
                </div>

                <div className="cursor-pointer p-4 transition hover:bg-slate-700/50">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                      🔒
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white">
                        Security Update
                      </p>

                      <p className="text-xs text-slate-400">
                        Your account security settings were updated.
                      </p>

                      <span className="mt-1 block text-xs text-slate-500">
                        2 days ago
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <button
                className="w-full border-t border-slate-700 p-3 text-center
      text-sm text-blue-400 transition hover:bg-slate-700/50"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>

        <button
          className=" rounded-full border border-slate-700
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

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </div>
  );
};

export default Navbar;
