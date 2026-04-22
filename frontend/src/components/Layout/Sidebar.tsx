import {
  Link,
  useLocation,
} from "react-router-dom";

type Props = {
  sidebarOpen: boolean;

  setSidebarOpen: (
    open: boolean
  ) => void;
};

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: Props) {
  const location = useLocation();

  const items = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },

    {
      name: "Devices",
      path: "/devices",
    },

    {
      name: "Events",
      path: "/events",
    },

    {
      name: "Logs",
      path: "/logs",
    },

    {
      name: "Settings",
      path: "/settings",
    },
  ];

  return (
    <aside
      className={`
        fixed md:static z-50 top-0 left-0
        h-screen w-64
        bg-slate-900 border-r border-slate-800
        flex flex-col
        transform transition-transform duration-300

        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
      `}
    >

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

        {items.map((item) => {
          const isActive =
            location.pathname ===
            item.path;

          return (
            <Link
              key={item.name}
              to={item.path}

              onClick={() =>
                setSidebarOpen(false)
              }

              className={`block w-full text-left px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          );
        })}

      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
        SilentGuard v1.0
      </div>

    </aside>
  );
}