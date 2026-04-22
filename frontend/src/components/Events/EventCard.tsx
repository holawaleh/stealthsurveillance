type Props = {
  title: string;
  time: string;
  type?: "motion" | "online" | "offline";
};

export default function EventCard({
  title,
  time,
  type = "motion",
}: Props) {
  const colors = {
    motion:
      "bg-yellow-500/20 text-yellow-400",
    online:
      "bg-green-500/20 text-green-400",
    offline:
      "bg-red-500/20 text-red-400",
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center justify-between">

      <div>
        <h4 className="font-medium">
          {title}
        </h4>

        <p className="text-sm text-slate-400 mt-1">
          {time}
        </p>
      </div>

      <div
        className={`text-xs px-3 py-1 rounded-full ${colors[type]}`}
      >
        {type}
      </div>

    </div>
  );
}