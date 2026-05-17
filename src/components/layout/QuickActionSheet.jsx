import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Dumbbell, 
  Utensils, 
  Droplets, 
  Scale, 
  Wind, 
  Brain, 
  Target, 
  Camera, 
  Sparkles,
  Zap,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '../../utils/cn';

const ActionCard = ({ 
  icon: Icon, 
  label, 
  subtitle, 
  metric, 
  status, 
  color, 
  onClick, 
  delay 
}) => (
  <motion.button
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    onClick={onClick}
    className="group relative flex flex-col items-start p-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand/40 rounded-3xl transition-all duration-500 text-left overflow-hidden h-[180px]"
  >
    {/* Background Glow */}
    <div className={cn("absolute -top-10 -right-10 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700", color)} />
    
    <div className="flex justify-between items-start w-full mb-auto z-10">
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5", color)}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
          <span className="text-[8px] font-black uppercase tracking-widest text-muted">{status}</span>
        </div>
        {metric && <span className="text-xs font-black italic text-white/90">{metric}</span>}
      </div>
    </div>

    <div className="space-y-1 z-10">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-black uppercase tracking-tight italic">{label}</h3>
        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
      <p className="text-[10px] text-muted font-medium line-clamp-2 leading-relaxed">{subtitle}</p>
    </div>

    {/* AI Preview Line */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand/0 to-transparent group-hover:via-brand/50 transition-all duration-1000" />
  </motion.button>
);

export const QuickActionSheet = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [activeWorkflow, setActiveWorkflow] = useState(null);

  const actions = [
    { 
      id: 'workout',
      icon: Dumbbell, 
      label: "Start Training", 
      subtitle: "AI generated session based on current CNS readiness.", 
      metric: "94% CNS", 
      status: "Neural Optimized",
      color: "text-brand shadow-[0_0_20px_rgba(59,130,246,0.3)]",
      path: '/training'
    },
    { 
      id: 'nutrition',
      icon: Utensils, 
      label: "Log Fuel", 
      subtitle: "Macro synthesis tracking and AI meal analysis.", 
      metric: "1.2k kcal left", 
      status: "Balancing",
      color: "text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]",
      path: '/nutrition'
    },
    { 
      id: 'hydration',
      icon: Droplets, 
      label: "Hydration", 
      subtitle: "Add water intake. Neural sync requires optimal flow.", 
      metric: "1.8L / 4L", 
      status: "Low Fluid",
      color: "text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]",
      path: '/hub'
    },
    { 
      id: 'recovery',
      icon: Wind, 
      label: "Initiate Recovery", 
      subtitle: "Neural down-regulation and breathing protocols.", 
      metric: "HRV: 102ms", 
      status: "Ready",
      color: "text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]",
      path: '/progress'
    },
    { 
      id: 'coach',
      icon: Brain, 
      label: "Neural Coach", 
      subtitle: "Direct voice/chat interface for performance insights.", 
      metric: "3 Insights Ready", 
      status: "AI Active",
      color: "text-violet-400 shadow-[0_0_20px_rgba(167,139,250,0.3)]",
      path: '/coach'
    },
    { 
      id: 'weight',
      icon: Scale, 
      label: "Update Vitals", 
      subtitle: "Log weight and body composition telemetry.", 
      metric: "82.4 kg", 
      status: "Steady",
      color: "text-pink-400 shadow-[0_0_20px_rgba(244,114,182,0.3)]",
      path: '/progress'
    },
    { 
      id: 'scan',
      icon: Camera, 
      label: "Scan Fuel", 
      subtitle: "AI visual recognition for instant macro logging.", 
      metric: "Ready to Scan", 
      status: "Camera Sync",
      color: "text-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.3)]",
      path: '/nutrition'
    },
    { 
      id: 'goals',
      icon: Target, 
      label: "Target Sync", 
      subtitle: "Adjust milestones and performance objectives.", 
      metric: "Step 3/5", 
      status: "In Progress",
      color: "text-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.3)]",
      path: '/profile'
    }
  ];

  const handleAction = (action) => {
    setActiveWorkflow(action.id);
    // Simulate interactive feel before navigating
    setTimeout(() => {
      onClose();
      navigate(action.path);
      setActiveWorkflow(null);
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
          />

          {/* Neural Command Center */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[110] bg-[#0d0d0d] border-t border-white/10 rounded-t-[48px] shadow-[0_-20px_80px_rgba(0,0,0,0.5)] overflow-hidden font-['Outfit']"
          >
            {/* Header Section */}
            <div className="relative px-10 py-10 border-b border-white/5">
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                     <div className="flex items-center gap-2 text-brand">
                        <Sparkles className="w-5 h-5 animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-[0.4em]">Neural Command Center</span>
                     </div>
                     <h2 className="text-3xl font-black tracking-tighter uppercase italic">System <span className="ai-gradient-text">Synchronization</span></h2>
                  </div>
                  <button 
                    onClick={onClose}
                    className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all group"
                  >
                    <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                  </button>
               </div>

               {/* Live Stats Bar */}
               <div className="flex gap-6 mt-8 overflow-x-auto no-scrollbar pb-2">
                  {[
                    { icon: Activity, label: "Neural Flow", val: "Optimal", color: "text-brand" },
                    { icon: Zap, label: "Current Load", val: "8.4kN", color: "text-amber-500" },
                    { icon: Clock, label: "Last Sync", val: "2m ago", color: "text-muted" },
                  ].map((stat, i) => (
                    <motion.div 
                      key={stat.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/5 whitespace-nowrap"
                    >
                       <stat.icon className={cn("w-4 h-4", stat.color)} />
                       <span className="text-[10px] font-black uppercase tracking-widest text-muted">{stat.label}:</span>
                       <span className="text-[10px] font-bold text-white">{stat.val}</span>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* Actions Grid */}
            <div className="p-8 max-h-[70vh] overflow-y-auto no-scrollbar">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {actions.map((action, i) => (
                    <ActionCard 
                      key={action.id}
                      {...action}
                      delay={i * 0.05}
                      onClick={() => handleAction(action)}
                    />
                  ))}
               </div>
            </div>

            {/* Footer Summary */}
            <div className="px-10 py-8 bg-black/40 border-t border-white/5 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center border border-brand/20">
                     <TrendingUp className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-muted uppercase tracking-widest">Global Readiness</p>
                     <p className="text-sm font-bold tracking-tight">Peak Performance Zone</p>
                  </div>
               </div>
               <div className="flex gap-2">
                  {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand" />)}
                  <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
