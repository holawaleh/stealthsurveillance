type Props = {
  active: string;

  onChange: (
    value: string
  ) => void;
};

export default function EventFilters({
  active,
  onChange,
}: Props) {
  const filters = [
    "all",
    "motion",
    "online",
    "offline",
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-6">

      {filters.map((filter) => {
        const isActive =
          active === filter;

        return (
          <button
            key={filter}

            onClick={() =>
              onChange(filter)
            }

            className={`px-4 py-2 rounded-lg text-sm capitalize transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            {filter}
          </button>
        );
      })}

    </div>
  );
}