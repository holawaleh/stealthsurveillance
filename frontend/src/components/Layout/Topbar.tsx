import { useAuth } from "../../contexts/AuthContext";

export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">

      {/* LEFT */}
      <div>
        <h2 className="text-lg font-semibold text-white">
          Welcome back 👋
        </h2>

        <p className="text-sm text-slate-400">
          {user?.email}
        </p>
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
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}