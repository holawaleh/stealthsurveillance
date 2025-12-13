import { Camera, MapPin, MoreVertical, Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';

interface CameraCardProps {
  id: string;
  name: string;
  location: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export function CameraCard({ id, name, location, onDelete, onEdit }: CameraCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 overflow-hidden hover:border-slate-600 transition-all duration-300 group">
      <div className="relative aspect-video bg-slate-900/80 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center">
          <Camera className="w-16 h-16 text-slate-600 group-hover:text-slate-500 transition-colors" />
          <p className="text-slate-500 text-sm mt-2">Camera Stream</p>
        </div>

        <div className="absolute top-3 right-3">
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 bg-slate-900/80 backdrop-blur-sm rounded-full hover:bg-slate-800 transition"
            >
              <MoreVertical className="w-4 h-4 text-slate-400" />
            </button>

            {showMenu && (
              <div className="absolute top-full right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl min-w-[150px] overflow-hidden z-20">
                <button
                  onClick={() => {
                    onEdit(id);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-slate-300 hover:bg-slate-700 flex items-center gap-2 transition"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(id);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-slate-700 flex items-center gap-2 transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-1">{name}</h3>
        <div className="flex items-center gap-1.5 text-slate-400 text-sm">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}
