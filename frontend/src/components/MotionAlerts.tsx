import { AlertTriangle, Clock, MapPin } from 'lucide-react';

export function MotionAlerts() {
  const sampleAlerts = [
    { id: 1, camera: 'Front Door Camera', location: 'Main Entrance', time: '5 mins ago', severity: 'high' },
    { id: 2, camera: 'Back Gate Camera', location: 'Rear Entrance', time: '1 hour ago', severity: 'medium' },
    { id: 3, camera: 'Hallway Camera', location: 'Corridor', time: '3 hours ago', severity: 'low' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500/10 border-red-500/50 text-red-400';
      case 'medium':
        return 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400';
      case 'low':
        return 'bg-blue-500/10 border-blue-500/50 text-blue-400';
      default:
        return 'bg-slate-700/50 border-slate-600 text-slate-400';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Motion Alerts</h2>
        <span className="px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-full text-red-400 text-sm font-medium">
          3 Active
        </span>
      </div>

      <div className="space-y-3">
        {sampleAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`rounded-lg border p-4 ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{alert.camera}</h3>
                <div className="space-y-1 text-sm opacity-90">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    <span>{alert.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    <span>{alert.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700 rounded-lg text-center text-slate-400">
        <p>Motion alerts will be populated from your backend integration</p>
      </div>
    </div>
  );
}
