import { useState } from "react";

import DashboardLayout from "./Layout/DashboardLayout";

import DeviceGrid from "./Devices/DeviceGrid";

import ClaimDeviceModal from "./Devices/ClaimDeviceModal";

import DashboardStats from "./Stats/DashboardStats";

import ActivityFeed from "./Events/ActivityFeed";

type Device = {
  is_online?: boolean;
};

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [refreshKey, setRefreshKey] =
    useState(0);

  const [devices, setDevices] = useState<
    Device[]
  >([]);

  return (
    <DashboardLayout>

      {/* HERO */}
      <div className="mb-8">

        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Dashboard
        </h1>

        <p className="text-slate-400">
          Monitor and manage your surveillance
          infrastructure.
        </p>

      </div>

      {/* STATS */}
      <DashboardStats devices={devices} />

      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl md:text-2xl font-semibold">
          Your Devices
        </h2>

        <button
          onClick={() =>
            setIsModalOpen(true)
          }
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
        >
          + Claim Device
        </button>

      </div>

      {/* DEVICE GRID */}
      <DeviceGrid
        refreshKey={refreshKey}
        onDevicesLoaded={setDevices}
      />

      {/* ACTIVITY FEED */}
      <div className="mt-10">
        <ActivityFeed />
      </div>

      {/* MODAL */}
      <ClaimDeviceModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onSuccess={() =>
          setRefreshKey(
            (prev) => prev + 1
          )
        }
      />

    </DashboardLayout>
  );
}