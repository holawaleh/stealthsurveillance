import DashboardLayout from "../components/Layout/DashboardLayout";

export default function LogsPage() {
  return (
    <DashboardLayout active="Logs">

      <h1 className="text-3xl font-bold mb-4">
        Logs
      </h1>

      <p className="text-slate-400">
        System logs and audit records.
      </p>

    </DashboardLayout>
  );
}