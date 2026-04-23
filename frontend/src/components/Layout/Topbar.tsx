import { Menu } from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";

type Props = {
  onMenuClick: () => void;
};

export default function Topbar({
  onMenuClick,
}: Props) {
  const { user, logout } = useAuth();

  return (
    <header className="h-14 md:h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4">

      {/* LEFT */}
      <div className="flex items-center gap-3 min-w-0">

        {/* MOBILE MENU */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-slate-300 shrink-0"
        >
          <Menu size={22} />
        </button>

        <div className="min-w-0">

          <h2 className="text-sm md:text-lg font-semibold text-white truncate">
            Welcome back 👋
          </h2>

          <p className="text-xs md:text-sm text-slate-400 truncate">
            {user?.email}
          </p>

        </div>

      </div>

      {/* RIGHT */}
      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition text-xs md:text-sm shrink-0"
      >
        Logout
      </button>

    </header>
  );
}