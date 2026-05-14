import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Activity, 
  Dumbbell, 
  Utensils, 
  Target, 
  Award
} from 'lucide-react';
import { cn } from '../../utils/cn';

const tabs = [
  { icon: Activity, label: 'Activity', path: '/' },
  { icon: Dumbbell, label: 'Workouts', path: '/workouts' },
  { icon: Utensils, label: 'Nutrition', path: '/nutrition' },
  { icon: Target, label: 'Goals', path: '/goals' },
  { icon: Award, label: 'Badges', path: '/badges' },
];

export const TabBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-border-ios h-[84px] pb-8 px-6 flex items-center justify-between z-[100]">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) => cn(
            "flex flex-col items-center gap-1 transition-colors",
            isActive ? "text-brand-blue" : "text-[#8E8E93]"
          )}
        >
          <tab.icon className="w-6 h-6" />
          <span className="caption-text !text-current">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export const IOSShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-bg-ios max-w-[430px] mx-auto relative shadow-2xl overflow-hidden border-x border-border-ios">
      {/* Status Bar Placeholder */}
      <div className="h-11 px-8 flex items-center justify-between bg-bg-ios shrink-0">
        <span className="text-[14px] font-semibold">9:41</span>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full border border-black/20" />
          <div className="w-4 h-4 rounded-full border border-black/20" />
          <div className="w-6 h-3 rounded-sm border border-black/20" />
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-[100px] custom-scrollbar">
        {children}
      </main>

      <TabBar />
      
      {/* Home Indicator */}
      <div className="fixed bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/10 rounded-full z-[110]" />
    </div>
  );
};
