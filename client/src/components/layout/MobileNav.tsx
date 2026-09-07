import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      />

      {/* Drawer */}
      <aside className="fixed left-0 top-0 z-50 h-full w-72 border-r border-slate-700 bg-[#0F172A] p-6 shadow-2xl">
        
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            Vault X
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
          >
            <IoClose size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <NavLink
            to="/"
            onClick={onClose}
            className="block rounded-xl px-4 py-3 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/accounts"
            onClick={onClose}
            className="block rounded-xl px-4 py-3 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
           Accounts
          </NavLink>

          <NavLink
            to="/transactions"
            onClick={onClose}
            className="block rounded-xl px-4 py-3 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            Transactions
          </NavLink>

          <NavLink
            to="/cards"
            onClick={onClose}
            className="block rounded-xl px-4 py-3 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
           Credit Cards
          </NavLink>

          <NavLink
            to="/analytics"
            onClick={onClose}
            className="block rounded-xl px-4 py-3 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            Analytics
          </NavLink>

          <NavLink
            to="/settings"
            onClick={onClose}
            className="block rounded-xl px-4 py-3 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            Settings
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default MobileNav;