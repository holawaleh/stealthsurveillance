type Props = {
  active?: string;
};

export default function Sidebar({
  active,
}: Props) {
  const items = [
    "Dashboard",
    "Devices",
    "Events",
    "Logs",
    "Settings",
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">

      {/* LOGO */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white">
          SilentGuard
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Surveillance Platform
        </p>
      </div>

      {/* NAV */}
      <nav className="flex-1 p-4 space-y-2">

        {items.map((item) => (
          <button
            key={item}
            className={`w-full text-left px-4 py-3 rounded-lg transition ${
              active === item
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}

      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
        SilentGuard v1.0
      </div>
    </aside>
  );
}