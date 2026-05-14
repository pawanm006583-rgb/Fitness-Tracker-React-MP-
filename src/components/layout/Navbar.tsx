import { Bell, Command, Search, ChevronDown, User, LogOut, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '../../utils/cn';

export const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-14 border-b border-border-subtle flex items-center justify-between px-6 bg-bg-main/50 backdrop-blur-md sticky top-0 z-[90]">
      {/* Breadcrumbs / Page Title */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-white/40">Home</span>
        <span className="text-white/20">/</span>
        <span className="text-white font-medium">Dashboard</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Trigger */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border-subtle bg-white/5 hover:border-white/20 transition-all text-white/40 group">
          <Search className="w-3.5 h-3.5 group-hover:text-white transition-colors" />
          <span className="text-xs">Search anything...</span>
          <div className="ml-4 flex items-center gap-0.5 px-1 py-0.5 rounded border border-white/10 text-[8px] font-bold bg-white/5">
            <Command className="w-2 h-2" />
            <span>K</span>
          </div>
        </button>

        <div className="h-4 w-px bg-border-subtle" />

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-md text-white/50 hover:text-white hover:bg-white/5 transition-all relative",
              showNotifications && "bg-white/5 text-white"
            )}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-brand-accent rounded-full border-2 border-bg-main" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-80 bg-bg-card border border-border-subtle rounded-lg shadow-2xl overflow-hidden z-[100]"
              >
                <div className="p-3 border-b border-border-subtle flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/40">Notifications</span>
                  <button className="text-[10px] text-brand-accent hover:underline">Mark all read</button>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-3 border-b border-border-subtle hover:bg-white/2 transition-colors cursor-pointer group">
                      <p className="text-xs font-medium text-white/80 group-hover:text-white">AI Coach: Achievement Unlocked</p>
                      <p className="text-[10px] text-white/40 mt-1 leading-relaxed">You reached your target heart rate consistency for 7 days in a row.</p>
                      <p className="text-[9px] text-white/20 mt-2 uppercase font-bold">2 hours ago</p>
                    </div>
                  ))}
                </div>
                <div className="p-2 bg-white/2 text-center">
                  <button className="text-[10px] text-white/40 hover:text-white transition-colors">View all notifications</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile */}
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 pl-2 rounded-md hover:bg-white/5 border border-transparent hover:border-border-subtle transition-all"
          >
            <span className="text-xs font-medium hidden md:block">Alex Rivera</span>
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-brand-accent to-blue-600 p-[1px]">
              <div className="w-full h-full rounded bg-bg-main flex items-center justify-center overflow-hidden">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <ChevronDown className={cn("w-3 h-3 text-white/30 transition-transform", showProfileMenu && "rotate-180")} />
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 bg-bg-card border border-border-subtle rounded-lg shadow-2xl overflow-hidden z-[100] p-1"
              >
                <div className="px-3 py-2 border-b border-border-subtle mb-1">
                  <p className="text-xs font-bold text-white">Alex Rivera</p>
                  <p className="text-[10px] text-white/40 mt-0.5">alex@fitnesspro.ai</p>
                </div>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 rounded transition-all">
                  <User className="w-3.5 h-3.5" />
                  Profile Settings
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 rounded transition-all">
                  <Settings className="w-3.5 h-3.5" />
                  Preferences
                </button>
                <div className="h-px bg-border-subtle my-1" />
                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400/80 hover:text-rose-400 hover:bg-rose-500/5 rounded transition-all">
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
