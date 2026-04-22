import { useEffect, useState } from "react";

import { api } from "../../utils/api";

import DeviceCard from "./DeviceCard";

type Device = {
  id: string;
  name: string;
  provision_code: string;
  api_key: string;

  is_online?: boolean;
  last_seen?: string;
  snapshot_count?: number;
};

type Props = {
  refreshKey?: number;
  onDevicesLoaded?: (
    devices: Device[]
  ) => void;
};

export default function DeviceGrid({
  refreshKey,
  onDevicesLoaded,
}: Props) {
  const [devices, setDevices] = useState<
    Device[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchDevices = async () => {
    try {
      setLoading(true);

      const data = await api(
        "/devices/"
      );

      setDevices(data);

      // expose upward
      onDevicesLoaded?.(data);
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

  // LOADING
  if (loading) {
    return (
      <div className="text-slate-400">
        Loading devices...
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="bg-red-500/20 text-red-400 p-4 rounded">
        {error}
      </div>
    );
  }

  // EMPTY
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

  // GRID
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