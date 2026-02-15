
import React, { useState } from 'react';
import { ResearchItem } from '../types';

interface HistoryPanelProps {
  items: ResearchItem[];
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ items }) => {
  const [filter, setFilter] = useState('');

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(filter.toLowerCase()) || 
    item.url.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Research Vault</h2>
          <p className="text-slate-500">All your analyzed content in one place</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
          <input
            type="text"
            placeholder="Search history..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    item.type === 'web' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                  }`}>
                    <i className={`fa-solid ${item.type === 'web' ? 'fa-globe' : 'fa-image'}`}></i>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 mb-2 line-clamp-1">{item.title}</h3>
                <p className="text-xs text-slate-400 mb-4 truncate">{item.url}</p>
                <div className="text-sm text-slate-600 line-clamp-3 mb-6 leading-relaxed">
                  {item.summary}
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <button className="text-indigo-600 text-sm font-semibold hover:text-indigo-700">
                    Open Report
                  </button>
                  <div className="flex gap-2">
                    <button className="p-1.5 text-slate-300 hover:text-red-500 transition-colors">
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-24 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-folder-open text-slate-300 text-3xl"></i>
            </div>
            <h3 className="text-slate-800 font-semibold text-lg">Empty Vault</h3>
            <p className="text-slate-400">Try running a new research analysis to see items here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;
