import { useState } from "react";
import { api } from "../../utils/api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function ClaimDeviceModal({
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const [name, setName] = useState("");
  const [provisionCode, setProvisionCode] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  if (!isOpen) return null;

  const handleClaim = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await api(
        "/devices/claim/",
        "POST",
        {
          name,
          provision_code: provisionCode,
        }
      );

      // refresh device grid
      onSuccess();

      // close modal
      onClose();

      // reset form
      setName("");
      setProvisionCode("");
    } catch (err: any) {
      console.error(err);

      setError(
        "Failed to claim device"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full max-w-md">

        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-6">
          Claim Device
        </h2>

        {/* ERROR */}
        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleClaim}
          className="space-y-4"
        >

          {/* DEVICE NAME */}
          <input
            type="text"
            placeholder="Device Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full p-3 rounded bg-slate-800 border border-slate-700"
          />

          {/* PROVISION CODE */}
          <input
            type="text"
            placeholder="Provision Code"
            value={provisionCode}
            onChange={(e) =>
              setProvisionCode(
                e.target.value
              )
            }
            className="w-full p-3 rounded bg-slate-800 border border-slate-700"
          />

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading
                ? "Claiming..."
                : "Claim Device"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}