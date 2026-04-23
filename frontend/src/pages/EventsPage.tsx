import { useMemo, useState } from "react";

import DashboardLayout from "../components/Layout/DashboardLayout";

import EventFilters from "../components/Events/EventFilters";

import EventsTimeline from "../components/Events/EventsTimeline";

export default function EventsPage() {
  const [filter, setFilter] =
    useState("all");

  // MOCK DATA FOR NOW
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
        "Entrance Camera online",
      time: "10 mins ago",
      type: "online" as const,
    },

    {
      id: 3,
      title:
        "Backyard Camera offline",
      time: "25 mins ago",
      type: "offline" as const,
    },

    {
      id: 4,
      title:
        "Motion detected — Garage",
      time: "40 mins ago",
      type: "motion" as const,
    },
  ];

  // FILTERED EVENTS
  const filteredEvents =
    useMemo(() => {
      if (filter === "all") {
        return events;
      }

      return events.filter(
        (event) =>
          event.type === filter
      );
    }, [filter]);

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold mb-2">
          Events
        </h1>

        <p className="text-slate-400">
          Monitor surveillance activity
          across your infrastructure.
        </p>

      </div>

      {/* FILTERS */}
      <EventFilters
        active={filter}
        onChange={setFilter}
      />

      {/* TIMELINE */}
      <EventsTimeline
        events={filteredEvents}
      />

    </DashboardLayout>
  );
}