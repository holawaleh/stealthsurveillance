import DashboardLayout from "../components/Layout/DashboardLayout";

export default function SettingsPage() {
  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-4">
        Settings
      </h1>

      <p className="text-slate-400">
        User and platform settings.
      </p>

    </DashboardLayout>
  );
}