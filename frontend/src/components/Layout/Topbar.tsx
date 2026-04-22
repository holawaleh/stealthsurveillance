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
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 md:px-6">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        {/* MOBILE MENU */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-slate-300"
        >
          <Menu size={24} />
        </button>

        <div>
          <h2 className="text-lg font-semibold text-white">
            Welcome back 👋
          </h2>

          <p className="text-sm text-slate-400 truncate max-w-[150px] md:max-w-none">
            {user?.email}
          </p>
        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* STATUS */}
        <div className="hidden md:flex items-center gap-2 text-sm text-green-400">

          <span className="w-2 h-2 rounded-full bg-green-400"></span>

          System Active

        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 px-3 md:px-4 py-2 rounded-lg transition text-sm"
        >
          Logout
        </button>

      </div>
    </header>
  );
}