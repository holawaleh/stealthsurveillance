import DashboardLayout from "../components/Layout/DashboardLayout";

export default function DevicesPage() {
  return (
    <DashboardLayout active="Devices">

      <h1 className="text-3xl font-bold mb-4">
        Devices
      </h1>

      <p className="text-slate-400">
        Device management page.
      </p>

    </DashboardLayout>
  );
}