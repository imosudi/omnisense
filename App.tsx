
import React, { useState, useEffect } from 'react';
import { AppSection, ResearchItem, Alert } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ResearchConsole from './components/ResearchConsole';
import HistoryPanel from './components/HistoryPanel';
import AlertsPanel from './components/AlertsPanel';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.DASHBOARD);
  const [history, setHistory] = useState<ResearchItem[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Load initial data from localStorage if available
  useEffect(() => {
    const savedHistory = localStorage.getItem('omnisense_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    const savedAlerts = localStorage.getItem('omnisense_alerts');
    if (savedAlerts) setAlerts(JSON.parse(savedAlerts));
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('omnisense_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('omnisense_alerts', JSON.stringify(alerts));
  }, [alerts]);

  const addResearchItem = (item: ResearchItem) => {
    setHistory(prev => [item, ...prev]);
  };

  const addAlert = (alert: Alert) => {
    setAlerts(prev => [alert, ...prev]);
  };

  const renderSection = () => {
    switch (activeSection) {
      case AppSection.DASHBOARD:
        return <Dashboard history={history} alerts={alerts} onNavigate={setActiveSection} />;
      case AppSection.RESEARCH:
        return <ResearchConsole onSave={addResearchItem} onAlert={addAlert} />;
      case AppSection.HISTORY:
        return <HistoryPanel items={history} />;
      case AppSection.ALERTS:
        return <AlertsPanel alerts={alerts} />;
      default:
        return <Dashboard history={history} alerts={alerts} onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">
        {renderSection()}
      </main>
      <footer className="py-6 text-center text-slate-400 text-sm border-t border-slate-200">
        OmniSense Intelligent Research Assistant &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default App;
