import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CheckCircle2, 
  Brain,
  Award,
  Activity,
  Sparkles,
  Info,
  Play,
  Zap,
  Target,
  Heart,
  Timer
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useStore } from '../../store/useStore';
import { RestTimer } from './RestTimer';

const ExerciseCardV3 = ({ ex, idx, isWorkoutActive, completeSet, isActive }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isCompleted = ex.completedSets === ex.sets;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      className={cn(
        "premium-card overflow-hidden transition-all duration-500 relative",
        isCompleted ? "opacity-40 grayscale" : "",
        isActive ? "active-glow border-brand/50 bg-brand/[0.02]" : "hover:bg-foreground/[0.02]"
      )}
    >
      {isActive && (
        <div className="absolute top-0 left-0 w-1 h-full bg-brand shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
      )}
      
      <div className="p-5 flex gap-5">
        <div className="w-24 h-24 rounded-3xl bg-foreground/5 shrink-0 relative overflow-hidden flex items-center justify-center group">
          {ex.image ? (
            <img src={ex.image} alt={ex.name} className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-transparent to-transparent opacity-50" />
              <Activity className="w-10 h-10 text-brand/30 group-hover:scale-110 transition-transform" />
            </>
          )}
          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 z-10">
            <span className="text-[8px] font-bold text-white uppercase tracking-tighter">HD • 4K</span>
          </div>
        </div>
        
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h5 className="font-bold text-lg tracking-tight truncate flex items-center gap-2">
                {ex.name}
                {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
              </h5>
              <button onClick={() => setIsExpanded(!isExpanded)} className="p-1 rounded-full hover:bg-foreground/5 text-muted transition-colors">
                <Info className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Target className="w-3 h-3 text-brand/60" />
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest">{ex.muscle}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[8px] font-bold text-muted uppercase tracking-widest">Load</span>
              <span className="text-sm font-bold">{ex.weight}</span>
            </div>
            <div className="w-px h-6 bg-border-subtle" />
            <div className="flex flex-col">
              <span className="text-[8px] font-bold text-muted uppercase tracking-widest">Reps</span>
              <span className="text-sm font-bold">{ex.reps}</span>
            </div>
            <div className="w-px h-6 bg-border-subtle" />
            <div className="flex flex-col">
              <span className="text-[8px] font-bold text-muted uppercase tracking-widest">Sets</span>
              <span className="text-sm font-bold">{ex.sets}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 space-y-5">
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: ex.sets }).map((_, i) => (
            <motion.div 
              key={i} 
              initial={false}
              animate={{ 
                backgroundColor: i < ex.completedSets ? 'var(--brand)' : 'var(--color-foreground/10)',
                boxShadow: i < ex.completedSets ? '0 0 10px var(--color-brand/30)' : 'none'
              }}
              className="h-2 rounded-full relative overflow-hidden"
            >
              {i === ex.completedSets && isWorkoutActive && (
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-brand/30"
                />
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-3 h-3 text-pink-500 animate-pulse" />
            <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Est. Heart Rate: 142 BPM</span>
          </div>
          
          <button 
            disabled={!isWorkoutActive || isCompleted}
            onClick={() => completeSet(ex.id)}
            className={cn(
              "px-8 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg",
              isCompleted 
                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                : !isWorkoutActive 
                  ? "bg-foreground/5 text-muted opacity-50" 
                  : "bg-brand text-white shadow-brand/20 hover:scale-105 active:scale-95"
            )}
          >
            {isCompleted ? "Goal Met" : "Log Performance"}
          </button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-3 border-t border-border-subtle">
                <div className="flex items-center gap-2 text-brand">
                  <Brain className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Neural Guidance</span>
                </div>
                <p className="text-[11px] text-muted leading-relaxed">
                  Focus on the peak contraction. Exhale on the exertion (concentric) and inhale during the 3-second controlled release (eccentric). Keep elbows slightly tucked for optimal fiber recruitment.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const DailyPlanView = () => {
  const { 
    isPlanOpen, 
    closePlan, 
    currentExercises, 
    completeSet: storeCompleteSet, 
    isWorkoutActive, 
    startWorkout, 
    endWorkout,
    addNotification
  } = useStore();

  const [workoutSeconds, setWorkoutSeconds] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [activeExerciseIdx, setActiveExerciseIdx] = useState(0);

  useEffect(() => {
    let interval;
    if (isWorkoutActive) {
      interval = setInterval(() => setWorkoutSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isWorkoutActive]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const rs = s % 60;
    return `${m}:${rs.toString().padStart(2, '0')}`;
  };

  const completeSet = (id) => {
    storeCompleteSet(id);
    setShowRestTimer(true);
    
    // Find next active exercise if current is done
    const currentEx = currentExercises.find(e => e.id === id);
    if (currentEx && currentEx.completedSets + 1 >= currentEx.sets) {
      setActiveExerciseIdx(prev => Math.min(prev + 1, currentExercises.length - 1));
    }
  };

  const handleFinish = () => {
    setShowCompletion(true);
    setTimeout(() => {
      endWorkout(formatTime(workoutSeconds), 480);
      setShowCompletion(false);
      addNotification("Neural Session Synced", "+500 XP • Performance Peak Achieved", "success");
    }, 4000);
  };

  if (!isPlanOpen) return null;

  const totalSets = currentExercises.reduce((acc, ex) => acc + ex.sets, 0);
  const completedSets = currentExercises.reduce((acc, ex) => acc + ex.completedSets, 0);
  const progressPct = (completedSets / totalSets) * 100;

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[200] bg-bg-main flex flex-col"
    >
      <AnimatePresence>
        {showRestTimer && (
          <RestTimer 
            duration={60} 
            onComplete={() => setShowRestTimer(false)} 
            onSkip={() => setShowRestTimer(false)} 
          />
        )}
      </AnimatePresence>

      {/* Futuristic Immersive Header */}
      <header className="sticky top-0 z-50 glass-effect px-4 h-20 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-4">
          <button onClick={closePlan} className="p-3 -ml-3 rounded-full hover:bg-foreground/5 transition-all active:scale-90">
            <X className="w-6 h-6" />
          </button>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold tracking-tighter ai-gradient-text">Neural Session Mode</h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-muted uppercase tracking-widest tabular-nums">ID: 4829-HYPER-X</span>
              <div className="w-1 h-1 rounded-full bg-brand/30" />
              <span className="text-[10px] font-bold text-brand uppercase tracking-widest animate-pulse">Bio-Link Active</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[8px] font-bold text-muted uppercase tracking-widest">Recovery Cap</span>
            <span className="text-sm font-bold text-emerald-500">94%</span>
          </div>
          <div className="w-12 h-12 energy-ring relative">
            <svg className="w-full h-full -rotate-90">
              <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="3" className="text-foreground/5" />
              <motion.circle 
                cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="3" 
                strokeDasharray="125.6" animate={{ strokeDashoffset: 125.6 - (125.6 * progressPct) / 100 }}
                className="text-brand shadow-[0_0_8px_rgba(59,130,246,0.5)]" 
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">{Math.floor(progressPct)}%</span>
          </div>
        </div>
      </header>

      {/* Immersive Session Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-40">
        <section className="px-5 py-10 space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="premium-card p-1 bg-gradient-to-br from-brand/20 via-transparent to-transparent relative overflow-hidden group"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/20 blur-[80px] group-hover:bg-brand/30 transition-all duration-700" />
            <div className="p-8 space-y-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand/10 rounded-lg text-brand">
                  <Brain className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand">AESTHER Intelligent Command</span>
                  <span className="text-xs text-muted">Analyzing real-time physiological response...</span>
                </div>
              </div>
              
              <h1 className="text-5xl font-bold tracking-tighter leading-tight">
                Peak Output: <br />
                <span className="ai-gradient-text">Hypertrophy X</span>
              </h1>
              
              <p className="text-muted leading-relaxed max-w-sm">
                "Bio-sensors indicate optimal neural firing. I've locked in a 55-minute high-density protocol focusing on mechanical tension."
              </p>

              <div className="grid grid-cols-3 gap-6 pt-2">
                <div>
                  <p className="text-[8px] font-bold text-muted uppercase tracking-widest mb-1">Energy Mode</p>
                  <p className="text-sm font-bold flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> High
                  </p>
                </div>
                <div>
                  <p className="text-[8px] font-bold text-muted uppercase tracking-widest mb-1">Fatigue Cap</p>
                  <p className="text-sm font-bold flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-pink-500" /> 18%
                  </p>
                </div>
                <div>
                  <p className="text-[8px] font-bold text-muted uppercase tracking-widest mb-1">Target Intensity</p>
                  <p className="text-sm font-bold flex items-center gap-2">
                    <Target className="w-3.5 h-3.5 text-brand" /> 9/10
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="px-5 space-y-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-muted uppercase tracking-widest flex items-center gap-2">
              <Timer className="w-3.5 h-3.5" /> Training Sequence
            </h3>
            <span className="text-[10px] font-bold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full">
              4 Movements Active
            </span>
          </div>

          <div className="space-y-5">
            {currentExercises.map((ex, idx) => (
              <div key={ex.id} className="space-y-5">
                {/* Dynamic Inline AI Intervention */}
                {idx === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mx-2 p-4 glass-panel rounded-2xl border-l-4 border-brand flex gap-4 items-start"
                  >
                    <Sparkles className="w-5 h-5 text-brand shrink-0 animate-pulse" />
                    <div>
                      <p className="text-[10px] font-bold text-brand uppercase tracking-widest">Bio-Feedback Adjustment</p>
                      <p className="text-[11px] text-white/80 leading-relaxed mt-1">
                        "Your rest period heart rate is stabilizing faster than predicted. Reducing rest by 15s to maintain hormonal intensity."
                      </p>
                    </div>
                  </motion.div>
                )}
                
                <ExerciseCardV3 
                  ex={ex} 
                  idx={idx} 
                  isWorkoutActive={isWorkoutActive} 
                  completeSet={completeSet}
                  isActive={isWorkoutActive && activeExerciseIdx === idx}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Futuristic Controller ("The Bio-Remote") */}
      <div className="fixed bottom-0 left-0 right-0 glass-effect p-8 pb-12 border-t border-white/5 z-50">
        <div className="max-w-md mx-auto flex items-center gap-6">
          {!isWorkoutActive ? (
            <button 
              onClick={() => startWorkout("Neural Shift: Hypertrophy")}
              className="flex-1 h-16 bg-brand text-white rounded-[24px] font-bold text-lg shadow-[0_0_30px_rgba(59,130,246,0.3)] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <Play className="w-6 h-6 fill-current" /> Initialize Session
            </button>
          ) : (
            <>
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Real-time Session</span>
                  </div>
                  <span className="text-2xl font-bold tracking-tight tabular-nums text-glow">{formatTime(workoutSeconds)}</span>
                </div>
                <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: `${progressPct}%` }}
                    className="h-full bg-gradient-to-r from-brand to-violet-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                  />
                </div>
              </div>
              <button 
                onClick={handleFinish}
                className="h-16 px-10 bg-white text-black rounded-[24px] font-bold text-lg shadow-2xl hover:bg-white/90 active:scale-95 transition-all"
              >
                Sync
              </button>
            </>
          )}
        </div>
      </div>

      {/* Cinematic Achievement Overlay */}
      <AnimatePresence>
        {showCompletion && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] bg-bg-main flex items-center justify-center p-8"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/20 blur-[150px] animate-pulse" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 100 }}
                className="w-32 h-32 glass-panel rounded-[40px] flex items-center justify-center mb-10 shadow-[0_0_50px_rgba(59,130,246,0.5)]"
              >
                <Award className="w-16 h-16 text-brand" />
              </motion.div>
              
              <h2 className="text-6xl font-bold tracking-tighter mb-4 ai-gradient-text">Neural Peak Achieved</h2>
              <p className="text-muted mb-12 text-lg">Your biometric data has been successfully integrated into the AESTHER Core.</p>
              
              <div className="grid grid-cols-2 gap-10 mb-12 w-full">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Performance Gain</p>
                  <p className="text-4xl font-bold tracking-tight">+500 XP</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-pink-500">Global Rank</p>
                  <p className="text-4xl font-bold tracking-tight">#124</p>
                </div>
              </div>

              <div className="w-full h-1.5 bg-foreground/5 rounded-full overflow-hidden mb-4">
                <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 3.5 }} className="h-full bg-brand" />
              </div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest animate-pulse">Recalculating neural baseline...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
