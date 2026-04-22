type Device = {
  id: string;
  name: string;
  provision_code: string;
  api_key: string;

  // future-ready fields
  is_online?: boolean;
  last_seen?: string;
  snapshot_count?: number;
};

type Props = {
  device: Device;
};

export default function DeviceCard({
  device,
}: Props) {
  const online =
    device.is_online ?? false;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 hover:border-blue-500 transition">

      {/* HEADER */}
      <div className="flex items-start justify-between mb-5">

        <div>
          <h3 className="text-xl font-semibold">
            {device.name}
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            ID: {device.id}
          </p>
        </div>

        {/* STATUS */}
        <div
          className={`text-xs px-3 py-1 rounded-full ${
            online
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {online
            ? "Online"
            : "Offline"}
        </div>
      </div>

      {/* BODY */}
      <div className="space-y-4 text-sm">

        {/* LAST SEEN */}
        <div className="flex justify-between">
          <span className="text-slate-400">
            Last Seen
          </span>

          <span className="text-white">
            {device.last_seen ||
              "Never"}
          </span>
        </div>

        {/* SNAPSHOTS */}
        <div className="flex justify-between">
          <span className="text-slate-400">
            Snapshots
          </span>

          <span className="text-white">
            {device.snapshot_count ??
              0}
          </span>
        </div>

        {/* PROVISION */}
        <div className="flex justify-between">
          <span className="text-slate-400">
            Provision
          </span>

          <span className="text-white truncate max-w-[150px]">
            {device.provision_code}
          </span>
        </div>

      </div>

      {/* FOOTER */}
      <div className="mt-6 pt-4 border-t border-slate-700 flex justify-end">

        <button className="text-sm bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg transition">
          View Details
        </button>

      </div>
    </div>
  );
}