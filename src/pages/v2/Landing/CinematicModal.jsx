import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, Maximize2, Sparkles, Brain, Activity, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../../../utils/cn';

const SCENE_1 = 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80';
const SCENE_2 = 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80';

const HUDOverlay = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl">
    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-white/5", color)}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-[10px] font-black text-muted uppercase tracking-widest">{label}</p>
      <p className="text-xl font-black italic">{value}</p>
    </div>
  </div>
);

const CinematicScene = ({ img, title, subtitle, isActive, hudData }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="absolute inset-0 z-0"
    >
      {/* Background Image with Ken Burns Effect */}
      <motion.div 
        animate={{ scale: isActive ? [1.1, 1.2] : 1.1 }}
        transition={{ duration: 10, ease: "linear" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${img})` }}
      />
      
      {/* Neural Grain & Lighting Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
      <div className="absolute inset-0 bg-brand/5 mix-blend-overlay animate-pulse" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity,
              delay: Math.random() * 5 
            }}
            className="absolute w-1 h-1 bg-brand rounded-full blur-[1px]"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%` 
            }}
          />
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-10">
        <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-8">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={isActive ? { opacity: 1, y: 0 } : {}}
             transition={{ delay: 0.5, duration: 1 }}
             className="flex items-center gap-2 text-brand"
           >
              <Sparkles className="w-5 h-5 animate-spin-slow" />
              <span className="text-sm font-black uppercase tracking-[0.5em]">{subtitle}</span>
           </motion.div>

           <motion.h2
             initial={{ opacity: 0, scale: 0.9 }}
             animate={isActive ? { opacity: 1, scale: 1 } : {}}
             transition={{ delay: 0.8, duration: 1 }}
             className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic leading-[0.8] ai-gradient-text drop-shadow-[0_0_50px_rgba(59,130,246,0.3)]"
           >
              {title}
           </motion.h2>
        </div>

        {/* HUD Data */}
        <div className="absolute bottom-32 left-10 hidden lg:flex flex-col gap-4">
           {hudData.slice(0, 2).map((h, i) => (
             <motion.div
               key={h.label}
               initial={{ opacity: 0, x: -50 }}
               animate={isActive ? { opacity: 1, x: 0 } : {}}
               transition={{ delay: 1.2 + i * 0.2 }}
             >
                <HUDOverlay {...h} />
             </motion.div>
           ))}
        </div>

        <div className="absolute bottom-32 right-10 hidden lg:flex flex-col gap-4 text-right">
           {hudData.slice(2).map((h, i) => (
             <motion.div
               key={h.label}
               initial={{ opacity: 0, x: 50 }}
               animate={isActive ? { opacity: 1, x: 0 } : {}}
               transition={{ delay: 1.5 + i * 0.2 }}
             >
                <HUDOverlay {...h} />
             </motion.div>
           ))}
        </div>
      </div>
    </motion.div>
  );
};

export const CinematicModal = ({ isOpen, onClose }) => {
  const [activeScene, setActiveScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen && isPlaying) {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setActiveScene(s => (s === 0 ? 1 : 0));
            return 0;
          }
          return p + 0.15;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isOpen, isPlaying]);

  const scenes = [
    {
      img: SCENE_1,
      subtitle: "Peak Performance Hub",
      title: "Limitless\nOutput",
      hudData: [
        { icon: Zap, label: "EMG Activity", value: "94%", color: "text-amber-500" },
        { icon: Activity, label: "Neural Load", value: "8.9kN", color: "text-brand" },
        { icon: Brain, label: "Core Sync", value: "Active", color: "text-violet-500" },
        { icon: Sparkles, label: "Efficiency", value: "Peak", color: "text-emerald-500" },
      ]
    },
    {
      img: SCENE_2,
      subtitle: "Intelligent Recovery",
      title: "Neural\nEvolution",
      hudData: [
        { icon: Activity, label: "HRV Index", value: "102ms", color: "text-brand" },
        { icon: Brain, label: "Deep Sleep", value: "Optimized", color: "text-violet-500" },
        { icon: Sparkles, label: "Cellular", value: "Regen", color: "text-emerald-500" },
        { icon: Zap, label: "Readiness", value: "98%", color: "text-amber-500" },
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[250] bg-black flex flex-col items-center justify-center overflow-hidden font-['Outfit']"
        >
          {/* Cinematic Sequence */}
          {scenes.map((scene, i) => (
            <CinematicScene 
              key={i}
              {...scene}
              isActive={activeScene === i}
            />
          ))}

          {/* Letterboxing */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-black z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-black z-10" />

          {/* Player UI */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-12">
             <div className="max-w-6xl mx-auto space-y-8">
                {/* Progress Bar */}
                <div className="relative h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                   <motion.div 
                     className="absolute inset-y-0 left-0 bg-brand shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                     style={{ width: `${progress}%` }}
                   />
                </div>

                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-10">
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all group"
                      >
                         {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 translate-x-0.5" />}
                      </button>
                      
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted">AESTHER CINEMATIC</span>
                        <span className="text-sm font-bold tracking-tight">Sequence {activeScene + 1}: {scenes[activeScene].subtitle}</span>
                      </div>
                   </div>

                   <div className="flex items-center gap-8">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Neural Sync Live</span>
                      </div>
                      <Volume2 className="w-5 h-5 text-muted hover:text-white cursor-pointer" />
                      <Maximize2 className="w-5 h-5 text-muted hover:text-white cursor-pointer" />
                   </div>
                </div>
             </div>
          </div>

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 z-[260] w-14 h-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all group"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
