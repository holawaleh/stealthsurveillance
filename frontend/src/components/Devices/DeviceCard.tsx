type Device = {
  id: string;
  name: string;
  provision_code: string;
  api_key: string;
};

type Props = {
  device: Device;
};

export default function DeviceCard({
  device,
}: Props) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-blue-500 transition">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          {device.name}
        </h3>

        {/* Fake online state for now */}
        <span className="text-xs text-green-400">
          ● Online
        </span>
      </div>

      {/* BODY */}
      <div className="space-y-2 text-sm text-slate-400">

        <div>
          <span className="text-slate-500">
            Device ID:
          </span>{" "}
          {device.id}
        </div>

        <div>
          <span className="text-slate-500">
            Provision:
          </span>{" "}
          {device.provision_code}
        </div>

      </div>
    </div>
  );
}