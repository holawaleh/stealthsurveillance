import { Clock, Camera, Activity } from 'lucide-react';

export function Logs() {
  const sampleLogs = [
    { id: 1, type: 'recording', camera: 'Front Door Camera', message: 'Recording started', time: '2 hours ago' },
    { id: 2, type: 'event', camera: 'Back Gate Camera', message: 'Motion detected', time: '1 hour ago' },
    { id: 3, type: 'system', camera: 'All Cameras', message: 'System check completed', time: '30 mins ago' },
    { id: 4, type: 'recording', camera: 'Hallway Camera', message: 'Recording stopped', time: '15 mins ago' },
    { id: 5, type: 'event', camera: 'Front Door Camera', message: 'Person detected', time: '5 mins ago' },
  ];

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'recording':
        return <Camera className="w-4 h-4" />;
      case 'event':
        return <Activity className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case 'recording':
        return 'text-red-400';
      case 'event':
        return 'text-blue-400';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Activity Logs</h2>

      <div className="space-y-2">
        {sampleLogs.map((log) => (
          <div key={log.id} className="flex items-start gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-800/70 transition">
            <div className={`mt-0.5 ${getLogColor(log.type)}`}>
              {getLogIcon(log.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-white text-sm">{log.camera}</span>
                <span className="text-xs px-2 py-0.5 bg-slate-700 rounded text-slate-300">
                  {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-1">{log.message}</p>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                <span>{log.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700 rounded-lg text-center text-slate-400">
        <p>Logs will be populated from your backend integration</p>
      </div>
    </div>
  );
}
