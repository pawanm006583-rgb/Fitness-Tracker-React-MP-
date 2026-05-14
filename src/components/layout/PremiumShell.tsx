import { type ReactNode, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Search, 
  Bell, 
  LayoutDashboard, 
  Flame, 
  Activity, 
  Settings,
  Brain,
  Sparkles,
  Command,
  Plus,
  X
} from 'lucide-react';
import { Logo, Wordmark } from './Logo';
import { QuickActionSheet } from './QuickActionSheet';
import { cn } from '../../utils/cn';
import { NotificationToast } from '../ui/Toast';
import { useStore } from '../../store/useStore';

const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => cn(
      "flex flex-col items-center gap-1.5 py-2 px-5 rounded-2xl transition-all duration-500 group relative",
      isActive ? "text-brand" : "text-muted hover:text-foreground"
    )}
  >
    {({ isActive }) => (
      <>
        <Icon className={cn("w-5 h-5 transition-transform duration-500", isActive ? "scale-110" : "group-hover:scale-110")} />
        <span className="text-[9px] font-black uppercase tracking-[0.15em]">{label}</span>
        {isActive && (
          <motion.div 
            layoutId="activeTabGlow"
            className="absolute -bottom-1 w-5 h-1 bg-brand rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)]"
          />
        )}
      </>
    )}
  </NavLink>
);

const FloatingNavbar = ({ onActionClick }: { onActionClick: () => void }) => {
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-3 py-2.5 glass-effect border border-white/10 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] min-w-[340px]"
    >
      <nav className="flex items-center justify-between gap-1">
        <NavItem to="/hub" icon={LayoutDashboard} label="Home" />
        <NavItem to="/coach" icon={Brain} label="Coach" />
        
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onActionClick}
          className="w-16 h-16 bg-brand text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.6)] border-4 border-white/20 relative group active-glow"
        >
          <div className="absolute inset-0 rounded-full bg-brand animate-ping opacity-20 group-hover:opacity-0 transition-opacity" />
          <Plus className="w-8 h-8" />
        </motion.button>

        <NavItem to="/progress" icon={Activity} label="Status" />
        <NavItem to="/profile" icon={Settings} label="Self" />
      </nav>
    </motion.div>
  );
};

export const PremiumShell = ({ children }: { children: ReactNode }) => {
  const { notifications, clearNotifications } = useStore();
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aesther-theme-v1') as 'dark' | 'light';
      return saved || 'light';
    }
    return 'light';
  });

  const { scrollY } = useScroll();
  const navBgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);
  const navBlur = useTransform(scrollY, [0, 100], [0, 24]);
  const navBorder = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('aesther-theme-v1', theme);
  }, [theme]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isActionOpen, setIsActionOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-bg-main text-foreground selection:bg-brand/30 transition-colors duration-500">
      <NotificationToast />

      {/* ── Action Sheet ── */}
      <QuickActionSheet isOpen={isActionOpen} onClose={() => setIsActionOpen(false)} />

      {/* ── Search Overlay ── */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] glass-effect flex flex-col items-center pt-32 px-6"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-2xl space-y-10"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-6 border-b-2 border-brand pb-6">
                <Search className="w-10 h-10 text-brand" />
                <input 
                  autoFocus
                  placeholder="Query Performance Intelligence..." 
                  className="flex-1 bg-transparent border-none outline-none text-4xl font-bold tracking-tighter placeholder:text-muted"
                />
                <button onClick={() => setIsSearchOpen(false)} className="p-3 hover:bg-foreground/5 rounded-full transition-colors">
                  <X className="w-8 h-8 text-muted" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Hypertrophy', 'Recovery HRV', 'Metabolic Split', 'Body Evolution'].map(s => (
                  <button key={s} className="premium-card p-5 text-center text-[10px] font-black uppercase tracking-[0.2em] hover:border-brand/50 hover:bg-brand/5 transition-all">
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Top Navigation - FIXED ── */}
      <motion.header 
        style={{ 
          backgroundColor: useTransform(navBgOpacity, (o) => `var(--bg-main)${Math.floor(o * 255).toString(16).padStart(2, '0')}`),
          backdropFilter: useTransform(navBlur, (b) => `blur(${b}px)`),
          borderBottomWidth: navBorder
        }}
        className="fixed top-0 left-0 right-0 z-40 w-full border-border-subtle transition-shadow duration-500"
      >
        <div className="max-w-[1400px] mx-auto h-20 px-6 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <NavLink to="/" className="flex items-center gap-3 cursor-pointer group">
              <Logo className="w-10 h-10 group-hover:scale-110 transition-transform duration-500" />
              <Wordmark className="hidden md:flex" />
            </NavLink>

            <div className="hidden lg:flex items-center gap-10 pl-10 border-l border-white/10">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-muted uppercase tracking-[0.25em] opacity-60">Recovery</span>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full border-2 border-emerald-500/20 flex items-center justify-center bg-emerald-500/5">
                    <span className="text-[11px] font-black text-emerald-500">92</span>
                  </div>
                  <span className="text-xs font-black tracking-tight">OPTIMAL</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-muted uppercase tracking-[0.25em] opacity-60">Streak</span>
                <div className="flex items-center gap-2.5 text-orange-500">
                  <Flame className="w-5 h-5 fill-orange-500" />
                  <span className="text-sm font-black italic tracking-tighter">14 DAYS</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div 
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-foreground/[0.03] rounded-2xl border border-white/5 group cursor-pointer hover:bg-foreground/[0.06] transition-all duration-300"
            >
              <Command className="w-4 h-4 text-muted" />
              <span className="text-xs font-bold text-muted tracking-tight">Intelligence Search...</span>
              <span className="ml-6 text-[9px] font-black bg-foreground/10 px-2 py-1 rounded-lg text-muted border border-white/5">⌘ K</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="relative p-3 hover:bg-foreground/5 rounded-2xl transition-all group">
                  <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  {notifications.length > 0 && (
                    <span className="absolute top-2.5 right-2.5 w-4.5 h-4.5 bg-red-500 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-bg-main shadow-lg">
                      {notifications.length}
                    </span>
                  )}
                </button>
                
                <AnimatePresence>
                  {isNotifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      className="absolute top-16 right-0 w-80 premium-card p-6 shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-[101] bg-bg-card/90 backdrop-blur-3xl"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="font-black text-sm uppercase tracking-widest">Neural Inbox</h4>
                        <button onClick={clearNotifications} className="text-[10px] font-black text-brand uppercase tracking-widest hover:opacity-70">Reset</button>
                      </div>
                      <div className="space-y-4">
                        {notifications.length === 0 ? (
                          <div className="py-8 text-center space-y-2">
                            <Brain className="w-8 h-8 text-muted mx-auto opacity-20" />
                            <p className="text-[10px] text-muted font-bold uppercase tracking-widest italic">Synchronized</p>
                          </div>
                        ) : (
                          notifications.map(n => (
                            <div key={n.id} className="p-4 bg-foreground/[0.03] rounded-2xl border border-white/5 hover:border-brand/20 transition-colors">
                              <p className="text-xs font-black leading-tight tracking-tight">{n.title}</p>
                              <p className="text-[10px] text-muted mt-1.5 leading-relaxed font-medium">{n.desc}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <button 
                onClick={toggleTheme} 
                className="p-3 hover:bg-foreground/5 rounded-2xl transition-all active:scale-90"
              >
                {theme === 'dark' ? <Sparkles className="w-5 h-5 text-amber-400" /> : <Brain className="w-5 h-5 text-brand" />}
              </button>

              <div className="ml-2 w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand via-violet-500 to-pink-500 p-px shadow-lg">
                <div className="w-full h-full rounded-[15px] bg-bg-main overflow-hidden border border-white/10">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Content Area ── */}
      <div className="max-w-[1400px] mx-auto px-6 py-12 pt-32">
        <main className="pb-24">
          {children}
        </main>
      </div>

      <FloatingNavbar onActionClick={() => setIsActionOpen(true)} />
    </div>
  );
};
