import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  CheckCircle2, 
  Timer, 
  Flame, 
  Activity,
  MoreVertical,
  X,
  ChevronRight,
  Zap,
  Target,
  Wind,
  ShieldCheck,
  Brain,
  Droplets,
  Heart,
  SkipForward,
  SkipBack,
  Volume2,
  Mic,
  Maximize2
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';

const SESSION_HERO = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80';

const BiometricDetail = ({ label, value, unit, icon: Icon, color }) => (
  <div className="os-glass p-5 flex items-center justify-between group hover:border-white/20 transition-all">
    <div className="flex items-center gap-4">
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-white/5", color)}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-black italic tracking-tighter">{value}</span>
          <span className="text-[9px] font-black text-white/20 uppercase">{unit}</span>
        </div>
      </div>
    </div>
    <div className="h-8 w-1 bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        animate={{ height: ['20%', '80%', '40%'] }} 
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className={cn("w-full bg-current", color)} 
      />
    </div>
  </div>
);

const ExerciseSessionCard = ({ title, img, sets, reps, load, active, completed, onClick }) => (
  <motion.div 
    layout
    onClick={onClick}
    className={cn(
      "os-glass p-1.5 rounded-[32px] cursor-pointer transition-all duration-500",
      active ? "border-brand/40 shadow-2xl shadow-brand/20 scale-[1.02]" : "opacity-40 hover:opacity-100",
      completed && "border-emerald-500/30"
    )}
  >
    <div className="flex items-center gap-6 p-3">
      <div className="relative w-32 h-32 rounded-[24px] overflow-hidden shrink-0">
        <img src={img} alt={title} className="w-full h-full object-cover grayscale-[0.5]" />
        {active && <div className="absolute inset-0 bg-brand/20 animate-pulse" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        {completed && (
          <div className="absolute inset-0 bg-emerald-500/40 flex items-center justify-center backdrop-blur-sm">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
        )}
      </div>
      
      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between">
           <h4 className="text-xl font-black italic tracking-tighter uppercase">{title}</h4>
           {active && (
             <div className="px-3 py-1 os-glass rounded-full border-brand/40">
               <span className="text-[9px] font-black text-brand uppercase tracking-[0.3em]">Current Movement</span>
             </div>
           )}
        </div>
        
        <div className="flex items-center gap-8">
           <div className="space-y-0.5">
             <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">Protocol</p>
             <p className="text-sm font-black italic">{sets} SETS × {reps} REPS</p>
           </div>
           <div className="space-y-0.5">
             <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">Load</p>
             <p className="text-sm font-black italic text-brand">{load} KG</p>
           </div>
           <div className="flex-1" />
           <div className="w-12 h-12 rounded-full os-glass flex items-center justify-center">
             <div className="w-8 h-8 rounded-full border-2 border-white/5 border-t-brand animate-spin" style={{ animationDuration: '3s' }} />
             <span className="absolute text-[8px] font-black">65%</span>
           </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export const TrainingSession = () => {
  const { isWorkoutActive, endWorkout, addNotification } = useStore();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  
  const EXERCISES = [
    { title: "Barbell Back Squat", img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80", sets: 4, reps: 8, load: 102.5 },
    { title: "Romanian Deadlift", img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80", sets: 3, reps: 10, load: 85 },
    { title: "Leg Press", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80", sets: 3, reps: 12, load: 180 },
    { title: "Walking Lunges", img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80", sets: 3, reps: 20, load: 40 },
  ];

  useEffect(() => {
    let interval;
    if (isWorkoutActive && !isPaused) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWorkoutActive, isPaused]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndSession = () => {
    endWorkout(formatTime(seconds), 580);
    addNotification("Session Complete", "Protocol cycle successfully synchronized.", "success");
    navigate('/training');
  };

  return (
    <div className="min-h-screen bg-bg-main text-white font-['Inter'] relative overflow-hidden flex flex-col">
      {/* Cinematic Hero Background */}
      <div className="absolute inset-0 z-0">
        <img src={SESSION_HERO} alt="Session Background" className="w-full h-full object-cover grayscale-[0.6] opacity-30 scale-110" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-main via-bg-main/40 to-bg-main" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        
        {/* Neural Particles Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left: Session Flow & Active Exercise */}
        <div className="lg:col-span-8 flex flex-col h-screen p-8 md:p-12 overflow-y-auto no-scrollbar">
          
          <header className="flex flex-col md:flex-row items-end justify-between gap-10 mb-16">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-brand">
                <div className="w-2 h-2 rounded-full bg-brand animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-[0.6em]">Neural Session Active</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.85]">
                POSTERIOR <br />
                <span className="text-white/20">POWER CYCLE</span>
              </h1>
              <div className="flex items-center gap-8 pt-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Protocol Phase</span>
                  <span className="text-lg font-black italic">HYPERTROPHY . IV</span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Atmosphere</span>
                  <span className="text-lg font-black italic text-brand">FOCUS MODE</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4">
              <div className="flex items-baseline gap-2">
                 <span className="text-7xl font-black italic tracking-tighter tabular-nums leading-none">{formatTime(seconds)}</span>
                 <span className="text-xs font-black text-white/20 uppercase tracking-widest">Elapsed</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="os-glass px-5 py-2 rounded-full flex items-center gap-3">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-black italic">580 KCAL</span>
                </div>
                <div className="os-glass px-5 py-2 rounded-full flex items-center gap-3">
                  <Zap className="w-4 h-4 text-brand" />
                  <span className="text-xs font-black italic">92% LOAD</span>
                </div>
              </div>
            </div>
          </header>

          <div className="space-y-12">
             <div className="flex items-center justify-between px-2">
               <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Training Flow</h3>
               <span className="text-[10px] font-black text-brand uppercase tracking-[0.3em]">Step {currentExerciseIndex + 1} of {EXERCISES.length}</span>
             </div>

             <div className="space-y-6">
                {EXERCISES.map((ex, i) => (
                  <ExerciseSessionCard 
                    key={i}
                    {...ex}
                    active={i === currentExerciseIndex}
                    completed={i < currentExerciseIndex}
                    onClick={() => setCurrentExerciseIndex(i)}
                  />
                ))}
             </div>
          </div>
        </div>

        {/* Right: Live Biometrics Panel */}
        <div className="lg:col-span-4 bg-black/40 backdrop-blur-3xl border-l border-white/5 p-8 md:p-12 flex flex-col h-screen overflow-y-auto no-scrollbar">
           <div className="space-y-12">
              <section className="space-y-8">
                <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] flex items-center gap-3">
                  <Activity className="w-5 h-5 text-brand" /> Biometric Uplink
                </h3>
                
                <div className="relative aspect-square os-glass rounded-[48px] p-10 flex flex-col items-center justify-center gap-6 overflow-hidden group">
                  <div className="absolute inset-0 bg-brand/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="50%" cy="50%" r="42%" fill="none" stroke="currentColor" strokeWidth="8" className="text-white/5" />
                      <motion.circle 
                        cx="50%" cy="50%" r="42%" fill="none" stroke="currentColor" strokeWidth="8" 
                        strokeDasharray="264" animate={{ strokeDashoffset: 264 - (264 * 88) / 100 }}
                        className="text-brand" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <Heart className="w-10 h-10 text-brand mb-2 animate-pulse" />
                       <span className="text-6xl font-black italic tracking-tighter">142</span>
                       <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mt-1">BPM . LIVE</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <BiometricDetail label="CNS Fatigue" value="Minimal" unit="Ind" icon={Brain} color="text-violet-400" />
                  <BiometricDetail label="Hydration" value="0.8" unit="Liters" icon={Droplets} color="text-brand" />
                  <BiometricDetail label="Readiness" value="High" unit="Tier" icon={ShieldCheck} color="text-emerald-400" />
                </div>
              </section>

              <section className="os-glass p-8 space-y-6">
                <h4 className="text-[10px] font-black text-brand uppercase tracking-[0.5em] flex items-center gap-3">
                  <Wind className="w-5 h-5" /> AI Coaching Cue
                </h4>
                <p className="text-lg font-bold text-white/80 leading-relaxed italic">
                  "Maintain thoracic extension during the eccentric phase. Focus on driving through the mid-foot."
                </p>
                <div className="pt-4 flex items-center gap-4">
                   <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                     <motion.div animate={{ width: '60%' }} className="h-full bg-brand" />
                   </div>
                   <span className="text-[10px] font-black text-white/20 uppercase">Set rest: 42s</span>
                </div>
              </section>
           </div>
        </div>
      </main>

      {/* Floating Bottom Control Dock */}
      <footer className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <div className="os-glass p-3 rounded-[32px] border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 pl-4">
             <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group cursor-pointer hover:bg-white/10 transition-colors">
               <SkipBack className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
             </div>
             <button 
               onClick={() => setIsPaused(!isPaused)}
               className="w-16 h-16 rounded-[24px] bg-brand text-white flex items-center justify-center shadow-2xl shadow-brand/40 hover:scale-105 active:scale-95 transition-all"
             >
               {isPaused ? <Play className="w-8 h-8 fill-current translate-x-0.5" /> : <Pause className="w-8 h-8 fill-current" />}
             </button>
             <div 
               onClick={() => setCurrentExerciseIndex(prev => Math.min(prev + 1, EXERCISES.length - 1))}
               className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group cursor-pointer hover:bg-white/10 transition-colors"
             >
               <SkipForward className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
             </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-8 border-l border-r border-white/5">
             <div className="flex items-center gap-4">
                <span className="text-2xl font-black italic tracking-tighter">SET {currentExerciseIndex + 1}</span>
                <div className="h-4 w-px bg-white/10" />
                <span className="text-sm font-black text-white/30 uppercase tracking-[0.2em]">REST COUNTDOWN: 00:45</span>
             </div>
             <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
               <motion.div animate={{ width: '45%' }} className="h-full bg-brand shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
             </div>
          </div>

          <div className="flex items-center gap-3 pr-4">
             <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group cursor-pointer hover:bg-white/10 transition-colors">
               <Volume2 className="w-5 h-5 text-white/40 group-hover:text-white" />
             </div>
             <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group cursor-pointer hover:bg-white/10 transition-colors">
               <Mic className="w-5 h-5 text-white/40 group-hover:text-white" />
             </div>
             <button 
               onClick={handleEndSession}
               className="px-8 h-16 rounded-[24px] bg-rose-500/10 text-rose-500 font-black text-xs uppercase tracking-[0.3em] hover:bg-rose-500 hover:text-white transition-all border border-rose-500/20"
             >
               End Session
             </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
