import { User, Clock, MapPin, Activity } from 'lucide-react';

export function UserActivity() {
  const activityData = [
    { id: 1, action: 'Viewed Front Door Camera', time: '10 mins ago', device: 'iPhone 15' },
    { id: 2, action: 'Added new camera', time: '2 hours ago', device: 'Desktop' },
    { id: 3, action: 'Reviewed motion alert', time: '3 hours ago', device: 'iPad' },
    { id: 4, action: 'Accessed settings', time: '1 day ago', device: 'Desktop' },
    { id: 5, action: 'Downloaded video footage', time: '2 days ago', device: 'Desktop' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Your Activity</h2>
        <span className="text-sm text-slate-400">Last 30 days</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Views</p>
              <p className="text-2xl font-bold text-white mt-1">24</p>
            </div>
            <Activity className="w-8 h-8 text-blue-500 opacity-50" />
          </div>
        </div>

        <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Alerts Reviewed</p>
              <p className="text-2xl font-bold text-white mt-1">12</p>
            </div>
            <Activity className="w-8 h-8 text-red-500 opacity-50" />
          </div>
        </div>

        <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Devices Active</p>
              <p className="text-2xl font-bold text-white mt-1">3</p>
            </div>
            <User className="w-8 h-8 text-green-500 opacity-50" />
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-white mb-3">Recent Activity</h3>

      <div className="space-y-2">
        {activityData.map((activity) => (
          <div key={activity.id} className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-800/70 transition">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-2 bg-slate-700 rounded">
                <Activity className="w-4 h-4 text-slate-300" />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-sm">{activity.action}</p>
                <div className="flex items-center gap-4 mt-1 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{activity.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{activity.device}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700 rounded-lg text-center text-slate-400">
        <p>Activity tracking will be integrated with your backend</p>
      </div>
    </div>
  );
}
