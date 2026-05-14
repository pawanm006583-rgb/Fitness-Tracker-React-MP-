import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  CheckCircle2, 
  Timer, 
  Flame, 
  Activity,
  MoreVertical,
  X
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useStore } from '../../store/useStore';

export const ActiveTracker = () => {
  const { isWorkoutActive, startWorkout, endWorkout, addNotification } = useStore();
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const [totalSets] = useState(4);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isWorkoutActive && !isPaused) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
        setProgress((p) => Math.min(p + 0.1, 100));
      }, 1000);
    } else if (!isWorkoutActive) {
      setSeconds(0);
      setProgress(0);
      setCurrentSet(1);
      setIsPaused(false);
    }
    return () => clearInterval(interval);
  }, [isWorkoutActive, isPaused]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsPaused(false);
    startWorkout("Neural Back Squats");
    addNotification("Workout Started", "Your neural load is being tracked.", "success");
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    addNotification(
      isPaused ? "Training Resumed" : "Training Paused", 
      isPaused ? "Neural load tracking active." : "Session held in neural buffer.", 
      "success"
    );
  };

  const handleEnd = () => {
    endWorkout(formatTime(seconds), 320);
    setIsPaused(false);
    addNotification("Workout Complete", "Session saved to your history.", "success");
  };

  const handleCompleteSet = () => {
    if (currentSet < totalSets) {
      setCurrentSet(currentSet + 1);
      addNotification("Set Complete", `Set ${currentSet} of ${totalSets} finished.`, "success");
    } else {
      handleEnd();
    }
  };

  return (
    <div className="premium-card p-6 space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Activity className="w-32 h-32 text-brand" />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
            <Timer className="w-5 h-5 text-brand" />
          </div>
          <div>
            <h3 className="font-bold">{isWorkoutActive ? "Neural Session Active" : "Session Pending"}</h3>
            <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Back Squat • Session 04</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-foreground/5 text-muted hover:text-foreground transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {/* Timer & Sets */}
        <div className="flex flex-col items-center justify-center p-8 bg-foreground/[0.02] rounded-3xl border border-border-subtle">
          <span className="text-5xl font-bold tracking-tighter tabular-nums">{formatTime(seconds)}</span>
          <p className="text-xs font-bold text-muted uppercase tracking-widest mt-2">Active Time</p>
          
          <div className="flex gap-2 mt-6">
            {Array.from({ length: totalSets }).map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "w-8 h-1.5 rounded-full transition-all duration-500",
                  i + 1 < currentSet ? "bg-brand" : i + 1 === currentSet && isWorkoutActive ? "bg-brand/30 animate-pulse" : "bg-foreground/5"
                )} 
              />
            ))}
          </div>
          <p className="text-xs font-bold text-brand uppercase tracking-widest mt-3">
            {isWorkoutActive ? `Set ${currentSet} of ${totalSets}` : "Ready to Start"}
          </p>
        </div>

        {/* Live Metrics */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Est. Burn</p>
              <p className="text-xl font-bold">{isWorkoutActive ? Math.floor(seconds * 0.15) : 0} <span className="text-xs font-bold text-muted">KCAL</span></p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center">
              <Activity className="w-6 h-6 text-brand" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Intensity</p>
              <p className="text-xl font-bold">{isWorkoutActive ? "92%" : "0%"} <span className="text-xs font-bold text-muted">OF MAX</span></p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Overall Progress</span>
              <span className="text-[10px] font-bold text-brand uppercase tracking-widest">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: `${progress}%` }}
                className="h-full bg-brand" 
              />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col justify-center space-y-3">
          {!isWorkoutActive ? (
            <button 
              onClick={handleStart}
              className="w-full py-4 rounded-2xl bg-brand text-white shadow-xl shadow-brand/20 font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Play className="w-5 h-5 fill-current" /> Start Training
            </button>
          ) : (
            <>
              <button 
                onClick={handleCompleteSet}
                className="w-full py-4 rounded-2xl bg-brand text-white shadow-lg shadow-brand/20 font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <CheckCircle2 className="w-5 h-5" /> Complete Set
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={handlePause}
                  className={cn(
                    "py-4 rounded-2xl font-bold flex items-center justify-center gap-2 text-sm transition-all",
                    isPaused ? "bg-brand/10 text-brand border border-brand/30" : "bg-foreground/5 text-muted hover:text-foreground"
                  )}
                >
                  {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
                  {isPaused ? "Resume" : "Pause"}
                </button>
                <button 
                  onClick={handleEnd}
                  className="py-4 rounded-2xl bg-rose-500/5 text-rose-500/50 hover:text-rose-500 hover:bg-rose-500/10 font-bold flex items-center justify-center gap-2 text-sm transition-all"
                >
                  <X className="w-4 h-4" /> End Session
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
