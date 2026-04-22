import { useEffect, useState } from "react";

import { api } from "../../utils/api";

import DeviceCard from "./DeviceCard";

type Device = {
  id: string;
  name: string;
  provision_code: string;
  api_key: string;
};

type Props = {
  refreshKey?: number;
};

export default function DeviceGrid({
  refreshKey,
}: Props) {
  const [devices, setDevices] = useState<
    Device[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // 🔹 Fetch tenant devices
  const fetchDevices = async () => {
    try {
      setLoading(true);

      const data = await api(
        "/devices/"
      );

      setDevices(data);
    } catch (err: any) {
      console.error(err);

      setError(
        "Failed to load devices"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [refreshKey]);

  // 🔹 Loading state
  if (loading) {
    return (
      <div className="text-slate-400">
        Loading devices...
      </div>
    );
  }

  // 🔹 Error state
  if (error) {
    return (
      <div className="bg-red-500/20 text-red-400 p-4 rounded">
        {error}
      </div>
    );
  }

  // 🔹 Empty state
  if (devices.length === 0) {
    return (
      <div className="bg-slate-800 border border-dashed border-slate-700 rounded-xl p-10 text-center">

        <h3 className="text-xl font-semibold mb-2">
          No Devices Yet
        </h3>

        <p className="text-slate-400">
          Claim your first surveillance device
          to begin monitoring.
        </p>
      </div>
    );
  }

  // 🔹 Device Grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      {devices.map((device) => (
        <DeviceCard
          key={device.id}
          device={device}
        />
      ))}

    </div>
  );
}