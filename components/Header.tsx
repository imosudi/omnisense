
import React from 'react';
import { AppSection } from '../types';

interface HeaderProps {
  activeSection: AppSection;
  onNavigate: (section: AppSection) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    { id: AppSection.DASHBOARD, label: 'Dashboard', icon: 'fa-chart-line' },
    { id: AppSection.RESEARCH, label: 'New Research', icon: 'fa-magnifying-glass' },
    { id: AppSection.HISTORY, label: 'History', icon: 'fa-clock-rotate-left' },
    { id: AppSection.ALERTS, label: 'Alerts', icon: 'fa-bell' },
  ];

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate(AppSection.DASHBOARD)}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <i className="fa-solid fa-brain text-xl"></i>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">Omni<span className="text-indigo-600">Sense</span></span>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-sm font-medium ${
                activeSection === item.id
                  ? 'bg-indigo-50 text-indigo-700 shadow-inner'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <i className={`fa-solid ${item.icon}`}></i>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <i className="fa-solid fa-gear text-lg"></i>
          </button>
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
            <img src="https://picsum.photos/seed/user/64/64" alt="User avatar" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
