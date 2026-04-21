import { useState } from 'react';
import { X, Camera } from 'lucide-react';

interface AddCameraModalProps {
  onClose: () => void;
  onSuccess: (camera: { name: string; provision_code: string }) => void;
}

export function AddCameraModal({ onClose, onSuccess }: AddCameraModalProps) {
  const [name, setName] = useState('');
  const [provisionCode, setProvisionCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !provisionCode) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      onSuccess({ name, provision_code: provisionCode });
      // Reset on success
      setName('');
      setProvisionCode('');
    } catch (err) {
      setError('Failed to add camera');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600/20 p-2 rounded-lg">
              <Camera className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Add Camera</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Camera Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Front Gate Camera"
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Provision Code
            </label>
            <input
              type="text"
              value={provisionCode}
              onChange={(e) => setProvisionCode(e.target.value.toUpperCase())}
              placeholder="e.g., ABC123DEF456"
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white uppercase"
            />
            <p className="text-xs text-slate-500 mt-1">Get this from your device label or setup guide</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded-lg transition font-medium"
            >
              {loading ? 'Claiming...' : 'Claim Device'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
