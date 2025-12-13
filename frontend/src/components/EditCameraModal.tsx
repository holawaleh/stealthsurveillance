import { useState } from 'react';
import { X, Camera as CameraIcon } from 'lucide-react';

interface Camera {
  id: string;
  name: string;
  location: string;
}

interface EditCameraModalProps {
  camera: Camera;
  onClose: () => void;
  onSuccess: (updatedCamera: Camera) => void;
}

export function EditCameraModal({
  camera,
  onClose,
  onSuccess,
}: EditCameraModalProps) {
  const [name, setName] = useState(camera.name);
  const [location, setLocation] = useState(camera.location);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !location) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');

    // simulate async update
    await new Promise((res) => setTimeout(res, 300));

    onSuccess({
      ...camera,
      name,
      location,
    });

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <CameraIcon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Edit Camera</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Camera Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-slate-700 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
