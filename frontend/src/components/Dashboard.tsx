import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CameraCard } from './CameraCard';
import { AddCameraModal } from './AddCameraModal';
import { EditCameraModal } from './EditCameraModal';
import { MotionAlerts } from './MotionAlerts';
import { Logs } from './Logs';
import { UserActivity } from './UserActivity';
import { Settings } from './Settings';
import { Plus, LogOut, Video, AlertTriangle, FileText, Activity, Settings as SettingsIcon } from 'lucide-react';

interface Camera {
  id: string;
  name: string;
  location: string;
}

type TabType = 'cameras' | 'alerts' | 'logs' | 'activity' | 'settings';

const MOCK_CAMERAS: Camera[] = [
  {
    id: '1',
    name: 'Front Gate',
    location: 'Main Entrance',
  },
  {
    id: '2',
    name: 'Office',
    location: 'Admin Block',
  },
];



export function Dashboard() {
  const { user, signOut } = useAuth();
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCamera, setEditingCamera] = useState<Camera | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('cameras');

  useEffect(() => {
    loadCameras();
  }, []);

  const loadCameras = async () => {
  setLoading(true);

  // simulate network delay
  await new Promise((res) => setTimeout(res, 500));

  setCameras(MOCK_CAMERAS);
  setLoading(false);
};


const handleDeleteCamera = async (id: string) => {
  if (!confirm('Are you sure you want to delete this camera?')) return;

  setCameras((prev) => prev.filter((cam) => cam.id !== id));
};


  const handleEditCamera = (id: string) => {
    const camera = cameras.find((cam) => cam.id === id);
    if (camera) {
      setEditingCamera(camera);
    }
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'cameras', label: 'Cameras', icon: <Video className="w-4 h-4" /> },
    { id: 'alerts', label: 'Motion Alerts', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'logs', label: 'Logs', icon: <FileText className="w-4 h-4" /> },
    { id: 'activity', label: 'Activity', icon: <Activity className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Surveillance System</h1>
                <p className="text-xs text-slate-400">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-4 border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'cameras' && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">My Cameras</h2>
                <p className="text-slate-400">Manage and monitor your surveillance cameras</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-lg shadow-blue-600/30"
              >
                <Plus className="w-5 h-5" />
                <span>Add Camera</span>
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-slate-400">Loading cameras...</div>
              </div>
            ) : cameras.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800/50 rounded-2xl mb-4">
                  <Video className="w-10 h-10 text-slate-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No cameras yet</h3>
                <p className="text-slate-400 mb-6">Get started by adding your first surveillance camera</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-lg shadow-blue-600/30"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Your First Camera</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cameras.map((camera) => (
                  <CameraCard
                    key={camera.id}
                    id={camera.id}
                    name={camera.name}
                    location={camera.location}
                    onDelete={handleDeleteCamera}
                    onEdit={handleEditCamera}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'alerts' && <MotionAlerts />}
        {activeTab === 'logs' && <Logs />}
        {activeTab === 'activity' && <UserActivity />}
        {activeTab === 'settings' && <Settings />}
      </main>

     {showAddModal && (
  <AddCameraModal
    onClose={() => setShowAddModal(false)}
    onSuccess={(newCamera) => {
      setCameras((prev) => [newCamera, ...prev]);
      setShowAddModal(false);
    }}
  />
)}


      {editingCamera && (
        <EditCameraModal
          camera={editingCamera}
          onClose={() => setEditingCamera(null)}
          onSuccess={() => {
            setEditingCamera(null);
            loadCameras();
          }}
        />
      )}
    </div>
  );
}
