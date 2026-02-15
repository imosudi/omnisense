
import React from 'react';
import { AppSection, ResearchItem, Alert } from '../types';

interface DashboardProps {
  history: ResearchItem[];
  alerts: Alert[];
  onNavigate: (section: AppSection) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ history, alerts, onNavigate }) => {
  const recentItems = history.slice(0, 3);
  const recentAlerts = alerts.slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
              <i className="fa-solid fa-search text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Total Research</h3>
            <p className="text-slate-500 text-sm">Reports generated so far</p>
          </div>
          <p className="text-4xl font-bold text-slate-900 mt-4">{history.length}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
              <i className="fa-solid fa-bell text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Active Alerts</h3>
            <p className="text-slate-500 text-sm">Price drops and site changes</p>
          </div>
          <p className="text-4xl font-bold text-slate-900 mt-4">{alerts.length}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <i className="fa-solid fa-check-circle text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Data Health</h3>
            <p className="text-slate-500 text-sm">Source reliability score</p>
          </div>
          <p className="text-4xl font-bold text-slate-900 mt-4">98%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Recent Research</h2>
            <button 
              onClick={() => onNavigate(AppSection.HISTORY)}
              className="text-sm text-indigo-600 font-medium hover:underline"
            >
              View All
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-50">
            {recentItems.length > 0 ? (
              recentItems.map((item) => (
                <div key={item.id} className="p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    item.type === 'web' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                  }`}>
                    <i className={`fa-solid ${item.type === 'web' ? 'fa-globe' : 'fa-image'}`}></i>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 truncate max-w-md">{item.url}</p>
                    <p className="text-sm text-slate-600 mt-2 line-clamp-2">{item.summary}</p>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <p className="text-slate-400 italic">No research history yet.</p>
                <button 
                  onClick={() => onNavigate(AppSection.RESEARCH)}
                  className="mt-4 text-indigo-600 font-medium"
                >
                  Start your first search
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Live Alerts */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">System Monitoring</h2>
            <button 
              onClick={() => onNavigate(AppSection.ALERTS)}
              className="text-sm text-indigo-600 font-medium hover:underline"
            >
              Manage Alerts
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-100">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Real-time updates
              </span>
            </div>
            <div className="divide-y divide-slate-50 max-h-[400px] overflow-y-auto">
              {recentAlerts.length > 0 ? (
                recentAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 flex gap-4 items-start">
                    <div className={`w-2 h-10 rounded-full ${
                      alert.severity === 'high' ? 'bg-red-400' : 
                      alert.severity === 'medium' ? 'bg-amber-400' : 'bg-blue-400'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{alert.message}</p>
                      <p className="text-xs text-slate-400 mt-1">{new Date(alert.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-slate-400">
                  <i className="fa-solid fa-bell-slash text-4xl mb-3 opacity-20"></i>
                  <p>No active alerts at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
