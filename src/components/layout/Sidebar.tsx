import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Activity, 
  Target, 
  User, 
  Settings, 
  ChevronLeft,
  Command,
  Plus,
  Search,
  Sparkles
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Activity, label: 'Performance', path: '/performance' },
  { icon: Sparkles, label: 'AI Training', path: '/ai-training' },
  { icon: Target, label: 'Goals', path: '/goals' },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 70 : 260 }}
      className="h-screen bg-bg-main border-r border-border-subtle flex flex-col sticky top-0 z-[100] group/sidebar"
    >
      {/* Workspace / Brand */}
      <div className="p-4 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded bg-white flex items-center justify-center shrink-0">
            <Activity className="text-black w-5 h-5" />
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col"
            >
              <span className="text-sm font-bold leading-none">Fitness Pro</span>
              <span className="text-[10px] text-white/40 mt-1 uppercase font-bold tracking-tight">Elite Team</span>
            </motion.div>
          )}
        </div>
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-6 h-6 rounded border border-border-subtle flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all opacity-0 group-hover/sidebar:opacity-100"
        >
          <ChevronLeft className={cn("w-4 h-4 transition-transform", isCollapsed && "rotate-180")} />
        </button>
      </div>

      {/* Main Nav */}
      <div className="flex-1 px-3 space-y-1">
        <div className="mb-6">
          {!isCollapsed && <p className="px-3 mb-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">Main</p>}
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group relative",
                  isActive 
                    ? "bg-white/10 text-white" 
                    : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-white" : "group-hover:text-white")} />
                {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute left-0 w-0.5 h-4 bg-white rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div>
          {!isCollapsed && <p className="px-3 mb-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">Quick Actions</p>}
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-white/50 hover:text-white hover:bg-white/5 transition-all group">
            <Plus className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium text-left">New Session</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-white/50 hover:text-white hover:bg-white/5 transition-all group">
            <Search className="w-4 h-4 shrink-0" />
            {!isCollapsed && (
              <div className="flex items-center justify-between flex-1">
                <span className="text-sm font-medium">Search</span>
                <div className="flex items-center gap-1 px-1 py-0.5 rounded border border-white/10 text-[8px] font-bold">
                  <Command className="w-2 h-2" />
                  <span>K</span>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border-subtle space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-white/50 hover:text-white hover:bg-white/5 transition-all group">
          <Settings className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-white/50 hover:text-white hover:bg-white/5 transition-all group">
          <User className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">Account</span>}
        </button>
      </div>
    </motion.aside>
  );
};
