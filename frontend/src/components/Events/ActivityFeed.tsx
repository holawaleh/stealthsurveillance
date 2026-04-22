import EventCard from "./EventCard";

export default function ActivityFeed() {
  // placeholder data for now
  const events = [
    {
      id: 1,
      title:
        "Motion detected — Front Gate",
      time: "2 mins ago",
      type: "motion" as const,
    },

    {
      id: 2,
      title:
        "Camera Entrance online",
      time: "10 mins ago",
      type: "online" as const,
    },

    {
      id: 3,
      title:
        "Backyard Camera offline",
      time: "30 mins ago",
      type: "offline" as const,
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-semibold">
            Live Activity
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Recent surveillance events
          </p>
        </div>

        <div className="text-green-400 text-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          Live
        </div>

      </div>

      {/* EVENTS */}
      <div className="space-y-4">

        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            time={event.time}
            type={event.type}
          />
        ))}

      </div>
    </div>
  );
}