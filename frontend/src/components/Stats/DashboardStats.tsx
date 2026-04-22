import StatCard from "./StatCard";

type Device = {
  is_online?: boolean;
};

type Props = {
  devices: Device[];
};

export default function DashboardStats({
  devices,
}: Props) {
  const totalDevices =
    devices.length;

  const onlineDevices =
    devices.filter(
      (d) => d.is_online
    ).length;

  const offlineDevices =
    totalDevices - onlineDevices;

  // placeholder for future events API
  const alertsToday = 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      <StatCard
        title="Total Devices"
        value={totalDevices}
      />

      <StatCard
        title="Online Devices"
        value={onlineDevices}
        color="text-green-400"
      />

      <StatCard
        title="Offline Devices"
        value={offlineDevices}
        color="text-red-400"
      />

      <StatCard
        title="Alerts Today"
        value={alertsToday}
        color="text-yellow-400"
      />

    </div>
  );
}