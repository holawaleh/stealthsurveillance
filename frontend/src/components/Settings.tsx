import { useState } from 'react';
import { Save, Camera, Bell, Shield, HardDrive } from 'lucide-react';

export function Settings() {
  const [cameraPreferences, setCameraPreferences] = useState({
    autoRecord: true,
    motionDetection: true,
    nightVision: true,
    alertNotifications: true,
    emailAlerts: false,
    recordingQuality: 'high',
    retentionDays: 30,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Settings</h2>
        <p className="text-slate-400">Configure your camera preferences and system settings</p>
      </div>

      <div className="space-y-6">
        <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-600/20 rounded-lg">
              <Camera className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Camera Preferences</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Auto Record</p>
                <p className="text-sm text-slate-400">Automatically record when motion is detected</p>
              </div>
              <input
                type="checkbox"
                checked={cameraPreferences.autoRecord}
                onChange={(e) => setCameraPreferences({ ...cameraPreferences, autoRecord: e.target.checked })}
                className="w-5 h-5 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Motion Detection</p>
                <p className="text-sm text-slate-400">Enable AI-based motion detection</p>
              </div>
              <input
                type="checkbox"
                checked={cameraPreferences.motionDetection}
                onChange={(e) => setCameraPreferences({ ...cameraPreferences, motionDetection: e.target.checked })}
                className="w-5 h-5 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Night Vision</p>
                <p className="text-sm text-slate-400">Enable infrared night mode</p>
              </div>
              <input
                type="checkbox"
                checked={cameraPreferences.nightVision}
                onChange={(e) => setCameraPreferences({ ...cameraPreferences, nightVision: e.target.checked })}
                className="w-5 h-5 cursor-pointer"
              />
            </div>

            <div className="border-t border-slate-700 pt-4">
              <div className="mb-3">
                <label htmlFor="quality" className="block text-white font-medium mb-2">
                  Recording Quality
                </label>
                <select
                  id="quality"
                  value={cameraPreferences.recordingQuality}
                  onChange={(e) => setCameraPreferences({ ...cameraPreferences, recordingQuality: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="low">Low (720p)</option>
                  <option value="medium">Medium (1080p)</option>
                  <option value="high">High (2K)</option>
                  <option value="ultra">Ultra (4K)</option>
                </select>
              </div>

              <div>
                <label htmlFor="retention" className="block text-white font-medium mb-2">
                  Video Retention (Days)
                </label>
                <input
                  id="retention"
                  type="number"
                  min="1"
                  max="365"
                  value={cameraPreferences.retentionDays}
                  onChange={(e) => setCameraPreferences({ ...cameraPreferences, retentionDays: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <p className="text-sm text-slate-400 mt-1">Videos older than this will be automatically deleted</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-600/20 rounded-lg">
              <Bell className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Notification Settings</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Push Notifications</p>
                <p className="text-sm text-slate-400">Get alerts on your mobile device</p>
              </div>
              <input
                type="checkbox"
                checked={cameraPreferences.alertNotifications}
                onChange={(e) => setCameraPreferences({ ...cameraPreferences, alertNotifications: e.target.checked })}
                className="w-5 h-5 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Email Alerts</p>
                <p className="text-sm text-slate-400">Receive email notifications for important events</p>
              </div>
              <input
                type="checkbox"
                checked={cameraPreferences.emailAlerts}
                onChange={(e) => setCameraPreferences({ ...cameraPreferences, emailAlerts: e.target.checked })}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-600/20 rounded-lg">
              <HardDrive className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Storage</h3>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-white text-sm">Storage Used</p>
                <p className="text-slate-400 text-sm">450 GB / 1 TB</p>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <p className="text-sm text-slate-400">45% of storage capacity used</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
          {saved && (
            <div className="flex items-center gap-2 px-4 py-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400">
              <span>Settings saved successfully</span>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg text-center text-slate-400">
          <p>Settings will be synchronized with your backend</p>
        </div>
      </div>
    </div>
  );
}
