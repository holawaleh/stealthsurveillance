import EventCard from "./EventCard";

type Event = {
  id: number;

  title: string;

  time: string;

  type:
    | "motion"
    | "online"
    | "offline";
};

type Props = {
  events: Event[];
};

export default function EventsTimeline({
  events,
}: Props) {
  if (events.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">

        <h3 className="text-xl font-semibold mb-2">
          No Events Found
        </h3>

        <p className="text-slate-400">
          No surveillance activity matches
          the selected filter.
        </p>

      </div>
    );
  }

  return (
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
  );
}