import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { PremiumShell } from './components/layout/PremiumShell';
import { DashboardV2 } from './pages/v2/Dashboard';
import { AICoach } from './pages/v2/AICoach';
import { TrainingEngine } from './pages/v2/TrainingEngine';
import { Nutrition } from './pages/v2/Nutrition';
import { ProfileV2 } from './pages/v2/SecondaryPages';
import { BodyAnalytics } from './pages/v2/BodyAnalytics';
import { HeroLanding } from './pages/v2/Landing/HeroLanding';
import { Auth } from './pages/v2/Auth';
import { TrainingSession } from './pages/v2/TrainingSession';
import { useUserStore } from './store/useUserStore';

// Placeholder for Settings
const SettingsPlaceholder = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
    <div className="w-16 h-16 rounded-3xl bg-brand/10 flex items-center justify-center text-brand">
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>
    <h2 className="text-2xl font-bold">Settings</h2>
    <p className="text-muted max-w-xs">App preferences and neural configurations are being optimized.</p>
  </div>
);

function App() {
  const theme = useUserStore((state) => state.theme);

  useEffect(() => {
    // Apply theme to document root
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  useEffect(() => {
    // On hard reload, we want to show the cinematic landing
    const isReload = window.performance && window.performance.navigation.type === 1;
    if (isReload) {
      window.location.href = '/';
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroLanding />} />
        <Route path="/auth" element={<Auth />} />
        <Route element={<PremiumShell><Outlet /></PremiumShell>}>
          <Route path="/hub" element={<DashboardV2 />} />
          <Route path="/coach" element={<AICoach />} />
          <Route path="/training" element={<TrainingEngine />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/progress" element={<BodyAnalytics />} />
          <Route path="/profile" element={<ProfileV2 />} />
          <Route path="/settings" element={<SettingsPlaceholder />} />
        </Route>
        <Route path="/session" element={<TrainingSession />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
