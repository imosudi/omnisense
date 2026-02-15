
import React from 'react';
import { Alert } from '../types';

interface AlertsPanelProps {
  alerts: Alert[];
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Intelligence Alerts</h2>
          <p className="text-slate-500">Significant changes detected in monitored sources</p>
        </div>
        <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-sm font-semibold transition-colors">
          Clear All
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {alerts.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-6 flex gap-6 items-start hover:bg-slate-50 transition-colors">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  alert.severity === 'high' ? 'bg-red-50 text-red-500' :
                  alert.severity === 'medium' ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-500'
                }`}>
                  <i className={`fa-solid ${
                    alert.severity === 'high' ? 'fa-triangle-exclamation' :
                    alert.severity === 'medium' ? 'fa-bolt-lightning' : 'fa-info-circle'
                  } text-xl`}></i>
                </div>
                
                <div className="flex-grow space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      alert.severity === 'high' ? 'text-red-600' :
                      alert.severity === 'medium' ? 'text-amber-600' : 'text-blue-600'
                    }`}>
                      {alert.severity} Priority
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(alert.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-800">{alert.message}</h4>
                  <div className="flex items-center gap-4 mt-4">
                    <button className="text-indigo-600 text-sm font-semibold hover:underline">
                      View details
                    </button>
                    <button className="text-slate-400 text-sm font-semibold hover:text-slate-600">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-24 text-center">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-shield-heart text-indigo-400 text-3xl"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800">System Secure</h3>
            <p className="text-slate-400 mt-2">No alerts detected in your monitored research sources.</p>
          </div>
        )}
      </div>

      {/* Alert Config Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl text-white shadow-xl shadow-indigo-200">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="shrink-0">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
              <i className="fa-solid fa-satellite-dish text-4xl animate-pulse"></i>
            </div>
          </div>
          <div className="text-center md:text-left space-y-2">
            <h3 className="text-2xl font-bold">Automatic Monitoring</h3>
            <p className="text-indigo-100 max-w-lg">
              Set up periodic scraping jobs for specific URLs. Gemini will analyze differences and notify you only when meaningful changes occur.
            </p>
            <button className="mt-4 px-6 py-2.5 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg">
              Configure Live Monitor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPanel;
