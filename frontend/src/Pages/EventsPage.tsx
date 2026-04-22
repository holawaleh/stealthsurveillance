import DashboardLayout from "../components/Layout/DashboardLayout";

export default function EventsPage() {
  return (
    <DashboardLayout >

      <h1 className="text-3xl font-bold mb-4">
        Events
      </h1>

      <p className="text-slate-400">
        Surveillance events feed.
      </p>

    </DashboardLayout>
  );
}